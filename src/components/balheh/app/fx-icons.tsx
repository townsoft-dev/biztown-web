import { cn } from "@/lib/utils";

/**
 * Icon nét bổ sung cho các màn hình ở section "Cách Balheh hoạt động" — những icon bảng ICONS
 * trong app-ui.tsx chưa có (file mẫu: AI.eye, AI.trash…). Cùng kiểu Lucide, viewBox 24.
 */
const FX_ICONS = {
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  trash:
    '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  reply: '<path d="M9 17l-5-5 5-5"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>',
} as const;

export type FxIconName = keyof typeof FX_ICONS;

export function FxIcon({
  name,
  size = 14,
  className,
}: {
  name: FxIconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("block shrink-0", className)}
      dangerouslySetInnerHTML={{ __html: FX_ICONS[name] }}
    />
  );
}
