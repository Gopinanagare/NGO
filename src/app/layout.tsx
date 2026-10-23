import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Maa Samundri Devi Charitable Trust | Empowering Communities, Changing Lives",
  description: "Official portal of Maa Samundri Devi Charitable Trust (Regd. Deed No. 16/2024, PAN: AALTM2352G, 80G & 12A Certified). President: Kamla Kumari. Support education, healthcare relief, rural development, and women empowerment in Bihar & India. Made by Satyajit.",
  keywords: "Maa Samundri Devi Charitable Trust, Kamla Kumari President, NGO Aurangabad Bihar, Donate NGO 80G, 12A Non-Profit, Volunteer Certificate, Satyajit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f7f9fb] text-[#191c1e] font-sans min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-grow pt-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
