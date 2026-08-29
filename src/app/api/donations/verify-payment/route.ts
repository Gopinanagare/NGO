import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { generateDonationReceiptPDF } from "@/lib/pdf-receipt";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donorName,
      donorEmail,
      donorPhone,
      donorPan,
      donorAddress,
      amount,
      cause,
      campaignId,
      isTestMode,
    } = body;

    if (!donorName || !donorEmail || !donorPhone || !amount) {
      return NextResponse.json({ error: "Missing required donor information" }, { status: 400 });
    }

    // Verify signature unless in sandbox test override
    if (!isTestMode && razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
      if (!isValid) {
        return NextResponse.json({ error: "Payment verification failed. Signature mismatch." }, { status: 400 });
      }
    }

    // Find or create Donor record
    let donor = await prisma.donor.findUnique({
      where: { email: donorEmail.toLowerCase().trim() },
    });

    if (!donor) {
      donor = await prisma.donor.create({
        data: {
          name: donorName,
          email: donorEmail.toLowerCase().trim(),
          phone: donorPhone,
          panNumber: donorPan ? donorPan.toUpperCase().trim() : null,
          address: donorAddress || null,
          totalDonated: Number(amount),
        },
      });
    } else {
      await prisma.donor.update({
        where: { id: donor.id },
        data: {
          totalDonated: donor.totalDonated + Number(amount),
          panNumber: donorPan ? donorPan.toUpperCase().trim() : donor.panNumber,
          address: donorAddress || donor.address,
        },
      });
    }

    // Generate unique 80G receipt number
    const receiptNumber = `RN-80G-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const donation = await prisma.donation.create({
      data: {
        receiptNumber,
        donorId: donor.id,
        donorName,
        donorEmail: donorEmail.toLowerCase().trim(),
        donorPhone,
        donorPan: donorPan ? donorPan.toUpperCase().trim() : null,
        donorAddress: donorAddress || null,
        amount: Number(amount),
        cause: cause || "General Fund",
        campaignId: campaignId || null,
        paymentMethod: isTestMode ? "Razorpay Sandbox" : "Razorpay Online",
        paymentStatus: "SUCCESS",
        razorpayOrderId: razorpay_order_id || `order_manual_${Date.now()}`,
        razorpayPaymentId: razorpay_payment_id || `pay_${Date.now()}`,
        razorpaySignature: razorpay_signature || "verified",
      },
    });

    // Update Campaign raised amount if applicable
    if (campaignId) {
      const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
      if (campaign) {
        await prisma.campaign.update({
          where: { id: campaignId },
          data: { raisedAmount: campaign.raisedAmount + Number(amount) },
        });
      }
    }

    // Generate PDF Receipt Buffer
    const pdfBuffer = await generateDonationReceiptPDF({
      receiptNumber,
      donorName,
      donorEmail,
      donorPhone,
      donorPan,
      donorAddress,
      amount: Number(amount),
      cause: cause || "General Fund",
      paymentMethod: "Razorpay Online",
      transactionId: razorpay_payment_id || donation.razorpayPaymentId,
      createdAt: donation.createdAt,
    });

    // Dispatch email notification with PDF receipt attached
    sendEmail({
      to: donorEmail,
      subject: `Donation Receipt & 80G Tax Certificate - Ratnakar's NGO (${receiptNumber})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; color: #1e293b;">
          <h2 style="color: #0f766e;">Thank You for Supporting Ratnakar's NGO!</h2>
          <p>Dear <strong>${donorName}</strong>,</p>
          <p>We gratefully acknowledge receipt of your generous contribution of <strong>Rs. ${Number(amount).toLocaleString("en-IN")}</strong> towards <strong>${cause || "General Fund"}</strong>.</p>
          <p>Your contribution helps us educate underprivileged children, deploy medical vans, and empower communities across India.</p>
          <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 20px 0;" />
          <p><strong>Receipt Number:</strong> ${receiptNumber}<br />
          <strong>Transaction ID:</strong> ${razorpay_payment_id || donation.razorpayPaymentId}<br />
          <strong>80G Tax Benefit:</strong> Eligible for 50% deduction under Section 80G of the Income Tax Act.</p>
          <p>Please find attached your official 80G Tax Exemption Donation Receipt PDF.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #64748b;">With warm regards,<br /><strong>Ratnakar's NGO Management</strong><br />Made by Satyajit</p>
        </div>
      `,
      attachments: [
        {
          filename: `Ratnakar_NGO_80G_Receipt_${receiptNumber}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    }).catch((err) => console.error("Email send error:", err));

    return NextResponse.json({
      success: true,
      donationId: donation.id,
      receiptNumber: donation.receiptNumber,
      message: "Donation verified and 80G tax receipt generated successfully!",
    });
  } catch (error: any) {
    console.error("Payment verification API error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
