type GoogleEnv = {
  clientEmail: string;
  privateKey: string;
  sheetId: string;
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
