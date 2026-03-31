import { motion, useScroll, useSpring } from "framer-motion";

const supportsScrollTimeline =
  typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()");

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Use pure CSS scroll-driven animation when supported
  if (supportsScrollTimeline) {
    return (
      <div
        className="scroll-progress scroll-progress-css"
        style={{ transform: "scaleX(0)" }}
      />
    );
  }

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
