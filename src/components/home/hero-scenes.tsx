"use client";

import type { CSSProperties } from "react";

import { MsIcon } from "@/components/nhalo/app/app-ui";
import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { StatusBadge, type ProductStatus } from "@/components/ui/status-badge";
import type { HeroScene, HeroScenesCopy, LinkCard } from "@/content/home-types";
import { HOME_SECTIONS, localizedPath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

/*
 * Các mockup minh hoạ của hero, dựng bằng HTML/CSS (class .hs-* trong globals.css) theo file
 * mẫu "BizTown Homepage v6" thay cho SVG export từ Figma — chữ dịch được theo ngôn ngữ và nét ở
 * mọi cỡ. Toạ độ theo khung 644×540; màn hẹp thì HeroSceneBox thu nhỏ cả khung.
 */

/** Chiều cao (%) 10 cột biểu đồ chương 4; 2 cột cuối tô cam. */
const GROWTH_BARS = [24, 32, 30, 44, 40, 56, 52, 70, 66, 88];

type SceneProps = {
  scene: HeroScene;
  copy: HeroScenesCopy;
  apps: LinkCard[];
  statusLabels: Record<ProductStatus, string>;
  locale: Locale;
};

export function HeroSceneArt({ scene, copy, apps, statusLabels, locale }: SceneProps) {
  switch (scene) {
    case "cards":
      return <Mission copy={copy.mission} apps={apps} />;
    case "apps":
      return <AppsGrid copy={copy.apps} apps={apps} statusLabels={statusLabels} locale={locale} />;
    case "paper":
      return <Flow copy={copy.paper} />;
    case "growth":
      return <Growth copy={copy.growth} />;
  }
}

/** Vị trí 4 nhóm khách hàng quanh vòng ngoài (khung 644×540, tâm 322·270). */
const PEOPLE = [
  { pos: "top-[30px] left-[24px]", tone: "bg-[#fff1d9] text-[#a65f00]", bob: "3.6s" },
  { pos: "top-[96px] right-0", tone: "bg-[#e7f6ee] text-[#1e8a4c]", bob: "4.2s" },
  { pos: "bottom-[84px] left-0", tone: "bg-[#e8ecff] text-[#3b4fd8]", bob: "3.9s" },
  { pos: "bottom-[22px] right-[30px]", tone: "bg-[#f3e8ff] text-[#7c3aed]", bob: "4.5s" },
];

/** Ba vòng nét đứt quanh tâm (bán kính cách đều 55px): trong cam, giữa và ngoài xanh. */
const RINGS = [
  { r: 120, color: "rgba(239,159,39,0.6)", dash: "5 9" },
  { r: 175, color: "rgba(239,159,39,0.35)", dash: "3 9" },
  { r: 230, color: "rgba(91,124,255,0.45)", dash: "2 10" },
];

/** Chấm cam bay trên các vòng: bán kính, thời gian một vòng, độ lệch xuất phát, cỡ chấm. */
const ORBIT_DOTS = [
  { r: 230, duration: 18, delay: 0, size: 12 },
  { r: 230, duration: 18, delay: -9, size: 8 },
  { r: 175, duration: 12, delay: -2, size: 10, reverse: true },
  { r: 175, duration: 12, delay: -7, size: 7, reverse: true },
  { r: 120, duration: 9, delay: -5, size: 7 },
];

/** Vị trí 4 sản phẩm trên vòng trong (trên · phải · dưới · trái). */
const ORBIT_SLOTS = ["top-0 left-1/2", "top-1/2 left-full", "top-full left-1/2", "top-1/2 left-0"];

/**
 * Chương 1 — "bình dân hoá công nghệ cho mọi doanh nghiệp": BizTown ở tâm, các sản phẩm quay
 * chậm trên vòng trong (biểu tượng tự quay ngược để luôn đứng thẳng), bốn nhóm khách hàng nổi
 * ở vòng ngoài, vài chấm cam bay quanh ba vòng nét đứt. Máy bật "giảm chuyển động" thì đứng yên.
 */
function Mission({ copy, apps }: { copy: HeroScenesCopy["mission"]; apps: LinkCard[] }) {
  const marks = [...apps.slice(0, 3).map((app) => app.mark), null];
  return (
    <>
      <svg
        viewBox="0 0 644 540"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      >
        <defs>
          <radialGradient id="hs-hub-glow">
            <stop offset="0" stopColor="#ef9f27" stopOpacity="0.32" />
            <stop offset="1" stopColor="#ef9f27" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="322" cy="270" r="200" fill="url(#hs-hub-glow)" />
        {RINGS.map((ring) => (
          <circle
            key={ring.r}
            cx="322"
            cy="270"
            r={ring.r}
            stroke={ring.color}
            strokeWidth="2"
            strokeDasharray={ring.dash}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Chấm cam bay quanh các vòng, mỗi chấm một tốc độ, có chấm bay ngược chiều. */}
      {ORBIT_DOTS.map((dot, index) => (
        <div
          key={index}
          className="absolute motion-safe:animate-[bt-orbit_linear_infinite]"
          style={{
            top: 270 - dot.r,
            left: 322 - dot.r,
            width: dot.r * 2,
            height: dot.r * 2,
            animationDuration: `${dot.duration}s`,
            animationDelay: `${dot.delay}s`,
            animationDirection: dot.reverse ? "reverse" : undefined,
          }}
        >
          <span
            className="absolute top-0 left-1/2 -translate-1/2 rounded-full bg-accent"
            style={{
              width: dot.size,
              height: dot.size,
              opacity: dot.size < 9 ? 0.75 : 1,
              boxShadow: `0 0 ${dot.size + 4}px #ef9f27`,
            }}
          />
        </div>
      ))}

      {/* Sản phẩm trên vòng trong. */}
      <div className="absolute top-[150px] left-[202px] size-[240px] motion-safe:animate-[bt-orbit_40s_linear_infinite]">
        {marks.map((mark, index) => (
          <span key={index} className={cn("absolute -translate-1/2", ORBIT_SLOTS[index])}>
            <span className="flex size-[64px] items-center justify-center rounded-[20px] bg-white shadow-[0_14px_30px_rgba(35,48,94,0.18)] ring-1 ring-[rgba(35,48,94,0.06)] motion-safe:animate-[bt-orbit_40s_linear_infinite_reverse]">
              {mark ? (
                <AppMark mark={mark} size={48} radius={14} surface="light" />
              ) : (
                <CustomMark size={48} />
              )}
            </span>
          </span>
        ))}
      </div>

      {/* Tâm: BizTown. */}
      <div className="hs-glass absolute top-[200px] left-[252px] flex size-[140px] flex-col items-center justify-center gap-2 rounded-[38px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- logo SVG nhỏ */}
        <img src="/images/home/biztown-mark.svg" alt="" width={62} height={62} />
        <b className="text-[16px] leading-none">{copy.hub}</b>
      </div>

      {/* Bốn nhóm khách hàng ở vòng ngoài. */}
      {copy.people.map((person, index) => {
        const place = PEOPLE[index % PEOPLE.length];
        return (
          <div
            key={person.label}
            className={cn(
              "hs-glass bt-float absolute flex items-center gap-3 rounded-[18px] py-2.5 pr-5 pl-2.5",
              place.pos,
            )}
            style={{ "--bob": place.bob } as CSSProperties}
          >
            <span
              className={cn("flex size-10 items-center justify-center rounded-[12px]", place.tone)}
            >
              <MsIcon name={person.icon} size={22} />
            </span>
            <b className="text-[15px] leading-none font-semibold whitespace-nowrap">
              {person.label}
            </b>
          </div>
        );
      })}
    </>
  );
}

/** Màu nền từng ô sản phẩm trong lưới 2×2 (theo thứ tự apps), ô cuối là web & app theo yêu cầu. */
const APP_TILES = [
  "border-[#f3d7a6] bg-[linear-gradient(150deg,#fff8ea,#ffe8c2)]",
  "border-[#bfe3cf] bg-[linear-gradient(150deg,#f1fbf5,#d9f2e4)]",
  "border-[#cfd6ff] bg-[linear-gradient(150deg,#f4f5ff,#dfe3ff)]",
];

/** Biểu tượng "Web & app theo yêu cầu": khung trình duyệt có dấu </> và điện thoại nhỏ. */
function CustomMark({ size }: { size: number }) {
  return (
    <span
      className="flex items-center justify-center bg-[linear-gradient(140deg,#ffd08a,#ef9f27)] text-[#23305e] shadow-[0_10px_24px_rgba(239,159,39,0.4)]"
      style={{ width: size, height: size, borderRadius: size * 0.28 }}
    >
      <svg
        viewBox="0 0 40 40"
        width={size * 0.6}
        height={size * 0.6}
        fill="none"
        aria-hidden="true"
      >
        <rect x="2" y="6" width="28" height="22" rx="4" stroke="currentColor" strokeWidth="2.6" />
        <path d="M2 12h28" stroke="currentColor" strokeWidth="2.6" />
        <path
          d="M12 17l-3 3 3 3M20 17l3 3-3 3"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="25" y="17" width="13" height="21" rx="3" fill="#23305e" />
        <path d="M29.5 34h4" stroke="#ffd08a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/**
 * Lưới 2×2 sản phẩm BizTown: mỗi ô màu riêng, logo to, trạng thái; bấm ô có trang sản phẩm
 * để mở trang đó, ô cuối (web & app theo yêu cầu) dẫn xuống mục Dịch vụ.
 */
function AppsGrid({
  copy,
  apps,
  statusLabels,
  locale,
}: {
  copy: HeroScenesCopy["apps"];
  apps: LinkCard[];
  statusLabels: Record<ProductStatus, string>;
  locale: Locale;
}) {
  const tile =
    "group relative flex flex-col justify-between gap-3 rounded-[26px] border p-5 text-left text-[#1f2433] shadow-[0_18px_40px_rgba(35,48,94,0.12)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_rgba(35,48,94,0.2)] motion-safe:animate-[bh-pop-in_0.45s_ease-out_both]";
  return (
    <div className="absolute inset-x-0 top-6 grid grid-cols-2 gap-4">
      {apps.slice(0, 3).map((app, index) => {
        const body = (
          <>
            <span className="flex items-start justify-between">
              <AppMark mark={app.mark} size={64} radius={18} fontSize={18} surface="light" />
              {app.detail && (
                <span className="flex size-9 items-center justify-center rounded-full bg-white/80 text-[#23305e] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <Icon name="arrow-up-right" size={18} />
                </span>
              )}
            </span>
            <span className="flex flex-col gap-1">
              <b className="text-[22px] leading-tight">{app.name}</b>
              <small className="text-[14px] leading-snug text-[#5a6283]">{app.desc}</small>
            </span>
            {app.status && (
              <StatusBadge
                status={app.status}
                label={statusLabels[app.status]}
                className="self-start bg-white/80"
              />
            )}
          </>
        );
        const className = cn(tile, APP_TILES[index % APP_TILES.length]);
        const style = { animationDelay: `${index * 90}ms` };
        return app.detail ? (
          <a
            key={app.name}
            href={localizedPath(locale, app.detail)}
            className={className}
            style={style}
          >
            {body}
          </a>
        ) : (
          <div key={app.name} className={className} style={style}>
            {body}
          </div>
        );
      })}
      <a
        href={`#${HOME_SECTIONS.services}`}
        className={cn(
          tile,
          "border-[#4b4f9e] bg-[radial-gradient(260px_200px_at_100%_100%,rgba(239,159,39,0.55),transparent),radial-gradient(240px_180px_at_0%_0%,rgba(91,124,255,0.55),transparent),linear-gradient(150deg,#2a3577,#3a2c6e_60%,#5a2f52)] text-white",
        )}
        style={{ animationDelay: "270ms" }}
      >
        <span className="flex items-start justify-between">
          <CustomMark size={64} />
          <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <Icon name="arrow-up-right" size={18} />
          </span>
        </span>
        <b className="text-[22px] leading-tight text-balance text-white">{copy.custom}</b>
        <small className="text-[14px] leading-snug text-white/70">{copy.title}</small>
      </a>
    </div>
  );
}

/** Số thứ tự bước trong luồng chương 3. */
function StepBadge({ index, label }: { index: number; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.5px] uppercase">
      <span className="flex size-6 items-center justify-center rounded-full bg-accent text-[12px] text-[#23305e]">
        {index}
      </span>
      {label}
    </span>
  );
}

/** Hai vòng nét đứt quay chậm dưới thẻ "Tự động xử lý" (tâm 415·280). */
const FLOW_RINGS = [
  { r: 150, duration: 40, color: "rgba(239,159,39,0.45)", dash: "6 10" },
  { r: 215, duration: 60, color: "rgba(91,124,255,0.35)", dash: "3 10", reverse: true },
];

/** Đường nối: cam là luồng chính 1 → 2 → 3, xanh nối sang các việc khác. */
const FLOW_LINKS = [
  { d: "M128 200 C 128 252, 196 280, 266 280", end: [266, 280], main: true },
  { d: "M340 394 C 340 428, 330 446, 304 448", end: [304, 448], main: true },
  { d: "M522 168 C 522 132, 548 128, 548 110", end: [548, 108] },
  { d: "M522 394 C 522 414, 548 414, 548 428", end: [548, 430] },
];

/** Màu 3 phần của biểu đồ tròn và chú thích trong thẻ "Báo cáo". */
const REPORT_COLORS = ["#ef9f27", "#5b7cff", "#e5484d"];

/**
 * Chương 3 — "từ ghi chép đến báo cáo": tờ ghi chép viết tay → thẻ "tự động xử lý" tick lần
 * lượt → thẻ báo cáo có biểu đồ tròn. Dưới cùng là hai vòng nét đứt xoay chậm; từ thẻ giữa có
 * đường nối sang hai thẻ trắng nhỏ tượng trưng các việc khác.
 */
function Flow({ copy }: { copy: HeroScenesCopy["paper"] }) {
  const path =
    "motion-safe:animate-[bt-dash_1.1s_linear_infinite] [stroke-dasharray:7_9] [stroke-linecap:round]";
  return (
    <>
      {/* Lớp dưới cùng: hai vòng nét đứt quay ngược chiều nhau quanh thẻ "Tự động xử lý". */}
      {FLOW_RINGS.map((ring) => (
        <svg
          key={ring.r}
          viewBox={`0 0 ${ring.r * 2 + 4} ${ring.r * 2 + 4}`}
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute motion-safe:animate-[bt-orbit_linear_infinite]"
          style={{
            top: 280 - ring.r - 2,
            left: 415 - ring.r - 2,
            width: ring.r * 2 + 4,
            height: ring.r * 2 + 4,
            animationDuration: `${ring.duration}s`,
            animationDirection: ring.reverse ? "reverse" : undefined,
          }}
        >
          <circle
            cx={ring.r + 2}
            cy={ring.r + 2}
            r={ring.r}
            stroke={ring.color}
            strokeWidth="2"
            strokeDasharray={ring.dash}
            strokeLinecap="round"
          />
        </svg>
      ))}

      {/* Đường nối các thẻ, nét đứt chạy theo chiều công việc. */}
      <svg
        viewBox="0 0 644 540"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      >
        {FLOW_LINKS.map((link) => (
          <g key={link.d}>
            <path
              d={link.d}
              stroke={link.main ? "#ef9f27" : "rgba(91,124,255,0.6)"}
              strokeWidth={link.main ? 2.5 : 2}
              className={path}
            />
            <circle
              cx={link.end[0]}
              cy={link.end[1]}
              r={link.main ? 5 : 4}
              fill={link.main ? "#ef9f27" : "#5b7cff"}
            />
          </g>
        ))}
      </svg>

      {/* 1 · Tờ ghi chép viết tay. */}
      <div
        className="bt-float absolute top-[16px] left-[8px] w-[240px] -rotate-3 rounded-[20px] border border-[#f1e3c4] bg-[#fffdf5] p-5 text-[#23305e] shadow-[0_24px_48px_rgba(166,95,0,0.16)]"
        style={{ "--bob": "4s" } as CSSProperties}
      >
        <StepBadge index={1} label={copy.steps[0]} />
        <ul className="mt-3 flex flex-col">
          {copy.note.map((line) => (
            <li
              key={line}
              className="border-b border-dashed border-[#e9d9b5] py-2 text-[15px] text-[#4a4f6a] italic"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* 2 · Tự động xử lý. */}
      <div
        className="hs-glass bt-float absolute top-[170px] left-[270px] z-[1] w-[290px] rounded-[24px] p-5"
        style={{ "--bob": "3.6s" } as CSSProperties}
      >
        <div className="flex items-center justify-between">
          <StepBadge index={2} label={copy.steps[1]} />
          <span className="flex size-8 items-center justify-center rounded-full bg-[#fff1d9] text-[#a65f00]">
            <MsIcon name="bolt" size={20} />
          </span>
        </div>
        <ul className="mt-3 flex flex-col gap-2">
          {copy.tasks.map((task, index) => (
            <li
              key={task}
              className="flex items-center gap-3 rounded-[14px] bg-white/70 px-3 py-2.5 text-[15px] font-medium dark:bg-white/10"
            >
              <span
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1e8a4c] text-white motion-safe:animate-[bh-pop-in_0.35s_ease-out_both]"
                style={{ animationDelay: `${500 + index * 450}ms` }}
              >
                <Icon name="check" size={14} />
              </span>
              {task}
            </li>
          ))}
        </ul>
      </div>

      {/* 3 · Báo cáo. */}
      <div
        className="hs-glass bt-float absolute top-[372px] left-0 w-[300px] rounded-[24px] p-5"
        style={{ "--bob": "4.4s" } as CSSProperties}
      >
        <div className="flex items-center justify-between">
          <StepBadge index={3} label={copy.steps[2]} />
          <small className="hs-muted text-[12.5px]">{copy.report.title}</small>
        </div>
        <div className="mt-3 flex items-center gap-5">
          <span
            className="relative flex size-[84px] shrink-0 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(${REPORT_COLORS[0]} 0 58%, ${REPORT_COLORS[1]} 58% 86%, ${REPORT_COLORS[2]} 86% 100%)`,
            }}
          >
            <span className="flex size-[58px] items-center justify-center rounded-full bg-white text-[15px] font-bold text-[#1e8a4c] dark:bg-[#1c2650]">
              {copy.report.value}
            </span>
          </span>
          <ul className="flex flex-1 flex-col gap-2">
            {copy.report.legend.map((label, index) => (
              <li key={label} className="flex items-center gap-2 text-[13.5px]">
                <i
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: REPORT_COLORS[index] }}
                />
                <span className="flex-1 whitespace-nowrap">{label}</span>
                <span className="h-1.5 w-14 overflow-hidden rounded-full bg-[var(--hs-bar)]">
                  <i
                    className="block h-full origin-left rounded-full motion-safe:animate-[bt-grow_1.6s_ease-out_both]"
                    style={{ width: `${[78, 46, 18][index]}%`, background: REPORT_COLORS[index] }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Thẻ trắng nhỏ: các việc khác cũng chạy qua cùng một luồng. */}
      {copy.others.map((task, index) => (
        <div
          key={task.title}
          className={cn(
            "bt-float absolute right-0 flex w-[196px] items-center gap-3 rounded-[18px] bg-white p-2.5 pr-4 text-[#23305e] shadow-[0_18px_36px_rgba(35,48,94,0.14)] ring-1 ring-[rgba(35,48,94,0.06)]",
            index === 0 ? "top-[44px]" : "top-[432px]",
          )}
          style={{ "--bob": `${3.8 + index * 0.5}s` } as CSSProperties}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#e8ecff] text-[#3b4fd8]">
            <MsIcon name={task.icon} size={22} />
          </span>
          <span className="min-w-0">
            <b className="block text-[14.5px] leading-snug">{task.title}</b>
            <small className="block truncate text-[12px] text-[#5a6283]">{task.sub}</small>
          </span>
        </div>
      ))}
    </>
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
            index === 0 ? "top-0 right-0" : "top-[350px] right-0",
            toast.app === "nhalo" ? "is-nhalo" : "is-balheh",
          )}
          style={{ "--bob": index === 0 ? "3.5s" : "4s" } as CSSProperties}
        >
          <div className="hs-toast-head">
            <AppMark mark={{ logo: toast.app }} size={22} surface="light" />
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
      {/* Thẻ nổi góc dưới trái: chi phí vận hành trước / sau (cùng dáng hai thẻ thông báo). */}
      <div
        className="hs-toast bt-float absolute top-[388px] -left-[18px]"
        style={{ "--bob": "4.6s" } as CSSProperties}
      >
        <div className="hs-toast-head">
          <span className="flex size-[22px] items-center justify-center rounded-[7px] bg-[#e7f6ee] text-[#1e8a4c]">
            <MsIcon name="account_balance_wallet" size={15} />
          </span>
          <span className="flex-1">{copy.budget.label}</span>
        </div>
        <b>{copy.budget.title}</b>
        <small>{copy.budget.sub}</small>
        {[copy.budget.before, copy.budget.after].map((row, index) => (
          <div key={row.label} className="mt-1.5 flex items-center gap-2.5 text-[12px]">
            <span className="hs-muted w-9">{row.label}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--hs-bar)]">
              <i
                className="block h-full origin-left rounded-full motion-safe:animate-[bt-grow_1.4s_ease-out_both]"
                style={{
                  width: index === 0 ? "100%" : "68%",
                  background: index === 0 ? "#9aa1bb" : "#1e8a4c",
                  animationDelay: `${index * 250}ms`,
                }}
              />
            </span>
            <b className="w-10 text-right text-[12.5px]">{row.value}</b>
          </div>
        ))}
      </div>
    </>
  );
}
