import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/shared/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeTime IT Academy — Amaliy dasturlash va IT kurslari",
  description:
    "CodeTime IT Academy — Web dasturlash, kiberxavfsizlik, robototexnika va IT Kids yo'nalishlari bo'yicha amaliy kurslar.",
  keywords: [
    "IT kurslari",
    "dasturlash kurslari",
    "web developer",
    "kiberxavfsizlik",
    "robototexnika",
    "IT Kids",
    "CodeTime",
  ],
  authors: [{ name: "CodeTime IT Academy" }],
  openGraph: {
    title: "CodeTime IT Academy — Amaliy dasturlash va IT kurslari",
    description:
      "Web dasturlash, kiberxavfsizlik, robototexnika va IT Kids kurslari. Mentor yordami, real loyihalar va portfolio.",
    url: "https://codetime.uz/",
    siteName: "CodeTime IT Academy",
    locale: "uz_UZ",
    type: "website",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeTime IT Academy — Amaliy dasturlash va IT kurslari",
    description:
      "Web dasturlash, kiberxavfsizlik, robototexnika va IT Kids kurslari. Birinchi dars bepul!",
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.fullName,
    url: "https://codetime.uz/",
    description:
      "Web dasturlash, kiberxavfsizlik, robototexnika va IT Kids yo'nalishlari bo'yicha amaliy IT kurslari.",
    telephone: "+998771867766",
    sameAs: [siteConfig.telegramChannelUrl, siteConfig.instagramUrl],
  };

  return (
    <html lang="uz">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
