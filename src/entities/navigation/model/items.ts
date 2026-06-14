import type { ComponentProps } from "react";

import { Icon } from "@/shared/ui/icon";

export type NavigationItem = {
  href: string;
  label: string;
  icon?: ComponentProps<typeof Icon>["name"];
};

export const navigationItems: NavigationItem[] = [
  { href: "#courses", label: "Kurslar", icon: "layers" },
  { href: "#advantages", label: "Afzalliklar", icon: "star" },
  { href: "#results", label: "Natijalar", icon: "trendingUp" },
  { href: "#contact", label: "Bog'lanish", icon: "send" },
];
