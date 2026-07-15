"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ExternalLink, Github, ArrowRight, Star } from "lucide-react";
import {
  getProjects,
  getProjectCategories,
  ProjectData,
} from "@/lib/projects-utils";

const PROJECTS_PER_PAGE = 6; // Show 6 projects initially (2 rows of 3)
const ALL_PROJECTS = getProjects();
const CATEGORIES = getProjectCategories();

const ProjectModal = dynamic(
  () =>
    import("@/components/ui/project-modal").then((mod) => mod.ProjectModal),
  { ssr: false },
);

export function Projects() {
  const [activeTab, setActiveTab] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );
  const [showAll, setShowAll] = useState(false);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeTab === "All Projects") {
      return ALL_PROJECTS;
    }
    return ALL_PROJECTS.filter((project) => project.category === activeTab);
  }, [activeTab]);

  // Apply pagination
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, PROJECTS_PER_PAGE);

  const hasMore = filteredProjects.length > PROJECTS_PER_PAGE;

  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      className="flex items-center bg-background pb-12 sm:pb-14 lg:min-h-screen lg:pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10 lg:mb-16">
            <p className="text-sm text-primary font-semibold uppercase tracking-[0.2em] mb-3">
              Recent Projects
            </p>
            <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:mb-6 lg:text-6xl">
              Recent <span className="text-primary">Projects</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A selection of applications built with modern technologies,
              focusing on performance, scalability, and user experience.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-8 flex flex-wrap gap-2 sm:gap-3 lg:mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveTab(category);
                  setShowAll(false); // Reset pagination when changing tabs
                }}
                aria-pressed={activeTab === category}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all sm:px-5 sm:py-2.5 ${
                  activeTab === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mb-12 lg:grid-cols-3 lg:gap-8">
            {displayedProjects.map((project) => (
              <article
                key={project.id}
                aria-labelledby={`project-title-${project.id}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 lg:rounded-2xl"
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] bg-accent overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, calc(100vw - 32px)"
                    quality={65}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/95 backdrop-blur-md rounded-lg text-xs font-semibold border border-border/50">
                    {project.category}
                  </div>

                  {project.featured && (
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-amber-700/30 bg-amber-50/95 px-3 py-1.5 text-xs font-semibold text-amber-900 shadow-sm backdrop-blur-md dark:border-amber-400/40 dark:bg-amber-950/95 dark:text-amber-100">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Star Project
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Year */}
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                    {project.year}
                  </p>

                  <h3
                    id={`project-title-${project.id}`}
                    className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl lg:mb-3"
                  >
                    {project.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground lg:mb-5">
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4 flex flex-wrap gap-2 lg:mb-5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-accent text-muted-foreground text-xs font-medium rounded-md border border-border">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleProjectClick(project)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-lg border-2 border-border px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-accent"
                        aria-label={`Open live demo for ${project.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-border hover:border-primary/50 hover:bg-accent text-foreground text-sm rounded-lg transition-all font-medium"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && !showAll && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-card px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground sm:px-8 sm:py-4"
              >
                <span>Load More Projects</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAll && hasMore && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(false)}
                className="rounded-xl border-2 border-border bg-card px-6 py-3 font-semibold text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground sm:px-8 sm:py-4"
              >
                Show Less
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
