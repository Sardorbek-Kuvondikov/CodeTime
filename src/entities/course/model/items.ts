import type { ComponentProps } from "react";

import { Icon } from "@/shared/ui/icon";

export type CourseCard = {
  title: string;
  description: string;
  icon: ComponentProps<typeof Icon>["name"];
  tone: "blue" | "green" | "orange" | "violet";
};

export const courseCards: CourseCard[] = [
  {
    title: "Web Developer",
    description: "Web dasturlash asoslari orqali zamonaviy sayt va ilovalar.",
    icon: "code",
    tone: "blue",
  },
  {
    title: "Kiberxavfsizlik",
    description: "Tizim, tarmoq va internet xavfsizligi bo'yicha amaliy bilimlar.",
    icon: "shield",
    tone: "green",
  },
  {
    title: "Robototexnika",
    description: "Elektronika, sensorlar va robot qurilmalar bilan ishlash.",
    icon: "bot",
    tone: "orange",
  },
  {
    title: "IT Kids",
    description: "Bolalar uchun kompyuter savodxonligi va dasturlashga kirish.",
    icon: "gamepad",
    tone: "violet",
  },
];
