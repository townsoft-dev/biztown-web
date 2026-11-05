import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/**
 * Web app manifest (/manifest.webmanifest). Next tự thêm <link rel="manifest"> vào mọi trang.
 * Chỉ có một bản, viết bằng tiếng Việt vì đây là thị trường chính; `lang`/`dir` khai theo đó.
 * Icon sinh từ public/images/home/biztown-mark.svg — xem public/icons/.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BizTown — Hệ sinh thái phần mềm quản trị và tự động hoá",
    short_name: "BizTown",
    description:
      "Nền tảng hệ sinh thái phần mềm quản trị và tự động hoá dành cho cá nhân, hộ kinh doanh và doanh nghiệp SME tại Việt Nam.",
    lang: "vi",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: siteConfig.themeColor,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
