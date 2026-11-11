"use client";

import { useEffect, useId, useState, type CSSProperties, type FormEvent } from "react";

import { AppMark, type AppMarkKind } from "@/components/ui/app-mark";

import type { HomeContent } from "@/content/home-types";
import { HOME_SECTIONS, localizedPath, type Locale } from "@/i18n/config";
import { LEAD_MAX_LENGTH, validateLead } from "@/lib/nhalo-lead";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

type Copy = HomeContent["contact"];
type Need = Copy["needs"][number]["key"];
type Status = "idle" | "sending" | keyof Omit<Copy["form"], "sending">;

/**
 * Khối Liên hệ cuối trang chủ (cùng cách làm với khối cuối trang NhàLo): chọn nhu cầu, để lại
 * số điện thoại hoặc email → /api/biztown-lead gửi email cho đội BizTown. Cạnh form có nút
 * mở trang Liên hệ đầy đủ. Nút "Nhận tư vấn" ở hero cuộn tới đây.
 */
export function ContactBand({ content, locale }: { content: Copy; locale: Locale }) {
  const inputId = useId();
  const messageId = useId();
  const [need, setNeed] = useState<Need>(content.needs[0].key);
  const [value, setValue] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Nút "Nhận tư vấn" ở chỗ khác trên trang (a[data-need]) cuộn tới đây và chọn sẵn loại tư vấn.
  useEffect(() => {
    const keys = new Set<string>(content.needs.map((item) => item.key));
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLElement>("[data-need]");
      const key = link?.dataset.need;
      if (key && keys.has(key)) setNeed(key as Need);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [content.needs]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const payload = { contact: value, need, locale, website, campaign: "" };
    const { error } = validateLead(payload);
    if (error) return setStatus(error);

    setStatus("sending");
    try {
      const response = await fetch("/api/biztown-lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus("sent");
        setValue("");
        (window as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "generate_lead", {
          lead_source: "biztown_home",
          need,
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

  const message = status === "idle" ? null : content.form[status];
  const isError = status !== "idle" && status !== "sending" && status !== "sent";

  return (
    <section id={HOME_SECTIONS.contact} className="bt-wrap scroll-mt-24 pt-14 pb-[88px]">
      <Reveal className="relative flex items-center gap-14 overflow-hidden rounded-[40px] bg-[radial-gradient(607px_348px_at_250px_300px,rgba(239,159,39,0.35),transparent),radial-gradient(500px_300px_at_100%_0%,rgba(91,124,255,0.25),transparent),linear-gradient(90deg,#141c38_0%,#23305e_100%)] p-16 max-lg:flex-col max-lg:gap-8 max-md:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[64px_64px]"
        />

        <ChatScene chat={content.chat} />

        <div className="relative flex min-w-0 flex-1 flex-col items-start gap-6">
          <h2 className="text-[46px] leading-[1.15] font-semibold tracking-[-1.4px] text-balance max-sm:text-[32px] max-sm:leading-10 max-sm:tracking-[-1px]">
            <span className="block text-white">{content.title[0]}</span>
            <span className="-my-[0.2em] block bg-[linear-gradient(90deg,#ef9f27,#ffd08a)] bg-clip-text py-[0.2em] text-transparent">
              {content.title[1]}
            </span>
          </h2>
          <p className="max-w-[620px] text-[18px] leading-[1.6] text-pretty text-slate-200">
            {content.lead}
          </p>

          <div role="radiogroup" aria-label={content.needLabel} className="flex flex-wrap gap-2">
            {content.needs.map((item) => {
              const active = item.key === need;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setNeed(item.key)}
                  className={cn(
                    "h-10 rounded-full border px-4 text-[14px] font-medium transition-all duration-200",
                    active
                      ? "border-accent bg-accent text-[#23305e]"
                      : "border-white/20 bg-white/[0.06] text-white/80 hover:-translate-y-0.5 hover:border-white/40 hover:text-white",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex w-full flex-col gap-2">
            {/* Form + "hoặc" + nút Liên hệ (trang Liên hệ đầy đủ) trên cùng một hàng. */}
            <div className="flex w-full flex-wrap items-center gap-x-4 gap-y-3">
              <form
                noValidate
                onSubmit={onSubmit}
                className="flex max-w-[560px] min-w-0 flex-1 basis-[360px] items-center gap-2 rounded-full bg-white py-[5px] pr-[5px] pl-[22px] focus-within:shadow-[0_0_0_3px_#ef9f27] max-sm:flex-wrap max-sm:rounded-3xl max-sm:p-2"
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
                  className="min-w-0 flex-1 bg-transparent text-[16px] text-navy outline-none placeholder:text-[#8a91a8] max-sm:px-3 max-sm:py-2.5"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex h-[46px] items-center justify-center rounded-full bg-accent px-7 text-[15px] font-semibold whitespace-nowrap text-[#23305e] transition-[box-shadow,translate] hover:-translate-y-px hover:shadow-[0_10px_20px_rgba(239,159,39,0.4)] max-sm:w-full"
                >
                  {content.cta}
                </button>
              </form>
              <span className="text-[14px] text-white/60">{content.or}</span>
              <a
                href={localizedPath(locale, "contact")}
                className="flex h-[56px] items-center justify-center rounded-full border border-white/40 px-7 text-[15px] font-semibold whitespace-nowrap text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {content.page}
              </a>
            </div>
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
      </Reveal>
    </section>
  );
}

/** Sản phẩm nằm trên vòng quay quanh tâm (góc độ, bắt đầu từ trên cùng theo chiều kim đồng hồ). */
const ORBIT: { mark: AppMarkKind; angle: number }[] = [
  { mark: { logo: "nhalo" }, angle: 0 },
  { mark: { logo: "balheh" }, angle: 120 },
  { mark: { logo: "chinchu" }, angle: 240 },
];
const CHAT_MS = 3800;

/**
 * Minh hoạ khối Liên hệ: BizTown ở tâm phát sóng, ba sản phẩm quay chậm trên vòng nét đứt,
 * hai bong bóng chat (khách hỏi → BizTown đáp) đổi lần lượt từng cặp. Máy bật "giảm chuyển
 * động" thì đứng yên ở cặp đầu.
 */
function ChatScene({ chat }: { chat: Copy["chat"] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % chat.length), CHAT_MS);
    return () => window.clearInterval(timer);
  }, [chat.length]);

  const pair = chat[index];
  return (
    <div aria-hidden="true" className="relative h-[380px] w-[360px] shrink-0 max-md:hidden">
      {/* Vòng nét đứt quay chậm mang ba sản phẩm (biểu tượng tự quay ngược để đứng thẳng). */}
      <div className="absolute top-1/2 left-1/2 size-[220px] -translate-1/2 rounded-full border-2 border-dashed border-white/20 motion-safe:animate-[bt-orbit_36s_linear_infinite]">
        {ORBIT.map((item) => (
          <span
            key={item.angle}
            className="absolute top-1/2 left-1/2 size-0"
            style={{ transform: `rotate(${item.angle}deg) translateY(-110px)` }}
          >
            <span
              className="absolute"
              style={{ transform: `translate(-50%, -50%) rotate(${-item.angle}deg)` }}
            >
              <span className="flex size-12 items-center justify-center rounded-[16px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] motion-safe:animate-[bt-orbit_36s_linear_infinite_reverse]">
                <AppMark mark={item.mark} size={36} radius={10} surface="light" />
              </span>
            </span>
          </span>
        ))}
      </div>

      {/* Tâm: BizTown phát sóng. */}
      {[0, 1.4].map((delay) => (
        <span
          key={delay}
          className="absolute top-1/2 left-1/2 -mt-[56px] -ml-[56px] size-[112px] rounded-full bg-[rgba(239,159,39,0.35)] motion-safe:animate-[bt-pulse_2.8s_ease-out_infinite]"
          style={{ animationDelay: `${delay}s` } as CSSProperties}
        />
      ))}
      <span className="absolute top-1/2 left-1/2 flex size-[112px] -translate-1/2 items-center justify-center rounded-[34px] border border-white/25 bg-white/12 shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_60px_rgba(239,159,39,0.45)] backdrop-blur-[10px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- logo SVG nhỏ */}
        <img src="/images/home/biztown-mark.svg" alt="" width={58} height={58} />
      </span>

      {/* Khách hỏi (trên trái) → BizTown đáp (dưới phải), hiện lại mỗi lần đổi cặp. */}
      <p
        key={`ask-${index}`}
        className="absolute top-0 left-0 z-[2] w-max max-w-[250px] rounded-[20px] rounded-bl-[6px] bg-white px-4 py-2.5 text-[14px] leading-snug font-medium text-[#23305e] shadow-[0_14px_30px_rgba(0,0,0,0.25)] motion-safe:animate-[bh-pop-in_0.45s_ease-out_both]"
      >
        {pair.ask}
      </p>
      <p
        key={`answer-${index}`}
        className="absolute right-0 bottom-0 z-[2] w-max max-w-[300px] rounded-[20px] rounded-br-[6px] bg-[linear-gradient(135deg,#ffd08a,#ef9f27)] px-4 py-2.5 text-[14px] leading-snug font-semibold text-[#23305e] shadow-[0_14px_30px_rgba(239,159,39,0.35)] motion-safe:animate-[bh-pop-in_0.45s_ease-out_0.9s_both]"
      >
        {pair.answer}
      </p>
    </div>
  );
}
