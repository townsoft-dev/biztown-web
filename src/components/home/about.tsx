import { MsIcon } from "@/components/nhalo/app/app-ui";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/content/home-types";
import { HOME_SECTIONS } from "@/i18n/config";

import { Rich } from "./parts";
import { Reveal } from "./reveal";

/**
 * Về BizTown — gộp sáu section cũ (Dành cho ai, Hiệu quả bằng con số, Đồng hành từ ngày đầu,
 * Người cộng sự công nghệ, Vì sao chọn, Cách làm ra mỗi ứng dụng) thành một khối ngắn:
 * thẻ navy (dành cho ai + con số) bên trái, bốn lý do bên phải, bốn bước đồng hành bên dưới.
 */
export function About({ content }: { content: HomeContent["about"] }) {
  return (
    <section id={HOME_SECTIONS.about} className="bt-wrap scroll-mt-24 py-14">
      <Reveal className="mx-auto flex max-w-[980px] flex-col items-center gap-[18px] text-center">
        <h2 className="bt-h2 text-balance">
          <Rich text={content.title} />
        </h2>
        <p className="bt-lead max-w-[760px] text-balance">{content.lead}</p>
      </Reveal>

      <TownsoftCard company={content.company} />

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Dành cho ai + con số. */}
        <Reveal
          as="article"
          className="relative flex flex-col overflow-hidden rounded-[32px] bg-[radial-gradient(380px_240px_at_0%_100%,rgba(239,159,39,0.3),transparent),linear-gradient(150deg,#23305e,#141c38)] p-9 text-white max-sm:p-6"
        >
          <p className="text-[13px] font-semibold tracking-[1.5px] text-[#ffd08a] uppercase">
            {content.audienceTitle}
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {content.audience.map((item) => (
              <li
                key={item.title}
                className="flex items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.06] p-3 transition-[translate,background-color] duration-200 hover:translate-x-1 hover:bg-white/[0.12]"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-[#23305e]">
                  <MsIcon name={item.icon} size={26} />
                </span>
                <span className="min-w-0">
                  <b className="block text-[17px] leading-snug">{item.title}</b>
                  <span className="block text-[14px] leading-snug text-white/65">{item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-white/12 pt-6">
            {content.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="bt-kw text-[28px] leading-tight font-semibold max-sm:text-[19px]">
                  {stat.value}
                </dd>
                <dd className="text-[13px] leading-snug whitespace-pre-line text-white/65">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Bốn lý do chọn BizTown, hiện lần lượt. */}
        <div className="flex flex-col">
          <Reveal>
            <h3 className="text-[24px] leading-tight font-semibold text-ink">
              {content.reasonsTitle}
            </h3>
          </Reveal>
          <ul className="mt-4 grid flex-1 grid-cols-2 gap-3.5 max-sm:grid-cols-1">
            {content.reasons.map((reason, index) => (
              <Reveal
                as="li"
                key={reason.title}
                style={{ transitionDelay: `${index * 90}ms` }}
                className="group flex flex-col gap-3 rounded-[26px] border border-line bg-card p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[rgba(239,159,39,0.45)] hover:shadow-[0_24px_48px_rgba(166,95,0,0.14)] max-sm:flex-row max-sm:items-start max-sm:gap-4 max-sm:p-5"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-tint text-accent-text transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                  <MsIcon name={reason.icon} size={26} />
                </span>
                <span className="flex flex-col gap-2">
                  <b className="text-[18px] leading-snug font-semibold text-ink">{reason.title}</b>
                  <span className="text-[15px] leading-[1.55] text-pretty text-ink-muted">
                    {reason.desc}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Bốn bước đồng hành, nối bằng một vạch. */}
      <Reveal className="mt-5 rounded-[32px] border border-line bg-card-soft p-9 max-sm:p-6">
        <h3 className="text-[24px] leading-tight font-semibold text-ink">{content.stepsTitle}</h3>
        <ol className="relative mt-6 grid grid-cols-[repeat(4,1fr)_auto] gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <span
            aria-hidden="true"
            className="absolute top-[22px] right-[60px] left-[44px] h-0.5 bg-[linear-gradient(90deg,#ef9f27,#ffc56b_70%,#1e8a4c)] max-lg:hidden"
          />
          {content.steps.map((step, index) => (
            <li key={step.title} className="group relative flex flex-col gap-2">
              <span className="relative flex size-11 items-center justify-center rounded-full bg-accent text-[15px] font-bold text-on-accent shadow-[0_8px_20px_rgba(239,159,39,0.35)] transition-transform duration-300 group-hover:scale-110">
                {String(index + 1).padStart(2, "0")}
              </span>
              <b className="mt-1 text-[18px] leading-snug font-semibold text-ink">{step.title}</b>
              <p className="text-[15px] leading-[1.5] whitespace-pre-line text-ink-muted">
                {step.desc}
              </p>
            </li>
          ))}
          {/* Mốc cuối đường kẻ: thành công. */}
          <li className="relative flex flex-col items-center gap-2 max-lg:items-start">
            <span className="bt-float relative flex size-[60px] -translate-y-2 items-center justify-center rounded-full bg-[linear-gradient(135deg,#34c27a,#1e8a4c)] text-white shadow-[0_10px_24px_rgba(30,138,76,0.35)] ring-4 ring-[#e7f6ee] max-lg:translate-y-0 dark:ring-[#1e8a4c]/25">
              <MsIcon name="emoji_events" size={32} />
            </span>
            <b className="-mt-1 text-[18px] leading-snug font-semibold text-[#1e8a4c] max-lg:mt-1 dark:text-[#5fd394]">
              {content.stepsDone}
            </b>
          </li>
        </ol>
      </Reveal>
    </section>
  );
}

/**
 * Doanh nghiệp gốc: Townsoft Vina làm outsourcing phần mềm từ 2020 — cho khách thấy BizTown có
 * đội ngũ và kinh nghiệm phía sau, không phải công ty mới lập. Nút mở townsoftvina.com.
 */
function TownsoftCard({ company }: { company: HomeContent["about"]["company"] }) {
  return (
    <Reveal
      as="article"
      className="relative mt-10 grid grid-cols-1 gap-8 overflow-hidden rounded-[32px] border border-[rgba(239,159,39,0.25)] bg-[radial-gradient(520px_280px_at_100%_0%,rgba(91,124,255,0.14),transparent),linear-gradient(150deg,#fff8ea,#ffecd0)] p-9 text-[#1f2433] max-sm:p-6 lg:grid-cols-[1.15fr_1fr] lg:items-center dark:border-white/10 dark:bg-[linear-gradient(150deg,#2a2f4d,#1d2340)] dark:text-white"
    >
      <div className="flex flex-col items-start gap-4">
        <span className="rounded-full bg-white/80 px-3 py-1 text-[12.5px] font-semibold tracking-[1.5px] text-[#a65f00] uppercase dark:bg-white/10 dark:text-[#ffd08a]">
          {company.kicker}
        </span>
        <h3 className="text-[30px] leading-[1.2] font-semibold tracking-[-0.8px] text-balance max-sm:text-[24px]">
          <Rich text={company.title} />
        </h3>
        {/* Màn rộng (xl): ngắt dòng theo "\n" trong nội dung, các dòng (trừ dòng cuối) giãn đều hai
            bên. Màn hẹp: chữ tự xuống dòng, căn đều. */}
        <p className="text-justify text-[16px] leading-[1.65] text-[#3d4566] dark:text-white/75">
          {company.desc.split("\n").map((line, index, lines) => (
            <span
              key={line}
              className={cn("xl:block", index < lines.length - 1 && "xl:[text-align-last:justify]")}
            >
              {line}{" "}
            </span>
          ))}
        </p>
        <a
          href={siteConfig.townsoftUrl}
          target="_blank"
          rel="noopener"
          className="bt-btn mt-1 bg-[#23305e] text-white hover:bg-[#141c38] dark:bg-white dark:text-[#23305e]"
        >
          {company.cta}
          <Icon name="arrow-up-right" size={16} className="ml-1.5" />
        </a>
      </div>

      <div className="flex flex-col gap-4">
        <dl className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          {company.facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col gap-1 rounded-[22px] border border-white bg-white/75 p-4 dark:border-white/10 dark:bg-white/5"
            >
              <dt className="sr-only">{fact.label}</dt>
              <dd className="text-[24px] leading-tight font-semibold whitespace-nowrap text-[#a65f00] max-lg:text-[22px] dark:text-[#ffd08a]">
                {fact.value}
              </dd>
              <dd className="text-[13px] leading-snug text-[#5a6283] dark:text-white/60">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
        <div className="rounded-[22px] border border-white bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-[12.5px] font-semibold tracking-[1.2px] text-[#5a6283] uppercase dark:text-white/60">
            {company.clientsLabel}
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {company.clients.map((client) => (
              <li
                key={client.name}
                className="flex items-center gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-2 text-[14px] font-medium text-[#23305e] shadow-[0_4px_12px_rgba(166,95,0,0.08)] dark:bg-white/10 dark:text-white"
              >
                {/* Cờ lấy từ thư viện flag-icons 7.2.3 (MIT, khổ 4:3). */}
                {/* eslint-disable-next-line @next/next/no-img-element -- cờ SVG nhỏ */}
                <img
                  src={`/images/flags/${client.country}.svg`}
                  alt={company.countries[client.country]}
                  title={company.countries[client.country]}
                  width={20}
                  height={15}
                  className="h-[15px] w-5 rounded-[3px] object-cover shadow-[0_0_0_1px_rgba(35,48,94,0.12)]"
                />
                {client.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
