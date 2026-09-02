import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      password,
      dob,
      city,
      occupation,
      education,
      skills,
      availability,
      interests,
      profilePhoto,
    } = body;

    if (!name || !email || !phone || !password || !skills || !availability) {
      return NextResponse.json({ error: "Please fill out all required fields (Name, Email, Phone, Password, Skills, Availability)" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email: cleanEmail } });
    const hashedPassword = await hashPassword(password);

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email: cleanEmail,
          phone,
          password: hashedPassword,
          role: "VOLUNTEER",
        },
      });
    } else {
      // Update password and role if needed
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          role: "VOLUNTEER",
        },
      });
    }

    // Check if volunteer profile exists
    const existingVol = await prisma.volunteer.findUnique({ where: { email: cleanEmail } });
    if (existingVol) {
      return NextResponse.json({ error: "A volunteer application with this email already exists" }, { status: 400 });
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        userId: user.id,
        name,
        email: cleanEmail,
        phone,
        dob: dob || null,
        city: city || null,
        occupation: occupation || null,
        education: education || null,
        skills: Array.isArray(skills) ? skills.join(", ") : skills,
        availability: Array.isArray(availability) ? availability.join(", ") : availability,
        interests: interests || null,
        profilePhoto: profilePhoto || null,
        status: "PENDING",
      },
    });

    sendEmail({
      to: cleanEmail,
      subject: "Volunteer Application Received - Ratnakar's NGO",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #0d9488;">Welcome to Ratnakar's NGO Volunteer Network!</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for applying to volunteer with Ratnakar's NGO. We have received your application and background details.</p>
          <p>Our volunteer coordination team will review your application and background verification details shortly.</p>
          <p><strong>Application Status:</strong> Pending Verification</p>
          <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">Ratnakar's NGO | Made by Satyajit</p>
        </div>
      `,
    }).catch((err) => console.error("Email error:", err));

    const tokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const token = signToken(tokenPayload);

    const response = NextResponse.json({
      success: true,
      volunteerId: volunteer.id,
      volunteer,
      message: "Volunteer application submitted successfully! Pending background verification.",
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
    console.error("Volunteer registration error:", error);
    return NextResponse.json({ error: error?.message || "Failed to submit volunteer application" }, { status: 500 });
  }
}
