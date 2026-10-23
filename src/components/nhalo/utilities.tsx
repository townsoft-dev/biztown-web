"use client";

import { useId, useState, type CSSProperties } from "react";

import type { NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS, type Locale } from "@/i18n/config";

import { MsIcon } from "./app/app-ui";
import { NhaloSectionHead } from "./parts";

/** Kỳ 01/09 → 01/10: 30 ngày, công tơ chạy từ 1.200 lên 1.350 kWh, giá 3.800đ/kWh. */
const START_KWH = 1200;
const PERIOD_KWH = 150;
const PERIOD_DAYS = 30;
const PRICE = 3800;
const MIN_DAY = 3;
const MAX_DAY = 28;

const SAFEGUARD_ICONS = ["lock", "receipt_long", "history"];

/**
 * "Đổi khách giữa tháng" (Figma: Utilities changeover + NhàLo / UtilitiesTimeline). Kéo thanh
 * ngày đổi khách để xem số kWh và tiền điện chia cho khách cũ/khách mới.
 */
export function NhaloUtilities({
  content,
  locale,
}: {
  content: NhaloContent["utilities"];
  locale: Locale;
}) {
  const [day, setDay] = useState(15);
  const rangeId = useId();
  const number = new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US");

  const ratio = (day - 1) / PERIOD_DAYS;
  const oldKwh = Math.round(PERIOD_KWH * ratio);
  const newKwh = PERIOD_KWH - oldKwh;
  const date = `${String(day).padStart(2, "0")}/09`;
  const sliderFill = ((day - MIN_DAY) / (MAX_DAY - MIN_DAY)) * 100;

  return (
    <section
      id={NHALO_SECTIONS.utilities}
      className="bg-[radial-gradient(1008px_628px_at_100%_457px,var(--nl-glow),transparent)] py-[88px] max-md:py-16"
    >
      <div className="bt-wrap">
        <NhaloSectionHead tag={content.tag} title={content.title} lead={content.lead} />

        <div className="mx-auto mt-11 flex max-w-[1100px] flex-col gap-7 rounded-[32px] border border-line bg-card px-12 pt-10 pb-9 shadow-[0_12px_32px_var(--shadow-navy)] max-md:px-5 max-md:pt-7 max-md:pb-6">
          <div className="flex justify-between gap-5 max-sm:flex-col">
            <Tenant initial="T" person={content.oldTenant} />
            <Tenant initial="M" person={content.newTenant} accent />
          </div>

          <div aria-hidden="true" className="relative h-40">
            <div className="flex justify-between whitespace-nowrap">
              <Reading label={content.periodStart} value={`${number.format(START_KWH)} kWh`} />
              <Reading
                label={content.periodEnd}
                value={`${number.format(START_KWH + PERIOD_KWH)} kWh`}
                end
              />
            </div>
            <div className="absolute inset-x-0 top-[62px] flex h-3.5 overflow-hidden rounded-full">
              <span
                className="h-full bg-[var(--nl-split-old)] transition-[width] duration-150"
                style={{ width: `${ratio * 100}%` }}
              />
              <span className="h-full flex-1 bg-accent" />
            </div>
            <span className="absolute top-[55px] left-0 size-7 rounded-full border-4 border-ink bg-card" />
            <span className="absolute top-[55px] right-0 size-7 rounded-full border-4 border-ink bg-card" />
            <span
              className="absolute top-[53px] size-8 -translate-x-1/2 rounded-full border-[5px] border-[#d98a14] bg-card transition-[left] duration-150"
              style={{ left: `${ratio * 100}%` }}
            />
            <div
              className="absolute top-[98px] flex w-[270px] flex-col items-center gap-[3px] rounded-xl border border-[var(--nl-panel-ring)] bg-accent-tint px-3.5 py-2 text-center transition-[left] duration-150 max-sm:w-[220px]"
              style={{ left: `clamp(0px, calc(${ratio * 100}% - 135px), calc(100% - 270px))` }}
            >
              <span className="text-[12px] leading-[16.2px] text-ink-muted">
                {content.changeover} · {date}
              </span>
              <span className="text-[14px] leading-none font-semibold text-ink">
                {number.format(START_KWH + oldKwh)} kWh
              </span>
            </div>
          </div>

          <div aria-live="polite" className="grid gap-4 md:grid-cols-3">
            <Allocation
              label={content.oldPays}
              value={`${oldKwh} kWh`}
              note={`${number.format(oldKwh * PRICE)}đ`}
            />
            <Allocation
              label={content.newPays}
              value={`${newKwh} kWh`}
              note={`${number.format(newKwh * PRICE)}đ`}
            />
            <Allocation
              label={content.whole}
              value={`${PERIOD_KWH} kWh`}
              note={content.match}
              total
            />
          </div>

          <div className="flex items-center gap-[18px] max-sm:flex-col max-sm:items-stretch max-sm:gap-1.5">
            <label
              htmlFor={rangeId}
              className="text-[14px] leading-none font-semibold whitespace-nowrap text-ink"
            >
              {content.dayLabel}
            </label>
            <input
              id={rangeId}
              type="range"
              min={MIN_DAY}
              max={MAX_DAY}
              value={day}
              aria-valuetext={date}
              onChange={(event) => setDay(Number(event.target.value))}
              className="nl-range flex-1"
              style={{ "--p": `${sliderFill}%` } as CSSProperties}
            />
          </div>
        </div>

        <ul className="mx-auto mt-11 grid max-w-[1100px] gap-6 md:grid-cols-3">
          {content.safeguards.map((item, index) => (
            <li key={item.title} className="flex items-start gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-tint text-ink">
                <MsIcon name={SAFEGUARD_ICONS[index]} size={22} />
              </span>
              <span className="flex min-w-0 flex-col gap-1 text-[14px]">
                <span className="font-semibold text-ink">{item.title}</span>
                <span className="leading-[22.4px] text-ink-muted">{item.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tenant({
  initial,
  person,
  accent,
}: {
  initial: string;
  person: { name: string; role: string };
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={
          accent
            ? "flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-[14px] font-semibold text-on-accent"
            : "flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-[14px] font-semibold text-white dark:bg-[#3a4880]"
        }
      >
        {initial}
      </span>
      <span className="flex flex-col gap-[3px] whitespace-nowrap">
        <span className="text-[21px] leading-[27.3px] font-semibold text-ink">{person.name}</span>
        <span className="text-[14px] leading-[22.4px] text-ink-muted">{person.role}</span>
      </span>
    </div>
  );
}

function Reading({ label, value, end }: { label: string; value: string; end?: boolean }) {
  return (
    <span className={end ? "flex flex-col items-end gap-1" : "flex flex-col gap-1"}>
      <span className="text-[14px] leading-[22.4px] text-ink-muted">{label}</span>
      <span className="text-[21px] leading-[27.3px] font-semibold text-ink">{value}</span>
    </span>
  );
}

function Allocation({
  label,
  value,
  note,
  total,
}: {
  label: string;
  value: string;
  note: string;
  total?: boolean;
}) {
  return (
    <div
      className={
        total
          ? "flex flex-col gap-[5px] rounded-[20px] bg-[var(--nl-total-bg)] p-5"
          : "flex flex-col gap-[5px] rounded-[20px] bg-accent-tint p-5"
      }
    >
      <span
        className={
          total
            ? "text-[14px] leading-[22.4px] text-slate-200"
            : "text-[14px] leading-[22.4px] text-ink-muted"
        }
      >
        {label}
      </span>
      <span
        className={
          total
            ? "text-[24px] leading-[38.4px] font-bold text-white"
            : "text-[24px] leading-[38.4px] font-bold text-ink"
        }
      >
        {value}
      </span>
      <span
        className={
          total
            ? "text-[14px] leading-[22.4px] text-slate-200"
            : "text-[14px] leading-[22.4px] text-ink-muted"
        }
      >
        {note}
      </span>
    </div>
  );
}
