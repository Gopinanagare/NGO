"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        setError(data.error || "Failed to submit enquiry");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-16">
      {/* 3 Contact Circles matching Stitch about.html */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-8 rounded-xl border border-[#e0e3e5] shadow-sm flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#1a2b4b]/10 flex items-center justify-center text-[#031635]">
            <span className="material-symbols-outlined text-2xl fill">location_on</span>
          </div>
          <h4 className="text-lg font-bold text-[#031635]">Headquarters</h4>
          <p className="text-sm text-[#44474e] leading-relaxed">
            Ratnakar&apos;s NGO Foundation<br />Sector 14, Institutional Area, New Delhi, 110001
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-[#e0e3e5] shadow-sm flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#1a2b4b]/10 flex items-center justify-center text-[#031635]">
            <span className="material-symbols-outlined text-2xl fill">mail</span>
          </div>
          <h4 className="text-lg font-bold text-[#031635]">Email Us</h4>
          <p className="text-sm text-[#44474e] leading-relaxed">
            contact@ratnakarngo.org<br />donations@ratnakarngo.org
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl border border-[#e0e3e5] shadow-sm flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#1a2b4b]/10 flex items-center justify-center text-[#031635]">
            <span className="material-symbols-outlined text-2xl fill">call</span>
          </div>
          <h4 className="text-lg font-bold text-[#031635]">Call Us</h4>
          <p className="text-sm text-[#44474e] leading-relaxed">
            +91 98765 43210<br />Mon - Sat, 9:00 AM - 6:00 PM IST
          </p>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-white rounded-xl p-8 border border-[#e0e3e5] shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#031635]">Send Us a Message</h2>
            <p className="text-xs text-[#44474e] mt-1">Our administrative team responds within 24 business hours.</p>
          </div>

          {success && (
            <div className="p-4 bg-[#E8F5E9] text-[#1B5E20] border border-[#d9e6da] rounded-lg text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-lg fill">verified</span>
              <span>Thank you! Your message has been recorded and routed to NGO Admin.</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#031635] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Satyajit Das"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#031635] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="satyajit@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#031635] mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#031635] mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="Inquiry / Partnership / Volunteer"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#031635] mb-1">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="How can we assist you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] text-xs font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm py-3 rounded shadow transition-colors"
            >
              {loading ? "Sending Message..." : "Submit Message"}
            </button>
          </form>
        </div>

        {/* Map Container */}
        <div className="w-full h-[450px] rounded-xl overflow-hidden border border-[#e0e3e5] shadow-sm">
          <iframe
            title="Ratnakar NGO Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9774618218685!2d77.2185293!3d28.6304535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
