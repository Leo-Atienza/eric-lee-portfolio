import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, Send, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24 bg-secondary/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(217_91%_60%/0.1),transparent_60%)]" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Contact</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I'm currently seeking full-time roles in analytics or consulting. 
            Feel free to reach out for opportunities or collaborations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 space-y-6">
            <a
              href="mailto:Leerodrick9@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-primary/10 transition-all group"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">Leerodrick9@gmail.com</p>
              </div>
              <Send className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="tel:6472178158"
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-primary/10 transition-all group"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">(647) 217-8158</p>
              </div>
              <Send className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://www.linkedin.com/in/eric-yf-lee/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-primary/10 transition-all group"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">LinkedIn</p>
                <p className="font-medium">linkedin.com/in/eric-yf-lee</p>
              </div>
              <Send className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">Markham, ON, Canada</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
