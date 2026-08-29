"use client";

import { useState } from "react";

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("WEEKENDS");
  const [motivation, setMotivation] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/volunteers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          city,
          occupation,
          skills,
          availability,
          motivation,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setCity("");
        setMotivation("");
      } else {
        setError(data.error || "Volunteer application failed");
      }
    } catch (err) {
      setError("An error occurred during application submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px] fill">favorite</span>
          Become a Verified Volunteer
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">Join Our Global Force for Good</h1>
        <p className="text-base text-[#44474e] leading-relaxed">
          Volunteer with Ratnakar&apos;s NGO to lead digital education labs, organize health camps, or mentor youth. Earn official **Verified Volunteer Certificates** with loggable service hours.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#e0e3e5] p-8 max-w-2xl shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-[#031635]">Volunteer Registration Form</h2>

        {success && (
          <div className="p-4 bg-[#E8F5E9] text-[#1B5E20] border border-[#d9e6da] rounded-lg text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-lg fill">verified</span>
            <span>Application submitted successfully! NGO Admin will review your profile and issue access to the Volunteer Portal.</span>
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
              <label className="block font-bold text-[#031635] mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Rohan Varma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-[#031635] mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="rohan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-[#031635] mb-1">City / Location *</label>
              <input
                type="text"
                required
                placeholder="New Delhi / Jaipur / Remote"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#031635] mb-1">Profession / Student</label>
              <input
                type="text"
                placeholder="Software Engineer / Student"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-[#031635] mb-1">Primary Skills</label>
              <input
                type="text"
                placeholder="Teaching, Event Management, Tech"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#031635] mb-1">Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
            >
              <option value="WEEKENDS">Weekends Only</option>
              <option value="WEEKDAYS">Weekdays</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="FLEXIBLE">Flexible Remote</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#031635] mb-1">Why do you want to volunteer with Ratnakar&apos;s NGO?</label>
            <textarea
              rows={3}
              placeholder="Briefly describe your motivation..."
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm py-3 rounded shadow transition-colors"
          >
            {loading ? "Submitting Application..." : "Submit Volunteer Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
