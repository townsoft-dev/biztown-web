"use client";

/**
 * Nút ☾/☀ đổi Day/Night. Trạng thái nằm ở data-theme của <html> (do script trong <head> đặt
 * trước khi hiện trang), nên biểu tượng chọn bằng CSS — không cần state, không lệch hydrate.
 */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("bt-theme", next);
    } catch {
      // Trình duyệt chặn localStorage (chế độ riêng tư...) — vẫn đổi được trong phiên này.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-[18px] leading-[18px] text-white transition-colors dark:bg-accent dark:text-on-accent"
    >
      <span aria-hidden="true" className="theme-light-only">
        ☾
      </span>
      <span aria-hidden="true" className="theme-dark-only">
        ☀
      </span>
    </button>
  );
}
