import type { ContactContent } from "./contact-types";
import type { NhaloSection, PageKey } from "@/i18n/config";

/**
 * Nội dung trang NhàLo theo ngôn ngữ (src/content/<locale>/nhalo.ts). Cấu trúc bám các section
 * trong Figma "NhàLo · HTML V7 · VI · 1440"; component ở src/components/nhalo/ chỉ lo hiển thị.
 */

/** Tiêu đề hai dòng: dòng sau có vạch tô cam phía dưới (Figma: Highlighted phrase). */
export type MarkTitle = { lead: string; mark: string };

/**
 * Đích liên kết: một section trong trang, một trang khác của site, một URL ngoài (mở tab mới),
 * hoặc chưa có (hiện chữ thường, không bấm được).
 */
export type NhaloLink = { section: NhaloSection } | { page: PageKey } | { external: string } | null;

/** Một mục chú thích: tiêu đề đậm + mô tả. */
export type Note = { title: string; desc: string };

/** Tiêu đề hai dòng (dòng 2 cam) + các ý có dấu tick hoặc các bước đánh số. */
export type HeroIntro = {
  headline: [string, string];
  points?: string[];
  steps?: Note[];
};

export type HeroVariant = HeroIntro & {
  /** Chữ thường và số, dùng làm mốc CSS (data-nl-v). */
  id: string;
  match: string;
};

/** `badge`: nhãn nhỏ góc trên nút tải (vd. "Sắp có"). Bỏ trống khi app đã lên store. */
/** `prefix` dùng làm chữ thay thế cho ảnh nút; `lang` chọn bản nút chính hãng. */
export type StoreBadge = { prefix: string; lang: "vi" | "en"; badge?: string };

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
    /** Nhãn cam trên tiêu đề (như banner). */
    badge: string;
    /** Mở đầu mặc định (người tự vào, banner w01…). */
    intro: HeroIntro;
    /**
     * Mở đầu riêng theo nguồn: so `match` (biểu thức chính quy) với utm_campaign, cái khớp đầu
     * tiên thắng. Muốn thêm cho bài fanpage / nhóm FB thì thêm dòng, vd. match "^f\\d".
     */
    variants: HeroVariant[];
    /** Ô QR tải app (chỉ hiện trên máy tính). */
    qr: { label: string; alt: string };
    store: StoreBadge;
    /** Nút hỏi đáp; link nằm ở siteConfig.nhaloChat, link trống thì ẩn nút. */
    chat: { zalo: string; messenger: string };
    /** Mỗi phần tử một dòng. */
    note: string[];
    /** Hai ô nổi bên màn Trang chủ (như banner tuần 1). */
    floats: { unpaid: string; vacant: string };
    /** Thông báo trượt lên lần lượt cạnh điện thoại ở hero (dữ liệu mẫu). */
    toasts: { title: string; sub: string }[];
  };
  strip: { label: string; items: [string, string, string] };
  /**
   * "Vì sao NhàLo": các hàng "Trước đây → Với NhàLo" (xoay quanh chuyện thu đủ tiền) + khối
   * Miễn phí trọn đời. `icon`: tên file ở ms/.
   */
  why: {
    tag: string;
    title: MarkTitle;
    /** Hai dòng ngắt sẵn. */
    lead: [string, string];
    before: string;
    after: string;
    rows: (Note & { icon: string; before: string })[];
    free: {
      badge: string;
      price: string;
      priceNote: string;
      points: string[];
      store: StoreBadge;
      /** Hoá đơn minh hoạ bên phải: mọi khoản phí đều 0đ, có con dấu. */
      receipt: { title: string; rows: string[]; total: string; stamp: string };
    };
  };
  /** "Dành cho ai": nhóm khách; `more` là link xuống phần Phân quyền (nếu có). */
  audience: {
    tag: string;
    title: MarkTitle;
    lead: string;
    /** Ba nhóm khách; thẻ `family` nối xuống khối Phân quyền ngay bên dưới. */
    cards: (Note & { icon: string; tag: string; family?: boolean })[];
  };
  /** Mục "Tính năng": 4 bước tự chạy, chú thích số hiện lần lượt trên màn hình app. */
  features: {
    tag: string;
    title: MarkTitle;
    lead: string;
    pauseLabel: string;
    playLabel: string;
    /** Hàng "Và còn nữa" dưới khung 6 bước (thay cho mục Điện nước và Hợp đồng riêng). */
    more: {
      title: string;
      items: (Note & { icon: string; anchor?: NhaloSection })[];
    };
    /**
     * Mỗi bước: chú thích là việc chủ nhà làm (`auto`: phần app tự làm, hiện dòng phụ ⚡);
     * `toast`: thông báo khi demo làm xong bước.
     */
    steps: {
      tab: string;
      title: string;
      callouts: (Note & { auto?: string })[];
      toast?: { title: string; sub: string };
    }[];
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
    /** Hai cột quyền gọn: việc người quản lý làm được / chỉ chủ nhà. */
    canTitle: string;
    ownerOnlyTitle: string;
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
  /** Mục "Hỗ trợ" (menu): các bước bắt đầu + hỏi đáp (faq). */
  start: {
    tag: string;
    title: MarkTitle;
    /** Các dòng ngắt sẵn (màn rộng không xuống dòng giữa câu). */
    lead: string[];
    stepsTitle: string;
    steps: Note[];
    chat: string;
  };
  /** Hỏi đáp: trang NhàLo hiện vài câu đầu (NHALO_FAQ_ON_HOME), trang /nhalo/ho-tro/ hiện hết. */
  faq: { title: string; seeAll: string; items: { q: string; a: string }[] };
  /** Trang /nhalo/ho-tro/. */
  help: NhaloHelpContent;
  band: {
    title: [string, string];
    store: StoreBadge;
    consult: string;
    inputLabel: string;
    cta: string;
    /** Thông báo của form để lại liên hệ (gửi qua /api/nhalo-lead). */
    form: {
      sending: string;
      sent: string;
      required: string;
      invalid: string;
      rateLimited: string;
      failed: string;
    };
  };
  footer: {
    tagline: string;
    /** Dòng riêng dưới mô tả: "Một sản phẩm của BizTown…". */
    maker: string;
    /** Nhãn nhóm icon mạng xã hội (cho trình đọc màn hình). */
    social: string;
    taxCode: string;
    address: string;
    columns: { title: string; links: { label: string; to: NhaloLink }[] }[];
    copyright: string;
    /** Ghi nhận nhãn hiệu cho nút store chính hãng (theo hướng dẫn của Apple / Google). */
    trademarks: string;
  };
  app: AppCopy;
};

/**
 * Chữ trong các màn hình ứng dụng (mockup điện thoại). Tên người, tên nhà, số tiền giữ nguyên
 * như dữ liệu mẫu trong Figma; chỗ có số thay đổi theo demo dùng {n}.
 */
export type AppCopy = {
  /** Dòng nhắc dưới điện thoại có chú thích: người xem tự cuộn trong màn hình. */
  scrollHint: string;
  nav: [string, string, string, string];
  /** H-04 Thêm nhà, bước ① Thông tin nhà (chữ lấy từ app NhàLo Lite). */
  addHouse: {
    title: string;
    steps: [string, string, string];
    requiredNote: string;
    name: string;
    address: string;
    roomCount: string;
    floors: string;
    roomsTitle: string;
    roomsNote: string;
    next: string;
  };
  /** H-10 Cho thuê phòng (tạo hợp đồng + người thuê trong một màn). */
  rentOut: {
    title: string;
    thisRoom: string;
    addRoom: string;
    tenant: string;
    phone: string;
    found: string;
    fullName: string;
    idNumber: string;
    period: string;
    start: string;
    end: string;
    months: string;
    money: string;
    rent: string;
    deposit: string;
    suggested: string;
    readings: string;
    electricity: string;
    water: string;
    save: string;
  };
  /** Màn Trang chủ của app (hero). */
  home: {
    greeting: string;
    owner: string;
    houses: string;
    rooms: string;
    vacant: string;
    month: string;
    collected: string;
    unpaid: string;
    overdue: string;
    expiring: string;
    myHouses: string;
    /** Dòng phụ dưới tên nhà: {n} = số phòng. */
    roomCount: string;
    vacantCount: string;
    full: string;
    left: string;
  };
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
      zalo: string;
      zaloDesc: string;
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
    /** Chọn tháng tới để xem số tiền dự kiến. */
    nextMonth: string;
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
    /** Tên dòng ở bản rút gọn (hero, Figma "Người thuê nhận được"). */
    short: { electricity: string; water: string; fees: string };
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
    /** Nhắc hợp đồng sắp hết hạn. */
    expiry: { title: string; desc: string };
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

/** Màn hình app minh hoạ cho một phần của trang Hướng dẫn. */
export type GuideScreen =
  | "addHouse"
  | "rentOut"
  | "reading"
  | "batch"
  | "tenantBill"
  | "bills"
  | "contract"
  | "managerGrant";

/** Trang /nhalo/huong-dan/: hướng dẫn sử dụng NhàLo theo từng việc. */
export type NhaloGuideContent = {
  tag: string;
  title: MarkTitle;
  lead: string;
  tocTitle: string;
  sections: {
    /** id neo trên trang (không dấu). */
    id: string;
    icon: string;
    title: string;
    lead: string;
    steps: string[];
    tip?: string;
    screen?: GuideScreen;
  }[];
  help: { title: string; desc: string; faq: string; chat: string };
};

/** Trang /nhalo/ho-tro/: hỏi đáp + gửi câu hỏi, báo lỗi (gửi email như trang Liên hệ). */
export type NhaloHelpContent = {
  tag: string;
  title: MarkTitle;
  /** Các dòng ngắt sẵn (màn rộng). */
  lead: string[];
  faqTitle: string;
  formTitle: string;
  formLead: string;
  chat: string;
  guide: string;
  /** Form gửi câu hỏi / báo lỗi — cùng cơ chế với form trang Liên hệ (/api/contact/). */
  form: ContactContent["form"];
};
