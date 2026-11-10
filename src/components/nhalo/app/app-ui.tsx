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

/**
 * Cuộn trong màn hình (file mẫu: .dev.sc): "body" — chỉ phần thân (BODY trong screens.tsx) cuộn,
 * thanh trạng thái/tiêu đề/thanh dưới đứng yên, nút "+" dính đáy; "screen" — cả màn hình cuộn.
 */
const SCROLL_CLASSES = {
  body: "[&_.app-body]:overflow-y-auto [&_.app-body]:overscroll-contain [&_.app-body]:pb-4 [&_.app-body]:[scrollbar-width:none] [&_.app-body::-webkit-scrollbar]:hidden [&_.app-body>*]:shrink-0 [&_.app-fab]:sticky [&_.app-fab]:right-auto [&_.app-fab]:bottom-3 [&_.app-fab]:-mt-[60px] [&_.app-fab]:self-end",
  screen:
    "overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:shrink-0",
} as const;

/** Khung điện thoại (Figma: Phone shell). Tỉ lệ thu nhỏ đặt bằng biến CSS --s ở className. */
export function Phone({
  height = 812,
  scroll,
  device,
  className,
  children,
}: {
  /** Chiều cao màn hình ở khổ gốc 375px. */
  height?: number;
  /** Vẽ giống máy thật hơn: viền kim loại, Dynamic Island, nút cạnh, ánh phản chiếu. */
  device?: boolean;
  /** Cho người xem tự kéo lên xuống trong màn hình. */
  scroll?: keyof typeof SCROLL_CLASSES;
  className?: string;
  children: ReactNode;
}) {
  return (
    // data-nosnippet: nội dung trong màn hình là dữ liệu mẫu (tên nhà trọ, số phòng, số tiền),
    // không nên xuất hiện trong đoạn trích trên Google. Xem hero.tsx của trang chủ.
    <div
      aria-hidden="true"
      data-nosnippet
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
        className={cn(
          "absolute top-0 left-0 origin-top-left rounded-[54px] bg-navy-950 p-[10px]",
          device &&
            "shadow-[0_0_0_2.5px_#8c93ab,0_0_0_4px_#2b3150,inset_0_0_0_1.5px_rgba(255,255,255,0.12)]",
        )}
        style={{ width: 395, height: height + 20, transform: "scale(var(--s, 1))" }}
      >
        {device && (
          <>
            {/* Nút cạnh: Action + âm lượng (trái), nguồn (phải). */}
            <span className="absolute top-[150px] -left-[6px] h-[34px] w-[4px] rounded-l-[3px] bg-[#6e7590]" />
            <span className="absolute top-[205px] -left-[6px] h-[62px] w-[4px] rounded-l-[3px] bg-[#6e7590]" />
            <span className="absolute top-[280px] -left-[6px] h-[62px] w-[4px] rounded-l-[3px] bg-[#6e7590]" />
            <span className="absolute top-[235px] -right-[6px] h-[96px] w-[4px] rounded-r-[3px] bg-[#6e7590]" />
            {/* Dynamic Island. */}
            <span className="absolute top-[21px] left-1/2 z-20 flex h-[34px] w-[118px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-3">
              <span className="size-[11px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#3d4a7a,#0b0f1f_70%)]" />
            </span>
            {/* Ánh phản chiếu trên mặt kính. */}
            <span className="pointer-events-none absolute inset-[10px] z-20 rounded-[44px] bg-[linear-gradient(115deg,rgba(255,255,255,0.16),rgba(255,255,255,0)_32%)]" />
          </>
        )}
        <div
          data-scroller={scroll === "screen" ? "" : undefined}
          className={cn(
            "relative flex h-full flex-col rounded-[44px] bg-[#fff7ea] text-left text-navy",
            scroll === "screen" ? "overflow-x-hidden" : "overflow-hidden",
            scroll && SCROLL_CLASSES[scroll],
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** Nền màn hình app NhàLo Lite (kem sáng). */
export const APP_BG = "bg-[#fff7ea]";

/** Thanh trạng thái iOS trên nền kem như NhàLo Lite: giờ, sóng, pin màu navy. */
export function StatusBar() {
  return (
    <div className={cn("flex h-11 shrink-0 items-center justify-between px-6 text-navy", APP_BG)}>
      <span className="text-[15px] leading-[20.25px] font-semibold">9:41</span>
      <span className="flex items-end gap-[2px]">
        {[5, 7, 9, 11].map((height) => (
          <span key={height} className="w-[3px] rounded-[1px] bg-navy" style={{ height }} />
        ))}
        <span className="ml-1.5 h-[11px] w-[22px] rounded-[3px] border-[1.5px] border-navy p-[1.5px]">
          <span className="block h-full w-3/4 rounded-[1px] bg-navy" />
        </span>
      </span>
    </div>
  );
}

/**
 * Thanh tiêu đề NhàLo Lite: nút quay lại (hoặc đóng ✕ ở màn tạo mới) là ô vuông bo góc viền kem
 * bên trái, tiêu đề + dòng phụ căn giữa, nền kem liền với thân màn hình.
 */
export function TopBar({
  title,
  sub,
  size = "lg",
  close,
}: {
  title: string;
  sub?: string;
  size?: "lg" | "sm";
  /** Màn tạo mới: nút ✕ bên phải thay cho ← bên trái (như "Thêm nhà"). */
  close?: boolean;
}) {
  const button = (icon: string) => (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-[#f0dfc2] bg-white text-navy">
      <MsIcon name={icon} size={18} />
    </span>
  );
  return (
    <div className={cn("flex shrink-0 items-center gap-2 px-4 pt-1 pb-3", APP_BG)}>
      {close ? <span className="size-9 shrink-0" /> : button("arrow_back")}
      <span className="flex min-w-0 flex-1 flex-col items-center text-center">
        <span
          className={cn(
            "max-w-full truncate font-semibold text-navy",
            size === "lg" ? "text-[16.5px] leading-[1.3]" : "text-[15px] leading-[1.3]",
          )}
        >
          {title}
        </span>
        {sub && (
          <span className="max-w-full truncate text-[11px] leading-[1.4] text-app-secondary">
            {sub}
          </span>
        )}
      </span>
      {close ? button("close") : <span className="size-9 shrink-0" />}
    </div>
  );
}

const NAV_ICONS = ["home", "account_balance_wallet", "menu_book", "person"] as const;

/** Thanh điều hướng dưới, 4 tab như NhàLo Lite: Trang chủ · Thu tiền · Tra cứu · Tài khoản. */
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
  anno,
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
  /** Số chú thích trỏ vào ô này (AnnotatedScreen). */
  anno?: number;
  className?: string;
}) {
  return (
    <div data-anno={anno} className={cn("flex min-w-0 flex-1 flex-col gap-[5px]", className)}>
      <span className="text-[12px] leading-[1.35] text-ink-muted">{label}</span>
      <span
        data-demo={demo}
        className={cn(
          "flex h-11 items-center justify-between gap-2 rounded-[10px] border-[1.25px] px-3 transition-[border-color,box-shadow] duration-300",
          muted ? "border-[#f0dfc2] bg-[#fbf3e4]" : "border-[#f0dfc2] bg-white",
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
export function Badge({
  tone,
  anno,
  children,
}: {
  tone: BadgeTone;
  anno?: number;
  children: ReactNode;
}) {
  return (
    <span
      data-anno={anno}
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
  anno,
  children,
}: {
  variant: keyof typeof BUTTON_VARIANTS;
  size?: "md" | "sm";
  pressed?: boolean;
  demo?: string;
  anno?: number;
  children: ReactNode;
}) {
  return (
    <span
      data-demo={demo}
      data-anno={anno}
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
export function GroupLabel({ anno, children }: { anno?: number; children: ReactNode }) {
  return (
    <span data-anno={anno} className="text-[12px] leading-[1.35] text-app-faint uppercase">
      {children}
    </span>
  );
}

/** Một dòng khoá/giá trị có gạch chân (Figma: Detail row). */
export function DetailRow({
  label,
  value,
  strong,
  anno,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  /** Giá trị in đậm (màn Hợp đồng, hoá đơn người thuê). */
  strong?: boolean;
  anno?: number;
  className?: string;
}) {
  return (
    <div
      data-anno={anno}
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

/** Nút tròn cam "+" góc dưới (Figma: FAB). */
export function Fab({
  className,
  demo,
  anno,
}: {
  className?: string;
  demo?: string;
  anno?: number;
}) {
  return (
    <span
      data-demo={demo}
      data-anno={anno}
      className={cn(
        // app-fab: mốc để Phone scroll="body" đổi nút sang dính đáy vùng cuộn.
        "app-fab absolute flex size-12 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_8px_8px_rgba(239,159,39,0.4)]",
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
