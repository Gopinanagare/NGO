"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MemberIDCard from "@/components/MemberIDCard";

export default function MemberPortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberData, setMemberData] = useState<any>(null);

  // Check if session token exists on load
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then(async (data) => {
        if (data.user && data.user.email) {
          const mRes = await fetch("/api/membership");
          const mData = await mRes.json();
          if (mData.members) {
            const found = mData.members.find(
              (m: any) => m.memberEmail.toLowerCase() === data.user.email.toLowerCase()
            );
            if (found) {
              setMemberData(found);
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

      // Fetch member profile for logged in user
      const mRes = await fetch("/api/membership");
      const mData = await mRes.json();

      if (mData.members) {
        const foundMember = mData.members.find(
          (m: any) => m.memberEmail.toLowerCase() === email.toLowerCase().trim()
        );

        if (foundMember) {
          setMemberData(foundMember);
          setIsLoggedIn(true);
        } else {
          setLoginError("No institutional membership record found for this account.");
        }
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in to Member Portal");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    setMemberData(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#e0e3e5] shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-[16px] fill">shield</span>
            Official Institutional Member Portal
          </span>
          <h1 className="text-2xl font-bold text-[#031635]">Member Digital Portal</h1>
        </div>

        {isLoggedIn && memberData && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block text-xs">
              <p className="font-bold text-[#031635]">{memberData.memberName}</p>
              <p className="text-slate-500 font-mono text-[11px]">{memberData.memberEmail}</p>
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
              <span className="material-symbols-outlined text-2xl">shield</span>
            </div>
            <h2 className="text-xl font-bold text-[#031635]">Member Account Login</h2>
            <p className="text-xs text-slate-500">Log in with your registered email and password to access your Digital Membership Card.</p>
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
                placeholder="suman@example.com"
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
              {loading ? "Logging in..." : "Log In to Member Portal"}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Not enrolled as an NGO member yet?{" "}
              <Link href="/membership" className="font-bold text-[#F57C00] hover:underline">
                Enroll Here
              </Link>
            </p>
          </div>
        </div>
      ) : (
        /* LOGGED IN MEMBER DASHBOARD */
        <div className="space-y-8">
          {/* Status Alert Banner */}
          {memberData.status === "PENDING" && (
            <div className="p-6 bg-amber-50 text-amber-900 border border-amber-200 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">hourglass_top</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-amber-950">Membership Pending NGO Board Verification</h3>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Welcome, <strong>{memberData.memberName}</strong>! Your membership application and payment details have been received and are currently <strong>PENDING VERIFICATION</strong> by the NGO Board Administrator. Once verified and confirmed, your official Digital Membership Card will be generated and displayed right here.
                </p>
              </div>
            </div>
          )}

          {memberData.status === "REJECTED" && (
            <div className="p-6 bg-red-50 text-red-900 border border-red-200 rounded-2xl flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">cancel</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-red-950">Membership Status: Rejected</h3>
                <p className="text-xs text-red-800 leading-relaxed">
                  Your membership application was reviewed and rejected by the NGO Administrator. No official Digital Membership Card has been issued for this profile.
                </p>
              </div>
            </div>
          )}

          {(memberData.status === "APPROVED" || memberData.status === "ACTIVE" || memberData.status === "VERIFIED") && (
            <div className="p-4 bg-[#E8F5E9] text-[#1B5E20] border border-[#d9e6da] rounded-2xl flex items-center gap-3 shadow-sm">
              <span className="material-symbols-outlined text-2xl fill">verified</span>
              <div className="text-xs">
                <p className="font-bold text-sm">Verified NGO Institutional Member</p>
                <p>Your official Digital Membership Card is active with General Body meeting voting privileges.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Privileges & Governance (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl border border-[#e0e3e5] p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-[#031635]">Member Privileges & Institutional Governance</h2>
                <ul className="space-y-4 text-xs text-[#44474e]">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#1B5E20] fill">verified</span>
                    <div>
                      <strong className="block text-[#031635] text-sm">Voting Rights in General Body Meetings</strong>
                      <span>Active members hold voting rights for annual trustee resolutions and financial audits.</span>
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
                      <strong className="block text-[#031635] text-sm">80G Tax Exemption Receipts</strong>
                      <span>All membership fee payments are 80G tax deductible under Section 80G of IT Act.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Member ID Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-4 sticky top-24">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-[#031635]">Digital Membership Card</h3>
                <p className="text-xs text-[#44474e]">
                  {memberData.status === "APPROVED" || memberData.status === "ACTIVE" || memberData.status === "VERIFIED"
                    ? "Official digital badge authorized by NGO Board."
                    : memberData.status === "REJECTED"
                    ? "Application Rejected. No card issued."
                    : "Application Under Admin Verification. Official Digital Card will be issued upon Admin approval."}
                </p>
              </div>

              <MemberIDCard member={memberData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
