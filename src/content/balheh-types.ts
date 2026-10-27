import type { BalhehSection, PageKey } from "@/i18n/config";

/**
 * Nội dung trang Balheh theo ngôn ngữ (src/content/<locale>/balheh.ts). Cấu trúc bám các section
 * trong Figma "Balheh · Homepage · VI · 1440"; component ở src/components/balheh/ chỉ lo hiển thị.
 */

/** Đích liên kết: một section trong trang, một trang khác của site, hoặc chưa có (chữ thường). */
export type BalhehLink = { section: BalhehSection } | { page: PageKey } | null;

/** Tiêu đề có một cụm chữ tô màu: lead + kw + tail (Figma: Highlighted phrase). */
export type KwTitle = { lead: string; kw: string; tail?: string };

export type BalhehContent = {
  header: {
    menu: { label: string; to: BalhehSection }[];
    menuLabel: string;
    openMenu: string;
    closeMenu: string;
    cta: string;
    biztownLabel: string;
  };
  hero: {
    title: KwTitle;
    lead: string;
    cta: string;
    consult: string;
    note: string;
    chaptersLabel: string;
    pauseLabel: string;
    playLabel: string;
    chapters: [string, string, string, string];
  };
  strip: { label: string; items: [string, string, string] };
  features: BalhehFeaturesContent;
  more: BalhehMoreContent;
  mission: BalhehMissionContent;
  manage: BalhehManageContent;
  roles: BalhehRolesContent;
  start: BalhehStartContent;
  faq: BalhehFaqContent;
  band: BalhehBandContent;
  footer: {
    tagline: string;
    taxCode: string;
    address: string;
    columns: { title: string; links: { label: string; to: BalhehLink }[] }[];
    copyright: string;
  };
  app: BalhehAppCopy;
};

/** Thẻ công việc: cột, nhãn, tiêu đề, % hoàn thành, trạng thái, checklist, bình luận, đính kèm. */
export type BoardCard = {
  col: 0 | 1 | 2;
  labels: { text: string; tone: LabelTone }[];
  title: string;
  progress: number;
  status: CardStatus;
  checks: string;
  comments: number;
  files: number;
  due?: string;
  alarm?: boolean;
  people: Avatar[];
};

export type LabelTone = "purple" | "yellow" | "red" | "green";
export type CardStatus = "Active" | "Pending" | "Completed";
/** Màu avatar trong ứng dụng (file mẫu: c1…c5). */
export type Avatar = "blue" | "orange" | "green" | "purple" | "navy";

/**
 * Chữ trong cửa sổ ứng dụng Balheh (mockup trình duyệt). Giao diện Balheh để tiếng Anh như sản
 * phẩm thật (Create, Add new card…); dữ liệu mẫu (tên thẻ, tin nhắn, trang wiki) theo ngôn ngữ.
 */
export type BalhehAppCopy = {
  board: {
    cols: [string, string, string];
    cards: BoardCard[];
    /** Thẻ mới gõ trong demo. */
    newCard: string;
  };
  chat: {
    channels: { name: string; threads: { name: string; count: number }[] }[];
    thread: string;
    messages: {
      name: string;
      avatar: Avatar;
      time: string;
      text?: string;
      task?: string;
      file?: string;
      reactions: [string, number][];
      pinned?: boolean;
    }[];
    people: { name: string; role: string; avatar: Avatar; away?: boolean }[];
    hover: [string, string, string, string, string];
    /** Demo: tin nhắn gửi đi, task và thread tạo từ tin nhắn đó. */
    demo: {
      msg: string;
      task: string;
      taskToast: string;
      thread: string;
      threadToast: string;
      started: string;
      oneMessage: string;
    };
  };
  wiki: {
    tree: { name: string; pages: string[] }[];
    tabs: [string, string];
    crumb: string;
    title: string;
    desc: string;
    h1: string;
    todo1: string[];
    h2: string;
    todo2: string[];
    rel: string;
    task: string;
    owner: string;
    role: string;
    created: string;
    edited: string;
    /** Demo: trang mới gõ trong wiki. */
    demo: {
      page: string;
      attend: string;
      dec: string;
      todos: [string, string];
      saved: string;
      just: string;
    };
  };
  dash: {
    summary: string;
    memos: { tone: "yellow" | "green"; title: string; text: string; meta: string }[];
    upcoming: { left: string; title: string }[];
    overdue: { left: string; title: string }[];
    /** Demo: memo mới. */
    demo: { title: string; text: string; toast: string; just: string };
  };
};

/**
 * Section "Cách Balheh hoạt động" (Figma: How it works / Flow): 4 bước Giao việc → Trao đổi →
 * Lưu tài liệu → Kết nối. Ba bước đầu là một màn hình Balheh có chú thích; bước cuối là bản thử
 * nối tin nhắn, thẻ và trang wiki. Dữ liệu dùng chung với hero (kênh, tin nhắn, trang wiki) lấy
 * từ `BalhehAppCopy`; ở đây chỉ có phần riêng của section.
 */
export type BalhehFeaturesContent = {
  tag: string;
  /** Hai dòng: `lead` rồi xuống dòng `kw` (Figma không tô cụm chữ ở tiêu đề này). */
  title: KwTitle;
  lead: string;
  /** Nhãn 4 bước trên thanh tiến trình. */
  tabs: [string, string, string, string];
  /** Tiêu đề + chú thích của 3 màn hình (Giao việc, Trao đổi, Lưu tài liệu), theo thứ tự số. */
  screens: [BalhehFeaturesScreen, BalhehFeaturesScreen, BalhehFeaturesScreen];
  /** Màn chi tiết thẻ (bước Giao việc). */
  card: {
    title: string;
    checklist1: string;
    tasks1: BalhehCheckItem[];
    checklist2: string;
    tasks2: BalhehCheckItem[];
    /** Việc đang mở bên phải. */
    task: string;
    desc: string;
    file: string;
    added: string;
    comment: string;
    writeComment: string;
    taskPlaceholder: string;
  };
  /** Màn Channels có thread mở bên phải (bước Trao đổi). */
  chat: { reply: string };
  /** Màn tìm kiếm Wiki (bước Lưu tài liệu). */
  search: {
    query: string;
    results: string;
    /** Đoạn trích: cụm trong {ngoặc nhọn} được tô sáng. */
    groups: { name: string; count: number; snippets: string[] }[];
    more: { name: string; count: number }[];
  };
  /** Bước Kết nối: thử nối tin nhắn → việc, tài liệu → thẻ, thẻ → thread. */
  link: {
    /** Tên vùng các bước (cho trình đọc màn hình). */
    stepsLabel: string;
    steps: [BalhehLinkStep, BalhehLinkStep, BalhehLinkStep];
    reset: string;
    /** Tin nhắn của Minh được biến thành việc. */
    msg: string;
    taskId: string;
    newTask: string;
    from: string;
    docs: string;
    /** Trang wiki được gắn vào thẻ. */
    page: string;
    rel: string;
    replies: string;
    map: { title: string; rows: [string, string][]; note: string };
  };
};

export type BalhehFeaturesScreen = { title: string; callouts: string[] };

/** Một dòng checklist: chữ, đã xong chưa, dòng đang chọn / có chuông hạn chót. */
export type BalhehCheckItem = { text: string; done: boolean; mark?: "selected" | "alarm" };

export type BalhehLinkStep = { title: string; desc: string; action: string; done: string };

/** Màn hình trong thư viện "Khám phá thêm" (file mẫu: GSHOT). */
export type BalhehMoreScreen = "ana" | "noti" | "act" | "set" | "links";

/**
 * Section "Khám phá thêm" (Figma: Section · Khám phá thêm + Explore more / Gallery): 5 tab, mỗi tab
 * một chú thích bên trái và một ảnh chụp ứng dụng bên phải.
 */
export type BalhehMoreContent = {
  tag: string;
  title: KwTitle;
  lead: string;
  prevLabel: string;
  nextLabel: string;
  tabs: {
    screen: BalhehMoreScreen;
    /** Chữ trên nút tab. */
    label: string;
    /** Tiêu đề thẻ chú thích bên trái. */
    title: string;
    points: [string, string, string];
  }[];
  /** Dữ liệu mẫu riêng của các màn hình này (phần còn lại lấy từ BalhehAppCopy). */
  shots: {
    /** Mô tả dự án ở màn Cài đặt; câu đầu được bôi chọn ở màn Liên kết tài liệu. */
    projectDesc: string;
    /** Tin trả lời mới hiện trong bảng thông báo. */
    newReply: string;
  };
};

/**
 * "Tại sao Balheh ra đời?" (Figma: Section · Sứ mệnh): ba thẻ sứ mệnh / tầm nhìn / mục tiêu và
 * khung so sánh trước–sau có thanh kéo. Bên "trước" là ba cửa sổ công cụ rời rạc + tờ giấy nhớ;
 * bên "sau" là khối dashboard Balheh (chữ giao diện tiếng Anh như sản phẩm thật).
 */
export type BalhehMissionContent = {
  tag: string;
  title: KwTitle;
  lead: string;
  mission: { label: string; text: string };
  vision: { label: string; text: string };
  goals: { label: string; items: [string, string, string] };
  compare: {
    before: string;
    after: string;
    /** Chú thích dưới khung, cũng là nhãn của thanh kéo cho trình đọc màn hình. */
    hint: string;
    /** Ba cửa sổ công cụ rời rạc: tên + hai dòng nội dung. */
    tools: [ScatteredTool, ScatteredTool, ScatteredTool];
    sticky: string;
  };
};

export type ScatteredTool = { name: string; rows: [string, string] };

/**
 * "Mọi thứ để đội chạy đều mỗi ngày" (Figma: Section · Quản lý): ba thẻ, mỗi thẻ một hình minh
 * hoạ ứng dụng (dashboard, lịch + thông báo, xác thực hai lớp) và một liên kết tới section khác.
 * Chữ trong hình minh hoạ để tiếng Anh như sản phẩm thật nên nằm trong component.
 */
export type BalhehManageContent = {
  tag: string;
  /** Figma để vạch Highlight trong suốt ở tiêu đề này nên `kw` rỗng (không tô). */
  title: KwTitle;
  cards: [ManageCard, ManageCard, ManageCard];
};

export type ManageCard = {
  title: string;
  desc: string;
  link: { label: string; to: BalhehSection };
};

/** Một ô trong bảng quyền: đủ quyền (có dấu ✓), giới hạn (chữ thường) hoặc không có quyền. */
export type BalhehPermissionCell = { level: "full" | "limited" | "none"; text: string };

/** Cột vai trò: tên theo ngôn ngữ trang + tên vai trò trong ứng dụng (bỏ trống nếu trùng). */
export type BalhehRoleHead = { name: string; app?: string };

type Four<T> = [T, T, T, T];

/** Section "Phân quyền" (Figma: Section · Phân quyền). */
export type BalhehRolesContent = {
  tag: string;
  title: KwTitle;
  lead: string;
  /** Các cách mời dưới hộp thoại Create Project: phần in đậm + phần còn lại của câu. */
  invites: { strong: string; rest: string }[];
  matrix: {
    title: string;
    /** Tên cột đầu (tính năng) — chỉ cho trình đọc màn hình. */
    featureLabel: string;
    /** Thứ tự cột: Chủ dự án, Quản lý, Thành viên, Khách. */
    roles: Four<BalhehRoleHead>;
    rows: { label: string; cells: Four<BalhehPermissionCell> }[];
  };
};

/** Section "Hướng dẫn" — 4 bước bắt đầu (Figma: Section · Hướng dẫn). */
export type BalhehStartContent = {
  tag: string;
  title: KwTitle;
  lead: string;
  /** Thứ tự: đăng ký, tạo dự án, mời thành viên, bắt tay vào việc (mỗi bước một ảnh ứng dụng). */
  steps: [BalhehStartStep, BalhehStartStep, BalhehStartStep, BalhehStartStep];
  cta: string;
};

export type BalhehStartStep = { title: string; desc: string };

/** Section Hỏi đáp của trang Balheh (Figma: Section · Hỏi đáp). Câu đầu tiên mở sẵn. */
export type BalhehFaqContent = {
  tag: string;
  title: KwTitle;
  items: { q: string; a: string }[];
};

/**
 * Khối kêu gọi cuối trang Balheh (Figma: Section · Bắt đầu với Balheh) — mọi nút CTA trên trang
 * cuộn tới đây. `cta` đưa con trỏ vào ô nhập; `inputLabel` vừa là nhãn ẩn vừa là placeholder.
 */
export type BalhehBandContent = {
  tag: string;
  title: KwTitle;
  cta: string;
  consult: string;
  inputLabel: string;
  submit: string;
};
