import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowDown, Mail, Linkedin, MapPin, Sparkles, TrendingUp, Database, BarChart3 } from "lucide-react";

const silk = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: silk,
    },
  },
};

const nameVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: silk,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: silk,
    },
  },
};

const floatingStats = [
  { icon: Database, label: "SQL", x: "8%", y: "20%", delay: 1.8 },
  { icon: BarChart3, label: "Power BI", x: "85%", y: "25%", delay: 2.1 },
  { icon: TrendingUp, label: "Python", x: "12%", y: "72%", delay: 2.4 },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const orbX1 = useTransform(springX, [0, 1], [-30, 30]);
  const orbY1 = useTransform(springY, [0, 1], [-20, 20]);
  const orbX2 = useTransform(springX, [0, 1], [20, -20]);
  const orbY2 = useTransform(springY, [0, 1], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(260_80%_60%/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(280_70%_60%/0.05),transparent_40%)]" />

      {/* Cursor-reactive orbs */}
      <motion.div
        className="hidden sm:block absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          x: orbX1,
          y: orbY1,
          top: '15%',
          left: '15%',
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <motion.div
        className="hidden sm:block absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          x: orbX2,
          y: orbY2,
          bottom: '15%',
          right: '15%',
          background: 'radial-gradient(circle, hsl(260 80% 60% / 0.22) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating stat pills — desktop only */}
      {floatingStats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="hidden lg:flex stat-pill absolute"
          style={{ left: stat.x, top: stat.y }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: stat.delay, duration: 0.8, ease: silk }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <stat.icon className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{stat.label}</span>
          </motion.div>
        </motion.div>
      ))}

      <div className="section-container relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Location badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card text-muted-foreground mb-6 sm:mb-8"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Markham, ON</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
          </motion.div>

          {/* Name — dramatic split */}
          <motion.h1
            variants={nameVariants}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight leading-[0.9]"
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: silk }}
            >
              Eric
            </motion.span>
            <motion.span
              className="gradient-text-animated block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: silk }}
            >
              Lee
            </motion.span>
          </motion.h1>

          {/* Gradient underline accent */}
          <motion.div
            className="mx-auto mb-6 sm:mb-8 h-1 rounded-full"
            style={{ background: 'var(--gradient-primary)', maxWidth: '120px' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: silk }}
          />

          {/* Title and skills */}
          <motion.div variants={itemVariants}>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto mb-4 font-light tracking-tight">
              Business Technology Management
            </p>

            {/* Desktop: Horizontal with sparkles */}
            <motion.div
              className="hidden sm:flex items-center justify-center gap-3 text-base md:text-lg text-muted-foreground/70 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7, ease: silk }}
            >
              {["Data Analytics", "Business Intelligence", "Process Optimization"].map((skill, i) => (
                <motion.div key={skill} className="flex items-center gap-3">
                  {i > 0 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 0.6, ease: silk }}
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.6, ease: silk }}
                  >
                    {skill}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile: Stack vertically */}
            <div className="flex sm:hidden flex-col items-center gap-2 text-sm text-muted-foreground/70 mb-10">
              {["Data Analytics", "Business Intelligence", "Process Optimization"].map((skill, i) => (
                <motion.div
                  key={skill}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 0.6, ease: silk }}
                >
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 1 }
            }
          }}
        >
          <motion.a
            href="mailto:ericyeefalee@gmail.com"
            className="btn-premium"
            variants={buttonVariants}
            whileHover={{
              scale: 1.04,
              y: -2,
              transition: { duration: 0.35, ease: silk }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/eric-yf-lee/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass"
            variants={buttonVariants}
            whileHover={{
              scale: 1.04,
              y: -2,
              transition: { duration: 0.35, ease: silk }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: silk }}
        >
          <a href="#about" className="inline-flex flex-col items-center gap-3 text-muted-foreground/60 hover:text-primary transition-colors duration-700 group">
            <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: [0.45, 0.05, 0.55, 0.95]
              }}
            >
              <ArrowDown className="w-5 h-5 group-hover:text-primary transition-colors duration-500" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
