import type { SupportContent, SupportProduct } from "@/content/support-types";

import { BALHEH } from "./balheh";

export const SUPPORT: SupportContent = {
  kicker: "Trung tâm hỗ trợ",
  title: "BizTown có thể giúp gì?",
  lead: "Cần giúp gì, viết cho chúng tôi — thường trả lời trong vòng 72 giờ.",
  channels: {
    email: { label: "Gửi email", desc: "biztownofficial@townsoftvina.com" },
    zalo: { label: "Nhắn Zalo", desc: "Zalo OA của BizTown" },
    contact: { label: "Trang liên hệ", desc: "Để lại lời nhắn, BizTown gọi lại" },
  },
  provider: "Đơn vị cung cấp: Công ty TNHH Townsoft Vina",
  tipsTitle: "Để được hỗ trợ nhanh hơn",
  tips: [
    "Ghi tên sản phẩm đang dùng (NhàLo, Balheh…)",
    "Ghi số điện thoại hoặc email của tài khoản",
    "Mô tả ngắn việc đang gặp, kèm ảnh chụp màn hình nếu có",
  ],
  productsTitle: "Hỗ trợ theo sản phẩm",
  productsLabel: "Chọn sản phẩm",
  statusLabels: { live: "Đang hoạt động", soon: "Sắp ra mắt" },
  faqTitle: "Câu hỏi thường gặp",
};

export const SUPPORT_PRODUCTS: SupportProduct[] = [
  {
    key: "nhalo",
    name: "NhàLo",
    mark: { logo: "nhalo" },
    status: "live",
    intro: "Ứng dụng quản lý nhà trọ trên iOS và Android.",
    links: [
      { label: "Hướng dẫn sử dụng", page: "nhaloGuide" },
      { label: "Hỏi đáp, báo lỗi", page: "nhaloHelp" },
      { label: "Chính sách bảo mật", page: "privacy" },
      { label: "Yêu cầu xoá tài khoản", page: "deleteAccount" },
    ],
    faqs: [
      {
        q: "Tôi quên mật khẩu thì làm sao?",
        a: "Ở màn đăng nhập, bấm Quên mật khẩu, nhập số điện thoại của tài khoản rồi nhập mã OTP gửi về máy, sau đó đặt mật khẩu mới.",
      },
      {
        q: "Người thuê có phải cài ứng dụng không?",
        a: "Không. Người thuê không có tài khoản trong ứng dụng. Họ chỉ nhận hoá đơn qua SMS, email hoặc Zalo, kèm mã QR để chuyển khoản.",
      },
      {
        q: "Vì sao chưa tạo được hoá đơn cho một phòng?",
        a: "Hoá đơn chỉ tạo được khi phòng đó đã có chỉ số điện nước của kỳ cần tính. Ghi chỉ số trước, rồi quay lại tạo hoá đơn.",
      },
      {
        q: "Tôi giao nhà cho người khác quản lý được không?",
        a: "Được. Vào Hồ sơ → Tài khoản Quản lý và thêm số điện thoại của người quản lý. Quyền được cấp theo từng nhà, không phải chia sẻ tài khoản của chủ nhà.",
      },
      {
        q: "Đổi ngôn ngữ ứng dụng ở đâu?",
        a: "Vào Hồ sơ, mục Ngôn ngữ, chọn EN, VI hoặc KO.",
      },
      {
        q: "Tôi muốn xoá tài khoản",
        a: "Xem hướng dẫn tại trang Yêu cầu xoá tài khoản (lối tắt phía trên).",
      },
    ],
  },
  {
    key: "balheh",
    name: "Balheh",
    mark: { logo: "balheh" },
    status: "live",
    intro: "Nền tảng quản lý dự án trên web — ứng dụng di động sắp ra mắt.",
    links: [{ label: "Giới thiệu Balheh", page: "balheh" }],
    faqs: BALHEH.faq.items,
  },
  {
    key: "chinchu",
    name: "Chinchu",
    mark: { logo: "chinchu" },
    status: "soon",
    intro: "Nền tảng tìm nhà cho thuê chính chủ, đã xác minh qua NhàLo.",
    links: [],
    faqs: [],
    soon: "Chinchu sắp ra mắt. Tài liệu hỗ trợ sẽ có khi sản phẩm phát hành — cần hỏi trước, gửi email hoặc nhắn Zalo cho BizTown.",
  },
  {
    key: "custom",
    name: "Web & app theo yêu cầu",
    mark: { code: "</>", tone: "navy" },
    status: "live",
    intro: "Hỗ trợ cho website, ứng dụng Townsoft Vina làm riêng theo yêu cầu.",
    links: [{ label: "Dịch vụ của Townsoft Vina", href: "https://townsoftvina.com" }],
    faqs: [
      {
        q: "Hệ thống đang chạy gặp lỗi thì báo ở đâu?",
        a: "Gửi email kèm tên dự án, mô tả lỗi và ảnh chụp màn hình. Đội phụ trách dự án sẽ liên hệ lại để xử lý.",
      },
      {
        q: "Tôi muốn thêm tính năng hoặc nâng cấp hệ thống",
        a: "Để lại yêu cầu ở trang Liên hệ hoặc gửi email. BizTown sẽ tư vấn phạm vi, thời gian và chi phí trước khi làm.",
      },
      {
        q: "Sau bàn giao có được bảo trì không?",
        a: "Có. Chi tiết thời gian và phạm vi bảo trì theo hợp đồng của từng dự án.",
      },
    ],
  },
];
