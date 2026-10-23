# Maa Samundri Devi Charitable Trust (माँ समुन्द्री देवी चैरिटेबल ट्रस्ट)

Official production-grade web portal and management platform for **Maa Samundri Devi Charitable Trust**, an Indian Public Charitable Trust established in Aurangabad, Bihar.

**Made with ❤️ by Satyajit**

---

## 🏛️ Statutory & Legal Profile

- **Legal Entity Name**: Maa Samundri Devi Charitable Trust (माँ समुन्द्री देवी चैरिटेबल ट्रस्ट)
- **Settler, Founder & President**: Kamla Kumari (कमला कुमारी)
- **Official Registration Date**: March 14, 2024 (14/03/2024)
- **PAN**: `AALTM2352G`
- **Trust Deed Registration**: Deed No. 16/2024, Book 4, Vol. 1, Page 142–152 (District Registry Office, Aurangabad, Bihar)
- **Section 80G Approval (Provisional URN)**: `AALTM2352GF20261` (u/s 354(4), Assessment Years 2026-27 to 2028-29)
- **Section 12A Registration (Provisional URN)**: `AALTM2352GE20261` (u/s 332(8), Assessment Years 2026-27 to 2028-29)
- **Registered Address**: Pipardih Ward No- 33, Gali No- 04, Aurangabad – 824101, Bihar, India
- **Official Contact**: +91 77660 84876 / contact@samundridevitrust.org

### Board of Trustees
1. **Kamla Kumari** — Founder, Settler & President
2. **Ram Vijay Yadav** — Secretary (+91 99559 72022)
3. **Priyanka Kumari** — Treasurer (+91 78272 11196)
4. **Chandan Kumar** — Co-Treasurer (+91 72569 64547)
5. **Kailash Yadav** — Trustee (+91 95726 85690)
6. **Dhananjay Kumar** — Trustee (+91 91221 38448)
7. **Ranju Kumari** — Trustee (+91 99340 61064)

---

## 🌟 Core Features & Modules

1. **Public Information Portal**:
   - President Spotlight & Vision Statement by Kamla Kumari.
   - Statutory compliance showcase with direct PDF downloads for 12A, 80G, Trust Deed, and Activities Note.
   - 7 Core activity pillars (Health, Education, Agriculture/Poverty, Culture, Environment, Social Welfare, Disaster Relief).

2. **Online 80G Tax-Exempt Donations**:
   - Razorpay integration supporting UPI, Cards, NetBanking.
   - Automatic generation of verified 80G PDF receipts stamped with the official trust seal and President Kamla Kumari's signature.
   - Instant automated email dispatch of tax receipts to donors.

3. **Volunteer Management & ID Card System**:
   - Volunteer registration with automated tracking.
   - High-fidelity downloadable digital Volunteer ID Card with QR code verification.
   - Volunteer Certificate Generator with hours tracking and official seal.

4. **Membership Registration**:
   - Annual Supporting & Lifetime membership tiers.
   - Digital Member ID card generation.

5. **Centralized Administration Dashboard**:
   - Analytics for donations, volunteers, and member growth.
   - Full CMS for campaigns, news, events, and volunteer assignments.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router, Server Actions, API routes)
- **Styling**: Tailwind CSS & Lucide Icons & Google Material Symbols
- **Database / ORM**: SQLite & Prisma ORM
- **PDF Generation**: PDFKit
- **Auth**: JWT & HTTP-only cookies

---

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Prisma Setup & Database Seeding**:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   - Public Website: [http://localhost:3000](http://localhost:3000)
   - Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
     - Email: `admin@samundridevitrust.org`
     - Password: `Admin@123456`
