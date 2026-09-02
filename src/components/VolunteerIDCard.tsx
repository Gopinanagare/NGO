"use client";

import React from "react";

interface VolunteerIDCardProps {
  volunteer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    city?: string | null;
    skills?: string | null;
    profilePhoto?: string | null;
    status: string;
    createdAt?: string | Date;
  };
}

export default function VolunteerIDCard({ volunteer }: VolunteerIDCardProps) {
  const volNumber = `VOL-2026-${volunteer.id ? volunteer.id.slice(0, 6).toUpperCase() : "8841"}`;
  const isApproved = volunteer.status === "APPROVED" || volunteer.status === "VERIFIED";

  const defaultPhoto =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";

  const photoSrc = volunteer.profilePhoto && volunteer.profilePhoto.trim() !== ""
    ? volunteer.profilePhoto
    : defaultPhoto;

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e0e3e5] font-sans transition-all transform hover:scale-[1.01]">
      {/* Header */}
      <div className="bg-[#031635] text-white p-5 text-center relative border-b-4 border-[#F57C00]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#F57C00] text-2xl fill">favorite</span>
          <span className="text-lg font-black tracking-tight text-white">Ratnakar&apos;s NGO</span>
        </div>
        <p className="text-[10px] text-[#ffb786] font-bold uppercase tracking-widest">
          Official Volunteer ID Card
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5 text-center bg-gradient-to-b from-[#f7f9fb] to-white">
        {/* Photo Container */}
        <div className="relative w-28 h-28 mx-auto">
          <img
            src={photoSrc}
            alt={volunteer.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mx-auto"
          />
          <span
            className={`absolute bottom-0 right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white ${
              isApproved ? "bg-[#1B5E20]" : "bg-amber-500"
            }`}
            title={isApproved ? "Approved Volunteer" : "Pending Verification"}
          >
            <span className="material-symbols-outlined text-[14px] fill">
              {isApproved ? "check" : "schedule"}
            </span>
          </span>
        </div>

        {/* Volunteer Info */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-[#031635] tracking-tight">{volunteer.name}</h3>
          <p className="text-xs font-mono font-bold text-[#F57C00]">{volNumber}</p>
        </div>

        {/* Status Badge */}
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isApproved
                ? "bg-[#E8F5E9] text-[#1B5E20] border border-[#d9e6da]"
                : "bg-amber-50 text-amber-800 border border-amber-200"
            }`}
          >
            <span className="material-symbols-outlined text-[14px] fill">
              {isApproved ? "verified" : "hourglass_empty"}
            </span>
            {isApproved ? "VERIFIED VOLUNTEER" : "PENDING VERIFICATION"}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-left bg-white p-3.5 rounded-xl border border-[#e0e3e5] text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">City / Base</span>
            <span className="font-semibold text-slate-800 truncate block">{volunteer.city || "India"}</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Issued Date</span>
            <span className="font-semibold text-slate-800 block">
              {volunteer.createdAt
                ? new Date(volunteer.createdAt).toLocaleDateString("en-IN")
                : new Date().toLocaleDateString("en-IN")}
            </span>
          </div>

          <div className="col-span-2 border-t border-slate-100 pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Skills & Domain</span>
            <span className="font-semibold text-slate-700 block truncate">{volunteer.skills || "Community Engagement"}</span>
          </div>
        </div>

        {/* Card Footer Bar */}
        <div className="pt-2 flex justify-between items-center border-t border-slate-100 text-[10px] text-slate-400">
          <span>Auth: Ratnakar NGO Admin</span>
          <span className="font-mono text-[#031635] font-bold">80G & 12A Certified</span>
        </div>
      </div>
    </div>
  );
}
