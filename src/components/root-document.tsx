import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import "@/app/globals.css";

export const rootViewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
};

export function rootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.appName, template: `%s — ${dict.appName}` },
    applicationName: dict.appName,
    formatDetection: { telephone: false, email: false, address: false },
  };
}

/** Khung <html>/<body> dùng chung cho root layout của từng ngôn ngữ. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale}>
      <body className="min-h-dvh overflow-x-hidden">{children}</body>
    </html>
  );
}
