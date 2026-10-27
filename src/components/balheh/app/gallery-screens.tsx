"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import type { Avatar, BalhehAppCopy, BalhehMoreContent } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { AppWindow, Av, BxHead, BxIcon, type SideView } from "./app-ui";

/*
 * Các màn hình trong thư viện "Khám phá thêm" (Figma: Explore more / Gallery, file mẫu: gAna,
 * gNoti, gAct, gSet, gLinks). Cửa sổ ở khổ 956 × 541 như Figma; section tự thu nhỏ khi màn hẹp.
 * Mỗi màn có một đoạn chuyển động ngắn chạy lại mỗi lần tab được mở.
 */

export const GALLERY_W = 956;
export const GALLERY_H = 541;

/**
 * Cách chạy chuyển động của màn: "wait" = chưa cuộn tới (đứng ở bước đầu), "play" = chạy theo
 * mốc thời gian, "static" = giảm chuyển động (hiện luôn trạng thái cuối).
 */
export type ShotMode = "wait" | "play" | "static";

export type ShotProps = {
  app: BalhehAppCopy;
  shots: BalhehMoreContent["shots"];
  mode: ShotMode;
};

/** Số mốc đã qua (0…times.length). Màn được dựng lại khi đổi tab nên đếm lại từ 0. */
function useSteps(times: readonly number[], mode: ShotMode) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (mode !== "play") return;
    const timers = times.map((ms, index) => setTimeout(() => setStep(index + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [mode, times]);
  return mode === "static" ? times.length : step;
}

/** Nét icon kiểu Lucide chưa có trong BxIcon (file mẫu: AI.*). */
const G_ICONS = {
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  calx: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M10 14l4 4M14 14l-4 4"/>',
  ok: '<path d="M20 6L9 17l-5-5"/>',
  dl: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  alert:
    '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  ext: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>',
  img: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  pdf: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  bold: '<path d="M6 4h8a4 4 0 0 1 0 8H6zM6 12h9a4 4 0 0 1 0 8H6z"/>',
  ital: '<path d="M19 4h-9M14 20H5M15 4L9 20"/>',
  und: '<path d="M6 3v7a6 6 0 0 0 12 0V3M4 21h16"/>',
  str: '<path d="M17 9V5H7v4M4 12h16M9 19h6"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
  at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.9 7.9"/>',
} as const;

type GIconName = keyof typeof G_ICONS;

function GIcon({
  name,
  size = 14,
  className,
}: {
  name: GIconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("block shrink-0", className)}
      dangerouslySetInnerHTML={{ __html: G_ICONS[name] }}
    />
  );
}

/**
 * Các màn Phân tích, Thông báo, Nhật ký không ứng với mục nào trong menu dự án: thanh bên đầy đủ
 * không sáng mục nào (như Figma).
 */
const NO_MENU_ITEM: SideView = "none";

/** Khung cửa sổ 956 × 541 của thư viện (Figma: gal-shot · bx, vùng thân cao 500). */
function GalleryWindow({
  view = NO_MENU_ITEM,
  hover = null,
  children,
}: {
  view?: Parameters<typeof AppWindow>[0]["view"];
  hover?: string | null;
  children: ReactNode;
}) {
  return (
    <AppWindow
      view={view}
      hover={hover}
      className="w-[956px] shadow-[0_0_0_1px_rgba(35,48,94,0.08),0_40px_80px_rgba(16,90,190,0.18)] [&>div:last-child]:h-[500px]"
    >
      {children}
    </AppWindow>
  );
}

/** Thanh tiêu đề không có "/ trang con" (màn Analysis, Thông báo, Nhật ký). */
function PlainHead({ title, bell }: { title?: string; bell?: boolean }) {
  return (
    <div className="flex h-[49px] shrink-0 items-center justify-between gap-3 border-b border-[#e5e7eb] px-4">
      <h5 className="text-[17px] font-bold tracking-[-0.01em] text-[#1d1f24]">{title}</h5>
      <div className="flex shrink-0 items-center gap-2.5 text-[#2556c5]">
        <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#2556c5] px-2.5 py-1.5 text-[11.5px] font-semibold text-white">
          <BxIcon name="plus" size={13} />
          Create
        </span>
        <span className={cn("relative inline-flex rounded-[5px]", bell && "bg-[#e8eefc] p-[3px]")}>
          <BxIcon name="bell" size={17} />
          <span className="absolute -top-px -right-px size-1.5 rounded-full bg-[#f87171]" />
        </span>
        <BxIcon name="gear" size={17} />
        <span className="grid size-[17px] place-items-center rounded-full bg-[#2556c5] text-[11px] font-bold text-white">
          ?
        </span>
        <Av tone="orange" text="HU" size={28} />
      </div>
    </div>
  );
}

/** Ô vuông chọn (file mẫu: .cbx). */
function Cbx({ on, hover, muted }: { on?: boolean; hover?: boolean; muted?: boolean }) {
  return (
    <i
      className={cn(
        "relative inline-block size-[11px] shrink-0 rounded-[3px] bg-white not-italic transition-all duration-200",
        muted ? "shadow-[inset_0_0_0_1px_#c7cbd3]" : "shadow-[inset_0_0_0_1.2px_#2556c5]",
        hover && "shadow-[inset_0_0_0_1.2px_#2556c5,0_0_0_3px_rgba(37,86,197,0.18)]",
        on &&
          "bg-[#2556c5] shadow-none after:absolute after:top-[2px] after:left-[3px] after:h-[2.5px] after:w-1 after:-rotate-45 after:border-b-[1.5px] after:border-l-[1.5px] after:border-white",
      )}
    />
  );
}

/* ------------------------------------------------------------------ Phân tích */

const ANA_STEPS = [60] as const;

const KPI: { icon: GIconName | "users"; label: string; value: string; tone: string }[] = [
  {
    icon: "folder",
    label: "TOTAL PROJECTS",
    value: "5 projects",
    tone: "bg-[#e8eefc] text-[#4f6bd8]",
  },
  {
    icon: "users",
    label: "TOTAL MEMBERS",
    value: "25 members",
    tone: "bg-[#e8eefc] text-[#4f6bd8]",
  },
  { icon: "ok", label: "COMPLETION", value: "78%", tone: "bg-[#e3f6ec] text-[#1f9d55]" },
  { icon: "calx", label: "OVERDUE", value: "8 tasks", tone: "bg-[#fde7e7] text-[#dc2626]" },
];

const HEALTH = [
  { label: "Active", pct: 20, color: "#f5b81c" },
  { label: "Completed", pct: 65, color: "#34c97e" },
  { label: "Pending", pct: 15, color: "#7c8cf8" },
  { label: "Cancel", pct: 15, color: "#f0435f" },
];
const PIE_R = 38;
const PIE_C = 2 * Math.PI * PIE_R;
const PIE_TOTAL = HEALTH.reduce((sum, seg) => sum + seg.pct, 0);
/** Độ dài và điểm bắt đầu của từng cung trên vòng tròn. */
const PIE_SEGS = HEALTH.map((seg, index) => ({
  ...seg,
  len: (PIE_C * seg.pct) / PIE_TOTAL,
  start: (PIE_C * HEALTH.slice(0, index).reduce((sum, s) => sum + s.pct, 0)) / PIE_TOTAL,
}));

const TREND = [
  { values: [52, 72, 72, 66, 70], color: "#3b82f6" },
  { values: [22, 54, 60, 60, 60], color: "#22c55e" },
  { values: [8, 10, 2, 2, 4], color: "#f97316" },
];
const TREND_X = ["Jun 1-7", "Jun 8-14", "Jun 15-21", "Jun 22-28", "Jun 29-Jul 5"];
const trendPoints = (values: number[]) =>
  values.map((v, i) => `${24 + i * 72},${118 - v * 1.3}`).join(" ");

const PRIORITY = [
  { label: "Critical", pct: 40, color: "#e0361c" },
  { label: "High", pct: 60, color: "#ff7a50" },
  { label: "Medium", pct: 80, color: "#ffad0a" },
  { label: "Low", pct: 60, color: "#4a9dfc" },
];

const MEMBERS: {
  name: string;
  role: string;
  tasks: string;
  pct: number;
  bar: string;
  diff: [number, number, number];
  overdue: number;
  tone: Avatar;
  initials: string;
}[] = [
  {
    name: "Nguyen Thuy Huong",
    role: "Front-end Developer",
    tasks: "38/53",
    pct: 72,
    bar: "#2f5d1e",
    diff: [30, 15, 8],
    overdue: 2,
    tone: "orange",
    initials: "HU",
  },
  {
    name: "Nguyen Ngoc Tot",
    role: "Front-end Developer",
    tasks: "22/24",
    pct: 30,
    bar: "#f5b301",
    diff: [8, 4, 12],
    overdue: 0,
    tone: "blue",
    initials: "TO",
  },
  {
    name: "Nguyen Duy Ha",
    role: "Front-end Developer",
    tasks: "31/37",
    pct: 23,
    bar: "#f5b301",
    diff: [23, 8, 6],
    overdue: 5,
    tone: "purple",
    initials: "HA",
  },
  {
    name: "Nguyen Huu Nam",
    role: "Backend Developer",
    tasks: "14/22",
    pct: 0,
    bar: "#f5b301",
    diff: [8, 4, 12],
    overdue: 3,
    tone: "green",
    initials: "NA",
  },
];

const PM_COLS = "grid grid-cols-[170px_79px_113px_181px_56px_1fr] items-center gap-2 px-2";

function AnaCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative min-w-0 rounded-lg bg-white px-2.5 py-2 shadow-[inset_0_0_0_1px_#e5e7eb]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Màn Analysis (Figma: gal-shot · Analysis): KPI, sức khoẻ dự án, xu hướng, ưu tiên, hiệu suất. */
export function AnalysisShot({ mode }: ShotProps) {
  const on = useSteps(ANA_STEPS, mode) >= 1;

  return (
    <GalleryWindow>
      <PlainHead title="Analysis" />
      <div className="grid flex-1 content-start gap-2 overflow-hidden bg-[#f4f5f8] px-3 py-2.5">
        <div className="grid grid-cols-4 gap-2">
          {KPI.map((kpi) => (
            <div
              key={kpi.label}
              className="flex h-[52px] items-center gap-2.5 rounded-lg bg-white px-[11px] shadow-[inset_0_0_0_1px_#e5e7eb]"
            >
              <i
                className={cn(
                  "grid size-[30px] shrink-0 place-items-center rounded-full",
                  kpi.tone,
                )}
              >
                {kpi.icon === "users" ? (
                  <BxIcon name="users" size={16} />
                ) : (
                  <GIcon name={kpi.icon} size={16} />
                )}
              </i>
              <span>
                <small className="block text-[9px] tracking-[0.3px] text-[#4b5563]">
                  {kpi.label}
                </small>
                <b className="text-[14px] font-semibold">{kpi.value}</b>
              </span>
            </div>
          ))}
        </div>

        <div className="grid h-[173px] grid-cols-3 gap-2">
          <AnaCard>
            <b className="block text-[11px]">Project Health Overview</b>
            <small className="block text-[9px] text-[#4b5563]">
              See the status distribution of all projects.
            </small>
            <div className="mt-2.5 flex items-center gap-2.5">
              <svg viewBox="0 0 100 100" className="size-24 shrink-0" aria-hidden="true">
                {PIE_SEGS.map((seg, index) => (
                  <circle
                    key={seg.label}
                    cx="50"
                    cy="50"
                    r={PIE_R}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="22"
                    strokeDasharray={`${on ? seg.len : 0} ${PIE_C}`}
                    strokeDashoffset={-seg.start}
                    transform="rotate(-90 50 50)"
                    className="transition-[stroke-dasharray] duration-[800ms] ease-[cubic-bezier(0.3,0.7,0.2,1)]"
                    style={{ transitionDelay: `${index * 180}ms` }}
                  />
                ))}
                <circle cx="50" cy="50" r="22" fill="#fff" />
                <text
                  x="50"
                  y="48"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="#1d1f24"
                >
                  5
                </text>
                <text x="50" y="59" textAnchor="middle" fontSize="7" fill="#4b5563">
                  projects
                </text>
              </svg>
              <ul className="grid gap-[5px] text-[9.5px] font-semibold">
                {HEALTH.map((seg) => (
                  <li key={seg.label} className="flex items-center gap-[5px]">
                    <i className="size-1.5 rounded-full" style={{ background: seg.color }} />
                    {seg.label}
                    <b className="ml-1 font-black">{seg.pct}%</b>
                  </li>
                ))}
              </ul>
            </div>
          </AnaCard>

          <AnaCard>
            <div className="flex items-start justify-between">
              <span>
                <b className="block text-[11px]">Tasks status trend</b>
                <small className="block text-[9px] text-[#4b5563]">12 Jul – 10 Aug · by day</small>
              </span>
              <span className="inline-flex items-center gap-1 rounded-[5px] px-1.5 py-[3px] text-[9px] shadow-[inset_0_0_0_1px_#d1d5db]">
                Last 30 days
                <BxIcon name="down" size={10} />
              </span>
            </div>
            <svg viewBox="0 0 330 135" className="mt-1 block h-auto w-full" aria-hidden="true">
              <g stroke="#eef0f4" strokeDasharray="3 3">
                {[20, 46, 72, 98, 118].map((y) => (
                  <line key={y} x1="20" x2="325" y1={y} y2={y} />
                ))}
              </g>
              {TREND.map((line, index) => (
                <polyline
                  key={line.color}
                  points={trendPoints(line.values)}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeDasharray="1400"
                  strokeDashoffset={on ? 0 : 1400}
                  className="transition-[stroke-dashoffset] duration-[1800ms] ease-[cubic-bezier(0.4,0.1,0.2,1)]"
                  style={{ transitionDelay: `${index * 250}ms` }}
                />
              ))}
              {TREND_X.map((label, index) => (
                <text
                  key={label}
                  x={24 + index * 72}
                  y="132"
                  textAnchor="middle"
                  fontSize="7"
                  fill="#6b7280"
                >
                  {label}
                </text>
              ))}
            </svg>
            <div
              className={cn(
                "absolute top-[39px] left-[136px] grid w-[94px] gap-0.5 rounded-[6px] bg-white px-[7px] py-[5px] text-[8.5px] shadow-[0_6px_16px_rgba(0,0,0,0.14)] transition-[opacity,transform] delay-[1600ms] duration-300",
                on ? "opacity-100" : "translate-y-1 opacity-0",
              )}
            >
              <small className="text-[7px]">2026.06.28</small>
              {(
                [
                  ["Created", 60, "#3b82f6"],
                  ["Completed", 52, "#22c55e"],
                  ["Overdue", 15, "#dc2626"],
                ] as const
              ).map(([label, value, color]) => (
                <span key={label} className="flex items-center gap-1">
                  <i className="size-1.5 rounded-full" style={{ background: color }} />
                  {label}
                  <b className="ml-auto">{value}</b>
                </span>
              ))}
            </div>
          </AnaCard>

          <AnaCard>
            <b className="block text-[11px]">Active Tasks by Priority</b>
            <small className="block text-[9px] text-[#4b5563]">
              View the distribution of active tasks by priority level.
            </small>
            <div className="mt-2 flex h-[110px] items-end gap-3 border-b border-l border-[#eef0f4] px-1.5 pt-1">
              {PRIORITY.map((bar, index) => (
                <div
                  key={bar.label}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-[3px]"
                >
                  <span
                    className={cn(
                      "w-[70%] origin-bottom rounded-t-[2px] transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                      on ? "scale-y-100" : "scale-y-0",
                    )}
                    style={{
                      height: `${bar.pct}%`,
                      background: bar.color,
                      transitionDelay: `${index * 120}ms`,
                    }}
                  />
                  <small className="text-[8.5px] text-[#4b5563]">{bar.label}</small>
                </div>
              ))}
            </div>
          </AnaCard>
        </div>

        <div className="rounded-lg bg-white px-2.5 py-2 shadow-[inset_0_0_0_1px_#e5e7eb]">
          <div className="mb-1.5 flex items-start justify-between">
            <div>
              <b className="block text-[11px]">Member Performance Overview</b>
              <small className="text-[9px] text-[#4b5563]">
                Compare workload, completion, and overdue tasks across all team members.
              </small>
            </div>
            <span className="inline-flex items-center gap-1 rounded-[5px] px-2 py-1 text-[9px] text-[#9ca3af] shadow-[inset_0_0_0_1px_#d1d5db]">
              <BxIcon name="search" size={11} />
              Search...
            </span>
          </div>
          <div
            className={cn(
              PM_COLS,
              "h-9 rounded-t-[6px] bg-[#f6f7f9] text-[8.5px] leading-[1.4] font-semibold text-[#4b5563]",
            )}
          >
            <span>MEMBER</span>
            <span className="w-[50px]">TASKS ASSIGNED</span>
            <span>COMPLETION</span>
            <span>
              DIFFICULTY BREAKDOWN
              <i className="flex items-center gap-[2px] font-medium not-italic">
                {(
                  [
                    ["Simple", "#bcd7f5"],
                    ["Moderate", "#4a90e2"],
                    ["Complex", "#1f4fa0"],
                  ] as const
                ).map(([label, color]) => (
                  <span key={label} className="inline-flex items-center gap-[2px] pl-1">
                    <u className="size-[5px] rounded-full" style={{ background: color }} />
                    {label}
                  </span>
                ))}
              </i>
            </span>
            <span>OVERDUE</span>
            <span>ACTION</span>
          </div>
          {MEMBERS.map((member) => (
            <div
              key={member.name}
              className={cn(PM_COLS, "h-[41px] border-t border-[#f1f2f4] text-[10px]")}
            >
              <span className="flex items-center gap-1.5">
                <Av tone={member.tone} text={member.initials} size={22} ring={false} />
                <span>
                  <b className="block">{member.name}</b>
                  <small className="text-[8.5px] text-[#6b7280]">{member.role}</small>
                </span>
              </span>
              <span>{member.tasks}</span>
              <span>
                <em
                  className="block text-[8.5px] font-semibold not-italic"
                  style={{ color: member.pct > 50 ? "#2f5d1e" : "#d49b00" }}
                >
                  {member.pct}%
                </em>
                <span className="block h-[5px] overflow-hidden rounded-[5px] bg-[#e5e7eb]">
                  <i
                    className="block h-full rounded-[5px] transition-[width] delay-300 duration-700"
                    style={{ width: on ? `${member.pct}%` : 0, background: member.bar }}
                  />
                </span>
              </span>
              <span className="flex h-[11px] overflow-hidden rounded-[2px] text-[7.5px] font-semibold">
                {member.diff.map((n, index) => (
                  <i
                    key={index}
                    className={cn(
                      "grid place-items-center not-italic",
                      index === 0 ? "bg-[#bcd7f5] text-[#1d1f24]" : "text-white",
                      index === 1 && "bg-[#4a90e2]",
                      index === 2 && "bg-[#1f4fa0]",
                    )}
                    style={{ flex: n }}
                  >
                    {n}
                  </i>
                ))}
              </span>
              <span className={cn(member.overdue && "text-[#dc2626]")}>{member.overdue}</span>
              <span className="text-[#2556c5]">View more</span>
            </div>
          ))}
        </div>
      </div>
    </GalleryWindow>
  );
}

/* ------------------------------------------------------------------ Thông báo */

const NOTI_STEPS = [900, 2300, 3200] as const;

type NotiRow = { user: string } | { text: string; time: string };

/** Bảng thông báo (Figma: notification 0130): có tin mới, rồi đánh dấu đã đọc nhóm Board. */
export function NotificationShot({ app, shots, mode }: ShotProps) {
  const step = useSteps(NOTI_STEPS, mode);
  const cards = app.board.cards;
  const groups: { type: string; proj: string; rows: NotiRow[] }[] = [
    {
      type: "Board",
      proj: `Brandsite : ${cards[2]?.title ?? ""}`,
      rows: [
        { user: "Nguyen Van A" },
        { text: "Moved to list In Progress", time: "39 minutes ago" },
        { text: "Moved to list Review", time: "39 minutes ago" },
        { user: "Tran Van B" },
        { text: "Attached image", time: "42 minutes ago" },
      ],
    },
    {
      type: "Wiki",
      proj: `Brandsite : ${app.wiki.title}`,
      rows: [
        { user: "Nguyen Van A" },
        { text: "Mentioned you in a comment", time: "39 minutes ago" },
      ],
    },
    {
      type: "Chat",
      proj: "Brandsite : #mobile board",
      rows: [
        { user: "Nguyen Van A" },
        { text: "Added you", time: "39 minutes ago" },
        { text: "Mentioned you: message", time: "39 minutes ago" },
      ],
    },
    {
      type: "Calendar",
      proj: "Brandsite : Sprint Planning #13",
      rows: [{ user: "Nguyen Van A" }, { text: "Invited you", time: "39 minutes ago" }],
    },
  ];
  const reply = shots.newReply.length > 34 ? `${shots.newReply.slice(0, 34)}…` : shots.newReply;

  return (
    <GalleryWindow>
      <PlainHead bell />
      <div className="flex-1 bg-white" />
      <div className="bh-pop absolute top-[52px] right-14 z-[4] max-h-[440px] w-[300px] overflow-hidden rounded-lg bg-white p-2.5 shadow-[0_18px_40px_rgba(0,0,0,0.18),0_0_0_1px_#e5e7eb]">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-1.5">
          <b className="text-[14px]">Notification</b>
          <span className="inline-flex items-center gap-1.5 text-[9.5px] text-[#4b5563]">
            Only show unread
            <i className="relative h-3 w-[22px] rounded-[7px] bg-[#2556c5] after:absolute after:top-0.5 after:right-0.5 after:size-2 after:rounded-full after:bg-white" />
          </span>
        </div>
        <span className="my-1.5 block text-right text-[9px] text-[#6b7280] underline">
          Mark all as read
        </span>
        <div className="grid gap-1.5">
          {groups.map((group, g) => (
            <div
              key={group.type}
              className={cn(
                "overflow-hidden rounded-[6px] bg-[#f6f7f9] transition-opacity duration-[400ms]",
                g === 0 && step >= 3 && "opacity-55",
              )}
            >
              <div className="flex items-center justify-between bg-[#e6eefb] px-2 py-[5px] text-[9.5px]">
                <b>{group.type}</b>
                <Cbx hover={g === 0 && step === 2} on={g === 0 && step >= 3} />
              </div>
              <div className="bg-[#e6eefb] px-2 py-1 text-[9.5px]">
                <b className="line-clamp-1">{group.proj}</b>
              </div>
              {group.rows.map((row, r) => (
                <NotiLine key={r} row={row}>
                  {g === 0 && r === 0 && step >= 1 && (
                    <NotiLine row={{ text: reply, time: "now" }} className="bh-pop bg-[#e8f2ff]" />
                  )}
                </NotiLine>
              ))}
              <span className="flex items-center gap-1 px-2 pt-1 pb-1.5 pl-[18px] text-[9px] text-[#2556c5] underline">
                <BxIcon name="down" size={10} />
                Show previous card activity
              </span>
            </div>
          ))}
        </div>
        <span
          className={cn(
            "absolute top-[70px] right-[-2px] rounded-[5px] bg-white px-2 py-1 text-[9px] shadow-[0_6px_16px_rgba(0,0,0,0.16)] transition-opacity duration-200",
            step === 2 ? "opacity-100" : "opacity-0",
          )}
        >
          Mark as read
        </span>
      </div>
    </GalleryWindow>
  );
}

function NotiLine({
  row,
  className,
  children,
}: {
  row: NotiRow;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <>
      {"user" in row ? (
        <div className={cn("flex items-center gap-[5px] px-2 py-1 text-[9.5px]", className)}>
          <span className="grid size-[13px] place-items-center rounded-full text-[#2556c5] shadow-[inset_0_0_0_1px_#2556c5]">
            <BxIcon name="users" size={8} />
          </span>
          <b>{row.user}</b>
        </div>
      ) : (
        <div
          className={cn(
            "flex justify-between gap-2 py-[3px] pr-2 pl-[26px] text-[9.5px]",
            className,
          )}
        >
          <span className="truncate">{row.text}</span>
          <small className="text-[9px] whitespace-nowrap text-[#9ca3af]">{row.time}</small>
        </div>
      )}
      {children}
    </>
  );
}

/* ------------------------------------------------------------------ Nhật ký */

const ACT_STEPS = [1700, 2600, 3100] as const;
const ACT_FILTER = "Nguyễn";
const ACT_COLS = "grid grid-cols-[14px_1.2fr_0.6fr_0.6fr_2.2fr_1.2fr] items-center gap-2 px-1.5";

/** Hộp nhật ký hoạt động (Figma: activity 0140): chọn một dòng, gõ tìm "Nguyễn", lọc dòng. */
export function ActivityShot({ app, mode }: ShotProps) {
  const step = useSteps(ACT_STEPS, mode);
  const cards = app.board.cards;
  const rows: [string, string, string, string, string, string][] = [
    [
      "Nguyễn Văn A",
      "Board",
      "PJT001",
      "Moved ",
      cards[2]?.title ?? "",
      " from In Progress to Complete",
    ],
    ["Nguyễn Văn A", "Chat", "PJT001", "Pinned a message in ", "#mobile board", ""],
    ["Nguyễn Văn A", "Board", "PJT003", "Added Debug to ", cards[0]?.title ?? "", ""],
    ["Trần Văn B", "Board", "PJT001", "Completed ", cards[4]?.title ?? "", ""],
    ["Nguyễn Văn A", "Chat", "PJT003", "Mentioned you in ", app.chat.thread, ""],
    ["Lê Thị C", "Wiki", "PJT002", "Edited ", app.wiki.title, ""],
    ["Nguyễn Văn A", "Wiki", "PJT002", "Create ", app.wiki.tabs[1], ""],
  ];

  return (
    <GalleryWindow>
      <PlainHead />
      <div className="grid flex-1 place-items-center bg-[#f6f7f9] p-4">
        <div className="bh-pop relative w-full rounded-lg bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.12),0_0_0_1px_#e5e7eb]">
          <span className="absolute top-3 right-3 text-[#6b7280]">
            <BxIcon name="x" size={13} />
          </span>
          <b className="mb-2 block text-center text-[15px]">Activity</b>
          <div className="rounded-lg p-2 shadow-[inset_0_0_0_1px_#e5e7eb]">
            <div className="mb-1.5 flex items-center gap-2 text-[9.5px]">
              <span
                className={cn(
                  "inline-flex w-[180px] items-center gap-[5px] rounded-[6px] px-2 py-[5px]",
                  step >= 2
                    ? "text-[#1d1f24] shadow-[inset_0_0_0_1.5px_#2556c5]"
                    : "text-[#9ca3af] shadow-[inset_0_0_0_1px_#d1d5db]",
                )}
              >
                <BxIcon name="search" size={11} />
                {step >= 2 ? <b className="bh-caret">{ACT_FILTER}</b> : "Search by name or email"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-[6px] px-[9px] py-[5px] shadow-[inset_0_0_0_1px_#d1d5db]">
                <BxIcon name="filter" size={11} />
                Filters
              </span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-[6px] px-[9px] py-[5px] shadow-[inset_0_0_0_1px_#d1d5db]">
                <GIcon name="dl" size={11} />
                Download CSV
              </span>
            </div>
            <div
              className={cn(
                ACT_COLS,
                "bg-[#f6f7f9] py-[5px] text-[9.5px] font-semibold text-[#4b5563]",
              )}
            >
              <Cbx muted />
              <span>Users ⇅</span>
              <span>Type ⇅</span>
              <span>Project ⇅</span>
              <span>Activity</span>
              <span>Last updated ⇅</span>
            </div>
            {rows.map(([user, type, project, before, target, after], index) => (
              <div
                key={index}
                className={cn(
                  ACT_COLS,
                  "bh-pop border-t border-[#f1f2f4] py-[5px] text-[9.5px] transition-[opacity,background-color] duration-[400ms]",
                  step >= 1 && index === 4 && "bg-[#e5e7eb]",
                  step >= 3 && !user.includes(ACT_FILTER) && "opacity-25",
                )}
                style={{ animationDelay: `${index * 90}ms` } as CSSProperties}
              >
                <Cbx muted={!(step >= 1 && index === 4)} on={step >= 1 && index === 4} />
                <span className="flex items-center gap-[5px] whitespace-nowrap">
                  <em className="grid size-[18px] shrink-0 place-items-center rounded-full bg-[#eef0f4] text-[7.5px] font-bold not-italic">
                    CN
                  </em>
                  {user}
                </span>
                <span>{type}</span>
                <span>{project}</span>
                <span className="truncate">
                  {before}
                  <u className="text-[#2556c5]">{target}</u>
                  {after}
                </span>
                <span className="whitespace-nowrap">2026-10-10 15:15:00</span>
              </div>
            ))}
            <div className="mt-1.5 flex items-center justify-between text-[9.5px]">
              <span className="inline-flex items-center gap-1.5 rounded-[5px] px-2 py-1 shadow-[inset_0_0_0_1px_#d1d5db]">
                10 per pages
                <BxIcon name="down" size={10} />
              </span>
              <span>
                ‹ Previous
                <b className="mx-1 rounded px-[7px] py-0.5 shadow-[inset_0_0_0_1px_#d1d5db]">1</b>2
                3 4 … 10 Next ›
              </span>
            </div>
          </div>
        </div>
      </div>
    </GalleryWindow>
  );
}

/* ------------------------------------------------------------------ Cài đặt dự án */

const SET_STEPS = [1200, 2500, 3800, 5000] as const;
const VIS_ORDER = [0, 1, 2, 1];
const VISIBILITY = [
  [
    "Private",
    "Only the project owner and people invited to this project specifically can view and edit.",
  ],
  [
    "Collaborative",
    "The owner, plus organization users who were given access to this project, can view and edit.",
  ],
  ["Public", "Anyone with the link can view. Only people shared on this project can edit."],
] as const;
const ROLES = [
  ["Project Owners", 2],
  ["Admins", 1],
  ["Members", 6],
  ["Guests", 12],
] as const;

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mt-1 mb-[3px] block text-[9.5px] font-semibold">
        {label}
        {required && <i className="text-[#dc2626] not-italic">*</i>}
      </label>
      {children}
    </div>
  );
}

function Input({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-[6px] px-2 py-[5px] text-[9.5px] shadow-[inset_0_0_0_1px_#c7cbd3]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Cài đặt dự án (Figma: PROJECT 3719:23855): đổi chế độ hiển thị rồi rê lên "Save changes". */
export function SettingsShot({ shots, mode }: ShotProps) {
  const step = useSteps(SET_STEPS, mode);
  const visible = VIS_ORDER[Math.min(step, VIS_ORDER.length - 1)];

  return (
    <GalleryWindow hover="set">
      <BxHead title="Brandsite" sub="Settings" />
      <div className="grid flex-1 content-start gap-2 overflow-hidden bg-[#f6f7f9] px-3.5 py-2.5">
        <b className="text-[14px]">Project settings</b>
        <small className="-mt-1.5 text-[10px] text-[#4b5563]">
          Manage how your project runs, connects, and grows.
        </small>

        <div className="overflow-hidden rounded-lg bg-white shadow-[inset_0_0_0_1px_#e5e7eb]">
          <div className="flex items-center gap-1.5 border-b border-[#e5e7eb] bg-[#f6f7f9] px-2.5 py-[7px] text-[11px]">
            <BxIcon name="info" size={13} />
            <b>About this project</b>
          </div>
          <div className="grid grid-cols-[90px_1fr] gap-3 p-2.5">
            <div className="text-center text-[9.5px]">
              <span className="grid h-20 place-items-center rounded bg-[#1d2e8a] text-[28px] font-extrabold text-white">
                B
              </span>
              <span className="mt-1.5 block text-[#2556c5]">Change image</span>
            </div>
            <div>
              <Field label="Project Title" required>
                <Input>Brandsite</Input>
              </Field>
              <Field label="Description">
                <Input className="leading-[1.4]">{shots.projectDesc}</Input>
              </Field>
              <div className="grid grid-cols-3 gap-2">
                <Field label="Project Status">
                  <Input>
                    Active
                    <BxIcon name="down" size={10} />
                  </Input>
                </Field>
                <Field label="Start Date">
                  <Input>
                    04/06/2026
                    <BxIcon name="cal" size={11} />
                  </Input>
                </Field>
                <Field label="Due Date">
                  <Input>
                    31/12/2026
                    <BxIcon name="cal" size={11} />
                  </Input>
                </Field>
              </div>
              <Field label="Visibility">
                <div className="grid grid-cols-3 gap-1.5">
                  {VISIBILITY.map(([name, text], index) => {
                    const on = index === visible;
                    return (
                      <div
                        key={name}
                        className={cn(
                          "rounded-[6px] px-2 py-1.5 text-[9px] transition-all duration-300",
                          on
                            ? "bg-[#e8eefc] shadow-[inset_0_0_0_1.5px_#2556c5]"
                            : "shadow-[inset_0_0_0_1px_#c7cbd3]",
                        )}
                      >
                        <b className="mb-0.5 flex items-center gap-[5px] text-[10px]">
                          <i
                            className={cn(
                              "size-2.5 rounded-full transition-all duration-300",
                              on
                                ? "shadow-[inset_0_0_0_3px_#2556c5]"
                                : "shadow-[inset_0_0_0_1.2px_#6b7280]",
                            )}
                          />
                          {name}
                        </b>
                        <small className="block leading-[1.35] text-[#4b5563]">{text}</small>
                      </div>
                    );
                  })}
                </div>
              </Field>
              <div className="mt-1.5 flex justify-end gap-1.5 text-[9.5px]">
                <span className="rounded-[5px] px-2.5 py-1 shadow-[inset_0_0_0_1px_#d1d5db]">
                  Cancel
                </span>
                <b
                  className={cn(
                    "rounded-[5px] px-2.5 py-1 text-white transition-colors duration-200",
                    step >= 4 ? "bg-[#1d4396]" : "bg-[#2556c5]",
                  )}
                >
                  Save changes
                </b>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-[inset_0_0_0_1px_#e5e7eb]">
          <div className="flex items-center gap-1.5 border-b border-[#e5e7eb] bg-[#f6f7f9] px-2.5 py-[7px] text-[11px]">
            <BxIcon name="users" size={13} />
            <b>Project Team &amp; Roles</b>
            <span className="ml-auto inline-flex items-center gap-1 rounded-[5px] px-2 py-[3px] text-[9.5px] text-[#2556c5] shadow-[inset_0_0_0_1px_#2556c5]">
              <BxIcon name="share2" size={11} />
              Share project
              <em className="rounded-[3px] bg-[#f3b4b4] px-1 text-[8.5px] text-[#9b1c1c] not-italic">
                1
              </em>
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 px-2.5 py-2">
            {ROLES.map(([role, count]) => (
              <div
                key={role}
                className="rounded-[6px] bg-[#eef0f4] px-2 py-1.5 text-[9px] text-[#4b5563]"
              >
                <small className="block text-[9.5px] text-[#1d1f24]">{role}</small>
                <b className="mr-[3px] text-[14px] text-[#1d1f24]">{count}</b>
                People
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-[inset_0_0_0_1px_#f4a3a3]">
          <div className="flex items-center gap-1.5 border-b border-[#fbd5d5] px-2.5 py-[7px] text-[11px] text-[#dc2626]">
            <GIcon name="alert" size={13} />
            <b>Danger zone</b>
          </div>
          <div className="grid grid-cols-[110px_1fr_auto] items-center gap-2.5 px-2.5 py-[7px] text-[9.5px] text-[#dc2626]">
            <b>Delete project</b>
            <small>Permanently remove the project and all its data. This cannot be undone.</small>
            <span className="rounded-[5px] px-2.5 py-[3px] shadow-[inset_0_0_0_1px_#f4a3a3]">
              Delete
            </span>
          </div>
        </div>
      </div>
    </GalleryWindow>
  );
}

/* ------------------------------------------------------------------ Liên kết tài liệu */

const LINK_STEPS = [600, 1100, 2400, 3000] as const;
const FORMAT_TOOLS: (GIconName | "thread" | "link" | "cmt" | "|")[] = [
  "bold",
  "ital",
  "und",
  "str",
  "|",
  "list",
  "thread",
  "|",
  "link",
  "code",
  "at",
  "cmt",
];

/**
 * Trang wiki với bảng "Links" (Figma: Document 6507:36687): bôi chọn câu, hiện thanh định dạng,
 * rồi gắn thêm một thẻ liên quan.
 */
export function LinksShot({ app, shots, mode }: ShotProps) {
  const step = useSteps(LINK_STEPS, mode);
  const t = app.wiki;
  const cards = app.board.cards;
  const firstSentence = `${shots.projectDesc.split(".")[0]}.`;

  return (
    <GalleryWindow view="wiki">
      <BxHead title="Brandsite" sub="Wiki" />
      <div className="grid flex-1 grid-cols-[180px_1fr] overflow-hidden">
        <div className="grid content-start gap-0.5 border-r border-[#e5e7eb] bg-[#f6f7f9] px-2 py-2.5 text-[11px]">
          <div className="flex items-center gap-2 px-1 pb-2 text-[#4b5563]">
            <BxIcon name="fileplus" size={15} />
            <BxIcon name="folderplus" size={15} />
            <BxIcon name="search" size={15} />
            <BxIcon name="sort" size={15} />
          </div>
          {t.tree.map((folder, i) => (
            <div key={folder.name} className="contents">
              <div
                className={cn(
                  "mt-1 flex items-center gap-[5px] px-1 py-[5px] text-[#30343c]",
                  i === 0 && "text-[#2556c5]",
                )}
              >
                <BxIcon name="down" size={12} />
                {folder.name}
                {i === 0 && (
                  <em className="grid size-3.5 place-items-center rounded-full bg-[#f59e0b] text-[9px] font-bold text-white not-italic">
                    7
                  </em>
                )}
              </div>
              {folder.pages.map((page, j) => (
                <div
                  key={page}
                  className={cn(
                    "ml-2.5 flex items-center gap-1.5 border-l border-[#dfe2e7] px-2 py-1 text-[#4b5563]",
                    i === 0 && j === 0 && "rounded-r-[5px] bg-[#e6edfb] text-[#2556c5]",
                  )}
                >
                  <BxIcon name="doc" size={12} />
                  <span className="truncate">{page}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex gap-0.5 border-b border-[#e5e7eb] px-2.5 pt-1.5">
            {t.tabs.map((tab, index) => (
              <span
                key={tab}
                className={cn(
                  "inline-flex items-center gap-[30px] rounded-t-[6px] px-2.5 py-1.5 text-[11px] text-[#4b5563]",
                  index === 0 && "-mb-px bg-white text-[#1d1f24] shadow-[inset_0_0_0_1px_#e5e7eb]",
                )}
              >
                <span className="max-w-[140px] truncate">{tab}</span>
                <BxIcon name="x" size={11} />
              </span>
            ))}
          </div>
          <div className="flex items-center px-3 py-1.5 text-[10.5px] text-[#4b5563]">
            <span className="flex-1 text-center">{t.crumb}</span>
            <span className="flex items-center gap-2">
              Edited 3m ago
              <BxIcon name="share2" size={13} />
              <BxIcon name="bookmark" size={13} />
              <BxIcon name="dots" size={13} />
            </span>
          </div>

          <div className="grid flex-1 grid-cols-[1fr_210px] overflow-hidden">
            <div className="min-w-0 px-[22px] py-4 text-[11.5px]">
              <h4 className="mb-1.5 text-[22px] font-bold tracking-[-0.01em]">{t.title}</h4>
              <p className="text-[#30343c]">{t.desc}</p>
              <h6 className="mt-3.5 mb-1.5 text-[15px] font-semibold">{t.h1}</h6>
              <p className="text-[#30343c]">
                <span
                  className={cn("transition-colors duration-[400ms]", step >= 1 && "bg-[#cfe0ff]")}
                >
                  {firstSentence}
                </span>
              </p>
              <div
                className={cn(
                  "my-1.5 ml-10 flex w-max items-center gap-[9px] rounded-[7px] bg-white px-2.5 py-1.5 text-[#1d1f24] shadow-[0_8px_22px_rgba(0,0,0,0.16),0_0_0_1px_#e5e7eb] transition-all duration-300",
                  step >= 2 ? "opacity-100" : "translate-y-1.5 opacity-0",
                )}
              >
                {FORMAT_TOOLS.map((tool, index) =>
                  tool === "|" ? (
                    <i key={index} className="h-3.5 w-px bg-[#e5e7eb]" />
                  ) : tool === "thread" || tool === "link" || tool === "cmt" ? (
                    <BxIcon key={index} name={tool} size={13} />
                  ) : (
                    <GIcon key={index} name={tool} size={13} />
                  ),
                )}
              </div>
              {[...t.todo1, ...t.todo2].map((item) => (
                <div key={item} className="flex items-center gap-2 py-1">
                  <i className="size-3 shrink-0 rounded-[3px] shadow-[inset_0_0_0_1px_#c7cbd3]" />
                  {item}
                </div>
              ))}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                {t.rel}
                <span className="inline-flex items-center gap-[5px] rounded bg-[#f1f2f4] px-2 py-1 text-[10.5px]">
                  <BxIcon name="check" size={12} className="text-[#2556c5]" />
                  [030] {cards[2]?.title}
                </span>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
                <BxIcon name="plus" size={12} />
                Type &apos;/&apos; for commands
              </div>
            </div>

            <div className="grid content-start gap-1 overflow-hidden border-l border-[#e5e7eb] px-2.5 py-2 text-[10px]">
              <div className="mb-1 flex gap-0.5 text-[10.5px]">
                {(
                  [
                    ["info", "Detail"],
                    ["cmt", "Comment"],
                    ["link", "Links"],
                  ] as const
                ).map(([icon, label], index) => (
                  <span
                    key={label}
                    className={cn(
                      "inline-flex items-center gap-[3px] px-1 py-[5px] whitespace-nowrap text-[#4b5563]",
                      index === 2 && "font-semibold text-[#1d1f24] shadow-[inset_0_-2px_0_#2556c5]",
                    )}
                  >
                    <BxIcon name={icon} size={12} />
                    {label}
                  </span>
                ))}
              </div>
              <LinkLabel icon={<GIcon name="list" size={11} />}>RELATED CARD</LinkLabel>
              <div className="flex items-center gap-1.5 py-[3px]">
                <GIcon name="list" size={12} />
                <span className="truncate">[030/031] {cards[2]?.title}</span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                  step >= 4 ? "max-h-6 bg-[#e8f2ff] py-[3px] opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <GIcon name="list" size={12} />
                <span className="truncate">[041] {cards[0]?.title}</span>
              </div>
              <span
                className={cn(
                  "flex items-center justify-center gap-1 rounded-[5px] border border-dashed border-[#c7cbd3] p-1 text-[9.5px] text-[#2556c5] transition-colors duration-200",
                  step === 3 && "bg-[#e8eefc]",
                )}
              >
                <BxIcon name="plus" size={11} />
                Link to a card
              </span>
              <LinkLabel icon={<BxIcon name="clip" size={11} />}>ATTACHMENTS</LinkLabel>
              <FileRow
                icon={<GIcon name="pdf" size={12} />}
                tone="text-[#dc2626]"
                name="kickoff-agenda.pdf"
                size="320 KB"
              />
              <FileRow
                icon={<GIcon name="img" size={12} />}
                tone="text-[#4f46e5]"
                name="Menu-0010-UI.png"
                size="1.2 MB"
              />
              <LinkLabel icon={<BxIcon name="link" size={11} />}>EXTERNAL LINKS</LinkLabel>
              {["Balheh Project - Login Menu", "Github - Develop Branch"].map((link) => (
                <span key={link} className="flex items-center gap-1.5 py-[3px] text-[#2556c5]">
                  <GIcon name="ext" size={11} />
                  <span className="truncate">{link}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GalleryWindow>
  );
}

function LinkLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <small className="mt-2 flex items-center gap-1 text-[9.5px] font-bold text-[#4b5563]">
      {icon}
      {children}
    </small>
  );
}

function FileRow({
  icon,
  tone,
  name,
  size,
}: {
  icon: ReactNode;
  tone: string;
  name: string;
  size: string;
}) {
  return (
    <div className="flex items-center gap-1.5 py-[3px]">
      <i className={cn("grid size-4 place-items-center rounded-[3px] not-italic", tone)}>{icon}</i>
      <span className="truncate">{name}</span>
      <em className="ml-auto text-[8.5px] whitespace-nowrap text-[#9ca3af] not-italic">{size}</em>
    </div>
  );
}
