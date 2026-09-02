import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Member ID and status are required" }, { status: 400 });
    }

    const updatedMember = await prisma.member.update({
      where: { id },
      data: { status },
      include: { plan: true },
    });

    return NextResponse.json({ success: true, member: updatedMember });
  } catch (error: any) {
    console.error("Update member status error:", error);
    return NextResponse.json({ error: error?.message || "Failed to update member status" }, { status: 500 });
  }
}
