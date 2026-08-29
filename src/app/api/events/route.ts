import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: "asc" },
    });
    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, venue, eventDate, eventTime, bannerImage, maxVolunteers } = body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        venue,
        eventDate,
        eventTime,
        bannerImage: bannerImage || "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
        maxVolunteers: Number(maxVolunteers) || 10,
        status: "UPCOMING",
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create event" }, { status: 500 });
  }
}
