"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []))
      .catch(() => {});
  }, []);

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px]">calendar_month</span>
          Upcoming Drives & Events
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">Participate & Volunteer</h1>
        <p className="text-base text-[#44474e] leading-relaxed">
          Join Ratnakar&apos;s NGO community events, tree plantation drives, health camps, and digital lab inaugurations across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-xl border border-[#e0e3e5] p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-xl font-bold text-[#031635]">{ev.title}</h3>
                <span className="bg-[#E8F5E9] text-[#1B5E20] font-bold text-xs px-3 py-1 rounded shrink-0">
                  {ev.category}
                </span>
              </div>
              <p className="text-sm text-[#44474e] leading-relaxed">{ev.description}</p>
            </div>

            <div className="pt-4 border-t border-[#e0e3e5] space-y-3 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#F57C00]">schedule</span>
                <span>{new Date(ev.eventDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#F57C00]">location_on</span>
                <span>{ev.location}</span>
              </div>

              <div className="pt-2 flex gap-3">
                <Link
                  href="/volunteer"
                  className="flex-1 text-center bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold py-2.5 rounded shadow text-xs transition-colors"
                >
                  Register as Event Volunteer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
