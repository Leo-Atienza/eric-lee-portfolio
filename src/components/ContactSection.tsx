import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/hooks/useReveal";

const ContactSection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="section">
      <div ref={ref} className="page">
        <SectionHead title="Contact" lede="Seeking full-time roles in analytics or consulting." />

        <p className="reveal" style={{ "--i": 2 } as React.CSSProperties}>
          <a
            href="mailto:ericyeefalee@gmail.com"
            className="link font-display text-[clamp(1.5rem,1rem+2.4vw,3rem)] leading-tight break-all sm:break-normal"
          >
            ericyeefalee@gmail.com
          </a>
        </p>

        <dl className="kv kv--stack reveal max-w-measure mt-10" style={{ "--i": 3 } as React.CSSProperties}>
          <dt>Phone</dt>
          <dd className="num">
            <a href="tel:+16472178158" className="quiet-link">
              (647) 217-8158
            </a>
          </dd>
          <dt>LinkedIn</dt>
          <dd>
            <a href="https://www.linkedin.com/in/eric-yf-lee/" target="_blank" rel="noopener noreferrer" className="link">
              linkedin.com/in/eric-yf-lee<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </dd>
          <dt>Résumé</dt>
          <dd>
            <a href="/assets/Eric_Lee_Resume.pdf" target="_blank" rel="noopener noreferrer" className="link">
              Eric_Lee_Resume.pdf<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </dd>
          <dt>Location</dt>
          <dd>Markham, Ontario, Canada</dd>
        </dl>
      </div>
    </section>
  );
};

export default ContactSection;
