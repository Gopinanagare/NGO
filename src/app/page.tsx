"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DonateModal from "@/components/DonateModal";

export default function HomePage() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState("General Fund");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data.campaigns || []))
      .catch(() => {});

    fetch("/api/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data.activities || []))
      .catch(() => {});

    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []))
      .catch(() => {});
  }, []);

  const openDonateWithCause = (causeTitle: string) => {
    setSelectedCause(causeTitle);
    setDonateModalOpen(true);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Stitch Hero Section */}
      <section className="relative w-full h-[580px] flex items-center justify-center px-6 md:px-10 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0 bg-[#f2f4f6]">
          <img
            className="w-full h-full object-cover opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHGji4e0k01ZNoRduqYEXDeo-sFB6nQEhgbetVvV8bp9ni9f41HxbL9gkRWXgHKiGh-ippisFDZIhRpwYSw63IusuTgKChJ5SE8H-m56nsCWSX6GVAgQpJEq2mCY25suO2oeh_LmhFSo8jnY1pahGns1afxEtesJM7uGwr9CdAavDkDTuiIMC-940l91ywaPI1OXcfesTPK27Z_eAgcGUV3KlY_DCgi09QaGlowc0jaldCEq87R5zzxg"
            alt="Ratnakar's NGO Community Gathering"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031635]/90 to-[#031635]/40"></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-4 py-1 rounded-full text-xs font-bold shadow">
            <span className="material-symbols-outlined text-[16px] fill">verified</span>
            Ratnakar&apos;s NGO — 80G Tax Exemption Certified
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Empowering Communities, Changing Lives
          </h1>

          <p className="text-lg sm:text-xl text-[#b6c6ef] max-w-2xl font-normal">
            Join us in our mission to create sustainable change globally through grassroots initiatives, education, and direct action.
          </p>

          <div className="flex gap-4 mt-4 flex-wrap justify-center">
            <button
              onClick={() => openDonateWithCause("General Fund")}
              className="bg-[#F57C00] text-white px-8 py-3.5 rounded-lg text-sm font-bold hover:bg-[#F57C00]/90 transition-colors shadow-lg"
            >
              Donate Now (80G Benefit)
            </button>
            <Link
              href="/volunteer"
              className="border border-white text-white px-8 py-3.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stitch Stats Section */}
      <section className="max-w-[1280px] mx-auto px-6 mb-16">
        <div className="bg-white border border-[#e0e3e5] rounded-xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#e0e3e5]">
          <div className="flex flex-col gap-2 pt-4 md:pt-0">
            <span className="text-4xl font-bold text-[#031635]">50k+</span>
            <span className="text-sm font-medium text-[#44474e]">People Helped</span>
          </div>

          <div className="flex flex-col gap-2 pt-8 md:pt-0">
            <span className="text-4xl font-bold text-[#031635]">120+</span>
            <span className="text-sm font-medium text-[#44474e]">Active Projects</span>
          </div>

          <div className="flex flex-col gap-2 pt-8 md:pt-0">
            <span className="text-4xl font-bold text-[#031635]">1,500+</span>
            <span className="text-sm font-medium text-[#44474e]">Volunteers</span>
          </div>
        </div>
      </section>

      {/* 3. Stitch Mission Brief Section */}
      <section className="max-w-[1280px] mx-auto px-6 mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-[#031635]">Our Mission & Vision</h2>
          <p className="text-base text-[#44474e] leading-relaxed">
            We believe in a world where every community has the resources to thrive. Through strategic partnerships, verifiable accountability, and on-the-ground action, Ratnakar&apos;s NGO is dedicated to long-term sustainable development.
          </p>
          <Link
            href="/about"
            className="text-sm font-bold text-[#964900] hover:underline underline-offset-4 w-fit flex items-center gap-1"
          >
            Read Our Full Story <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>

        <div className="h-72 rounded-xl overflow-hidden shadow-sm border border-[#e0e3e5]">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGvdr344GLk3CxWvw0CKCm_1eQ9rBasKqjm71loAJbgkRl3MJI9DeXhJ4saGxAH9tzxMGdswz73WfFMIeCF7LopuNWtRIWUik7DfZjwsQFN9ZreVVxcQ0IURRaMTepgGrkJNdPNCHITGIHqvOHXCaAk3LTnM0LpO0lJgotfeMx9oRpgfanYoJQVCMnnHpPR8kFfDcZhM5iUx_8_jnQSEEkIzKdZQrAxlaCF_h7UQ4umIxnygfQ4ihI5Q"
            alt="Planting Sapling Impact"
          />
        </div>
      </section>

      {/* 4. Stitch Current Campaigns */}
      <section className="max-w-[1280px] mx-auto px-6 mb-16 bg-[#f7f9fb] py-12 rounded-xl border border-[#e0e3e5]">
        <div className="flex justify-between items-end mb-8 px-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#031635]">Current Campaigns</h2>
            <p className="text-sm text-[#44474e] mt-1">Support our urgent active initiatives.</p>
          </div>
          <Link
            href="/donate"
            className="hidden md:block text-sm font-medium border border-[#031635] text-[#031635] px-4 py-2 rounded hover:bg-[#031635]/5 transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {campaigns.map((c) => {
            const pct = Math.min(100, Math.round((c.raisedAmount / c.targetAmount) * 100));
            return (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-[#e0e3e5] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="h-44 bg-slate-100">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="inline-flex items-center gap-1 bg-[#E8F5E9] text-[#1B5E20] px-2.5 py-1 rounded w-fit">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span className="text-xs font-bold">Verified Project</span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#031635] leading-tight">{c.title}</h3>
                  <p className="text-sm text-[#44474e] line-clamp-2">{c.description}</p>

                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span className="text-[#031635] font-bold">₹{c.raisedAmount.toLocaleString()} Raised</span>
                      <span className="text-[#44474e]">Goal: ₹{c.targetAmount.toLocaleString()}</span>
                    </div>

                    <div className="w-full bg-[#e0e3e5] rounded-full h-2">
                      <div className="bg-[#F57C00] h-2 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => openDonateWithCause(c.title)}
                    className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white py-2.5 rounded text-sm font-bold transition-colors mt-2"
                  >
                    Donate
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Recent Activities Section */}
      <section className="max-w-[1280px] mx-auto px-6 mb-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#031635]">Recent NGO Activities</h2>
            <p className="text-sm text-[#44474e] mt-1">Ground level intervention and field operations.</p>
          </div>
          <Link href="/activities" className="text-sm font-bold text-[#964900] hover:underline flex items-center gap-1">
            Explore All Activities <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((act) => (
            <div key={act.id} className="bg-white rounded-xl p-6 border border-[#e0e3e5] shadow-sm flex flex-col sm:flex-row gap-6 items-center">
              <img src={act.image} alt={act.title} className="w-full sm:w-44 h-40 object-cover rounded-lg shrink-0" />
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded text-xs font-bold">
                  {act.category}
                </span>
                <h3 className="text-lg font-semibold text-[#031635]">{act.title}</h3>
                <p className="text-xs text-[#44474e] line-clamp-2">{act.description}</p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-[#F57C00]">location_on</span> {act.location}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-[#031635]">groups</span> {act.beneficiaries}+ Beneficiaries</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        defaultCause={selectedCause}
      />
    </div>
  );
}
