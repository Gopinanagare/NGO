"use client";

import { useState, useEffect } from "react";

export default function MembershipPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberPan, setMemberPan] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ membershipNo: string } | null>(null);

  useEffect(() => {
    fetch("/api/membership/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data.plans) {
          setPlans(data.plans);
          setSelectedPlan(data.plans[0]);
        }
      })
      .catch(() => {});
  }, []);

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
    setLoading(true);
    setError(null);

    try {
      const isScriptLoaded = await loadRazorpayScript();

      const orderRes = await fetch("/api/membership/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan.id,
          memberName,
          memberEmail,
          memberPhone,
          memberPan,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to initialize membership enrollment");
      }

      if (isScriptLoaded && (window as any).Razorpay) {
        const options = {
          key: orderData.keyId || "rzp_live_SboFvtCQiYWPQj",
          amount: orderData.amount,
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
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/membership/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId: selectedPlan.id,
                memberName,
                memberEmail,
                memberPhone,
                memberPan,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setSuccessData({ membershipNo: verifyData.membershipNo });
            } else {
              setError(verifyData.error || "Membership verification failed");
            }
            setLoading(false);
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
        const verifyRes = await fetch("/api/membership/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planId: selectedPlan.id,
            memberName,
            memberEmail,
            memberPhone,
            memberPan,
            isTestMode: true,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          setSuccessData({ membershipNo: verifyData.membershipNo });
        } else {
          setError(verifyData.error || "Membership verification failed");
        }
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "Error processing membership enrollment");
      setLoading(false);
    }
  };

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px] fill">shield</span>
          NGO Institutional Membership
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">Become an Official NGO Member</h1>
        <p className="text-base text-[#44474e] leading-relaxed">
          Institutional membership grants voting privileges, annual reports, invitations to General Body meetings, and official Digital Membership Cards.
        </p>
      </div>

      {/* Membership Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p) => (
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
              <p className="text-xs text-[#44474e]">{p.description}</p>
              <div className="text-3xl font-black text-[#031635]">
                ₹{p.amount.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-slate-500"> / {p.durationMonths} Months</span>
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
        ))}
      </div>

      {/* Enrollment Form */}
      {selectedPlan && (
        <div className="bg-white rounded-xl border border-[#e0e3e5] p-8 max-w-2xl shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#031635]">
            Enrollment Form — {selectedPlan.title} (₹{selectedPlan.amount.toLocaleString()})
          </h2>

          {successData ? (
            <div className="p-6 bg-[#E8F5E9] text-[#1B5E20] border border-[#d9e6da] rounded-lg text-center space-y-3">
              <span className="material-symbols-outlined text-4xl fill text-[#1B5E20]">verified</span>
              <h3 className="text-xl font-bold">Membership Activated!</h3>
              <p className="text-xs">
                Welcome, <strong>{memberName}</strong>! Your Membership ID is{" "}
                <strong className="font-mono">{successData.membershipNo}</strong>.
              </p>
              <a
                href="/portal/member"
                className="inline-block bg-[#031635] text-white font-bold text-xs px-6 py-2.5 rounded shadow mt-2"
              >
                Access Digital Member Portal & Card
              </a>
            </div>
          ) : (
            <form onSubmit={handleEnrollMembership} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#031635] mb-1">Full Member Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Suman Roy"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#031635] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="suman@example.com"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
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
                    className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#031635] mb-1">PAN Number</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={memberPan}
                    onChange={(e) => setMemberPan(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-mono uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm py-3 rounded shadow transition-colors"
              >
                {loading ? "Processing Membership..." : `Pay ₹${selectedPlan.amount.toLocaleString()} & Activate Membership`}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
