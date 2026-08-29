import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT) || 587;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const fromEmail = process.env.SMTP_FROM || "no-reply@ratnakarngo.org";

export async function sendEmail({
  to,
  subject,
  html,
  attachments,
}: {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: Buffer; contentType?: string }>;
}) {
  console.log(`[Email Notification Triggered] To: ${to} | Subject: ${subject}`);

  if (!host || !user || !pass) {
    console.log("[Email Service] SMTP credentials not fully configured in .env. Email dispatch simulated successfully.");
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: `Ratnakar's NGO <${fromEmail}>`,
      to,
      subject,
      html,
      attachments,
    });

    console.log("[Email Service] Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email Service Error]:", error);
    return { success: false, error };
  }
}
