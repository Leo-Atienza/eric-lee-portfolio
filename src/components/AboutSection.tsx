import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/hooks/useReveal";

const coursework = [
  "Business Systems Analysis",
  "Database Management",
  "Quantitative Analysis",
  "Advanced Data Analytics",
  "Statistics",
  "Economics",
  "Accounting",
  "Finance",
  "Project Management",
  "Risk Management",
  "Operations Management",
  "Information Systems",
  "IT Audit",
  "Fraud Assessment",
  "GAAP Principles",
  "IFRS Standards",
  "PHIPA, PIPEDA",
  "FIPPA/MFIPPA",
  "HIPAA",
];

const AboutSection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="section">
      <div ref={ref} className="page">
        <SectionHead title="Summary" />

        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <dl className="kv kv--stack reveal" style={{ "--i": 2 } as React.CSSProperties}>
              <dt>Degree</dt>
              <dd>Bachelor of Commerce (Honours), Business Technology Management</dd>
              <dt>Institution</dt>
              <dd>Seneca Polytechnic, Toronto, Ontario</dd>
              <dt>Period</dt>
              <dd className="num">September 2022 to April 2026</dd>
            </dl>

            <p className="measure reveal mt-8" style={{ "--i": 3 } as React.CSSProperties}>
              Graduated April 2026. Built Power BI and Tableau dashboards that support business decisions.
              Seeking full-time roles in analytics or consulting.
            </p>
          </div>

          <div className="lg:col-span-5">
            <h3 className="label reveal mb-2" style={{ "--i": 3 } as React.CSSProperties}>
              Coursework
            </h3>
            <ul className="course-list reveal" style={{ "--i": 4 } as React.CSSProperties}>
              {coursework.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
