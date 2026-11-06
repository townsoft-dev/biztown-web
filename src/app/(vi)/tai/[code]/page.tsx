import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TaiRedirect } from "@/components/tai/tai-redirect";
import { linkSource, TAI_CODE_PATTERN, TAI_PREBUILT_CODES } from "@/config/tai-links";

export const metadata: Metadata = {
  title: "Tải NhàLo",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return TAI_PREBUILT_CODES.map((code) => ({ code }));
}

/** biztown.vn/tai/<mã>/ — link tải theo nơi đăng, xem src/config/tai-links.ts. */
export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = decodeURIComponent(raw).toLowerCase();
  if (!TAI_CODE_PATTERN.test(code)) notFound();
  const link = linkSource(code);
  return <TaiRedirect code={code} source={link.source} medium={link.medium} />;
}
