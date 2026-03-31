import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, ArrowRight, Phone, Send } from "lucide-react";
import { springs } from "@/lib/springs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.standard,
  },
};

const ContactSection = () => {
  const contactLinks = [
    {
      href: "mailto:ericyeefalee@gmail.com",
      icon: Mail,
      label: "Email",
      value: "ericyeefalee@gmail.com",
      isLink: true,
    },
    {
      href: "tel:6472178158",
      icon: Phone,
      label: "Phone",
      value: "(647) 217-8158",
      isLink: true,
    },
    {
      href: "https://www.linkedin.com/in/eric-yf-lee/",
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/eric-yf-lee",
      isLink: true,
      external: true,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Markham, ON, Canada",
      isLink: false,
    },
  ];

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background CTA gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center bottom, hsl(217 91% 60% / 0.1), transparent 60%)'
        }}
      />

      <div className="section-container relative z-10">
        {/* Bold CTA header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springs.standard}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="section-label mb-4">Contact</h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg mb-8 sm:mb-10">
            I'm currently seeking full-time roles in analytics or consulting.
            Feel free to reach out for opportunities or collaborations.
          </p>

          {/* Primary CTA button */}
          <motion.a
            href="mailto:ericyeefalee@gmail.com"
            className="btn-premium inline-flex text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96, transition: springs.snappy }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, ...springs.standard }}
          >
            <Send className="w-5 h-5" />
            Send me a message
          </motion.a>
        </motion.div>

        {/* Contact details grid */}
        <motion.div
          className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {contactLinks.map((item) => {
            const content = (
              <motion.div
                variants={cardVariants}
                className="contact-card group"
                whileHover={{ x: 4, transition: springs.snappy }}
              >
                <motion.div
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                  transition={springs.bouncy}
                >
                  <item.icon className="w-5 h-5" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                  <p className="font-semibold text-sm sm:text-base truncate">{item.value}</p>
                </div>
                {item.isLink && (
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ x: 4 }}
                    transition={springs.snappy}
                  >
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </motion.div>
                )}
              </motion.div>
            );

            if (item.isLink) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              );
            }

            return <div key={item.label}>{content}</div>;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
