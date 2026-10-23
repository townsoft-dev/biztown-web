"use client";

import { useEffect, useRef } from "react";

/**
 * Vùng sáng cam đi theo con trỏ trong một khối (file mẫu v6: v6-light / bindGlow). Đặt làm con
 * của khối cần chiếu sáng; khối đó phải có `relative isolate` (và thường `overflow-hidden`) để
 * vùng sáng nằm dưới nội dung nhưng trên nền. Máy không có chuột (hover: none) thì bỏ qua.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = ref.current;
    const host = light?.parentElement;
    if (!light || !host || window.matchMedia("(hover: none)").matches) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let seen = false;

    const paint = () => {
      light.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    // Trượt dần về vị trí con trỏ (12% mỗi khung hình) cho mềm.
    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      paint();
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    const move = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      if (!seen || reduce) {
        x = targetX;
        y = targetY;
        seen = true;
        paint();
      }
      light.dataset.on = "";
      if (!reduce && !frame) frame = requestAnimationFrame(loop);
    };
    const leave = () => {
      delete light.dataset.on;
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" className="bt-glow" />;
}
