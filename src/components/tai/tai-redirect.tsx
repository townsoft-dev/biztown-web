"use client";

import { useEffect } from "react";

import { analyticsConfig } from "@/config/analytics";
import { storeUrl } from "@/config/tai-links";

type Platform = "ios" | "android" | "desktop";

type Tracker = {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

function detectPlatform(ua: string, touch: number): Platform {
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  // iPadOS 13+ báo là Macintosh nhưng có màn hình cảm ứng.
  if (/Macintosh/i.test(ua) && touch > 1) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

function destination(platform: Platform, code: string, source: string, medium: string) {
  if (platform !== "desktop") return storeUrl(platform, code);
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: code,
  });
  return `/nhalo/?${params.toString()}`;
}

/** Chờ tối đa bấy nhiêu ms cho GA4 ghi lượt bấm rồi chuyển trang dù chưa xong. */
const MAX_WAIT_MS = 800;

/** Ghi lượt bấm (GA4, Meta Pixel nếu có) rồi chuyển sang store đúng loại máy. */
export function TaiRedirect({
  code,
  source,
  medium,
}: {
  code: string;
  source: string;
  medium: string;
}) {
  const links = {
    ios: destination("ios", code, source, medium),
    android: destination("android", code, source, medium),
  };

  useEffect(() => {
    // ?p=ios|android: người bấm đúng nút App Store / Google Play trên trang /nhalo/ (kể cả
    // từ máy tính) — mở thẳng store đó. Không có ?p thì đoán theo loại máy như cũ.
    const forced = new URLSearchParams(window.location.search).get("p");
    const platform: Platform =
      forced === "ios" || forced === "android"
        ? forced
        : detectPlatform(navigator.userAgent, navigator.maxTouchPoints ?? 0);
    const target = destination(platform, code, source, medium);

    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.replace(target);
    };

    const w = window as unknown as Tracker;
    // Chậm nhất MAX_WAIT_MS kể từ lúc trang chạy thì chuyển, dù GA4 chưa xác nhận.
    const deadline = window.setTimeout(go, MAX_WAIT_MS);
    let sent = false;
    // gtag (bản tạm xếp hàng sự kiện) do script GA4 khai báo ngay sau khi trang chạy; chờ nó
    // xuất hiện rồi gửi sự kiện. GA4 gửi bằng sendBeacon nên vẫn tới nơi khi đã rời trang.
    const timer = window.setInterval(() => {
      const ready = !analyticsConfig.ga4Id || typeof w.gtag === "function";
      if (!ready || sent) return;
      sent = true;
      window.clearInterval(timer);
      w.fbq?.("trackCustom", "TaiClick", { link_code: code, platform });
      if (!w.gtag) return go();
      w.gtag("event", "tai_click", {
        link_code: code,
        platform,
        link_source: source,
        link_medium: medium,
        transport_type: "beacon",
        event_callback: go,
      });
    }, 30);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(deadline);
    };
  }, [code, source, medium]);

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-lg font-semibold">Đang mở trang tải NhàLo…</p>
      <p className="text-sm opacity-75">Nếu trang không tự chuyển, chọn đúng loại máy của bạn:</p>
      <div className="flex w-full flex-col gap-3">
        <a className="bt-btn bt-btn-primary" href={links.ios}>
          iPhone — App Store
        </a>
        <a className="bt-btn bt-btn-primary" href={links.android}>
          Android — Google Play
        </a>
        <a className="text-sm underline" href="/nhalo/">
          Xem giới thiệu NhàLo
        </a>
      </div>
    </main>
  );
}
