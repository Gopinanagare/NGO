import { NextResponse } from "next/server";
import { createRazorpayOrder, RAZORPAY_KEY_ID } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const { amount, cause, donorName, donorEmail } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valid donation amount is required" }, { status: 400 });
    }

    const tempReceipt = `temp_rcpt_${Date.now()}`;
    const order = await createRazorpayOrder(amount, tempReceipt, {
      cause: cause || "General Fund",
      donorName: donorName || "Anonymous Donor",
      donorEmail: donorEmail || "",
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: error?.message || "Failed to create payment order" }, { status: 500 });
  }
}
