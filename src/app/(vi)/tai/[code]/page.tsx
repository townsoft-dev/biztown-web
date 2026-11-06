import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TaiRedirect } from "@/components/tai/tai-redirect";
import { TAI_CODE_PATTERN, TAI_LINKS } from "@/config/tai-links";

export const metadata: Metadata = {
  title: "Tải NhàLo",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return Object.keys(TAI_LINKS).map((code) => ({ code }));
}

/** biztown.vn/tai/<mã>/ — link tải theo nơi đăng, xem src/config/tai-links.ts. */
export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = decodeURIComponent(raw).toLowerCase();
  if (!TAI_CODE_PATTERN.test(code)) notFound();
  const link = TAI_LINKS[code] ?? { source: "other", medium: "other" };
  return <TaiRedirect code={code} source={link.source} medium={link.medium} />;
}
