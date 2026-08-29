"use client";

import { useState, useEffect } from "react";

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .catch(() => {});
  }, []);

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px]">photo_library</span>
          Visual Evidence & Impact
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">Photo & Video Gallery</h1>
        <p className="text-base text-[#44474e] leading-relaxed">
          High-resolution documentary photographs captured across Ratnakar&apos;s NGO community centers, mobile clinics, and school laboratories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-[#e0e3e5] shadow-sm hover:shadow-md transition-shadow group">
            <div className="h-56 bg-slate-100 overflow-hidden relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-3 left-3 bg-[#031635]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-1">
              <h3 className="text-base font-bold text-[#031635]">{item.title}</h3>
              {item.caption && <p className="text-xs text-[#44474e]">{item.caption}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
