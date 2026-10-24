import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database for Maa Samundri Devi Charitable Trust...");

  // 1. Seed NGO Info
  await prisma.nGOInfo.upsert({
    where: { id: "1" },
    update: {
      name: "Maa Samundri Devi Charitable Trust",
      tagline: "Dedicated to Health, Education, Environment and Social Welfare",
      regNumber: "Deed No: 16/2024 (Aurangabad)",
      taxExempt80G: "AALTM2352GF20261",
      taxExempt12A: "AALTM2352GE20261",
      darpanId: "BR/2024/0378911",
      panNumber: "AALTM2352G",
      bankName: "Central Bank of India",
      accountNumber: "4156734014",
      ifscCode: "CBIN0284035",
      branchName: "S.N. Sinha College, Aurangabad (Bihar)",
      address: "Pipardih Ward No- 33, Gali No- 04, Aurangabad – 824101, Bihar",
      phone: "+91 77660 84876",
      email: "contact@samundridevitrust.org",
      logoUrl: "/images/trust_stamp.png",
      signatureUrl: "/images/kamla_kumari_signature.png",
      razorpayKeyId: "rzp_test_YOUR_KEY_HERE",
      razorpayKeySecret: "YOUR_RAZORPAY_SECRET_HERE",
    },
    create: {
      id: "1",
      name: "Maa Samundri Devi Charitable Trust",
      tagline: "Dedicated to Health, Education, Environment and Social Welfare",
      regNumber: "Deed No: 16/2024 (Aurangabad)",
      taxExempt80G: "AALTM2352GF20261",
      taxExempt12A: "AALTM2352GE20261",
      darpanId: "BR/2024/0378911",
      panNumber: "AALTM2352G",
      bankName: "Central Bank of India",
      accountNumber: "4156734014",
      ifscCode: "CBIN0284035",
      branchName: "S.N. Sinha College, Aurangabad (Bihar)",
      address: "Pipardih Ward No- 33, Gali No- 04, Aurangabad – 824101, Bihar",
      phone: "+91 77660 84876",
      email: "contact@samundridevitrust.org",
      logoUrl: "/images/trust_stamp.png",
      signatureUrl: "/images/kamla_kumari_signature.png",
      razorpayKeyId: "rzp_test_YOUR_KEY_HERE",
      razorpayKeySecret: "YOUR_RAZORPAY_SECRET_HERE",
    },
  });

  // 2. Admin User
  const adminPassword = await bcrypt.hash("Admin@123456", 10);
  await prisma.user.upsert({
    where: { email: "admin@samundridevitrust.org" },
    update: { password: adminPassword },
    create: {
      email: "admin@samundridevitrust.org",
      password: adminPassword,
      name: "Kamla Kumari (President)",
      phone: "+91 77660 84876",
      role: "ADMIN",
    },
  });

  // Also retain or ensure admin@ratnakarngo.org can log in if needed
  await prisma.user.upsert({
    where: { email: "admin@ratnakarngo.org" },
    update: { password: adminPassword },
    create: {
      email: "admin@ratnakarngo.org",
      password: adminPassword,
      name: "Administrator",
      phone: "+91 77660 84876",
      role: "ADMIN",
    },
  });

  // 3. Seed Membership Plans
  let annualPlan = await prisma.membershipPlan.findFirst({
    where: { title: "Annual Supporting Member" },
  });

  if (!annualPlan) {
    annualPlan = await prisma.membershipPlan.create({
      data: {
        title: "Annual Supporting Member",
        fee: 1000,
        validityMonths: 12,
        benefits: "Includes official member certificate, voting rights in General Body, and annual impact reports.",
      },
    });
  }

  const existingLifePlan = await prisma.membershipPlan.findFirst({
    where: { title: "Life Member" },
  });

  if (!existingLifePlan) {
    await prisma.membershipPlan.create({
      data: {
        title: "Life Member",
        fee: 10000,
        validityMonths: 120,
        benefits: "Lifetime voting rights, VIP invitations to all NGO initiatives, and annual audit presentation.",
      },
    });
  }

  // 4. Seed Campaigns
  await prisma.campaign.deleteMany({});
  await prisma.campaign.create({
    data: {
      title: "Educate Rural Children & Youth",
      slug: "educate-rural-children-youth",
      description: "Providing school kits, stationery, digital learning tablets, and qualified teachers to children in underprivileged rural villages across Bihar.",
      targetAmount: 500000,
      raisedAmount: 75000,
      image: "/images/events/blanket_distribution.jpg",
      category: "Education",
      status: "ACTIVE",
    },
  });

  await prisma.campaign.create({
    data: {
      title: "Annual Free Health & Cataract Surgery Camps",
      slug: "free-health-cataract-camps",
      description: "Organizing specialist eye and medical diagnosis camps with Narayan Medical College & Hospital (NMCH Jamuhar, Rohtas) with free medicine and cataract surgery referrals.",
      targetAmount: 750000,
      raisedAmount: 180000,
      image: "/images/events/health_camp_doctors.jpg",
      category: "Healthcare",
      status: "ACTIVE",
    },
  });

  // 5. Seed Activities / Projects
  await prisma.activity.deleteMany({});
  await prisma.activity.createMany({
    data: [
      {
        title: "Free Eye, Cataract & Medical Health Camp",
        category: "Medical Relief",
        description: "Organized in collaboration with Narayan Medical College & Hospital (NMCH Jamuhar, Rohtas) with free ophthalmologist checkups, cataract screening, lens replacement surgery referral, and free essential medicines.",
        location: "Sihada, Goradiha (Rafiganj), Aurangabad, Bihar",
        beneficiaries: 1450,
        date: "2025-03-20",
        image: "/images/events/health_camp_doctors.jpg",
        featured: true,
      },
      {
        title: "Blanket, Clothes & Educational Kit Distribution",
        category: "Education & Skill",
        description: "Annual distribution of warm blankets, clothes, and school stationery kits for economically underprivileged children, elderly citizens, and marginalized families.",
        location: "Pipardih & Sihada, Aurangabad, Bihar",
        beneficiaries: 650,
        date: "2025-03-20",
        image: "/images/events/blanket_distribution.jpg",
        featured: true,
      },
      {
        title: "Elder Felicitation & Community Narayan Bhoj",
        category: "Rural Welfare",
        description: "Honoring senior village citizens with traditional shawls and organizing a mass community feast (Narayan Bhoj) with women empowerment discourse.",
        location: "Goradiha Panchayat, Aurangabad, Bihar",
        beneficiaries: 1200,
        date: "2025-03-20",
        image: "/images/events/honoring_elders.jpg",
        featured: true,
      },
      {
        title: "Specialist Cataract Screening & Vision Care",
        category: "Medical Relief",
        description: "On-site eye diagnosis, vision acuity testing, prescribing glasses, and direct patient mobilization for cataract removal procedures in rural Rohtas/Aurangabad.",
        location: "Village Sihada, Aurangabad, Bihar",
        beneficiaries: 850,
        date: "2025-03-20",
        image: "/images/events/eye_checkup_camp.jpg",
        featured: true,
      },
      {
        title: "Angavastra & Winter Relief Support",
        category: "Rural Welfare",
        description: "Direct community stage felicitation offering warm winter blankets, sarees, and angavastras to vulnerable widows and impoverished villagers.",
        location: "Sihada, Rafiganj, Aurangabad, Bihar",
        beneficiaries: 500,
        date: "2025-03-20",
        image: "/images/events/cloth_distribution_stage.jpg",
        featured: true,
      },
    ],
  });

  // 6. Seed Events
  await prisma.event.deleteMany({});
  await prisma.event.create({
    data: {
      title: "Annual Punyatithi Smriti Samaroh & Mega Health Camp 2026",
      description: "Commemoration assembly, free multi-specialty medical checkups, cataract surgeries in association with NMCH Jamuhar, Rohtas, educational kits, and blanket distribution in rural Aurangabad.",
      venue: "Village Sihada, Goradiha Panchayat (Rafiganj), District Aurangabad, Bihar",
      eventDate: "2026-03-20",
      eventTime: "10:00 AM - 05:00 PM",
      bannerImage: "/images/events/punyatithi_kamla_kumari.jpg",
      maxVolunteers: 50,
      registeredVolunteers: 12,
      status: "UPCOMING",
    },
  });

  // 7. Seed Gallery Items
  await prisma.galleryItem.deleteMany({});
  await prisma.galleryItem.createMany({
    data: [
      { title: "Specialist doctors examining patients at Free Health Camp", category: "Healthcare", mediaType: "image", url: "/images/events/health_camp_doctors.jpg" },
      { title: "President Kamla Kumari inaugurating Punyatithi Smriti Samaroh", category: "Community", mediaType: "image", url: "/images/events/punyatithi_kamla_kumari.jpg" },
      { title: "Blanket and educational material distribution for rural families", category: "Empowerment", mediaType: "image", url: "/images/events/blanket_distribution.jpg" },
      { title: "Honoring village elders with traditional shawls and respect", category: "Social Welfare", mediaType: "image", url: "/images/events/honoring_elders.jpg" },
      { title: "Senior citizens attending health and cataract screening camp", category: "Healthcare", mediaType: "image", url: "/images/events/beneficiaries_elders.jpg" },
      { title: "Free eye checkup and diagnosis by NMCH medical team", category: "Healthcare", mediaType: "image", url: "/images/events/eye_checkup_camp.jpg" },
      { title: "Cloth and angavastra distribution ceremony on stage", category: "Social Welfare", mediaType: "image", url: "/images/events/cloth_distribution_stage.jpg" },
      { title: "Secretary Ram Vijay Yadav honored with Bhagat Singh Samman 2026", category: "Community", mediaType: "image", url: "/images/team/ram_vijay_yadav_award.jpg" },
      { title: "Community Narayan Bhoj mass feast for rural beneficiaries", category: "Community", mediaType: "image", url: "/images/events/narayan_seva_feast.jpg" },
      { title: "Rural gathering and awareness session during annual samaroh", category: "Community", mediaType: "image", url: "/images/events/community_gathering_1.jpg" },
      { title: "Central Bank of India Official Account Record Verification", category: "Compliance", mediaType: "image", url: "/images/team/bank_passbook_cbi.jpg" },
    ],
  });

  // 8. Seed Blog Posts
  const existingBlogs = await prisma.blogPost.count();
  if (existingBlogs === 0) {
    await prisma.blogPost.create({
      data: {
        title: "How Digital Education is Transforming Rural Villages in India",
        slug: "digital-education-rural-india",
        excerpt: "Exploring the life-changing impact of providing computers and internet access to young minds in remote schools.",
        content: `Education is the most powerful tool to break the cycle of generational poverty. At Maa Samundri Devi Charitable Trust, we recently established digital literacy centers and community awareness programs. The enthusiasm among students and teachers is inspiring...`,
        author: "Maa Samundri Devi Trust Team",
        category: "Education",
        image: "/images/events/blanket_distribution.jpg",
        published: true,
      },
    });
  }

  console.log("Database seeded successfully with clean structure!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
