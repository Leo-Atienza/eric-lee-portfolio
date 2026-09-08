import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/hooks/useReveal";

const certifications = [
  { title: "Data Analytics", issuer: "BrainStation", period: "Nov 2023 to Jan 2024", status: "Completed" },
  { title: "SQL for Healthcare Professionals", issuer: "LinkedIn Learning", period: "Oct 2024", status: "Completed" },
  { title: "Manage GA4 Data and Learn to Read Reports", issuer: "Google Analytics", period: "Feb 2026", status: "Completed" },
  { title: "CompTIA A+ Core 1 and Core 2 CertMaster Learn", issuer: "CompTIA", period: "Sep 2025 to present", status: "In progress" },
  { title: "QBO ProAdvisor Certification", issuer: "Intuit", period: "Mar 2026 to Oct 2027", status: "Completed" },
  { title: "Salesforce CRM Trailblazer Badge", issuer: "Salesforce", period: "Mar 2026", status: "Completed" },
  { title: "Process Mapping for Business Analyst Trailblazer Badge", issuer: "Salesforce", period: "Mar 2026", status: "Completed" },
  { title: "Essential Business Analyst Skills Trailblazer Badge", issuer: "Salesforce", period: "Mar 2026", status: "Completed" },
  { title: "Start Writing Prompts Like a Pro", issuer: "Google", period: "May 2026", status: "Completed" },
];

/* A real table for real tabular data: credential, issuer, date, status. */
const CertificationsSection = () => {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="certifications" className="section">
      <div ref={ref} className="page">
        <SectionHead title="Certifications" />

        <table className="ledger ledger--stack reveal" style={{ "--i": 2 } as React.CSSProperties}>
          <caption className="sr-only">Professional certifications with issuer, date and status</caption>
          <thead>
            <tr>
              <th scope="col" className="w-[44%]">Credential</th>
              <th scope="col">Issuer</th>
              <th scope="col" className="whitespace-nowrap">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {certifications.map(({ title, issuer, period, status }) => (
              <tr key={title}>
                <td data-label="Credential" className="font-medium">{title}</td>
                <td data-label="Issuer">{issuer}</td>
                <td data-label="Date" className="num whitespace-nowrap">{period}</td>
                <td data-label="Status" className={status === "Completed" ? undefined : "muted"}>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CertificationsSection;
