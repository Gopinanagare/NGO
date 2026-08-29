import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const volunteerId = searchParams.get("volunteerId");

    let where: any = {};
    if (volunteerId) where.volunteerId = volunteerId;

    const certificates = await prisma.volunteerCertificate.findMany({
      where,
      include: { volunteer: true },
      orderBy: { issueDate: "desc" },
    });

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error("Fetch certificates error:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}
