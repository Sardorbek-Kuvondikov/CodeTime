import type { ApiResponse } from "@/shared/api/responses";
import type { ContactFormResult, ContactFormValues } from "@/features/contact-form/model/types";

export async function submitContactForm(values: ContactFormValues) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const payload = (await response.json()) as ApiResponse<ContactFormResult>;

  if (!response.ok || !payload.ok) {
    throw payload;
  }

  return payload;
}
