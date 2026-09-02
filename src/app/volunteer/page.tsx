"use client";

import { useState } from "react";
import Link from "next/link";

export default function VolunteerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("WEEKENDS");
  const [motivation, setMotivation] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);

    try {
      const res = await fetch("/api/volunteers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
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
    <div className="py-12 max-w-[1000px] mx-auto px-6 space-y-10">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px] fill">favorite</span>
          Become a Verified Volunteer
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-[#031635]">Join Our Global Force for Good</h1>
        <p className="text-sm md:text-base text-[#44474e] leading-relaxed">
          Fill out your details, set your password, and upload your profile photo. Upon NGO Admin verification, your official **Digital Volunteer ID Card** will be issued in your Volunteer Portal.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#e0e3e5] p-8 max-w-2xl mx-auto shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-[#031635] border-b border-slate-100 pb-3">Volunteer Registration Form</h2>

        {success ? (
          <div className="p-8 bg-[#E8F5E9] text-[#1B5E20] border border-[#d9e6da] rounded-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-[#1B5E20] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-outlined text-3xl">hourglass_top</span>
            </div>
            <h3 className="text-2xl font-bold text-[#031635]">Application Submitted Successfully!</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Thank you, <strong>{name}</strong>! Your application and profile photo are currently <strong>PENDING NGO ADMIN VERIFICATION</strong>.
              <br /><br />
              Once the Admin approves your application, your official <strong>Digital Volunteer ID Card</strong> will be generated and issued. You can log in anytime to your Volunteer Portal using your email and password.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/portal/volunteer"
                className="w-full sm:w-auto bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition-colors inline-flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                Go to Volunteer Portal Login
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setName("");
                  setEmail("");
                  setPhone("");
                  setPassword("");
                  setConfirmPassword("");
                  setCity("");
                  setProfilePhoto("");
                }}
                className="w-full sm:w-auto bg-slate-100 text-[#031635] hover:bg-slate-200 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
              >
                Register Another Volunteer
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Photo Upload Section */}
            <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#e0e3e5] space-y-3">
              <label className="block font-bold text-[#031635] uppercase tracking-wider">
                Upload Profile Photo (For ID Card) *
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
                  <p className="text-[10px] text-slate-500">Supported formats: JPG, PNG (Max 5MB). Photo will be rendered on your Official ID Card upon Admin verification.</p>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#031635] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rohan Varma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#031635] mb-1">Email Address (Login Username) *</label>
                <input
                  type="email"
                  required
                  placeholder="rohan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#031635] mb-1">Availability *</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#c5c6cf] font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm py-3.5 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              {loading ? "Submitting Application..." : "Submit Volunteer Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
