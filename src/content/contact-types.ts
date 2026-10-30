import type { ContactField } from "@/lib/contact-form";

import type { RichText } from "./home-types";

/** Nội dung trang Liên hệ theo ngôn ngữ (src/content/<locale>/contact.ts). */
export type ContactContent = {
  eyebrow: string;
  title: RichText;
  lead: string;
  info: {
    emailLabel: string;
    addressLabel: string;
    companyLabel: string;
  };
  form: {
    title: string;
    fields: Record<ContactField, { label: string; placeholder: string }>;
    /** Chữ nhỏ cạnh nhãn ô không bắt buộc. */
    optional: string;
    submit: string;
    sending: string;
    /** Câu ghi chú dưới nút gửi. */
    note: string;
    errors: {
      required: string;
      emailInvalid: string;
      phoneInvalid: string;
      tooLong: string;
    };
    status: {
      successTitle: string;
      successBody: string;
      again: string;
      rateLimited: string;
      /** Lỗi mạng/server — kèm gợi ý gửi email trực tiếp (địa chỉ nối thêm phía sau). */
      failed: string;
    };
  };
};
