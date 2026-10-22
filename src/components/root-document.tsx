import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import "@/app/globals.css";

// Font tự host lúc build (next/font), không gọi Google Fonts lúc chạy.
const lexend = Lexend({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lexend",
  display: "swap",
});

/**
 * Chạy đồng bộ trong <head> trước khi trang hiện, nên viết inline:
 * - thêm class "js" để hiệu ứng hiện dần khi cuộn chỉ ẩn nội dung khi có JS;
 * - đặt data-theme để không nháy màu: lấy lựa chọn đã lưu, nếu chưa có thì theo hệ điều hành.
 */
const THEME_INIT_SCRIPT = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("bt-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export const rootViewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export function rootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.siteName, template: `%s — ${dict.siteName}` },
    applicationName: dict.siteName,
    formatDetection: { telephone: false, email: false, address: false },
  };
}

/** Khung <html>/<body> dùng chung cho root layout của từng ngôn ngữ. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    // data-theme do THEME_INIT_SCRIPT đặt trước khi React hydrate.
    <html lang={locale} className={lexend.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh overflow-x-hidden">{children}</body>
    </html>
  );
}
