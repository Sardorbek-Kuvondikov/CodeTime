import { google } from "googleapis";

import { getGoogleEnv } from "@/shared/lib/env";
import type { ContactFormPayload } from "@/features/contact-form/model/types";

const SHEET_RANGE = "A:D";
const ID_COLUMN_RANGE = "A:A";

export async function appendContactSubmissionToSheet(
  submission: ContactFormPayload,
) {
  const { clientEmail, privateKey, sheetId } = getGoogleEnv();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Derive the next sequential id (1, 2, 3, ...) from the existing id column.
  // Non-numeric cells (e.g. a header row) are ignored.
  const idColumn = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: ID_COLUMN_RANGE,
  });

  const numericIds = (idColumn.data.values ?? [])
    .map((row) => Number(row[0]))
    .filter((value) => Number.isInteger(value) && value > 0);

  const nextId = (numericIds.length > 0 ? Math.max(...numericIds) : 0) + 1;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: SHEET_RANGE,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          nextId,
          submission.name,
          submission.phone,
          submission.course,
        ],
      ],
    },
  });

  return nextId;
}
