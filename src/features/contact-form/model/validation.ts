import {
  COURSE_OPTIONS,
  type ContactFormFieldErrors,
  type ContactFormPayload,
  type ContactFormValues,
  type CourseOption,
} from "@/features/contact-form/model/types";

function isCourseOption(value: string): value is CourseOption {
  return COURSE_OPTIONS.includes(value as CourseOption);
}

export function validateContactForm(values: ContactFormValues): {
  data?: ContactFormPayload;
  errors: ContactFormFieldErrors;
} {
  const errors: ContactFormFieldErrors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const course = values.course.trim();

  if (!name) {
    errors.name = "Full name is required.";
  } else if (name.length < 2) {
    errors.name = "Full name must be at least 2 characters.";
  }

  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (phone.replace(/\D/g, "").length !== 12) {
    errors.phone = "Enter a complete phone number: +998 90 123 45 67.";
  }

  if (!course) {
    errors.course = "Please select a course.";
  } else if (!isCourseOption(course)) {
    errors.course = "Please select a valid course.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: {
      name,
      phone,
      course: course as CourseOption,
    },
    errors,
  };
}
