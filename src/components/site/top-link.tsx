"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/** Bỏ dấu "/" cuối để so "/nhalo" với "/nhalo/" (trailingSlash). */
function trimSlash(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

/**
 * Link tới một trang (logo trên thanh điều hướng). Đang ở đúng trang đó thì cuộn lên đầu trang
 * và bỏ #section khỏi địa chỉ — Next không tự cuộn khi bấm link trỏ về chính trang hiện tại.
 */
export function TopLink({
  href,
  onClick,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    // Giữ hành vi mở tab mới (Ctrl/⌘ + bấm, chuột giữa).
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
    if (event.shiftKey || event.altKey || trimSlash(pathname) !== trimSlash(href)) return;
    event.preventDefault();
    window.history.replaceState(null, "", href);
    window.scrollTo({ top: 0 });
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
