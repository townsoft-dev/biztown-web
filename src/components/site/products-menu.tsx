"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

type ProductsMenuProps = {
  /** Chữ trên thanh điều hướng ("Sản phẩm"). */
  label: string;
  menu: Dictionary["productMenu"];
  /** href đã tính sẵn cho từng sản phẩm (null = chưa có trang). */
  hrefs: (string | null)[];
  /** Link "Xem tất cả" — section sản phẩm của trang chủ. */
  allHref: string | null;
};

/**
 * Mục "Sản phẩm" trên thanh điều hướng: bấm (hoặc rê chuột trên màn có chuột) để mở danh sách
 * sản phẩm, kiểu thẻ giống section "Khám phá". Đóng khi bấm ra ngoài, nhấn Esc hoặc chọn mục.
 */
export function ProductsMenu({ label, menu, hrefs, allHref }: ProductsMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // Menu vừa mở do rê chuột: cú bấm ngay sau đó giữ menu mở thay vì đóng lại.
  const hoverOpened = useRef(false);

  function onClick() {
    if (hoverOpened.current) {
      hoverOpened.current = false;
      setOpen(true);
      return;
    }
    setOpen((value) => !value);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Rê chuột: mở ngay, đóng trễ một chút để kịp di chuột từ nút xuống bảng.
  function onPointerEnter(event: ReactPointerEvent) {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpened.current = true;
    setOpen(true);
  }
  function onPointerLeave(event: ReactPointerEvent) {
    if (event.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => {
      hoverOpened.current = false;
      setOpen(false);
    }, 150);
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onClick}
        className={cn(
          "flex items-center gap-[5px] text-[15px] leading-6 font-medium whitespace-nowrap transition-colors hover:text-ink",
          open ? "text-ink" : "text-ink-muted",
        )}
      >
        <Icon
          name="chevron-down"
          size={14.2}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
        {label}
      </button>

      {/* Lớp đệm trong suốt nối nút với bảng để rê chuột xuống không bị đóng. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full -left-5 z-50 w-[440px] pt-[22px]"
      >
        <div className="bt-fade rounded-3xl border border-line bg-card p-2 shadow-[0_24px_48px_var(--shadow-navy)]">
          <p className="px-3 pt-2 pb-1 text-[12px] leading-none font-semibold tracking-[0.04em] text-ink-muted uppercase">
            {menu.label}
          </p>
          <ul className="flex flex-col">
            {menu.items.map((item, index) => {
              const href = hrefs[index];
              const body = (
                <>
                  <AppMark mark={item.mark} size={40} fontSize={11} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] leading-6 font-semibold text-ink">
                      {item.name}
                    </span>
                    <span className="block truncate text-[13px] leading-5 text-ink-muted">
                      {item.desc}
                    </span>
                  </span>
                  <StatusBadge status={item.status} label={menu.statusLabels[item.status]} />
                </>
              );
              const className = "flex items-center gap-3 rounded-2xl p-3";
              return (
                <li key={item.name}>
                  {href ? (
                    <a
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(className, "transition-colors hover:bg-card-soft")}
                    >
                      {body}
                    </a>
                  ) : (
                    <span className={className}>{body}</span>
                  )}
                </li>
              );
            })}
          </ul>
          {allHref && (
            <a
              href={allHref}
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-2xl border-t border-line px-3 pt-3 pb-2.5 text-[14px] leading-none font-semibold text-accent-text transition-colors hover:text-ink"
            >
              {menu.all}
              <Icon name="arrow-up-right" size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
