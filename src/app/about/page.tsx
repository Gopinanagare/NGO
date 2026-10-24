import Link from "next/link";

export default function AboutPage() {
  const trustees = [
    {
      name: "Smt. Kamla Kumari",
      hindiName: "श्रीमती कमला कुमारी",
      designation: "President & Founder Settler",
      role: "अध्यक्ष सह मुख्य न्यासी (संस्थापक)",
      phone: "+91 77660 84876",
      image: "/images/kamla_kumari.jpg",
      isPresident: true,
      bio: "Visionary founder and social worker leading grassroots development, rural welfare, women empowerment, and child educational aid across Bihar.",
    },
    {
      name: "Shri Ram Vijay Yadav",
      hindiName: "श्री राम विजय यादव",
      designation: "General Secretary & Trustee",
      role: "सचिव सह न्यासी",
      phone: "+91 99559 72022",
      image: "/images/team/ram_vijay_yadav_secretary.jpg",
      bio: "Honored with Bhagat Singh Samman 2026 at the National Blood Donor Convention. Coordinating executive operations, legal registrations, rural outreach, and administrative oversight.",
    },
    {
      name: "Smt. Priyanka Kumari",
      hindiName: "श्रीमती प्रियंका कुमारी (M.Sc., M.Ed.)",
      designation: "Treasurer & Trustee",
      role: "कोषाध्यक्ष सह न्यासी (Principal, Bal Vatika)",
      phone: "+91 78272 11196",
      image: "/images/team/priyanka_kumari_treasurer.jpg",
      bio: "M.Sc., M.Ed., Principal of Bal Vatika Play School. Managing institutional finances, educational curriculum assistance, fund distribution, and statutory audit compliance.",
    },
    {
      name: "Dr. Rakesh Kant Kamal",
      hindiName: "डॉ. राकेश कांत कमल (Ph.D. - IIT Dhanbad)",
      designation: "Senior Consultant to the Trust",
      role: "वरिष्ठ सलाहकार (पर्यावरणविद्)",
      phone: "+91 77660 84876",
      image: "/images/team/dr_rakesh_kant_kamal_consultant.jpg",
      bio: "Ph.D. from IIT Dhanbad, Eminent Environmentalist and researcher. Advising on sustainable rural development, eco-conservation, clean water, and educational outreach.",
    },
    {
      name: "Shri Kailash Yadav",
      hindiName: "श्री कैलाश यादव",
      designation: "Executive Member & Trustee",
      role: "कार्यकारी सदस्य सह न्यासी",
      phone: "+91 95726 85690",
      image: "/images/team/kailash_yadav_trustee.jpg",
      bio: "Guiding community welfare initiatives, agricultural farmer assistance, blanket distribution, and local volunteer mobilization.",
    },
    {
      name: "Shri Dhananjay Kumar",
      hindiName: "श्री धनन्जय कुमार",
      designation: "Executive Member & Trustee",
      role: "कार्यकारी सदस्य सह न्यासी",
      phone: "+91 91221 38448",
      image: "/images/team/dhananjay_kumar_trustee.jpg",
      bio: "Spearheading field operations, health camps, relief logistics, and community assistance in rural villages.",
    },
    {
      name: "Smt. Swetprabha",
      hindiName: "श्रीमती श्वेतप्रभा",
      designation: "Trustee & Education Coordinator",
      role: "न्यासी सह शिक्षा समन्वयक",
      phone: "+91 78272 11196",
      image: "/images/team/swetprabha_trustee.jpg",
      bio: "Dedicated educator and social worker fostering children's primary education, moral learning, and women self-help empowerment drives.",
    },
    {
      name: "Shri Chandan Kumar",
      hindiName: "श्री चंदन कुमार",
      designation: "Co-Treasurer & Trustee",
      role: "सह-कोषाध्यक्ष सह न्यासी",
      phone: "+91 72569 64547",
      image: "/images/trust_stamp.png",
      bio: "Assisting treasury operations, donor receipt verification, and banking compliance for public benefit projects.",
    },
    {
      name: "Smt. Ranju Kumari",
      hindiName: "श्रीमती रंजू कुमारी",
      designation: "Executive Member & Trustee",
      role: "कार्यकारी सदस्य सह न्यासी",
      phone: "+91 99340 61064",
      image: "/images/trust_stamp.png",
      bio: "Championing women skill development programs, tailoring & handicraft workshops, and rural health awareness drives.",
    },
  ];

  const complianceDocs = [
    {
      title: "80G Tax Exemption Provisional Approval Order",
      meta: "Form 106 u/s 354(4) | URN: AALTM2352GF20261 | Tax Years 2026-27 to 2028-29",
      href: "/docs/80G_Provisional_Approval.pdf",
    },
    {
      title: "12A Provisional Registration Order",
      meta: "Form 106 u/s 332(8) | URN: AALTM2352GE20261 | Tax Years 2026-27 to 2028-29",
      href: "/docs/12A_Provisional_Registration.pdf",
    },
    {
      title: "Official Registered Trust Deed (ट्रस्ट-विलेख)",
      meta: "District Registry Office Aurangabad | Deed No. 16/2024 | Token No. 3232/2024",
      href: "/docs/Trust_Deed_Registration_Aurangabad.pdf",
    },
    {
      title: "Detailed Note on Proposed Activities",
      meta: "Education, Medical Relief, Women & Youth Development, Agriculture & General Utility",
      href: "/docs/Proposed_Activities_Note.pdf",
    },
    {
      title: "Statutory Nil Declaration",
      meta: "Income Tax Department Form 104 Compliance Declaration signed by Founder Smt. Kamla Kumari",
      href: "/docs/Nil_Declaration.pdf",
    },
    {
      title: "Permanent Account Number (e-PAN) Card",
      meta: "Income Tax Dept., Govt. of India | PAN: AALTM2352G | Maa Samundri Devi Charitable Trust",
      href: "/images/pan_card.jpg",
    },
    {
      title: "Trust Bank Account Passbook & Certificate",
      meta: "Central Bank of India | A/C: 4156734014 | IFSC: CBIN0284035 | S.N. Sinha College, Aurangabad",
      href: "/images/team/bank_passbook_cbi.jpg",
    },
  ];

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-16">
      {/* 1. Hero / Our Story Section */}
      <section className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <span className="material-symbols-outlined text-[16px] fill">verified</span>
            Registered Public Charitable Trust • Deed No. 16/2024
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#031635] tracking-tight">
            Our Story & Heritage
          </h1>
          <p className="text-base sm:text-lg text-[#44474e] leading-relaxed">
            Founded on <strong>14 March 2024</strong> in Aurangabad, Bihar, <strong>Maa Samundri Devi Charitable Trust</strong> (माँ समुन्द्री देवी चैरिटेबल ट्रस्ट) was established with a singular devotion: bringing tangible upliftment to economically disadvantaged families, vulnerable children, and rural communities.
          </p>
          <p className="text-sm text-[#555860] leading-relaxed">
            Under the visionary leadership of our President <strong>Smt. Kamla Kumari</strong>, the Trust has received official <strong>12A Registration</strong> and <strong>80G Tax Exemption Approval</strong> from the Government of India Income Tax Department. Our activities focus on free educational coaching, mobile medical camps, disaster relief, women empowerment through vocational training, and sustainable rural agricultural development.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-4 bg-white rounded-xl border border-[#e0e3e5] shadow-sm">
              <div className="text-2xl font-bold text-[#031635]">14/03/2024</div>
              <div className="text-xs font-semibold text-[#75777f] mt-1">Incorporation Date</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#e0e3e5] shadow-sm">
              <div className="text-2xl font-bold text-[#F57C00]">80G & 12A</div>
              <div className="text-xs font-semibold text-[#75777f] mt-1">Tax Exempt Approved</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#e0e3e5] shadow-sm col-span-2 sm:col-span-1">
              <div className="text-2xl font-bold text-[#031635]">AALTM2352G</div>
              <div className="text-xs font-semibold text-[#75777f] mt-1">Permanent PAN</div>
            </div>
          </div>
        </div>

        {/* President Spotlight Card */}
        <div className="flex-1 w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-lg border border-[#e0e3e5]">
          <div className="relative h-[380px] bg-slate-100 overflow-hidden">
            <img
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              src="/images/kamla_kumari.jpg"
              alt="Smt. Kamla Kumari - President, Maa Samundri Devi Charitable Trust"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031635]/90 via-[#031635]/20 to-transparent"></div>
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="inline-block bg-[#F57C00] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                President & Founder
              </span>
              <h3 className="text-2xl font-bold">Smt. Kamla Kumari</h3>
              <p className="text-xs text-slate-300">श्रीमती कमला कुमारी • अध्यक्ष सह मुख्य न्यासी</p>
            </div>
          </div>
          <div className="p-6 space-y-3 bg-white">
            <p className="text-xs text-slate-600 italic leading-relaxed">
              &quot;Our mission is rooted in genuine service to the underprivileged. Whether providing education to a child, medical relief to an elderly resident, or dignified self-employment skills to women, we treat every action as a sacred duty.&quot;
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="font-semibold text-slate-700">📞 +91 77660 84876</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span> Verified Signatory
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission, Vision, Core Values Bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl p-8 shadow-sm border border-[#e0e3e5] flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-bold text-[#031635]">Trust Objectives & Vision</h2>
          <div className="space-y-4 text-sm text-[#44474e]">
            <p className="border-l-4 border-[#F57C00] pl-4">
              <strong className="text-[#031635] block mb-1">Our Core Mission:</strong> To undertake dedicated charitable initiatives in education, medical relief, relief of the poor and distressed, vocational skill development, legal rights awareness, consumer welfare, and agricultural rural development on a purely not-for-profit basis.
            </p>
            <p className="border-l-4 border-[#031635] pl-4">
              <strong className="text-[#031635] block mb-1">Inclusive Service:</strong> The benefits of all activities and institutions established by Maa Samundri Devi Charitable Trust are open to all citizens without discrimination based on caste, religion, creed, or gender.
            </p>
          </div>
        </div>

        <div className="bg-[#031635] text-white rounded-xl p-8 shadow-md space-y-6">
          <h3 className="text-xl font-bold">Guiding Pillars</h3>
          <ul className="space-y-4 text-xs">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#ffb786]">school</span>
              <div>
                <strong className="block text-white text-sm font-semibold">Education & Skills</strong>
                <span className="text-[#b6c6ef]">Scholarships, coaching, and vocational training.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#ffb786]">health_and_safety</span>
              <div>
                <strong className="block text-white text-sm font-semibold">Medical Relief</strong>
                <span className="text-[#b6c6ef]">Free health camps, disease prevention, and medicine aid.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#ffb786]">volunteer_activism</span>
              <div>
                <strong className="block text-white text-sm font-semibold">Radical Transparency</strong>
                <span className="text-[#b6c6ef]">Official 80G & 12A audited compliance.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. Official Leadership & Board of Trustees */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#F57C00] tracking-wider uppercase">Governing Body</span>
          <h2 className="text-3xl font-bold text-[#031635]">Board of Trustees</h2>
          <p className="text-sm text-[#44474e]">
            Governed by the dedicated founders and trustees registered under Deed No. 16/2024 at the District Registry Office, Aurangabad (Bihar).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustees.map((t, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl overflow-hidden shadow-sm border transition-all hover:-translate-y-1 ${
                t.isPresident ? "border-[#F57C00] ring-2 ring-[#F57C00]/20" : "border-[#e0e3e5]"
              }`}
            >
              <div className="h-52 w-full bg-slate-100 overflow-hidden relative">
                <img
                  className={`w-full h-full object-cover ${t.isPresident ? "object-top" : "object-center"}`}
                  src={t.image}
                  alt={t.name}
                />
                {t.isPresident && (
                  <span className="absolute top-2 right-2 bg-[#F57C00] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    PRESIDENT
                  </span>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div>
                  <h4 className="text-base font-bold text-[#031635]">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.hindiName}</p>
                </div>
                <p className="text-xs font-bold text-[#F57C00]">{t.designation}</p>
                <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">{t.bio}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>📞 {t.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Transparency & Statutory Compliance Section */}
      <section className="bg-[#E8F5E9] rounded-2xl p-8 md:p-12 shadow-sm border border-[#d9e6da] space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-white text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold shadow-sm">
              <span className="material-symbols-outlined text-[16px]">verified</span> Government of India Recognized
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#131e17]">
              Statutory Compliance & Legal Registration
            </h2>
            <p className="text-sm text-[#3e4a41] leading-relaxed">
              Maa Samundri Devi Charitable Trust operates with absolute transparency and complete regulatory compliance under Indian Law. All registrations, income tax orders, and trust deed records are publicly available for donors, members, and verification authorities.
            </p>
            <div className="space-y-2 text-xs font-semibold text-[#131e17]">
              <div className="bg-white/80 p-3.5 rounded-lg border border-[#c5d8c6] space-y-1.5">
                <p>📋 <strong>Registered Trust Deed:</strong> Deed No. 16, Book 4, Vol. 1, Pages 142–152 (Year 2024)</p>
                <p>🏛️ <strong>Registering Authority:</strong> District Registry Office, Aurangabad (Bihar)</p>
                <p>🆔 <strong>Permanent Account Number (PAN):</strong> AALTM2352G</p>
                <p>🎖️ <strong>NGO Darpan Unique ID:</strong> <span className="font-mono text-emerald-800 font-bold">BR/2024/0378911</span> (Doc Ref: IN-BR-2400378911)</p>
                <p>📜 <strong>12A Provisional URN:</strong> AALTM2352GE20261 (Order Dt: 02-10-2026)</p>
                <p>💳 <strong>80G Provisional URN:</strong> AALTM2352GF20261 (Tax Benefit u/s 354(4))</p>
                <div className="mt-2 pt-2 border-t border-[#c5d8c6] text-[#131e17]">
                  <p className="font-bold text-emerald-950 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">account_balance</span> Official Trust Bank Account (For NEFT/RTGS/IMPS):
                  </p>
                  <p><strong>Bank:</strong> Central Bank of India • <strong>Branch:</strong> S.N. Sinha College, Aurangabad</p>
                  <p><strong>A/C Number:</strong> <span className="font-mono font-bold text-emerald-800">4156734014</span> • <strong>IFSC:</strong> <span className="font-mono font-bold text-emerald-800">CBIN0284035</span></p>
                  <p><strong>Account Name:</strong> MAA SAMUNDRI DEVI CHARITABLE TRUST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-[#c5d8c6] shadow-sm max-w-xs text-center w-full">
            <img
              src="/images/trust_stamp.png"
              alt="Trust Stamp and Seal"
              className="w-24 h-24 object-contain mb-3"
            />
            <h4 className="text-sm font-bold text-slate-800">Maa Samundri Devi Charitable Trust</h4>
            <p className="text-[11px] text-slate-500 mt-1">Official Registered Seal • Aurangabad, Bihar</p>
            <a
              href="/images/pan_card.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-bold text-[#F57C00] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span> View e-PAN Card
            </a>
          </div>
        </div>

        {/* Official Document Downloads */}
        <div className="space-y-4 pt-4 border-t border-[#c5d8c6]">
          <h3 className="text-lg font-bold text-[#131e17] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1B5E20]">folder_open</span>
            Official Documents & Government Orders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceDocs.map((doc, idx) => (
              <a
                key={idx}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-xl border border-[#c5d8c6] hover:border-[#F57C00] shadow-sm hover:shadow transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                      Official PDF
                    </span>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-[#F57C00] transition-colors">
                      download
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#F57C00] transition-colors">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">{doc.meta}</p>
                </div>
                <span className="text-[11px] font-bold text-[#F57C00] mt-3 flex items-center gap-1">
                  Open / Download Document &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
