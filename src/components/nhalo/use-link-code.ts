"use client";

import { useSyncExternalStore } from "react";

import { siteConfig } from "@/config/site";
import { pageLinkCode, taiPath } from "@/config/tai-links";

// URL không đổi khi đang xem trang, nên không cần lắng nghe gì.
const subscribe = () => () => {};

function readCode() {
  return pageLinkCode(new URLSearchParams(window.location.search).get("utm_campaign"));
}

/**
 * Link tải trên trang /nhalo/ mang mã nguồn của người vào (xem src/config/tai-links.ts):
 * có utm_campaign hợp lệ → "<mã>-trang" cho cả QR và nút store; không có → QR "web-qr",
 * nút store "web". Lúc dựng sẵn (server) chưa biết URL nên dùng mã mặc định.
 */
export function useNhaloLinks() {
  const code = useSyncExternalStore(subscribe, readCode, () => null);
  return {
    qr: `${siteConfig.url}${taiPath(code ?? "web-qr")}`,
    ios: taiPath(code ?? "web", "ios"),
    android: taiPath(code ?? "web", "android"),
  };
}
