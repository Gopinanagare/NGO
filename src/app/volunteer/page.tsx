"use client";

import { useState } from "react";
import VolunteerIDCard from "@/components/VolunteerIDCard";

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("WEEKENDS");
  const [motivation, setMotivation] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdVolunteer, setCreatedVolunteer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Photo size must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
          profilePhoto,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setCreatedVolunteer(data.volunteer || {
          id: data.volunteerId,
          name,
          email,
          phone,
          city,
          skills,
          profilePhoto,
          status: "PENDING",
          createdAt: new Date(),
        });
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
          Volunteer with Ratnakar&apos;s NGO to lead digital education labs, organize health camps, or mentor youth. Upload your photo to apply. Upon NGO Admin review and approval, your official **Digital Volunteer ID Card** will be issued.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Registration Form Column */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#e0e3e5] p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#031635]">Volunteer Registration Form</h2>

          {success && (
            <div className="p-4 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
                <span className="material-symbols-outlined text-lg fill">hourglass_empty</span>
                <span>Application Submitted & Under Admin Review</span>
              </div>
              <p>
                Thank you for applying! Your application and photo are currently <strong>UNDER REVIEW</strong> by the NGO Administrator. Once the Admin confirms your application, your official Digital Volunteer ID Card will be generated and issued in your Volunteer Portal.
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
              {error}
            </div>
          )}

          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Photo Upload Section */}
              <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#e0e3e5] space-y-3">
                <label className="block font-bold text-[#031635] uppercase tracking-wider">
                  Upload Volunteer Photo (For ID Card) *
                </label>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Volunteer Preview" className="w-full h-full object-cover" />
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
                    <p className="text-[10px] text-slate-500">Supported formats: JPG, PNG (Max 5MB). Photo will be rendered on your Digital ID Card.</p>
                  </div>
                </div>
              </div>

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
                  <label className="block font-bold text-[#031635] mb-1">Primary Skills *</label>
                  <input
                    type="text"
                    required
                    placeholder="Teaching, Event Management, Tech"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#c5c6cf] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#031635] mb-1">Availability *</label>
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
                className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm py-3.5 rounded-lg shadow transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">badge</span>
                {loading ? "Generating Digital ID Card..." : "Submit & Generate Volunteer ID Card"}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 pt-2">
              <button
                onClick={() => {
                  setSuccess(false);
                  setName("");
                  setEmail("");
                  setPhone("");
                  setCity("");
                  setProfilePhoto("");
                }}
                className="bg-[#031635] text-white font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-[#031635]/90 transition-colors"
              >
                Register Another Volunteer
              </button>
            </div>
          )}
        </div>

        {/* Live Volunteer ID Card Preview Column */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-[#031635]">Live Digital ID Card Preview</h3>
            <p className="text-xs text-[#44474e]">Your ID card is generated in real-time as you fill in your details.</p>
          </div>

          <VolunteerIDCard
            volunteer={
              createdVolunteer || {
                id: "PREVIEW-9041",
                name: name || "Your Name Here",
                email: email || "volunteer@example.com",
                phone: phone || "+91 98765 43210",
                city: city || "City Location",
                skills: skills || "Your Primary Skills",
                profilePhoto: profilePhoto,
                status: "PENDING",
                createdAt: new Date(),
              }
            }
          />
        </div>
      </div>
    </div>
  );
}
