"use client";

import { useSyncExternalStore } from "react";

import { siteConfig } from "@/config/site";
import { linkSource, pageLinkCode, storeUrl, taiPath, type TaiPlatform } from "@/config/tai-links";

// URL không đổi khi đang xem trang, nên không cần lắng nghe gì.
const subscribe = () => () => {};

function readCode() {
  return pageLinkCode(new URLSearchParams(window.location.search).get("utm_campaign"));
}

type Tracker = {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/**
 * Ghi lượt bấm nút store ngay trên trang /nhalo/ — cùng sự kiện `tai_click` như trang /tai/
 * để báo cáo GA4 không đứt. GA4 gửi bằng sendBeacon nên vẫn tới nơi khi store mở ra.
 */
function trackStoreClick(code: string, platform: TaiPlatform) {
  const w = window as unknown as Tracker;
  const { source, medium } = linkSource(code);
  w.fbq?.("trackCustom", "TaiClick", { link_code: code, platform });
  w.gtag?.("event", "tai_click", {
    link_code: code,
    platform,
    link_source: source,
    link_medium: medium,
    transport_type: "beacon",
  });
}

/**
 * Link tải trên trang /nhalo/ mang mã nguồn của người vào (xem src/config/tai-links.ts):
 * có utm_campaign hợp lệ → "<mã>-trang"; không có → QR "web-qr", nút store "web".
 *
 * - QR phải qua /tai/<mã>/ (điện thoại quét mới biết là iPhone hay Android).
 * - Nút store mở thẳng App Store / Google Play (không qua trang trung gian /tai/), lượt bấm
 *   ghi ngay lúc bấm.
 *
 * Lúc dựng sẵn (server) chưa biết URL nên dùng mã mặc định.
 */
export function useNhaloLinks() {
  const code = useSyncExternalStore(subscribe, readCode, () => null);
  const storeCode = code ?? "web";
  return {
    qr: `${siteConfig.url}${taiPath(code ?? "web-qr")}`,
    ios: storeUrl("ios", storeCode),
    android: storeUrl("android", storeCode),
    onClick: (platform: TaiPlatform) => trackStoreClick(storeCode, platform),
  };
}
