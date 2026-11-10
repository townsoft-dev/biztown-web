/**
 * Ô "để lại số điện thoại hoặc email" ở khối cuối trang /nhalo/: kiểm tra đầu vào dùng chung
 * cho trình duyệt (báo lỗi ngay) và route handler src/app/api/nhalo-lead/route.ts.
 */
import { TAI_CODE_PATTERN } from "@/config/tai-links";
import { EMAIL, PHONE, normalizePhone } from "@/lib/contact-form";
import { LOCALES, type Locale } from "@/i18n/config";

export const LEAD_MAX_LENGTH = 255;

export type LeadError = "required" | "invalid";

export type LeadValues = {
  /** Số điện thoại (đã bỏ khoảng trắng, dấu chấm…) hoặc email (chữ thường). */
  contact: string;
  kind: "phone" | "email";
  /** utm_campaign của người vào (mã link /tai/), rỗng nếu không có hoặc không hợp lệ. */
  campaign: string;
  locale: Locale;
  /** Bẫy bot: ô ẩn trên form, người thật để trống. */
  website: string;
};

function text(record: Record<string, unknown>, key: string) {
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
}

export function validateLead(input: unknown): { values: LeadValues; error?: LeadError } {
  const record =
    typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const raw = text(record, "contact").slice(0, LEAD_MAX_LENGTH);
  const campaign = text(record, "campaign").toLowerCase();
  const isEmail = raw.includes("@");
  const values: LeadValues = {
    contact: isEmail ? raw.toLowerCase() : normalizePhone(raw),
    kind: isEmail ? "email" : "phone",
    campaign: TAI_CODE_PATTERN.test(campaign) ? campaign : "",
    locale: LOCALES.find((l) => l === record.locale) ?? "vi",
    website: text(record, "website"),
  };
  if (!raw) return { values, error: "required" };
  const valid = isEmail ? EMAIL.test(values.contact) : PHONE.test(values.contact);
  return valid ? { values } : { values, error: "invalid" };
}
