import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.membershipPlan.findMany({
      where: { active: true },
      orderBy: { fee: "asc" },
    });
    return NextResponse.json({ plans });
  } catch (error) {
    console.error("Fetch membership plans error:", error);
    return NextResponse.json({ error: "Failed to fetch membership plans" }, { status: 500 });
  }
}
