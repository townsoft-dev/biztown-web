import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/config/site";
import type { NhaloContent } from "@/content/nhalo-types";
import { localizedPath, type Locale } from "@/i18n/config";

import { MsIcon } from "./app/app-ui";
import { NhaloFaqList } from "./faq";

/**
 * Trang /nhalo/ho-tro/ — "Hỏi đáp, báo lỗi": danh sách câu hỏi thường gặp (cùng nội dung với
 * trang NhàLo) và form gửi câu hỏi / báo lỗi. Form dùng chung ContactForm của trang Liên hệ,
 * gửi email về hộp thư BizTown, tiêu đề đánh dấu [NhàLo] (topic "nhalo", xem api/contact).
 */
export function NhaloHelpPage({
  content,
  faq,
  locale,
}: {
  content: NhaloContent["help"];
  faq: NhaloContent["faq"];
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
        <header className="mx-auto flex max-w-[860px] flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-accent-tint px-4 py-1.5 text-[14px] font-semibold text-accent-text">
            {content.tag}
          </span>
          {/* Một dòng (màn rộng): vế sau vẫn có vạch tô cam như tiêu đề các mục khác. */}
          <h1 className="bt-h2 text-ink lg:whitespace-nowrap">
            {content.title.lead} <span className="bt-mark">{content.title.mark}</span>
          </h1>
          <p className="bt-lead text-balance">
            {content.lead.map((line) => (
              <span key={line} className="lg:block">
                {line}{" "}
              </span>
            ))}
          </p>
          <a
            href={localizedPath(locale, "nhaloGuide")}
            className="flex items-center gap-1.5 text-[15px] font-semibold text-accent-text hover:text-ink"
          >
            <MsIcon name="menu_book" size={18} />
            {content.guide} →
          </a>
        </header>

        <div className="mx-auto mt-12 grid max-w-[1180px] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_520px]">
          <section aria-labelledby="nl-help-faq" className="flex flex-col gap-4">
            <h2 id="nl-help-faq" className="text-[22px] font-bold text-ink">
              {content.faqTitle}
            </h2>
            <NhaloFaqList items={faq.items} />
          </section>

          <section
            aria-label={content.formTitle}
            className="flex flex-col gap-5 rounded-[28px] border border-line bg-card p-8 shadow-[0_24px_48px_var(--shadow-navy)] max-md:p-6 lg:sticky lg:top-24"
          >
            <ContactForm
              content={content.form}
              locale={locale}
              email={siteConfig.email}
              topic="nhalo"
            />
            <a
              href={siteConfig.nhaloChat.zalo}
              target="_blank"
              rel="noopener"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#0068ff] px-5 text-[15px] font-semibold text-white"
            >
              <MsIcon name="chat" size={18} />
              {content.chat}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
