import nodemailer from "nodemailer";

import { getSmtpEnv } from "@/shared/lib/env";
import type { ContactFormPayload } from "@/features/contact-form/model/types";

type ContactNotification = ContactFormPayload & { id: number };

export async function sendContactNotification(submission: ContactNotification) {
  const { host, port, user, pass, to } = getSmtpEnv();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const rows = [
    ["Ariza ID", `#${submission.id}`],
    ["Ism", submission.name],
    ["Telefon", submission.phone],
    ["Kurs", submission.course],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <h2 style="margin:0 0 16px;font-family:Arial,sans-serif;">Yangi ariza — CodeTime</h2>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:6px 16px 6px 0;color:#6b7280;">${label}</td>
          <td style="padding:6px 0;font-weight:600;">${value}</td>
        </tr>`,
        )
        .join("")}
    </table>
  `;

  await transporter.sendMail({
    from: `"CodeTime Ariza" <${user}>`,
    to,
    subject: `Yangi ariza #${submission.id} — ${submission.name}`,
    text,
    html,
  });
}
