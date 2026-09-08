import { Fragment, useRef, useState } from "react";
import SectionHead from "@/components/SectionHead";
import DashboardGallery, { type GalleryImage } from "@/components/DashboardGallery";
import { useReveal } from "@/hooks/useReveal";

interface Project {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  figures: { value: string; label: string }[];
  gallery: GalleryImage[];
  pdfUrl: string;
}

/* Every figure below appears in the résumé's project bullets. */
const projects: Project[] = [
  {
    title: "YEES Energy Project",
    subtitle: "Cost-benefit analysis",
    period: "November 2023 to January 2024",
    description:
      "Validated utility records in SQL and Excel, then built Power BI dashboards quantifying savings by building type.",
    figures: [
      { value: "10,000+", label: "utility records validated" },
      { value: "$15.4M", label: "potential savings identified" },
      { value: "29 to 34%", label: "cost reduction potential" },
    ],
    gallery: [
      { src: "/assets/dashboards/yees_full.webp", caption: "Full dashboard", width: 1660, height: 933 },
      { src: "/assets/dashboards/yees_intensity_bar.webp", caption: "Electricity intensity by property type", width: 1776, height: 1057 },
      { src: "/assets/dashboards/yees_supporting.webp", caption: "Supporting view", width: 1658, height: 934 },
    ],
    pdfUrl: "/assets/yees-dashboard.pdf",
  },
  {
    title: "Credit Risk Analysis",
    subtitle: "Loan default prediction",
    period: "January to February 2026",
    description:
      "Prepared a loan default dataset in Python and visualized risk segments in Tableau.",
    figures: [
      { value: "50%", label: "prep time cut" },
      { value: "2x", label: "higher default rate found" },
      { value: "35%", label: "faster interpretation" },
    ],
    gallery: [
      { src: "/assets/dashboards/credit_full.webp", caption: "Full dashboard", width: 1919, height: 1099 },
      { src: "/assets/dashboards/credit_scatter_income_debt.webp", caption: "Income against debt burden by default", width: 1919, height: 1129 },
      { src: "/assets/dashboards/credit_dti_distribution.webp", caption: "Debt-to-income distribution by default", width: 1919, height: 1119 },
    ],
    pdfUrl: "/assets/loan-dashboard.pdf",
  },
  {
    title: "Hospital Length of Stay",
    subtitle: "Healthcare analytics",
    period: "January to February 2026",
    description:
      "Validated hospital encounters in SQL and analyzed length-of-stay drivers in Power BI.",
    figures: [
      { value: "300,000+", label: "hospital encounters analyzed" },
      { value: "Top 3", label: "segments prioritized" },
      { value: "40%", label: "faster drill-down" },
    ],
    gallery: [
      { src: "/assets/dashboards/hospital_full.webp", caption: "Full dashboard", width: 1657, height: 930 },
      { src: "/assets/dashboards/hospital_admission_type.webp", caption: "Admission type against length of stay", width: 1772, height: 1060 },
      { src: "/assets/dashboards/hospital_los_distribution.webp", caption: "Length of stay distribution", width: 1771, height: 1060 },
    ],
    pdfUrl: "/assets/hospital-dashboard.pdf",
  },
  {
    title: "Tesla Production & Deliveries Analysis",
    subtitle: "Ten-year trends",
    period: "November to December 2025",
    description:
      "Standardized ten years of production data in Excel and built Tableau KPI views.",
    figures: [
      { value: "10 years", label: "of data" },
      { value: "30%", label: "less reporting time" },
      { value: "25%", label: "fewer follow-up questions" },
    ],
    gallery: [
      { src: "/assets/dashboards/tesla_full.webp", caption: "Full dashboard", width: 1919, height: 1134 },
      { src: "/assets/dashboards/tesla_deliveries_trend.webp", caption: "Total deliveries per year", width: 1919, height: 1128 },
      { src: "/assets/dashboards/tesla_revenue_per_model.webp", caption: "Revenue per model", width: 1916, height: 1127 },
    ],
    pdfUrl: "/assets/tesla-dashboard.pdf",
  },
];

type Opener = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface CaptureProps {
  image: GalleryImage;
  onOpen: Opener;
  sizes: string;
}

const Capture = ({ image, onOpen, sizes }: CaptureProps) => (
  <button type="button" className="plate" onClick={onOpen} aria-label={`View ${image.caption.toLowerCase()} at full size`}>
    <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" sizes={sizes} />
  </button>
);

interface ProjectTextProps {
  project: Project;
  onOpen: Opener;
}

const ProjectText = ({ project, onOpen }: ProjectTextProps) => (
  <>
    <h3>{project.title}</h3>
    <p className="muted mt-1">
      {project.subtitle}. <span className="num">{project.period}</span>
    </p>
    <p className="mt-5">{project.description}</p>
    <p className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
      <button type="button" onClick={onOpen} className="link inline-flex min-h-[44px] items-center">
        View dashboard
      </button>
      <a href={project.pdfUrl} download className="link inline-flex min-h-[44px] items-center">
        PDF
      </a>
    </p>
  </>
);

const ProjectFigures = ({ project }: { project: Project }) => (
  <dl className="kv kv--open">
    {project.figures.map(({ value, label }) => (
      <Fragment key={label}>
        <dt className="num !text-ink !font-medium !text-base !pt-3">{value}</dt>
        <dd className="small muted !pt-[calc(var(--space-sm)+0.125em)]">{label}</dd>
      </Fragment>
    ))}
  </dl>
);

const ProjectsSection = () => {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  // The lightbox opens from state, not a Dialog.Trigger, so the opener is remembered for focus return.
  const show = (project: Project, index: number): Opener => (event) => {
    opener.current = event.currentTarget;
    setOpen({ project, index });
  };
  const hide = () => setOpen(null);

  return (
    <section id="projects" className="section">
      <div ref={ref} className="page">
        <SectionHead title="Projects" />

        <ol>
          {projects.map((project, i) => (
            <li key={project.title} className="reveal border-t border-rule py-10 lg:py-12" style={{ "--i": i + 2 } as React.CSSProperties}>
              {i === 0 ? (
                /* The one deliberate break in the rhythm: the strongest piece runs full width. */
                <div className="grid gap-y-8">
                  <Capture image={project.gallery[0]} onOpen={show(project, 0)} sizes="(min-width: 72rem) 66rem, 92vw" />
                  <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-16">
                    <div className="lg:col-span-7">
                      <ProjectText project={project} onOpen={show(project, 0)} />
                    </div>
                    <div className="lg:col-span-5">
                      <ProjectFigures project={project} />
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        {project.gallery.slice(1).map((image, j) => (
                          <Capture key={image.src} image={image} onOpen={show(project, j + 1)} sizes="(min-width: 72rem) 13rem, 45vw" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-16">
                  <div className="lg:col-span-5">
                    <ProjectText project={project} onOpen={show(project, 0)} />
                    <div className="mt-8">
                      <ProjectFigures project={project} />
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <Capture image={project.gallery[0]} onOpen={show(project, 0)} sizes="(min-width: 72rem) 38rem, 92vw" />
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {project.gallery.slice(1).map((image, j) => (
                        <Capture key={image.src} image={image} onOpen={show(project, j + 1)} sizes="(min-width: 72rem) 18rem, 45vw" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
        <hr className="rule-double reveal" style={{ "--i": 6 } as React.CSSProperties} />
      </div>

      {open && (
        <DashboardGallery
          images={open.project.gallery}
          isOpen
          onClose={hide}
          returnFocusTo={opener.current}
          initialIndex={open.index}
          projectTitle={open.project.title}
          pdfUrl={open.project.pdfUrl}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
