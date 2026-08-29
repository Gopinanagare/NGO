import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateDonationReceiptPDF } from "@/lib/pdf-receipt";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const donation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      return NextResponse.json({ error: "Donation receipt not found" }, { status: 404 });
    }

    const pdfBuffer = await generateDonationReceiptPDF({
      receiptNumber: donation.receiptNumber,
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      donorPhone: donation.donorPhone,
      donorPan: donation.donorPan,
      donorAddress: donation.donorAddress,
      amount: donation.amount,
      cause: donation.cause,
      paymentMethod: donation.paymentMethod,
      transactionId: donation.razorpayPaymentId,
      createdAt: donation.createdAt,
    });

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Ratnakar_NGO_80G_Receipt_${donation.receiptNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Receipt download error:", error);
    return NextResponse.json({ error: "Failed to generate receipt PDF" }, { status: 500 });
  }
}
