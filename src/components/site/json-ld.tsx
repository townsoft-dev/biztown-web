/**
 * Khối dữ liệu có cấu trúc (schema.org) cho Google. Render phía server, nằm trong <body> —
 * Google chấp nhận cả <head> lẫn <body>.
 *
 * JSON.stringify không escape "<" nên một chuỗi chứa "</script>" trong nội dung sẽ đóng sớm
 * thẻ script. Thay "<" bằng "<" là cách chuẩn để chặn, và JSON vẫn hợp lệ.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
