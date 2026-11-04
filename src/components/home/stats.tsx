"use client";

import { useEffect, useRef, useState } from "react";

import type { HomeContent, Stat } from "@/content/home-types";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";
import { useInView } from "./use-in-view";

/** Số liệu tự đếm khi cuộn tới: 5 bước, mỗi bước 0,12 giây (Figma: Section / Stats count). */
const COUNT_STEPS = 5;
const STEP_MS = 120;

/** Section "Hiệu quả bằng con số" (Figma: bt-section s-stats). */
export function Stats({ content, locale }: { content: HomeContent["stats"]; locale: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  // Bắt đầu ở bước cuối: HTML dựng sẵn lúc build có ngay con số thật thay vì toàn số 0 —
  // không cần bản .sr-only lặp lại bên cạnh, và Google đọc ra đúng "10+" chứ không phải "10+0+".
  const [step, setStep] = useState(COUNT_STEPS);
  const armed = useRef(false);

  // Chỉ chạy trên trình duyệt: hạ về 0 để hiệu ứng đếm bắt đầu từ đầu khi cuộn tới. Section này
  // nằm dưới màn hình đầu nên người dùng không thấy lần đổi số này.
  useEffect(() => {
    if (armed.current) return;
    armed.current = true;
    setStep(0);
  }, []);

  useEffect(() => {
    if (!inView || step >= COUNT_STEPS) return;
    const timer = window.setTimeout(() => setStep((value) => value + 1), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [inView, step]);

  return (
    <section className="bt-wrap py-14">
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.6fr_1fr]">
        <Reveal className="flex flex-col items-start">
          <h2 className="bt-h2">{content.title}</h2>
          <p className="bt-lead mt-3.5 max-w-[462px]">{content.lead}</p>
        </Reveal>

        <div ref={ref} className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
          {content.items.map((item, index) => (
            <Reveal key={item.label} className="h-full">
              <StatCard
                stat={item}
                highlight={index === 0}
                shown={Math.round((item.value * step) / COUNT_STEPS)}
                locale={locale}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  highlight,
  shown,
  locale,
}: {
  stat: Stat;
  highlight: boolean;
  shown: number;
  locale: string;
}) {
  // Đang đếm thì số hiển thị chưa đúng, nên giấu khỏi trình đọc màn hình và đưa giá trị thật
  // vào một bản .sr-only. Đếm xong (và trong HTML dựng sẵn) thì chỉ còn một con số duy nhất.
  const counting = shown !== stat.value;
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[217px] flex-col justify-between gap-3 overflow-hidden rounded-[28px] border p-8",
        highlight
          ? "border-accent bg-accent shadow-[0_24px_48px_rgba(166,95,0,0.22)]"
          : "border-line bg-card shadow-[0_1px_1px_var(--shadow-soft)]",
      )}
    >
      {/* Quầng sáng góc trên-phải. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-[150px] -right-[150px] size-[420px] rounded-full",
          highlight
            ? "bg-[radial-gradient(closest-side,rgba(255,255,255,0.45),transparent)]"
            : "bg-[radial-gradient(closest-side,rgba(239,159,39,0.22),transparent)]",
        )}
      />
      <span
        className={cn(
          "relative text-[13px] leading-[20.8px] font-semibold tracking-[1.56px] uppercase",
          highlight ? "text-navy" : "text-accent-text",
        )}
      >
        {stat.label}
      </span>
      <span
        className={cn(
          "relative text-[76px] leading-[76px] font-semibold tracking-[-3.42px] tabular-nums max-sm:text-[60px] max-sm:leading-[60px]",
          highlight ? "text-on-accent" : "text-ink",
        )}
      >
        {counting && (
          <span className="sr-only">
            {stat.value.toLocaleString(locale)}
            {stat.suffix}
          </span>
        )}
        <span aria-hidden={counting ? "true" : undefined}>
          {shown.toLocaleString(locale)}
          <span className={highlight ? "" : "text-accent"}>{stat.suffix}</span>
        </span>
      </span>
      <span
        className={cn(
          "relative text-[17px] leading-[27.2px]",
          highlight ? "text-navy" : "text-ink-muted",
        )}
      >
        {stat.desc}
      </span>
    </div>
  );
}
