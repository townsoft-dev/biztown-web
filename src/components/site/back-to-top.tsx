"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/** Nút tròn cam góc phải dưới, hiện khi đã cuộn quá một màn hình (Figma: Back to top). */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0 })}
      className={cn(
        "fixed right-6 bottom-6 z-40 flex size-[52px] items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_12px_32px_rgba(166,95,0,0.28)] transition-all duration-300",
        visible ? "opacity-100" : "pointer-events-none translate-y-2.5 opacity-0",
      )}
    >
      <Icon name="arrow-up" size={22} />
    </button>
  );
}
