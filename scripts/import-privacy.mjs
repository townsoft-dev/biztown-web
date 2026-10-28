#!/usr/bin/env node
// Nhập trang tài liệu pháp lý (chính sách quyền riêng tư, xoá tài khoản) từ file HTML do repo
// app sinh ra (vd. biztown-rent: `python3 tools/build_privacy.py` → web/privacy/index.html).
//
// Cách dùng:
//   pnpm import:privacy <file.html> [đích]
//
// Đích (mặc định `privacy`):
//   privacy               → /privacy               (BizTown Rent Manager)
//   nhalo-privacy         → /nhalo/privacy
//   nhalo-delete-account  → /nhalo/delete-account
//
// Script cắt hai khối <div data-lang="vi"> và <div data-lang="en"> trong <main>, ghi ra
// src/content/<đích>/{vi,en}.html. Các trang tương ứng đọc hai file này lúc build.
// Đừng sửa tay các file đó: lần nhập sau sẽ ghi đè.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Mỗi đích: link nội bộ trong file gốc (/privacy, /delete-account…) trỏ về đâu trên site này. */
const TARGETS = {
  privacy: { base: "" },
  "nhalo-privacy": { base: "/nhalo" },
  "nhalo-delete-account": { base: "/nhalo" },
};

const [source, target = "privacy"] = process.argv.slice(2);
if (!source || !(target in TARGETS)) {
  console.error(`Cách dùng: pnpm import:privacy <file.html> [${Object.keys(TARGETS).join("|")}]`);
  process.exit(1);
}
const { base } = TARGETS[target];

const html = readFileSync(source, "utf8").replace(/\r\n/g, "\n");
const match = html.match(
  /<div data-lang="vi">\n([\s\S]*?)\n {2}<\/div>\s*<div data-lang="en" hidden>\n([\s\S]*?)\n {2}<\/div>\s*<\/main>/,
);
if (!match) {
  console.error(
    "Không tìm thấy hai khối data-lang vi/en trong <main>. Cấu trúc file sinh ra đã đổi?",
  );
  process.exit(1);
}

/** Bỏ thụt lề 4 dấu cách của khối gốc. */
const dedent = (block) => block.replace(/^ {4}/gm, "").trim() + "\n";

/**
 * Link nội bộ trỏ sang trang tương ứng theo ngôn ngữ (/en/...) và theo app (/nhalo/...).
 * /support chỉ có ở gốc site nên không gắn tiền tố app.
 */
const localizeLinks = (block, prefix) =>
  block.replace(/href="\/(support|privacy|delete-account)?"/g, (_, page) => {
    if (!page) return `href="${prefix || "/"}"`;
    return `href="${prefix}${page === "support" ? "" : base}/${page}"`;
  });

const outDir = join(dirname(fileURLToPath(import.meta.url)), "../src/content", target);
writeFileSync(join(outDir, "vi.html"), localizeLinks(dedent(match[1]), ""));
writeFileSync(join(outDir, "en.html"), localizeLinks(dedent(match[2]), "/en"));
console.log(`Đã ghi ${outDir}/vi.html và en.html`);
