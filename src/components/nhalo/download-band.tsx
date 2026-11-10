"use client";

import { useEffect, useId, useState, type FormEvent } from "react";

import type { NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS, type Locale } from "@/i18n/config";
import { LEAD_MAX_LENGTH, validateLead } from "@/lib/nhalo-lead";
import { cn } from "@/lib/utils";

import { MascotArt, StoreBadges, type MascotArtName } from "./parts";
import { useNhaloLinks } from "./use-link-code";

type Status =
  "idle" | "sending" | "sent" | keyof Omit<NhaloContent["band"]["form"], "sending" | "sent">;

/**
 * Banner cuối trang: tải app + để lại số điện thoại hoặc email (Figma: Download and
 * consultation). Gửi qua /api/nhalo-lead → email cho đội BizTown, kèm utm_campaign để biết
 * khách đến từ quảng cáo nào. Nút "Liên hệ tư vấn" trên header cuộn tới đây.
 */
export function NhaloDownloadBand({
  content,
  locale,
}: {
  content: NhaloContent["band"];
  locale: Locale;
}) {
  const inputId = useId();
  const messageId = useId();
  const links = useNhaloLinks();
  const [value, setValue] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const payload = {
      contact: value,
      campaign: new URLSearchParams(window.location.search).get("utm_campaign") ?? "",
      locale,
      website,
    };
    const { error } = validateLead(payload);
    if (error) return setStatus(error);

    setStatus("sending");
    try {
      const response = await fetch("/api/nhalo-lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus("sent");
        setValue("");
        (window as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "generate_lead", {
          lead_source: "nhalo_band",
          link_code: payload.campaign || "web",
        });
        return;
      }
      setStatus(
        response.status === 429 ? "rateLimited" : response.status === 400 ? "invalid" : "failed",
      );
    } catch {
      setStatus("failed");
    }
  }

  const message =
    status === "idle" ? null : status === "sending" ? content.form.sending : content.form[status];
  const isError = status !== "idle" && status !== "sending" && status !== "sent";

  return (
    <section id={NHALO_SECTIONS.download} className="bt-wrap py-[88px] max-md:py-16">
      <div className="relative mx-auto flex max-w-[1264px] items-center gap-12 overflow-hidden rounded-[40px] bg-[radial-gradient(607px_348px_at_278px_261px,rgba(239,159,39,0.35),transparent),linear-gradient(90deg,#141c38_0%,#23305e_100%)] p-16 max-lg:flex-col max-lg:gap-6 max-md:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[64px_64px]"
        />
        <div className="relative flex h-[300px] w-[390px] shrink-0 items-center justify-center max-lg:h-[200px] max-lg:w-auto">
          <BandScenes />
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col items-start gap-6">
          <h2 className="text-[52px] leading-[57.2px] font-semibold tracking-[-1.56px] max-sm:text-[34px] max-sm:leading-10 max-sm:tracking-[-1px]">
            <span className="block text-white">{content.title[0]}</span>
            <span className="-my-[0.2em] block bg-[linear-gradient(90deg,#ef9f27,#ffd08a)] bg-clip-text py-[0.2em] text-transparent">
              {content.title[1]}
            </span>
          </h2>
          <StoreBadges store={content.store} links={links} />
          <div className="flex w-full flex-col gap-3">
            <p className="text-[14px] leading-[22.4px] text-slate-200">{content.consult}</p>
            <form
              noValidate
              onSubmit={onSubmit}
              className="flex w-full max-w-[540px] items-center gap-2 rounded-full bg-white py-[5px] pr-[5px] pl-[22px] focus-within:shadow-[0_0_0_3px_#ef9f27] max-sm:flex-wrap max-sm:rounded-3xl max-sm:p-2"
            >
              <label htmlFor={inputId} className="sr-only">
                {content.inputLabel}
              </label>
              {/* Bẫy bot: người thật không thấy ô này. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="absolute -left-[9999px] size-px opacity-0"
              />
              <input
                id={inputId}
                type="text"
                autoComplete="tel"
                maxLength={LEAD_MAX_LENGTH}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  if (isError) setStatus("idle");
                }}
                aria-invalid={isError || undefined}
                aria-describedby={message ? messageId : undefined}
                placeholder={content.inputLabel}
                className="min-w-0 flex-1 bg-transparent text-[16px] text-navy outline-none placeholder:text-app-faint max-sm:px-3 max-sm:py-2.5"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex h-[46px] items-center justify-center rounded-full bg-navy-950 px-7 text-[14px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-navy max-sm:w-full"
              >
                {content.cta}
              </button>
            </form>
            <p
              id={messageId}
              role="status"
              aria-live="polite"
              className={cn(
                "min-h-[22px] text-[14px] leading-[22.4px] font-medium",
                isError ? "text-[#ffb4a8]" : "text-[#9be3b4]",
              )}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const SCENES: MascotArtName[] = ["band-chi-noi-dung", "band-mua-tien", "band-thanh-thoi"];
const SCENE_MS = 3600;

/**
 * Ba cảnh mascot đổi lần lượt (mờ dần sang cảnh sau): chỉ vào ô đăng ký → nhảy trong mưa tiền →
 * ngồi thảnh thơi "Đã thu đủ". Cùng khung 640×480, chân mascot cùng chỗ nên không bị nhảy.
 * Máy bật "giảm chuyển động" thì đứng yên ở cảnh đầu.
 */
function BandScenes() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setScene((index) => (index + 1) % SCENES.length),
      SCENE_MS,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[4/3] w-[400px] max-lg:w-[260px]">
      {SCENES.map((name, index) => (
        <MascotArt
          key={name}
          name={name}
          className={cn(
            "absolute inset-0 w-full transition-opacity duration-700 ease-out",
            index === scene ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
