import { useRef, useCallback, useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMagneticButton(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [hasHover, setHasHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 25 });
  const springY = useSpring(y, { stiffness: 350, damping: 25 });

  useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!hasHover) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y, strength, hasHover]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, springX, springY, onMouseMove, onMouseLeave, hasHover };
}
