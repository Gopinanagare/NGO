import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#031635] text-white w-full border-t border-slate-800 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 py-16 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <img
                src="/images/trust_stamp.png"
                alt="Maa Samundri Devi Charitable Trust Seal"
                className="w-12 h-12 object-contain bg-white rounded-full p-0.5"
              />
              <div>
                <span className="text-xl font-bold text-white tracking-tight block">
                  Maa Samundri Devi <span className="text-[#F57C00]">Charitable Trust</span>
                </span>
                <span className="text-xs text-slate-400">
                  Govt. Regd. Public Charitable Trust • Deed No. 16/2024
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Empowering communities and uplifting lives through educational assistance, healthcare relief camps, women self-help empowerment, and grassroots rural development.
            </p>
            <div className="space-y-1 text-xs text-slate-400">
              <p>📍 <strong>Registered Office:</strong> Pipardih Ward No- 33, Gali No- 04, Aurangabad - 824101, Bihar</p>
              <p>📞 <strong>Helpline:</strong> +91 77660 84876 (President) / +91 99559 72022 (Secretary)</p>
              <p>✉️ <strong>Email:</strong> contact@samundridevitrust.org</p>
            </div>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3 py-1 rounded font-bold">
                <span className="material-symbols-outlined text-[16px] fill">verified</span>
                80G &amp; 12A Certified • PAN: AALTM2352G
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-950/80 text-amber-300 border border-amber-600/40 px-3 py-1 rounded font-bold">
                <span className="material-symbols-outlined text-[16px]">badge</span>
                NGO Darpan: BR/2024/0378911
              </span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
              <p className="font-bold text-amber-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">account_balance</span> Official Trust Bank Account (Donations &amp; NEFT/RTGS):
              </p>
              <p><strong>Bank:</strong> Central Bank of India (S.N. Sinha College Branch, Aurangabad)</p>
              <p><strong>A/C No:</strong> <span className="font-mono text-white font-bold tracking-wider">4156734014</span> | <strong>IFSC:</strong> <span className="font-mono text-white font-bold">CBIN0284035</span></p>
              <p><strong>Beneficiary:</strong> MAA SAMUNDRI DEVI CHARITABLE TRUST</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link href="/about" className="text-slate-300 hover:text-white transition-colors hover:underline underline-offset-4">
              About Us
            </Link>
            <Link href="/activities" className="text-slate-300 hover:text-white transition-colors hover:underline underline-offset-4">
              Activities & Projects
            </Link>
            <Link href="/events" className="text-slate-300 hover:text-white transition-colors hover:underline underline-offset-4">
              Events
            </Link>

            <Link href="/volunteer" className="text-slate-300 hover:text-white transition-colors hover:underline underline-offset-4">
              Volunteer Portal
            </Link>
            <Link href="/portal/donor" className="text-slate-300 hover:text-white transition-colors hover:underline underline-offset-4">
              80G Tax Receipts
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition-colors hover:underline underline-offset-4">
              Contact Us
            </Link>
            <Link href="/admin/login" className="text-amber-400 hover:underline">
              Admin Login
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 Maa Samundri Devi Charitable Trust. All rights reserved. Transparency and statutory accountability verified.</p>
          <div className="flex items-center gap-2 bg-[#1a2b4b] border border-slate-700 px-4 py-1.5 rounded-full text-slate-200 font-semibold shadow">
            <span>Made with <span className="material-symbols-outlined text-red-500 text-[14px] align-middle fill">favorite</span> by <strong className="text-[#F57C00]">Satyajit</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
