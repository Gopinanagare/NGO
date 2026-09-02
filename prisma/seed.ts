import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database for Ratnakar's NGO...");

  // 1. Seed NGO Info
  await prisma.nGOInfo.upsert({
    where: { id: "1" },
    update: {
      name: "Ratnakar's NGO",
      tagline: "Empowering Communities, Transforming Lives Across India",
      regNumber: "NGO-IND-2024-884930",
      taxExempt80G: "CIT(E)/80G/2024-25/A-99201",
      taxExempt12A: "CIT(E)/12A/2024-25/A-11029",
      address: "123 Humanity Enclave, Sector 15, New Delhi - 110001, India",
      phone: "+91 98765 43210",
      email: "contact@ratnakarngo.org",
      logoUrl: "/logo.png",
      signatureUrl: "/signature.png",
      razorpayKeyId: "rzp_test_YOUR_KEY_HERE",
      razorpayKeySecret: "YOUR_RAZORPAY_SECRET_HERE",
    },
    create: {
      id: "1",
      name: "Ratnakar's NGO",
      tagline: "Empowering Communities, Transforming Lives Across India",
      regNumber: "NGO-IND-2024-884930",
      taxExempt80G: "CIT(E)/80G/2024-25/A-99201",
      taxExempt12A: "CIT(E)/12A/2024-25/A-11029",
      address: "123 Humanity Enclave, Sector 15, New Delhi - 110001, India",
      phone: "+91 98765 43210",
      email: "contact@ratnakarngo.org",
      logoUrl: "/logo.png",
      signatureUrl: "/signature.png",
      razorpayKeyId: "rzp_test_YOUR_KEY_HERE",
      razorpayKeySecret: "YOUR_RAZORPAY_SECRET_HERE",
    },
  });

  // 2. Admin User
  const adminPassword = await bcrypt.hash("Admin@123456", 10);
  await prisma.user.upsert({
    where: { email: "admin@ratnakarngo.org" },
    update: { password: adminPassword },
    create: {
      email: "admin@ratnakarngo.org",
      password: adminPassword,
      name: "Ratnakar Administrator",
      phone: "+91 98765 00000",
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
  const existingCampaigns = await prisma.campaign.count();
  if (existingCampaigns === 0) {
    await prisma.campaign.create({
      data: {
        title: "Educate 500 Rural Children",
        slug: "educate-500-rural-children",
        description: "Providing school kits, digital tablets, and qualified teachers to children in underprivileged rural villages.",
        targetAmount: 500000,
        raisedAmount: 0,
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
        category: "Education",
        status: "ACTIVE",
      },
    });

    await prisma.campaign.create({
      data: {
        title: "Mobile Health & Vaccination Clinic",
        slug: "mobile-health-clinic",
        description: "Deploying fully equipped mobile medical vans with doctors to remote tribal belts and slums.",
        targetAmount: 750000,
        raisedAmount: 0,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
        category: "Healthcare",
        status: "ACTIVE",
      },
    });

    // 5. Seed Activities / Projects
    await prisma.activity.create({
      data: {
        title: "Digital Literacy & Computer Lab Center",
        category: "Education",
        description: "Established a 20-computer lab catering to 300+ youth to provide free coding, basic computing, and internet training.",
        location: "Najafgarh, Delhi",
        beneficiaries: 320,
        date: "2026-01-15",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        featured: true,
      },
    });

    await prisma.activity.create({
      data: {
        title: "Mega Free Eye & Dental Checkup Camp",
        category: "Healthcare",
        description: "Screened 1,200 senior citizens and children, distributing free prescription glasses and essential medicines.",
        location: "Alwar, Rajasthan",
        beneficiaries: 1200,
        date: "2026-02-05",
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
        featured: true,
      },
    });

    // 6. Seed Events
    await prisma.event.create({
      data: {
        title: "Annual Impact Summit & Volunteer Recognition 2026",
        description: "Gathering all volunteers, members, and supporters to celebrate achievements and outline future milestones.",
        venue: "Main Auditorium, India International Centre, Lodhi Estate, New Delhi",
        eventDate: "2026-09-15",
        eventTime: "10:00 AM - 04:00 PM",
        bannerImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
        maxVolunteers: 25,
        registeredVolunteers: 0,
        status: "UPCOMING",
      },
    });

    // 7. Seed Gallery Items
    await prisma.galleryItem.createMany({
      data: [
        { title: "Children enjoying interactive learning in class", category: "Education", mediaType: "image", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" },
        { title: "Free Health screening camp doctor consultation", category: "Healthcare", mediaType: "image", url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" },
        { title: "Tree plantation drive with community volunteers", category: "Environment", mediaType: "image", url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop" },
        { title: "Women Skill Development Sewing Center", category: "Empowerment", mediaType: "image", url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop" },
      ],
    });

    // 8. Seed Blog Posts
    await prisma.blogPost.create({
      data: {
        title: "How Digital Education is Transforming Rural Villages in India",
        slug: "digital-education-rural-india",
        excerpt: "Exploring the life-changing impact of providing computers and internet access to young minds in remote schools.",
        content: `Education is the most powerful tool to break the cycle of generational poverty. At Ratnakar's NGO, we recently established 5 digital literacy centers in remote villages. The enthusiasm among students and teachers is inspiring...`,
        author: "Ratnakar Team",
        category: "Education",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
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
