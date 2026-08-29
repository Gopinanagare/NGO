"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function VolunteerPortalPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [selectedVolId, setSelectedVolId] = useState("");
  const [volData, setVolData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/volunteers?status=ALL")
      .then((res) => res.json())
      .then((data) => {
        if (data.volunteers && data.volunteers.length > 0) {
          setVolunteers(data.volunteers);
          setSelectedVolId(data.volunteers[0].id);
          setVolData(data.volunteers[0]);
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectVolunteer = (id: string) => {
    setSelectedVolId(id);
    const found = volunteers.find((v) => v.id === id);
    if (found) setVolData(found);
  };

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-[#e0e3e5] shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3 py-1 rounded text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-[16px] fill">verified</span>
            Volunteer Portal & Hours Tracker
          </span>
          <h1 className="text-2xl font-bold text-[#031635]">Volunteer Dashboard</h1>
        </div>

        {volunteers.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-700">Switch Account:</label>
            <select
              value={selectedVolId}
              onChange={(e) => handleSelectVolunteer(e.target.value)}
              className="px-3 py-1.5 rounded border border-[#c5c6cf] text-xs font-semibold text-[#031635]"
            >
              {volunteers.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {volData ? (
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e0e3e5] shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Verification Status</span>
              <p className="text-xl font-black text-[#1B5E20] flex items-center gap-1.5">
                <span className="material-symbols-outlined fill text-2xl">verified</span>
                {volData.status}
              </p>
              <p className="text-xs text-slate-500">{volData.verificationNotes || "Background check cleared"}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e0e3e5] shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Total Logged Hours</span>
              <p className="text-3xl font-black text-[#F57C00]">{volData.totalHours} Hours</p>
              <p className="text-xs text-slate-500">Verified Service Hours</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e0e3e5] shadow-sm space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Issued Certificates</span>
              <p className="text-3xl font-black text-[#031635]">{volData.certificates?.length || 0}</p>
              <p className="text-xs text-slate-500">Official Non-Profit Certificates</p>
            </div>
          </div>

          {/* Assigned Projects */}
          <div className="bg-white rounded-xl border border-[#e0e3e5] shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#031635]">Assigned Projects & Activities</h2>
            <div className="divide-y divide-slate-100 text-xs">
              {volData.assignments && volData.assignments.length > 0 ? (
                volData.assignments.map((a: any) => (
                  <div key={a.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[#031635]">{a.activity?.title || "Community Drive"}</p>
                      <p className="text-slate-500">Role: {a.role || "Volunteer Leader"}</p>
                    </div>
                    <span className="bg-[#E8F5E9] text-[#1B5E20] font-bold px-2.5 py-1 rounded text-[10px]">
                      {a.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-4 text-slate-500 text-center">No active project assignments yet.</p>
              )}
            </div>
          </div>

          {/* Download Certificates */}
          <div className="bg-white rounded-xl border border-[#e0e3e5] shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#031635]">Official Certificates of Appreciation</h2>
            <div className="divide-y divide-slate-100 text-xs">
              {volData.certificates && volData.certificates.length > 0 ? (
                volData.certificates.map((cert: any) => (
                  <div key={cert.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[#031635]">{cert.projectName}</p>
                      <p className="text-slate-500">Cert No: {cert.certificateNo} • Verified Hours: {cert.verifiedHours}</p>
                    </div>
                    <a
                      href={`/api/volunteers/certificates/${cert.id}/download`}
                      download
                      className="bg-[#F57C00] text-white font-bold text-xs px-4 py-2 rounded shadow transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span> Download PDF
                    </a>
                  </div>
                ))
              ) : (
                <p className="py-4 text-slate-500 text-center">No certificates issued yet. Complete 10+ hours to earn your first certificate.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-slate-500 py-12">No volunteer profiles found in database.</p>
      )}
    </div>
  );
}
