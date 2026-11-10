"use client";

import { useEffect } from "react";

import { analyticsConfig } from "@/config/analytics";
import { siteConfig } from "@/config/site";

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
  const { ios, android } = siteConfig.nhaloStores;
  if (platform === "ios") {
    const pt = analyticsConfig.appStoreProviderToken;
    const params = new URLSearchParams({ ct: code, mt: "8" });
    if (pt) params.set("pt", pt);
    return `https://apps.apple.com/app/apple-store/id${ios.appId}?${params.toString()}`;
  }
  if (platform === "android") {
    const referrer = `utm_source=${source}&utm_medium=${medium}&utm_campaign=${code}`;
    return `${android.url}&referrer=${encodeURIComponent(referrer)}`;
  }
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: code,
  });
  return `/nhalo/?${params.toString()}`;
}

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
    let waited = false;
    // Script đo lường tải bất đồng bộ: chờ tối đa ~1,2 giây cho GA4 gửi xong rồi mới chuyển.
    const started = Date.now();
    const timer = window.setInterval(() => {
      const ready = !analyticsConfig.ga4Id || typeof w.gtag === "function";
      if (!ready && Date.now() - started < 1200) return;
      window.clearInterval(timer);
      if (waited) return;
      waited = true;
      w.fbq?.("trackCustom", "TaiClick", { link_code: code, platform });
      if (w.gtag) {
        w.gtag("event", "tai_click", {
          link_code: code,
          platform,
          link_source: source,
          link_medium: medium,
          event_callback: go,
          event_timeout: 800,
        });
        window.setTimeout(go, 900);
      } else {
        go();
      }
    }, 50);
    return () => window.clearInterval(timer);
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
