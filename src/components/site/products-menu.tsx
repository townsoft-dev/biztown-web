"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { MsIcon } from "@/components/nhalo/app/app-ui";
import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

type ProductsMenuProps = {
  /** Chữ trên thanh điều hướng ("Sản phẩm"). */
  label: string;
  menu: Dictionary["productMenu"];
  /** href đã tính sẵn cho từng sản phẩm (null = chưa có trang). */
  hrefs: (string | null)[];
  /** Link "Xem tất cả" — section Khám phá của trang chủ. */
  allHref: string | null;
};

/**
 * Mục "Sản phẩm & Dịch vụ" trên thanh điều hướng: bấm (hoặc rê chuột trên màn có chuột) để mở
 * bảng hai cột — trái là sản phẩm (nút "Xem tất cả sản phẩm" cuộn tới section Sản phẩm), phải
 * là dịch vụ web & app theo yêu cầu (nút "Xem dịch vụ" mở townsoftvina.com, doanh nghiệp gốc
 * làm outsourcing). Đóng khi bấm ra ngoài, nhấn Esc hoặc chọn mục.
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
        {label}
        <Icon
          name="chevron-down"
          size={14.2}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* Lớp đệm trong suốt nối nút với bảng để rê chuột xuống không bị đóng. Bảng cùng chất
          liệu kính với thanh menu, có mũi nhọn chỉ lên mục "Sản phẩm" để thấy là một khối. */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full -left-6 z-50 w-[800px] pt-[18px]"
      >
        <span
          aria-hidden="true"
          className="absolute top-[11px] left-[38px] z-[1] size-3.5 rotate-45 rounded-[3px] border-t border-l border-[var(--nav-ring)] bg-card"
        />
        <div className="bt-fade relative grid grid-cols-[1.15fr_1px_1fr] gap-2.5 rounded-[28px] border border-line bg-card p-2.5 shadow-[0_32px_64px_rgba(35,48,94,0.22),0_4px_12px_rgba(35,48,94,0.08)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col">
            <p className="px-3 pt-2 pb-1.5 text-[12px] leading-none font-semibold tracking-[0.06em] text-accent-text uppercase">
              {menu.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {menu.items.map((item, index) => {
                const href = hrefs[index];
                const body = (
                  <>
                    <AppMark mark={item.mark} size={44} fontSize={11} />
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
                const className = "group flex items-center gap-3 rounded-2xl p-3";
                return (
                  <li key={item.name}>
                    {href ? (
                      <a
                        href={href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          className,
                          "transition-[background-color,translate] duration-200 hover:translate-x-1 hover:bg-accent-tint",
                        )}
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
            <p className="px-3 pt-1.5 pb-3 text-[13px] leading-5 text-ink-muted italic">
              {menu.more}
            </p>
            <div className="flex-1" />
            {allHref && (
              <a
                href={allHref}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-navy text-[14.5px] font-semibold text-white transition-colors hover:bg-accent hover:text-on-accent dark:bg-white/12"
              >
                {menu.all}
                <Icon name="arrow-up-right" size={18} />
              </a>
            )}
          </div>

          <span aria-hidden="true" className="my-3 bg-line" />
          <ServicesColumn services={menu.services} onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}

/** Cột phải của bảng: dịch vụ web & app theo yêu cầu, cùng kiểu với cột sản phẩm nhưng gọn hơn. */
export function ServicesColumn({
  services,
  onNavigate,
  className,
}: {
  services: Dictionary["productMenu"]["services"];
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <p className="px-3 pt-2 pb-0.5 text-[12px] leading-none font-semibold tracking-[0.06em] text-accent-text uppercase">
        {services.label}
      </p>
      <p className="px-3 pt-1.5 pb-1.5 text-[13px] leading-5 text-ink-muted">{services.lead}</p>
      <ul className="flex flex-col gap-0.5">
        {services.items.map((item) => (
          <li key={item.name} className="flex items-center gap-2.5 rounded-xl px-3 py-1.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-accent-tint text-accent-text">
              <MsIcon name={item.icon} size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] leading-5 font-semibold text-ink">
                {item.name}
              </span>
              <span className="block truncate text-[12.5px] leading-[18px] text-ink-muted">
                {item.desc}
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="min-h-2 flex-1" />
      <a
        href={siteConfig.townsoftUrl}
        target="_blank"
        rel="noopener"
        onClick={onNavigate}
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-navy text-[14.5px] font-semibold text-white transition-colors hover:bg-accent hover:text-on-accent dark:bg-white/12"
      >
        {services.cta}
        <Icon name="arrow-up-right" size={18} />
      </a>
    </div>
  );
}
