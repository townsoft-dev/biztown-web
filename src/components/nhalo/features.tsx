"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import type { AppCopy, NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { MsIcon, Phone } from "./app/app-ui";
import {
  BATCH_SCREEN_HEIGHT,
  BatchScreen,
  BillsScreen,
  ReadingScreen,
  TenantBillScreen,
} from "./app/screens";
import { AnnotatedScreen, NhaloSectionHead, type AnnotationLayout } from "./parts";

const STEP_ICONS = ["bolt", "receipt_long", "send", "account_balance_wallet"];

/** Toạ độ chú thích theo Figma "NhàLo / How it works" (Selected=1…4). */
const LAYOUTS: AnnotationLayout[] = [
  {
    height: 616,
    calloutWidth: 347.5,
    phoneWidth: 292.3,
    callouts: [
      { side: "left", slot: 85, pin: 129 },
      { side: "left", slot: 272.5, pin: 196 },
      { side: "left", slot: 460, pin: 286 },
      { side: "right", slot: 165, pin: 348 },
      { side: "right", slot: 342.5, pin: 403 },
      { side: "right", slot: 520, pin: 546 },
    ],
  },
  {
    // Màn B-03 dài hơn khung chuẩn (BATCH_SCREEN_HEIGHT) để hiện đủ nút cuối, nên khung và
    // chấm 4–6 dời xuống theo vị trí thật của hàng P.104, ô tổng tiền và nút "Tạo & gửi".
    height: 652,
    calloutWidth: 347.5,
    phoneWidth: 292.3,
    callouts: [
      { side: "left", slot: 85, pin: 129 },
      { side: "left", slot: 272.5, pin: 187 },
      { side: "left", slot: 460, pin: 294 },
      { side: "right", slot: 165, pin: 455 },
      { side: "right", slot: 342.5, pin: 564 },
      { side: "right", slot: 520, pin: 609 },
    ],
  },
  {
    height: 717,
    calloutWidth: 367.5,
    phoneWidth: 252.8,
    callouts: [
      { side: "left", slot: 85, pin: 119 },
      { side: "left", slot: 323, pin: 271 },
      { side: "left", slot: 561, pin: 413 },
      { side: "right", slot: 165, pin: 456 },
      { side: "right", slot: 393, pin: 526 },
      { side: "right", slot: 621, pin: 646 },
    ],
  },
  {
    height: 616,
    calloutWidth: 347.5,
    phoneWidth: 292.3,
    callouts: [
      { side: "left", slot: 85, pin: 141 },
      { side: "left", slot: 272.5, pin: 193 },
      { side: "left", slot: 460, pin: 229 },
      { side: "right", slot: 165, pin: 418 },
      { side: "right", slot: 342.5, pin: 376 },
      { side: "right", slot: 520, pin: 556 },
    ],
  },
];

function stepPhone(index: number, app: AppCopy): ReactNode {
  if (index === 2) {
    return (
      <Phone height={1100} className="[--s:0.64]">
        <TenantBillScreen t={app} />
      </Phone>
    );
  }
  if (index === 1) {
    return (
      <Phone height={BATCH_SCREEN_HEIGHT} className="[--s:0.74]">
        <BatchScreen t={app} selected={4} />
      </Phone>
    );
  }
  return (
    <Phone className="[--s:0.74]">
      {index === 0 && <ReadingScreen t={app} />}
      {index === 3 && <BillsScreen t={app} />}
    </Phone>
  );
}

/**
 * "Cách NhàLo hoạt động": 4 bước, mỗi bước một màn hình có chú thích (Figma: How NhàLo works +
 * NhàLo / How it works). Bấm số hoặc dùng phím ←/→ để đổi bước.
 */
export function NhaloFeatures({
  content,
  app,
}: {
  content: NhaloContent["features"];
  app: AppCopy;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = content.steps.length;

  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const target = (index + delta + count) % count;
    setActive(target);
    tabRefs.current[target]?.focus();
  }

  return (
    <section id={NHALO_SECTIONS.features} className="bt-wrap py-[88px] max-md:py-16">
      <NhaloSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      <div
        role="tablist"
        aria-label={content.tag}
        className="mx-auto mt-11 grid max-w-[980px] grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-4"
      >
        {content.steps.map((step, index) => {
          const selected = index === active;
          return (
            <button
              key={step.tab}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`nl-step-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`nl-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKey(event, index)}
              className="flex flex-col items-center gap-3"
            >
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-full text-[17px] leading-none font-bold transition-colors",
                  selected
                    ? "bg-accent text-on-accent"
                    : "border-2 border-line bg-card text-ink-muted",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "text-center text-[18px] leading-[1.3] font-semibold",
                  selected ? "text-ink" : "text-ink-muted",
                )}
              >
                {step.tab}
              </span>
            </button>
          );
        })}
      </div>

      {content.steps.map((step, index) => (
        <div
          key={step.tab}
          id={`nl-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`nl-step-${index}`}
          hidden={index !== active}
          className="mx-auto mt-9 max-w-[1264px] rounded-[32px] border border-[var(--nl-panel-ring)] bg-accent-tint px-3 pt-10 pb-11 sm:px-8"
        >
          <div className="bt-fade flex flex-col items-center gap-7">
            <h3 className="flex items-center gap-3 text-center text-[24px] leading-[38.4px] font-bold text-ink max-sm:text-[20px] max-sm:leading-[1.4]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy text-accent">
                <MsIcon name={STEP_ICONS[index]} size={22} />
              </span>
              {step.title}
            </h3>
            <AnnotatedScreen
              layout={LAYOUTS[index]}
              callouts={step.callouts}
              phone={stepPhone(index, app)}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
