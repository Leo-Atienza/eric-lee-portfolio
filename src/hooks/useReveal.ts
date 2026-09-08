import { useEffect, useRef } from "react";

/**
 * Adds `is-visible` to the element once it enters the viewport, then disconnects.
 * Descendants carrying `.reveal` / `.reveal-rule` transition in from the CSS.
 * Reduced-motion users (and browsers without IntersectionObserver) get the final state at once.
 */
export function useReveal<T extends HTMLElement>(rootMargin = "0px 0px -8% 0px") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-visible");
        io.disconnect();
      },
      { rootMargin, threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}
