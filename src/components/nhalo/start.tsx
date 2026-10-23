import { Reveal } from "@/components/home/reveal";
import type { NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { NhaloSectionHead } from "./parts";

/** "Vào việc trong vài phút" — 4 bước bắt đầu (Figma: Getting started). */
export function NhaloStart({ content }: { content: NhaloContent["start"] }) {
  return (
    <section id={NHALO_SECTIONS.start} className="bt-wrap py-[88px] max-md:py-16">
      <NhaloSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      <Reveal className="mt-11 flex flex-col items-center gap-11">
        <ol className="grid w-full max-w-[1264px] gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => {
            const first = index === 0;
            return (
              <li key={step.title} className="flex flex-col items-center gap-2 text-center">
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full text-[17px] leading-none font-bold",
                    first
                      ? "bg-accent text-on-accent"
                      : "border-2 border-line bg-card text-ink-muted",
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "mt-1 text-[18px] leading-[1.3] font-semibold",
                    first ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {step.title}
                </span>
                <span className="text-[14px] leading-[22.4px] text-ink-muted">{step.desc}</span>
              </li>
            );
          })}
        </ol>
        <a href={`#${NHALO_SECTIONS.download}`} className="bt-btn bt-btn-primary">
          {content.cta}
        </a>
      </Reveal>
    </section>
  );
}
