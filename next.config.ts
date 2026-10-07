import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Xuất HTML tĩnh ra out/ — phục vụ bằng nginx (deploy/).
  output: "export",
  // /support → out/support/index.html, giữ đúng dạng URL đã khai với App Store và Google Play.
  trailingSlash: true,
  // Không có server tối ưu ảnh khi xuất tĩnh.
  images: { unoptimized: true },
  experimental: {
    // Hai root layout (vi, en) nên trang 404 chung phải dùng app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
