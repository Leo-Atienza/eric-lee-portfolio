import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/hooks/useReveal";

const roles = [
  {
    title: "Finance, Accounting & Tax Specialist",
    kind: "Volunteer",
    organisation: "NeedList.org",
    location: "Toronto, Ontario",
    period: "June to August 2025",
    achievements: [
      "Built a multi-province tax credit calculator (BC, AB, ON) in Excel using XLOOKUP, VLOOKUP, IF and IFERROR, validated against 20 scenarios and cross-referenced with CRA.",
      "Co-filed a T3010 charity tax return and standardized audit-ready reconciliation documentation, cutting revision cycles by 30%; presented the methodology to the CEO, managers and developers.",
      "Strengthened stakeholder support by standardizing tax documentation and evidence.",
    ],
  },
  {
    title: "Entrepreneur-in-Residence (HELIX Co-op)",
    organisation: "Seneca Polytechnic",
    location: "Toronto, Ontario",
    period: "May to August 2025",
    achievements: [
      "Benchmarked 12 competitors (ChefWorks, Bragard, Tilit) and coordinated with 5 manufacturers and 3 suppliers across 10 prototypes to develop a pricing strategy and financial forecast model.",
      "Reduced response time by building an intake workflow for 25 weekly requests, improving turnaround by 30%.",
      "Increased delivery accountability by standardizing tracking and follow-ups, reducing missed items by 20%.",
    ],
  },
  {
    title: "Customer Service Representative",
    organisation: "Seneca Polytechnic",
    location: "Toronto, Ontario",
    period: "August 2024 to April 2026",
    achievements: [
      "Resolved 30 to 40 customer inquiries per shift; documented cases in Excel and coordinated escalations with clear issue summaries, increasing same-day resolution by 20% and reducing repeat follow-ups by 25%.",
      "Troubleshot issues before escalation, improving turnaround time by 15%.",
    ],
  },
];

/* F4 dated sequence, the period column reads like a ledger's date column. */
const ExperienceSection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="experience" className="section">
      <div ref={ref} className="page">
        <SectionHead title="Experience" />

        <ol>
          {roles.map((role, i) => (
            <li key={role.title} className="reveal grid gap-y-3 border-t border-rule py-8 lg:grid-cols-12 lg:gap-x-16" style={{ "--i": i + 2 } as React.CSSProperties}>
              <div className="lg:col-span-3">
                <p className="num small font-medium">{role.period}</p>
                <p className="small muted mt-1">{role.location}</p>
              </div>

              <div className="lg:col-span-9">
                <h3>
                  {role.title}
                  {role.kind && <span className="muted"> ({role.kind})</span>}
                </h3>
                <p className="muted mt-1">{role.organisation}</p>

                <ul className="measure mt-5">
                  {role.achievements.map((achievement) => (
                    <li key={achievement} className="border-t border-rule py-3 first:border-t-0 first:pt-0">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <hr className="rule-double reveal" style={{ "--i": 5 } as React.CSSProperties} />
      </div>
    </section>
  );
};

export default ExperienceSection;
