"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

type MenuLink = { label: string; href: string | null };

type MobileMenuProps = {
  /** Nhãn nút mở menu (cho trình đọc màn hình). */
  label: string;
  /** Các mục điều hướng; mục đầu ("Sản phẩm") mở thêm danh sách sản phẩm. */
  links: MenuLink[];
  productMenu: Dictionary["productMenu"];
  productHrefs: (string | null)[];
  /** Nút theme + chọn ngôn ngữ — chỉ hiện trong menu khi thanh điều hướng đã ẩn chúng (< sm). */
  settings: ReactNode;
  /** Nút "Bắt đầu miễn phí" — chỉ hiện trong menu khi thanh điều hướng đã ẩn nó (< md). */
  cta: ReactNode;
  className?: string;
};

/**
 * Nút ☰ trên thanh điều hướng khi màn hẹp hơn xl: mở bảng chứa những mục thanh điều hướng đã
 * ẩn. Thanh ẩn dần theo độ rộng (xl: menu chữ, md: nút "Bắt đầu miễn phí", sm: theme + ngôn
 * ngữ) và bảng hiện đúng các mục đó. Đóng khi bấm ra ngoài, nhấn Esc hoặc chọn mục.
 */
export function MobileMenu({
  label,
  links,
  productMenu,
  productHrefs,
  settings,
  cta,
  className,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const panelId = useId();
  const productsId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

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

  const close = () => setOpen(false);
  const linkClass =
    "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-[16px] leading-6 font-medium text-ink";

  return (
    // Không đặt relative: bảng canh theo <nav> để rộng hết thanh trên mobile.
    <div ref={rootRef} className={className}>
      <button
        type="button"
        aria-label={label}
        title={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex size-11 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full bg-card-soft text-ink"
      >
        {/* Ba gạch, khi mở xoay thành dấu ×. */}
        <span
          aria-hidden="true"
          className={cn(
            "h-[2px] w-[18px] rounded-full bg-current transition-transform duration-200",
            open && "translate-y-[7px] rotate-45",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "h-[2px] w-[18px] rounded-full bg-current transition-opacity duration-200",
            open && "opacity-0",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "h-[2px] w-[18px] rounded-full bg-current transition-transform duration-200",
            open && "-translate-y-[7px] -rotate-45",
          )}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full right-0 left-0 z-50 pt-2 sm:left-auto sm:w-[380px]"
      >
        <div className="bt-fade max-h-[calc(100dvh-96px)] overflow-y-auto rounded-3xl border border-line bg-card p-2 shadow-[0_24px_48px_var(--shadow-navy)]">
          <ul className="flex flex-col">
            {links.map((link, index) => {
              if (index === 0) {
                return (
                  <li key={link.label}>
                    <button
                      type="button"
                      aria-expanded={productsOpen}
                      aria-controls={productsId}
                      onClick={() => setProductsOpen((value) => !value)}
                      className={cn(linkClass, "transition-colors hover:bg-card-soft")}
                    >
                      {link.label}
                      <Icon
                        name="chevron-down"
                        size={18}
                        className={cn(
                          "text-ink-muted transition-transform duration-200",
                          productsOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <div id={productsId} hidden={!productsOpen} className="pb-1">
                      <ul className="flex flex-col">
                        {productMenu.items.map((item, itemIndex) => {
                          const href = productHrefs[itemIndex];
                          const body = (
                            <>
                              <AppMark mark={item.mark} size={32} fontSize={9} />
                              <span className="min-w-0 flex-1 truncate text-[15px] leading-6 font-medium text-ink">
                                {item.name}
                              </span>
                              <StatusBadge
                                status={item.status}
                                label={productMenu.statusLabels[item.status]}
                              />
                            </>
                          );
                          const itemClass = "flex items-center gap-3 rounded-2xl py-2 pr-3 pl-5";
                          return (
                            <li key={item.name}>
                              {href ? (
                                <a
                                  href={href}
                                  onClick={close}
                                  className={cn(itemClass, "transition-colors hover:bg-card-soft")}
                                >
                                  {body}
                                </a>
                              ) : (
                                <span className={itemClass}>{body}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      {link.href && (
                        <a
                          href={link.href}
                          onClick={close}
                          className="flex items-center justify-between rounded-2xl py-2.5 pr-3 pl-5 text-[14px] leading-none font-semibold text-accent-text transition-colors hover:text-ink"
                        >
                          {productMenu.all}
                          <Icon name="arrow-up-right" size={18} />
                        </a>
                      )}
                    </div>
                  </li>
                );
              }
              return (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      onClick={close}
                      className={cn(linkClass, "transition-colors hover:bg-card-soft")}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className={cn(linkClass, "text-ink-muted")}>{link.label}</span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-1 flex items-center justify-between gap-3 border-t border-line px-3 pt-3 pb-1 sm:hidden">
            {settings}
          </div>
          <div className="px-1 pt-3 pb-1 md:hidden">{cta}</div>
        </div>
      </div>
    </div>
  );
}
