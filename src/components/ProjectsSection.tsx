import { motion } from "framer-motion";
import { TrendingUp, Database, BarChart3, LineChart, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "YEES Energy Project",
    subtitle: "Cost-Benefit Analysis",
    period: "Nov 2023 – Jan 2024",
    icon: BarChart3,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
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
    icon: Database,
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
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
    icon: LineChart,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
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
    icon: TrendingUp,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    highlights: [
      { metric: "10 Years", label: "Data standardized" },
      { metric: "30%", label: "Reporting time reduced" },
      { metric: "25%", label: "Fewer follow-ups" },
    ],
    description: "Engineered 2015-2024 production dataset in Excel. Visualized long-term trends in Tableau and developed management-ready presentations.",
    tools: ["Excel", "Tableau", "PowerPoint"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-32 bg-gradient-to-b from-transparent via-secondary/30 to-transparent">
      {/* Background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(260_80%_60%/0.05),transparent_60%)]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="section-label mb-4">Projects</h2>
          <h3 className="section-title">Featured Work</h3>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }
                },
              }}
              className="glass-card rounded-3xl overflow-hidden group hover:border-primary/30"
            >
              {/* Header with gradient */}
              <div className={`p-8 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-1">{project.title}</h4>
                    <p className="text-white/80 font-medium">{project.subtitle}</p>
                  </div>
                  <motion.div
                    className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <project.icon className="w-7 h-7" />
                  </motion.div>
                </div>
                <p className="relative z-10 text-white/70 text-sm mt-4 font-medium">{project.period}</p>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {project.highlights.map((highlight, i) => (
                    <div 
                      key={i} 
                      className="text-center"
                    >
                      <p className="text-2xl font-bold gradient-text">{highlight.metric}</p>
                      <p className="text-xs text-muted-foreground mt-1">{highlight.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="skill-badge text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
