import { Reveal } from "@/components/home/reveal";
import { siteConfig } from "@/config/site";
import type { NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS, localizedPath, type Locale } from "@/i18n/config";

import { MsIcon } from "./app/app-ui";
import { NHALO_FAQ_ON_HOME, NhaloFaqList } from "./faq";
import { MascotArt, NhaloSectionHead } from "./parts";

/**
 * "Hỗ trợ" — gộp Hướng dẫn và Hỏi đáp làm một mục (menu "Hỗ trợ"): trái là các bước bắt đầu +
 * nút tải app + hỏi qua Zalo, phải là danh sách hỏi đáp. Giữ id "huong-dan" (cả mục) và
 * "hoi-dap" (khối hỏi đáp) để link cũ vẫn đúng chỗ.
 */
export function NhaloStart({
  content,
  faq,
  locale,
}: {
  content: NhaloContent["start"];
  faq: NhaloContent["faq"];
  locale: Locale;
}) {
  return (
    <section id={NHALO_SECTIONS.start} className="bt-wrap scroll-mt-20 py-[88px] max-md:py-16">
      <NhaloSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      <div className="mx-auto mt-11 grid max-w-[1180px] items-start gap-8 lg:grid-cols-[440px_minmax(0,1fr)]">
        <Reveal className="relative flex flex-col gap-5 rounded-[28px] border border-[rgba(239,159,39,0.35)] bg-[linear-gradient(180deg,var(--accent-tint),var(--card))] p-7 lg:sticky lg:top-24">
          {/* Mascot đeo tai nghe, cạnh nút hỏi qua Zalo (màn rộng). */}
          <MascotArt
            name="tai-nghe"
            className="bt-float absolute -right-8 -bottom-10 w-[130px] [--bob:4.2s] max-lg:hidden"
          />
          <h3 className="text-[20px] leading-[1.3] font-bold text-ink">{content.stepsTitle}</h3>
          <ol className="flex flex-col gap-4">
            {content.steps.map((step, index) => (
              <li key={step.title} className="flex items-start gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[15px] leading-none font-bold text-on-accent">
                  {index + 1}
                </span>
                <span className="flex flex-col gap-0.5 pt-0.5">
                  <span className="text-[16px] leading-[1.35] font-semibold text-ink">
                    {step.title}
                  </span>
                  <span className="text-[14px] leading-[1.5] text-ink-muted lg:whitespace-nowrap">
                    {step.desc}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          {siteConfig.nhaloChat.zalo && (
            <a
              href={siteConfig.nhaloChat.zalo}
              target="_blank"
              rel="noopener"
              className="flex h-12 items-center justify-center gap-2.5 self-center rounded-full bg-[#0068ff] pr-6 pl-2 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgba(0,104,255,0.3)] transition-transform hover:-translate-y-0.5"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-white/22">
                <MsIcon name="chat" size={17} />
              </span>
              {content.chat}
            </a>
          )}
        </Reveal>

        <Reveal id={NHALO_SECTIONS.faq} className="flex scroll-mt-24 flex-col gap-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-[20px] leading-[1.3] font-bold text-ink">{faq.title}</h3>
            <a
              href={localizedPath(locale, "nhaloHelp")}
              className="text-[15px] font-semibold text-accent-text hover:text-ink"
            >
              {faq.seeAll} ({faq.items.length}) →
            </a>
          </div>
          <NhaloFaqList items={faq.items.slice(0, NHALO_FAQ_ON_HOME)} />
        </Reveal>
      </div>
    </section>
  );
}
