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
  const isApproved = volunteer.status === "APPROVED" || volunteer.status === "VERIFIED";
  const isRejected = volunteer.status === "REJECTED";
  const volNumber = `VOL-2026-${volunteer.id ? volunteer.id.slice(0, 6).toUpperCase() : "8841"}`;

  const defaultPhoto =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";

  const photoSrc = volunteer.profilePhoto && volunteer.profilePhoto.trim() !== ""
    ? volunteer.profilePhoto
    : defaultPhoto;

  if (isRejected) {
    return (
      <div className="w-full max-w-sm mx-auto bg-red-50 rounded-2xl p-6 text-center border border-red-200 shadow-sm space-y-3">
        <div className="w-12 h-12 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-2xl">cancel</span>
        </div>
        <h3 className="text-base font-bold text-red-900">Application Rejected</h3>
        <p className="text-xs text-red-700">
          This volunteer application was reviewed and rejected by the NGO Admin. No official ID card has been issued.
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border font-sans transition-all relative ${
      isApproved ? "border-[#e0e3e5]" : "border-amber-300"
    }`}>
      {/* Pending Watermark Overlay Header */}
      {!isApproved && (
        <div className="bg-amber-500 text-slate-950 font-black text-[11px] py-1.5 px-3 text-center uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-inner">
          <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
          Application Under Admin Review — ID Not Issued
        </div>
      )}

      {/* Card Header */}
      <div className="bg-[#031635] text-white p-5 text-center relative border-b-4 border-[#F57C00]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#F57C00] text-2xl fill">favorite</span>
          <span className="text-lg font-black tracking-tight text-white">Ratnakar&apos;s NGO</span>
        </div>
        <p className="text-[10px] text-[#ffb786] font-bold uppercase tracking-widest">
          {isApproved ? "Official Volunteer ID Card" : "Volunteer ID Application"}
        </p>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-5 text-center bg-gradient-to-b from-[#f7f9fb] to-white">
        {/* Photo Container */}
        <div className="relative w-28 h-28 mx-auto">
          <img
            src={photoSrc}
            alt={volunteer.name}
            className={`w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mx-auto ${
              !isApproved ? "opacity-75 grayscale-[30%]" : ""
            }`}
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
          <p className="text-xs font-mono font-bold text-[#F57C00]">
            {isApproved ? volNumber : "VOL-2026-PENDING"}
          </p>
        </div>

        {/* Status Badge */}
        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
              isApproved
                ? "bg-[#E8F5E9] text-[#1B5E20] border border-[#d9e6da]"
                : "bg-amber-100 text-amber-900 border border-amber-300 animate-pulse"
            }`}
          >
            <span className="material-symbols-outlined text-[14px] fill">
              {isApproved ? "verified" : "pending_actions"}
            </span>
            {isApproved ? "OFFICIAL VERIFIED VOLUNTEER" : "UNDER ADMIN REVIEW"}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-left bg-white p-3.5 rounded-xl border border-[#e0e3e5] text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">City / Base</span>
            <span className="font-semibold text-slate-800 truncate block">{volunteer.city || "India"}</span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Application Date</span>
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
          <span>{isApproved ? "Auth: Ratnakar NGO Admin" : "Awaiting Admin Verification"}</span>
          <span className="font-mono text-[#031635] font-bold">80G Certified NGO</span>
        </div>
      </div>
    </div>
  );
}
