"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DonateModal from "@/components/DonateModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Activities", href: "/activities" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f7f9fb]/95 backdrop-blur-md border-b border-[#e0e3e5] shadow-sm">
        {/* Top Info Bar */}
        <div className="bg-[#031635] text-white text-xs py-1.5 px-6 border-b border-slate-800">
          <div className="max-w-[1280px] mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4 text-[13px]">
              <span className="flex items-center gap-1 text-[#ffb786]">
                <span className="material-symbols-outlined text-[16px]">call</span> +91 98765 43210
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:flex items-center gap-1 text-slate-300">
                <span className="material-symbols-outlined text-[16px]">mail</span> contact@ratnakarngo.org
              </span>
              <span className="hidden md:inline text-slate-500">|</span>
              <span className="hidden md:flex items-center gap-1 text-[#E8F5E9] font-medium">
                <span className="material-symbols-outlined text-[16px] text-[#81c784]">verified</span> 80G Tax Exempt Certified
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className="flex items-center gap-1 bg-[#1a2b4b] hover:bg-[#23385d] text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[14px] text-[#F57C00]">lock</span> Portals Login
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </button>

              {portalDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-52 bg-white text-[#191c1e] rounded-lg shadow-xl border border-[#e0e3e5] py-2 z-50 text-xs font-medium"
                  onMouseLeave={() => setPortalDropdownOpen(false)}
                >
                  <Link
                    href="/admin/login"
                    className="block px-4 py-2 hover:bg-[#f2f4f6] text-[#031635] font-bold border-b border-[#e0e3e5]"
                    onClick={() => setPortalDropdownOpen(false)}
                  >
                    NGO Admin Dashboard
                  </Link>
                  <Link
                    href="/portal/volunteer"
                    className="block px-4 py-2 hover:bg-[#f2f4f6] text-slate-700"
                    onClick={() => setPortalDropdownOpen(false)}
                  >
                    Volunteer Portal & Hours
                  </Link>
                  <Link
                    href="/portal/member"
                    className="block px-4 py-2 hover:bg-[#f2f4f6] text-slate-700"
                    onClick={() => setPortalDropdownOpen(false)}
                  >
                    Member Portal & Card
                  </Link>
                  <Link
                    href="/portal/donor"
                    className="block px-4 py-2 hover:bg-[#f2f4f6] text-slate-700"
                    onClick={() => setPortalDropdownOpen(false)}
                  >
                    Donor 80G Receipts
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#031635] tracking-tight">
              Ratnakar&apos;s <span className="text-[#F57C00]">NGO</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex gap-7 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-[#964900] font-bold border-b-2 border-[#964900] pb-0.5"
                      : "text-[#44474e] hover:text-[#031635]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/volunteer"
              className="text-xs font-bold text-[#031635] hover:text-[#F57C00] px-3.5 py-2 rounded border border-[#75777f]/40 hover:border-[#F57C00] transition-colors"
            >
              Volunteer
            </Link>
            <Link
              href="/membership"
              className="text-xs font-bold text-[#031635] hover:text-[#F57C00] px-3.5 py-2 rounded border border-[#75777f]/40 hover:border-[#F57C00] transition-colors"
            >
              Membership
            </Link>
            <button
              onClick={() => setDonateModalOpen(true)}
              className="bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-bold text-sm px-6 py-2 rounded shadow transition-all flex items-center gap-1"
            >
              Donate Now
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDonateModalOpen(true)}
              className="bg-[#F57C00] text-white font-bold text-xs px-3.5 py-1.5 rounded"
            >
              Donate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#031635]"
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#e0e3e5] px-6 py-4 space-y-3 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block py-2 text-base font-semibold ${
                  pathname === link.href ? "text-[#964900] font-bold" : "text-slate-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <Link
                href="/volunteer"
                className="flex-1 text-center py-2 text-xs font-bold text-[#031635] bg-slate-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Volunteer
              </Link>
              <Link
                href="/membership"
                className="flex-1 text-center py-2 text-xs font-bold text-[#031635] bg-slate-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Membership
              </Link>
            </div>
          </div>
        )}
      </header>

      <DonateModal isOpen={donateModalOpen} onClose={() => setDonateModalOpen(false)} />
    </>
  );
}
