"use client";

import { useState } from "react";

import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import type { HomeContent, LinkCard } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { SectionHead } from "./parts";
import { Reveal } from "./reveal";

type Tab = "apps" | "services";

/** Section "Khám phá mọi điều bạn làm được với BizTown" — tab Ứng dụng / Dịch vụ. */
export function Discover({ content }: { content: HomeContent["discover"] }) {
  const [tab, setTab] = useState<Tab>("apps");
  const cards = tab === "apps" ? content.apps : content.services;

  return (
    <section id={HOME_SECTIONS.discover} className="bt-wrap flex flex-col items-center py-14">
      <SectionHead tag={content.tag} title={content.title} />

      <Reveal className="mt-8 flex flex-col items-center gap-6">
        <a
          href={`#${HOME_SECTIONS.contact}`}
          className="group flex items-center gap-3 text-[16px] leading-none font-semibold text-ink"
        >
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-full border border-line-strong text-[14px] transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
          >
            →
          </span>
          {content.support}
        </a>

        <div role="tablist" className="flex gap-1 rounded-full bg-card-soft p-1">
          {(["apps", "services"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                "rounded-full px-6 py-3 text-[16px] leading-none font-semibold transition-colors",
                tab === key ? "bg-accent text-on-accent" : "text-ink-muted hover:text-ink",
              )}
            >
              {content.tabs[key]}
            </button>
          ))}
        </div>
      </Reveal>

      <ul
        key={tab}
        className="bt-fade mt-6 grid w-full max-w-[1100px] grid-cols-1 gap-3.5 md:grid-cols-2"
      >
        {cards.map((card) => (
          <Reveal as="li" key={card.name}>
            <DiscoverCard card={card} statusLabels={content.statusLabels} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/** Thẻ liên kết dạng viên thuốc (Figma: Link card). Sản phẩm đang chạy dẫn tới slide sản phẩm. */
function DiscoverCard({
  card,
  statusLabels,
}: {
  card: LinkCard;
  statusLabels: HomeContent["discover"]["statusLabels"];
}) {
  const live = card.status !== "soon";
  const body = (
    <>
      <AppMark mark={card.mark} size={44} fontSize={11} />
      <span className="min-w-0 flex-1">
        <span className="block text-[18px] leading-[28.8px] font-semibold text-ink">
          {card.name}
        </span>
        <span className="mt-1 block text-[14px] leading-[22.4px] text-ink-muted">{card.desc}</span>
      </span>
      {card.status && <StatusBadge status={card.status} label={statusLabels[card.status]} />}
      <Icon name="arrow-up-right" size={20} className="text-ink" />
    </>
  );
  const className =
    "flex h-full items-center gap-4 rounded-full bg-card-soft py-[18px] pr-7 pl-[18px] max-sm:flex-wrap max-sm:rounded-3xl";

  return live ? (
    <a
      href={`#${HOME_SECTIONS.products}`}
      className={cn(
        className,
        "transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(166,95,0,0.12)]",
      )}
    >
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}
