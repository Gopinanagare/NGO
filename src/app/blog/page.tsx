"use client";

import { useState, useEffect } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => {});
  }, []);

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px]">newspaper</span>
          Field Reports & Stories
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">News & Field Blog</h1>
        <p className="text-base text-[#44474e] leading-relaxed">
          Read transparent updates, beneficiary success stories, and operational reports directly from the field.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl border border-[#e0e3e5] overflow-hidden shadow-sm flex flex-col sm:flex-row gap-6 p-6">
            <img src={post.image} alt={post.title} className="w-full sm:w-48 h-44 object-cover rounded-lg shrink-0" />
            <div className="space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-IN")}</span>
                  <span>•</span>
                  <span className="text-[#F57C00] font-bold">{post.author}</span>
                </div>
                <h3 className="text-lg font-bold text-[#031635] leading-tight">{post.title}</h3>
                <p className="text-xs text-[#44474e] line-clamp-3 mt-2">{post.summary}</p>
              </div>

              <span className="text-xs font-bold text-[#964900] hover:underline cursor-pointer flex items-center gap-1">
                Read Full Story <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
