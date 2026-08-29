"use client";

import { useState, useEffect } from "react";

export default function MemberPortalPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [memberData, setMemberData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/membership")
      .then((res) => res.json())
      .then((data) => {
        if (data.members && data.members.length > 0) {
          setMembers(data.members);
          setMemberData(data.members[0]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="bg-white p-6 rounded-xl border border-[#e0e3e5] shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3 py-1 rounded text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-[16px] fill">shield</span>
            Member Portal & Digital Identification Card
          </span>
          <h1 className="text-2xl font-bold text-[#031635]">Institutional Member Dashboard</h1>
        </div>

        {members.length > 0 && (
          <select
            value={memberData?.id || ""}
            onChange={(e) => {
              const found = members.find((m) => m.id === e.target.value);
              if (found) setMemberData(found);
            }}
            className="px-3 py-1.5 rounded border border-[#c5c6cf] text-xs font-semibold text-[#031635]"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.memberName} ({m.membershipNo})
              </option>
            ))}
          </select>
        )}
      </div>

      {memberData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Digital Member Card */}
          <div className="bg-gradient-to-br from-[#031635] via-[#1a2b4b] to-[#0f1912] text-white p-8 rounded-2xl shadow-xl space-y-6 border border-slate-700 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-white/20 pb-4">
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">Ratnakar&apos;s NGO</span>
                <span className="text-[10px] text-[#ffb786] font-bold uppercase tracking-wider block">Institutional Member</span>
              </div>
              <span className="material-symbols-outlined text-3xl text-[#F57C00] fill">shield</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Member Name</span>
                <p className="text-2xl font-bold text-white">{memberData.memberName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Membership ID</span>
                  <p className="font-mono font-bold text-[#ffb786]">{memberData.membershipNo}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Plan Type</span>
                  <p className="font-bold text-white">{memberData.plan?.title || "Annual Member"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Valid From</span>
                  <p>{new Date(memberData.validFrom).toLocaleDateString("en-IN")}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Valid Till</span>
                  <p className="text-[#81c784] font-bold">{new Date(memberData.validTill).toLocaleDateString("en-IN")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Privileges & Governance */}
          <div className="bg-white rounded-xl border border-[#e0e3e5] p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#031635]">Member Privileges & Governance</h2>
            <ul className="space-y-4 text-xs text-[#44474e]">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#1B5E20] fill">verified</span>
                <div>
                  <strong className="block text-[#031635] text-sm">Voting Rights in General Body Meetings</strong>
                  <span>Active members hold voting rights for annual trustee resolutions.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#1B5E20] fill">verified</span>
                <div>
                  <strong className="block text-[#031635] text-sm">Quarterly Financial & Audit Statements</strong>
                  <span>Direct email delivery of audited expenditure and project outcome metrics.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#1B5E20] fill">verified</span>
                <div>
                  <strong className="block text-[#031635] text-sm">Field Inspection Invitations</strong>
                  <span>Special invitations to observe digital school lab inaugurations and health camps.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center text-slate-500 py-12">No active member records found.</p>
      )}
    </div>
  );
}
