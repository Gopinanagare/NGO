import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ submissions });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contact submissions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Name, email, subject, and message are required" }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        phone: phone || "",
        subject,
        message,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting Ratnakar's NGO! Our team will get back to you shortly.",
      submission,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to submit contact message" }, { status: 500 });
  }
}
