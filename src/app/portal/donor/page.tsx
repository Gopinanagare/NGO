"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DonorPortalPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/donations")
      .then((res) => res.json())
      .then((data) => {
        if (data.donations) setDonations(data.donations);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredDonations = donations.filter((d) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (d.donorEmail && d.donorEmail.toLowerCase().includes(q)) ||
      (d.donorPhone && d.donorPhone.includes(q)) ||
      (d.receiptNumber && d.receiptNumber.toLowerCase().includes(q)) ||
      (d.donorName && d.donorName.toLowerCase().includes(q)) ||
      (d.donorPan && d.donorPan.toLowerCase().includes(q))
    );
  });

  const totalDonated = filteredDonations.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      {/* 1. Bal Raksha Bharat Reference Style: Hero Banner */}
      <div className="bg-[#031635] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 space-y-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>

        <div className="max-w-3xl space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
            <span className="material-symbols-outlined text-[16px] fill">receipt_long</span>
            Maa Samundri Devi Charitable Trust • Donor Vault
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            DOWNLOAD YOUR DONATION ACKNOWLEDGEMENT RECEIPT AND TRACK YOUR DONATIONS ONLINE
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every contribution made towards our programs is eligible for 50% tax exemption under Section 80G of the Income Tax Act (URN: <strong className="text-white font-mono">AALTM2352GF20261</strong>, PAN: <strong className="text-white font-mono">AALTM2352G</strong>, Darpan: <strong className="text-white font-mono">BR/2024/0378911</strong>).
          </p>
        </div>

        {/* Quick Search / Login Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-md max-w-2xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-red-600">Already donated? Login / Track Here</h3>
              <p className="text-xs text-slate-500">Enter your Registered E-mail, Mobile Number, or Receipt Number</p>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold underline"
              >
                Clear Search
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-3.5 text-slate-400 text-[18px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Registered E-mail / Mobile / Receipt No"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
              />
            </div>
            <button
              onClick={() => {}}
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow transition-colors uppercase tracking-wider"
            >
              Search Receipts
            </button>
          </div>
        </div>
      </div>

      {/* 2. Donor Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase">Total Donations</span>
            <p className="text-2xl font-black text-[#031635] mt-1">{filteredDonations.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">payments</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase">Total Contribution</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">₹{totalDonated.toLocaleString("en-IN")}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase">80G Exemption Status</span>
            <p className="text-sm font-bold text-[#F57C00] mt-1">50% Tax Exemption Active</p>
            <span className="text-[10px] text-slate-400">Section 80G(5)(iv)</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">description</span>
          </div>
        </div>
      </div>

      {/* 3. Donations & Receipts Table */}
      <div className="bg-white rounded-2xl border border-[#e0e3e5] shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#031635]">Verified 80G Donation Receipts</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click &quot;PDF Receipt&quot; to download your official, electronically stamped 80G tax certificate.
            </p>
          </div>
          <Link
            href="/donate"
            className="bg-[#F57C00] hover:bg-[#d96d00] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add</span> Make a New Donation
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500 text-sm">Loading verified donation records...</div>
        ) : filteredDonations.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <span className="material-symbols-outlined text-slate-400 text-[40px]">search_off</span>
            <p className="text-sm font-bold text-slate-700">No matching donation records found</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              If you recently made a donation via bank transfer or cash at our field camp, please WhatsApp your receipt/details to <strong>+91 77660 84876</strong>.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#f7f9fb] text-[#031635] font-bold uppercase text-[10px] border-b border-[#e0e3e5]">
                <tr>
                  <th className="py-3 px-4">Receipt No</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Donor Name</th>
                  <th className="py-3 px-4">PAN Number</th>
                  <th className="py-3 px-4">Cause</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Tax Benefit</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-[#f7f9fb] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#031635]">{d.receiptNumber}</td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(d.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{d.donorName}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">{d.donorPan || "—"}</td>
                    <td className="py-3.5 px-4">{d.cause}</td>
                    <td className="py-3.5 px-4 font-bold text-base text-[#031635]">₹{Number(d.amount).toLocaleString("en-IN")}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-[#E8F5E9] text-[#1B5E20] font-bold text-[10px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px] fill">verified</span> 80G Valid
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={`/api/donations/${d.id}/receipt`}
                        download
                        className="bg-[#031635] hover:bg-[#1a2b4b] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition-colors flex items-center gap-1 w-fit"
                      >
                        <span className="material-symbols-outlined text-[14px]">download</span> PDF Receipt
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Bal Raksha Bharat Reference Footer Disclaimers & Data Security */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs text-slate-600">
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900">
          <p>
            <strong>Please note:</strong> This portal is meant for only those individuals and organizations who have donated to <strong>Maa Samundri Devi Charitable Trust</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-700 text-[18px]">description</span>
              Disclaimer:
            </h4>
            <p className="leading-relaxed">
              For online donations, donation acknowledgement receipts are generated instantly upon confirmation. Hard copy of the donation acknowledgement receipt can be provided on special request. Please write to <a href="mailto:contact@samundridevitrust.org" className="text-emerald-700 font-bold underline">contact@samundridevitrust.org</a> and quote your Receipt Number.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-700 text-[18px]">lock</span>
              Data Security &amp; Privacy:
            </h4>
            <p className="leading-relaxed">
              We take utmost precautions with your data. We never share your personal information with anyone. We also do not store any sensitive information like your credit card or bank details. All transactions are securely routed through certified payment gateways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
