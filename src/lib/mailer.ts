import nodemailer from "nodemailer";

interface ContactMailPayload {
  name: string;
  email: string;
  message: string;
  address?: string;
  linkedin?: string;
  location?: string;
}

/**
 * Creates and configures the nodemailer transporter using environment variables
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn("SMTP credentials not fully configured in environment variables.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends notification email to the portfolio owner when a new contact inquiry arrives
 */
export async function sendContactNotification(payload: ContactMailPayload) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email dispatch skipped: Transporter not configured.");
    return { success: false, reason: "SMTP not configured" };
  }

  const receiveMail = process.env.RECEIVE_MAIL || "saifulislam3412883@gmail.com";
  const fromMail = process.env.SMTP_USER || "saifulislam.sparktech@gmail.com";
  const host = process.env.SMTP_HOST || "smtp.gmail.com";

  const mailOptions = {
    from: `"Portfolio Contact Form" <${fromMail}>`,
    to: receiveMail,
    replyTo: payload.email,
    subject: `🔔 New Portfolio Message from ${payload.name}`,
    text: `
You received a new inquiry from your portfolio website:

Name: ${payload.name}
Email: ${payload.email}
Location: ${payload.location || "Not specified"}
Address/Company: ${payload.address || "Not specified"}
LinkedIn: ${payload.linkedin || "Not specified"}

Message:
${payload.message}
    `.trim(),
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0d16; color: #e2e8f0; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #121422; border: 1px solid #7c3aed; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .header { background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 24px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
          .content { padding: 28px; }
          .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .info-table td { padding: 10px 12px; border-bottom: 1px solid #1e2238; font-size: 14px; }
          .info-label { color: #a855f7; font-weight: 600; width: 130px; font-family: monospace; font-size: 12px; text-transform: uppercase; }
          .info-value { color: #f8fafc; font-weight: 500; }
          .message-box { background: #080911; border: 1px solid #2e1065; border-radius: 12px; padding: 18px; margin-top: 16px; }
          .message-title { color: #c084fc; font-size: 12px; font-family: monospace; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
          .message-text { color: #f1f5f9; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin: 0; }
          .button-container { text-align: center; margin-top: 28px; }
          .reply-button { display: inline-block; background: #9333ea; color: #ffffff !important; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 14px rgba(147, 51, 234, 0.4); }
          .footer { text-align: center; padding: 16px; background: #080911; color: #64748b; font-size: 12px; border-top: 1px solid #1e2238; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Portfolio Inquiry</h1>
          </div>
          <div class="content">
            <table class="info-table">
              <tr>
                <td class="info-label">Sender Name:</td>
                <td class="info-value"><strong>${payload.name}</strong></td>
              </tr>
              <tr>
                <td class="info-label">Sender Email:</td>
                <td class="info-value"><a href="mailto:${payload.email}" style="color: #38bdf8; text-decoration: none;">${payload.email}</a></td>
              </tr>
              ${payload.location ? `
              <tr>
                <td class="info-label">Location:</td>
                <td class="info-value">${payload.location}</td>
              </tr>` : ''}
              ${payload.address ? `
              <tr>
                <td class="info-label">Company/Address:</td>
                <td class="info-value">${payload.address}</td>
              </tr>` : ''}
              ${payload.linkedin ? `
              <tr>
                <td class="info-label">LinkedIn:</td>
                <td class="info-value"><a href="${payload.linkedin.startsWith('http') ? payload.linkedin : 'https://' + payload.linkedin}" target="_blank" style="color: #38bdf8; text-decoration: none;">${payload.linkedin}</a></td>
              </tr>` : ''}
            </table>

            <div class="message-box">
              <div class="message-title">Message Body</div>
              <p class="message-text">${payload.message}</p>
            </div>

            <div class="button-container">
              <a href="mailto:${payload.email}?subject=Re:%20Inquiry%20from%20Saiful%20Islam%20Portfolio" class="reply-button">
                ✉️ Direct Reply to ${payload.name}
              </a>
            </div>
          </div>
          <div class="footer">
            Delivered securely via Portfolio SMTP Telemetry • Host: ${host}
          </div>
        </div>
      </body>
      </html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
}

/**
 * Sends a polite automated confirmation receipt to the visitor
 */
export async function sendContactConfirmation(payload: ContactMailPayload) {
  const transporter = getTransporter();
  if (!transporter) return { success: false };

  const fromMail = process.env.SMTP_USER || "saifulislam.sparktech@gmail.com";

  const mailOptions = {
    from: `"Saiful Islam" <${fromMail}>`,
    to: payload.email,
    subject: `Thank you for reaching out, ${payload.name}!`,
    html: `
      <div style="font-family: sans-serif; background-color: #0c0d16; color: #ffffff; padding: 24px; border-radius: 12px; max-width: 550px; margin: auto;">
        <h2 style="color: #c084fc; margin-top: 0;">Hello ${payload.name},</h2>
        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
          Thank you for getting in touch through my portfolio. I have received your message and will review it promptly.
        </p>
        <div style="background: #18192b; border-left: 4px solid #a855f7; padding: 14px; margin: 18px 0; border-radius: 6px;">
          <p style="margin: 0; color: #e2e8f0; font-size: 14px; font-style: italic;">
            "${payload.message.length > 180 ? payload.message.slice(0, 180) + '...' : payload.message}"
          </p>
        </div>
        <p style="color: #cbd5e1; font-size: 14px;">
          I typically respond within 24 hours. If your inquiry is urgent, feel free to connect via LinkedIn.
        </p>
        <p style="color: #a855f7; font-weight: bold; margin-bottom: 0;">
          Best regards,<br>
          <span style="color: #ffffff;">Saiful Islam</span><br>
          <span style="color: #94a3b8; font-size: 12px; font-weight: normal;">Junior Fullstack Developer</span>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("Auto-reply delivery note:", err);
    return { success: false, error: err };
  }
}
