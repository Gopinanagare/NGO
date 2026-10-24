"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DEFAULT_EVENTS = [
  {
    id: "ev-1",
    title: "Annual Punyatithi Smriti Samaroh & Mega Health Camp 2026",
    description: "Annual commemoration assembly featuring free multi-specialty medical checkups, cataract screening and surgery referrals in association with Narayan Medical College & Hospital (NMCH Jamuhar, Rohtas), blanket distribution, student learning kits, and community mass Narayan Bhoj.",
    venue: "Village Sihada, Goradiha Panchayat (Rafiganj), District Aurangabad, Bihar",
    eventDate: "2026-03-20",
    eventTime: "10:00 AM - 05:00 PM",
    bannerImage: "/images/events/punyatithi_kamla_kumari.jpg",
    category: "Annual Samaroh & Medical Camp",
    maxVolunteers: 50,
    registeredVolunteers: 18,
  },
  {
    id: "ev-2",
    title: "Specialist Eye Diagnosis & Rural Blanket Distribution Camp",
    description: "Multi-counter eye examination and vision screening camp for rural elderly villagers, followed by stage-level distribution of warm winter blankets and stationery kits.",
    venue: "Pipardih Ward No- 33 & Sihada, Aurangabad, Bihar",
    eventDate: "2026-04-12",
    eventTime: "09:30 AM - 04:30 PM",
    bannerImage: "/images/events/eye_checkup_camp.jpg",
    category: "Medical & Welfare Relief",
    maxVolunteers: 30,
    registeredVolunteers: 12,
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>(DEFAULT_EVENTS);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.events && data.events.length > 0) {
          setEvents(data.events);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px]">calendar_month</span>
          Upcoming Drives & Events • NGO Darpan: BR/2024/0378911
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">Participate & Volunteer</h1>
        <p className="text-base text-[#44474e] leading-relaxed">
          Join <strong>Maa Samundri Devi Charitable Trust</strong> at our grassroots community gatherings, free multi-specialty health camps in collaboration with NMCH Jamuhar, blanket distribution drives, and rural educational workshops across Bihar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-2xl border border-[#e0e3e5] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            {ev.bannerImage && (
              <div className="h-56 bg-slate-100 relative overflow-hidden group">
                <img
                  src={ev.bannerImage}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#031635]/90 backdrop-blur-sm text-white font-bold text-xs px-3 py-1 rounded shadow">
                  {ev.category || "Community Event"}
                </span>
                <span className="absolute bottom-3 right-3 bg-[#E8F5E9] text-[#1B5E20] font-bold text-[11px] px-2.5 py-0.5 rounded shadow">
                  Verified Event
                </span>
              </div>
            )}

            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#031635] leading-snug">{ev.title}</h3>
                <p className="text-xs text-[#44474e] leading-relaxed">{ev.description}</p>
              </div>

              <div className="pt-4 border-t border-[#e0e3e5] space-y-2.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#F57C00]">schedule</span>
                  <span>
                    {new Date(ev.eventDate || "2026-03-20").toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {ev.eventTime && ` • ${ev.eventTime}`}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#F57C00] shrink-0 mt-0.5">location_on</span>
                  <span>{ev.venue || ev.location || "Sihada, Goradiha Panchayat, Aurangabad, Bihar"}</span>
                </div>

                <div className="pt-3 flex gap-3">
                  <Link
                    href="/volunteer"
                    className="flex-1 text-center bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold py-2.5 rounded shadow text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
                    Register as Event Volunteer
                  </Link>
                  <Link
                    href="/donate"
                    className="border border-[#031635] text-[#031635] hover:bg-[#031635]/5 font-bold py-2.5 px-4 rounded text-xs transition-colors flex items-center justify-center"
                  >
                    Sponsor Camp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
