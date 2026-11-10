"use client";

import type { CSSProperties } from "react";

import { Reveal } from "@/components/home/reveal";
import { AppMark } from "@/components/ui/app-mark";
import type { NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";

import { MsIcon } from "./app/app-ui";
import { MascotArt, NhaloSectionHead, StoreBadges } from "./parts";
import { useNhaloLinks } from "./use-link-code";

/**
 * "Vì sao NhàLo": 4 thẻ lợi ích (hiện dần khi cuộn, nhích lên khi rê chuột), rồi khối lớn
 * "Miễn phí trọn đời · 0đ" với 3 ý và nút tải app (link mang mã nguồn như hero). Khối 0đ giữ
 * nền kem, chữ navy ở cả mode Night để nút store navy vẫn nổi.
 */
export function NhaloWhy({ content }: { content: NhaloContent["why"] }) {
  const links = useNhaloLinks();
  const { free } = content;

  return (
    <section id={NHALO_SECTIONS.why} className="bt-wrap overflow-x-clip py-[88px] max-md:py-16">
      <NhaloSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      {/* "Trước đây → Với NhàLo": khi cuộn tới, vế trái bị gạch đi rồi vế phải sáng lên. */}
      <div className="relative mx-auto mt-11 max-w-[1100px]">
        {/* Mascot ôm túi tiền, góc trên bên phải cạnh nhãn "Với NhàLo" (màn rộng). */}
        <MascotArt
          name="tui-tien"
          className="bt-float absolute -top-[84px] -right-12 w-[128px] [--bob:4s] max-xl:hidden"
        />
        <p className="grid grid-cols-[minmax(0,0.8fr)_56px_minmax(0,1.2fr)] text-[14px] font-semibold tracking-[1px] uppercase max-md:hidden">
          <span className="pl-6 text-ink-muted">{content.before}</span>
          <span />
          <span className="pl-6 text-accent-text">{content.after}</span>
        </p>
        <ul className="mt-3 flex flex-col gap-4">
          {content.rows.map((row, index) => (
            <Reveal
              as="li"
              key={row.title}
              style={{ "--d": `${index * 220}ms` } as CSSProperties}
              className="group/row grid grid-cols-[minmax(0,0.8fr)_56px_minmax(0,1.2fr)] items-center max-md:grid-cols-1 max-md:gap-1.5"
            >
              <span className="flex h-full -translate-x-8 items-center rounded-[22px] border border-dashed border-line-strong bg-card-soft px-6 py-5 text-[16px] leading-[1.45] text-ink-muted opacity-0 transition-[opacity,translate] delay-(--d) duration-500 ease-out group-[.is-in]/row:translate-x-0 group-[.is-in]/row:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100 max-md:py-3.5 max-md:text-[14px]">
                {/* Vạch đỏ vẽ bằng nền, cắt theo từng dòng (box-decoration-clone) nên chữ
                    xuống dòng vẫn gạch đúng từng dòng; chạy từ trái sang khi cuộn tới. */}
                <span>
                  <span className="bg-[linear-gradient(#e5484d,#e5484d)] box-decoration-clone bg-[length:0%_2px] bg-[position:0_58%] bg-no-repeat transition-[background-size] delay-[calc(var(--d)+550ms)] duration-700 group-[.is-in]/row:bg-[length:100%_2px] motion-reduce:bg-[length:100%_2px]">
                    {row.before}
                  </span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className="flex justify-center text-accent opacity-0 transition-opacity delay-[calc(var(--d)+850ms)] duration-300 group-[.is-in]/row:opacity-100 max-md:hidden"
              >
                <MsIcon name="arrow_forward" size={30} />
              </span>
              <span className="flex translate-x-8 items-start gap-4 rounded-[22px] border border-[rgba(239,159,39,0.4)] bg-card px-6 py-5 opacity-0 shadow-[0_12px_32px_var(--shadow-navy)] transition-[opacity,translate] delay-[calc(var(--d)+1000ms)] duration-600 ease-out group-[.is-in]/row:translate-x-0 group-[.is-in]/row:opacity-100 motion-reduce:translate-x-0 motion-reduce:opacity-100">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-on-accent shadow-[0_10px_24px_rgba(239,159,39,0.35)]">
                  <MsIcon name={row.icon} size={26} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[19px] leading-[1.3] font-semibold text-ink">
                    {row.title}
                  </span>
                  <span className="text-[15px] leading-[1.55] text-ink-muted">{row.desc}</span>
                </span>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal className="relative mx-auto mt-10 flex max-w-[1264px] items-center gap-10 overflow-hidden rounded-[36px] border border-[rgba(239,159,39,0.35)] bg-[radial-gradient(520px_320px_at_85%_20%,rgba(239,159,39,0.32),transparent),linear-gradient(135deg,#fff7e8,#ffe7c2)] p-12 max-lg:flex-col max-lg:items-start max-md:p-8">
        <div className="flex flex-col items-start gap-2">
          <span className="rounded-full bg-accent px-5 py-2 text-[15px] leading-none font-bold text-on-accent">
            {free.badge}
          </span>
          <p className="bt-kw text-[120px] leading-none font-bold tracking-[-4px] max-md:text-[88px]">
            {free.price}
          </p>
          <p className="text-[18px] font-medium text-navy">{free.priceNote}</p>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <ul className="flex flex-col gap-3.5">
            {free.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[19px] font-medium text-navy">
                <MsIcon name="check_circle" size={26} className="shrink-0 text-chip-paid" />
                {point}
              </li>
            ))}
          </ul>
          <StoreBadges store={free.store} links={links} />
        </div>

        {/* Hoá đơn minh hoạ: mọi khoản phí đều 0đ, mascot đứng cạnh. */}
        <div aria-hidden="true" className="relative mr-6 shrink-0 max-lg:hidden">
          <div className="w-[300px] rotate-[3deg] rounded-t-[22px] bg-white px-6 pt-5 pb-7 text-navy shadow-[0_24px_48px_rgba(166,95,0,0.22)] [mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/18px_100%]">
            <p className="flex items-center gap-2 text-[15px] font-semibold">
              <AppMark mark={{ logo: "nhalo" }} size={26} radius={7} />
              {free.receipt.title}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 border-b border-dashed border-[#d9dcea] pb-3.5">
              {free.receipt.rows.map((row) => (
                <li key={row} className="flex justify-between text-[14px] text-[#5a6283]">
                  {row}
                  <span className="font-semibold text-navy">0đ</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-baseline justify-between text-[16px] font-bold">
              {free.receipt.total}
              <span className="text-[24px] text-accent-text">0đ</span>
            </p>
          </div>
          <span className="absolute -right-3 -bottom-4 -rotate-[10deg] rounded-[10px] border-[3px] border-chip-paid bg-white/90 px-3.5 py-1 text-[17px] font-bold tracking-[1px] text-chip-paid uppercase opacity-90 shadow-[0_6px_14px_rgba(24,33,63,0.12)]">
            {free.receipt.stamp}
          </span>
          <MascotArt
            name="bang-mien-phi"
            className="bt-float absolute -bottom-6 -left-[150px] w-[140px] [--bob:3.8s]"
          />
        </div>
      </Reveal>
    </section>
  );
}
