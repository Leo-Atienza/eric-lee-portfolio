import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { springs } from "@/lib/springs";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Background auras (theme-aware) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at top, hsl(var(--primary) / 0.12), transparent 50%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at bottom right, hsl(var(--accent) / 0.08), transparent 50%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        className="relative z-10 max-w-xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springs.standard}
      >
        <motion.h1
          className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold gradient-text-animated leading-none tracking-tight mb-4"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springs.gentle, delay: 0.1 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.standard, delay: 0.25 }}
        >
          Page not found
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-10 text-base sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.standard, delay: 0.35 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.standard, delay: 0.45 }}
        >
          <motion.a
            href="/"
            className="btn-premium"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96, transition: springs.snappy }}
            transition={springs.snappy}
          >
            <Home className="w-5 h-5" />
            Back to home
          </motion.a>
          <motion.button
            onClick={() => window.history.back()}
            className="btn-glass"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96, transition: springs.snappy }}
            transition={springs.snappy}
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="w-5 h-5" />
            Go back
          </motion.button>
        </motion.div>

        <motion.p
          className="mt-12 text-xs text-muted-foreground/60 font-mono break-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          {location.pathname}
        </motion.p>
      </motion.div>
    </main>
  );
};

export default NotFound;
