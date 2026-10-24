"use client";

import { useState, useEffect } from "react";

const DEFAULT_GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Specialist doctors examining patients at Free Health Camp",
    category: "Healthcare",
    url: "/images/events/health_camp_doctors.jpg",
    caption: "Expert doctors from Narayan Medical College & Hospital (NMCH Jamuhar, Rohtas) consulting rural villagers.",
  },
  {
    id: "gal-2",
    title: "President Kamla Kumari inaugurating Punyatithi Smriti Samaroh",
    category: "Community",
    url: "/images/events/punyatithi_kamla_kumari.jpg",
    caption: "President Kamla Kumari lighting the ceremonial lamp and addressing the rural gathering at Village Sihada.",
  },
  {
    id: "gal-3",
    title: "Blanket and educational material distribution for rural families",
    category: "Relief",
    url: "/images/events/blanket_distribution.jpg",
    caption: "Annual winter distribution drive providing warm blankets, clothing, and school kits for children.",
  },
  {
    id: "gal-4",
    title: "Honoring village elders with traditional shawls and respect",
    category: "Social Welfare",
    url: "/images/events/honoring_elders.jpg",
    caption: "Felicitation ceremony recognizing and supporting senior citizens with dignity and care.",
  },
  {
    id: "gal-5",
    title: "Free eye checkup and diagnosis by NMCH medical team",
    category: "Healthcare",
    url: "/images/events/eye_checkup_camp.jpg",
    caption: "Ophthalmology counter conducting free vision acuity testing and cataract diagnosis.",
  },
  {
    id: "gal-6",
    title: "Senior citizens attending health and cataract screening camp",
    category: "Healthcare",
    url: "/images/events/beneficiaries_elders.jpg",
    caption: "Rural beneficiaries gathered for diagnostic checkups, advice, and prescription dispensing.",
  },
  {
    id: "gal-7",
    title: "Cloth and angavastra distribution ceremony on stage",
    category: "Relief",
    url: "/images/events/cloth_distribution_stage.jpg",
    caption: "Stage distribution providing clothes and shawls to widows and marginalized families.",
  },
  {
    id: "gal-8",
    title: "Secretary Ram Vijay Yadav honored with Bhagat Singh Samman 2026",
    category: "Community",
    url: "/images/team/ram_vijay_yadav_award.jpg",
    caption: "Recognized at the National Blood Donor Convention in Kurukshetra, Haryana for exemplary social leadership.",
  },
  {
    id: "gal-9",
    title: "Community Narayan Bhoj mass feast for rural beneficiaries",
    category: "Community",
    url: "/images/events/narayan_seva_feast.jpg",
    caption: "Mass community feast organized for all camp attendees, villagers, and volunteers.",
  },
  {
    id: "gal-10",
    title: "Rural community gathering during annual trust samaroh",
    category: "Community",
    url: "/images/events/community_gathering_1.jpg",
    caption: "Villagers attending welfare discourse and social awareness discussions in Aurangabad district.",
  },
  {
    id: "gal-11",
    title: "Central Bank of India Official Account Record Verification",
    category: "Compliance",
    url: "/images/team/bank_passbook_cbi.jpg",
    caption: "Official Current Account (4156734014) passbook record of Maa Samundri Devi Charitable Trust.",
  },
];

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>(DEFAULT_GALLERY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [lightboxItem, setLightboxItem] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch(() => {});
  }, []);

  const categories = ["ALL", "Healthcare", "Relief", "Community", "Social Welfare", "Compliance"];

  const filteredItems =
    selectedCategory === "ALL"
      ? items
      : items.filter((item) => (item.category || "").toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="py-12 max-w-[1280px] mx-auto px-6 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#1B5E20] px-3.5 py-1 rounded-full text-xs font-bold">
          <span className="material-symbols-outlined text-[16px]">photo_library</span>
          Visual Evidence & Impact • NGO Darpan: BR/2024/0378911
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#031635]">Photo & Document Gallery</h1>
        <p className="text-base text-[#44474e] leading-relaxed">
          High-resolution documentary photographs captured across <strong>Maa Samundri Devi Charitable Trust</strong> health camps in partnership with NMCH Jamuhar, blanket distribution ceremonies, awards, and community feasts.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-[#F57C00] text-white shadow"
                : "bg-white text-[#031635] border border-[#e0e3e5] hover:border-[#F57C00]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="bg-white rounded-xl overflow-hidden border border-[#e0e3e5] shadow-sm hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="h-60 bg-slate-100 overflow-hidden relative">
              <img
                src={item.url || item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-3 left-3 bg-[#031635]/85 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded shadow">
                {item.category}
              </span>
              <span className="absolute top-3 right-3 bg-white/90 text-slate-800 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow">
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </span>
            </div>

            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-[#031635] leading-snug">{item.title}</h3>
              {item.caption && <p className="text-xs text-[#44474e] leading-relaxed">{item.caption}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F57C00]">{lightboxItem.category}</span>
                <h4 className="text-sm font-bold text-slate-900">{lightboxItem.title}</h4>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[65vh] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={lightboxItem.url || lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>
            {lightboxItem.caption && (
              <div className="p-4 bg-white text-xs text-slate-600 border-t border-slate-100">
                <p>{lightboxItem.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
