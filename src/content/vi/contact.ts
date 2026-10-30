import type { ContactContent } from "../contact-types";

export const CONTACT: ContactContent = {
  eyebrow: "Liên hệ",
  title: ["Cùng ", { kw: "trò chuyện" }, " về việc kinh doanh của bạn"],
  lead: "Cần tư vấn sản phẩm, làm website/app theo yêu cầu hay hợp tác — để lại vài dòng, đội BizTown sẽ liên hệ lại với bạn sớm.",
  info: {
    emailLabel: "Email",
    addressLabel: "Địa chỉ",
    companyLabel: "Đơn vị vận hành",
  },
  form: {
    title: "Gửi tin nhắn cho chúng tôi",
    fields: {
      name: { label: "Họ và tên", placeholder: "Nguyễn Văn A" },
      company: { label: "Công ty", placeholder: "Tên công ty / cửa hàng" },
      email: { label: "Email", placeholder: "ban@congty.vn" },
      phone: { label: "Số điện thoại", placeholder: "0912 345 678" },
      message: { label: "Nội dung", placeholder: "Bạn cần chúng tôi hỗ trợ điều gì?" },
    },
    optional: "(không bắt buộc)",
    submit: "Gửi tin nhắn",
    sending: "Đang gửi…",
    note: "Thông tin bạn gửi chỉ dùng để BizTown liên hệ lại, không chia sẻ cho bên thứ ba.",
    errors: {
      required: "Vui lòng điền mục này.",
      emailInvalid: "Email chưa đúng định dạng.",
      phoneInvalid: "Số điện thoại chưa đúng (8–15 chữ số).",
      tooLong: "Nội dung dài quá giới hạn cho phép.",
    },
    status: {
      successTitle: "Đã gửi tin nhắn",
      successBody: "Cảm ơn bạn! Đội BizTown đã nhận được tin nhắn và sẽ liên hệ lại sớm.",
      again: "Gửi tin nhắn khác",
      rateLimited: "Bạn đã gửi nhiều lần liên tiếp. Vui lòng thử lại sau ít phút.",
      failed: "Chưa gửi được tin nhắn. Vui lòng thử lại, hoặc email trực tiếp cho chúng tôi:",
    },
  },
};
