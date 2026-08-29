import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-16">
      {/* Hero / Our Story Section */}
      <section className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#031635]">Our Story</h1>
          <p className="text-lg text-[#44474e] leading-relaxed">
            Founded with a vision of grassroots empowerment, Ratnakar&apos;s NGO emerged from a simple belief: verifiable action creates lasting change. What began as a local community drive in response to educational and healthcare disparities has scaled into a robust institutional framework supporting thousands across India. Our history is defined by relentless optimization of aid delivery and an unwavering commitment to transparent impact.
          </p>

          <div className="flex gap-8 pt-4">
            <div>
              <div className="text-4xl font-bold text-[#031635]">14</div>
              <div className="text-xs font-semibold text-[#75777f]">Years of Impact</div>
            </div>
            <div className="w-px bg-[#c5c6cf]"></div>
            <div>
              <div className="text-4xl font-bold text-[#031635]">140+</div>
              <div className="text-xs font-semibold text-[#75777f]">Villages & Sectors</div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full h-[400px] rounded-xl overflow-hidden shadow-sm border border-[#e0e3e5]">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdrBhnKwqdFTmPgNNN_HoxT6VyWxa8SszUnne-1zLj2gSmXQzNszCURur0PQZGeW44BtlJK0pAAF7GJ84190_ihtxITRxe3z8fAHN9LZtEov8DoTvIwA7tj3jSXLp0B3JVsN4lKu-j6i4Iw65-AEeC790f6vGXsrww0oK3-VmpUROni5vyu2GPHEFnp1fcBQAkETm1c8D5mgNJB-jKv4FSeVWde560O-qLj9_GrJPLlzJvbBazZNoQaQ"
            alt="Ratnakar's NGO Team on Ground"
          />
        </div>
      </section>

      {/* Mission, Vision, Core Values Bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl p-8 shadow-sm border border-[#e0e3e5] flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-semibold text-[#031635]">Mission & Vision</h2>
          <div className="space-y-4 text-sm text-[#44474e]">
            <p className="border-l-4 border-[#F57C00] pl-4">
              <strong className="text-[#031635] block mb-1">Mission:</strong> To engineer scalable, sustainable solutions for vulnerable communities through digital literacy labs, mobile healthcare clinics, and transparent resource allocation.
            </p>
            <p className="border-l-4 border-[#031635] pl-4">
              <strong className="text-[#031635] block mb-1">Vision:</strong> A globally resilient ecosystem where institutional trust and grassroots action converge to eliminate systemic inequality.
            </p>
          </div>
        </div>

        <div className="bg-[#031635] text-white rounded-xl p-8 shadow-md space-y-6">
          <h3 className="text-xl font-bold">Core Values</h3>
          <ul className="space-y-4 text-xs">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#ffb786]">verified_user</span>
              <div>
                <strong className="block text-white text-sm font-semibold">Radical Transparency</strong>
                <span className="text-[#b6c6ef]">Every rupee tracked and audited.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#ffb786]">trending_up</span>
              <div>
                <strong className="block text-white text-sm font-semibold">Measurable Impact</strong>
                <span className="text-[#b6c6ef]">Data-driven outcomes and verified receipts.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#ffb786]">diversity_3</span>
              <div>
                <strong className="block text-white text-sm font-semibold">Local Empowerment</strong>
                <span className="text-[#b6c6ef]">Communities lead first.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#031635]">Leadership Team</h2>
          <p className="text-sm text-[#44474e] mt-2">Governed by experts in international development, healthcare, and education.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e0e3e5] hover:-translate-y-1 transition-transform">
            <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" alt="Ratnakar Singh" />
            <div className="p-4 text-center">
              <h4 className="text-lg font-bold text-[#031635]">Ratnakar Singh</h4>
              <p className="text-xs font-bold text-[#F57C00] mt-1">Founder & Managing Trustee</p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e0e3e5] hover:-translate-y-1 transition-transform">
            <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" alt="Dr. Arvind Mehta" />
            <div className="p-4 text-center">
              <h4 className="text-lg font-bold text-[#031635]">Dr. Arvind Mehta</h4>
              <p className="text-xs font-bold text-[#F57C00] mt-1">Director of Healthcare</p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e0e3e5] hover:-translate-y-1 transition-transform">
            <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400" alt="Sunita Rao" />
            <div className="p-4 text-center">
              <h4 className="text-lg font-bold text-[#031635]">Sunita Rao</h4>
              <p className="text-xs font-bold text-[#F57C00] mt-1">Head of Education</p>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e0e3e5] hover:-translate-y-1 transition-transform">
            <img className="h-48 w-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" alt="Vikram Sharma" />
            <div className="p-4 text-center">
              <h4 className="text-lg font-bold text-[#031635]">Vikram Sharma</h4>
              <p className="text-xs font-bold text-[#F57C00] mt-1">Head of Field Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Legal Section */}
      <section className="bg-[#E8F5E9] rounded-xl p-8 md:p-12 shadow-sm border border-[#d9e6da]">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-[#131e17]">Transparency & Statutory Compliance</h2>
            <p className="text-sm text-[#3e4a41]">
              We operate with absolute financial clarity. Ratnakar&apos;s NGO is a registered non-profit organization holding active 80G tax exemption approval, 12A trust registration, and CSR-1 registration.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#d9e6da] px-3 py-1.5 rounded text-[#131e17] text-xs font-bold mt-2">
              <span className="material-symbols-outlined text-sm">gavel</span>
              Reg No: NGO-IND-2024-884930 | 80G Cert: CIT(E)/80G/2024-25/A-99201
            </div>
          </div>

          <div className="flex-1 w-full bg-white p-6 rounded-lg border border-[#e0e3e5] space-y-4">
            <h3 className="text-base font-bold text-[#031635]">Financial Transparency</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center justify-between p-3 bg-[#f7f9fb] rounded">
                <span className="font-semibold text-slate-800">2025-26 Annual Audited Report</span>
                <span className="material-symbols-outlined text-[#F57C00]">download</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-[#f7f9fb] rounded border-t border-slate-100">
                <span className="font-semibold text-slate-800">80G & 12A Govt Tax Certificate</span>
                <span className="material-symbols-outlined text-[#F57C00]">download</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
