import Razorpay from "razorpay";
import crypto from "crypto";

export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_live_SboFvtCQiYWPQj";
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "4jWrEpc9tOBOSYJfRWwrHLOO";

export const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export async function createRazorpayOrder(amountINR: number, receiptId: string, notes?: Record<string, string>) {
  const amountInPaise = Math.round(amountINR * 100);
  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt: receiptId,
    notes: notes || {},
  };
  return await razorpayInstance.orders.create(options);
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string): boolean {
  try {
    const text = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");
    return expectedSignature === signature;
  } catch (err) {
    console.error("Signature verification error:", err);
    return false;
  }
}
