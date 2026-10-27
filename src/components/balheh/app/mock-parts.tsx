import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
 * Mảnh giao diện Balheh dùng chung cho ảnh minh hoạ nhỏ (section Phân quyền, Hướng dẫn): huy hiệu
 * vai trò, ô nhập, ô chọn, khung nền xám. Màu cố định như sản phẩm thật, không theo theme trang.
 */

export { bxInter } from "./app-ui";

export type RoleTone = "owner" | "manager" | "member" | "guest";

/** Thứ tự cột vai trò trong bảng quyền (Chủ dự án → Khách). */
export const ROLE_TONES: [RoleTone, RoleTone, RoleTone, RoleTone] = [
  "owner",
  "manager",
  "member",
  "guest",
];

const ROLE_STYLE: Record<RoleTone, string> = {
  owner: "bg-[#fde0e0] text-[#dc2626]",
  manager: "bg-[#c8f0d8] text-[#15803d]",
  member: "bg-[#e4e8f7] text-[#3b4a9a]",
  guest: "bg-[#fdf0c4] text-[#a16207]",
};

/** Huy hiệu vai trò (file mẫu: .role). */
export function RoleBadge({
  tone,
  children,
  className,
}: {
  tone: RoleTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <em
      className={cn(
        "inline-block rounded-full px-[9px] py-[3px] text-[10px] leading-[14px] font-semibold whitespace-nowrap not-italic",
        ROLE_STYLE[tone],
        className,
      )}
    >
      {children}
    </em>
  );
}

/** Ô nhập trong hộp thoại (file mẫu: .fi). `select` thêm mũi tên xổ xuống. */
export function MockField({
  children,
  select,
  small,
  className,
}: {
  children: ReactNode;
  select?: boolean;
  /** Cỡ nhỏ trong ảnh các bước (cao 22px, chữ 9.5px). */
  small?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex min-w-0 items-center justify-between gap-1.5 rounded-[6px] bg-white whitespace-nowrap text-[#1d1f24] shadow-[inset_0_0_0_1px_#c7cbd3]",
        small ? "h-[22px] px-2 text-[9.5px]" : "h-[27px] px-[9px] text-[10.5px]",
        className,
      )}
    >
      <span className="truncate">{children}</span>
      {select &&
        (small ? (
          <Image src="/images/balheh/bx-chevron-down-sm.svg" alt="" width={11.5} height={11} />
        ) : (
          <Image src="/images/balheh/bx-chevron-down.svg" alt="" width={12} height={12} />
        ))}
    </span>
  );
}

/** Dấu ✓ trong vòng tròn xanh nhạt (Figma: Check). */
export function CheckDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e8eefc]",
        className,
      )}
    >
      <Image src="/images/balheh/bx-check.svg" alt="" width={11.3333} height={11} />
    </span>
  );
}

/** Khung nền xám chứa ảnh ứng dụng (Day: #f4f6fa; Night: thẻ tối có viền). */
export function MockPanel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-[#f4f6fa] dark:bg-card dark:shadow-[inset_0_0_0_1px_var(--line)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
