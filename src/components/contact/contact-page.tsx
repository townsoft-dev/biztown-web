import type { ReactNode } from "react";

import { Rich } from "@/components/home/parts";
import type { ContactContent } from "@/content/contact-types";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import { ContactForm } from "./contact-form";

/** Icon nét 24px tô theo màu chữ (cùng kiểu icon building / map-pin ở chân trang). */
function InfoIcon({ name }: { name: "mail" | "map-pin" | "building" }) {
  const paths = {
    mail: "M3 7l9 6 9-6M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
    "map-pin":
      "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    building:
      "M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M8 7h4M8 11h4M8 15h4M2 21h20",
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: "mail" | "map-pin" | "building";
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-4 rounded-3xl border border-line bg-chip p-5 shadow-[0_1px_1px_var(--shadow-soft)] backdrop-blur-sm">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-tint text-accent-text">
        <InfoIcon name={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] leading-5 font-semibold text-ink-muted">{label}</p>
        <div className="mt-1 text-[17px] leading-6 font-medium break-words text-ink">
          {children}
        </div>
      </div>
    </li>
  );
}

/**
 * Trang Liên hệ: bên trái lời mời + thông tin công ty, bên phải form gửi tin nhắn. Nền đầu trang,
 * lưới, thẻ, nút dùng chung token với trang chủ và các trang tài liệu.
 */
export function ContactPage({ content, locale }: { content: ContactContent; locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <div className="relative overflow-hidden rounded-b-[48px] bg-[image:var(--top-bg)] pt-[76px] pb-16 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[image:var(--grid-tile)] [mask-image:linear-gradient(180deg,#000,transparent_70%)] bg-size-[52px_52px]"
      />

      <div className="bt-wrap relative grid grid-cols-1 gap-10 pt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:pt-20">
        <div className="flex flex-col">
          <p className="w-fit rounded-full bg-chip px-4 py-1.5 text-[14px] leading-5 font-semibold text-accent-text ring-1 ring-chip-ring">
            {content.eyebrow}
          </p>
          <h1 className="bt-h2 mt-5 text-ink">
            <Rich text={content.title} />
          </h1>
          <p className="bt-lead mt-5 max-w-[540px]">{content.lead}</p>

          <ul className="mt-9 flex max-w-[540px] flex-col gap-3">
            <InfoItem icon="mail" label={content.info.emailLabel}>
              <a
                href={`mailto:${siteConfig.email}`}
                className="underline-offset-4 hover:text-accent-text hover:underline"
              >
                {siteConfig.email}
              </a>
            </InfoItem>
            <InfoItem icon="map-pin" label={content.info.addressLabel}>
              {dict.footer.address}
            </InfoItem>
            <InfoItem icon="building" label={content.info.companyLabel}>
              {dict.companyName}
              <span className="block text-[15px] font-normal text-ink-muted">
                {dict.footer.taxCode}
              </span>
            </InfoItem>
          </ul>
        </div>

        <div className="rounded-[32px] border border-line bg-card p-6 shadow-[0_24px_48px_var(--shadow-navy)] sm:p-10">
          <ContactForm content={content.form} locale={locale} email={siteConfig.email} />
        </div>
      </div>
    </div>
  );
}
