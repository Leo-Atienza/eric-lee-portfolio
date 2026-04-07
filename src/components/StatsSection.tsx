import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { FolderKanban, Database, TrendingUp, Award } from "lucide-react";
import { springs } from "@/lib/springs";

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: typeof FolderKanban;
  decimals?: number;
}

const stats: StatItem[] = [
  { value: 4, suffix: "+", label: "Projects Completed", icon: FolderKanban },
  { value: 300000, suffix: "+", label: "Data Records Analyzed", icon: Database },
  { value: 15.4, prefix: "$", suffix: "M+", label: "Savings Identified", icon: TrendingUp, decimals: 1 },
  { value: 8, label: "Certifications", icon: Award },
];

const formatNumber = (val: number, decimals = 0): string => {
  if (decimals > 0) return val.toFixed(decimals);
  return new Intl.NumberFormat("en-US").format(Math.round(val));
};

const AnimatedCounter = ({ stat }: { stat: StatItem }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 60, damping: 20 });
  const display = useTransform(springValue, (latest) =>
    `${stat.prefix || ""}${formatNumber(latest, stat.decimals)}${stat.suffix || ""}`
  );

  useEffect(() => {
    if (isInView) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        motionValue.jump(stat.value);
      } else {
        motionValue.set(stat.value);
      }
    }
  }, [isInView, motionValue, stat.value]);

  return (
    <div ref={ref}>
      <motion.span className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text tabular-nums">
        {display}
      </motion.span>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.standard,
  },
};

const StatsSection = () => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(217 91% 60% / 0.06), transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="text-center flex flex-col items-center gap-3 sm:gap-4"
            >
              <motion.div
                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary"
                whileHover={{ scale: 1.08, rotate: 6 }}
                transition={springs.bouncy}
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>

              <AnimatedCounter stat={stat} />

              <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
