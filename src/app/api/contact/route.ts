import { validateContact } from "@/lib/contact-form";
import { escapeHtml, sendMail } from "@/lib/server/mail";
import { clientIp, takeRateLimit } from "@/lib/server/rate-limit";

/** Mỗi IP gửi tối đa 5 lần trong 10 phút. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
/** Form tối đa ~2.6 nghìn ký tự; body lớn hơn mức này chắc chắn không phải từ form. */
const MAX_BODY_BYTES = 16 * 1024;

const LOCALE_LABEL = { vi: "Tiếng Việt", en: "English" } as const;

/**
 * Form trang Liên hệ: kiểm tra dữ liệu rồi gửi email cho đội BizTown (Reply-To là người gửi).
 * Không lưu database, không ghi log nội dung liên hệ (dữ liệu cá nhân).
 *
 * Response: 200 { ok: true } · 400 { errors: { <ô>: "required" | "invalid" | "tooLong" } }
 * · 413 · 429 · 503 (chưa cấu hình mail hoặc gửi lỗi).
 */
export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return Response.json({ error: "too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const { values, errors } = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 400 });
  }

  if (!takeRateLimit(clientIp(request), RATE_LIMIT, RATE_WINDOW_MS)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  // Bot điền ô bẫy: trả về như thành công để bot không biết mà thử cách khác.
  if (values.website) {
    return Response.json({ ok: true });
  }

  const rows: [string, string][] = [
    ["Họ tên", values.name],
    ["Công ty", values.company || "—"],
    ["Email", values.email],
    ["Số điện thoại", values.phone],
    ["Ngôn ngữ trang", LOCALE_LABEL[values.locale]],
  ];

  try {
    await sendMail({
      replyTo: { name: values.name, address: values.email },
      subject: `[biztown.vn] Liên hệ mới từ ${values.name}`,
      text: [
        ...rows.map(([label, value]) => `${label}: ${value}`),
        "",
        "Nội dung:",
        values.message,
      ].join("\n"),
      html: [
        "<h2>Liên hệ mới từ biztown.vn</h2>",
        ...rows.map(([label, value]) => `<p>${label}: <b>${escapeHtml(value)}</b></p>`),
        "<p>Nội dung:</p>",
        `<blockquote>${escapeHtml(values.message)}</blockquote>`,
        "<p><i>Trả lời email này để phản hồi trực tiếp cho người gửi.</i></p>",
      ].join("\n"),
    });
  } catch (error) {
    // Chỉ ghi lỗi kỹ thuật, không ghi nội dung liên hệ.
    console.error(
      "[contact] Không gửi được email:",
      error instanceof Error ? error.message : String(error),
    );
    return Response.json({ error: "mail_failed" }, { status: 503 });
  }

  return Response.json({ ok: true });
}
