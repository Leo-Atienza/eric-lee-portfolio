import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

const silk = [0.16, 1, 0.3, 1] as const;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 sm:py-16 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: silk }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-lg font-bold">
              Eric <span className="gradient-text">Lee</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Data Analytics & Business Intelligence
            </p>
          </div>

          <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
            Built with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> for data & analytics
          </p>

          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()}
            </p>
            <motion.button
              onClick={scrollToTop}
              className="p-2.5 rounded-full glass-card text-muted-foreground hover:text-primary transition-colors duration-300"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
