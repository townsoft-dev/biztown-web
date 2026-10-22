"use client";

import { useEffect, useRef, useState } from "react";

/**
 * true khi phần tử đã cuộn vào màn hình (một lần, không tắt lại).
 * rootMargin thu nhỏ vùng nhìn, ví dụ "0px 0px -8% 0px": chỉ tính khi đã qua vạch cách đáy 8%.
 */
export function useInView<T extends Element>(threshold = 0.2, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView] as const;
}
