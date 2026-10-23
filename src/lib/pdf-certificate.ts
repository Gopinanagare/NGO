import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export interface VolunteerCertificateData {
  certificateNo: string;
  volunteerName: string;
  projectName: string;
  totalHours: number;
  issueDate: Date | string;
  authorizedSignee?: string;
  ngoName?: string;
}

export function generateVolunteerCertificatePDF(data: VolunteerCertificateData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Landscape A4 orientation: 841.89 x 595.28
      const doc = new PDFDocument({ margin: 30, size: "A4", layout: "landscape" });
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      const primaryColor = "#0d9488"; // Teal 600
      const goldColor = "#d97706"; // Amber 600
      const darkColor = "#0f172a";

      // Outer Decorative Border
      doc.rect(20, 20, 802, 555).lineWidth(4).strokeColor(primaryColor).stroke();
      doc.rect(26, 26, 790, 543).lineWidth(1.5).strokeColor(goldColor).stroke();
      doc.rect(30, 30, 782, 535).lineWidth(0.5).strokeColor("#cbd5e1").stroke();

      // Top Banner Header
      doc.fillColor(primaryColor)
         .fontSize(24)
         .font("Helvetica-Bold")
         .text(data.ngoName || "MAA SAMUNDRI DEVI CHARITABLE TRUST", 40, 50, { align: "center" });

      doc.fillColor(goldColor)
         .fontSize(11)
         .font("Helvetica-Bold")
         .text("AURANGABAD, BIHAR • 80G & 12A REGD CHARITABLE TRUST • DEED NO: 16/2024", 40, 82, { align: "center" });

      doc.moveTo(150, 102).lineTo(692, 102).strokeColor(goldColor).lineWidth(1.5).stroke();

      // Certificate Title
      doc.fillColor(darkColor)
         .fontSize(24)
         .font("Helvetica-Bold")
         .text("CERTIFICATE OF VOLUNTEER EXCELLENCE", 40, 122, { align: "center" });

      doc.fillColor("#475569")
         .fontSize(12)
         .font("Helvetica-Oblique")
         .text("This certificate is proudly awarded to", 40, 165, { align: "center" });

      // Volunteer Name
      doc.fillColor(primaryColor)
         .fontSize(28)
         .font("Helvetica-Bold")
         .text(data.volunteerName, 40, 195, { align: "center" });

      doc.moveTo(250, 235).lineTo(592, 235).strokeColor(primaryColor).lineWidth(1).stroke();

      // Citation Text
      doc.fillColor(darkColor)
         .fontSize(11)
         .font("Helvetica")
         .text(
            `In sincere appreciation for selfless service, leadership, and invaluable contribution to the initiative:`,
            60, 255, { align: "center" }
         );

      doc.fillColor("#0369a1")
         .fontSize(15)
         .font("Helvetica-Bold")
         .text(`"${data.projectName}"`, 60, 280, { align: "center" });

      doc.fillColor(darkColor)
         .fontSize(11.5)
         .font("Helvetica")
         .text(
            `Successfully completing a total of ${data.totalHours} Verified Volunteer Hours with utmost dedication.`,
            60, 312, { align: "center" }
         );

      // Official Stamp Image / Seal Box
      const stampPath = path.join(process.cwd(), "public", "images", "trust_stamp.png");
      if (fs.existsSync(stampPath)) {
        try {
          doc.image(stampPath, 385, 350, { width: 72 });
        } catch {
          doc.rect(385, 355, 72, 72).fillAndStroke("#fef3c7", goldColor);
          doc.fillColor(goldColor).fontSize(9).font("Helvetica-Bold").text("OFFICIAL\nTRUST SEAL\nVERIFIED", 385, 375, { align: "center" });
        }
      } else {
        doc.rect(385, 355, 72, 72).fillAndStroke("#fef3c7", goldColor);
        doc.fillColor(goldColor).fontSize(9).font("Helvetica-Bold").text("OFFICIAL\nTRUST SEAL\nVERIFIED", 385, 375, { align: "center" });
      }

      // Signatures & Metadata Section
      const issueDateStr = new Date(data.issueDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // Left: Issue Date & Certificate No
      doc.fillColor(darkColor).fontSize(10).font("Helvetica-Bold").text("Certificate No:", 80, 460);
      doc.font("Helvetica").text(data.certificateNo, 160, 460);

      doc.font("Helvetica-Bold").text("Issue Date:", 80, 480);
      doc.font("Helvetica").text(issueDateStr, 160, 480);

      // Signature Image
      const sigPath = path.join(process.cwd(), "public", "images", "kamla_kumari_signature.png");
      if (fs.existsSync(sigPath)) {
        try {
          doc.image(sigPath, 620, 405, { width: 85 });
        } catch {}
      }

      // Right: Authorized Signature
      doc.moveTo(580, 455).lineTo(740, 455).strokeColor(darkColor).lineWidth(1).stroke();
      doc.fillColor(darkColor).fontSize(10).font("Helvetica-Bold").text("Authorized Signatory", 580, 465, { align: "center", width: 160 });
      doc.fontSize(8.5).font("Helvetica-Bold").text(data.authorizedSignee || "Kamla Kumari, President", 580, 480, { align: "center", width: 160 });
      doc.fontSize(7.5).font("Helvetica").text("Maa Samundri Devi Charitable Trust", 580, 495, { align: "center", width: 160 });

      // Bottom Footer Branding
      doc.fillColor(primaryColor)
         .fontSize(9)
         .font("Helvetica-Bold")
         .text("Maa Samundri Devi Charitable Trust | Made by Satyajit", 40, 540, { align: "center" });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
