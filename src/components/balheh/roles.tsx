import Image from "next/image";

import { Reveal } from "@/components/home/reveal";
import type { Avatar, BalhehPermissionCell, BalhehRolesContent } from "@/content/balheh-types";
import { cn } from "@/lib/utils";

import { Av } from "./app/app-ui";
import {
  bxInter,
  CheckDot,
  MockField,
  MockPanel,
  ROLE_TONES,
  RoleBadge,
  type RoleTone,
} from "./app/mock-parts";
import { BalhehSection, BalhehSectionHead } from "./parts";

/*
 * Dữ liệu mẫu trong ảnh ứng dụng: giao diện Balheh để tiếng Anh như sản phẩm thật, tên người
 * giống nhau ở mọi ngôn ngữ (file mẫu: rolesHTML).
 */
type Member = {
  name: string;
  initials: string;
  avatar: Avatar;
  presence: "Online" | "Idle" | "Offline";
  position: string;
  role: RoleTone;
  completion: number;
};

const MEMBERS: Member[] = [
  {
    name: "Han A Ram",
    initials: "RA",
    avatar: "navy",
    presence: "Online",
    position: "CEO",
    role: "manager",
    completion: 0,
  },
  {
    name: "Nguyen Thuy Huong",
    initials: "HU",
    avatar: "orange",
    presence: "Online",
    position: "Designer",
    role: "owner",
    completion: 61,
  },
  {
    name: "Nguyen Ngoc Tot",
    initials: "TO",
    avatar: "blue",
    presence: "Idle",
    position: "Front-end Developer",
    role: "member",
    completion: 78,
  },
  {
    name: "Vu Dang Tinh",
    initials: "TI",
    avatar: "green",
    presence: "Offline",
    position: "Back-end Developer",
    role: "member",
    completion: 49,
  },
  {
    name: "Nguyen Duy Ha",
    initials: "HA",
    avatar: "purple",
    presence: "Online",
    position: "Partner",
    role: "guest",
    completion: 78,
  },
];

const ROLE_LABEL: Record<RoleTone, string> = {
  owner: "Owner",
  manager: "Manager",
  member: "Member",
  guest: "Guest",
};

const PRESENCE_COLOR: Record<Member["presence"], string> = {
  Online: "text-[#16a34a]",
  Idle: "text-[#d97706]",
  Offline: "text-[#9ca3af]",
};

/** Màu thanh % hoàn thành (file mẫu: ≥70 xanh đậm, ≥55 xanh lá, >0 vàng, 0 xám). */
function completionColor(value: number) {
  if (value >= 70) return "#1f5130";
  if (value >= 55) return "#b5d96a";
  if (value > 0) return "#f5b301";
  return "#d1d5db";
}

/** "Mời đúng người, cho đúng quyền" (Figma: Section · Phân quyền). */
export function BalhehRoles({ content }: { content: BalhehRolesContent }) {
  const { matrix } = content;

  return (
    <BalhehSection
      id="roles"
      className="bg-[radial-gradient(432px_350px_at_100%_0%,rgba(120,185,255,0.34),transparent)] dark:bg-[radial-gradient(432px_350px_at_100%_0%,rgba(120,185,255,0.12),transparent)]"
    >
      <BalhehSectionHead tag={content.tag} title={content.title} lead={content.lead} />

      <Reveal className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-5 lg:grid-cols-[minmax(0,894fr)_minmax(0,430fr)]">
        <MockPanel className="rounded-[24px] p-3 sm:p-5">
          <MembersMock />
        </MockPanel>
        <MockPanel className="rounded-[24px] p-3 sm:p-5">
          <CreateProjectMock />
          <ul className="mt-[15px] flex flex-col gap-2 px-1 sm:px-0">
            {content.invites.map((invite) => (
              <li key={invite.strong} className="flex items-start gap-2.5">
                <CheckDot className="mt-0.5" />
                <span className="text-[14.5px] leading-[23.2px] text-ink-muted">
                  <b className="font-semibold text-ink">{invite.strong}</b>
                  {invite.rest}
                </span>
              </li>
            ))}
          </ul>
        </MockPanel>
      </Reveal>

      <Reveal className="mt-9">
        <h3
          id="balheh-roles-matrix"
          className="text-[22px] leading-[35.2px] font-semibold tracking-[-0.01em] text-ink"
        >
          {matrix.title}
        </h3>
        <div className="mt-3.5 overflow-x-auto rounded-[24px] border border-line bg-card shadow-[0_1px_2px_rgba(35,48,94,0.06)]">
          <table
            aria-labelledby="balheh-roles-matrix"
            className={cn(bxInter.className, "w-full min-w-[880px] border-collapse text-left")}
          >
            <colgroup>
              <col className="w-[20%]" />
              <col className="w-[23.2%]" />
              <col className="w-[16.7%]" />
              <col className="w-[26%]" />
              <col />
            </colgroup>
            <thead className="bg-card-soft">
              <tr className="border-b border-line">
                <th scope="col" className="px-[18px] py-4">
                  <span className="sr-only">{matrix.featureLabel}</span>
                </th>
                {matrix.roles.map((role, index) => (
                  <th key={role.name} scope="col" className="px-[18px] pt-4 pb-[15px] text-center">
                    <span className="flex flex-col items-center gap-1">
                      <RoleBadge
                        tone={ROLE_TONES[index]}
                        className="px-3 py-1 text-[12px] leading-[19.2px]"
                      >
                        {role.name}
                      </RoleBadge>
                      {role.app && (
                        <span className="text-[12.5px] leading-5 font-normal text-ink-muted">
                          {role.app}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.rows.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-b-0">
                  <th
                    scope="row"
                    className="px-[18px] py-[17px] text-[15px] leading-6 font-semibold text-ink"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, index) => (
                    <td key={index} className="px-[18px] py-[17px]">
                      <Permission cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </BalhehSection>
  );
}

function Permission({ cell }: { cell: BalhehPermissionCell }) {
  if (cell.level === "full") {
    return (
      <span className="flex items-start gap-1.5 text-[15px] leading-6 font-medium text-ink">
        <CheckDot className="mt-0.5" />
        {cell.text}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "text-[15px] leading-6",
        cell.level === "none" ? "text-[#868da7]" : "text-ink-muted",
      )}
    >
      {cell.text}
    </span>
  );
}

/** Màn Project Members của Balheh (file mẫu: .m-mem). */
function MembersMock() {
  // Cột: tên, chức danh (ẩn trên điện thoại), vai trò, % hoàn thành.
  const cols =
    "grid grid-cols-[1.4fr_0.8fr_1fr] items-center gap-2 px-2.5 sm:grid-cols-[1.5fr_1.1fr_0.8fr_1fr]";

  return (
    <div
      aria-hidden="true"
      className={cn(
        bxInter.className,
        "overflow-hidden rounded-[12px] bg-white p-3.5 text-left text-[#30343c] shadow-[0_12px_28px_rgba(35,48,94,0.1),inset_0_0_0_1px_#e5e7eb]",
      )}
    >
      <div className="mb-2.5 flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <b className="block text-[14px] leading-[19.6px] text-[#1d1f24]">Project Members</b>
          <small className="block truncate text-[10.5px] leading-[14.7px] text-[#6b7280]">
            Manage and organize your team collaborators.
          </small>
        </div>
        <MockButton icon="/images/balheh/bx-user-plus.svg" iconWidth={12}>
          Invite Member
        </MockButton>
        <MockButton icon="/images/balheh/bx-gear.svg" iconWidth={13} className="max-sm:hidden">
          Manage roles
        </MockButton>
      </div>

      <div className="overflow-hidden rounded-[8px] shadow-[inset_0_0_0_1px_#e5e7eb]">
        <div
          className={cn(
            cols,
            "bg-[#f3f4f8] py-2 text-[9.5px] leading-[13.3px] font-bold text-[#4b5563]",
          )}
        >
          <span>NAME</span>
          <span className="max-sm:hidden">POSITION</span>
          <span>ROLE</span>
          <span>COMPLETION</span>
        </div>
        {MEMBERS.map((member, index) => {
          const color = completionColor(member.completion);
          return (
            <div
              key={member.name}
              className={cn(
                cols,
                "h-[47px] text-[11px] leading-[15.4px]",
                index % 2 === 1 && "bg-[#f7f7fb]",
              )}
            >
              <span className="flex min-w-0 items-center gap-[7px]">
                <Av tone={member.avatar} text={member.initials} size={28} ring={false} />
                <span className="min-w-0">
                  <b className="block truncate">{member.name}</b>
                  <em
                    className={cn(
                      "block text-[9px] leading-[12.6px] not-italic",
                      PRESENCE_COLOR[member.presence],
                    )}
                  >
                    {member.presence}
                  </em>
                </span>
              </span>
              <span className="truncate max-sm:hidden">{member.position}</span>
              <span>
                <RoleBadge tone={member.role}>{ROLE_LABEL[member.role]}</RoleBadge>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-[5px] flex-1 overflow-hidden rounded-[2.5px] bg-[#f1f2f4]">
                  <i
                    className="block h-full rounded-[2.5px]"
                    style={{ width: `${member.completion}%`, background: color }}
                  />
                </span>
                <b className="w-7 text-[10px] leading-[14px]" style={{ color }}>
                  {member.completion}%
                </b>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MockButton({
  icon,
  iconWidth,
  children,
  className,
}: {
  icon: string;
  iconWidth: number;
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[27px] shrink-0 items-center gap-1 rounded-[5px] bg-[#2556c5] px-[9px] text-[10.5px] font-semibold whitespace-nowrap text-white",
        className,
      )}
    >
      <Image src={icon} alt="" width={iconWidth} height={12} />
      {children}
    </span>
  );
}

/** Hộp thoại Create Project + chia sẻ dự án (file mẫu: .m-dlg). */
function CreateProjectMock() {
  const label = "mb-[3px] block text-[11px] leading-[15.4px] font-medium text-[#1d1f24]";

  return (
    <div
      aria-hidden="true"
      className={cn(
        bxInter.className,
        "rounded-[12px] bg-white px-4 pt-[17px] pb-4 text-left text-[#1d1f24] shadow-[0_12px_28px_rgba(35,48,94,0.1),inset_0_0_0_1px_#e5e7eb]",
      )}
    >
      <b className="mb-[7px] block text-center text-[14px] leading-[19.6px]">Create Project</b>

      <span className={label}>
        Project title<i className="text-[#dc2626] not-italic">*</i>
      </span>
      <MockField>Brandsite</MockField>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="min-w-0">
          <span className={label}>Owner</span>
          <MockField>Nguyen Thuy Huong</MockField>
        </div>
        <div className="min-w-0">
          <span className={label}>Visibility</span>
          <MockField select>Private</MockField>
        </div>
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <span className={label}>Share Project</span>
        <small className="text-[9.5px] leading-[13.3px]">2 members</small>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_80px_auto] items-center gap-[5px]">
        <span className="flex h-7 min-w-0 items-center truncate border-b border-[#eef0f6] px-[9px] text-[10.5px] font-semibold text-[#6b7280]">
          minh@company.com
        </span>
        <MockField select className="h-[38px]">
          Member
        </MockField>
        <b className="flex h-[38px] items-center rounded-[6px] bg-[#2556c5] px-2.5 text-[10.5px] text-white">
          Add
        </b>
      </div>

      <Invitee initials="HU" avatar="orange" name="Nguyen Thuy Huong" sub="huong@company.com">
        Owner
      </Invitee>
      <Invitee initials="MI" avatar="purple" name="Minh" sub="minh@company.com · Pending">
        Member
      </Invitee>

      <b className="mx-auto mt-[11px] block w-max rounded-[6px] bg-[#2556c5] px-3.5 py-[7px] text-[11px] leading-[15.4px] text-white">
        Create Project
      </b>
    </div>
  );
}

function Invitee({
  initials,
  avatar,
  name,
  sub,
  children,
}: {
  initials: string;
  avatar: Avatar;
  name: string;
  sub: string;
  children: string;
}) {
  return (
    <div className="mt-2 grid grid-cols-[28px_minmax(0,1fr)_80px] items-center gap-2">
      <Av tone={avatar} text={initials} size={28} ring={false} />
      <span className="min-w-0">
        <b className="block truncate text-[11px] leading-[15.4px]">{name}</b>
        <small className="block truncate text-[9.5px] leading-[13.3px] text-[#6b7280]">{sub}</small>
      </span>
      <MockField select>{children}</MockField>
    </div>
  );
}
