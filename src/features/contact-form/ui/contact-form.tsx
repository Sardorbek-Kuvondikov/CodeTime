"use client";

import { FormEvent, useState } from "react";

import { Icon } from "@/shared/ui/icon";
import { FieldError } from "@/shared/ui/field-error";
import { submitContactForm } from "@/features/contact-form/api/submit-contact-form";
import {
  COURSE_OPTIONS,
  type ContactFormFieldErrors,
  type ContactFormValues,
} from "@/features/contact-form/model/types";
import { validateContactForm } from "@/features/contact-form/model/validation";

const initialValues: ContactFormValues = {
  name: "",
  phone: "",
  course: "",
};

function formatUzPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");

  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  }

  digits = digits.slice(0, 9);

  let output = "+998";
  if (digits.length > 0) output += ` ${digits.slice(0, 2)}`;
  if (digits.length > 2) output += ` ${digits.slice(2, 5)}`;
  if (digits.length > 5) output += ` ${digits.slice(5, 7)}`;
  if (digits.length > 7) output += ` ${digits.slice(7, 9)}`;

  return output;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  function updateField<Field extends keyof ContactFormValues>(
    field: Field,
    value: ContactFormValues[Field],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccessMessage("");
    setFormError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");
    setFormError("");

    const validation = validateContactForm(values);

    if (!validation.data) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm(validation.data);
      setValues(initialValues);
      setErrors({});
      setSuccessMessage("Thank you. Your request has been submitted successfully.");
    } catch (error) {
      const apiError = error as {
        error?: { message?: string; fieldErrors?: ContactFormFieldErrors };
      };

      setErrors(apiError.error?.fieldErrors ?? {});
      setFormError(apiError.error?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" id="contactForm" noValidate>
      <label htmlFor="name">
        Ismingiz
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Masalan: Azizbek"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          autoComplete="name"
          required
        />
        <FieldError id="name-error" message={errors.name} />
      </label>

      <label htmlFor="phone">
        Telefon raqamingiz
        <input
          id="phone"
          type="tel"
          name="phone"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={17}
          placeholder="+998 90 123 45 67"
          value={values.phone}
          onFocus={() => {
            if (!values.phone) {
              updateField("phone", "+998 ");
            }
          }}
          onBlur={() => {
            if (values.phone === "+998" || values.phone === "+998 ") {
              updateField("phone", "");
            }
          }}
          onChange={(event) => updateField("phone", formatUzPhone(event.target.value))}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          required
        />
        <FieldError id="phone-error" message={errors.phone} />
      </label>

      <label htmlFor="course">
        Qiziqqan kurs
        <select
          id="course"
          name="course"
          value={values.course}
          onChange={(event) =>
            updateField("course", event.target.value as ContactFormValues["course"])
          }
          aria-invalid={Boolean(errors.course)}
          aria-describedby={errors.course ? "course-error" : undefined}
          required
        >
          <option value="">Kursni tanlang</option>
          {COURSE_OPTIONS.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        <FieldError id="course-error" message={errors.course} />
      </label>

      {formError ? (
        <p className="form-message error-message">{formError}</p>
      ) : null}

      {successMessage ? (
        <p className="form-message success-message">{successMessage}</p>
      ) : null}

      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        <Icon name="send" />
        {isSubmitting ? "Yuborilmoqda..." : "Ariza yuborish"}
      </button>
    </form>
  );
}
