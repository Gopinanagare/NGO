"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DonateModal from "@/components/DonateModal";

const DEFAULT_CAMPAIGNS = [
  {
    id: "camp-1",
    title: "Educate Rural Children & Youth",
    description: "Providing school kits, stationery, digital learning tablets, and qualified teachers to children in underprivileged rural villages across Bihar.",
    targetAmount: 500000,
    raisedAmount: 185000,
    image: "/images/events/blanket_distribution.jpg",
    category: "Education",
  },
  {
    id: "camp-2",
    title: "Annual Free Health & Cataract Surgery Camps",
    description: "Organizing specialist eye and medical diagnosis camps with Narayan Medical College & Hospital (NMCH Jamuhar, Rohtas) with free medicine and cataract surgery referrals.",
    targetAmount: 750000,
    raisedAmount: 320000,
    image: "/images/events/health_camp_doctors.jpg",
    category: "Healthcare",
  },
  {
    id: "camp-3",
    title: "Rural Blanket & Winter Relief Drive",
    description: "Distributing warm winter blankets, clothing, and nutritional aid to vulnerable elderly villagers and marginalized families.",
    targetAmount: 300000,
    raisedAmount: 140000,
    image: "/images/events/honoring_elders.jpg",
    category: "Social Welfare",
  },
];

const DEFAULT_ACTIVITIES = [
  {
    id: "act-1",
    title: "Free Eye, Cataract & Medical Health Camp",
    category: "Medical Relief",
    description: "Organized in collaboration with Narayan Medical College & Hospital (NMCH Jamuhar, Rohtas) with free ophthalmologist checkups, cataract screening, and free essential medicines.",
    location: "Sihada, Goradiha, Aurangabad, Bihar",
    beneficiaries: 1450,
    image: "/images/events/health_camp_doctors.jpg",
  },
  {
    id: "act-2",
    title: "Blanket, Clothes & Educational Kit Distribution",
    category: "Education & Skill",
    description: "Annual distribution of warm blankets, clothes, and school stationery kits for economically underprivileged children and elderly citizens.",
    location: "Pipardih & Sihada, Aurangabad, Bihar",
    beneficiaries: 650,
    image: "/images/events/blanket_distribution.jpg",
  },
];

export default function HomePage() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState("General Fund");
  const [campaigns, setCampaigns] = useState<any[]>(DEFAULT_CAMPAIGNS);
  const [activities, setActivities] = useState<any[]>(DEFAULT_ACTIVITIES);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => {
        if (data.campaigns && data.campaigns.length > 0) {
          setCampaigns(data.campaigns);
        }
      })
      .catch(() => {});

    fetch("/api/activities")
      .then((res) => res.json())
      .then((data) => {
        if (data.activities && data.activities.length > 0) {
          setActivities(data.activities);
        }
      })
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
        <div className="absolute inset-0 z-0 bg-[#031635]">
          <img
            className="w-full h-full object-cover opacity-45"
            src="/images/events/health_camp_doctors.jpg"
            alt="Maa Samundri Devi Charitable Trust Free Health and Medical Camp"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#031635]/95 via-[#031635]/80 to-[#031635]/60"></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-4 py-1.5 rounded-full text-xs font-bold shadow">
            <span className="material-symbols-outlined text-[16px] fill">verified</span>
            Maa Samundri Devi Charitable Trust — 80G, 12A &amp; NGO Darpan (BR/2024/0378911) Certified
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Empowering Communities, Transforming Lives
          </h1>

          <p className="text-base sm:text-lg text-[#b6c6ef] max-w-2xl font-normal">
            Public Charitable Trust (Deed No. 16/2024, PAN: AALTM2352G) dedicated to grassroots educational aid, free healthcare relief camps, women self-reliance, and rural welfare across Bihar and India.
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

      {/* 3. President's Message & Core Mission */}
      <section className="max-w-[1280px] mx-auto px-6 mb-16">
        <div className="bg-white border border-[#e0e3e5] rounded-2xl p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* President Photo */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden shadow-md border-4 border-white ring-1 ring-slate-200">
              <img
                className="w-full h-full object-cover object-top"
                src="/images/kamla_kumari.jpg"
                alt="Smt. Kamla Kumari - President, Maa Samundri Devi Charitable Trust"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#031635]/90 via-[#031635]/40 to-transparent p-3 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider bg-[#F57C00] px-2 py-0.5 rounded-full inline-block mb-1">
                  Founder & President
                </span>
                <p className="font-bold text-sm">Smt. Kamla Kumari</p>
                <p className="text-[10px] text-slate-300">श्रीमती कमला कुमारी (अध्यक्ष)</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-3">📞 +91 77660 84876 • Aurangabad, Bihar</p>
          </div>

          {/* President Message Content */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold w-fit">
              <span className="material-symbols-outlined text-[16px]">format_quote</span>
              President&apos;s Message
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#031635] leading-tight">
              &quot;True service begins when we reach the last person in the village.&quot;
            </h2>
            <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
              Maa Samundri Devi Charitable Trust was established to bring real, verifiable assistance directly to families who need it most. From providing uniforms and educational materials to poor students, to organizing free healthcare diagnosis camps and teaching vocational tailoring skills to rural women, our trust is dedicated to human dignity and self-reliance.
            </p>
            <div className="bg-[#f7f9fb] p-4 rounded-xl border border-[#e0e3e5] text-xs text-[#031635] space-y-1.5">
              <p>🏛️ <strong>Regd. Trust Deed:</strong> No. 16/2024, District Registry Office, Aurangabad (Bihar)</p>
              <p>🎖️ <strong>NGO Darpan Unique ID:</strong> <span className="font-mono font-bold text-emerald-800">BR/2024/0378911</span> (Doc: IN-BR-2400378911)</p>
              <p>📜 <strong>Tax Approvals:</strong> 12A URN: AALTM2352GE20261 | 80G Tax Exemption: AALTM2352GF20261</p>
              <p>🏦 <strong>Official Bank:</strong> Central Bank of India (A/C: <span className="font-mono font-bold">4156734014</span>, IFSC: <span className="font-mono font-bold">CBIN0284035</span>)</p>
            </div>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/about"
                className="bg-[#031635] hover:bg-[#1a2b4b] text-white text-xs font-bold px-6 py-3 rounded-lg shadow transition-colors flex items-center gap-1.5"
              >
                Meet the Board of Trustees <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <Link
                href="/activities"
                className="text-xs font-bold text-[#964900] hover:underline underline-offset-4 flex items-center gap-1"
              >
                View Our 7 Core Programs &rarr;
              </Link>
            </div>
          </div>
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
