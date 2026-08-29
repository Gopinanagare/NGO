import PDFDocument from "pdfkit";

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
         .fontSize(26)
         .font("Helvetica-Bold")
         .text(data.ngoName || "RATNAKAR'S NGO", 40, 55, { align: "center" });

      doc.fillColor(goldColor)
         .fontSize(12)
         .font("Helvetica-Bold")
         .text("EMPOWERING COMMUNITIES • TRANSFORMING LIVES", 40, 88, { align: "center" });

      doc.moveTo(150, 110).lineTo(692, 110).strokeColor(goldColor).lineWidth(1.5).stroke();

      // Certificate Title
      doc.fillColor(darkColor)
         .fontSize(24)
         .font("Helvetica-Bold")
         .text("CERTIFICATE OF VOLUNTEER EXCELLENCE", 40, 130, { align: "center" });

      doc.fillColor("#475569")
         .fontSize(12)
         .font("Helvetica-Oblique")
         .text("This certificate is proudly awarded to", 40, 175, { align: "center" });

      // Volunteer Name
      doc.fillColor(primaryColor)
         .fontSize(30)
         .font("Helvetica-Bold")
         .text(data.volunteerName, 40, 205, { align: "center" });

      doc.moveTo(250, 245).lineTo(592, 245).strokeColor(primaryColor).lineWidth(1).stroke();

      // Citation Text
      doc.fillColor(darkColor)
         .fontSize(11)
         .font("Helvetica")
         .text(
           `In sincere appreciation for selfless service, leadership, and invaluable contribution to the initiative:`,
           60, 265, { align: "center" }
         );

      doc.fillColor("#0369a1")
         .fontSize(16)
         .font("Helvetica-Bold")
         .text(`"${data.projectName}"`, 60, 290, { align: "center" });

      doc.fillColor(darkColor)
         .fontSize(12)
         .font("Helvetica")
         .text(
           `Successfully completing a total of ${data.totalHours} Verified Volunteer Hours with utmost dedication.`,
           60, 325, { align: "center" }
         );

      // Seal / Badge Icon Box
      doc.rect(385, 370, 72, 72).fillAndStroke("#fef3c7", goldColor);
      doc.fillColor(goldColor).fontSize(10).font("Helvetica-Bold").text("OFFICIAL\nSEAL\nVERIFIED", 385, 392, { align: "center" });

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

      // Right: Authorized Signature
      doc.moveTo(580, 455).lineTo(740, 455).strokeColor(darkColor).lineWidth(1).stroke();
      doc.fillColor(darkColor).fontSize(10).font("Helvetica-Bold").text("Authorized Signatory", 580, 465, { align: "center", width: 160 });
      doc.fontSize(8.5).font("Helvetica").text(data.authorizedSignee || "Ratnakar's NGO Management", 580, 480, { align: "center", width: 160 });

      // Bottom Footer Branding
      doc.fillColor(primaryColor)
         .fontSize(9)
         .font("Helvetica-Bold")
         .text("Ratnakar's NGO Management Platform | Made by Satyajit", 40, 540, { align: "center" });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
