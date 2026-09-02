import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const totalDonationAgg = await prisma.donation.aggregate({
      where: { paymentStatus: "SUCCESS" },
      _sum: { amount: true },
      _count: { id: true },
    });

    const totalDonors = await prisma.donor.count();
    const totalVolunteers = await prisma.volunteer.count({ where: { status: "APPROVED" } });
    const pendingVolunteers = await prisma.volunteer.count({ where: { status: "PENDING" } });

    const volunteerHoursAgg = await prisma.volunteerAttendance.aggregate({
      where: { status: "VERIFIED" },
      _sum: { hoursLogged: true },
    });

    const totalMembers = await prisma.member.count({ where: { status: { in: ["ACTIVE", "APPROVED"] } } });
    const totalCampaigns = await prisma.campaign.count();
    const totalEvents = await prisma.event.count();
    const totalEnquiries = await prisma.contactSubmission.count({ where: { status: "NEW" } });

    const recentDonations = await prisma.donation.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const pendingVolunteersList = await prisma.volunteer.findMany({
      where: { status: "PENDING" },
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const monthlyDonationData = [
      { month: "Jan", amount: 45000, volunteers: 12 },
      { month: "Feb", amount: 62000, volunteers: 18 },
      { month: "Mar", amount: 89000, volunteers: 25 },
      { month: "Apr", amount: 74000, volunteers: 22 },
      { month: "May", amount: 95000, volunteers: 30 },
      { month: "Jun", amount: 112000, volunteers: 38 },
      { month: "Jul", amount: 130000, volunteers: 45 },
      { month: "Aug", amount: Number(totalDonationAgg._sum.amount || 0), volunteers: totalVolunteers },
    ];

    return NextResponse.json({
      stats: {
        totalRaised: totalDonationAgg._sum.amount || 0,
        donationCount: totalDonationAgg._count.id || 0,
        totalDonors,
        totalVolunteers,
        pendingVolunteers,
        totalVolunteerHours: volunteerHoursAgg._sum.hoursLogged || 0,
        totalMembers,
        totalCampaigns,
        totalEvents,
        newEnquiries: totalEnquiries,
      },
      recentDonations,
      pendingVolunteers: pendingVolunteersList,
      monthlyDonationData,
    });
  } catch (error: any) {
    console.error("Admin stats API error:", error);
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 });
  }
}
