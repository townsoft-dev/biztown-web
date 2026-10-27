"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Nút ☰ và menu thả xuống cho màn hẹp (mặc định dưới 1024px). Bấm một link thì tự đóng. */
export function NhaloMobileMenu({
  links,
  openLabel,
  closeLabel,
  menuLabel,
  className = "lg:hidden",
  children,
}: {
  links: { label: string; href: string }[];
  openLabel: string;
  closeLabel: string;
  menuLabel: string;
  /** Mốc ẩn nút ☰ — trùng mốc hiện menu ngang của thanh điều hướng. */
  className?: string;
  /** Phần cuối menu: chọn ngôn ngữ, nút "Dùng miễn phí". */
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
        className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-full bg-card-soft"
      >
        <span
          className={cn(
            "h-0.5 w-[18px] rounded-sm bg-ink transition-transform",
            open && "translate-y-[3.5px] rotate-45",
          )}
        />
        <span
          className={cn(
            "h-0.5 w-[18px] rounded-sm bg-ink transition-transform",
            open && "-translate-y-[3.5px] -rotate-45",
          )}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-page px-5 pt-2 pb-5 shadow-[0_12px_24px_var(--shadow-soft)]"
      >
        <nav aria-label={menuLabel}>
          <ul className="grid gap-0.5">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-2 py-3 text-[17px] font-medium text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className="mt-3 flex flex-wrap items-center justify-between gap-3"
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
