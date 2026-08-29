"use client";

import { useState, useEffect } from "react";

export default function DonorPortalPage() {
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/donations")
      .then((res) => res.json())
      .then((data) => {
        if (data.donations) setDonations(data.donations);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="bg-white p-6 rounded-xl border border-[#e0e3e5] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3 py-1 rounded text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-[16px] fill">receipt_long</span>
            Donor Portal & Tax Exemption Vault
          </span>
          <h1 className="text-2xl font-bold text-[#031635]">My 80G Tax Receipts & Donations</h1>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e0e3e5] shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#031635]">Issued Tax Exemption Receipts</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#f7f9fb] text-[#031635] font-bold uppercase text-[10px] border-b border-[#e0e3e5]">
              <tr>
                <th className="py-3 px-4">Receipt No</th>
                <th className="py-3 px-4">Donor Name</th>
                <th className="py-3 px-4">PAN Number</th>
                <th className="py-3 px-4">Cause</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Tax Benefit</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {donations.map((d) => (
                <tr key={d.id} className="hover:bg-[#f7f9fb]">
                  <td className="py-3 px-4 font-mono font-bold text-[#031635]">{d.receiptNumber}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{d.donorName}</td>
                  <td className="py-3 px-4 font-mono">{d.donorPan || "N/A"}</td>
                  <td className="py-3 px-4">{d.cause}</td>
                  <td className="py-3 px-4 font-bold text-[#031635]">₹{d.amount.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-4">
                    <span className="bg-[#E8F5E9] text-[#1B5E20] font-bold text-[10px] px-2.5 py-0.5 rounded">
                      Section 80G Verified
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={`/api/donations/${d.id}/receipt`}
                      download
                      className="bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs px-3.5 py-1.5 rounded shadow transition-colors flex items-center gap-1 w-fit"
                    >
                      <span className="material-symbols-outlined text-[14px]">download</span> PDF Receipt
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
