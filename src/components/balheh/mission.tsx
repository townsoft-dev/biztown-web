"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";

import { Reveal } from "@/components/home/reveal";
import type { BalhehMissionContent, CardStatus, ScatteredTool } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { BxIcon, Status } from "./app/app-ui";
import { bxInter } from "./app/app-ui";
import { BalhehSection, BalhehSectionHead } from "./parts";

/** Khung so sánh dựng ở khổ gốc 773 × 480 như Figma rồi thu nhỏ theo bề ngang cột. */
const STAGE_W = 773;
const STAGE_H = 480;
/** Thu nhỏ tối đa tới mức này; hẹp hơn nữa thì khung rộng ra (nội dung vẫn căn giữa). */
const MIN_SCALE = 0.6;

/** Lượt kéo tự động khi khung hiện ra (file mẫu: sweepBA) — [mốc ms, vị trí %]. */
const SWEEP: [number, number][] = [
  [0, 50],
  [700, 82],
  [1500, 18],
  [2300, 50],
];
const SWEEP_DELAY = 250;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const TOOL_DOTS = ["#8fb7e8", "#b9a7ef", "#c9c2b0"];

/**
 * "Tại sao Balheh ra đời?" (Figma: Section · Sứ mệnh): ba thẻ sứ mệnh / tầm nhìn / mục tiêu bên
 * trái, khung so sánh trước–sau bên phải. Kéo vạch giữa (hoặc dùng phím mũi tên) để xem công cụ
 * rời rạc ngày trước và dashboard Balheh; lần đầu cuộn tới, vạch tự quét qua lại một lượt.
 */
export function BalhehMission({ content }: { content: BalhehMissionContent }) {
  return (
    <BalhehSection id="mission">
      <BalhehSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      <div className="mt-10 grid items-center gap-14 max-lg:gap-7 lg:grid-cols-[minmax(0,560fr)_minmax(0,773fr)]">
        <Reveal className="flex flex-col gap-3.5">
          <MissionCard icon={<BxIcon name="users" size={22} />} label={content.mission.label}>
            <p className="text-[17px] leading-[26.35px] text-pretty text-ink">
              {content.mission.text}
            </p>
          </MissionCard>
          <MissionCard icon={<GlobeIcon />} label={content.vision.label}>
            <p className="text-[17px] leading-[26.35px] text-pretty text-ink">
              {content.vision.text}
            </p>
          </MissionCard>
          <MissionCard icon={<BxIcon name="check" size={22} />} label={content.goals.label}>
            <ul className="flex flex-col gap-2">
              {content.goals.items.map((goal) => (
                <li key={goal} className="flex items-center gap-2.5">
                  <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                    <TickIcon />
                  </span>
                  <span className="text-[16px] leading-[23.2px] text-ink">{goal}</span>
                </li>
              ))}
            </ul>
          </MissionCard>
        </Reveal>

        <Reveal>
          <Compare content={content.compare} />
        </Reveal>
      </div>
    </BalhehSection>
  );
}

function MissionCard({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <article className="flex items-start gap-4 rounded-[24px] border border-line bg-card px-6 py-[22px] shadow-[0_1px_2px_var(--shadow-soft)] max-sm:px-5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-accent-tint text-accent-text">
        {icon}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="text-[13px] leading-[18px] font-semibold tracking-[0.06em] text-accent-text uppercase">
          {label}
        </h3>
        {children}
      </div>
    </article>
  );
}

/** Icon quả địa cầu (Figma: icon/globe) — BxIcon chưa có nét này. */
function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 22 22"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="block shrink-0"
    >
      <circle cx="11" cy="11" r="9.1667" />
      <path d="M1.8333 11h18.3334M7.3333 11c.0708 3.399 1.3739 6.6565 3.6667 9.1667 2.2928-2.5102 3.5959-5.7677 3.6667-9.1667-.0708-3.399-1.3739-6.6565-3.6667-9.1667C8.7072 4.3435 7.4041 7.601 7.3333 11z" />
    </svg>
  );
}

/** Dấu tích trong chấm cam của danh sách mục tiêu (Figma: Check · icon/check 11.33 × 11). */
function TickIcon() {
  return (
    <svg
      viewBox="0 0 11.3333 11"
      width={11.3333}
      height={11}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.375}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="block"
    >
      <path d="M9.3333 3 4.2917 8.0417 2 5.75" />
    </svg>
  );
}

/** Vị trí vạch (%) tại thời điểm `elapsed` của lượt quét tự động — nội suy ease-in-out. */
function sweepAt(elapsed: number) {
  for (let index = 1; index < SWEEP.length; index++) {
    const [t1, v1] = SWEEP[index];
    if (elapsed > t1) continue;
    const [t0, v0] = SWEEP[index - 1];
    const p = Math.max(0, (elapsed - t0) / (t1 - t0));
    const eased = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    return v0 + (v1 - v0) * eased;
  }
  return SWEEP[SWEEP.length - 1][1];
}

/**
 * Khung so sánh trước–sau (Figma: Visual / Before–After). Thanh kéo là <input type="range">
 * trong suốt phủ cả khung: chuột, chạm và bàn phím đều dùng được, trình đọc màn hình đọc được.
 */
function Compare({ content }: { content: BalhehMissionContent["compare"] }) {
  const [value, setValue] = useState(50);
  const [box, setBox] = useState({ width: STAGE_W, scale: 1 });
  const boxRef = useRef<HTMLDivElement>(null);
  // Người dùng đã tự kéo thì dừng lượt quét tự động.
  const touchedRef = useRef(false);

  useLayoutEffect(() => {
    const node = boxRef.current;
    if (!node) return;
    const update = () => {
      const width = node.clientWidth;
      setBox({ width, scale: Math.min(1, Math.max(MIN_SCALE, width / STAGE_W)) });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = boxRef.current;
    if (!node || window.matchMedia(REDUCED_MOTION).matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now() + SWEEP_DELAY;
        const end = SWEEP[SWEEP.length - 1][0];
        const step = (now: number) => {
          if (touchedRef.current) return;
          const elapsed = now - start;
          setValue(sweepAt(elapsed));
          if (elapsed < end) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  function stopSweep() {
    touchedRef.current = true;
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    stopSweep();
    setValue(Number(event.target.value));
  }

  const { width, scale } = box;
  const rounded = Math.round(value);

  return (
    <div className="flex flex-col items-center gap-3.5">
      <div
        ref={boxRef}
        className="relative w-full overflow-hidden rounded-[32px] shadow-[0_30px_60px_rgba(166,95,0,0.14)] select-none max-sm:rounded-[24px]"
        style={{ height: STAGE_H * scale }}
      >
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: width / scale, height: STAGE_H, transform: `scale(${scale})` }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-[#eef2fb]">
            <span className="absolute top-6 right-6 rounded-full bg-[#2556c5] px-3.5 py-2 text-[13px] leading-[20.8px] font-semibold text-white">
              {content.after}
            </span>
            <AfterDash />
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center bg-[#efe8da]"
            style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
          >
            <span className="absolute top-6 left-6 z-[2] rounded-full bg-[rgba(35,48,94,0.08)] px-3.5 py-2 text-[13px] leading-[20.8px] font-semibold text-[#23305e]">
              {content.before}
            </span>
            <Mess tools={content.tools} sticky={content.sticky} />
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={rounded}
          onChange={onChange}
          onPointerDown={stopSweep}
          onKeyDown={stopSweep}
          aria-label={content.hint}
          aria-valuetext={`${content.before} ${rounded}% · ${content.after} ${100 - rounded}%`}
          className="peer absolute inset-0 m-0 size-full cursor-ew-resize opacity-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-px bg-white peer-focus-visible:[&>span]:outline-2 peer-focus-visible:[&>span]:outline-offset-2 peer-focus-visible:[&>span]:outline-accent"
          style={{ left: `${value}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-12 -translate-1/2 items-center justify-center rounded-full bg-white text-[16px] font-bold text-[#23305e] shadow-[0_12px_32px_rgba(35,48,94,0.14)]">
            ⇆
          </span>
        </div>
      </div>
      <p className="text-center text-[14px] leading-[22.4px] text-ink-muted">{content.hint}</p>
    </div>
  );
}

/** Bên "Trước đây": ba cửa sổ công cụ nằm lệch nhau và một tờ giấy nhớ (file mẫu: .mess). */
function Mess({ tools, sticky }: { tools: ScatteredTool[]; sticky: string }) {
  const place = [
    "top-1.5 left-0 -rotate-4",
    "top-[62px] right-0 rotate-3",
    "bottom-0 left-[46px] rotate-[-1.5deg]",
  ];
  return (
    <div className="relative h-[340px] w-[440px] text-[#3d3528]">
      {tools.map((tool, index) => (
        <div
          key={tool.name}
          className={cn(
            "absolute w-[250px] rounded-xl bg-[#fffdf8] px-3.5 py-3 shadow-[0_8px_20px_rgba(60,40,10,0.14)]",
            place[index],
          )}
        >
          <div className="mb-2 flex items-center gap-2 text-[13px] leading-[20.8px] font-semibold">
            <i className="size-2.5 rounded-[3px]" style={{ background: TOOL_DOTS[index] }} />
            {tool.name}
          </div>
          {tool.rows.map((row) => (
            <div
              key={row}
              className="mt-[5px] rounded-md bg-[#f3ecdf] px-2 py-[5px] text-[12px] leading-[19.2px]"
            >
              {row}
            </div>
          ))}
        </div>
      ))}
      <div className="absolute right-3 bottom-7 w-[150px] rotate-5 bg-[#ffe9a8] px-3 py-2.5 text-[12.5px] leading-[18.125px] text-[#5a4410] shadow-[0_6px_14px_rgba(60,40,10,0.18)]">
        {sticky}
      </div>
    </div>
  );
}

/** Bảng trong dự án Brandsite (Figma: bx-bcard): ảnh bìa, tên, % hoàn thành, trạng thái. */
const BOARDS: { name: string; done: number; status: CardStatus; cover: string }[] = [
  {
    name: "Front-end Board",
    done: 80,
    status: "Active",
    cover: "linear-gradient(180deg,#b9cfe6 0%,#e7ecf1 45%,#3d5c4a 46%,#1f3a2c 100%)",
  },
  {
    name: "Back-end Board",
    done: 100,
    status: "Completed",
    cover: "linear-gradient(180deg,#f1a27e 0%,#c86b7d 40%,#3e2f48 70%,#18222e 100%)",
  },
  {
    name: "Mobile Board",
    done: 30,
    status: "Active",
    cover: "linear-gradient(180deg,#9fc4e8 0%,#dfe9f0 40%,#58704f 60%,#2f4636 100%)",
  },
];

const STATS: { label: string; value: string; note: string; tone: string }[] = [
  { label: "My open tasks", value: "14", note: "4 overdue", tone: "text-[#dc2626]" },
  { label: "Due today", value: "2", note: "1 in progress", tone: "text-[#16a34a]" },
  { label: "Today complete count", value: "5", note: "2 in time", tone: "text-[#16a34a]" },
];

/** Bên "Với Balheh": khối dự án + ô số liệu của dashboard Balheh (file mẫu: afterSide). */
function AfterDash() {
  return (
    <div className={cn(bxInter.className, "grid w-[560px] gap-2.5 text-[#1d1f24]")}>
      <div className="rounded-[7px] bg-white px-2.5 pt-2 pb-2.5 shadow-[0_18px_40px_rgba(35,48,94,0.14),inset_0_0_0_1px_#e5e7eb]">
        <div className="mb-1.5 flex items-center gap-1.5 text-[#2556c5]">
          <BxIcon name="down" size={13} />
          <BxIcon name="doc" size={13} />
          <b className="text-[13.5px] leading-[18.9px]">Brandsite</b>
          <BxIcon name="star" size={13} className="text-[#f5a524]" />
          {["Chat ↗", "Wiki ↗"].map((chip) => (
            <span
              key={chip}
              className="rounded-[3px] bg-[#f1f2f4] px-1.5 py-px text-[9.5px] leading-[13.3px] text-[#6b7280]"
            >
              {chip}
            </span>
          ))}
          <span className="rounded-[3px] bg-[#fdeeb5] px-1.5 py-px text-[9.5px] leading-[13.3px] font-bold text-[#b8860b]">
            98%
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {BOARDS.map((board) => {
            const full = board.done >= 100;
            return (
              <div
                key={board.name}
                className="overflow-hidden rounded-[7px] border border-[#e5e7eb] bg-white"
              >
                <div className="h-[52px]" style={{ backgroundImage: board.cover }} />
                <div className="px-2 pt-[7px] pb-2">
                  <b className="block text-[11.5px] leading-[16.1px]">{board.name}</b>
                  <div className="mt-1 flex items-end justify-between gap-1.5">
                    <div className="min-w-0 flex-1">
                      <small
                        className={cn(
                          "block text-[9px] leading-[12.6px]",
                          full ? "text-[#1f7a3f]" : "text-[#d49b00]",
                        )}
                      >
                        Task complete {board.done}%
                      </small>
                      <div className="h-1 overflow-hidden rounded-sm bg-[#e5e7eb]">
                        <i
                          className={cn(
                            "block h-full rounded-sm",
                            full ? "bg-[#1f7a3f]" : "bg-[#f5b301]",
                          )}
                          style={{ width: `${board.done}%` }}
                        />
                      </div>
                    </div>
                    <Status status={board.status} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[7px] rounded-lg bg-white p-2 shadow-[0_18px_40px_rgba(35,48,94,0.10)]">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1.5 rounded-md border border-[#c7cbd3] px-2 py-[9px] shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
          >
            <small className="text-[9.5px] leading-[13.3px] text-[#30343c]">{stat.label}</small>
            <b className="text-[20px] leading-[28px]">{stat.value}</b>
            <small className={cn("text-[9px] leading-[12.6px]", stat.tone)}>{stat.note}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
