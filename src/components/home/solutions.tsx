import { MsIcon } from "@/components/nhalo/app/app-ui";
import { AppMark } from "@/components/ui/app-mark";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "@/components/ui/status-badge";
import { siteConfig } from "@/config/site";
import type { HomeContent, SolutionCard, SolutionItem } from "@/content/home-types";
import { HOME_SECTIONS, localizedPath, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

/**
 * "Hai cách BizTown đồng hành cùng bạn" — gộp hai section cũ "Hai cách…" và "Khám phá mọi
 * điều…": thẻ trái là sản phẩm sẵn có (nền kem, bấm sản phẩm mở trang của nó), thẻ phải là
 * web & app theo yêu cầu (nền navy, các dòng dịch vụ chỉ để đọc). Nút "Nhận tư vấn" ở cả hai
 * thẻ cuộn xuống khối Liên hệ và chọn sẵn loại tư vấn (data-need, xem ContactBand); "Xem dịch
 * vụ" mở trang Townsoft Vina.
 */
export function Solutions({
  content,
  locale,
}: {
  content: HomeContent["solutions"];
  locale: Locale;
}) {
  return (
    <section id={HOME_SECTIONS.services} className="bt-wrap scroll-mt-24 pt-20 pb-14">
      <Reveal className="mx-auto flex max-w-[1100px] flex-col items-center gap-[18px] text-center">
        <h2 className="bt-h2 text-balance lg:whitespace-nowrap">{content.title}</h2>
        <p className="bt-lead max-w-[720px] text-balance">{content.lead}</p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card
          card={content.products}
          tone="warm"
          statusLabels={content.statusLabels}
          locale={locale}
        />
        <Card
          card={content.services}
          tone="navy"
          statusLabels={content.statusLabels}
          locale={locale}
          delay={120}
        />
      </div>
    </section>
  );
}

function Card({
  card,
  tone,
  statusLabels,
  locale,
  delay = 0,
}: {
  card: SolutionCard;
  tone: "warm" | "navy";
  statusLabels: HomeContent["solutions"]["statusLabels"];
  locale: Locale;
  delay?: number;
}) {
  const navy = tone === "navy";
  return (
    <Reveal
      as="article"
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-[32px] border p-10 transition-shadow duration-300 max-sm:p-6",
        navy
          ? "border-[#2b3768] bg-[radial-gradient(420px_260px_at_100%_0%,rgba(239,159,39,0.28),transparent),linear-gradient(150deg,#23305e,#141c38)] text-white hover:shadow-[0_36px_70px_rgba(20,28,56,0.35)]"
          : "border-[rgba(239,159,39,0.25)] bg-[radial-gradient(420px_260px_at_100%_0%,rgba(91,124,255,0.14),transparent),linear-gradient(150deg,#fff8ea,#ffecd0)] text-[#1f2433] hover:shadow-[0_36px_70px_rgba(166,95,0,0.18)] dark:border-white/10 dark:bg-[linear-gradient(150deg,#2a2f4d,#1d2340)] dark:text-white",
      )}
    >
      <span
        className={cn(
          "self-start rounded-full px-3 py-1 text-[12.5px] font-semibold tracking-[1.5px] uppercase",
          navy
            ? "bg-white/12 text-[#ffd08a]"
            : "bg-white/80 text-[#a65f00] dark:bg-white/10 dark:text-[#ffd08a]",
        )}
      >
        {card.kicker}
      </span>
      <h3 className="mt-4 text-[34px] leading-[1.15] font-semibold tracking-[-1px] text-balance max-sm:text-[27px] xl:whitespace-nowrap">
        {card.title}
      </h3>

      <ul className="mt-5 flex flex-col gap-3">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-[17px] leading-[1.5]">
            <span
              className={cn(
                "mt-[3px] flex size-[22px] shrink-0 items-center justify-center rounded-full",
                navy
                  ? "bg-accent text-[#23305e]"
                  : "bg-[#23305e] text-white dark:bg-accent dark:text-[#23305e]",
              )}
            >
              <Icon name="check" size={14} />
            </span>
            <span className={navy ? "text-white/85" : "text-[#3d4566] dark:text-white/80"}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-8 grid grid-cols-1 gap-2.5">
        {card.items.map((item) => (
          <li key={item.name}>
            <ItemLink item={item} navy={navy} statusLabels={statusLabels} locale={locale} />
          </li>
        ))}
      </ul>
      {card.more && (
        <p className="mt-3 pl-1 text-[14.5px] text-[#5a6283] italic dark:text-white/60">
          {card.more}
        </p>
      )}

      {/* Đẩy nút xuống đáy để hai thẻ cao bằng nhau có nút thẳng hàng. */}
      <div className="min-h-8 flex-1" />
      <div className="flex flex-wrap gap-3 max-sm:[&>*]:w-full">
        {card.secondary && (
          <a
            href={siteConfig.townsoftUrl}
            target="_blank"
            rel="noopener"
            className={cn(
              "bt-btn border",
              navy
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-[#23305e]/25 text-[#23305e] hover:bg-white/60 dark:border-white/30 dark:text-white",
            )}
          >
            {card.secondary.label}
            <Icon name="arrow-up-right" size={16} className="ml-1.5" />
          </a>
        )}
        <a
          href={`#${HOME_SECTIONS.contact}`}
          data-need={card.need}
          className={cn(
            "bt-btn",
            navy
              ? "bt-btn-primary"
              : "bg-[#23305e] text-white hover:bg-[#141c38] dark:bg-white dark:text-[#23305e]",
          )}
        >
          {card.cta}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </a>
      </div>
    </Reveal>
  );
}

/**
 * Một dòng sản phẩm/dịch vụ: logo, tên, mô tả ngắn, trạng thái. Sản phẩm có trang riêng mở
 * trang đó; sản phẩm chưa có trang dẫn tới slide sản phẩm; dịch vụ dẫn xuống khối Liên hệ.
 */
function ItemLink({
  item,
  navy,
  statusLabels,
  locale,
}: {
  item: SolutionItem;
  navy: boolean;
  statusLabels: HomeContent["solutions"]["statusLabels"];
  locale: Locale;
}) {
  // Dịch vụ: chỉ để đọc, không dẫn đi đâu, không có mũi tên.
  if (navy) {
    return (
      <div className="flex h-full items-center gap-3.5 rounded-[20px] border border-white/10 bg-white/[0.06] p-3 pr-4">
        <span className="flex size-[46px] shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#ffd08a,#ef9f27)] text-[#23305e]">
          {item.icon && <MsIcon name={item.icon} size={24} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[16.5px] leading-snug font-semibold">{item.name}</span>
          <span className="block text-[13.5px] leading-snug text-white/60">{item.desc}</span>
        </span>
      </div>
    );
  }
  const href = item.detail ? localizedPath(locale, item.detail) : `#${HOME_SECTIONS.products}`;
  return (
    <a
      href={href}
      className="group flex h-full items-center gap-3.5 rounded-[20px] border border-white bg-white/75 p-3 pr-4 transition-[translate,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_30px_rgba(166,95,0,0.14)] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
    >
      {item.mark && (
        <AppMark mark={item.mark} size={46} radius={14} fontSize={12} surface="light" />
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[16.5px] leading-snug font-semibold">{item.name}</span>
        <span className="block truncate text-[13.5px] leading-snug text-[#5a6283] dark:text-white/60">
          {item.desc}
        </span>
      </span>
      {item.status && (
        <StatusBadge
          status={item.status}
          label={statusLabels[item.status]}
          className="max-sm:hidden"
        />
      )}
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fff1d9] text-[#23305e] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:bg-white/10 dark:text-white"
      >
        <Icon name="arrow-up-right" size={16} />
      </span>
    </a>
  );
}
