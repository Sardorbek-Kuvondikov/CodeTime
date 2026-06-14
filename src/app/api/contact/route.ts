import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/shared/api/responses";
import { appendContactSubmissionToSheet } from "@/shared/lib/google-sheets";
import { sendContactNotification } from "@/shared/lib/mailer";
import type { ContactFormValues } from "@/features/contact-form/model/types";
import { validateContactForm } from "@/features/contact-form/model/validation";

export async function POST(request: NextRequest) {
  let body: ContactFormValues;

  try {
    body = (await request.json()) as ContactFormValues;
  } catch {
    return errorResponse("Invalid JSON payload.", 400);
  }

  const validation = validateContactForm({
    name: body?.name ?? "",
    phone: body?.phone ?? "",
    course: body?.course ?? "",
  });

  if (!validation.data) {
    return errorResponse("Please fix the highlighted fields.", 422, validation.errors);
  }

  try {
    const id = await appendContactSubmissionToSheet(validation.data);

    // Best-effort notification: the submission is already saved, so an email
    // failure must not turn this into an error for the visitor.
    try {
      await sendContactNotification({ ...validation.data, id });
    } catch (error) {
      console.error("Failed to send contact notification email", error);
    }

    return successResponse({ saved: true }, "Contact form submitted.", 201);
  } catch (error) {
    console.error("Failed to append contact submission to Google Sheets", error);

    return errorResponse(
      "Unable to save your submission right now. Please try again later.",
      500,
    );
  }
}
