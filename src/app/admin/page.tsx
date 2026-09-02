"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VolunteerIDCard from "@/components/VolunteerIDCard";
import {
  Heart, Users, Award, Clock, FileText, Download, CheckCircle, XCircle,
  Plus, Settings, LogOut, Search, Filter, ShieldCheck, Mail, Calendar,
  MapPin, TrendingUp, BarChart3, RefreshCw, AlertCircle
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const [stats, setStats] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Volunteer Modal state
  const [selectedVol, setSelectedVol] = useState<any>(null);
  const [viewingIdCardVol, setViewingIdCardVol] = useState<any>(null);
  const [verifNotes, setVerifNotes] = useState("");
  const [volHours, setVolHours] = useState(0);

  // Certificate Modal state
  const [certVolId, setCertVolId] = useState("");
  const [certProjName, setCertProjName] = useState("Digital Literacy & Computer Lab Initiative");
  const [certSuccess, setCertSuccess] = useState<string | null>(null);

  // New Campaign Form State
  const [campTitle, setCampTitle] = useState("");
  const [campDesc, setCampDesc] = useState("");
  const [campTarget, setCampTarget] = useState(500000);
  const [campCategory, setCampCategory] = useState("Education");
  const [campSuccess, setCampSuccess] = useState(false);

  // New Activity Form State
  const [actTitle, setActTitle] = useState("");
  const [actDesc, setActDesc] = useState("");
  const [actLocation, setActLocation] = useState("");
  const [actBeneficiaries, setActBeneficiaries] = useState(250);
  const [actCategory, setActCategory] = useState("Education");
  const [actSuccess, setActSuccess] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const statsRes = await fetch("/api/admin/stats");
      const statsData = await statsRes.json();
      if (statsData.stats) setStats(statsData.stats);

      const donRes = await fetch("/api/donations");
      const donData = await donRes.json();
      if (donData.donations) setDonations(donData.donations);

      const volRes = await fetch("/api/volunteers?status=ALL");
      const volData = await volRes.json();
      if (volData.volunteers) setVolunteers(volData.volunteers);

      const memRes = await fetch("/api/membership");
      const memData = await memRes.json();
      if (memData.members) setMembers(memData.members);

      const campRes = await fetch("/api/campaigns");
      const campData = await campRes.json();
      if (campData.campaigns) setCampaigns(campData.campaigns);

      const actRes = await fetch("/api/activities");
      const actData = await actRes.json();
      if (actData.activities) setActivities(actData.activities);

      const evRes = await fetch("/api/events");
      const evData = await evRes.json();
      if (evData.events) setEvents(evData.events);

      const enqRes = await fetch("/api/contact");
      const enqData = await enqRes.json();
      if (enqData.submissions) setEnquiries(enqData.submissions);
    } catch (err) {
      console.error("Fetch admin data error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleUpdateVolunteerStatus = async (volId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/volunteers/${volId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          verificationNotes: verifNotes || "Verified by Administrator",
          totalHours: volHours,
        }),
      });
      if (res.ok) {
        setSelectedVol(null);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCertSuccess(null);
    if (!certVolId || !certProjName) return;

    try {
      const res = await fetch("/api/volunteers/certificates/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteerId: certVolId,
          projectName: certProjName,
          authorizedSignee: "Ratnakar's NGO Management",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCertSuccess(`Certificate issued successfully! (ID: ${data.certificate.certificateNo})`);
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setCampSuccess(false);
    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: campTitle,
          description: campDesc,
          targetAmount: campTarget,
          category: campCategory,
        }),
      });

      if (res.ok) {
        setCampSuccess(true);
        setCampTitle("");
        setCampDesc("");
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    setActSuccess(false);
    try {
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: actTitle,
          description: actDesc,
          location: actLocation,
          beneficiaries: actBeneficiaries,
          category: actCategory,
        }),
      });

      if (res.ok) {
        setActSuccess(true);
        setActTitle("");
        setActDesc("");
        setActLocation("");
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-950 text-slate-300 p-6 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-lg font-black text-white block">Ratnakar&apos;s NGO</span>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Admin Management</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: "overview", label: "Dashboard Overview", icon: BarChart3 },
              { id: "donations", label: "Donations & 80G Receipts", icon: Heart },
              { id: "volunteers", label: "Volunteer Applications", icon: Users, badge: volunteers.filter((v) => v.status === "PENDING").length },
              { id: "certificates", label: "Issue Certificates", icon: Award },
              { id: "members", label: "NGO Memberships", icon: ShieldCheck },
              { id: "cms", label: "Content Manager (CMS)", icon: FileText },
              { id: "enquiries", label: "Contact Enquiries", icon: Mail },
              { id: "settings", label: "System Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30"
                      : "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {Boolean(item.badge) && item.badge! > 0 && (
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Credit & Logout */}
        <div className="pt-6 border-t border-slate-900 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs py-2.5 rounded-xl border border-slate-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout Admin
          </button>
          <p className="text-[10px] text-slate-500 text-center font-medium">Made by Satyajit</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              {activeTab === "overview" && "Dashboard Overview & Analytics"}
              {activeTab === "donations" && "Donations & 80G Tax Receipts Manager"}
              {activeTab === "volunteers" && "Volunteer Applications & Verification"}
              {activeTab === "certificates" && "Volunteer Certificate Generator"}
              {activeTab === "members" && "NGO Membership Records"}
              {activeTab === "cms" && "Campaigns, Activities & Events CMS"}
              {activeTab === "enquiries" && "Website Contact Enquiries"}
              {activeTab === "settings" && "NGO Profile & Payment Settings"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">Ratnakar&apos;s NGO Centralized Management System</p>
          </div>

          <button
            onClick={fetchAdminData}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh Data
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Donations</span>
                <p className="text-3xl font-black text-emerald-600">
                  ₹{stats?.totalRaised ? Number(stats.totalRaised).toLocaleString("en-IN") : "0"}
                </p>
                <p className="text-xs text-slate-500">{stats?.donationCount || 0} Successful Transactions</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Approved Volunteers</span>
                <p className="text-3xl font-black text-teal-600">{stats?.totalVolunteers || 0}</p>
                <p className="text-xs text-amber-600 font-bold">{stats?.pendingVolunteers || 0} Pending Verification</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Volunteer Hours</span>
                <p className="text-3xl font-black text-amber-500">{stats?.totalVolunteerHours || 0}</p>
                <p className="text-xs text-slate-500">Verified Service Hours</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Active Members</span>
                <p className="text-3xl font-black text-emerald-700">{stats?.totalMembers || 0}</p>
                <p className="text-xs text-slate-500">Annual & Life Members</p>
              </div>
            </div>

            {/* Analytics Bar Chart */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Donation Growth & Monthly Trends</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Year 2026 Analytics
                </span>
              </div>

              <div className="grid grid-cols-8 gap-3 items-end h-48 pt-6 border-b border-slate-100">
                {[
                  { month: "Jan", val: 45000 },
                  { month: "Feb", val: 62000 },
                  { month: "Mar", val: 89000 },
                  { month: "Apr", val: 74000 },
                  { month: "May", val: 95000 },
                  { month: "Jun", val: 112000 },
                  { month: "Jul", val: 130000 },
                  { month: "Aug", val: Number(stats?.totalRaised || 150000) },
                ].map((item, idx) => {
                  const maxVal = 160000;
                  const heightPct = Math.min(100, Math.round((item.val / maxVal) * 100));
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{(item.val / 1000).toFixed(0)}k
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-xl group-hover:from-emerald-500 group-hover:to-teal-300 transition-all"
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-xs font-bold text-slate-600">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Donations & Pending Volunteers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Donations Stream */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">Recent Online Donations</h3>
                <div className="divide-y divide-slate-100 text-xs">
                  {donations.slice(0, 5).map((d) => (
                    <div key={d.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-900">{d.donorName} (₹{d.amount.toLocaleString()})</p>
                        <p className="text-slate-500">{d.cause} • {d.receiptNumber}</p>
                      </div>
                      <a
                        href={`/api/donations/${d.id}/receipt`}
                        download
                        className="text-xs text-emerald-600 font-bold hover:underline"
                      >
                        80G Receipt ↓
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Volunteers */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900">Pending Volunteer Applications</h3>
                  <button
                    onClick={() => setActiveTab("volunteers")}
                    className="text-xs font-bold text-emerald-600 hover:underline"
                  >
                    View All ({volunteers.filter((v) => v.status === "PENDING").length}) →
                  </button>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {volunteers.filter((v) => v.status === "PENDING").slice(0, 5).map((v) => (
                    <div key={v.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={v.profilePhoto && v.profilePhoto.trim() !== "" ? v.profilePhoto : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"}
                          alt={v.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{v.name} ({v.city || "India"})</p>
                          <p className="text-slate-500 text-[11px]">{v.skills} • {v.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedVol(v);
                          setVolHours(v.totalHours);
                          setVerifNotes(v.verificationNotes || "");
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm"
                      >
                        Review Application
                      </button>
                    </div>
                  ))}
                  {volunteers.filter((v) => v.status === "PENDING").length === 0 && (
                    <p className="py-4 text-slate-500 text-center">No pending volunteer applications.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DONATIONS & 80G RECEIPTS */}
        {activeTab === "donations" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
            <h3 className="text-lg font-bold text-slate-900">All Registered Online Donations</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Receipt No</th>
                    <th className="py-3 px-4">Donor Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">PAN Card</th>
                    <th className="py-3 px-4">Cause</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {donations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">{d.receiptNumber}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{d.donorName}</td>
                      <td className="py-3 px-4">{d.donorEmail}<br />{d.donorPhone}</td>
                      <td className="py-3 px-4 font-mono">{d.donorPan || "N/A"}</td>
                      <td className="py-3 px-4">{d.cause}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">₹{d.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          {d.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={`/api/donations/${d.id}/receipt`}
                          download
                          className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-bold"
                        >
                          <Download className="w-3.5 h-3.5" /> PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: VOLUNTEERS */}
        {activeTab === "volunteers" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Volunteer Applications & Review</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Photo & Name</th>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Skills</th>
                      <th className="py-3 px-4">Availability</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Verified Hours</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {volunteers.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={v.profilePhoto && v.profilePhoto.trim() !== "" ? v.profilePhoto : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"}
                              alt={v.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm shrink-0"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{v.name}</p>
                              <p className="text-[10px] font-mono font-bold text-amber-600">VOL-2026-{v.id.slice(0, 6).toUpperCase()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{v.email}<br />{v.phone}</td>
                        <td className="py-3 px-4">{v.skills}</td>
                        <td className="py-3 px-4">{v.availability}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-bold px-2.5 py-1 rounded-full text-[10px] ${
                              v.status === "APPROVED"
                                ? "bg-emerald-100 text-emerald-800"
                                : v.status === "PENDING"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">{v.totalHours} Hours</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewingIdCardVol(v)}
                              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-sm"
                            >
                              <span className="material-symbols-outlined text-[14px]">badge</span> ID Card
                            </button>
                            <button
                              onClick={() => {
                                setSelectedVol(v);
                                setVolHours(v.totalHours);
                                setVerifNotes(v.verificationNotes || "");
                              }}
                              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3 py-1.5 rounded-lg"
                            >
                              Manage
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Volunteer ID Card Inspection Modal */}
            {viewingIdCardVol && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#F57C00]">badge</span>
                      Official Volunteer Digital ID Card
                    </h3>
                    <button
                      onClick={() => setViewingIdCardVol(null)}
                      className="text-slate-400 hover:text-slate-600 font-bold text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <VolunteerIDCard volunteer={viewingIdCardVol} />

                  <div className="pt-2">
                    <button
                      onClick={() => setViewingIdCardVol(null)}
                      className="w-full bg-slate-900 text-white font-bold text-xs py-2.5 rounded-xl"
                    >
                      Close ID Card
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Volunteer Review Modal */}
            {selectedVol && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
                <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl my-8">
                  <h3 className="text-lg font-bold text-slate-900">Volunteer Verification & Status Update</h3>
                  <div className="text-xs space-y-1 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                    <p><strong>Name:</strong> {selectedVol.name}</p>
                    <p><strong>Email:</strong> {selectedVol.email}</p>
                    <p><strong>Phone:</strong> {selectedVol.phone}</p>
                    <p><strong>Education / Profession:</strong> {selectedVol.education} ({selectedVol.occupation})</p>
                    <p><strong>Skills:</strong> {selectedVol.skills}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Background Verification Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Govt ID verified on 2026-08-29"
                      value={verifNotes}
                      onChange={(e) => setVerifNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Total Verified Hours</label>
                    <input
                      type="number"
                      value={volHours}
                      onChange={(e) => setVolHours(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleUpdateVolunteerStatus(selectedVol.id, "APPROVED")}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">badge</span>
                      Approve & Issue ID Card
                    </button>
                    <button
                      onClick={() => handleUpdateVolunteerStatus(selectedVol.id, "REJECTED")}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">block</span>
                      Reject (No ID Card)
                    </button>
                    <button
                      onClick={() => setSelectedVol(null)}
                      className="py-2.5 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CERTIFICATES */}
        {activeTab === "certificates" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 max-w-2xl">
            <h3 className="text-lg font-bold text-slate-900">Generate & Issue Volunteer Certificate</h3>

            {certSuccess && (
              <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{certSuccess}</span>
              </div>
            )}

            <form onSubmit={handleIssueCertificate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Approved Volunteer *</label>
                <select
                  required
                  value={certVolId}
                  onChange={(e) => setCertVolId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium"
                >
                  <option value="">-- Choose Volunteer --</option>
                  {volunteers
                    .filter((v) => v.status === "APPROVED")
                    .map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.totalHours} Verified Hours)
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Project / Initiative Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Digital Literacy & Computer Lab Initiative"
                  value={certProjName}
                  onChange={(e) => setCertProjName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm py-3 rounded-xl shadow"
              >
                <Award className="w-4 h-4" /> Issue & Email PDF Volunteer Certificate
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: MEMBERS */}
        {activeTab === "members" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Active NGO Members</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Membership No</th>
                    <th className="py-3 px-4">Member Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Plan Title</th>
                    <th className="py-3 px-4">Validity</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-amber-700">{m.membershipNo}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{m.memberName}</td>
                      <td className="py-3 px-4">{m.memberEmail}<br />{m.memberPhone}</td>
                      <td className="py-3 px-4">{m.plan?.title || "Annual"}</td>
                      <td className="py-3 px-4">
                        {new Date(m.validFrom).toLocaleDateString("en-IN")} to {new Date(m.validTill).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: CMS */}
        {activeTab === "cms" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Create Campaign */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Create New Campaign</h3>
              {campSuccess && <p className="text-xs text-emerald-600 font-bold">Campaign created successfully!</p>}
              <form onSubmit={handleCreateCampaign} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Campaign Title"
                  value={campTitle}
                  onChange={(e) => setCampTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Campaign Description"
                  value={campDesc}
                  onChange={(e) => setCampDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <input
                  type="number"
                  required
                  placeholder="Target Amount (INR)"
                  value={campTarget}
                  onChange={(e) => setCampTarget(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl shadow">
                  Publish Campaign
                </button>
              </form>
            </div>

            {/* Create Activity */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Create New Activity / Project</h3>
              {actSuccess && <p className="text-xs text-emerald-600 font-bold">Activity created successfully!</p>}
              <form onSubmit={handleCreateActivity} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Activity Title"
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Activity Summary"
                  value={actDesc}
                  onChange={(e) => setActDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Location (e.g. Alwar, Rajasthan)"
                  value={actLocation}
                  onChange={(e) => setActLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
                <button type="submit" className="w-full bg-teal-600 text-white font-bold text-xs py-2.5 rounded-xl shadow">
                  Publish Activity
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 7: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Contact Form Submissions</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {enquiries.map((enq) => (
                <div key={enq.id} className="py-4 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{enq.name} ({enq.email})</span>
                    <span className="text-slate-400">{new Date(enq.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  <p className="font-semibold text-emerald-700">Subject: {enq.subject}</p>
                  <p className="text-slate-600">{enq.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-2xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900">NGO Profile & Payment Configuration</h3>
            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <p><strong>NGO Name:</strong> Ratnakar&apos;s NGO</p>
                <p><strong>Reg Number:</strong> NGO-IND-2024-884930</p>
                <p><strong>80G Certificate:</strong> CIT(E)/80G/2024-25/A-99201</p>
                <p><strong>12A Registration:</strong> CIT(E)/12A/2024-25/A-11029</p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-emerald-950">
                <p className="font-bold text-emerald-900">Razorpay Payment Credentials Configured:</p>
                <p><strong>Key ID:</strong> rzp_test_YOUR_KEY_HERE</p>
                <p><strong>Secret Key:</strong> ••••••••••••••••</p>
                <p className="text-[10px] text-emerald-700 pt-1">All donations generate verified 80G tax PDF receipts automatically.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
