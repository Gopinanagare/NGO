import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRazorpayOrder, RAZORPAY_KEY_ID } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, memberName, memberEmail, memberPhone } = body;

    if (!planId || !memberName || !memberEmail || !memberPhone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const plan = await prisma.membershipPlan.findUnique({ where: { id: planId } });
    if (!plan) {
      return NextResponse.json({ error: "Invalid membership plan selected" }, { status: 404 });
    }

    const tempReceipt = `mem_rcpt_${Date.now()}`;
    const order = await createRazorpayOrder(plan.fee, tempReceipt, {
      planId,
      planTitle: plan.title,
      memberName,
      memberEmail,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
      planTitle: plan.title,
      fee: plan.fee,
    });
  } catch (error: any) {
    console.error("Membership apply error:", error);
    return NextResponse.json({ error: error?.message || "Failed to process membership payment order" }, { status: 500 });
  }
}
