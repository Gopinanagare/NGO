"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import VolunteerIDCard from "@/components/VolunteerIDCard";

export default function VolunteerPortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [volData, setVolData] = useState<any>(null);

  // Check if session token exists on load
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then(async (data) => {
        if (data.user && data.user.email) {
          const vRes = await fetch("/api/volunteers?status=ALL");
          const vData = await vRes.json();
          if (vData.volunteers) {
            const found = vData.volunteers.find(
              (v: any) => v.email.toLowerCase() === data.user.email.toLowerCase()
            );
            if (found) {
              setVolData(found);
              setIsLoggedIn(true);
            }
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid email or password");
      }

      // Fetch volunteer profile for logged in user
      const volRes = await fetch("/api/volunteers?status=ALL");
      const volResData = await volRes.json();

      if (volResData.volunteers) {
        const foundVol = volResData.volunteers.find(
          (v: any) => v.email.toLowerCase() === email.toLowerCase().trim()
        );

        if (foundVol) {
          setVolData(foundVol);
          setIsLoggedIn(true);
        } else {
          setLoginError("No volunteer profile found associated with this account.");
        }
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in to Volunteer Portal");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    setVolData(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#e0e3e5] shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-[16px] fill">badge</span>
            Official Volunteer Portal
          </span>
          <h1 className="text-2xl font-bold text-[#031635]">Volunteer Digital Portal</h1>
        </div>

        {isLoggedIn && volData && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block text-xs">
              <p className="font-bold text-[#031635]">{volData.name}</p>
              <p className="text-slate-500 font-mono text-[11px]">{volData.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-slate-100 hover:bg-slate-200 text-[#031635] font-bold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span> Log Out
            </button>
          </div>
        )}
      </div>

      {/* LOGIN FORM IF NOT LOGGED IN */}
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#e0e3e5] shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#031635] text-[#F57C00] rounded-full flex items-center justify-center mx-auto shadow">
              <span className="material-symbols-outlined text-2xl">badge</span>
            </div>
            <h2 className="text-xl font-bold text-[#031635]">Volunteer Account Login</h2>
            <p className="text-xs text-slate-500">Log in with your registered email and password to access your Volunteer ID Card.</p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#031635] mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="rohan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-[#031635] mb-1">Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              {loading ? "Logging in..." : "Log In to Volunteer Portal"}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Not registered as a volunteer yet?{" "}
              <Link href="/volunteer" className="font-bold text-[#F57C00] hover:underline">
                Apply Here
              </Link>
            </p>
          </div>
        </div>
      ) : (
        /* LOGGED IN VOLUNTEER DASHBOARD */
        <div className="space-y-8">
          {/* Status Alert Banner */}
          {volData.status === "PENDING" && (
            <div className="p-6 bg-amber-50 text-amber-900 border border-amber-200 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">hourglass_top</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-amber-950">Application Pending NGO Admin Verification</h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Welcome, <strong>{volData.name}</strong>! Your volunteer application has been received and is currently <strong>PENDING REVIEW</strong> by the NGO Administrator. Once verified and approved by the Admin, your official Digital Volunteer ID Card will be generated and issued right here.
                </p>
              </div>
            </div>
          )}

          {volData.status === "REJECTED" && (
            <div className="p-6 bg-red-50 text-red-900 border border-red-200 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">cancel</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-red-950">Application Status: Rejected</h3>
                <p className="text-xs text-red-800 leading-relaxed">
                  Your volunteer application was reviewed and rejected by the NGO Administrator. No official Digital ID Card has been issued for this profile.
                </p>
              </div>
            </div>
          )}

          {(volData.status === "APPROVED" || volData.status === "VERIFIED") && (
            <div className="p-4 bg-[#E8F5E9] text-[#1B5E20] border border-[#d9e6da] rounded-2xl flex items-center gap-3 shadow-sm">
              <span className="material-symbols-outlined text-2xl fill">verified</span>
              <div className="text-xs">
                <p className="font-bold text-sm">Verified & Approved NGO Volunteer</p>
                <p>Your official Digital Volunteer ID Card is active and authorized by Ratnakar&apos;s NGO Management.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Dashboard Details (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#e0e3e5] shadow-sm space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Verification Status</span>
                  <p className={`text-xl font-black flex items-center gap-1.5 ${
                    volData.status === "APPROVED" || volData.status === "VERIFIED"
                      ? "text-[#1B5E20]"
                      : volData.status === "REJECTED"
                      ? "text-red-700"
                      : "text-amber-600"
                  }`}>
                    <span className="material-symbols-outlined fill text-2xl">
                      {volData.status === "APPROVED" || volData.status === "VERIFIED" ? "verified" : "hourglass_empty"}
                    </span>
                    {volData.status}
                  </p>
                  <p className="text-xs text-slate-500">{volData.verificationNotes || "Awaiting Admin Action"}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#e0e3e5] shadow-sm space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Total Logged Hours</span>
                  <p className="text-3xl font-black text-[#F57C00]">{volData.totalHours} Hours</p>
                  <p className="text-xs text-slate-500">Verified Service Hours</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#e0e3e5] shadow-sm space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Issued Certificates</span>
                  <p className="text-3xl font-black text-[#031635]">{volData.certificates?.length || 0}</p>
                  <p className="text-xs text-slate-500">Official Non-Profit Certificates</p>
                </div>
              </div>

              {/* Assigned Projects */}
              <div className="bg-white rounded-2xl border border-[#e0e3e5] shadow-sm p-6 space-y-4">
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
              <div className="bg-white rounded-2xl border border-[#e0e3e5] shadow-sm p-6 space-y-4">
                <h2 className="text-lg font-bold text-[#031635]">Official Certificates of Appreciation</h2>
                <div className="divide-y divide-slate-100 text-xs">
                  {volData.certificates && volData.certificates.length > 0 ? (
                    volData.certificates.map((cert: any) => (
                      <div key={cert.id} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-[#031635]">{cert.projectName}</p>
                          <p className="text-slate-500">Cert No: {cert.certificateNo} • Verified Hours: {cert.totalHours || cert.verifiedHours}</p>
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

            {/* Volunteer Digital ID Card Column (4 Cols) */}
            <div className="lg:col-span-4 space-y-4 sticky top-24">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-[#031635]">Digital Volunteer ID Card</h3>
                <p className="text-xs text-[#44474e]">
                  {volData.status === "APPROVED" || volData.status === "VERIFIED"
                    ? "Official digital badge authorized by NGO Admin."
                    : volData.status === "REJECTED"
                    ? "Application Rejected. No ID card issued."
                    : "Application Under Admin Verification. Official ID Card will be issued upon Admin approval."}
                </p>
              </div>

              <VolunteerIDCard volunteer={volData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
