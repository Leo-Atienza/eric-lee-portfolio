import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart2, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import DashboardGallery, { GalleryImage } from "./DashboardGallery";
import { springs } from "@/lib/springs";
import { useTiltCard } from "@/hooks/useTiltCard";
import { useGSAPTextReveal } from "@/hooks/useGSAPTextReveal";

interface ProjectData {
  title: string;
  subtitle: string;
  period: string;
  gradient: string;
  gallery: GalleryImage[];
  highlights: { metric: string; label: string }[];
  description: string;
  tools: string[];
}

const projects: ProjectData[] = [
  {
    title: "YEES Energy Project",
    subtitle: "Cost-Benefit Analysis",
    period: "Nov 2023 – Jan 2024",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    gallery: [
      { src: "/assets/dashboards/yees_full.webp", caption: "Full Dashboard" },
      { src: "/assets/dashboards/yees_intensity_bar.webp", caption: "Electricity Intensity by Property Type" },
      { src: "/assets/dashboards/yees_supporting.webp", caption: "Supporting View" },
    ],
    highlights: [
      { metric: "10,000+", label: "Utility records validated" },
      { metric: "$15.4M", label: "Potential savings identified" },
      { metric: "29-34%", label: "Cost reduction potential" },
    ],
    description: "Extracted and validated utility records using SQL queries and Excel reconciliation. Developed Power BI KPI dashboards quantifying savings across building types.",
    tools: ["SQL", "Excel", "Power BI"],
  },
  {
    title: "Credit Risk Analysis",
    subtitle: "Loan Default Prediction",
    period: "Jan 2026 – Feb 2026",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    gallery: [
      { src: "/assets/dashboards/credit_full.webp", caption: "Full Dashboard" },
      { src: "/assets/dashboards/credit_scatter_income_debt.webp", caption: "Income vs Debt Burden by Default" },
      { src: "/assets/dashboards/credit_dti_distribution.webp", caption: "Debt-to-Income Distribution by Default" },
    ],
    highlights: [
      { metric: "50%", label: "Prep time reduced" },
      { metric: "2x", label: "Higher default rate identified" },
      { metric: "35%", label: "Faster interpretation" },
    ],
    description: "Engineered Python data preparation for loan default datasets. Validated risk patterns across debt-to-income bands and visualized in Tableau.",
    tools: ["Python", "Tableau", "Data Analysis"],
  },
  {
    title: "Hospital Length of Stay",
    subtitle: "Healthcare Analytics",
    period: "Jan 2026 – Feb 2026",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    gallery: [
      { src: "/assets/dashboards/hospital_full.webp", caption: "Full Dashboard" },
      { src: "/assets/dashboards/hospital_admission_type.webp", caption: "Admission Type vs Length of Stay" },
      { src: "/assets/dashboards/hospital_los_distribution.webp", caption: "Length of Stay Distribution" },
    ],
    highlights: [
      { metric: "300,000+", label: "Hospital encounters analyzed" },
      { metric: "Top 3", label: "Segments prioritized" },
      { metric: "40%", label: "Faster drill-down" },
    ],
    description: "Analyzed length of stay drivers and modelled cohort comparisons across age groups. Visualized KPIs in Power BI with interactive filters.",
    tools: ["SQL", "Power BI", "Data Validation"],
  },
  {
    title: "Tesla Production Analysis",
    subtitle: "10-Year Trends",
    period: "Nov 2025 – Dec 2025",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    gallery: [
      { src: "/assets/dashboards/tesla_full.webp", caption: "Full Dashboard" },
      { src: "/assets/dashboards/tesla_deliveries_trend.webp", caption: "Total Deliveries per Year" },
      { src: "/assets/dashboards/tesla_revenue_per_model.webp", caption: "Revenue per Model" },
    ],
    highlights: [
      { metric: "10 Years", label: "Data standardized" },
      { metric: "30%", label: "Reporting time reduced" },
      { metric: "25%", label: "Fewer follow-ups" },
    ],
    description: "Engineered 2015-2024 production dataset in Excel. Visualized long-term trends in Tableau and developed management-ready presentations.",
    tools: ["Excel", "Tableau", "PowerPoint"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springs.standard,
      staggerChildren: 0.05,
      delayChildren: 0.12,
    },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.standard,
  },
};

const TiltProjectCard = ({ children }: { children: React.ReactNode }) => {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTiltCard(6);
  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
};

const ProjectsSection = () => {
  const textRef = useGSAPTextReveal();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const openGallery = (project: ProjectData, imageIndex = 0) => {
    setActiveProject(project);
    setInitialImageIndex(imageIndex);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setActiveProject(null);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <section id="projects" className="relative py-20 sm:py-32 bg-gradient-to-b from-transparent via-secondary/30 to-transparent">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at top, hsl(260 80% 60% / 0.05), transparent 60%)'
          }}
        />

        <div ref={textRef} className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springs.standard}
            className="text-center mb-16"
          >
            <h2 className="section-label mb-4">Projects</h2>
            <h3 className="section-title gsap-reveal">Featured Work</h3>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-5 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project) => (
              <TiltProjectCard key={project.title}>
                <motion.div
                  variants={cardVariants}
                  className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden group h-full"
                  whileHover={{ y: -4, transition: springs.standard }}
                >
                {/* Header with gradient */}
                <div className={`p-4 sm:p-6 md:p-8 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">{project.title}</h4>
                      <p className="text-white/80 font-medium text-sm sm:text-base">{project.subtitle}</p>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          onClick={() => openGallery(project)}
                          className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/15 text-white hover:bg-white/25 transition-colors"
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          transition={springs.snappy}
                        >
                          <BarChart2 className="w-5 h-5 sm:w-7 sm:h-7" />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        View Dashboard
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="relative z-10 text-white/70 text-xs sm:text-sm mt-3 sm:mt-4 font-medium">{project.period}</p>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 md:p-8">
                  {/* Inline dashboard thumbnails */}
                  <motion.div
                    className="flex gap-2 mb-5 sm:mb-6 -mt-1"
                    variants={childFade}
                  >
                    {project.gallery.slice(0, 3).map((img, i) => (
                      <motion.button
                        key={i}
                        className="dashboard-thumb flex-1 aspect-[16/10] bg-secondary/50 overflow-hidden"
                        onClick={() => openGallery(project, i)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springs.snappy}
                      >
                        <img
                          src={img.src}
                          alt={img.caption}
                          width={320}
                          height={200}
                          className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500 img-blur-load"
                          loading="lazy"
                          onLoad={(e) => e.currentTarget.classList.add("loaded")}
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src.endsWith(".webp")) {
                              target.src = target.src.replace(".webp", ".png");
                            }
                          }}
                        />
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Metrics */}
                  <motion.div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                    {project.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        className="text-center"
                        variants={childFade}
                      >
                        <p className="text-base sm:text-lg md:text-2xl font-bold gradient-text">{highlight.metric}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 leading-tight">{highlight.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p
                    variants={childFade}
                    className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base"
                  >
                    {project.description}
                  </motion.p>

                  {/* Tools + View button row */}
                  <motion.div className="flex items-center justify-between gap-3" variants={childFade}>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tools.map((tool) => (
                        <motion.span
                          key={tool}
                          className="skill-badge text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
                          whileHover={{
                            scale: 1.06,
                            y: -1,
                            transition: springs.snappy
                          }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                    <motion.button
                      onClick={() => openGallery(project)}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                      whileHover={{ x: 3 }}
                      transition={springs.snappy}
                    >
                      View
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
              </TiltProjectCard>
            ))}
          </motion.div>
        </div>

        {/* Gallery Modal */}
        {activeProject && (
          <DashboardGallery
            images={activeProject.gallery}
            isOpen={galleryOpen}
            onClose={closeGallery}
            initialIndex={initialImageIndex}
            projectTitle={activeProject.title}
          />
        )}
      </section>
    </TooltipProvider>
  );
};

export default ProjectsSection;
