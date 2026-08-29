"use client";

import { useState } from "react";
import DonateModal from "@/components/DonateModal";

export default function DonatePage() {
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState("General Fund");

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Left Column: Context & Impact Image */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">
            Make a Lasting Impact Today.
          </h1>
          <div className="w-full h-72 md:h-[450px] rounded-xl overflow-hidden shadow-sm relative border border-[#e0e3e5]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKOOsy2PUMitoV5ZISVWt0IScdX3KdbDLVQFohSuCtdl_DK5G0Sm4-IyHm2TaBdknuh-fhHB-xu0g5Ir3viIm4FN-NiIYmLvMXvuREOocnrvkP35I3v81S8Srx9NWO-J3ClEZULo4RduqDv-UG6ZpPobgh9S1To_go49L6xDur1upuCJrKc4hrpV5u4ec1VO-jkjSKqE9E2rBtpRMrXhkqryaZJ5b6n-apL0C5RFp7b0ra9llcPCtqEg"
              alt="Community Impact"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-lg font-normal">
                &quot;Your support directly enables grassroots transformation in communities that need it most.&quot;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#E8F5E9] p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[#1B5E20] mb-1 fill">security</span>
              <span className="text-xs font-bold text-[#1B5E20] text-center">Secure Payments</span>
            </div>
            <div className="bg-[#E8F5E9] p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[#1B5E20] mb-1 fill">receipt_long</span>
              <span className="text-xs font-bold text-[#1B5E20] text-center">80G Tax-Deductible</span>
            </div>
            <div className="bg-[#E8F5E9] p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[#1B5E20] mb-1 fill">verified</span>
              <span className="text-xs font-bold text-[#1B5E20] text-center">Verified NGO</span>
            </div>
          </div>
        </div>

        {/* Right Column: Donation Overview Card */}
        <div className="w-full md:w-1/2">
          <div className="bg-white rounded-xl border border-[#e0e3e5] shadow-sm p-6 md:p-8 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3 py-1 rounded text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Section 80G Tax Benefit Eligible
            </div>

            <h2 className="text-2xl font-bold text-[#031635]">Support Our Key Causes</h2>
            <p className="text-sm text-[#44474e]">
              All donations to Ratnakar&apos;s NGO generate an official 80G PDF receipt containing transaction ID, 80G registration details, and authorized signature.
            </p>

            <div className="space-y-4">
              {[
                { title: "Educate 500 Rural Children", desc: "Provides school kits, digital tabs & qualified teachers.", preset: 2500 },
                { title: "Mobile Health & Vaccination Clinic", desc: "Deploys doctors and free medicines in remote slums.", preset: 5000 },
                { title: "Women Skill & Empowerment Center", desc: "Funds sewing machines and computer training.", preset: 1000 },
                { title: "General Emergency & Relief Fund", desc: "Flexible allocation for urgent community needs.", preset: 500 },
              ].map((c) => (
                <div key={c.title} className="p-4 bg-[#f7f9fb] border border-[#e0e3e5] rounded-lg flex justify-between items-center gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[#031635]">{c.title}</h3>
                    <p className="text-xs text-[#44474e]">{c.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCause(c.title);
                      setDonateModalOpen(true);
                    }}
                    className="bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs px-4 py-2 rounded shrink-0 shadow transition-colors"
                  >
                    Donate ₹{c.preset.toLocaleString()}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e0e3e5]">
              <button
                onClick={() => {
                  setSelectedCause("General Fund");
                  setDonateModalOpen(true);
                }}
                className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm py-3.5 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">favorite</span> Custom Donation via Razorpay
              </button>
            </div>
          </div>
        </div>
      </div>

      <DonateModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        defaultCause={selectedCause}
      />
    </div>
  );
}
