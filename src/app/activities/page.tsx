"use client";

import { useState, useEffect } from "react";
import DonateModal from "@/components/DonateModal";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState("General Fund");

  useEffect(() => {
    fetch("/api/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data.activities || []))
      .catch(() => {});
  }, []);

  const categories = ["ALL", "Education", "Healthcare", "Rural Development", "Women Empowerment"];

  const filteredActivities =
    selectedCategory === "ALL"
      ? activities
      : activities.filter((a) => a.category === selectedCategory);

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px] fill">verified</span>
          Verified Ground Action
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">Our Activities & Field Operations</h1>
        <p className="text-base text-[#44474e] leading-relaxed">
          Explore ongoing grassroots projects operated by Ratnakar&apos;s NGO across India. Every activity is documented, audited, and driven by community leaders.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-[#F57C00] text-white shadow"
                : "bg-white text-[#031635] border border-[#e0e3e5] hover:border-[#F57C00]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-xl border border-[#e0e3e5] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="h-48 bg-slate-100 relative">
              <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-[#031635] text-white text-[11px] font-bold px-3 py-1 rounded">
                {act.category}
              </span>
            </div>

            <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1 text-xs text-[#1B5E20] font-bold">
                  <span className="material-symbols-outlined text-[14px]">event</span>
                  {new Date(act.startDate).toLocaleDateString("en-IN")}
                </div>

                <h3 className="text-xl font-semibold text-[#031635] leading-tight">{act.title}</h3>
                <p className="text-xs text-[#44474e] leading-relaxed">{act.description}</p>
              </div>

              <div className="pt-4 border-t border-[#e0e3e5] space-y-3">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#F57C00]">location_on</span>
                    {act.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#031635]">groups</span>
                    {act.beneficiaries}+ Beneficiaries
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedCause(act.title);
                    setDonateModalOpen(true);
                  }}
                  className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs py-2.5 rounded transition-colors shadow"
                >
                  Support This Project (80G)
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        defaultCause={selectedCause}
      />
    </div>
  );
}
