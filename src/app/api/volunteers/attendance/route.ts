import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const volunteerId = searchParams.get("volunteerId");

    let where: any = {};
    if (volunteerId) where.volunteerId = volunteerId;

    const attendances = await prisma.volunteerAttendance.findMany({
      where,
      include: {
        volunteer: true,
        activity: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ attendances });
  } catch (error) {
    console.error("Fetch attendance error:", error);
    return NextResponse.json({ error: "Failed to fetch attendance logs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { volunteerId, projectId, date, checkIn, checkOut, hoursLogged, verifiedBy } = body;

    if (!volunteerId || !date || !checkIn || !checkOut || !hoursLogged) {
      return NextResponse.json({ error: "Missing required attendance fields" }, { status: 400 });
    }

    const attendance = await prisma.volunteerAttendance.create({
      data: {
        volunteerId,
        projectId: projectId || null,
        date,
        checkIn,
        checkOut,
        hoursLogged: Number(hoursLogged),
        status: "VERIFIED",
        verifiedBy: verifiedBy || "NGO Administrator",
      },
    });

    // Automatically recalculate and update volunteer total hours!
    const totalHoursAgg = await prisma.volunteerAttendance.aggregate({
      where: { volunteerId, status: "VERIFIED" },
      _sum: { hoursLogged: true },
    });

    const newTotal = totalHoursAgg._sum.hoursLogged || 0;

    await prisma.volunteer.update({
      where: { id: volunteerId },
      data: { totalHours: newTotal },
    });

    return NextResponse.json({
      success: true,
      attendance,
      totalHours: newTotal,
      message: "Volunteer attendance logged and hours updated successfully!",
    });
  } catch (error: any) {
    console.error("Log attendance API error:", error);
    return NextResponse.json({ error: error?.message || "Failed to log attendance" }, { status: 500 });
  }
}
