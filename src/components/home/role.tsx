"use client";

import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { TagChip } from "@/components/ui/tag-chip";
import type { HomeContent } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { useInView } from "./use-in-view";
import { Reveal } from "./reveal";

/** Section "Người cộng sự công nghệ cho doanh nghiệp ít nhân sự" (Figma: bt-section s-role). */
export function Role({ content }: { content: HomeContent["role"] }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);

  return (
    <section id={HOME_SECTIONS.about} className="bt-wrap py-14">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
        <Reveal className="flex flex-col items-start">
          <TagChip label={content.tag} />
          <h2 className="bt-h2 mt-[22px]">{content.title}</h2>
          <p className="bt-lead mt-4">{content.lead}</p>
          <button type="button" className="bt-btn bt-btn-primary mt-8">
            {content.cta}
          </button>
          <div className="mt-8 w-full rounded-3xl bg-card-soft p-6">
            <h3 className="text-[16px] leading-[25.6px] font-semibold text-ink">
              {content.asideTitle}
            </h3>
            <ul className="mt-3 flex flex-col gap-3">
              {content.asideLinks.map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-[16px] leading-[25.6px] font-semibold text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-7 items-center justify-center rounded-full border-[1.5px] border-line-strong"
                  >
                    <Icon name="arrow-up-right" size={14} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div
            ref={ref}
            aria-hidden="true"
            className="relative flex min-h-[640px] items-center justify-center overflow-hidden rounded-[32px] bg-[image:var(--warm-bg)] px-4 max-sm:min-h-[480px]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[image:var(--warm-grid)] bg-size-[100px_100px]" />
            <ul className="relative flex w-full max-w-[499.2px] flex-col gap-3">
              {content.toasts.map((toast, index) => (
                <li
                  key={toast.title}
                  className={cn(
                    "bt-reveal flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-navy shadow-[0_1px_1px_rgba(35,48,94,0.06)]",
                    inView && "is-in",
                  )}
                  style={{ transitionDelay: `${index * 350}ms` }}
                >
                  <AppMark mark={toast.mark} size={36} radius={12} fontSize={14} surface="light" />
                  <span className="max-w-[257px]">
                    <span className="block text-[14px] leading-[18.9px] font-semibold">
                      {toast.title}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-[16.2px] text-[#5a6283]">
                      {toast.meta}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
