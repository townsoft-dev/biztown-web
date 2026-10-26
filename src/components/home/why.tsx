import Image from "next/image";

import type { Feature, HomeContent } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { SectionHead } from "./parts";
import { Reveal } from "./reveal";

/**
 * Section "Vì sao chọn BizTown" — 6 lý do quanh ảnh minh hoạ 4:5 (Figma: bt-section s-why).
 * Chưa có ảnh (content.media trống) thì ẩn khung ảnh, hai cột lý do nằm cạnh nhau.
 */
export function Why({ content }: { content: HomeContent["why"] }) {
  const { media } = content;

  return (
    <section id={HOME_SECTIONS.why} className="bt-wrap py-14">
      <Reveal className="flex flex-col items-center gap-8 rounded-[32px] border border-line bg-card p-12 shadow-[0_1px_1px_var(--shadow-soft)] max-sm:p-6">
        <SectionHead tag={content.tag} title={content.title} />
        <div
          className={cn(
            "grid w-full grid-cols-1 items-start gap-10",
            media ? "lg:grid-cols-[0.8fr_1fr_0.8fr]" : "mx-auto max-w-[960px] md:grid-cols-2",
          )}
        >
          <FeatureColumn features={content.left} start={1} />
          {media && (
            <Image
              src={media.src}
              alt={media.alt}
              width={448}
              height={560}
              className="mx-auto aspect-[4/5] w-full max-w-[448px] rounded-[32px] bg-card-gray object-cover"
            />
          )}
          <FeatureColumn features={content.right} start={content.left.length + 1} />
        </div>
      </Reveal>
    </section>
  );
}

function FeatureColumn({ features, start }: { features: Feature[]; start: number }) {
  return (
    <ul className="flex flex-col gap-8">
      {features.map((feature, index) => (
        <li key={feature.title} className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2.5 text-[21px] leading-[27.3px] font-semibold text-ink">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center bg-accent-tint text-[12px] leading-[15.6px] font-bold text-accent-text"
            >
              {String(start + index).padStart(2, "0")}
            </span>
            {feature.title}
          </h3>
          <p className="text-[16px] leading-[25.6px] text-ink-muted">{feature.desc}</p>
        </li>
      ))}
    </ul>
  );
}
