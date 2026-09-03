import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mergeMembers } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    let dbMembers: any[] = [];
    try {
      dbMembers = await prisma.member.findMany({
        include: { plan: true },
        orderBy: { createdAt: "desc" },
      });
    } catch (e) {
      console.error("Prisma member query warning:", e);
    }

    const members = mergeMembers(dbMembers);
    return NextResponse.json({ members });
  } catch (error) {
    console.error("Fetch members error:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}
