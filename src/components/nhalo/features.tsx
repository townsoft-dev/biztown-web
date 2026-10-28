"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import type { AppCopy, NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { AnnotatedScreen, type AnnoSide } from "./annotated-screen";
import { MsIcon, PHONE_SCALE, Phone } from "./app/app-ui";
import { BatchScreen, BillsScreen, ReadingScreen, TenantBillScreen } from "./app/screens";
import { NhaloSectionHead } from "./parts";

const STEP_ICONS = ["bolt", "receipt_long", "send", "account_balance_wallet"];

/** Ba chú thích đầu bên trái, ba chú thích sau bên phải (Figma "NhàLo / How it works"). */
const SIDES: AnnoSide[] = ["left", "left", "left", "right", "right", "right"];

/** Điện thoại cỡ như hero (Figma 316×666), người xem tự kéo trong màn hình. */
function stepPhone(index: number, app: AppCopy): ReactNode {
  // Trang hoá đơn người thuê không có thanh tiêu đề/thanh dưới: cả màn hình cuộn.
  if (index === 2) {
    return (
      <Phone scroll="screen" className={PHONE_SCALE}>
        <TenantBillScreen t={app} />
      </Phone>
    );
  }
  return (
    <Phone scroll="body" className={PHONE_SCALE}>
      {index === 0 && <ReadingScreen t={app} />}
      {index === 1 && <BatchScreen t={app} selected={4} />}
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
        // Màn hẹp: vẫn 4 bước trên 1 hàng, thu nhỏ số và chữ cho vừa chỗ.
        className="mx-auto mt-11 grid max-w-[980px] grid-cols-4 gap-x-5 max-md:mt-8 max-md:gap-x-2"
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
              className="flex flex-col items-center gap-3 max-md:gap-2"
            >
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-full text-[17px] leading-none font-bold transition-colors max-md:size-10 max-md:text-[15px]",
                  selected
                    ? "bg-accent text-on-accent"
                    : "border-2 border-line bg-card text-ink-muted",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "text-center text-[18px] leading-[1.3] font-semibold max-md:text-[13px]",
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
              sides={SIDES}
              callouts={step.callouts}
              hint={app.scrollHint}
              phone={stepPhone(index, app)}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
