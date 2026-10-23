import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
 * Bộ phận giao diện ứng dụng NhàLo trong mockup điện thoại (Figma: MVP Wireframes V3). Dựng ở
 * khổ gốc 375px rồi thu nhỏ cả khung bằng <Phone> — số đo ở đây là số Figma chia cho tỉ lệ
 * thu nhỏ của từng chỗ dùng (hero 0.8, "Cách hoạt động" 0.74...). Màu cố định, không theo theme.
 */

/** Glyph Material Symbols Rounded (Figma: Icon) — file SVG tải từ Google Fonts, tô currentColor. */
export function MsIcon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("bt-icon", className)}
      style={
        {
          width: size,
          height: size,
          "--icon": `url(/images/nhalo/ms/${name}.svg)`,
        } as CSSProperties
      }
    />
  );
}

/** Khung điện thoại (Figma: Phone shell). Tỉ lệ thu nhỏ đặt bằng biến CSS --s ở className. */
export function Phone({
  height = 812,
  className,
  children,
}: {
  /** Chiều cao màn hình ở khổ gốc 375px. */
  height?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative shrink-0 rounded-[calc(54px*var(--s,1))] shadow-[0_12px_32px_rgba(35,48,94,0.14)] select-none",
        className,
      )}
      style={{
        width: "calc(395px * var(--s, 1))",
        height: `calc(${height + 20}px * var(--s, 1))`,
      }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left rounded-[54px] bg-navy-950 p-[10px]"
        style={{ width: 395, height: height + 20, transform: "scale(var(--s, 1))" }}
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-[44px] bg-gray-50 text-left text-navy">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Thanh trạng thái iOS (Figma: Device status). */
export function StatusBar() {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between bg-navy px-6">
      <span className="text-[15px] leading-[20.25px] text-white">9:41</span>
      <span className="flex items-center gap-[5px]">
        <Image src="/images/nhalo/ios-signal.svg" alt="" width={18} height={18} />
        <Image src="/images/nhalo/ios-wifi.svg" alt="" width={18} height={18} />
        <Image src="/images/nhalo/ios-battery.svg" alt="" width={24} height={18} />
      </span>
    </div>
  );
}

/**
 * Thanh tiêu đề màu navy (Figma: Top bar · Title). "sm" là cỡ chữ nhỏ hơn ở các màn hình
 * Hợp đồng/Phân quyền trong design.
 */
export function TopBar({
  title,
  sub,
  size = "lg",
}: {
  title: string;
  sub?: string;
  size?: "lg" | "sm";
}) {
  return (
    <div className="flex shrink-0 flex-col gap-0.5 bg-navy px-4 pt-3.5 pb-4">
      <div className="flex items-center gap-2">
        <span className="flex size-[26px] items-center justify-center rounded-full bg-white/14 text-white">
          <MsIcon name="arrow_back" size={16} />
        </span>
        <span
          className={cn(
            "font-semibold whitespace-nowrap text-white",
            size === "lg" ? "text-[16.8px] leading-[21.84px]" : "text-[13.4px] leading-[17.5px]",
          )}
        >
          {title}
        </span>
      </div>
      <span
        className={cn(
          "text-app-sub",
          size === "lg" ? "text-[11.2px] leading-[17.92px]" : "text-[9px] leading-[14.3px]",
        )}
      >
        {sub ?? " "}
      </span>
    </div>
  );
}

const NAV_ICONS = ["home", "group", "receipt_long", "person"] as const;

/** Thanh điều hướng dưới, 4 tab (Figma: Bottom navigation). */
export function BottomNav({ labels, active }: { labels: readonly string[]; active: number }) {
  return (
    <div className="grid h-16 shrink-0 grid-cols-4 border-t border-app-nav-line bg-white px-1 pt-2 pb-3.5">
      {NAV_ICONS.map((icon, index) => (
        <span
          key={icon}
          className={cn(
            "flex flex-col items-center gap-[3px] py-1",
            index === active ? "text-navy" : "text-app-tertiary",
          )}
        >
          <MsIcon name={icon} />
          <span className="text-[9.6px] leading-none font-semibold whitespace-nowrap">
            {labels[index]}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Nhãn ô nhập + ô giá trị (Figma: Field). */
export function Field({
  label,
  value,
  icon,
  muted,
  placeholder,
  active,
  demo,
  className,
}: {
  label: string;
  value: string;
  icon?: string;
  /** Ô chỉ đọc (nền xám). */
  muted?: boolean;
  /** Đang hiện chữ gợi ý chứ chưa có giá trị. */
  placeholder?: boolean;
  /** Đang nhập (viền navy đậm). */
  active?: boolean;
  /** Mốc cho con trỏ demo ở hero. */
  demo?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-[5px]", className)}>
      <span className="text-[12px] leading-[1.35] text-ink-muted">{label}</span>
      <span
        data-demo={demo}
        className={cn(
          "flex h-11 items-center justify-between gap-2 rounded-[10px] border-[1.25px] px-3 transition-[border-color,box-shadow] duration-300",
          muted ? "border-slate-200 bg-gray-50" : "border-slate-200 bg-white",
          active && "border-navy shadow-[inset_0_0_0_1px_#23305e]",
        )}
      >
        <span
          className={cn(
            "truncate text-[15px] leading-[20.25px]",
            placeholder ? "text-app-tertiary" : "text-ink-muted",
          )}
        >
          {value}
        </span>
        {icon && <MsIcon name={icon} size={19.2} className="text-navy" />}
      </span>
    </div>
  );
}

const BADGE_TONES = {
  green: "bg-app-green-bg text-app-green",
  orange: "bg-orange-50 text-orange-800",
  blue: "bg-app-blue-bg text-app-blue",
  red: "bg-app-red-bg text-app-red",
  gray: "bg-gray-50 text-ink-muted",
} as const;

export type BadgeTone = keyof typeof BADGE_TONES;

/** Nhãn trạng thái dạng viên thuốc (Figma: Status). */
export function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-[9px] py-1 text-[12px] leading-[1.35] font-semibold whitespace-nowrap transition-colors duration-300",
        BADGE_TONES[tone],
      )}
    >
      {children}
    </span>
  );
}

const BUTTON_VARIANTS = {
  primary: "bg-accent text-on-accent",
  outline: "border-[1.5px] border-navy text-navy",
  dark: "bg-navy-950 text-white",
} as const;

/** Nút trong app (Figma: PillButton bo 12px). "sm" là cỡ nút ở màn Hợp đồng/Phân quyền. */
export function AppButton({
  variant,
  size = "md",
  pressed,
  demo,
  children,
}: {
  variant: keyof typeof BUTTON_VARIANTS;
  size?: "md" | "sm";
  pressed?: boolean;
  demo?: string;
  children: ReactNode;
}) {
  return (
    <span
      data-demo={demo}
      className={cn(
        "flex min-w-0 flex-1 items-center justify-center rounded-xl font-semibold whitespace-nowrap transition-transform duration-150",
        size === "md" ? "h-[38.4px] text-[11.2px]" : "h-[30.7px] text-[9px]",
        BUTTON_VARIANTS[variant],
        pressed && "scale-[0.97]",
      )}
    >
      {children}
    </span>
  );
}

/** Nhãn nhóm chữ hoa (Figma: Label · line-strong). */
export function GroupLabel({ children }: { children: ReactNode }) {
  return <span className="text-[12px] leading-[1.35] text-app-faint uppercase">{children}</span>;
}

/** Một dòng khoá/giá trị có gạch chân (Figma: Detail row). */
export function DetailRow({
  label,
  value,
  strong,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  /** Giá trị in đậm (màn Hợp đồng, hoá đơn người thuê). */
  strong?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 border-b border-gray-100 py-[9px] last:border-b-0",
        className,
      )}
    >
      <span className="min-w-0 flex-1 text-ink-muted">{label}</span>
      <span className={cn("min-w-0 flex-1 text-right text-navy", strong && "font-semibold")}>
        {value}
      </span>
    </div>
  );
}

export type ChipKind = "paid" | "sent" | "overdue" | "current" | "scheduled" | "missed" | "more";

const CHIP_KINDS: Record<ChipKind, string> = {
  paid: "bg-chip-paid text-white",
  sent: "bg-chip-sent text-white",
  overdue: "bg-chip-overdue text-white",
  current: "border-[1.5px] border-accent bg-white text-accent",
  scheduled: "border-[1.5px] border-dashed border-slate-200 bg-white text-slate-200",
  missed: "border-[1.5px] border-dashed border-chip-overdue bg-white text-chip-overdue",
  more: "border-[1.5px] border-app-hairline bg-white text-app-secondary",
};

/** Ô lịch hoá đơn theo kỳ (Figma: Invoice schedule chip). */
export function PeriodChips({
  chips,
  size = "md",
  demo,
}: {
  chips: { kind: ChipKind; label: string }[];
  size?: "md" | "sm";
  demo?: string;
}) {
  return (
    <span data-demo={demo} className="flex gap-1.5">
      {chips.map((chip, index) => (
        <span
          key={index}
          className={cn(
            "flex shrink-0 items-center justify-center rounded-[9px] px-1.5 font-bold whitespace-nowrap transition-colors duration-300",
            size === "md"
              ? "h-[30px] min-w-[34px] text-[8.8px]"
              : "h-[30px] min-w-[34px] text-[7px]",
            CHIP_KINDS[chip.kind],
          )}
        >
          {chip.label}
        </span>
      ))}
    </span>
  );
}

/** Nút tròn cam "+" góc dưới (Figma: FAB). */
export function Fab({ className, demo }: { className?: string; demo?: string }) {
  return (
    <span
      data-demo={demo}
      className={cn(
        "absolute flex size-12 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_8px_8px_rgba(239,159,39,0.4)]",
        className,
      )}
    >
      <MsIcon name="add" />
    </span>
  );
}

/** Ô đánh dấu vuông (Figma: Selection). */
export function Checkbox({ checked, size = 18 }: { checked: boolean; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[4px] border-[1.25px] border-navy bg-white text-navy"
      style={{ width: size, height: size }}
    >
      {checked && <MsIcon name="check" size={size - 2} />}
    </span>
  );
}

/** Định dạng số tiền kiểu Việt Nam: 3183200 → "3.183.200". */
export function dots(value: number) {
  return Math.abs(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Thay {n} trong chuỗi mẫu. */
export function fill(template: string, value: string | number) {
  return template.replace("{n}", String(value));
}
