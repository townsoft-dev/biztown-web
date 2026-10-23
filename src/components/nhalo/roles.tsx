import type { ReactNode } from "react";

import { Reveal } from "@/components/home/reveal";
import type { AppCopy, NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";

import { MsIcon, Phone } from "./app/app-ui";
import { ManagerGrantScreen, ManagersScreen } from "./app/screens";
import { NhaloSectionHead } from "./parts";

/** "Giao nhà cho người khác, không chia mật khẩu" (Figma: Permission management). */
export function NhaloRoles({ content, app }: { content: NhaloContent["roles"]; app: AppCopy }) {
  const { table } = content;

  return (
    <section id={NHALO_SECTIONS.roles} className="bt-wrap py-[88px] max-md:py-16">
      <NhaloSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      <Reveal className="mx-auto mt-11 flex max-w-[1180px] items-center gap-9 max-lg:flex-col">
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="text-[24px] leading-[38.4px] font-bold text-ink">{content.heading}</h3>
          <ul className="flex flex-col gap-4">
            {content.benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                  <MsIcon name="check" size={14} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[14px] leading-none font-semibold text-ink">
                    {benefit.title}
                  </span>
                  <span className="text-[16px] leading-[25.6px] text-ink-muted">
                    {benefit.desc}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-9 max-sm:flex-col">
          <PhoneFigure caption={content.listCaption}>
            <ManagersScreen t={app} />
          </PhoneFigure>
          <PhoneFigure caption={content.grantCaption}>
            <ManagerGrantScreen t={app} />
          </PhoneFigure>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-11 max-w-[1180px] overflow-x-auto rounded-3xl border border-line bg-card">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">{table.caption}</caption>
          <thead className="bg-accent-tint text-[14px] leading-none font-semibold text-ink">
            <tr>
              <th scope="col" className="px-[22px] py-4">
                {table.caption}
              </th>
              <th scope="col" className="w-[200px] px-[22px] py-4 text-center max-md:w-28">
                {table.owner}
              </th>
              <th scope="col" className="w-[200px] px-[22px] py-4 text-center max-md:w-28">
                {table.manager}
              </th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th
                  scope="row"
                  className="px-[22px] py-4 text-[16px] leading-[25.6px] font-normal text-ink"
                >
                  {row.label}
                </th>
                <td className="px-[22px] py-4">
                  <Permission allowed yes={table.yes} no={table.no} />
                </td>
                <td className="px-[22px] py-4">
                  <Permission allowed={row.manager} yes={table.yes} no={table.no} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}

function PhoneFigure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <Phone className="[--s:0.62]">{children}</Phone>
      <figcaption className="text-center text-[14px] leading-[22.4px] text-ink-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

function Permission({ allowed, yes, no }: { allowed: boolean; yes: string; no: string }) {
  return allowed ? (
    <span className="flex items-center justify-center gap-1.5 text-[14px] leading-[22.4px] text-ink">
      <MsIcon name="check_circle" size={16} />
      {yes}
    </span>
  ) : (
    <span className="block text-center text-[14px] leading-[22.4px] text-line-strong">{no}</span>
  );
}
