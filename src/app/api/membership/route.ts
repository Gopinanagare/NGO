import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      include: { plan: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ members });
  } catch (error) {
    console.error("Fetch members error:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}
