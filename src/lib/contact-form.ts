/**
 * Form liên hệ (/lien-he): kiểu dữ liệu và kiểm tra đầu vào dùng chung cho trình duyệt
 * (báo lỗi theo ô trước khi gửi) và route handler src/app/api/contact/route.ts (kiểm lại phía
 * server). Không phụ thuộc thư viện nào để chạy được ở cả hai phía.
 */
import { LOCALES, type Locale } from "@/i18n/config";

export const CONTACT_FIELDS = ["name", "company", "email", "phone", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

/** Độ dài tối đa từng ô — đặt cả vào maxLength của input. */
export const CONTACT_MAX_LENGTH: Record<ContactField, number> = {
  name: 100,
  company: 200,
  email: 255,
  phone: 30,
  message: 2000,
};

/** Ô không bắt buộc. */
export const CONTACT_OPTIONAL: ReadonlySet<ContactField> = new Set(["company"]);

export type ContactErrorCode = "required" | "invalid" | "tooLong";
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export type ContactValues = Record<ContactField, string>;

export type ContactPayload = ContactValues & {
  locale: Locale;
  /** Bẫy bot: ô ẩn trên form, người thật để trống. */
  website: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Sau khi bỏ khoảng trắng, dấu chấm, gạch, ngoặc: 8–15 chữ số, có thể có "+" ở đầu. */
const PHONE = /^\+?\d{8,15}$/;

export function normalizePhone(value: string) {
  return value.replace(/[\s.\-()]/g, "");
}

function text(input: Record<string, unknown>, key: string) {
  const value = input[key];
  return typeof value === "string" ? value.trim() : "";
}

/** Chuẩn hoá và kiểm tra dữ liệu form. `errors` rỗng nghĩa là hợp lệ. */
export function validateContact(input: unknown): {
  values: ContactPayload;
  errors: ContactErrors;
} {
  const record =
    typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const locale = LOCALES.find((l) => l === record.locale) ?? "vi";
  const values: ContactPayload = {
    name: text(record, "name"),
    company: text(record, "company"),
    email: text(record, "email").toLowerCase(),
    phone: normalizePhone(text(record, "phone")),
    message: text(record, "message"),
    locale,
    website: text(record, "website"),
  };

  const errors: ContactErrors = {};
  for (const field of CONTACT_FIELDS) {
    const value = values[field];
    if (!value) {
      if (!CONTACT_OPTIONAL.has(field)) errors[field] = "required";
    } else if (value.length > CONTACT_MAX_LENGTH[field]) {
      errors[field] = "tooLong";
    }
  }
  if (!errors.email && values.email && !EMAIL.test(values.email)) errors.email = "invalid";
  if (!errors.phone && values.phone && !PHONE.test(values.phone)) errors.phone = "invalid";

  return { values, errors };
}
