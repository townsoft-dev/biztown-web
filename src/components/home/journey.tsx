"use client";

import { useState } from "react";

import type { HomeContent } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { SectionHead } from "./parts";
import { Reveal } from "./reveal";

/** Section "Đồng hành cùng bạn từ ngày đầu tiên" — 4 bước triển khai (Figma: Journey). */
export function Journey({ content }: { content: HomeContent["journey"] }) {
  const { steps } = content;
  const [active, setActive] = useState(0);
  const step = steps[active];
  const progress = (active / (steps.length - 1)) * 100;

  return (
    <section className="bt-wrap py-14">
      <SectionHead tag={content.tag} title={content.title} className="gap-4">
        <p className="bt-lead">{content.lead}</p>
        <a href={`#${HOME_SECTIONS.contact}`} className="bt-btn bt-btn-primary">
          {content.cta}
        </a>
      </SectionHead>

      <Reveal className="mt-10">
        <div role="tablist" className="relative flex">
          {/* Thanh tiến độ nối tâm bước đầu và bước cuối (mỗi bước rộng 1/4). */}
          <div
            aria-hidden="true"
            className="absolute top-[23px] right-[12.5%] left-[12.5%] h-[3px] rounded-[3px] bg-line"
          >
            <div
              className="h-full rounded-[3px] bg-accent transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {steps.map((item, index) => {
            const state = index === active ? "active" : index < active ? "done" : "idle";
            return (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={state === "active"}
                onClick={() => setActive(index)}
                className="relative flex min-w-0 flex-1 flex-col items-center gap-3"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full border-2 text-[17px] leading-none font-bold transition-all duration-300",
                    state === "active" &&
                      "border-accent bg-accent text-on-accent shadow-[0_0_0_8px_rgba(239,159,39,0.18)]",
                    state === "done" && "border-navy bg-navy text-white",
                    state === "idle" && "border-gray-100 bg-white text-[#5a6283]",
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "text-center text-[18px] leading-tight font-semibold max-sm:text-[13px]",
                    state === "active" ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="relative mt-8 overflow-hidden rounded-[36px] bg-[image:var(--warm-bg)] p-12 max-sm:p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[image:var(--warm-grid)] bg-size-[48px_48px]"
        />
        <div key={active} className="bt-fade relative grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-3">
            <span className="text-[96px] leading-[86.4px] font-bold tracking-[-4.8px] text-accent max-sm:text-[64px] max-sm:leading-[64px]">
              {String(active + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[40px] leading-[64px] font-semibold tracking-[-1px] text-ink max-sm:text-[30px] max-sm:leading-tight">
              {step.label}
            </h3>
            <p className="max-w-[462px] text-[19px] leading-[29.4px] text-ink-muted">{step.desc}</p>
          </div>
          <div className="self-start rounded-3xl border border-gray-100 bg-white p-7 text-navy shadow-[0_12px_32px_rgba(35,48,94,0.14)]">
            <p className="text-[13px] leading-[20.8px] font-semibold tracking-[1.82px] text-orange-800 uppercase">
              {content.stepOf
                .replace("{current}", String(active + 1))
                .replace("{total}", String(steps.length))}
            </p>
            <ul>
              {step.checks.map((check, index) => (
                <li
                  key={check}
                  className={cn(
                    "flex items-center gap-3.5 py-4 text-[18px] leading-[28.8px] font-medium",
                    index > 0 && "border-t border-gray-100",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-accent text-[14px] leading-[22.4px] font-bold text-on-accent"
                  >
                    ✓
                  </span>
                  {check}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
