type GoogleEnv = {
  clientEmail: string;
  privateKey: string;
  sheetId: string;
};

type SmtpEnv = {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
};

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getGoogleEnv(): GoogleEnv {
  return {
    clientEmail: requireEnv("GOOGLE_CLIENT_EMAIL"),
    privateKey: requireEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    sheetId: requireEnv("GOOGLE_SHEET_ID"),
  };
}

export function getSmtpEnv(): SmtpEnv {
  const user = requireEnv("SMTP_USER");

  return {
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    user,
    pass: requireEnv("SMTP_PASS"),
    // Where the notification is delivered; defaults to the sending account.
    to: process.env.CONTACT_NOTIFICATION_TO ?? user,
  };
}
