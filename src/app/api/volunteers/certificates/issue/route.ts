import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateVolunteerCertificatePDF } from "@/lib/pdf-certificate";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { volunteerId, projectName, authorizedSignee } = body;

    if (!volunteerId || !projectName) {
      return NextResponse.json({ error: "Volunteer ID and Project Name are required" }, { status: 400 });
    }

    const volunteer = await prisma.volunteer.findUnique({ where: { id: volunteerId } });
    if (!volunteer) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    const certificateNo = `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const cert = await prisma.volunteerCertificate.create({
      data: {
        certificateNo,
        volunteerId: volunteer.id,
        volunteerName: volunteer.name,
        projectName,
        totalHours: volunteer.totalHours,
        issueDate: new Date(),
        authorizedSignee: authorizedSignee || "Ratnakar's NGO Management",
      },
    });

    // Generate PDF Buffer
    const pdfBuffer = await generateVolunteerCertificatePDF({
      certificateNo,
      volunteerName: volunteer.name,
      projectName,
      totalHours: volunteer.totalHours,
      issueDate: cert.issueDate,
      authorizedSignee: cert.authorizedSignee,
    });

    // Email certificate to volunteer
    sendEmail({
      to: volunteer.email,
      subject: `Official Volunteer Certificate - Ratnakar's NGO (${certificateNo})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #0d9488;">Congratulations ${volunteer.name}!</h2>
          <p>We are delighted to present you with your official <strong>Certificate of Volunteer Excellence</strong> from Ratnakar's NGO.</p>
          <p><strong>Project:</strong> ${projectName}<br />
          <strong>Total Verified Hours:</strong> ${volunteer.totalHours} Hours<br />
          <strong>Certificate ID:</strong> ${certificateNo}</p>
          <p>Your official PDF certificate is attached to this email and available for download in your volunteer portal.</p>
          <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">Ratnakar's NGO | Made by Satyajit</p>
        </div>
      `,
      attachments: [
        {
          filename: `Ratnakar_NGO_Volunteer_Certificate_${certificateNo}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    }).catch((err) => console.error("Email certificate error:", err));

    return NextResponse.json({
      success: true,
      certificate: cert,
      message: "Volunteer Certificate issued and emailed successfully!",
    });
  } catch (error: any) {
    console.error("Issue certificate error:", error);
    return NextResponse.json({ error: error?.message || "Failed to issue certificate" }, { status: 500 });
  }
}
