import type { ComponentProps } from "react";

import { Icon } from "@/shared/ui/icon";

export type AdvantageItem = {
  title: string;
  description: string;
  icon: ComponentProps<typeof Icon>["name"];
};

export const advantageItems: AdvantageItem[] = [
  {
    title: "Amaliy darslar",
    description: "Darsda o'rganilgan mavzu shu kuniyoq loyiha ichida ishlatiladi.",
    icon: "monitor",
  },
  {
    title: "Mentor yordami",
    description: "Savollarga javob, kod review va individual tavsiyalar.",
    icon: "userCheck",
  },
  {
    title: "Portfolio",
    description:
      "Kurs davomida ishga ko'rsatish mumkin bo'lgan loyihalar yig'iladi.",
    icon: "briefcase",
  },
];
