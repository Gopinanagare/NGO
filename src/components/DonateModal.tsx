"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCause?: string;
  defaultAmount?: number;
}

export default function DonateModal({ isOpen, onClose, defaultCause = "General Fund", defaultAmount = 2500 }: DonateModalProps) {
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [cause, setCause] = useState<string>(defaultCause);

  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorPan, setDonorPan] = useState("");
  const [donorAddress, setDonorAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ donationId: string; receiptNumber: string } | null>(null);

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  if (!isOpen) return null;

  const handleSelectAmount = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
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

  const handleProcessPayment = async () => {
    setError(null);

    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (!finalAmount || finalAmount <= 0) {
      setError("Please select or enter a valid donation amount");
      return;
    }
    if (!donorName || !donorEmail || !donorPhone) {
      setError("Please enter your name, email, and phone number");
      return;
    }

    setLoading(true);

    try {
      const isScriptLoaded = await loadRazorpayScript();

      const orderRes = await fetch("/api/donations/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          cause,
          donorName,
          donorEmail,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to initialize payment gateway");
      }

      if (isScriptLoaded && (window as any).Razorpay) {
        const options = {
          key: orderData.keyId || "rzp_live_SboFvtCQiYWPQj",
          amount: orderData.amount,
          currency: orderData.currency || "INR",
          name: "Ratnakar's NGO",
          description: `Donation for ${cause}`,
          order_id: orderData.orderId,
          prefill: {
            name: donorName,
            email: donorEmail,
            contact: donorPhone,
          },
          theme: {
            color: "#F57C00",
          },
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/donations/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donorName,
                donorEmail,
                donorPhone,
                donorPan,
                donorAddress,
                amount: finalAmount,
                cause,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setSuccessData({
                donationId: verifyData.donationId,
                receiptNumber: verifyData.receiptNumber,
              });
            } else {
              setError(verifyData.error || "Payment verification failed");
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
        const verifyRes = await fetch("/api/donations/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            donorName,
            donorEmail,
            donorPhone,
            donorPan,
            donorAddress,
            amount: finalAmount,
            cause,
            isTestMode: true,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          setSuccessData({
            donationId: verifyData.donationId,
            receiptNumber: verifyData.receiptNumber,
          });
        } else {
          setError(verifyData.error || "Failed to record donation");
        }
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Donation process error:", err);
      setError(err?.message || "Something went wrong while processing donation");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-xl overflow-hidden border border-[#e0e3e5] my-8">
        {/* Modal Header */}
        <div className="bg-[#031635] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white bg-slate-800/60 p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#F57C00] fill text-2xl">favorite</span>
            <div>
              <h2 className="text-xl font-bold">Donate to Ratnakar&apos;s NGO</h2>
              <p className="text-xs text-[#b6c6ef]">Section 80G Tax Exemption Certificate Generated Instantly</p>
            </div>
          </div>
        </div>

        {/* Stepper Navigation Bar */}
        {!successData && (
          <div className="bg-[#f7f9fb] px-6 py-3 border-b border-[#e0e3e5] flex justify-between items-center text-xs font-semibold">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 ${step === 1 ? "text-[#F57C00] font-bold" : "text-slate-500"}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? "bg-[#F57C00] text-white" : "bg-slate-200 text-slate-700"}`}>1</span>
              Amount
            </button>
            <span className="text-slate-300">→</span>
            <button
              onClick={() => step >= 2 && setStep(2)}
              className={`flex items-center gap-1.5 ${step === 2 ? "text-[#F57C00] font-bold" : "text-slate-500"}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? "bg-[#F57C00] text-white" : "bg-slate-200 text-slate-700"}`}>2</span>
              Details
            </button>
            <span className="text-slate-300">→</span>
            <button
              onClick={() => step >= 3 && setStep(3)}
              className={`flex items-center gap-1.5 ${step === 3 ? "text-[#F57C00] font-bold" : "text-slate-500"}`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? "bg-[#F57C00] text-white" : "bg-slate-200 text-slate-700"}`}>3</span>
              Payment
            </button>
          </div>
        )}

        {/* Success Screen */}
        {successData ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-14 h-14 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto text-[#1B5E20]">
              <span className="material-symbols-outlined text-3xl fill">verified</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#031635]">Donation Successful!</h3>
              <p className="text-sm text-slate-600 mt-1">
                Thank you, <strong>{donorName}</strong>! Your contribution has been verified.
              </p>
            </div>

            <div className="bg-[#E8F5E9] rounded-lg p-4 border border-[#d9e6da] text-left space-y-2 text-xs text-[#131e17]">
              <div className="flex justify-between">
                <span className="font-bold">Receipt Number:</span>
                <span className="font-mono font-bold text-[#1B5E20]">{successData.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Cause:</span>
                <span>{cause}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Amount Donated:</span>
                <span className="font-bold text-[#1B5E20]">₹{(customAmount ? parseFloat(customAmount) : amount).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Tax Benefit:</span>
                <span className="font-bold text-[#964900]">Eligible under Section 80G</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`/api/donations/${successData.donationId}/receipt`}
                download
                className="flex-1 flex items-center justify-center gap-2 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold py-3 px-6 rounded text-sm shadow transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">download</span> Download 80G Receipt (PDF)
              </a>
              <button
                onClick={onClose}
                className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: Amount */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#031635] uppercase tracking-wider mb-1">Select Cause / Campaign</label>
                  <select
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] text-sm font-semibold bg-white text-[#031635]"
                  >
                    <option value="General Fund">General Fund (Maximum Need)</option>
                    <option value="Educate 500 Rural Children">Educate 500 Rural Children</option>
                    <option value="Mobile Health & Vaccination Clinic">Mobile Health Clinic & Medicines</option>
                    <option value="Women Skill & Empowerment Center">Women Skill & Livelihood Center</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#031635] uppercase tracking-wider mb-2">Select Donation Amount (INR)</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {presetAmounts.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleSelectAmount(val)}
                        className={`py-3 px-2 rounded font-bold text-sm border transition-all ${
                          amount === val && !customAmount
                            ? "bg-[#F57C00] text-white border-[#F57C00] shadow"
                            : "bg-[#f7f9fb] text-[#031635] border-[#c5c6cf] hover:border-[#F57C00]"
                        }`}
                      >
                        ₹{val.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    placeholder="Or Enter Custom Amount (₹)"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-[#c5c6cf] text-sm font-semibold text-[#031635]"
                  />
                </div>

                <div className="bg-[#E8F5E9] p-3 rounded flex items-start gap-2 text-xs text-[#1B5E20]">
                  <span className="material-symbols-outlined text-[18px] fill">favorite</span>
                  <span>Your donation directly supports rural education kits, medical van visits, and community welfare.</span>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm py-3 rounded shadow transition-colors"
                >
                  Continue to Details
                </button>
              </div>
            )}

            {/* STEP 2: Details */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#031635] uppercase tracking-wider">Donor Details (Required for 80G Receipt)</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Anita Deshmukh"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded border border-[#c5c6cf] text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="anita@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded border border-[#c5c6cf] text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded border border-[#c5c6cf] text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      PAN Number <span className="text-[#964900] font-normal">(80G Exemption)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ABCDE1234F"
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value)}
                      className="w-full px-3.5 py-2 rounded border border-[#c5c6cf] text-xs font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Address</label>
                  <input
                    type="text"
                    placeholder="Street, City, Pincode"
                    value={donorAddress}
                    onChange={(e) => setDonorAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded border border-[#c5c6cf] text-xs"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 border border-[#031635] text-[#031635] font-bold text-xs py-2.5 rounded hover:bg-[#031635]/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="w-2/3 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs py-2.5 rounded shadow transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#031635] uppercase tracking-wider">Confirm Payment via Razorpay</h3>

                <div className="bg-[#f7f9fb] p-4 rounded border border-[#e0e3e5] space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Donor Name:</span>
                    <strong className="text-[#031635]">{donorName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Email & Phone:</span>
                    <span>{donorEmail} ({donorPhone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cause:</span>
                    <span>{cause}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                    <span className="font-bold text-[#031635]">Total Amount:</span>
                    <strong className="text-[#F57C00] font-black text-base">₹{(customAmount ? parseFloat(customAmount) : amount).toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 border border-[#031635] text-[#031635] font-bold text-xs py-3 rounded hover:bg-[#031635]/5 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={loading}
                    className="w-2/3 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs py-3 rounded shadow transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px] fill">lock</span>
                    {loading ? "Processing Payment..." : "Complete Razorpay Donation"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
