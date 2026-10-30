/**
 * Gửi email từ server Next (chỉ import trong route handler). Người gửi/nhận cố định theo biến
 * môi trường, client không chọn được. Hai cách gửi, chọn theo biến nào có giá trị:
 *
 * - Microsoft 365 (townsoftvina.com) qua Microsoft Graph — khi có MS_TENANT_ID, MS_CLIENT_ID,
 *   MS_CLIENT_SECRET: App registration trên Entra với quyền Application `Mail.Send` (đã grant
 *   admin consent). MAIL_USER là hộp thư gửi (vd. biztownofficial@townsoftvina.com).
 * - Gmail + App Password qua nodemailer (giống townsoft-homepage) — khi có MAIL_USER, MAIL_PASS.
 *
 * MAIL_TO: người nhận, cách nhau bằng dấu phẩy; bỏ trống thì gửi về MAIL_USER.
 */
import nodemailer, { type Transporter } from "nodemailer";

export type MailMessage = {
  subject: string;
  text: string;
  html: string;
  replyTo: { name: string; address: string };
};

const SENDER_NAME = "Website biztown.vn";
const GRAPH_TIMEOUT_MS = 15_000;

function env(name: string) {
  return process.env[name]?.trim() || undefined;
}

function recipients(sender: string) {
  const to = (env("MAIL_TO") ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  return to.length ? to : [sender];
}

export async function sendMail(message: MailMessage) {
  const sender = env("MAIL_USER");
  if (!sender) throw new Error("Chưa cấu hình MAIL_USER");

  const tenantId = env("MS_TENANT_ID");
  const clientId = env("MS_CLIENT_ID");
  const clientSecret = env("MS_CLIENT_SECRET");
  if (tenantId && clientId && clientSecret) {
    return sendWithGraph(message, sender, { tenantId, clientId, clientSecret });
  }

  const pass = env("MAIL_PASS");
  if (pass) return sendWithGmail(message, sender, pass);

  throw new Error("Chưa cấu hình MS_TENANT_ID/MS_CLIENT_ID/MS_CLIENT_SECRET hoặc MAIL_PASS");
}

// --- Microsoft Graph (client credentials) ---

type GraphCredentials = { tenantId: string; clientId: string; clientSecret: string };

/** Token app-only, giữ trong bộ nhớ tới gần lúc hết hạn (thường 60–90 phút). */
let graphToken: { value: string; expiresAt: number } | undefined;

async function getGraphToken({ tenantId, clientId, clientSecret }: GraphCredentials) {
  if (graphToken && graphToken.expiresAt > Date.now()) return graphToken.value;

  const response = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`,
    {
      method: "POST",
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
      signal: AbortSignal.timeout(GRAPH_TIMEOUT_MS),
    },
  );
  const body = (await response.json().catch(() => null)) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
  } | null;
  if (!response.ok || !body?.access_token) {
    throw new Error(`Không lấy được token Microsoft (${response.status} ${body?.error ?? ""})`);
  }

  // Trừ 5 phút để không dùng token sát giờ hết hạn.
  graphToken = {
    value: body.access_token,
    expiresAt: Date.now() + ((body.expires_in ?? 3600) - 300) * 1000,
  };
  return graphToken.value;
}

async function sendWithGraph(message: MailMessage, sender: string, credentials: GraphCredentials) {
  const token = await getGraphToken(credentials);
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          subject: message.subject,
          body: { contentType: "HTML", content: message.html },
          from: { emailAddress: { name: SENDER_NAME, address: sender } },
          toRecipients: recipients(sender).map((address) => ({ emailAddress: { address } })),
          replyTo: [{ emailAddress: message.replyTo }],
        },
        // Không lưu bản sao vào Sent Items của hộp thư gửi.
        saveToSentItems: false,
      }),
      signal: AbortSignal.timeout(GRAPH_TIMEOUT_MS),
    },
  );
  // Thành công: 202 Accepted, không có body.
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: { code?: string };
    } | null;
    if (response.status === 401) graphToken = undefined;
    throw new Error(`Microsoft Graph trả ${response.status} ${body?.error?.code ?? ""}`);
  }
}

// --- Gmail (nodemailer) ---

let transporter: Transporter | undefined;

async function sendWithGmail(message: MailMessage, sender: string, pass: string) {
  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: { user: sender, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  await transporter.sendMail({
    ...message,
    from: { name: SENDER_NAME, address: sender },
    to: recipients(sender),
  });
}

/** Escape chữ người dùng nhập trước khi chèn vào HTML của email. */
export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br>");
}
