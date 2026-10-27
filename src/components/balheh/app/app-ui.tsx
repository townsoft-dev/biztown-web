import { Inter } from "next/font/google";
import Image from "next/image";
import type { ReactNode } from "react";

import type { Avatar, CardStatus } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

/*
 * Bộ phận giao diện ứng dụng Balheh trong mockup trình duyệt (Figma: App mock · bx). Dựng ở khổ
 * gốc 1120 × 601 như Figma rồi thu nhỏ cả khung bằng <ScaledStage>. Màu và font (Inter) cố định
 * như sản phẩm thật, không theo theme của trang.
 */

// Font của giao diện Balheh (Figma: Inter), tự host lúc build như Lexend. Dùng chung cho mọi
// mockup ứng dụng trên trang (cả những khối không nằm trong <AppWindow>).
export const bxInter = Inter({ subsets: ["latin", "vietnamese"], display: "swap" });

/** Nét icon kiểu Lucide (file mẫu: AI) — viewBox 24, vẽ bằng currentColor. */
const ICONS: Record<string, string> = {
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  kanban: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7v7M12 7v4M16 7v9"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  users:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  admin:
    '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4"/><path d="M17 14l1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L14 16.3l2-.3z"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  up: '<path d="M18 15l-6-6-6 6"/>',
  right: '<path d="M9 18l6-6-6-6"/>',
  dots: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
  share: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  check:
    '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  cmt: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2-5.6A8.4 8.4 0 1 1 21 11.5z"/>',
  clip: '<path d="M21.4 11l-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
  alarm: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3L2 6M22 6l-3-3"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  hash: '<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>',
  pin: '<path d="M12 17v5M9 10.8V3h6v7.8l3 3.2H6z"/>',
  send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  thread: '<path d="M17 6H3M21 12H3M15 18H3"/>',
  newthread: '<path d="M4 7h11M4 12h8M4 17h6"/><path d="M18 14v6M15 17h6"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  share2:
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
  folderplus:
    '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M12 11v6M9 14h6"/>',
  fileplus:
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15h6"/>',
  sort: '<path d="M11 5h10M11 9h7M11 13h4M3 17l3 3 3-3M6 18V4"/>',
  panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  fwd: '<path d="M15 17l5-5-5-5"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/>',
  font: '<path d="M4 20l6-16 6 16M6.5 14h7"/><path d="M15 20c3-1 4-3 5-6"/>',
};

export type BxIconName = keyof typeof ICONS;

/** Icon nét (Figma: icon) — nét từ bảng hằng ICONS ở trên, không lấy từ dữ liệu ngoài. */
export function BxIcon({
  name,
  size = 14,
  className,
  filled,
}: {
  name: BxIconName;
  size?: number;
  className?: string;
  /** Tô kín (ngôi sao dự án yêu thích). */
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("block shrink-0", className)}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}

export const AVATAR_BG: Record<Avatar, string> = {
  blue: "bg-[#3063e8] text-white",
  orange: "bg-[#ef9f27] text-[#18213f]",
  green: "bg-[#34a873] text-white",
  purple: "bg-[#744bfe] text-white",
  navy: "bg-[#23305e] text-white",
};

/** Avatar tròn (file mẫu: .bav). Chồng lên nhau khi đứng cạnh nhau (-6px). */
export function Av({
  tone,
  text,
  size = 20,
  ring = true,
  presence,
  className,
}: {
  tone: Avatar;
  text?: string;
  size?: number;
  ring?: boolean;
  presence?: "on" | "away";
  className?: string;
}) {
  return (
    <i
      className={cn(
        "relative inline-grid shrink-0 place-items-center rounded-full font-bold not-italic [&+&]:-ml-1.5",
        AVATAR_BG[tone],
        ring && "shadow-[0_0_0_2px_#fff]",
        size >= 28 ? "text-[10px]" : "text-[8px]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {text}
      {presence && (
        <span
          className={cn(
            "absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-white",
            presence === "on" ? "bg-[#22c55e]" : "bg-[#ef4444]",
          )}
        />
      )}
    </i>
  );
}

/** Chữ đang gõ trong demo: hiện con trỏ nhấp nháy phía sau. */
export function Typed({ text, caret }: { text: string; caret?: boolean }) {
  return <span className={cn(caret && "bh-caret")}>{text}</span>;
}

/** Chữ tin nhắn, tô tím các @nhắc tên. */
export function Mentions({ text }: { text: string }) {
  return (
    <>
      {text.split(/(@\S+)/).map((part, index) =>
        part.startsWith("@") ? (
          <span key={index} className="text-[#7c3aed]">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

const STATUS_STYLE: Record<CardStatus, string> = {
  Active: "bg-[#fdeeb5] text-[#b8860b]",
  Completed: "bg-[#b7ebcf] text-[#11663b]",
  Pending: "bg-[#e5e7eb] text-[#4b5563]",
};

/** Nhãn trạng thái thẻ (file mẫu: .bx-st). */
export function Status({ status }: { status: CardStatus }) {
  return (
    <em
      className={cn(
        "inline-block rounded-[5px] px-[9px] py-[3px] text-[10px] font-semibold whitespace-nowrap not-italic",
        STATUS_STYLE[status],
      )}
    >
      {status}
    </em>
  );
}

/** Thanh % hoàn thành + chữ "x% completed" (file mẫu: .bx-prog, .bx-pl). */
export function Progress({ value }: { value: number }) {
  const tone =
    value >= 100
      ? ["bg-[#1f7a3f]", "text-[#1f7a3f]"]
      : value < 40
        ? ["bg-[#b5d96a]", "text-[#7aa33a]"]
        : ["bg-[#f5b301]", "text-[#d49b00]"];
  return (
    <div>
      <div className="h-1 overflow-hidden rounded bg-[#e5e7eb]">
        <i className={cn("block h-full rounded", tone[0])} style={{ width: `${value}%` }} />
      </div>
      <small className={cn("mt-0.5 block text-[9px]", tone[1])}>{value}% completed</small>
    </div>
  );
}

/** Ô đếm đỏ cạnh mục menu (file mẫu: .ct). */
function Count({ n }: { n: number }) {
  return (
    <em className="grid h-4 min-w-[18px] place-items-center rounded px-[5px] text-[10px] font-bold text-[#9b1c1c] not-italic [background:#f3b4b4]">
      {n}
    </em>
  );
}

/** Mục đang mở ở thanh bên; "none" = màn không thuộc mục nào (Analysis, Notifications…). */
export type SideView = "board" | "chat" | "set" | "none";

const SUB_ITEMS: { key: string; icon: BxIconName; label: string; count?: number }[] = [
  { key: "board", icon: "grid", label: "Board" },
  { key: "chat", icon: "chat", label: "Channels", count: 22 },
  { key: "wiki", icon: "doc", label: "Wiki", count: 3 },
  { key: "mem", icon: "users", label: "Members" },
  { key: "set", icon: "gear", label: "Settings" },
];

/** Thanh bên đầy đủ (Figma: bx-side) — dùng ở màn Board và Channels. */
function SideFull({ view, hover }: { view: SideView; hover: string | null }) {
  const project = (
    letter: string,
    name: string,
    open?: boolean,
    star?: boolean,
    count?: number,
  ) => (
    <div
      className={cn(
        "flex items-center gap-[7px] rounded-[6px] p-1.5 font-medium text-[#30343c]",
        open && "bg-[#f7f8fa]",
      )}
    >
      <b className="grid size-[18px] shrink-0 place-items-center rounded bg-[#2556c5] text-[10px] text-white">
        {letter}
      </b>
      <span className="min-w-0 flex-1 truncate">{name}</span>
      {star && <BxIcon name="star" size={12} filled className="text-[#f5a524]" />}
      {count ? <Count n={count} /> : null}
      <BxIcon name={open ? "up" : "down"} size={13} />
    </div>
  );

  return (
    <aside className="flex flex-col gap-0.5 overflow-hidden border-r border-[#e5e7eb] px-2 py-2.5 text-[11.5px]">
      <div className="flex items-center justify-between px-1 pt-0.5 pb-2.5">
        <Image src="/images/home/balheh-logo.svg" alt="" width={75} height={22} />
        <BxIcon name="menu" size={16} className="text-[#2556c5]" />
      </div>
      <div className="mb-2 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[#6b7280] shadow-[inset_0_0_0_1px_#e5e7eb]">
        <BxIcon name="search" size={13} />
        <span>Search</span>
      </div>
      <div className="flex items-center gap-2 rounded-[6px] px-2 py-1.5 text-[#30343c]">
        <BxIcon name="grid" size={15} className="text-[#2556c5]" />
        <span>Dashboard</span>
      </div>
      <div className="mx-1.5 mt-2 mb-0.5 flex items-center justify-between text-[10px] font-semibold text-[#4b5563]">
        <span>PROJECTS</span>
        <BxIcon name="plus" size={12} />
      </div>
      <div className="mx-1.5 mt-1.5 mb-0.5 text-[9px] font-semibold text-[#8a8f99]">
        MY PROJECTS (3)
      </div>
      {project("B", "Brandsite", true, true, 5)}
      <div className="pt-0.5 pb-1 pl-4">
        {SUB_ITEMS.map((item) => {
          const on = item.key === view;
          return (
            <div
              key={item.key}
              data-demo={`nav-${item.key}`}
              className={cn(
                "flex items-center gap-2 rounded-[6px] px-2 py-[5px] text-[#30343c] transition-colors",
                (on || hover === item.key) && "bg-[#e8eefc] text-[#2556c5]",
                on && "font-semibold",
              )}
            >
              <BxIcon name={item.icon} size={14} className="text-[#2556c5]" />
              <span>{item.label}</span>
              {item.count ? (
                <span className="ml-auto">
                  <Count n={item.count} />
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      {project("H", "Healthcare Pjt")}
      {project("E", "Emergency Project")}
      <div className="mx-1.5 mt-1.5 mb-0.5 text-[9px] font-semibold text-[#8a8f99]">
        SHARED WITH ME (1)
      </div>
      {project("H", "Homepage Pjt", false, true)}
      <div className="mt-auto border-t border-[#e5e7eb] pt-1">
        <div className="mx-1.5 mt-1.5 mb-0.5 text-[9px] font-semibold text-[#8a8f99]">HOME</div>
        {(
          [
            ["admin", "Admin"],
            ["cal", "Calendar"],
            ["chart", "Analysis"],
          ] as const
        ).map(([icon, label]) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-[6px] px-2 py-1.5 text-[#30343c]"
          >
            <BxIcon name={icon} size={15} className="text-[#2556c5]" />
            <span>{label}</span>
          </div>
        ))}
        <p className="mt-2 text-center text-[9.5px] text-[#30343c]">
          Power by{" "}
          <b className="font-extrabold tracking-[0.02em] text-[#c8102e] italic">TOWNSOFT</b>
        </p>
      </div>
    </aside>
  );
}

export type RailView = "wiki" | "dash";

const RAIL_ITEMS: { key: string; icon: BxIconName; tip: string }[] = [
  { key: "dash", icon: "grid", tip: "Dashboard" },
  { key: "board", icon: "kanban", tip: "Board" },
  { key: "chat", icon: "chat", tip: "Channels" },
  { key: "wiki", icon: "doc", tip: "Wiki" },
  { key: "cal", icon: "cal", tip: "Calendar" },
];

/** Thanh bên thu gọn (Figma: bx-rail) — dùng ở màn Wiki và Dashboard. */
function SideRail({ view, hover }: { view: RailView; hover: string | null }) {
  return (
    <aside className="flex flex-col items-center gap-3 border-r border-[#e5e7eb] px-2 py-2.5 text-[#2556c5]">
      <span className="pt-1.5 pb-1">
        <BxIcon name="menu" size={16} />
      </span>
      <BxIcon name="search" size={16} />
      <small className="mt-1 text-[8px] font-semibold text-[#8a8f99]">MAIN</small>
      {RAIL_ITEMS.map((item) => (
        <i
          key={item.key}
          data-demo={`rail-${item.key}`}
          className={cn(
            "relative grid h-7 w-[30px] place-items-center rounded-[7px] not-italic transition-colors",
            (item.key === view || hover === item.key) && "bg-[#e8eefc]",
          )}
        >
          <BxIcon name={item.icon} size={15} />
          {hover === item.key && (
            <span className="absolute top-1/2 left-[38px] z-[5] -translate-y-1/2 rounded-[5px] bg-[#1d1f24] px-2 py-1 text-[10.5px] font-medium whitespace-nowrap text-white">
              {item.tip}
            </span>
          )}
        </i>
      ))}
      <small className="mt-1 text-[8px] font-semibold text-[#8a8f99]">PROJECT</small>
      <b className="grid size-[18px] place-items-center rounded bg-[#2556c5] text-[10px] text-white">
        B
      </b>
      <BxIcon name="plus" size={15} />
      <span className="mt-auto text-[7px] font-extrabold text-[#c8102e] italic">TOWNSOFT</span>
    </aside>
  );
}

/** Thanh tiêu đề màn hình: "Brandsite / Boards", nút Create, chuông, cài đặt, avatar (bx-head). */
export function BxHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#e5e7eb] px-4 py-2.5">
      <h5 className="truncate text-[17px] font-bold tracking-[-0.01em] text-[#1d1f24]">
        {title}
        <span className="text-[13px] font-normal text-[#6b7280]"> / {sub}</span>
      </h5>
      <div className="flex shrink-0 items-center gap-2.5 text-[#2556c5]">
        <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#2556c5] px-2.5 py-1.5 text-[11.5px] font-semibold text-white">
          <BxIcon name="plus" size={13} />
          Create
        </span>
        <span className="relative inline-flex">
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

/** Thông báo nhỏ ở đáy cửa sổ ứng dụng (file mẫu: .bx-toast). */
export function BxToast({ text }: { text: string | null }) {
  return (
    <div
      role="status"
      className={cn(
        "absolute bottom-[22px] left-1/2 z-[25] flex -translate-x-1/2 items-center gap-2 rounded-lg bg-white px-3.5 py-[9px] text-[12px] font-medium text-[#1d1f24] shadow-[0_10px_28px_rgba(0,0,0,0.18),inset_3px_0_0_#16a34a] transition-[opacity,transform] duration-300",
        text ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      {text && (
        <>
          <span className="grid size-5 place-items-center rounded-full bg-[#dcfce7] text-[#16a34a]">
            <BxIcon name="check" size={13} />
          </span>
          {text}
        </>
      )}
    </div>
  );
}

/**
 * Cửa sổ trình duyệt mở Balheh (Figma: bx): thanh tab + địa chỉ, thanh bên đầy đủ hoặc thu gọn,
 * vùng màn hình chính. `hover` sáng mục menu bên khi con trỏ demo sắp bấm.
 */
export function AppWindow({
  view,
  hover = null,
  children,
  className,
}: {
  view: SideView | RailView;
  hover?: string | null;
  children: ReactNode;
  className?: string;
}) {
  const rail = view === "wiki" || view === "dash";
  return (
    <div
      className={cn(
        bxInter.className,
        "relative w-[1120px] overflow-hidden rounded-[14px] bg-white text-left text-[#1d1f24] shadow-[0_0_0_1px_rgba(35,48,94,0.08),var(--bh-window-shadow)]",
        className,
      )}
    >
      <div aria-hidden="true" className="flex items-center gap-3 bg-[#e9ebef] px-3 py-2">
        <span className="inline-flex items-center gap-1.5 rounded-t-lg bg-white py-[5px] pr-3.5 pl-2 text-[10.5px] font-semibold">
          <Image src="/images/home/balheh-mark.svg" alt="" width={16} height={14} />
          BALHEH
        </span>
        <span className="max-w-[420px] flex-1 rounded-full bg-white px-3 py-1 text-[11px] text-[#6b7280]">
          balheh.com
        </span>
      </div>
      <div
        className={cn(
          "grid h-[560px] transition-[grid-template-columns] duration-[450ms] ease-[cubic-bezier(0.3,0.7,0.2,1)]",
          rail ? "grid-cols-[48px_1fr]" : "grid-cols-[186px_1fr]",
        )}
      >
        {rail ? <SideRail view={view} hover={hover} /> : <SideFull view={view} hover={hover} />}
        <div className="relative flex min-w-0 flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
