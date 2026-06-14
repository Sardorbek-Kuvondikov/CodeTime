# Google Sheets Contact Form Setup

This project uses the Google Sheets API with a Google Cloud service account. It does not use Google Apps Script.

## 1. Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing project.
3. Open **APIs & Services**.
4. Click **Enable APIs and Services**.
5. Search for **Google Sheets API**.
6. Open it and click **Enable**.
7. Go to **IAM & Admin** > **Service Accounts**.
8. Click **Create service account**.
9. Enter a name such as `codetime-contact-form`.
10. Click **Create and continue**.
11. You can skip optional role assignment because spreadsheet access is granted directly from Google Sheets.
12. Finish creating the service account.

## 2. Service Account Key

1. Open the service account you created.
2. Go to the **Keys** tab.
3. Click **Add key** > **Create new key**.
4. Choose **JSON** and download the key file.
5. From the JSON file, copy:
   - `client_email`
   - `private_key`

Use these values in `.env.local`:

```bash
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id
```

Keep the private key wrapped in quotes. If your deployment platform stores newlines literally, use `\n` as shown above.

## 3. Google Sheet Setup

1. Create a Google Sheet.
2. Add the first row with these columns:

| ID | Full Name | Phone | Course |
| -- | --------- | ----- | ------ |

3. Copy the spreadsheet ID from the URL.

For a URL like:

```text
https://docs.google.com/spreadsheets/d/1abcDEFghiJKLmnopQRstuVWxyz/edit
```

The sheet ID is:

```text
1abcDEFghiJKLmnopQRstuVWxyz
```

4. Click **Share** in the Google Sheet.
5. Paste the service account `client_email`.
6. Grant **Editor** access.
7. Save the share settings.

## 4. Local Environment

1. Copy `.env.example` to `.env.local`.
2. Fill in:
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
3. Install dependencies:

```bash
npm install
```

4. Start the dev server:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## 5. Production Deployment

Add the same three environment variables to your hosting provider:

- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SHEET_ID`

Then deploy the Next.js app normally. Each successful form submission appends a row to the sheet in this order:

```text
ID, Full Name, Phone, Course
```

The app writes rows with Google Sheets `RAW` input mode, so phone numbers beginning with `+` are stored as text.
