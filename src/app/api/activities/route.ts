import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let where: any = {};
    if (category && category !== "ALL") {
      where.category = category;
    }

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ activities });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, description, location, beneficiaries, date, image, featured } = body;

    const activity = await prisma.activity.create({
      data: {
        title,
        category: category || "General",
        description,
        location,
        beneficiaries: Number(beneficiaries) || 0,
        date: date || new Date().toISOString().split("T")[0],
        image: image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ success: true, activity });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create activity" }, { status: 500 });
  }
}
