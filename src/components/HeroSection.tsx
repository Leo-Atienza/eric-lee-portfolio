import { ArrowRight } from "lucide-react";

/**
 * H2 split diptych, 7/5: name, one line, two actions on the left; the portrait plate on the right.
 * Anything that can be the LCP rises with transform only, so it paints at once.
 */
const HeroSection = () => (
  <section id="top" className="pt-[calc(var(--nav-height)+var(--space-2xl))] pb-[var(--space-section)]">
    <div className="page grid gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-16">
      <div className="lg:col-span-7">
        <h1 className="hero-rise">Eric Lee</h1>
        <div className="hero-rule mt-6" aria-hidden="true" />

        <p className="lede hero-rise mt-8" style={{ "--i": 1 } as React.CSSProperties}>
          Business Technology Management graduate, Seneca Polytechnic, 2026. Financial reporting, data
          analysis and KPI dashboards in SQL, Python, Excel, Power BI and Tableau.
        </p>

        <p className="hero-fade mt-6 flex flex-wrap items-center gap-x-8 gap-y-2" style={{ "--i": 1 } as React.CSSProperties}>
          <a href="mailto:ericyeefalee@gmail.com" className="link cta">
            Email Eric
            <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
          </a>
          <a href="/assets/Eric_Lee_Resume.pdf" target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-[44px] items-center">
            Résumé<span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </p>
      </div>

      <figure className="plate hero-rise mx-auto w-full max-w-[17rem] lg:col-span-5 lg:mx-0 lg:justify-self-end" style={{ "--i": 1 } as React.CSSProperties}>
        <img
          src="/assets/eric-lee.webp"
          width={264}
          height={264}
          alt="Eric Lee"
          decoding="async"
          // React 18 only forwards the lowercase form; the camelCase prop is a React 19 addition.
          {...{ fetchpriority: "high" }}
        />
      </figure>
    </div>
  </section>
);

export default HeroSection;
