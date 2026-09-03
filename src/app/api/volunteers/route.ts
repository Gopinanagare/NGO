import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mergeVolunteers } from "@/lib/store";

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

    let dbVolunteers: any[] = [];
    try {
      dbVolunteers = await prisma.volunteer.findMany({
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
    } catch (e) {
      console.error("Prisma volunteer query warning:", e);
    }

    let volunteers = mergeVolunteers(dbVolunteers);
    if (status && status !== "ALL") {
      volunteers = volunteers.filter((v: any) => v.status === status);
    }

    return NextResponse.json({ volunteers });
  } catch (error) {
    console.error("Fetch volunteers error:", error);
    return NextResponse.json({ error: "Failed to fetch volunteers" }, { status: 500 });
  }
}
