import { Fragment } from "react";
import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/hooks/useReveal";

/* F3 spec sheet, six schedules of capability, no invented proficiency percentages. */
const schedules = [
  {
    title: "Data analysis",
    skills: ["SQL querying", "Data cleaning", "Data validation", "Key performance indicators", "Trend analysis", "Insight generation", "Data quality checks", "Dashboard planning", "ETL process", "Data standardization", "Data profiling"],
  },
  {
    title: "Business analysis",
    skills: ["Requirements gathering", "Business process mapping", "Stakeholder management", "Process improvement", "User stories", "Acceptance criteria", "Gap analysis", "Impact analysis", "Workflow optimization", "Agile principles"],
  },
  {
    title: "Tools and technologies",
    skills: ["SQL", "Excel", "Power BI", "Microsoft Office", "Python", "Generative AI", "Prompt engineering", "Tableau", "Power Query", "Jira", "Scrum", "Confluence", "SharePoint", "VBA"],
  },
  {
    title: "Reporting",
    skills: ["Data visualization", "Interactive dashboards", "KPI tracking", "Management reporting", "Executive summaries", "Ad hoc reporting", "Storytelling"],
  },
  {
    title: "Finance and accounting",
    skills: ["GAAP", "IFRS", "ASPE", "Accounts payable and receivable", "Tax compliance", "Reconciliation", "Financial reporting", "QuickBooks Online (ProAdvisor certified)", "SAP"],
  },
  {
    title: "Soft skills",
    skills: ["Analytical thinking", "Problem solving", "Written and verbal communication", "Attention to detail", "Decision making", "Cross-functional communication", "Collaboration", "Time management", "Adaptability", "Stakeholder presentation", "Prioritization"],
  },
];

const SkillsSection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="section">
      <div ref={ref} className="page">
        <SectionHead title="Skills" />

        <dl className="kv kv--stack">
          {schedules.map(({ title, skills }, i) => (
            <Fragment key={title}>
              <dt className="reveal" style={{ "--i": i + 2 } as React.CSSProperties}>
                {title}
              </dt>
              <dd className="reveal" style={{ "--i": i + 2 } as React.CSSProperties}>
                <ul className="inline-list">
                  {skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default SkillsSection;
