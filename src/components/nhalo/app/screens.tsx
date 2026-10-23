import Image from "next/image";
import type { ReactNode } from "react";

import type { AppCopy } from "@/content/nhalo-types";
import { cn } from "@/lib/utils";

import {
  AppButton,
  Badge,
  BottomNav,
  Checkbox,
  DetailRow,
  Fab,
  Field,
  GroupLabel,
  MsIcon,
  PeriodChips,
  StatusBar,
  TopBar,
  dots,
  fill,
  type ChipKind,
} from "./app-ui";

/*
 * Các màn hình ứng dụng dùng trong trang NhàLo (Figma: H-06, B-03, B-04, B-01, T-05, P-05, P-06
 * và trang hoá đơn người thuê). Dữ liệu mẫu (tên, số tiền) giữ nguyên như design; phần thay đổi
 * theo demo ở hero nhận qua props.
 */

const BODY = "relative flex min-h-0 flex-1 flex-col overflow-hidden";

/** H-06 — Ghi chỉ số hàng tháng. */
export function ReadingScreen({
  t,
  typed = "",
  recorded = false,
  typing = false,
  pressed = false,
}: {
  t: AppCopy;
  /** Số mới đang nhập cho P.103. */
  typed?: string;
  recorded?: boolean;
  typing?: boolean;
  pressed?: boolean;
}) {
  const r = t.reading;
  const done = recorded ? 7 : 6;
  const complete = recorded || typed === "1.348";

  return (
    <>
      <StatusBar />
      <TopBar title={r.title} sub={fill(r.sub, done)} />
      <div className={cn(BODY, "gap-3 px-4 pt-3.5")}>
        <div className="flex gap-2.5">
          <Field label={r.monthLabel} value={r.month} icon="expand_more" />
          <Field label={r.dateLabel} value="30/09/2026" icon="calendar_month" />
        </div>
        <div className="flex flex-col gap-2 rounded-[14px] bg-white p-3.5">
          <div className="flex justify-between text-[15px] leading-[20.25px] whitespace-nowrap">
            <span>{r.progress}</span>
            <span>{fill(r.rooms, done)}</span>
          </div>
          <span className="h-2 overflow-hidden rounded-lg bg-gray-50">
            <span
              className="block h-full rounded-lg bg-accent transition-[width] duration-500"
              style={{ width: `${(done / 8) * 100}%` }}
            />
          </span>
        </div>
        <MeterCard
          t={t}
          room="P.101"
          previous="1.120 kWh"
          current="1.216"
          usage="96 kWh"
          recorded
        />
        <MeterCard
          t={t}
          room="P.103"
          previous="1.284 kWh"
          current={recorded ? "1.348" : typed}
          usage={complete ? "64 kWh" : ""}
          recorded={recorded}
          typing={typing}
          demo="cv"
        />
        <div className="flex">
          <AppButton variant="primary" pressed={pressed} demo="save">
            {r.save}
          </AppButton>
        </div>
      </div>
      <BottomNav labels={t.nav} active={0} />
    </>
  );
}

function MeterCard({
  t,
  room,
  previous,
  current,
  usage,
  recorded,
  typing,
  demo,
}: {
  t: AppCopy;
  room: string;
  previous: string;
  current: string;
  usage: string;
  recorded: boolean;
  typing?: boolean;
  demo?: string;
}) {
  const r = t.reading;
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-[14px] border bg-white p-3.5 transition-colors duration-300",
        recorded ? "border-gray-100" : "border-accent shadow-[inset_0_0_0_0.5px_#ef9f27]",
      )}
    >
      <div className="flex items-center gap-[9px]">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-accent text-navy">
          <MsIcon name="bolt" size={19.2} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[15px] leading-[20.25px]">
            {room} · {r.meter}
          </span>
          <span className="text-[12px] leading-[1.35] text-app-faint">{r.lastReading}</span>
        </span>
        <Badge tone={recorded ? "green" : "orange"}>{recorded ? r.recorded : r.notRecorded}</Badge>
      </div>
      <div className="flex gap-2.5">
        <Field label={r.previous} value={previous} muted />
        <Field
          label={r.current}
          value={current || r.enter}
          placeholder={!current}
          active={typing}
          demo={demo}
        />
      </div>
      <span className="min-h-4 text-[12px] leading-[1.35] text-app-green">
        {usage && fill(r.usage, usage)}
      </span>
    </div>
  );
}

const BATCH_ROWS = [
  { room: "P.101", name: "Nguyễn Thị Anh", amount: 3620140 },
  { room: "P.102", name: "Lê Văn Bình", amount: 3438000 },
  { room: "P.103", name: "Trần Thị Cẩm", amount: 3183200 },
  { room: "P.104", name: "Vũ Thị Lan", amount: 0 },
  { room: "P.105", name: "Bùi Quang Nam", amount: 3290000 },
];

/** Tổng tiền khi đã chọn n hợp đồng sẵn sàng đầu tiên. */
export function batchTotal(selected: number) {
  return BATCH_ROWS.filter((row) => row.amount > 0)
    .slice(0, selected)
    .reduce((sum, row) => sum + row.amount, 0);
}

/**
 * Chiều cao màn hình B-03 (khổ gốc 375px): dài hơn khung 812 chuẩn để hiện đủ hai nút
 * "Lưu tất cả bản nháp" / "Tạo & gửi tất cả" ở cuối.
 */
export const BATCH_SCREEN_HEIGHT = 860;

/** B-03 — Tạo hoá đơn hàng loạt. */
export function BatchScreen({
  t,
  selected = 4,
  pressAll,
  pressGo,
}: {
  t: AppCopy;
  /** Số hợp đồng sẵn sàng đã được chọn (0–4). */
  selected?: number;
  pressAll?: boolean;
  pressGo?: boolean;
}) {
  const b = t.batch;
  // Thứ tự của từng hợp đồng trong nhóm "sẵn sàng" — n hợp đồng đầu được đánh dấu chọn.
  const readyOrder = BATCH_ROWS.map(
    (row, index) => BATCH_ROWS.slice(0, index + 1).filter((item) => item.amount > 0).length,
  );

  return (
    <>
      <StatusBar />
      <TopBar title={b.title} sub={b.sub} />
      <div className={cn(BODY, "gap-[9px] p-4")}>
        <div className="flex gap-2.5">
          <Field label={b.house} value="Nhà trọ Bình An" icon="expand_more" />
          <Field label={b.period} value="09/2026" icon="expand_more" />
        </div>
        <p className="rounded-xl bg-app-blue-bg p-3 text-[15px] leading-[20.25px] text-app-blue">
          {b.summary}
        </p>
        <div className="flex gap-2.5">
          <AppButton variant="outline" pressed={pressAll} demo="all">
            {b.selectAll}
          </AppButton>
          <AppButton variant="outline">{b.clear}</AppButton>
        </div>
        <GroupLabel>{b.contracts}</GroupLabel>
        {BATCH_ROWS.map((row, index) => {
          const ready = row.amount > 0;
          const checked = ready && readyOrder[index] <= selected;
          return (
            <div
              key={row.room}
              className={cn(
                "flex items-center gap-2.5 rounded-[14px] bg-white px-3.5 py-2.5",
                !ready && "opacity-50",
              )}
            >
              <Checkbox checked={checked} />
              <span className="flex min-w-0 flex-1 flex-col gap-[3px] text-[15px] leading-[20.25px]">
                <span className="truncate">
                  {row.room} · {row.name}
                </span>
                <span className="text-ink-muted">{ready ? dots(row.amount) : "—"}</span>
              </span>
              <Badge tone={ready ? "green" : "orange"}>{ready ? b.ready : b.noReading}</Badge>
            </div>
          );
        })}
        <div className="flex items-start justify-between rounded-[14px] bg-navy p-4 text-white">
          <span className="text-[15px] leading-[20.25px]">{fill(b.selected, selected)}</span>
          <span className="text-[26.25px] leading-[34px] font-semibold">
            {dots(batchTotal(selected))}
          </span>
        </div>
        <div className="flex gap-2.5">
          <AppButton variant="outline">{b.saveDrafts}</AppButton>
          <AppButton variant="primary" pressed={pressGo} demo="go">
            {b.createSend}
          </AppButton>
        </div>
      </div>
    </>
  );
}

export type InvoiceStatus = "draft" | "sent" | "paid";

/** B-04 — Chi tiết hoá đơn, kèm B-05 bảng chọn kênh gửi. */
export function InvoiceScreen({
  t,
  status = "sent",
  sheet = false,
  channel = -1,
  pressSend,
  pressPaid,
}: {
  t: AppCopy;
  status?: InvoiceStatus;
  sheet?: boolean;
  /** Kênh đã chọn trong bảng gửi: 0 = SMS, 1 = Email. */
  channel?: number;
  pressSend?: boolean;
  pressPaid?: boolean;
}) {
  const i = t.invoice;
  const tone = { draft: "gray", sent: "blue", paid: "green" } as const;

  return (
    <>
      <StatusBar />
      <TopBar title={i.title} sub="P.103 · Trần Thị Cẩm" />
      <div className={cn(BODY, "gap-3 p-4")}>
        <div className="flex flex-col gap-1.5 rounded-[14px] bg-white p-3.5">
          <div className="flex items-center gap-2">
            <Badge tone={tone[status]}>{i[status]}</Badge>
            <span className="text-[12px] leading-[1.35] whitespace-nowrap">
              15/09/2026 → 14/10/2026
            </span>
          </div>
          <span className="text-[26.25px] leading-[34px] font-semibold whitespace-nowrap">
            3.183.200 VND
          </span>
          <span className="text-[12px] leading-[1.35] text-ink-muted">{i.due}</span>
        </div>
        <GroupLabel>{i.breakdown}</GroupLabel>
        <div className="rounded-[14px] bg-white px-3.5 py-1.5 text-[15px] leading-[20.25px]">
          <DetailRow label={i.rent} value="2.800.000" />
          <DetailRow label={i.meterLine} value="64 kWh × 3.800" />
          <DetailRow label={i.electricity} value="243.200" />
          <DetailRow label={i.water} value="90.000" />
          <DetailRow label={i.service} value="30.000" />
          <DetailRow label={i.wifi} value="20.000" />
          <DetailRow label={i.total} value="3.183.200" />
        </div>
        {status === "draft" && (
          <div className="flex">
            <AppButton variant="primary">{i.send}</AppButton>
          </div>
        )}
        {status === "sent" && (
          <div className="flex gap-2.5">
            <AppButton variant="primary" pressed={pressPaid} demo="paid">
              {i.markPaid}
            </AppButton>
            <AppButton variant="outline">{i.resend}</AppButton>
          </div>
        )}
      </div>
      <BottomNav labels={t.nav} active={2} />

      <span
        className={cn(
          "absolute inset-0 z-[3] bg-navy/55 transition-opacity duration-300",
          sheet ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-[4] rounded-t-[22px] bg-white px-4 pt-2.5 pb-7 transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
          sheet ? "translate-y-0" : "translate-y-[105%]",
        )}
      >
        <span className="mx-auto mb-3.5 block h-[5px] w-10 rounded-full bg-gray-100" />
        <span className="block text-[18px] leading-[1.35] font-semibold">{i.sheet.title}</span>
        <span className="mt-2 mb-3.5 block text-[14px] leading-[1.35] text-ink-muted">
          {i.sheet.to} Trần Thị Cẩm · 0909 123 456
        </span>
        <SendOption
          icon="chat"
          title="SMS"
          desc={i.sheet.smsDesc}
          selected={channel === 0}
          demo="sms"
        />
        <SendOption icon="mail" title={i.sheet.email} desc={i.sheet.emailDesc} selected={false} />
        <div className="mt-1.5 flex gap-2.5">
          <AppButton variant="outline">{i.sheet.cancel}</AppButton>
          <AppButton variant="primary" pressed={pressSend} demo="send">
            {i.sheet.sendNow}
          </AppButton>
        </div>
      </div>
    </>
  );
}

function SendOption({
  icon,
  title,
  desc,
  selected,
  demo,
}: {
  icon: string;
  title: string;
  desc: string;
  selected: boolean;
  demo?: string;
}) {
  return (
    <span
      data-demo={demo}
      className={cn(
        "mb-2.5 flex items-center gap-3 rounded-xl px-3.5 py-3 transition-shadow duration-200",
        selected ? "shadow-[inset_0_0_0_2px_#23305e]" : "shadow-[inset_0_0_0_1.5px_#e4e7f0]",
      )}
    >
      <MsIcon name={icon} size={20} className="text-navy" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[15px] leading-[1.35] font-semibold">{title}</span>
        <span className="text-[12.5px] leading-[1.35] text-app-faint">{desc}</span>
      </span>
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full",
          selected ? "shadow-[inset_0_0_0_2px_#23305e]" : "shadow-[inset_0_0_0_2px_#b9bdcc]",
        )}
      >
        {selected && <span className="size-2.5 rounded-full bg-navy" />}
      </span>
    </span>
  );
}

/** B-01 — Danh sách hoá đơn theo kỳ. */
export function BillsScreen({
  t,
  paid = false,
  highlight = false,
}: {
  t: AppCopy;
  /** P.103 đã được đánh dấu đã thu. */
  paid?: boolean;
  /** Viền cam quanh thẻ P.103 (đang được chạm). */
  highlight?: boolean;
}) {
  const b = t.bills;
  const m = (month: number) => t.months[month - 1] ?? String(month);
  const chips = (list: [ChipKind, number | string][]) =>
    list.map(([kind, month]) => ({
      kind,
      label: typeof month === "number" ? m(month) : month,
    }));

  return (
    <>
      <StatusBar />
      <TopBar title={b.title} sub={fill(b.sub, paid ? 13 : 12)} />
      <div className={cn(BODY, "gap-2.5 px-4 pt-3.5")}>
        <div className="flex gap-2.5">
          <StatCard value="72.400.000" label={b.totalPeriod} />
          <StatCard value={paid ? "14.916.800" : "18.100.000"} label={b.unpaid} />
        </div>
        <div className="flex gap-2">
          <FilterChip active>{b.period}</FilterChip>
          <FilterChip active>{b.allHouses}</FilterChip>
        </div>
        <div className="flex gap-2">
          <FilterChip active>{b.all}</FilterChip>
          <FilterChip>{b.notCreatedCount}</FilterChip>
          <FilterChip>{b.draftCount}</FilterChip>
        </div>
        <span className="text-[15px] leading-[20.25px] whitespace-pre">
          {"Nhà trọ Bình An   ·   " + fill(b.contracts, 3)}
        </span>
        <BillCard
          title="P.101 · Nguyễn Thị Anh"
          sub={`3.200.000${b.perMonth} · ${b.noReadingYet}`}
          status={<Badge tone="gray">{b.notCreated}</Badge>}
          chips={chips([
            ["missed", 7],
            ["sent", 8],
            ["current", 9],
            ["scheduled", 10],
            ["scheduled", 11],
            ["more", "+4"],
          ])}
        />
        <BillCard
          title="P.103 · Trần Thị Cẩm"
          sub={`2.800.000${b.perMonth} · ${paid ? fill(b.paidOn, "06/10") : b.sentVia}`}
          status={<Badge tone={paid ? "green" : "blue"}>{paid ? b.paid : b.sent}</Badge>}
          chips={chips([
            ["paid", 7],
            ["paid", 8],
            [paid ? "paid" : "sent", 9],
            ["scheduled", 10],
            ["scheduled", 11],
            ["more", "+5"],
          ])}
          highlight={highlight}
          demo="c103"
        />
        <BillCard
          title="P.106 · Hoàng Gia Huy"
          sub={`3.100.000${b.perMonth} · ${b.late}`}
          status={<Badge tone="red">{b.overdue}</Badge>}
          chips={chips([
            ["paid", 6],
            ["paid", 7],
            ["overdue", 8],
            ["current", 9],
            ["scheduled", 10],
            ["more", "+4"],
          ])}
        />
        <span className="text-[15px] leading-[20.25px]">
          {"Chung cư mini Phú Nhuận · " + fill(b.contracts, 1)}
        </span>
        <BillCard
          title="P.204 · Phạm Văn Đức"
          sub={`2.960.000${b.perMonth} · ${fill(b.paidOn, "03/10")}`}
          status={<Badge tone="green">{b.paid}</Badge>}
          chips={chips([
            ["paid", 7],
            ["paid", 8],
            ["paid", 9],
            ["scheduled", 10],
          ])}
        />
        <Fab className="right-7 bottom-7" />
      </div>
      <BottomNav labels={t.nav} active={2} />
    </>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex flex-1 flex-col gap-0.5 rounded-xl border border-app-hairline bg-white p-2.5">
      <span className="text-[12.8px] leading-4 transition-colors">{value}</span>
      <span className="text-[8.4px] leading-[11.2px] text-app-secondary">{label}</span>
    </span>
  );
}

function FilterChip({ active, children }: { active?: boolean; children: string }) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1.5 text-[8.8px] leading-[11.2px] font-bold whitespace-nowrap",
        active ? "border-navy bg-navy text-white" : "border-slate-200 bg-white text-app-secondary",
      )}
    >
      {children}
    </span>
  );
}

function BillCard({
  title,
  sub,
  status,
  chips,
  highlight,
  demo,
}: {
  title: string;
  sub: string;
  status: ReactNode;
  chips: { kind: ChipKind; label: string }[];
  highlight?: boolean;
  demo?: string;
}) {
  return (
    <div
      data-demo={demo}
      className={cn(
        "flex shrink-0 flex-col gap-2 rounded-[14px] bg-white p-3.5 transition-shadow duration-300",
        highlight && "shadow-[inset_0_0_0_2px_#ef9f27]",
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className="min-w-0 flex-1 truncate text-[15px] leading-[20.25px]">{title}</span>
        {status}
      </div>
      <span className="text-[12px] leading-[1.35] text-app-faint">{sub}</span>
      <PeriodChips chips={chips} />
    </div>
  );
}

/** Trang hoá đơn người thuê mở từ link SMS/Email (Figma: Tenant invoice). */
export function TenantBillScreen({ t }: { t: AppCopy }) {
  const b = t.tenantBill;
  return (
    <>
      <div className="flex shrink-0 flex-col gap-3 bg-navy px-5 pt-[52px] pb-[18px]">
        <Image src="/images/nhalo/nhalo-lockup-alt.svg" alt="" width={51} height={17} />
        <div className="flex items-center justify-between gap-2">
          <span className="text-[21px] leading-[1.35] font-semibold text-white">{b.title}</span>
          <span className="rounded-full bg-orange-50 px-[9px] py-1 text-[12px] leading-[1.35] font-semibold whitespace-nowrap text-orange-800">
            {b.unpaid}
          </span>
        </div>
        <span className="text-[14px] leading-[1.35] text-slate-200">{b.sub}</span>
      </div>
      <div className="flex flex-1 flex-col gap-[5px] bg-white px-5 py-4 text-[14px] leading-[1.35]">
        <DetailRow label={b.tenant} value="Trần Thị Cẩm" strong />
        <DetailRow label={b.contractCode} value="HD-20260315-003" strong />
        <DetailRow label={b.invoiceCode} value="000027" strong />
        <DetailRow label={b.room} value="2.800.000đ" strong />
        <DetailRow label={b.electricity} value="243.200đ" strong />
        <DetailRow label={b.water} value="90.000đ" strong />
        <DetailRow label={b.service} value="30.000đ" strong />
        <DetailRow label={b.wifi} value="20.000đ" strong />
        <div className="flex items-start justify-between rounded-xl bg-orange-50 p-3.5 font-semibold whitespace-nowrap">
          <span className="uppercase">{b.total}</span>
          <span className="text-[21px] leading-[1.35] text-orange-800">3.183.200đ</span>
        </div>
        <div className="flex justify-between font-semibold whitespace-nowrap text-app-red">
          <span>{b.due}</span>
          <span>05/10/2026</span>
        </div>
        <div className="flex flex-col items-center gap-2.5 rounded-[14px] border-2 border-dashed border-gray-100 p-3.5">
          <span className="text-center font-semibold">{b.scan}</span>
          <Image src="/images/nhalo/vietqr.svg" alt="" width={150} height={150} />
          <span className="flex w-full flex-col rounded-[10px] bg-gray-50 p-2.5 text-[12px] leading-[1.35]">
            <BankRow label={b.bank} value="Vietcombank" />
            <BankRow label={b.account} value="0071000123456" />
            <BankRow label={b.holder} value="NGUYEN VAN HAI" />
            <BankRow label={b.note} value="HD P103 09/2026" />
          </span>
        </div>
      </div>
    </>
  );
}

function BankRow({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex justify-between gap-2 whitespace-nowrap">
      <span className="text-ink-muted">{label}</span>
      <span>{value}</span>
    </span>
  );
}

const LEGEND_COLORS = ["bg-chip-paid", "bg-chip-sent", "bg-chip-overdue", "bg-accent"];

/** T-05 — Chi tiết hợp đồng. */
export function ContractScreen({ t }: { t: AppCopy }) {
  const c = t.contract;
  const m = (month: number) => t.months[month - 1] ?? String(month);

  return (
    <>
      <StatusBar />
      <TopBar title={c.title} sub={c.sub} size="sm" />
      <div className={cn(BODY, "gap-3 p-4")}>
        <div className="flex gap-3 rounded-[14px] bg-white p-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-[14px] font-semibold text-white">
            NA
          </span>
          <span className="flex flex-col gap-[3px] text-[14px] leading-[1.35]">
            <span className="font-semibold">Nguyễn Thị Anh</span>
            <span>0909 123 456</span>
          </span>
        </div>
        <GroupLabel>{c.terms}</GroupLabel>
        <div className="rounded-[14px] bg-white px-3.5 text-[14px] leading-[1.35]">
          <DetailRow label={c.start} value="15/03/2026" strong />
          <DetailRow label={c.end} value="15/03/2027" strong />
          <DetailRow label={c.deposit} value="3.200.000" strong />
          <DetailRow label={c.rent} value="3.200.000" strong />
          <DetailRow label={c.electricity} value="3.800 / kWh" strong />
          <DetailRow label={c.service} value="15.000 × 22 m² = 330.000" strong />
          <DetailRow label={c.rentCycle} value={c.rentCycleValue} strong />
          <DetailRow label={c.otherCycle} value={c.otherCycleValue} strong />
          <DetailRow label={c.due} value={c.dueValue} strong />
        </div>
        <GroupLabel>{c.meters}</GroupLabel>
        <div className="rounded-[14px] bg-white px-3.5 text-[14px] leading-[1.35]">
          <DetailRow label={c.moveIn} value="15/03/2026 · 980 kWh · 40 m³" strong />
          <DetailRow label={c.latest} value="01/09/2026 · 1.216 kWh · 59 m³" strong />
        </div>
        <div className="flex gap-2.5">
          <AppButton variant="dark" size="sm">
            {c.renew}
          </AppButton>
          <AppButton variant="outline" size="sm">
            {c.amend}
          </AppButton>
        </div>
        <div className="flex gap-2.5">
          <AppButton variant="outline" size="sm">
            {c.history}
          </AppButton>
          <AppButton variant="outline" size="sm">
            {c.endContract}
          </AppButton>
        </div>
        <GroupLabel>{c.schedule}</GroupLabel>
        <PeriodChips
          size="sm"
          chips={[
            { kind: "paid", label: m(7) },
            { kind: "paid", label: m(8) },
            { kind: "sent", label: m(9) },
            { kind: "scheduled", label: m(10) },
            { kind: "scheduled", label: m(11) },
            { kind: "more", label: "+5" },
          ]}
        />
        <span className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] leading-[1.35] text-ink-muted">
          {c.legend.map((label, index) => (
            <span key={label} className="flex items-center gap-1">
              <span
                className={cn(
                  "size-2 rounded-full",
                  LEGEND_COLORS[index] ?? "border border-slate-200 bg-white",
                )}
              />
              {label}
            </span>
          ))}
        </span>
      </div>
      <BottomNav labels={t.nav} active={1} />
    </>
  );
}

const MANAGERS = [
  {
    initials: "NL",
    name: "Nguyễn Thị Lan",
    phone: "0988 111 222",
    grant: "granted3",
    active: true,
  },
  {
    initials: "TH",
    name: "Trần Quốc Hùng",
    phone: "0977 333 444",
    grant: "granted1",
    active: true,
  },
  {
    initials: "VM",
    name: "Võ Thị Mai",
    phone: "0966 555 666",
    grant: "grantedNone",
    active: false,
  },
] as const;

/** P-05 — Danh sách người quản lý. */
export function ManagersScreen({ t }: { t: AppCopy }) {
  const g = t.managers;
  return (
    <>
      <StatusBar />
      <TopBar title={g.title} size="sm" />
      <div className={cn(BODY, "gap-3 p-4")}>
        <GroupLabel>{g.list}</GroupLabel>
        {MANAGERS.map((manager, index) => (
          <div
            key={manager.initials}
            className="flex items-start gap-3 rounded-[14px] bg-white p-3.5"
          >
            <span
              className={cn(
                "flex size-[52px] shrink-0 items-center justify-center rounded-full text-[14px] font-semibold text-white",
                index === 0 ? "bg-navy" : "bg-ink-muted",
              )}
            >
              {manager.initials}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-[3px] leading-[1.35]">
              <span className="text-[14px] font-semibold">{manager.name}</span>
              <span className="text-[14px] text-ink-muted">{manager.phone}</span>
              <span className="text-[12px] text-app-faint">{g[manager.grant]}</span>
            </span>
            <Badge tone={manager.active ? "green" : "red"}>
              {manager.active ? g.managing : g.paused}
            </Badge>
          </div>
        ))}
        <Fab className="right-[45px] bottom-[45px]" />
      </div>
      <BottomNav labels={t.nav} active={3} />
    </>
  );
}

const HOUSES = [
  { name: "Nhà trọ Bình An", rooms: 24, granted: true },
  { name: "Chung cư mini Phú Nhuận", rooms: 8, granted: true },
  { name: "Dãy trọ Tân Bình", rooms: 6, granted: false },
];

/** P-06 — Giao nhà cho người quản lý. */
export function ManagerGrantScreen({ t }: { t: AppCopy }) {
  const g = t.managers;
  return (
    <>
      <StatusBar />
      <TopBar title={g.title} size="sm" />
      <div className={cn(BODY, "gap-3 p-4")}>
        <GroupLabel>{g.profile}</GroupLabel>
        <Field label={g.name} value="Nguyễn Thị Lan" className="flex-none" />
        <div className="flex gap-2.5">
          <Field label={g.role} value={g.roleValue} muted />
          <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
            <span className="text-[12px] leading-[1.35]">&nbsp;</span>
            <span className="flex h-11 items-center gap-2.5 rounded-[10px] bg-white px-2.5">
              <span className="min-w-0 flex-1 text-[14px] leading-[1.35] font-semibold">
                {g.managing}
              </span>
              <Image src="/images/nhalo/app-switch-on.svg" alt="" width={44} height={26} />
            </span>
          </div>
        </div>
        <Field label={g.phone} value="0988 111 222" muted className="flex-none" />
        <GroupLabel>{g.access}</GroupLabel>
        {HOUSES.map((house) => (
          <div
            key={house.name}
            className={cn(
              "flex items-start gap-3 rounded-xl border-[1.6px] bg-white p-3.5",
              house.granted ? "border-navy" : "border-gray-100",
            )}
          >
            <Checkbox checked={house.granted} />
            <span className="flex flex-col gap-[3px] text-[14px] leading-[1.35]">
              <span className="font-semibold">{house.name}</span>
              <span>{fill(g.rooms, house.rooms)}</span>
            </span>
          </div>
        ))}
        <div className="flex gap-2.5">
          <AppButton variant="outline" size="sm">
            {g.cancel}
          </AppButton>
          <AppButton variant="dark" size="sm">
            {g.save}
          </AppButton>
        </div>
      </div>
      <BottomNav labels={t.nav} active={3} />
    </>
  );
}
