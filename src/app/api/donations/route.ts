import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const user = await getAuthUser();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    let whereCondition: any = {};

    if (user?.role !== "ADMIN" && email) {
      whereCondition.donorEmail = email.toLowerCase().trim();
    } else if (user?.role !== "ADMIN" && !email) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const donations = await prisma.donation.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ donations });
  } catch (error) {
    console.error("Fetch donations API error:", error);
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
  }
}
