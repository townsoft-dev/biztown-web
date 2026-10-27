import type { ReactNode } from "react";

import { Reveal } from "@/components/home/reveal";
import { TagChip } from "@/components/ui/tag-chip";
import type { KwTitle } from "@/content/balheh-types";
import { BALHEH_SECTIONS, type BalhehSection } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** Tiêu đề section: cụm `kw` có vạch tô cam phía dưới (Figma: Highlighted phrase). */
export function BalhehTitle({ title, className }: { title: KwTitle; className?: string }) {
  return (
    <h2 className={cn("bt-h2 text-balance text-ink", className)}>
      {title.lead}
      {title.kw && <span className="bt-mark">{title.kw}</span>}
      {title.tail}
    </h2>
  );
}

/** Tag chip + tiêu đề + đoạn dẫn căn giữa (Figma: Section heading). */
export function BalhehSectionHead({
  tag,
  title,
  lead,
  className,
}: {
  tag: string;
  title: KwTitle;
  lead?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mx-auto flex max-w-[920px] flex-col items-center gap-[18px] text-center",
        className,
      )}
    >
      <TagChip label={tag} />
      <BalhehTitle title={title} />
      {lead && <p className="bt-lead max-w-[720px] text-pretty">{lead}</p>}
    </Reveal>
  );
}

/** Khung một section của trang Balheh: id để menu nhảy tới, lề trên/dưới 72px như Figma. */
export function BalhehSection({
  id,
  children,
  className,
}: {
  id: BalhehSection;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={BALHEH_SECTIONS[id]} className={cn("py-[72px]", className)}>
      <div className="bt-wrap">{children}</div>
    </section>
  );
}
