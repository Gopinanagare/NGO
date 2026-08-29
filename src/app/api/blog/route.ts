import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, excerpt, content, author, category, image } = body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: `${slug}-${Date.now()}`,
        excerpt,
        content,
        author: author || "Ratnakar Team",
        category: category || "General",
        image: image || "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200",
        published: true,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to create blog post" }, { status: 500 });
  }
}
