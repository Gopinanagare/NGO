import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export interface DonationReceiptData {
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorPan?: string | null;
  donorAddress?: string | null;
  amount: number;
  cause: string;
  paymentMethod: string;
  transactionId?: string | null;
  createdAt: Date | string;
  ngoName?: string;
  ngoRegNo?: string;
  ngoDarpanId?: string;
  ngo80GNo?: string;
  ngo12ANo?: string;
  ngoAddress?: string;
  ngoPhone?: string;
  ngoEmail?: string;
}

function numberToWordsINR(amount: number): string {
  const words = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (amount === 0) return "Zero Rupees Only";

  let num = Math.floor(amount);
  let str = "";

  if (Math.floor(num / 10000000) > 0) {
    str += numberToWordsINR(Math.floor(num / 10000000)).replace(" Rupees Only", "") + " Crore ";
    num %= 10000000;
  }
  if (Math.floor(num / 100000) > 0) {
    str += numberToWordsINR(Math.floor(num / 100000)).replace(" Rupees Only", "") + " Lakh ";
    num %= 100000;
  }
  if (Math.floor(num / 1000) > 0) {
    str += numberToWordsINR(Math.floor(num / 1000)).replace(" Rupees Only", "") + " Thousand ";
    num %= 1000;
  }
  if (Math.floor(num / 100) > 0) {
    str += numberToWordsINR(Math.floor(num / 100)).replace(" Rupees Only", "") + " Hundred ";
    num %= 100;
  }
  if (num > 0) {
    if (num < 20) str += words[num] + " ";
    else str += tens[Math.floor(num / 10)] + " " + words[num % 10] + " ";
  }

  return str.trim() + " Rupees Only";
}

export function generateDonationReceiptPDF(data: DonationReceiptData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: "A4" });
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      const primaryColor = "#0f766e"; // Teal 700
      const darkColor = "#111827";
      const lightBg = "#f0fdf4";

      // Outer Border
      doc.rect(20, 20, 555, 802).lineWidth(2).strokeColor(primaryColor).stroke();
      doc.rect(24, 24, 547, 794).lineWidth(0.5).strokeColor("#cbd5e1").stroke();

      // Header Banner
      doc.rect(25, 25, 545, 95).fill(primaryColor);
      
      // Header Text
      doc.fillColor("#ffffff")
         .fontSize(20)
         .font("Helvetica-Bold")
         .text(data.ngoName || "MAA SAMUNDRI DEVI CHARITABLE TRUST", 40, 38, { align: "center" });

      doc.fontSize(9.5)
         .font("Helvetica")
         .text(data.ngoAddress || "Pipardih Ward No- 33, Gali No- 04, Aurangabad – 824101, Bihar, India", 40, 64, { align: "center" });
      
      doc.fontSize(8.5)
         .text(`PAN: AALTM2352G  |  NGO Darpan: ${data.ngoDarpanId || "BR/2024/0378911"}  |  Deed No: 16/2024  |  80G: ${data.ngo80GNo || "AALTM2352GF20261"}`, 40, 80, { align: "center" });

      doc.fontSize(8)
         .text("Central Bank of India A/C: 4156734014 | IFSC: CBIN0284035 | Contact: +91 77660 84876", 40, 96, { align: "center" });

      // Title Section
      doc.fillColor(primaryColor)
         .fontSize(13)
         .font("Helvetica-Bold")
         .text("DONATION RECEIPT & 80G TAX EXEMPTION CERTIFICATE", 40, 132, { align: "center" });

      doc.moveTo(40, 150).lineTo(555, 150).strokeColor("#e2e8f0").stroke();

      // Receipt Metadata Row
      const formattedDate = new Date(data.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      doc.fillColor(darkColor).fontSize(10).font("Helvetica-Bold");
      doc.text(`Receipt No: ${data.receiptNumber}`, 40, 170);
      doc.text(`Date: ${formattedDate}`, 380, 170, { align: "right" });

      // Donor & Contribution Box
      doc.rect(40, 195, 515, 210).fillAndStroke(lightBg, "#bbf7d0");

      doc.fillColor(primaryColor).fontSize(11).font("Helvetica-Bold").text("DONOR DETAILS", 55, 210);
      doc.moveTo(55, 225).lineTo(540, 225).strokeColor("#cbd5e1").stroke();

      doc.fillColor(darkColor).fontSize(10).font("Helvetica");
      
      let y = 235;
      doc.font("Helvetica-Bold").text("Donor Name:", 55, y);
      doc.font("Helvetica").text(data.donorName, 160, y);
      
      y += 20;
      doc.font("Helvetica-Bold").text("Email Address:", 55, y);
      doc.font("Helvetica").text(data.donorEmail, 160, y);

      y += 20;
      doc.font("Helvetica-Bold").text("Phone Number:", 55, y);
      doc.font("Helvetica").text(data.donorPhone, 160, y);

      if (data.donorPan) {
        y += 20;
        doc.font("Helvetica-Bold").text("PAN Number:", 55, y);
        doc.font("Helvetica-Bold").fillColor("#047857").text(data.donorPan, 160, y);
        doc.fillColor(darkColor);
      }

      if (data.donorAddress) {
        y += 20;
        doc.font("Helvetica-Bold").text("Address:", 55, y);
        doc.font("Helvetica").text(data.donorAddress, 160, y, { width: 370 });
      }

      // Donation Breakdown Box
      doc.rect(40, 420, 515, 170).fillAndStroke("#ffffff", "#cbd5e1");
      doc.fillColor(primaryColor).fontSize(11).font("Helvetica-Bold").text("DONATION DETAILS", 55, 435);
      doc.moveTo(55, 450).lineTo(540, 450).strokeColor("#e2e8f0").stroke();

      let dY = 465;
      doc.fillColor(darkColor).fontSize(10);
      
      doc.font("Helvetica-Bold").text("Cause / Campaign:", 55, dY);
      doc.font("Helvetica").text(data.cause, 180, dY);

      dY += 20;
      doc.font("Helvetica-Bold").text("Payment Method:", 55, dY);
      doc.font("Helvetica").text(`${data.paymentMethod} ${data.transactionId ? `(Txn ID: ${data.transactionId})` : ""}`, 180, dY);

      dY += 25;
      doc.font("Helvetica-Bold").text("Amount Donated:", 55, dY);
      doc.font("Helvetica-Bold").fontSize(14).fillColor("#047857").text(`Rs. ${data.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`, 180, dY - 2);

      dY += 25;
      doc.fillColor(darkColor).fontSize(10).font("Helvetica-Bold").text("Amount in Words:", 55, dY);
      doc.font("Helvetica-Oblique").text(numberToWordsINR(data.amount), 180, dY);

      // Tax Exemption Disclaimer
      doc.rect(40, 595, 515, 75).fillAndStroke("#f8fafc", "#e2e8f0");
      doc.fillColor("#334155").fontSize(9).font("Helvetica-Bold").text("TAX EXEMPTION NOTICE (SECTION 80G):", 55, 605);
      doc.font("Helvetica").fontSize(8).text(
        "Donations to MAA SAMUNDRI DEVI CHARITABLE TRUST are eligible for 50% deduction under Section 80G of the Income Tax Act, 1961 (Provisional URN: AALTM2352GF20261, PAN: AALTM2352G, 12A URN: AALTM2352GE20261). This digital receipt is valid and electronically generated upon payment confirmation.",
        55, 618, { width: 485, align: "justify" }
      );

      // Official Stamp & Signature if available
      const stampPath = path.join(process.cwd(), "public", "images", "trust_stamp.png");
      if (fs.existsSync(stampPath)) {
        try {
          doc.image(stampPath, 260, 680, { width: 65 });
        } catch {}
      }

      const sigPath = path.join(process.cwd(), "public", "images", "kamla_kumari_signature.png");
      if (fs.existsSync(sigPath)) {
        try {
          doc.image(sigPath, 420, 678, { width: 85 });
        } catch {}
      }

      // Footer Signatures & Credit
      doc.moveTo(40, 725).lineTo(555, 725).strokeColor("#cbd5e1").stroke();

      doc.fillColor(darkColor).fontSize(9).font("Helvetica-Bold").text("Authorized Signatory", 400, 735, { align: "center" });
      doc.fontSize(8.5).font("Helvetica-Bold").text("Kamla Kumari (President)", 400, 747, { align: "center" });
      doc.fontSize(8).font("Helvetica").text("Maa Samundri Devi Charitable Trust", 400, 759, { align: "center" });

      doc.fontSize(8)
         .fillColor("#64748b")
         .text("Thank you for your generous contribution towards empowering communities!", 40, 765, { align: "left" });

      doc.fontSize(8)
         .fillColor("#0f766e")
         .font("Helvetica-Bold")
         .text("Maa Samundri Devi Charitable Trust | Made by Satyajit", 40, 782, { align: "center" });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
