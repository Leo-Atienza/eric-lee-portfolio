import { useRef, useCallback, useEffect, useState } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function useTiltCard(maxTilt = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasHover, setHasHover] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    { stiffness: 300, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    { stiffness: 300, damping: 30 }
  );

  useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!hasHover) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY, hasHover]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}
