import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import type { AppCopy, GuideScreen, NhaloGuideContent } from "@/content/nhalo-types";
import { localizedPath, type Locale } from "@/i18n/config";

import { MsIcon, Phone } from "./app/app-ui";
import {
  AddHouseScreen,
  BatchScreen,
  BillsScreen,
  ContractScreen,
  ManagerGrantScreen,
  ReadingScreen,
  RentOutScreen,
  TenantBillScreen,
} from "./app/screens";

function screen(name: GuideScreen, app: AppCopy): ReactNode {
  switch (name) {
    case "addHouse":
      return <AddHouseScreen t={app} />;
    case "rentOut":
      return <RentOutScreen t={app} />;
    case "reading":
      return <ReadingScreen t={app} recorded />;
    case "batch":
      return <BatchScreen t={app} selected={4} />;
    case "tenantBill":
      return <TenantBillScreen t={app} />;
    case "bills":
      return <BillsScreen t={app} />;
    case "contract":
      return <ContractScreen t={app} />;
    case "managerGrant":
      return <ManagerGrantScreen t={app} />;
  }
}

/**
 * Trang /nhalo/huong-dan/: hướng dẫn sử dụng NhàLo theo từng việc (đăng ký → giao nhà cho người
 * quản lý). Màn rộng: mục lục dính bên trái; mỗi phần là một thẻ có các bước đánh số, mẹo và
 * màn hình app minh hoạ. Cuối trang dẫn sang Hỏi đáp và Zalo.
 */
export function NhaloGuidePage({
  content,
  app,
  locale,
}: {
  content: NhaloGuideContent;
  app: AppCopy;
  locale: Locale;
}) {
  return (
    <div className="relative">
      {/* Nền cam nhạt đầu trang, tan dần vào nền trang (như đầu trang NhàLo). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-[image:var(--nl-hero-bg)] [mask-image:linear-gradient(180deg,#000_45%,transparent)]"
      />
      <div className="bt-wrap relative pt-[132px] pb-[88px] max-md:pt-[116px] max-md:pb-16">
        <header className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-accent-tint px-4 py-1.5 text-[14px] font-semibold text-accent-text">
            {content.tag}
          </span>
          <h1 className="bt-h2 text-ink lg:whitespace-nowrap">
            {content.title.lead} <span className="bt-mark">{content.title.mark}</span>
          </h1>
          <p className="bt-lead text-balance lg:whitespace-nowrap">{content.lead}</p>
        </header>

        <div className="mx-auto mt-12 grid max-w-[1180px] items-start gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <nav
            aria-label={content.tocTitle}
            className="rounded-[24px] border border-line bg-card p-5 lg:sticky lg:top-24"
          >
            <p className="text-[13px] font-semibold tracking-[1px] text-ink-muted uppercase">
              {content.tocTitle}
            </p>
            <ol className="mt-3 flex flex-col gap-1 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
              {content.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[14.5px] leading-[1.35] text-ink-muted transition-colors hover:bg-accent-tint hover:text-ink"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-card-soft text-[12px] font-bold text-ink">
                      {index + 1}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            {content.sections.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className="grid scroll-mt-24 items-start gap-8 rounded-[28px] border border-line bg-card p-8 shadow-[0_12px_32px_var(--shadow-navy)] max-md:p-6 md:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-accent">
                      <MsIcon name={section.icon} size={24} />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-semibold text-accent-text">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-[24px] leading-[1.25] font-bold text-ink max-md:text-[21px]">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-[16px] leading-[1.6] text-ink-muted">{section.lead}</p>
                  <ol className="flex flex-col gap-3">
                    {section.steps.map((step, stepIndex) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-on-accent">
                          {stepIndex + 1}
                        </span>
                        <span className="pt-0.5 text-[15.5px] leading-[1.6] text-ink">{step}</span>
                      </li>
                    ))}
                  </ol>
                  {section.tip && (
                    <p className="flex items-start gap-2 rounded-xl bg-accent-tint px-4 py-3 text-[14.5px] leading-[1.55] text-ink">
                      <MsIcon name="info" size={18} className="mt-0.5 shrink-0 text-accent-text" />
                      {section.tip}
                    </p>
                  )}
                </div>
                {section.screen && (
                  <div className="justify-self-center">
                    <Phone device className="[--s:0.5] max-md:[--s:0.6]">
                      {screen(section.screen, app)}
                    </Phone>
                  </div>
                )}
              </article>
            ))}

            <aside className="flex flex-wrap items-center justify-between gap-5 rounded-[28px] border border-[rgba(239,159,39,0.4)] bg-accent-tint p-8 max-md:p-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-[22px] font-bold text-ink">{content.help.title}</h2>
                <p className="text-[15.5px] text-ink-muted">{content.help.desc}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={localizedPath(locale, "nhaloHelp")} className="bt-btn bt-btn-primary">
                  {content.help.faq}
                </a>
                <a
                  href={siteConfig.nhaloChat.zalo}
                  target="_blank"
                  rel="noopener"
                  className="flex h-12 items-center gap-2 rounded-full bg-[#0068ff] px-5 text-[15px] font-semibold text-white"
                >
                  <MsIcon name="chat" size={18} />
                  {content.help.chat}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
