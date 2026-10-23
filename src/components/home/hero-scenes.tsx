"use client";

import { useState, type CSSProperties } from "react";

import { AppMark } from "@/components/ui/app-mark";
import { StatusBadge, type ProductStatus } from "@/components/ui/status-badge";
import type { HeroScene, HeroScenesCopy, LinkCard } from "@/content/home-types";
import { cn } from "@/lib/utils";

/*
 * Các mockup minh hoạ của hero, dựng bằng HTML/CSS (class .hs-* trong globals.css) theo file
 * mẫu "BizTown Homepage v6" thay cho SVG export từ Figma — chữ dịch được theo ngôn ngữ và nét ở
 * mọi cỡ. Toạ độ theo khung 644×540; màn hẹp thì HeroSceneBox thu nhỏ cả khung.
 */

/** Màu 4 bảng trong thẻ "Phân bổ công việc", theo thứ tự. */
const BOARD_COLORS = ["#f5b70a", "#3b82f6", "#1e8a4c", "#e5484d"];

/** Chiều cao (%) 10 cột biểu đồ chương 4; 2 cột cuối tô cam. */
const GROWTH_BARS = [24, 32, 30, 44, 40, 56, 52, 70, 66, 88];

type SceneProps = {
  scene: HeroScene;
  copy: HeroScenesCopy;
  paidPill: string;
  apps: LinkCard[];
  statusLabels: Record<ProductStatus, string>;
};

export function HeroSceneArt({ scene, copy, paidPill, apps, statusLabels }: SceneProps) {
  switch (scene) {
    case "cards":
      return (
        <>
          <div
            className="bt-float absolute top-[18px] left-0"
            style={{ "--bob": "3.5s" } as CSSProperties}
          >
            <TaskCard copy={copy.tasks} />
          </div>
          <div
            className="bt-float absolute top-[158px] left-[352px]"
            style={{ "--bob": "4s" } as CSSProperties}
          >
            <RoomsPhone copy={copy.rooms} />
          </div>
          <div className="hs-pill absolute top-[448px] left-10">
            <span className="hs-pill-dot" />
            {paidPill}
          </div>
        </>
      );
    case "apps":
      return <AppsGrid copy={copy.apps} apps={apps} statusLabels={statusLabels} />;
    case "paper":
      return <BeforeAfter copy={copy.paper} />;
    case "growth":
      return <Growth copy={copy.growth} />;
  }
}

/** Thẻ thống kê dự án Balheh: vòng tròn % hoàn thành, 3 chỉ số, tiến độ 4 bảng. */
function TaskCard({ copy }: { copy: HeroScenesCopy["tasks"] }) {
  return (
    <div className="hs-task">
      <div className="hs-task-left">
        <b className="hs-task-title">{copy.title}</b>
        <div className="hs-task-ring">
          <div>
            <strong>{copy.percent}</strong>
            <span>{copy.percentLabel}</span>
          </div>
        </div>
        <div className="hs-task-legend">
          <span>
            <i className="bg-[#34a853]" />
            {copy.complete.label}
            <b>{copy.complete.value}</b>
          </span>
          <span>
            <i className="bg-[#e48b87]" />
            {copy.incomplete.label}
            <b>{copy.incomplete.value}</b>
          </span>
        </div>
      </div>
      <div className="min-w-0">
        <div className="hs-task-kpis">
          {copy.kpis.map((kpi) => (
            <div key={kpi.label} className={cn("hs-task-kpi", `is-${kpi.tone}`)}>
              <small>{kpi.label}</small>
              <b>{kpi.value}</b>
              <em>{kpi.note}</em>
            </div>
          ))}
        </div>
        <b className="hs-task-pt">{copy.progressTitle}</b>
        <small className="hs-task-ps">{copy.progressSub}</small>
        {copy.boards.map((board, index) => {
          const color = BOARD_COLORS[index % BOARD_COLORS.length];
          return (
            <div key={board.name} className="hs-task-row">
              <div className="hs-task-rh">
                <i style={{ background: color }} />
                <span>{board.name}</span>
                <small>{board.count}</small>
                <b style={{ color }}>{board.percent}%</b>
              </div>
              <div className="hs-task-bar">
                <i style={{ width: `${board.percent}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Nét vẽ icon trong mockup điện thoại (viewBox 24, tô bằng currentColor). */
const ICONS = {
  back: <path d="M15 6l-6 6 6 6" />,
  bed: <path d="M3 18V8m0 6h18v4M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5M7 12.2a1.6 1.6 0 1 0 0-.1" />,
} as const;

function Glyph({ name, size = 14 }: { name: keyof typeof ICONS; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="hs-ic" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/** Màn hình danh sách phòng của NhàLo (khung điện thoại thu gọn, không thanh trạng thái). */
function RoomsPhone({ copy }: { copy: HeroScenesCopy["rooms"] }) {
  return (
    <div className="hs-phone">
      <div className="hs-phone-top">
        <span className="hs-phone-btn">
          <Glyph name="back" />
        </span>
        <div className="min-w-0 flex-1">
          <b>{copy.title}</b>
          <small>{copy.sub}</small>
        </div>
        <span className="hs-phone-btn">
          <svg viewBox="0 0 24 24" width={14} height={14} aria-hidden="true" fill="currentColor">
            <circle cx="12" cy="5" r="1.4" />
            <circle cx="12" cy="12" r="1.4" />
            <circle cx="12" cy="19" r="1.4" />
          </svg>
        </span>
      </div>
      <div className="hs-phone-body">
        <div className="hs-phone-seg">
          <span>{copy.tabs[0]}</span>
          <span className="is-on">{copy.tabs[1]}</span>
        </div>
        <div className="hs-phone-chips">
          {copy.filters.map((filter, index) => (
            <span key={filter} className={cn(index === 0 && "is-on")}>
              {filter}
            </span>
          ))}
        </div>
        {copy.items.map((room) => (
          <div key={room.code} className="hs-room">
            <span className={cn("hs-room-bed", `is-${room.status}`)}>
              <Glyph name="bed" size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <b>{room.code}</b>
              <small>{room.info}</small>
            </div>
            <em className={cn("hs-room-st", `is-${room.status}`)}>{room.label}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Thẻ kính "Hệ sinh thái BizTown": mỗi ứng dụng một ô, ô cuối là web & app theo yêu cầu. */
function AppsGrid({
  copy,
  apps,
  statusLabels,
}: {
  copy: HeroScenesCopy["apps"];
  apps: LinkCard[];
  statusLabels: Record<ProductStatus, string>;
}) {
  return (
    <div
      className="hs-glass bt-float absolute inset-x-0 top-10 p-6"
      style={{ "--bob": "4s" } as CSSProperties}
    >
      <div className="mb-[18px] flex items-center gap-2.5 text-[15px] leading-6 font-semibold">
        {/* Biểu tượng BizTown: cắt phần hình từ logo chữ (48×42 của khung 172×42). */}
        <span className="relative h-7 w-8 shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG tĩnh, chỉ cắt khung */}
          <img
            src="/images/home/biztown-logo.svg"
            alt=""
            className="absolute top-0 left-0 h-7 max-w-none"
          />
        </span>
        {copy.title}
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        {apps.map((app, index) => (
          <div key={app.name} className="hs-tile" style={{ animationDelay: `${index * 70}ms` }}>
            <AppMark mark={app.mark} size={52} radius={15} fontSize={17} />
            <b>{app.name}</b>
            {app.status && <StatusBadge status={app.status} label={statusLabels[app.status]} />}
          </div>
        ))}
        <div className="hs-tile is-ghost" style={{ animationDelay: `${apps.length * 70}ms` }}>
          <span className="hs-tile-plus">+</span>
          <b>{copy.custom}</b>
        </div>
      </div>
    </div>
  );
}

/** Khung so sánh sổ tay giấy (trái) và danh sách thu tiền trong ứng dụng (phải), kéo để xem. */
function BeforeAfter({ copy }: { copy: HeroScenesCopy["paper"] }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="hs-ba absolute inset-x-0 top-5">
      <div className="hs-ba-side hs-ba-after">
        <span className="hs-ba-tag">{copy.after}</span>
        <div className="hs-applist">
          {copy.rows.map((row) => (
            <div key={row.room} className="hs-applist-row">
              <b>{row.room}</b>
              <span>{row.amount}</span>
              <StatusBadge
                status={row.paid ? "live" : "soon"}
                label={row.paid ? copy.paid : copy.pending}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="hs-ba-side hs-ba-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <span className="hs-ba-tag">{copy.before}</span>
        <div className="hs-paper-note">
          <b>{copy.note.title}</b>
          {copy.note.lines.map((line, index) => (
            <span key={index} className="block">
              {typeof line === "string" ? (
                line
              ) : (
                <>
                  {line.before}
                  <s>{line.struck}</s>
                  {line.after}
                </>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="hs-ba-handle" style={{ left: `${position}%` }}>
        <span>⇆</span>
      </div>
      {/* Khung hero là hình minh hoạ (aria-hidden) nên thanh kéo chỉ dùng chuột/chạm. */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        tabIndex={-1}
        aria-label={copy.sliderLabel}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </div>
  );
}

/** Biểu đồ giờ tiết kiệm mỗi tháng + 2 thông báo từ NhàLo và Balheh. */
function Growth({ copy }: { copy: HeroScenesCopy["growth"] }) {
  return (
    <>
      <div
        className="hs-glass bt-float absolute top-[70px] left-0 w-[460px] p-[26px]"
        style={{ "--bob": "3.6s" } as CSSProperties}
      >
        <small className="hs-muted text-[14px]">{copy.title}</small>
        <div className="hs-growth-big">
          {copy.value}
          <em className="hs-muted">{copy.note}</em>
        </div>
        <div className="flex h-[220px] items-end gap-2.5">
          {GROWTH_BARS.map((height, index) => (
            <i
              key={index}
              className={cn("hs-growth-bar", index > 7 && "is-hi")}
              style={{ height: `${height}%`, animationDelay: `${index * 60}ms` }}
            />
          ))}
        </div>
      </div>
      {copy.toasts.map((toast, index) => (
        <div
          key={toast.app}
          className={cn(
            "hs-toast bt-float absolute",
            index === 0 ? "top-0 right-0" : "top-[340px] right-10",
            toast.app === "nhalo" ? "is-nhalo" : "is-balheh",
          )}
          style={{ "--bob": index === 0 ? "3.5s" : "4s" } as CSSProperties}
        >
          <div className="hs-toast-head">
            <AppMark mark={{ logo: toast.app }} size={22} />
            <span className="flex-1">{toast.name}</span>
            <time>{toast.time}</time>
          </div>
          <b>{toast.title}</b>
          <small>{toast.sub}</small>
          <div className="hs-toast-bar">
            <i style={{ width: `${toast.percent}%` }} />
          </div>
        </div>
      ))}
    </>
  );
}
