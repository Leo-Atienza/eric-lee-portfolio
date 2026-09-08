import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/hooks/useReveal";

/* T4 stat strip. Every figure is in the résumé and points to a project or credential below. */
const figures = [
  { value: "$15.4M", qualifier: "potential savings identified", source: "YEES Energy, 2023 to 2024" },
  { value: "300,000+", qualifier: "hospital encounters validated", source: "Hospital length of stay, 2026" },
  { value: "10,000+", qualifier: "utility records validated", source: "YEES Energy, 2023 to 2024" },
  { value: "9", qualifier: "certifications", source: "2023 to 2026" },
];

const FiguresSection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="figures" className="section">
      <div ref={ref} className="page">
        <SectionHead title="Figures" />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8">
          {figures.map(({ value, qualifier, source }, i) => (
            <li key={value} className="reveal border-t border-rule py-6 lg:py-8" style={{ "--i": i + 2 } as React.CSSProperties}>
              <p className="figure-value num">{value}</p>
              <p className="mt-4">{qualifier}</p>
              <p className="small muted mt-2">{source}</p>
            </li>
          ))}
        </ul>
        <hr className="rule-double reveal" style={{ "--i": 6 } as React.CSSProperties} />
      </div>
    </section>
  );
};

export default FiguresSection;
