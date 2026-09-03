import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { hashPassword, signToken } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { saveMemberToStore } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      memberName,
      memberEmail,
      memberPhone,
      password,
      memberPhoto,
      panNumber,
      isTestMode,
    } = body;

    if (!planId || !memberName || !memberEmail || !memberPhone) {
      return NextResponse.json({ error: "Missing required member details" }, { status: 400 });
    }

    if (!isTestMode && razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
      if (!isValid) {
        return NextResponse.json({ error: "Membership payment verification failed" }, { status: 400 });
      }
    }

    const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });
    if (!plan) {
      return NextResponse.json({ error: "Selected plan not found" }, { status: 404 });
    }

    const cleanEmail = memberEmail.toLowerCase().trim();

    // Find or create User
    let user = await prisma.user.findUnique({ where: { email: cleanEmail } });
    const defaultPassword = password || "Member@123";
    const hashedPassword = await hashPassword(defaultPassword);

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: memberName,
          email: cleanEmail,
          phone: memberPhone,
          password: hashedPassword,
          role: "MEMBER",
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          role: "MEMBER",
        },
      });
    }

    const membershipNo = `MEM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const validFrom = new Date();
    const validTill = new Date();
    validTill.setMonth(validTill.getMonth() + plan.validityMonths);

    const member = await prisma.member.create({
      data: {
        userId: user.id,
        membershipNo,
        planId: plan.id,
        memberName,
        memberEmail: cleanEmail,
        memberPhone,
        memberPhoto: memberPhoto || null,
        panNumber: panNumber || null,
        status: "PENDING",
        validFrom,
        validTill,
        amountPaid: plan.fee,
        paymentId: razorpay_payment_id || `pay_mem_${Date.now()}`,
      },
    });

    saveMemberToStore({
      ...member,
      plan: { title: plan.title },
    });

    sendEmail({
      to: cleanEmail,
      subject: `Welcome to Ratnakar's NGO Membership! (${membershipNo})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #0f766e;">Membership Confirmation - Ratnakar's NGO</h2>
          <p>Dear <strong>${memberName}</strong>,</p>
          <p>Welcome to our official NGO membership network! Thank you for enrolling in the <strong>${plan.title}</strong> plan.</p>
          <p><strong>Membership Number:</strong> ${membershipNo}<br />
          <strong>Validity:</strong> ${validFrom.toLocaleDateString("en-IN")} to ${validTill.toLocaleDateString("en-IN")}<br />
          <strong>Fee Paid:</strong> Rs. ${plan.fee.toLocaleString("en-IN")}</p>
          <p>You now enjoy voting rights at annual meetings, quarterly impact reports, and exclusive VIP invitations.</p>
          <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">Ratnakar's NGO | Made by Satyajit</p>
        </div>
      `,
    }).catch((err) => console.error("Membership email error:", err));

    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = signToken(tokenPayload);

    const response = NextResponse.json({
      success: true,
      membershipNo: member.membershipNo,
      message: "Membership application submitted successfully! Pending verification.",
    });

    response.cookies.set("ratnakar_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Membership verify error:", error);
    return NextResponse.json({ error: error?.message || "Failed to complete membership activation" }, { status: 500 });
  }
}
