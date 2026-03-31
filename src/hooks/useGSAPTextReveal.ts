import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const headings = container.querySelectorAll<HTMLElement>(".gsap-reveal");
    if (!headings.length) return;

    const ctx = gsap.context(() => {
      headings.forEach((heading) => {
        const text = heading.textContent || "";
        const words = text.split(" ");
        heading.innerHTML = words
          .map(
            (w) =>
              `<span style="display:inline-block;overflow:hidden;vertical-align:top"><span class="gsap-word" style="display:inline-block">${w}</span></span>`
          )
          .join(" ");

        gsap.from(heading.querySelectorAll(".gsap-word"), {
          y: "110%",
          opacity: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
