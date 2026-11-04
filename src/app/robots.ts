import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/ chỉ có route handler nhận POST của form liên hệ, không có gì để lập chỉ mục.
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
