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
};

export default nextConfig;
