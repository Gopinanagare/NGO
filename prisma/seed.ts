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
      razorpayKeyId: "rzp_live_SboFvtCQiYWPQj",
      razorpayKeySecret: "4jWrEpc9tOBOSYJfRWwrHLOO",
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
      razorpayKeyId: "rzp_live_SboFvtCQiYWPQj",
      razorpayKeySecret: "4jWrEpc9tOBOSYJfRWwrHLOO",
    },
  });

  // 2. Passwords
  const adminPassword = await bcrypt.hash("Admin@123456", 10);
  const volunteerPassword = await bcrypt.hash("Volunteer@123", 10);
  const memberPassword = await bcrypt.hash("Member@123", 10);
  const donorPassword = await bcrypt.hash("Donor@123", 10);

  // 3. Create Admin User
  const adminUser = await prisma.user.upsert({
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

  // 4. Create Volunteer User & Volunteer Profile
  const volUser = await prisma.user.upsert({
    where: { email: "rahul.sharma@example.com" },
    update: {},
    create: {
      email: "rahul.sharma@example.com",
      password: volunteerPassword,
      name: "Rahul Sharma",
      phone: "+91 98123 45678",
      role: "VOLUNTEER",
    },
  });

  const volunteer = await prisma.volunteer.upsert({
    where: { email: "rahul.sharma@example.com" },
    update: { status: "APPROVED", totalHours: 42 },
    create: {
      userId: volUser.id,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 98123 45678",
      dob: "1998-05-14",
      city: "New Delhi",
      occupation: "Software Engineer",
      education: "B.Tech Computer Science",
      skills: "Teaching, IT & Web, Event Management",
      availability: "Weekends",
      interests: "Education & Child Empowerment",
      status: "APPROVED",
      verificationNotes: "Identity documents verified on 2026-01-10",
      totalHours: 42,
    },
  });

  // 5. Create Member User & Member Profile
  const memberUser = await prisma.user.upsert({
    where: { email: "priya.patel@example.com" },
    update: {},
    create: {
      email: "priya.patel@example.com",
      password: memberPassword,
      name: "Priya Patel",
      phone: "+91 98765 11223",
      role: "MEMBER",
    },
  });

  // Membership Plans
  const annualPlan = await prisma.membershipPlan.create({
    data: {
      title: "Annual Supporting Member",
      fee: 1000,
      validityMonths: 12,
      benefits: "Quarterly Impact Newsletter, Voting Rights at AGM, Digital Member Card",
    },
  });

  await prisma.membershipPlan.create({
    data: {
      title: "Life Member",
      fee: 10000,
      validityMonths: 120,
      benefits: "Lifetime Voting Rights, VIP Event Invites, Annual Impact Plaque, Digital Member Card",
    },
  });

  const memberRecord = await prisma.member.upsert({
    where: { membershipNo: "MEM-2026-1049" },
    update: {},
    create: {
      userId: memberUser.id,
      membershipNo: "MEM-2026-1049",
      planId: annualPlan.id,
      memberName: "Priya Patel",
      memberEmail: "priya.patel@example.com",
      memberPhone: "+91 98765 11223",
      status: "ACTIVE",
      validFrom: new Date("2026-01-01"),
      validTill: new Date("2027-01-01"),
      amountPaid: 1000,
      paymentId: "pay_demo_mem_8819",
    },
  });

  // 6. Create Donor User & Donor Profile
  const donorUser = await prisma.user.upsert({
    where: { email: "anita.deshmukh@example.com" },
    update: {},
    create: {
      email: "anita.deshmukh@example.com",
      password: donorPassword,
      name: "Anita Deshmukh",
      phone: "+91 99887 76655",
      role: "DONOR",
    },
  });

  const donor = await prisma.donor.upsert({
    where: { email: "anita.deshmukh@example.com" },
    update: { totalDonated: 15000 },
    create: {
      userId: donorUser.id,
      name: "Anita Deshmukh",
      email: "anita.deshmukh@example.com",
      phone: "+91 99887 76655",
      panNumber: "ABCDE1234F",
      address: "45 Lotus Garden, Vasant Kunj, New Delhi",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110070",
      totalDonated: 15000,
    },
  });

  // 7. Seed Campaigns
  const campaign1 = await prisma.campaign.create({
    data: {
      title: "Educate 500 Rural Children",
      slug: "educate-500-rural-children",
      description: "Providing school kits, digital tablets, and qualified teachers to children in underprivileged rural villages.",
      targetAmount: 500000,
      raisedAmount: 320000,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop",
      category: "Education",
      status: "ACTIVE",
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      title: "Mobile Health & Vaccination Clinic",
      slug: "mobile-health-clinic",
      description: "Deploying fully equipped mobile medical vans with doctors to remote tribal belts and slums.",
      targetAmount: 750000,
      raisedAmount: 480000,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
      category: "Healthcare",
      status: "ACTIVE",
    },
  });

  // 8. Seed Activities / Projects
  const activity1 = await prisma.activity.create({
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

  const activity2 = await prisma.activity.create({
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

  // 9. Seed Events
  await prisma.event.create({
    data: {
      title: "Annual Impact Summit & Volunteer Recognition 2026",
      description: "Gathering all volunteers, members, and supporters to celebrate achievements and outline future milestones.",
      venue: "Main Auditorium, India International Centre, Lodhi Estate, New Delhi",
      eventDate: "2026-09-15",
      eventTime: "10:00 AM - 04:00 PM",
      bannerImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
      maxVolunteers: 25,
      registeredVolunteers: 18,
      status: "UPCOMING",
    },
  });

  await prisma.event.create({
    data: {
      title: "Clean Yamuna Riverbank Drive & Tree Plantation",
      description: "Community cleanup drive and planting 2,500 native saplings along the riverbank.",
      venue: "Yamuna Ghat Sector 7, Delhi",
      eventDate: "2026-09-22",
      eventTime: "07:00 AM - 11:30 AM",
      bannerImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
      maxVolunteers: 50,
      registeredVolunteers: 41,
      status: "UPCOMING",
    },
  });

  // 10. Seed Volunteer Attendance & Certificate
  await prisma.volunteerAttendance.create({
    data: {
      volunteerId: volunteer.id,
      projectId: activity1.id,
      date: "2026-01-15",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      hoursLogged: 8,
      status: "VERIFIED",
      verifiedBy: "Ratnakar NGO Admin",
    },
  });

  await prisma.volunteerCertificate.create({
    data: {
      certificateNo: "CERT-2026-9041",
      volunteerId: volunteer.id,
      volunteerName: "Rahul Sharma",
      projectName: "Digital Literacy & Computer Lab Initiative",
      totalHours: 42,
      issueDate: new Date("2026-02-01"),
      authorizedSignee: "Ratnakar's NGO Management",
    },
  });

  // 11. Seed Donations & 80G Receipts
  await prisma.donation.create({
    data: {
      receiptNumber: "RN-80G-2026-0012",
      donorId: donor.id,
      donorName: "Anita Deshmukh",
      donorEmail: "anita.deshmukh@example.com",
      donorPhone: "+91 99887 76655",
      donorPan: "ABCDE1234F",
      donorAddress: "45 Lotus Garden, Vasant Kunj, New Delhi",
      amount: 10000,
      cause: "Educate 500 Rural Children",
      campaignId: campaign1.id,
      paymentMethod: "Razorpay Live",
      paymentStatus: "SUCCESS",
      razorpayOrderId: "order_demo_1001",
      razorpayPaymentId: "pay_demo_8829",
      razorpaySignature: "sig_verified_demo",
    },
  });

  // 12. Seed Gallery Items
  await prisma.galleryItem.createMany({
    data: [
      { title: "Children enjoying interactive learning in class", category: "Education", mediaType: "image", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" },
      { title: "Free Health screening camp doctor consultation", category: "Healthcare", mediaType: "image", url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" },
      { title: "Tree plantation drive with community volunteers", category: "Environment", mediaType: "image", url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop" },
      { title: "Women Skill Development Sewing Center", category: "Empowerment", mediaType: "image", url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop" },
    ],
  });

  // 13. Seed Blog Posts
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

  // 14. Seed Contact Submissions
  await prisma.contactSubmission.create({
    data: {
      name: "Suresh Gupta",
      email: "suresh.g@example.com",
      phone: "+91 98111 22334",
      subject: "CSR Partnership Proposal",
      message: "We would like to explore a CSR collaboration for funding your mobile health clinic drive in 2026.",
      status: "NEW",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
