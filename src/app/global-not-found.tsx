import type { Metadata } from "next";

import { RootDocument } from "@/components/root-document";
import { localizedPath } from "@/i18n/config";

export const metadata: Metadata = {
  title: "404 — BizTown Rent Manager",
  robots: { index: false, follow: true },
};

/**
 * Trang 404 cho URL không khớp route nào (xuất thành out/404.html). Site có hai root layout
 * (vi, en) nên không có layout chung để ghép not-found.tsx — xem experimental.globalNotFound.
 * Không biết người dùng đến từ ngôn ngữ nào nên hiện cả hai.
 */
export default function GlobalNotFound() {
  return (
    <RootDocument locale="vi">
      <main className="doc mx-auto flex min-h-dvh max-w-[760px] flex-col justify-center px-5 py-16">
        <p className="text-6xl font-bold text-orange" aria-hidden="true">
          404
        </p>
        <h1 className="mt-6">Không tìm thấy trang</h1>
        <p>
          Đường dẫn này không tồn tại. <a href={localizedPath("vi", "home")}>Về trang chủ</a>
        </p>
        <p lang="en">
          This page does not exist. <a href={localizedPath("en", "home")}>Go to the home page</a>
        </p>
      </main>
    </RootDocument>
  );
}
