import { motion } from "framer-motion";
import { ArrowDown, Mail, Linkedin, MapPin, Sparkles } from "lucide-react";

// Premium animation variants
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
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const nameVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(260_80%_60%/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(280_70%_60%/0.05),transparent_40%)]" />
      
      {/* Floating Orbs - using CSS animations for GPU compositing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(260 80% 60% / 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform',
          animationDelay: '-3s',
        }}
      />
      
      {/* Grid Pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="section-container relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Location badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-muted-foreground mb-8"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Markham, ON</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
          </motion.div>

          {/* Name */}
          <motion.h1 
            variants={nameVariants}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 md:mb-8 tracking-tight"
          >
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Eric
            </motion.span>
            <motion.span 
              className="gradient-text"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Lee
            </motion.span>
          </motion.h1>

          {/* Title and skills */}
          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto mb-4 font-light tracking-tight">
              Business Technology Management
            </p>

            {/* Desktop: Horizontal with sparkles */}
            <motion.div 
              className="hidden sm:flex items-center justify-center gap-3 text-base md:text-lg text-muted-foreground/70 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                Data Analytics
              </motion.span>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                Business Intelligence
              </motion.span>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                Process Optimization
              </motion.span>
            </motion.div>

            {/* Mobile: Stack vertically */}
            <div className="flex sm:hidden flex-col items-center gap-2 text-sm text-muted-foreground/70 mb-10">
              {["Data Analytics", "Business Intelligence", "Process Optimization"].map((skill, i) => (
                <motion.div 
                  key={skill}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 1.2 }
            }
          }}
        >
          <motion.a 
            href="mailto:ericyeefalee@gmail.com" 
            className="btn-premium"
            variants={buttonVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              transition: { type: "spring", stiffness: 400, damping: 17 }
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
              scale: 1.05, 
              y: -3,
              transition: { type: "spring", stiffness: 400, damping: 17 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a href="#about" className="inline-flex flex-col items-center gap-3 text-muted-foreground/60 hover:text-primary transition-colors duration-500 group">
            <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
            <motion.div
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: [0.45, 0.05, 0.55, 0.95]
              }}
            >
              <ArrowDown className="w-5 h-5 group-hover:text-primary transition-colors" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
