import type { NhaloSection, PageKey } from "@/i18n/config";

/**
 * Nội dung trang NhàLo theo ngôn ngữ (src/content/<locale>/nhalo.ts). Cấu trúc bám các section
 * trong Figma "NhàLo · HTML V7 · VI · 1440"; component ở src/components/nhalo/ chỉ lo hiển thị.
 */

/** Tiêu đề hai dòng: dòng sau có vạch tô cam phía dưới (Figma: Highlighted phrase). */
export type MarkTitle = { lead: string; mark: string };

/** Đích liên kết: một section trong trang, một trang khác của site, hoặc chưa có (chữ thường). */
export type NhaloLink = { section: NhaloSection } | { page: PageKey } | null;

/** Một mục chú thích: tiêu đề đậm + mô tả. */
export type Note = { title: string; desc: string };

export type HeroChapter = {
  tab: string;
  title: string;
  lead: string;
  /** Ba bước thao tác, sáng dần theo demo. */
  steps: [string, string, string];
  toast: { title: string; sub: string };
};

export type StoreBadge = { prefix: string; badge: string };

export type NhaloContent = {
  header: {
    menu: { label: string; to: NhaloSection }[];
    menuLabel: string;
    openMenu: string;
    closeMenu: string;
    cta: string;
    biztownLabel: string;
  };
  hero: {
    title: [string, string];
    lead: string;
    store: StoreBadge;
    note: string;
    chaptersLabel: string;
    pauseLabel: string;
    playLabel: string;
    chapters: [HeroChapter, HeroChapter, HeroChapter, HeroChapter];
    /** Thẻ tóm tắt bên phải demo, theo từng chương. */
    summary: {
      reading: { title: string; previous: string; current: string; used: string; amount: string };
      batch: { title: string; ready: string; missing: string; total: string };
      tenantLabel: string;
      collect: { title: string };
    };
    bubble: string;
  };
  strip: { label: string; items: [string, string, string] };
  features: {
    tag: string;
    title: MarkTitle;
    lead: string;
    steps: { tab: string; title: string; callouts: Note[] }[];
  };
  utilities: {
    tag: string;
    title: MarkTitle;
    lead: string;
    oldTenant: { name: string; role: string };
    newTenant: { name: string; role: string };
    periodStart: string;
    periodEnd: string;
    changeover: string;
    oldPays: string;
    newPays: string;
    whole: string;
    match: string;
    /** Nhãn cho trình đọc màn hình của nút kéo ngày đổi khách (không hiện trên trang). */
    dayLabel: string;
    safeguards: [Note, Note, Note];
  };
  contract: { tag: string; title: MarkTitle; lead: string; callouts: Note[] };
  roles: {
    tag: string;
    title: MarkTitle;
    lead: string;
    heading: string;
    benefits: Note[];
    listCaption: string;
    grantCaption: string;
    table: {
      caption: string;
      owner: string;
      manager: string;
      yes: string;
      no: string;
      /** Quyền và việc người quản lý có quyền đó không (chủ nhà luôn có). */
      rows: { label: string; manager: boolean }[];
    };
  };
  start: { tag: string; title: MarkTitle; lead: string; steps: Note[]; cta: string };
  faq: { tag: string; title: MarkTitle; items: { q: string; a: string }[] };
  band: {
    title: [string, string];
    store: StoreBadge;
    consult: string;
    inputLabel: string;
    cta: string;
  };
  footer: {
    tagline: string;
    taxCode: string;
    address: string;
    columns: { title: string; links: { label: string; to: NhaloLink }[] }[];
    copyright: string;
  };
  app: AppCopy;
};

/**
 * Chữ trong các màn hình ứng dụng (mockup điện thoại). Tên người, tên nhà, số tiền giữ nguyên
 * như dữ liệu mẫu trong Figma; chỗ có số thay đổi theo demo dùng {n}.
 */
export type AppCopy = {
  nav: [string, string, string, string];
  /** Tên tháng ngắn trên ô lịch hoá đơn, index 0 = tháng 1. */
  months: string[];
  reading: {
    title: string;
    sub: string;
    monthLabel: string;
    month: string;
    dateLabel: string;
    progress: string;
    rooms: string;
    meter: string;
    lastReading: string;
    recorded: string;
    notRecorded: string;
    previous: string;
    current: string;
    enter: string;
    usage: string;
    save: string;
  };
  batch: {
    title: string;
    sub: string;
    house: string;
    period: string;
    summary: string;
    selectAll: string;
    clear: string;
    contracts: string;
    ready: string;
    noReading: string;
    selected: string;
    saveDrafts: string;
    createSend: string;
  };
  invoice: {
    title: string;
    draft: string;
    sent: string;
    paid: string;
    due: string;
    breakdown: string;
    rent: string;
    meterLine: string;
    electricity: string;
    water: string;
    service: string;
    wifi: string;
    total: string;
    markPaid: string;
    resend: string;
    send: string;
    sheet: {
      title: string;
      to: string;
      smsDesc: string;
      email: string;
      emailDesc: string;
      cancel: string;
      sendNow: string;
    };
  };
  bills: {
    title: string;
    sub: string;
    totalPeriod: string;
    unpaid: string;
    period: string;
    allHouses: string;
    all: string;
    notCreatedCount: string;
    draftCount: string;
    contracts: string;
    perMonth: string;
    noReadingYet: string;
    sentVia: string;
    paidOn: string;
    late: string;
    notCreated: string;
    sent: string;
    paid: string;
    overdue: string;
  };
  tenantBill: {
    title: string;
    unpaid: string;
    sub: string;
    tenant: string;
    contractCode: string;
    invoiceCode: string;
    room: string;
    electricity: string;
    water: string;
    service: string;
    wifi: string;
    total: string;
    due: string;
    scan: string;
    bank: string;
    account: string;
    holder: string;
    note: string;
  };
  contract: {
    title: string;
    sub: string;
    terms: string;
    start: string;
    end: string;
    deposit: string;
    rent: string;
    electricity: string;
    service: string;
    rentCycle: string;
    rentCycleValue: string;
    otherCycle: string;
    otherCycleValue: string;
    due: string;
    dueValue: string;
    meters: string;
    moveIn: string;
    latest: string;
    renew: string;
    amend: string;
    history: string;
    endContract: string;
    schedule: string;
    /** Chú giải màu ô lịch: đã thu, đã gửi, quá hạn, kỳ hiện tại, dự kiến. */
    legend: [string, string, string, string, string];
  };
  managers: {
    title: string;
    list: string;
    granted3: string;
    granted1: string;
    grantedNone: string;
    managing: string;
    paused: string;
    profile: string;
    name: string;
    role: string;
    roleValue: string;
    phone: string;
    access: string;
    rooms: string;
    cancel: string;
    save: string;
  };
};
