/**
 * Giới hạn số lần gửi theo IP, lưu trong bộ nhớ — một tiến trình Node nên đủ dùng (giống
 * townsoft-homepage). Khởi động lại server là đếm lại.
 */
const hits = new Map<string, number[]>();

/** Trả false khi IP đã gửi đủ `limit` lần trong `windowMs` gần nhất; true thì ghi nhận lần này. */
export function takeRateLimit(ip: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(ip, recent);
    return false;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Dọn IP đã hết hạn để Map không phình mãi.
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(key);
    }
  }
  return true;
}

/** IP người gửi. Sau gateway-nginx: X-Real-IP do nginx đặt, client không giả được. */
export function clientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
