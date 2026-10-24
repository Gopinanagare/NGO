"use client";

import { useState } from "react";
import Link from "next/link";
import DonateModal from "@/components/DonateModal";

export default function DonatePage() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState("General Fund");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-16">
      {/* Top Banner & Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold shadow-sm">
          <span className="material-symbols-outlined text-[16px] fill">verified</span>
          80G Tax Benefit (URN: AALTM2352GF20261) • Darpan: BR/2024/0378911
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-[#031635] tracking-tight">
          Support Our Mission &amp; Transform Lives
        </h1>
        <p className="text-sm sm:text-base text-[#44474e]">
          Every contribution directly finances free eye surgeries, education kits for underprivileged children, healthcare camps, and rural relief across Bihar.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Real Impact & Direct Bank Transfer */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden shadow-sm relative border border-[#e0e3e5]">
            <img
              src="/images/events/blanket_distribution.jpg"
              alt="Maa Samundri Devi Charitable Trust Distribution Drive"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#031635]/95 via-[#031635]/50 to-transparent">
              <span className="text-[11px] font-bold text-[#F57C00] uppercase tracking-wider block mb-1">
                Real Grassroots Impact
              </span>
              <p className="text-white text-base font-medium">
                &quot;Your support directly enables healthcare, nutrition, and child education in villages where need is greatest.&quot;
              </p>
            </div>
          </div>

          {/* Official Bank Account Details Card */}
          <div className="bg-[#f8fafc] border-2 border-emerald-600/30 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-700 text-[24px]">account_balance</span>
                <h3 className="text-base font-bold text-slate-900">Direct Bank Transfer (NEFT / RTGS / IMPS)</h3>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Official Account
              </span>
            </div>
            
            <p className="text-xs text-slate-600">
              For direct bank transfers from any banking app or net banking portal, use the verified official trust account details below:
            </p>

            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Beneficiary Name</span>
                <span className="font-bold text-slate-900 text-right">MAA SAMUNDRI DEVI CHARITABLE TRUST</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Bank Name</span>
                <span className="font-bold text-slate-900">Central Bank of India</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-emerald-700">4156734014</span>
                  <button
                    onClick={() => copyToClipboard("4156734014", "acc")}
                    className="p-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 text-[11px] font-bold flex items-center gap-0.5 transition-colors"
                    title="Copy Account Number"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    {copiedField === "acc" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">IFSC Code</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-emerald-700">CBIN0284035</span>
                  <button
                    onClick={() => copyToClipboard("CBIN0284035", "ifsc")}
                    className="p-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 text-[11px] font-bold flex items-center gap-0.5 transition-colors"
                    title="Copy IFSC Code"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    {copiedField === "ifsc" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Branch</span>
                <span className="font-semibold text-slate-800 text-right">S.N. Sinha College, Aurangabad, Bihar</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Account Type</span>
                <span className="font-semibold text-slate-800">Current Account (CD-GEN-PUB-OTH-URBAN)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">info</span>
              <span>After transferring, WhatsApp payment screenshot to <strong>+91 77660 84876</strong> or email to receive your 80G tax receipt.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Online Causes via Razorpay */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="bg-white rounded-2xl border border-[#e0e3e5] shadow-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#F57C00] uppercase tracking-wider">Instant Online Support</span>
              <h2 className="text-2xl font-bold text-[#031635]">Donate Online via Razorpay</h2>
              <p className="text-xs text-slate-600">
                Support our active programs with UPI, Credit/Debit Card, or NetBanking. Official 80G receipts are generated automatically upon successful payment.
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                { title: "Free Cataract Surgery & Eye Care Camp", desc: "Covers lens replacement operations & medicines with NMCH medical team.", preset: 3500 },
                { title: "Educate 500 Rural & Underprivileged Children", desc: "Provides school kits, uniforms & qualified teachers in villages.", preset: 2500 },
                { title: "Blanket & Warm Clothes for Rural Families", desc: "Distributes winter blankets and clothing to poor elderly citizens.", preset: 1000 },
                { title: "Women Skill Training & Empowerment", desc: "Funds sewing machines and vocational training for rural women.", preset: 1500 },
                { title: "General Emergency & Social Relief Fund", desc: "Flexible allocation for urgent community healthcare and relief.", preset: 500 },
              ].map((c) => (
                <div key={c.title} className="p-4 bg-[#f8fafc] border border-slate-200 rounded-xl flex justify-between items-center gap-4 hover:border-slate-300 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-[#031635]">{c.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{c.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCause(c.title);
                      setDonateModalOpen(true);
                    }}
                    className="bg-[#F57C00] hover:bg-[#d96d00] text-white font-bold text-xs px-4 py-2.5 rounded-lg shrink-0 shadow-sm transition-all"
                  >
                    Donate ₹{c.preset.toLocaleString()}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCause("General Fund");
                  setDonateModalOpen(true);
                }}
                className="w-full bg-[#031635] hover:bg-[#1a2b4b] text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffb786]">favorite</span> Custom Donation (Choose Any Amount)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bal Raksha Bharat Reference Style: Receipt Tracking & Acknowledgement Portal */}
      <section className="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-[#031635] text-white px-6 sm:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F57C00]">Donor Support &amp; Accountability</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              DOWNLOAD YOUR DONATION ACKNOWLEDGEMENT RECEIPT AND TRACK YOUR DONATIONS ONLINE
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Instant 80G Tax Exemption Certificates (URN: AALTM2352GF20261) electronically verified and ready for tax filing.
            </p>
          </div>
          <Link
            href="/portal/donor"
            className="bg-[#F57C00] hover:bg-[#d96d00] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shrink-0 flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            Go to Donor Portal &rarr;
          </Link>
        </div>

        {/* Interactive Lookup Box & Disclaimers */}
        <div className="p-6 sm:p-10 space-y-8 bg-[#fdfdfd]">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-extrabold text-red-600">Already donated? Login Here</h3>
            <p className="text-xs text-slate-600">
              Enter your registered donor email address or mobile number to track donation status and instantly download verified 80G receipts.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/portal/donor";
              }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <input
                type="text"
                placeholder="Enter Registered E-mail / Mobile"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm px-8 py-3 rounded-xl shadow transition-colors uppercase tracking-wider"
              >
                Track Now
              </button>
            </form>
          </div>

          {/* Legal Disclaimers & Security Guarantee (As seen on Bal Raksha Bharat Reference) */}
          <div className="border-t border-slate-200 pt-6 space-y-4 text-xs text-slate-600">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
              <p>
                <strong>Please note:</strong> This portal is meant for only those individuals and entities who have donated to <strong>Maa Samundri Devi Charitable Trust</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1.5">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-emerald-700">description</span>
                  Disclaimer:
                </p>
                <p className="leading-relaxed">
                  For online donations, donation acknowledgement receipts are made available immediately and emailed to your registered address upon payment confirmation. Hard copy of the donation acknowledgement receipt can be provided on special request. Please write to <a href="mailto:contact@samundridevitrust.org" className="text-emerald-700 font-semibold underline">contact@samundridevitrust.org</a> and quote your Receipt Number.
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-emerald-700">lock</span>
                  Data Security &amp; Privacy:
                </p>
                <p className="leading-relaxed">
                  We take utmost precautions with your data. We never share your personal information with anyone. We also do not store any sensitive information like your credit card, debit card, or bank credentials. All transactions are processed through RBI-authorized payment gateways.
                </p>
              </div>
            </div>
          </div>
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
