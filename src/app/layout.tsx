import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ratnakar's NGO | Empowering Communities, Changing Lives",
  description: "Official portal of Ratnakar's NGO. Support education, healthcare, and rural empowerment. Eligible for 80G Tax Exemption. Made by Satyajit.",
  keywords: "Ratnakar NGO, NGO India, Donate NGO 80G, Volunteer Certificate, NGO Management System",
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
