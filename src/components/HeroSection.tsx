import { motion } from "framer-motion";
import { ArrowDown, Mail, Linkedin, MapPin, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.12),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(260_80%_60%/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(280_70%_60%/0.05),transparent_40%)]" />
      
      {/* Floating Orbs - using CSS animations for GPU compositing */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(217 91% 60% / 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 animate-float"
        style={{
          background: 'radial-gradient(circle, hsl(260 80% 60% / 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          willChange: 'transform',
          animationDelay: '-3s',
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-muted-foreground mb-8"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Markham, ON</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 md:mb-8 tracking-tight">
            <span className="block">Eric</span>
            <span className="gradient-text">Lee</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl mx-auto mb-4 font-light tracking-tight">
              Business Technology Management
            </p>

            {/* Mobile: Stack vertically, Desktop: Horizontal with sparkles */}
            <div className="hidden sm:flex items-center justify-center gap-3 text-base md:text-lg text-muted-foreground/70 mb-12">
              <span>Data Analytics</span>
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Business Intelligence</span>
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Process Optimization</span>
            </div>
            <div className="flex sm:hidden flex-col items-center gap-2 text-sm text-muted-foreground/70 mb-10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>Data Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>Business Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>Process Optimization</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a href="mailto:ericyeefalee@gmail.com" className="btn-premium">
            <Mail className="w-5 h-5" />
            Get in Touch
          </a>
          <a
            href="https://www.linkedin.com/in/eric-yf-lee/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="animate-float"
        >
          <a href="#about" className="inline-flex flex-col items-center gap-3 text-muted-foreground/60 hover:text-primary transition-colors duration-500 group">
            <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
