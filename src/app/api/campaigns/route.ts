import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ campaigns });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, targetAmount, image, category } = body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const campaign = await prisma.campaign.create({
      data: {
        title,
        slug: `${slug}-${Date.now()}`,
        description,
        targetAmount: Number(targetAmount),
        image: image || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200",
        category: category || "General",
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ success: true, campaign });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create campaign" }, { status: 500 });
  }
}
