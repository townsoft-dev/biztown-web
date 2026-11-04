import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Chạy bằng server Node (form liên hệ cần route handler /api/contact gửi mail). Build ra
  // .next/standalone/ tự chứa node_modules cần thiết — chạy `node server.js` (xem deploy/).
  // Các trang vẫn render sẵn lúc build (○), chỉ /api/contact chạy theo request.
  output: "standalone",
  // /support → /support/, giữ đúng dạng URL đã khai với App Store và Google Play.
  trailingSlash: true,
  // Ảnh export sẵn từ Figma, không cần tối ưu lúc chạy (khỏi cài sharp trên server).
  images: { unoptimized: true },
  // Cho mở dev server từ máy khác trong mạng LAN (vd. http://192.168.1.12:3000) — chỉ ảnh hưởng `pnpm dev`.
  allowedDevOrigins: ["192.168.*.*"],
  experimental: {
    // Hai root layout (vi, en) nên trang 404 chung phải dùng app/global-not-found.tsx.
    globalNotFound: true,
  },
  // Mặc định Next trả `Cache-Control: public, max-age=0` cho mọi file trong public/, nên logo,
  // icon và ảnh lưới nền bị kiểm tra lại mỗi lần vào trang. Không đặt `immutable` vì tên file
  // không có hash — đổi ảnh trong Figma rồi ghi đè cùng tên thì bản cũ sẽ hết hạn sau 30 ngày.
  // headers() không làm trang rời khỏi trạng thái tĩnh (○).
  async headers() {
    return [
      {
        source: "/:dir(images|icons)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Ảnh chia sẻ link hay được thay hơn, và Zalo/Facebook cũng tự cache ở phía họ.
        source: "/og/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
};

export default nextConfig;
