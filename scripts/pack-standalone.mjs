#!/usr/bin/env node
// Chạy sau `next build` (script build trong package.json): chép public/ và .next/static/ vào
// .next/standalone/ — bản standalone của Next không tự chép hai thư mục này. Xong thì
// .next/standalone/ chạy độc lập được bằng `node server.js` (CI đóng gói đúng thư mục này).
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(root, ".next/standalone");

if (!existsSync(join(standalone, "server.js"))) {
  console.error(
    'Không thấy .next/standalone/server.js — next.config.ts phải có output: "standalone".',
  );
  process.exit(1);
}

for (const [from, to] of [
  ["public", "public"],
  [".next/static", ".next/static"],
]) {
  const target = join(standalone, to);
  rmSync(target, { recursive: true, force: true });
  cpSync(join(root, from), target, { recursive: true });
}

console.log("Đã chép public/ và .next/static/ vào .next/standalone/");
