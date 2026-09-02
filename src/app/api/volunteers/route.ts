import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }

    const volunteers = await prisma.volunteer.findMany({
      where,
      include: {
        assignments: {
          include: { activity: true },
        },
        attendances: true,
        certificates: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ volunteers });
  } catch (error) {
    console.error("Fetch volunteers error:", error);
    return NextResponse.json({ error: "Failed to fetch volunteers" }, { status: 500 });
  }
}
