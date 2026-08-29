import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateVolunteerCertificatePDF } from "@/lib/pdf-certificate";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const cert = await prisma.volunteerCertificate.findUnique({
      where: { id },
    });

    if (!cert) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    const pdfBuffer = await generateVolunteerCertificatePDF({
      certificateNo: cert.certificateNo,
      volunteerName: cert.volunteerName,
      projectName: cert.projectName,
      totalHours: cert.totalHours,
      issueDate: cert.issueDate,
      authorizedSignee: cert.authorizedSignee,
    });

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Ratnakar_NGO_Certificate_${cert.certificateNo}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Certificate download error:", error);
    return NextResponse.json({ error: "Failed to download certificate PDF" }, { status: 500 });
  }
}
