"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import { Reveal } from "@/components/home/reveal";
import { useInView } from "@/components/home/use-in-view";
import type { BalhehManageContent } from "@/content/balheh-types";
import { BALHEH_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { BxIcon } from "./app/app-ui";
import { bxInter } from "./app/app-ui";
import { BalhehSection, BalhehSectionHead } from "./parts";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * "Mọi thứ để đội chạy đều mỗi ngày" (Figma: Section · Quản lý): ba thẻ — theo dõi tiến độ, lịch
 * và thông báo, bảo mật tài khoản — mỗi thẻ một hình minh hoạ giao diện Balheh và một liên kết.
 * Cuộn tới thì thanh tiến độ mọc dần và mã OTP tự điền (bỏ qua khi bật "giảm chuyển động").
 */
export function BalhehManage({ content }: { content: BalhehManageContent }) {
  const arts = [
    <ProgressArt key="progress" />,
    <CalendarArt key="calendar" />,
    <TwoFactorArt key="2fa" />,
  ];
  return (
    <BalhehSection
      id="manage"
      className="bg-[radial-gradient(760px_600px_at_0%_50%,rgba(120,185,255,0.34),transparent)] dark:bg-[radial-gradient(760px_600px_at_0%_50%,rgba(120,185,255,0.1),transparent)]"
    >
      <BalhehSectionHead tag={content.tag} title={content.title} />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {content.cards.map((card, index) => (
          <Reveal
            key={card.title}
            as="article"
            className="flex flex-col rounded-[24px] border border-line bg-card p-6 shadow-[0_1px_2px_var(--shadow-soft)] max-sm:p-5"
          >
            <div className="flex min-h-[310px] items-center justify-center rounded-[20px] bg-[#f4f6fa] px-4 py-4 max-sm:px-3 dark:bg-card-soft">
              {arts[index]}
            </div>
            <h3 className="mt-5 text-[24px] leading-[38.4px] font-semibold tracking-[-0.02em] text-ink">
              {card.title}
            </h3>
            <p className="mt-2 text-[16px] leading-[25.6px] text-pretty text-ink-muted">
              {card.desc}
            </p>
            <a
              href={`#${BALHEH_SECTIONS[card.link.to]}`}
              className="group mt-auto flex items-center gap-3 self-start pt-[22px] text-[16px] leading-none font-semibold text-ink"
            >
              <span
                aria-hidden="true"
                className="flex size-7 items-center justify-center rounded-full border border-line-strong text-[14px] transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
              >
                →
              </span>
              {card.link.label}
            </a>
          </Reveal>
        ))}
      </div>
    </BalhehSection>
  );
}

/** Khung giao diện trắng trong hình minh hoạ (file mẫu: .mc .art > .bx). Màu cố định như app. */
function MockBox({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        bxInter.className,
        "w-full max-w-[355px] rounded-xl border border-[#e5e7eb] bg-white p-3.5 text-left text-[#1d1f24] shadow-[0_12px_28px_rgba(35,48,94,0.10)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Đã cuộn tới hình minh hoạ chưa — dùng để chạy hiệu ứng một lần. */
function useArtInView() {
  return useInView<HTMLDivElement>(0.4);
}

const KPIS: { label: string; value: string; note: string; tone: string; alert?: boolean }[] = [
  { label: "Total Task", value: "157", note: "4 Boards", tone: "text-[#2563eb]" },
  { label: "Completed", value: "120", note: "+14 this week", tone: "text-[#16a34a]" },
  { label: "Overdue", value: "8", note: "2 Critical", tone: "text-[#dc2626]", alert: true },
];

const BOARD_PROGRESS: { name: string; tasks: string; done: number; color: string }[] = [
  { name: "Front-end Board", tasks: "19/48", done: 40, color: "#f5b301" },
  { name: "Back-end Board", tasks: "18/27", done: 67, color: "#3b82f6" },
  { name: "Mobile Board", tasks: "32/32", done: 100, color: "#1f8a4c" },
  { name: "QA & Testing", tasks: "4/21", done: 15, color: "#ef4444" },
];

/** Theo dõi tiến độ: ô số liệu + tiến độ từng bảng (Figma: Visual / Theo dõi tiến độ). */
function ProgressArt() {
  const [ref, inView] = useArtInView();
  return (
    <div ref={ref} className="flex w-full justify-center">
      <MockBox>
        <div className="mb-3 grid grid-cols-3 gap-1.5">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="rounded-[7px] border border-[#d1d5db] p-2">
              <small className="block text-[10px] leading-[14px] text-[#4b5563]">{kpi.label}</small>
              <b
                className={cn(
                  "block text-[20px] leading-[28px] font-bold",
                  kpi.alert && "text-[#dc2626]",
                )}
              >
                {kpi.value}
              </b>
              <small className={cn("block text-[9.5px] leading-[13.3px]", kpi.tone)}>
                {kpi.note}
              </small>
            </div>
          ))}
        </div>
        <b className="block text-[12.5px] leading-[17.5px] font-bold">Progress by Board</b>
        <small className="mb-1.5 block text-[10px] leading-[14px] text-[#9ca3af]">
          Task completion per board
        </small>
        {BOARD_PROGRESS.map((board) => (
          <div key={board.name} className="mt-[7px]">
            <div className="flex items-center gap-1.5 text-[11px] leading-[15.4px] font-medium">
              <i className="size-2 shrink-0 rounded-full" style={{ background: board.color }} />
              <span className="truncate">{board.name}</span>
              <span className="ml-auto text-[10px] whitespace-nowrap text-[#9ca3af]">
                {board.tasks} tasks
              </span>
              <em
                className="w-8 text-right text-[10.5px] font-semibold not-italic"
                style={{ color: board.color }}
              >
                {board.done}%
              </em>
            </div>
            <div className="mt-1 h-[5px] overflow-hidden rounded-[2.5px] bg-[#f1f2f4]">
              {/* Có JS thì thanh bắt đầu từ 0 và mọc tới giá trị khi cuộn tới. */}
              <i
                className={cn(
                  "block h-full w-(--w) rounded-[2.5px] transition-[width] duration-[1100ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
                  !inView && "in-[.js]:w-0",
                )}
                style={{ "--w": `${board.done}%`, background: board.color } as CSSProperties}
              />
            </div>
          </div>
        ))}
      </MockBox>
    </div>
  );
}

const DAYS: [string, number][] = [
  ["MON", 22],
  ["TUE", 23],
  ["WED", 24],
  ["THU", 25],
  ["FRI", 26],
];
const TODAY = 3;

/** Sự kiện trong tuần: tên, vị trí cột/hàng trên lưới 5 ngày, màu (file mẫu: .ev). */
const EVENTS: { name: string; place: string; tone: string }[] = [
  {
    name: "Security Training",
    place: "col-[1/3] row-2",
    tone: "bg-[#e6f6ef] text-[#0f766e] shadow-[inset_3px_0_0_#14b8a6]",
  },
  {
    name: "Final Design",
    place: "col-[3/4] row-2",
    tone: "bg-[#fdecec] text-[#dc2626] shadow-[inset_3px_0_0_#ef4444]",
  },
  {
    name: "Sprint Planning #13",
    place: "col-[4/6] row-[2/4] flex items-center",
    tone: "bg-[#ecebfd] text-[#4f46e5] shadow-[inset_3px_0_0_#6366f1]",
  },
  {
    name: "Year-end Party",
    place: "col-[1/3] row-3",
    tone: "bg-[#fff1e6] text-[#c2410c] shadow-[inset_3px_0_0_#f97316]",
  },
  {
    name: "Client A",
    place: "col-[3/4] row-3",
    tone: "bg-[#e6f4fd] text-[#0369a1] shadow-[inset_3px_0_0_#0ea5e9]",
  },
];

const NOTIFY: [string, boolean][] = [
  ["Task assigned", true],
  ["Mentions", true],
  ["Due dates", true],
  ["Comment", false],
];

/** Lịch và thông báo: lịch tuần + cài đặt email thông báo (Figma: Visual / Lịch và thông báo). */
function CalendarArt() {
  return (
    <MockBox>
      <div className="mb-2 flex items-center justify-between">
        <b className="text-[13px] leading-[18.2px] font-bold">Calendar</b>
        <span className="inline-flex rounded-md bg-[#f1f2f4] p-0.5 text-[10px] leading-[14px]">
          {["Day", "Week", "Month"].map((mode) => (
            <i
              key={mode}
              className={cn(
                "rounded-[5px] px-2 py-[3px] not-italic",
                mode === "Week"
                  ? "bg-white font-semibold text-[#1d1f24] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                  : "text-[#6b7280]",
              )}
            >
              {mode}
            </i>
          ))}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-[3px] rounded-[7px] p-1 shadow-[inset_0_0_0_1px_#e5e7eb]">
        {DAYS.map(([day, date], index) => (
          <div
            key={day}
            className={cn(
              "row-1 py-1 text-center",
              index === TODAY && "rounded-[5px] bg-[#e6eefb]",
            )}
            style={{ gridColumn: index + 1 }}
          >
            <small className="block text-[8.5px] leading-[11.9px] text-[#6b7280]">{day}</small>
            <b className="text-[13px] leading-[18.2px] font-bold">{date}</b>
          </div>
        ))}
        {EVENTS.map((event) => (
          <span
            key={event.name}
            className={cn(
              "truncate rounded px-1.5 py-[5px] text-[9.5px] leading-[13.3px] font-semibold",
              event.place,
              event.tone,
            )}
          >
            {event.name}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <small className="text-[10.5px] leading-[14.7px] font-medium whitespace-nowrap">
          Email frequency
        </small>
        <span className="flex flex-1 items-center justify-between gap-1.5 rounded-md bg-[#f9fafb] px-2 py-[5px] text-[10.5px] leading-[14.7px] shadow-[inset_0_0_0_1px_#d1d5db]">
          Periodically
          <BxIcon name="down" size={12} />
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-[5px]">
        {NOTIFY.map(([label, on]) => (
          <span
            key={label}
            className="flex items-center gap-1.5 rounded-md px-[7px] py-[5px] text-[10px] leading-[14px] shadow-[inset_0_0_0_1px_#e5e7eb]"
          >
            <i
              className={cn(
                "grid size-[11px] shrink-0 place-items-center rounded-[3px] text-white",
                on ? "bg-[#2556c5]" : "shadow-[inset_0_0_0_1px_#9ca3af]",
              )}
            >
              {on && (
                <svg viewBox="0 0 12 12" width={9} height={9} aria-hidden="true">
                  <path
                    d="M2.5 6.2 5 8.5l4.5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </i>
            {label}
          </span>
        ))}
      </div>
    </MockBox>
  );
}

const OTP = "829062";
const OTP_START_MS = 400;
const OTP_STEP_MS = 260;

/** Bảo mật tài khoản: thêm ứng dụng xác thực, quét QR rồi nhập mã (Figma: Visual / Bảo mật). */
function TwoFactorArt() {
  const [ref, inView] = useArtInView();
  // null: chưa cuộn tới (có JS thì ô mã còn trống); số: số chữ số đã điền.
  const [filled, setFilled] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    // Giảm chuyển động: điền đủ mã ngay; không thì xoá trống rồi điền từng chữ số.
    const steps: [number, number][] = window.matchMedia(REDUCED_MOTION).matches
      ? [[0, OTP.length]]
      : [
          [0, 0],
          ...OTP.split("").map((_, index): [number, number] => [
            OTP_START_MS + index * OTP_STEP_MS,
            index + 1,
          ]),
        ];
    const timers = steps.map(([delay, count]) => window.setTimeout(() => setFilled(count), delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView]);

  return (
    <div ref={ref} className="flex w-full justify-center">
      <MockBox>
        <b className="mb-1.5 block text-center text-[13px] leading-[18.2px] font-bold">
          Add authenticator app
        </b>
        <small className="mt-1.5 mb-1 block text-[10px] leading-[14px] font-semibold">
          Step 1: Scan this QR code
        </small>
        <div className="mx-auto size-[92px] rounded-[7px] p-1.5 shadow-[inset_0_0_0_1px_#e5e7eb]">
          <Image src="/images/balheh/qr-2fa.svg" alt="" width={80} height={80} />
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10px] leading-[14px] tracking-[0.04em]">
          <span>GEQGHLJGGUUMS3EF</span>
          <em className="inline-flex items-center gap-[3px] rounded-[5px] px-[7px] py-[3px] tracking-normal not-italic shadow-[inset_0_0_0_1px_#d1d5db]">
            <BxIcon name="doc" size={11} />
            Copy
          </em>
        </div>
        <small className="mt-1.5 mb-1 block text-[10px] leading-[14px] font-semibold">
          Step 2: Enter the one-time code
        </small>
        <div className="grid grid-cols-6 gap-[5px]">
          {OTP.split("").map((digit, index) => {
            const shown = filled === null || index < filled;
            const current = filled !== null && index === filled && filled < OTP.length;
            return (
              <i
                key={index}
                className={cn(
                  "grid h-[30px] place-items-center rounded-md text-[13px] font-medium not-italic transition-shadow duration-200",
                  current
                    ? "shadow-[inset_0_0_0_2px_#2556c5,0_0_0_3px_rgba(37,86,197,0.15)]"
                    : shown
                      ? "shadow-[inset_0_0_0_1px_#6b7280]"
                      : "shadow-[inset_0_0_0_1px_#d1d5db]",
                  filled === null &&
                    "in-[.js]:text-transparent in-[.js]:shadow-[inset_0_0_0_1px_#d1d5db]",
                )}
              >
                {shown ? digit : ""}
              </i>
            );
          })}
        </div>
        <div className="mt-2.5 flex justify-center gap-2 text-[11px] leading-[15.4px]">
          <span className="rounded-md px-3.5 py-1.5 shadow-[inset_0_0_0_1px_#d1d5db]">Cancel</span>
          <b className="rounded-md bg-[#2556c5] px-3.5 py-1.5 font-bold text-white">Confirm</b>
        </div>
      </MockBox>
    </div>
  );
}
