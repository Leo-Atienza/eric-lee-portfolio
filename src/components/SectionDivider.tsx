import { motion } from "framer-motion";
import { springs } from "@/lib/springs";

const supportsViewTimeline =
  typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()");

const SectionDivider = () => {
  // Use pure CSS scroll-driven animation when supported
  if (supportsViewTimeline) {
    return <div className="section-divider section-divider-css" />;
  }

  return (
    <motion.div
      className="section-divider"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={springs.standard}
    />
  );
};

export default SectionDivider;
