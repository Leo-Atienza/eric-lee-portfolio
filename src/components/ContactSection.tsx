import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, ArrowRight, Phone } from "lucide-react";

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
    <section id="contact" className="relative py-32 bg-gradient-to-b from-secondary/30 to-background">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(217_91%_60%/0.08),transparent_60%)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse, hsl(260 80% 60% / 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="section-label mb-4">Contact</h2>
          <h3 className="section-title mb-6">Let's Connect</h3>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            I'm currently seeking full-time roles in analytics or consulting. 
            Feel free to reach out for opportunities or collaborations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-lg mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 space-y-4">
            {contactLinks.map((item, index) => {
              const content = (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="contact-card group"
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 text-primary group-hover:from-primary group-hover:to-primary group-hover:text-primary-foreground transition-all duration-500">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                  {item.isLink && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
