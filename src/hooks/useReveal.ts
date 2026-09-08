import { useEffect, useRef } from "react";

/**
 * Adds `is-visible` to the element the moment its top edge crosses into the viewport, then
 * disconnects. Descendants carrying `.reveal` transition in from the CSS.
 * Threshold 0 on purpose: a ratio would scale the delay with the group's height, so a tall
 * section stayed blank until a slice of it had scrolled in.
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
      { rootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}
