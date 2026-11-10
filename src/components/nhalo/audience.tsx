import { Reveal } from "@/components/home/reveal";
import type { AppCopy, NhaloContent } from "@/content/nhalo-types";
import { NHALO_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { MsIcon, Phone } from "./app/app-ui";
import { ManagerGrantScreen } from "./app/screens";
import { MascotArt, NhaloSectionHead } from "./parts";

/**
 * "Dành cho ai" (gộp cả Phân quyền): ba nhóm khách, thẻ "cả gia đình" nối thẳng xuống khối
 * "Giao nhà cho người khác" ngay bên dưới — một điện thoại (màn giao nhà), ba lợi ích và hai cột
 * quyền gọn (người quản lý làm được / chỉ chủ nhà). Giữ id "phan-quyen" cho khối đó để link cũ
 * vẫn đúng chỗ.
 */
export function NhaloAudience({
  content,
  roles,
  app,
}: {
  content: NhaloContent["audience"];
  roles: NhaloContent["roles"];
  app: AppCopy;
}) {
  const can = roles.table.rows.filter((row) => row.manager);
  const ownerOnly = roles.table.rows.filter((row) => !row.manager);

  return (
    <section id={NHALO_SECTIONS.audience} className="bt-wrap scroll-mt-20 py-[88px] max-md:py-16">
      <NhaloSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      <ul className="mx-auto mt-11 grid max-w-[1180px] gap-5 md:grid-cols-3">
        {content.cards.map((card, index) => (
          <Reveal
            as="li"
            key={card.title}
            style={{ transitionDelay: `${index * 90}ms` }}
            className={cn("group/card relative flex", card.family && "z-10")}
          >
            {/* Hiệu ứng rê chuột ở lớp trong để không dính độ trễ hiện dần của Reveal. */}
            <div
              className={cn(
                "group relative flex w-full flex-col gap-3 overflow-hidden rounded-[28px] border p-7 transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2",
                card.family
                  ? "border-[rgba(239,159,39,0.55)] bg-accent-tint shadow-[0_16px_36px_rgba(166,95,0,0.14)] hover:shadow-[0_24px_48px_rgba(166,95,0,0.24)]"
                  : "border-line bg-card hover:border-[rgba(239,159,39,0.6)] hover:shadow-[0_22px_44px_rgba(166,95,0,0.18)]",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-[radial-gradient(circle,rgba(239,159,39,0.28),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="relative flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-navy text-accent transition-[background-color,color,rotate,scale] duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-accent group-hover:text-on-accent">
                  <MsIcon name={card.icon} size={24} />
                </span>
                <span className="rounded-full bg-card-soft px-3 py-1 text-[12.5px] font-semibold text-ink-muted transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                  {card.tag}
                </span>
              </span>
              <h3 className="relative mt-1 text-[20px] leading-[1.3] font-semibold text-ink transition-colors duration-300 group-hover:text-accent-text">
                {card.title}
              </h3>
              <p className="relative text-[15px] leading-[1.6] text-ink-muted">{card.desc}</p>
            </div>
            {card.family && (
              // Mũi tên xoắn móc từ góc phải dưới thẻ xuống khối phân quyền; tự vẽ ra khi cuộn tới.
              <svg
                aria-hidden="true"
                viewBox="0 0 110 130"
                className="pointer-events-none absolute right-2 -bottom-[112px] hidden h-[140px] w-[118px] md:block"
              >
                <path
                  d="M30 4 C 62 10, 92 34, 84 62 C 78 84, 50 84, 52 66 C 54 48, 84 54, 84 78 C 84 98, 70 112, 52 122"
                  pathLength={1}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  className="transition-[stroke-dashoffset] delay-500 duration-1000 ease-out [stroke-dasharray:1] [stroke-dashoffset:1] group-[.is-in]/card:[stroke-dashoffset:0] motion-reduce:[stroke-dashoffset:0]"
                />
                <path
                  d="M52 122 L 66 121 M52 122 L 57 109"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 transition-opacity delay-[1400ms] duration-300 group-[.is-in]/card:opacity-100 motion-reduce:opacity-100"
                />
              </svg>
            )}
          </Reveal>
        ))}
      </ul>

      <Reveal
        id={NHALO_SECTIONS.roles}
        className="relative mx-auto mt-10 grid max-w-[1180px] scroll-mt-24 items-center gap-10 rounded-[32px] border border-[rgba(239,159,39,0.4)] bg-[linear-gradient(135deg,var(--accent-tint),var(--card)_70%)] p-10 max-md:p-6 lg:grid-cols-[auto_minmax(0,1fr)]"
      >
        {/* Bố mẹ trao chìa khoá cho con, góc phải dưới khối (màn rộng). */}
        <MascotArt
          name="giao-chia-khoa"
          className="absolute -right-6 bottom-2 w-[250px] max-lg:hidden"
        />
        <figure className="flex flex-col items-center gap-3 justify-self-center">
          <Phone device className="[--s:0.6]">
            <ManagerGrantScreen t={app} />
          </Phone>
          <figcaption className="text-center text-[14px] text-ink-muted">
            {roles.grantCaption}
          </figcaption>
        </figure>

        <div className="flex flex-col gap-6 lg:pb-40">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-semibold tracking-[1px] text-accent-text uppercase">
              {roles.tag}
            </span>
            <h3 className="text-[32px] leading-[1.2] font-bold text-balance text-ink max-md:text-[26px]">
              {roles.title.lead} <span className="bt-mark">{roles.title.mark}</span>
            </h3>
          </div>

          <ul className="flex flex-col gap-3.5">
            {roles.benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                  <MsIcon name="check" size={15} />
                </span>
                <span className="text-[16px] leading-[1.55] text-ink-muted">
                  <span className="font-semibold text-ink">{benefit.title}</span> {benefit.desc}
                </span>
              </li>
            ))}
          </ul>

          <div className="grid gap-4 sm:grid-cols-2">
            <PermissionList title={roles.canTitle} rows={can} allowed />
            <PermissionList title={roles.ownerOnlyTitle} rows={ownerOnly} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PermissionList({
  title,
  rows,
  allowed,
}: {
  title: string;
  rows: { label: string }[];
  allowed?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2.5 rounded-[20px] border border-line bg-card p-5">
      <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-full",
            allowed ? "bg-app-green-bg text-app-green" : "bg-card-soft text-ink-muted",
          )}
        >
          <MsIcon name={allowed ? "check" : "lock"} size={15} />
        </span>
        {title}
      </span>
      <ul className="flex flex-col gap-1.5">
        {rows.map((row) => (
          <li key={row.label} className="text-[14px] leading-[1.5] text-ink-muted">
            · {row.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
