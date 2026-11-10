import { linkSource } from "@/config/tai-links";
import { validateLead } from "@/lib/nhalo-lead";
import { escapeHtml, sendMail } from "@/lib/server/mail";
import { clientIp, takeRateLimit } from "@/lib/server/rate-limit";

/** Mỗi IP gửi tối đa 5 lần trong 10 phút (đếm chung với form Liên hệ). */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 4 * 1024;

/**
 * Khối "Cần giúp nhập nhà, phòng lần đầu?" cuối trang /nhalo/: khách để lại số điện thoại hoặc
 * email → gửi email cho đội BizTown (cùng hộp thư với form Liên hệ, xem src/lib/server/mail.ts),
 * kèm mã nguồn quảng cáo. Không lưu database, không ghi log nội dung (dữ liệu cá nhân).
 *
 * Response: 200 { ok: true } · 400 { error: "required" | "invalid" } · 413 · 429 · 503.
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

  const { values, error } = validateLead(body);
  if (error) return Response.json({ error }, { status: 400 });

  if (!takeRateLimit(clientIp(request), RATE_LIMIT, RATE_WINDOW_MS)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  // Bot điền ô bẫy: trả về như thành công để bot không biết mà thử cách khác.
  if (values.website) return Response.json({ ok: true });

  const source = values.campaign
    ? `${values.campaign} (${Object.values(linkSource(values.campaign)).join(" / ")})`
    : "tự vào trang (không có mã)";
  const rows: [string, string][] = [
    [values.kind === "phone" ? "Số điện thoại" : "Email", values.contact],
    ["Nguồn", source],
    ["Ngôn ngữ trang", values.locale === "en" ? "English" : "Tiếng Việt"],
  ];

  try {
    await sendMail({
      replyTo:
        values.kind === "email" ? { name: values.contact, address: values.contact } : undefined,
      subject: `[NhàLo] Khách cần tư vấn: ${values.contact}`,
      text: [
        "Khách để lại liên hệ ở trang biztown.vn/nhalo (khối cuối trang).",
        ...rows.map(([label, value]) => `${label}: ${value}`),
      ].join("\n"),
      html: [
        "<h2>Khách cần tư vấn NhàLo</h2>",
        "<p>Để lại liên hệ ở trang biztown.vn/nhalo (khối cuối trang).</p>",
        ...rows.map(([label, value]) => `<p>${label}: <b>${escapeHtml(value)}</b></p>`),
      ].join("\n"),
    });
  } catch (err) {
    console.error(
      "[nhalo-lead] Không gửi được email:",
      err instanceof Error ? err.message : String(err),
    );
    return Response.json({ error: "mail_failed" }, { status: 503 });
  }

  return Response.json({ ok: true });
}
