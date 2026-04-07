import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Mail, Linkedin, MapPin, Sparkles, TrendingUp, Database, BarChart3 } from "lucide-react";
import { springs } from "@/lib/springs";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    transition: springs.standard,
  },
};

const nameVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.gentle,
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.standard,
  },
};

const floatingStats = [
  { icon: Database, label: "SQL", x: "8%", y: "20%", delay: 1.8 },
  { icon: BarChart3, label: "Power BI", x: "85%", y: "25%", delay: 2.1 },
  { icon: TrendingUp, label: "Python", x: "12%", y: "72%", delay: 2.4 },
];

const rotatingTitles = ["Data Analyst", "Business Intelligence", "Process Optimizer", "Dashboard Builder"];

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const magnetic1 = useMagneticButton(0.25);
  const magnetic2 = useMagneticButton(0.25);
  const [titleIndex, setTitleIndex] = useState(0);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const orbX1 = useTransform(springX, [0, 1], [-30, 30]);
  const orbY1 = useTransform(springY, [0, 1], [-20, 20]);
  const orbX2 = useTransform(springX, [0, 1], [20, -20]);
  const orbY2 = useTransform(springY, [0, 1], [15, -15]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("mousemove", handleMouseMove, { passive: true });
        } else {
          window.removeEventListener("mousemove", handleMouseMove);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // GSAP parallax on hero background layers
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-radial-top", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".hero-radial-br", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Rotating title interval
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered radial gradients */}
      <div className="hero-radial-top absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.12),transparent_50%)]" />
      <div className="hero-radial-br absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(260_80%_60%/0.08),transparent_50%)]" />
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
          transition={{ delay: stat.delay, ...springs.standard }}
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
            className="text-hero font-bold mb-4 sm:mb-6 md:mb-8 tracking-tight leading-[0.9]"
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, ...springs.gentle }}
            >
              Eric
            </motion.span>
            <motion.span
              className="gradient-text-animated block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, ...springs.gentle }}
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
            transition={{ delay: 0.8, ...springs.standard }}
          />

          {/* Title and skills */}
          <motion.div variants={itemVariants}>
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto mb-3 font-light tracking-tight">
              Business Technology Management
            </p>

            {/* Rotating specialty title */}
            <div className="h-7 sm:h-8 md:h-9 mb-4 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingTitles[titleIndex]}
                  className="text-sm sm:text-lg md:text-xl gradient-text font-medium"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={springs.standard}
                >
                  {rotatingTitles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Desktop: Horizontal with sparkles */}
            <motion.div
              className="hidden sm:flex items-center justify-center gap-3 text-base md:text-lg text-muted-foreground/70 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, ...springs.standard }}
            >
              {["Data Analytics", "Business Intelligence", "Process Optimization"].map((skill, i) => (
                <motion.div key={skill} className="flex items-center gap-3">
                  {i > 0 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8 + i * 0.15, ...springs.bouncy }}
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15, ...springs.standard }}
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
                  transition={{ delay: 0.7 + i * 0.15, ...springs.standard }}
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
            ref={magnetic1.ref as React.Ref<HTMLAnchorElement>}
            href="mailto:ericyeefalee@gmail.com"
            className="btn-premium"
            variants={buttonVariants}
            style={{ x: magnetic1.springX, y: magnetic1.springY }}
            onMouseMove={magnetic1.onMouseMove}
            onMouseLeave={magnetic1.onMouseLeave}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96, transition: springs.snappy }}
            transition={springs.snappy}
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </motion.a>
          <motion.a
            ref={magnetic2.ref as React.Ref<HTMLAnchorElement>}
            href="https://www.linkedin.com/in/eric-yf-lee/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass"
            variants={buttonVariants}
            style={{ x: magnetic2.springX, y: magnetic2.springY }}
            onMouseMove={magnetic2.onMouseMove}
            onMouseLeave={magnetic2.onMouseLeave}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96, transition: springs.snappy }}
            transition={springs.snappy}
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, ...springs.gentle }}
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
