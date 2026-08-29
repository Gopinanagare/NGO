import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, verificationNotes, totalHours } = body;

    const existing = await prisma.volunteer.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Volunteer profile not found" }, { status: 404 });
    }

    const updated = await prisma.volunteer.update({
      where: { id },
      data: {
        status: status || existing.status,
        verificationNotes: verificationNotes !== undefined ? verificationNotes : existing.verificationNotes,
        totalHours: totalHours !== undefined ? Number(totalHours) : existing.totalHours,
      },
    });

    if (status && status !== existing.status) {
      const isApproved = status === "APPROVED";
      sendEmail({
        to: existing.email,
        subject: `Volunteer Status Update - Ratnakar's NGO (${status})`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
            <h2 style="color: ${isApproved ? "#0d9488" : "#dc2626"};">Volunteer Application Update</h2>
            <p>Dear <strong>${existing.name}</strong>,</p>
            <p>Your volunteer application status with Ratnakar's NGO has been updated to: <strong>${status}</strong>.</p>
            ${isApproved ? `<p>Congratulations! You are now an approved volunteer. You can log into your portal to view assigned project activities and record volunteer hours.</p>` : `<p>Verification Notes: ${verificationNotes || "Application did not meet current requirements."}</p>`}
            <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">Ratnakar's NGO | Made by Satyajit</p>
          </div>
        `,
      }).catch((err) => console.error("Email notification error:", err));
    }

    return NextResponse.json({ success: true, volunteer: updated });
  } catch (error) {
    console.error("Update volunteer API error:", error);
    return NextResponse.json({ error: "Failed to update volunteer profile" }, { status: 500 });
  }
}
