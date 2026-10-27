import Image from "next/image";
import type { ReactNode } from "react";

import { Reveal } from "@/components/home/reveal";
import type { Avatar, BalhehStartContent } from "@/content/balheh-types";
import { BALHEH_SECTIONS } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { Av } from "./app/app-ui";
import { bxInter, MockField, MockPanel, RoleBadge, type RoleTone } from "./app/mock-parts";
import { BalhehSection, BalhehSectionHead } from "./parts";

/** "Vào việc trong vài phút" — 4 bước, mỗi bước một màn Balheh thu nhỏ (Figma: Section · Hướng dẫn). */
export function BalhehStart({ content }: { content: BalhehStartContent }) {
  return (
    <BalhehSection
      id="start"
      className="bg-[radial-gradient(200px_340px_at_21%_60%,rgba(120,185,255,0.3),transparent),radial-gradient(445px_263px_at_78%_26%,rgba(120,185,255,0.38),transparent)] dark:bg-[radial-gradient(200px_340px_at_21%_60%,rgba(120,185,255,0.1),transparent),radial-gradient(445px_263px_at_78%_26%,rgba(120,185,255,0.12),transparent)]"
    >
      <BalhehSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      <Reveal className="mt-10 flex flex-col items-center gap-10">
        <ol className="relative grid w-full gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Vạch tiến trình nối tâm 4 số bước (chỉ khi 4 bước nằm một hàng). */}
          <span
            aria-hidden="true"
            className="absolute top-[252.5px] right-[calc((100%-60px)/8)] left-[calc((100%-60px)/8)] h-[3px] bg-[linear-gradient(90deg,#ef9f27,rgba(246,176,79,0.75)_55%,#e4e7f0)] max-lg:hidden dark:bg-[linear-gradient(90deg,#ef9f27,rgba(246,176,79,0.75)_55%,rgba(255,255,255,0.12))]"
          />
          {content.steps.map((step, index) => {
            const first = index === 0;
            return (
              <li key={step.title} className="relative flex flex-col items-center px-2 text-center">
                <MockPanel className="flex h-[212px] w-full items-center justify-center overflow-hidden rounded-[20px] px-[27px]">
                  {STEP_THUMBS[index]}
                </MockPanel>
                <span
                  className={cn(
                    "mt-[18px] flex size-12 items-center justify-center rounded-full text-[17px] leading-[27.2px] font-bold",
                    first
                      ? "bg-accent text-on-accent shadow-[0_0_0_8px_rgba(239,159,39,0.18)]"
                      : "border-2 border-line bg-card text-ink",
                  )}
                >
                  {index + 1}
                </span>
                <span className="mt-[18px] text-[20px] leading-8 font-semibold tracking-[-0.01em] text-ink">
                  {step.title}
                </span>
                <span className="mt-2 max-w-[300px] text-[15.5px] leading-[24.8px] text-pretty text-ink-muted">
                  {step.desc}
                </span>
              </li>
            );
          })}
        </ol>
        <a href={`#${BALHEH_SECTIONS.contact}`} className="bt-btn bt-btn-primary">
          {content.cta}
        </a>
      </Reveal>
    </BalhehSection>
  );
}

/** Hộp màn hình Balheh trong ảnh bước (file mẫu: .fl .thumb > .bx). */
function ThumbBox({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        bxInter.className,
        "flex w-full max-w-[250px] flex-col rounded-[10px] bg-white px-3 py-2.5 text-left text-[10px] text-[#1d1f24] shadow-[0_12px_28px_rgba(35,48,94,0.12),inset_0_0_0_1px_#e5e7eb]",
        className,
      )}
    >
      {children}
    </div>
  );
}

const BLUE_BUTTON =
  "block rounded-[5px] bg-[#2556c5] py-[5px] text-center text-[10px] leading-[14px] font-bold text-white";

/** Bước 1 — màn đăng nhập (file mẫu: .th-login). */
function LoginThumb() {
  return (
    <ThumbBox className="gap-[5px]">
      <Image src="/images/home/balheh-logo.svg" alt="" width={47.6} height={14} />
      <b className="text-[12px] leading-[16.8px]">Login</b>
      <MockField small>huong@company.com</MockField>
      <MockField small>••••••••••</MockField>
      <b className={BLUE_BUTTON}>Sign in</b>
      <span className="grid grid-cols-2 gap-1.5">
        <span className="flex h-[21px] items-center justify-center gap-1 rounded-[5px] text-[9px] font-medium shadow-[inset_0_0_0_1px_#e5e7eb]">
          <b className="grid size-3 place-items-center rounded-full bg-[conic-gradient(#ea4335_0_25%,#fbbc05_0_50%,#34a853_0_75%,#4285f4_0)] text-[7px] text-white">
            G
          </b>
          Google
        </span>
        <span className="flex h-[21px] items-center justify-center gap-1 rounded-[5px] text-[9px] font-medium shadow-[inset_0_0_0_1px_#e5e7eb]">
          <span className="grid grid-cols-[5px_5px] gap-px">
            <i className="size-[5px] bg-[#f25022]" />
            <i className="size-[5px] bg-[#7fba00]" />
            <i className="size-[5px] bg-[#00a4ef]" />
            <i className="size-[5px] bg-[#ffb900]" />
          </span>
          Microsoft
        </span>
      </span>
    </ThumbBox>
  );
}

const THUMB_LABEL = "text-[9.5px] leading-[13.3px] font-semibold";

/** Bước 2 — hộp thoại tạo dự án, tên dự án đang gõ (file mẫu: .th-create). */
function CreateThumb() {
  return (
    <ThumbBox>
      <b className="text-center text-[12px] leading-[16.8px]">Create Project</b>
      <span className={cn(THUMB_LABEL, "mt-1.5 mb-[3px]")}>Project title</span>
      <MockField small>
        <span className="bh-caret">Brandsite</span>
      </MockField>
      <span className={cn(THUMB_LABEL, "mt-1.5 mb-[3px]")}>Visibility</span>
      <MockField small select>
        Private
      </MockField>
      <b className={cn(BLUE_BUTTON, "mt-[5px]")}>Create Project</b>
    </ThumbBox>
  );
}

const INVITEES: { initials: string; avatar: Avatar; name: string; role: RoleTone }[] = [
  { initials: "HU", avatar: "orange", name: "Huong", role: "owner" },
  { initials: "LA", avatar: "green", name: "Lan", role: "member" },
  { initials: "DU", avatar: "blue", name: "Duong", role: "member" },
];

/** Bước 3 — mời thành viên vào dự án (file mẫu: .th-inv). */
function InviteThumb() {
  return (
    <ThumbBox className="gap-[5px]">
      <span className={THUMB_LABEL}>Share Project</span>
      <span className="grid grid-cols-[minmax(0,1fr)_62px_auto] gap-1">
        <MockField small>lan@company.com</MockField>
        <MockField small select className="px-1.5">
          Member
        </MockField>
        <b className="flex h-[22px] items-center rounded-[6px] bg-[#2556c5] px-2 text-[9.5px] text-white">
          Add
        </b>
      </span>
      {INVITEES.map((person) => (
        <span key={person.name} className="flex items-center gap-1.5">
          <Av tone={person.avatar} text={person.initials} size={18} ring={false} />
          <span className="flex-1">{person.name}</span>
          <RoleBadge tone={person.role}>{person.role === "owner" ? "Owner" : "Member"}</RoleBadge>
        </span>
      ))}
    </ThumbBox>
  );
}

const BOARD_COLS = [
  { title: "To do", bg: "bg-[#fdf0d0]", cards: 2 },
  { title: "In Progress", bg: "bg-[#e6edf9]", cards: 2 },
  { title: "Done", bg: "bg-[#ece0fb]", cards: 1 },
];

/** Bước 4 — bảng công việc 3 cột (file mẫu: .th-board). */
function BoardThumb() {
  return (
    <ThumbBox className="grid grid-cols-3 items-start gap-[5px]">
      {BOARD_COLS.map((col) => (
        <span key={col.title} className={cn("grid gap-1 rounded-[6px] p-[5px]", col.bg)}>
          <b className="truncate rounded-[3px] bg-white px-1 py-0.5 text-[8.5px] leading-[11.9px]">
            {col.title}
          </b>
          {Array.from({ length: col.cards }, (_, index) => (
            <i
              key={index}
              className="h-6 rounded-[4px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
            />
          ))}
        </span>
      ))}
    </ThumbBox>
  );
}

const STEP_THUMBS = [
  <LoginThumb key="login" />,
  <CreateThumb key="create" />,
  <InviteThumb key="invite" />,
  <BoardThumb key="board" />,
];
