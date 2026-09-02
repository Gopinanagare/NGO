"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const fallbackPlans = [
  {
    id: "plan-annual-1",
    title: "Annual Supporting Member",
    fee: 1000,
    validityMonths: 12,
    benefits: "Includes official member certificate, voting rights in General Body, and annual impact reports.",
    description: "Annual membership for individual supporters with General Body voting rights.",
  },
  {
    id: "plan-life-2",
    title: "Life Member",
    fee: 10000,
    validityMonths: 120,
    benefits: "Lifetime voting rights, VIP invitations to all NGO initiatives, and annual audit presentation.",
    description: "Lifetime institutional membership with governance privileges.",
  },
];

export default function MembershipPage() {
  const [plans, setPlans] = useState<any[]>(fallbackPlans);
  const [selectedPlan, setSelectedPlan] = useState<any>(fallbackPlans[0]);

  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberPan, setMemberPan] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [memberPhoto, setMemberPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ membershipNo: string } | null>(null);

  useEffect(() => {
    fetch("/api/membership/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data.plans && data.plans.length > 0) {
          const formatted = data.plans.map((p: any) => ({
            ...p,
            fee: p.fee ?? p.amount ?? 1000,
            validityMonths: p.validityMonths ?? p.durationMonths ?? 12,
          }));
          setPlans(formatted);
          setSelectedPlan(formatted[0]);
        }
      })
      .catch(() => {});
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Photo size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleEnrollMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please enter matching passwords.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const isScriptLoaded = await loadRazorpayScript();
      const planFee = selectedPlan.fee ?? selectedPlan.amount ?? 1000;

      const orderRes = await fetch("/api/membership/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan.id,
          memberName,
          memberEmail,
          memberPhone,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to initialize membership enrollment");
      }

      const processVerification = async (paymentDetails?: any) => {
        const verifyRes = await fetch("/api/membership/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: paymentDetails?.razorpay_order_id,
            razorpay_payment_id: paymentDetails?.razorpay_payment_id,
            razorpay_signature: paymentDetails?.razorpay_signature,
            planId: selectedPlan.id,
            memberName,
            memberEmail,
            memberPhone,
            memberPan,
            password,
            memberPhoto,
            isTestMode: !paymentDetails,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          setSuccessData({ membershipNo: verifyData.membershipNo });
        } else {
          setError(verifyData.error || "Membership application submission failed");
        }
        setLoading(false);
      };

      if (isScriptLoaded && (window as any).Razorpay) {
        const options = {
          key: orderData.keyId || "rzp_test_YOUR_KEY_HERE",
          amount: orderData.amount || planFee * 100,
          currency: orderData.currency || "INR",
          name: "Ratnakar's NGO",
          description: `Membership Fee - ${selectedPlan.title}`,
          order_id: orderData.orderId,
          prefill: {
            name: memberName,
            email: memberEmail,
            contact: memberPhone,
          },
          theme: { color: "#F57C00" },
          handler: function (response: any) {
            processVerification(response);
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        await processVerification();
      }
    } catch (err: any) {
      setError(err?.message || "Error processing membership enrollment");
      setLoading(false);
    }
  };

  const selectedFee = selectedPlan?.fee ?? selectedPlan?.amount ?? 1000;

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px] fill">shield</span>
          NGO Institutional Membership
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">Become an Official NGO Member</h1>
        <p className="text-base text-[#44474e] leading-relaxed">
          Institutional membership grants voting privileges, annual reports, invitations to General Body meetings, and official Digital Membership Cards upon NGO Board verification.
        </p>
      </div>

      {/* Membership Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p) => {
          const currentFee = p.fee ?? p.amount ?? 1000;
          const currentMonths = p.validityMonths ?? p.durationMonths ?? 12;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPlan(p)}
              className={`bg-white rounded-xl p-8 border cursor-pointer transition-all flex flex-col justify-between space-y-6 ${
                selectedPlan?.id === p.id
                  ? "border-2 border-[#F57C00] shadow-md ring-2 ring-[#F57C00]/20"
                  : "border-[#e0e3e5] hover:border-[#F57C00]"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#031635]">{p.title}</h3>
                  {selectedPlan?.id === p.id && (
                    <span className="bg-[#F57C00] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#44474e]">{p.description || p.benefits}</p>
                <div className="text-3xl font-black text-[#031635]">
                  ₹{currentFee.toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-slate-500"> / {currentMonths} Months</span>
                </div>
              </div>

              <button
                type="button"
                className={`w-full py-2.5 rounded font-bold text-xs transition-colors ${
                  selectedPlan?.id === p.id
                    ? "bg-[#F57C00] text-white shadow"
                    : "bg-slate-100 text-[#031635] hover:bg-slate-200"
                }`}
              >
                Select {p.title}
              </button>
            </div>
          );
        })}
      </div>

      {/* Enrollment Form */}
      {selectedPlan && (
        <div className="bg-white rounded-2xl border border-[#e0e3e5] p-8 max-w-2xl mx-auto shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#031635] border-b border-slate-100 pb-3">
            Enrollment Form — {selectedPlan.title} (₹{selectedFee.toLocaleString("en-IN")})
          </h2>

          {successData ? (
            <div className="p-8 bg-[#E8F5E9] text-[#1B5E20] border border-[#d9e6da] rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-[#1B5E20] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-3xl">hourglass_top</span>
              </div>
              <h3 className="text-2xl font-bold text-[#031635]">Application Submitted & Pending Verification!</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{memberName}</strong>! Your application, payment details, and photo are currently <strong>PENDING NGO ADMIN VERIFICATION</strong>.
                <br /><br />
                Your Membership Reference ID is <strong className="font-mono text-[#031635]">{successData.membershipNo}</strong>. Once approved by the NGO Admin, your official <strong>Digital Membership Card</strong> will be generated and accessible in your Member Portal.
              </p>

              <div className="pt-4">
                <Link
                  href="/portal/member"
                  className="bg-[#031635] hover:bg-[#031635]/90 text-white font-bold text-xs px-8 py-3 rounded-xl shadow transition-colors inline-flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  Go to Member Portal Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnrollMembership} className="space-y-4 text-xs">
              {error && (
                <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold">
                  {error}
                </div>
              )}

              {/* Photo Upload */}
              <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#e0e3e5] space-y-3">
                <label className="block font-bold text-[#031635] uppercase tracking-wider">
                  Upload Member Photo (For ID Card) *
                </label>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                    {memberPhoto ? (
                      <img src={memberPhoto} alt="Member Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-3xl">account_circle</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#031635] file:text-white hover:file:bg-[#031635]/90 cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-500">Supported formats: JPG, PNG (Max 5MB). Photo will be rendered on your Digital Member Card upon Admin verification.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#031635] mb-1">Full Member Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Suman Roy"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#031635] mb-1">Email Address (Login Username) *</label>
                  <input
                    type="email"
                    required
                    placeholder="suman@example.com"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
                  />
                </div>
              </div>

              {/* Password Set Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block font-bold text-[#031635] mb-1">Create Account Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#031635] mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#031635] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={memberPhone}
                    onChange={(e) => setMemberPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#031635] mb-1">PAN Number (For 80G Receipt)</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={memberPan}
                    onChange={(e) => setMemberPan(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-mono uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm py-3.5 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">credit_card</span>
                {loading ? "Processing Membership..." : `Pay ₹${selectedFee.toLocaleString("en-IN")} & Submit Application`}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
