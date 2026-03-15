import { motion } from "framer-motion";

const silk = [0.16, 1, 0.3, 1] as const;

const SectionDivider = () => (
  <motion.div
    className="section-divider"
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 1, ease: silk }}
  />
);

export default SectionDivider;
