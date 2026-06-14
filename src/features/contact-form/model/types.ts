export const COURSE_OPTIONS = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "React & Next.js",
  "Python Development",
] as const;

export type CourseOption = (typeof COURSE_OPTIONS)[number];

export type ContactFormValues = {
  name: string;
  phone: string;
  course: CourseOption | "";
};

export type ContactFormPayload = {
  name: string;
  phone: string;
  course: CourseOption;
};

export type ContactFormFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export type ContactFormResult = {
  saved: true;
};
