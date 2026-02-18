"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import {
  getProjects,
  getProjectCategories,
  ProjectData,
} from "@/lib/projects-utils";
import { ProjectModal } from "@/components/ui/project-modal";

const PROJECTS_PER_PAGE = 6; // Show 6 projects initially (2 rows of 3)

export function Projects() {
  const [activeTab, setActiveTab] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );
  const [showAll, setShowAll] = useState(false);

  const allProjects = getProjects();
  const categories = getProjectCategories();

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeTab === "All Projects") {
      return allProjects;
    }
    return allProjects.filter((project) => project.category === activeTab);
  }, [activeTab, allProjects]);

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
      className="min-h-screen flex items-center py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-sm text-primary font-semibold uppercase tracking-[0.2em] mb-3">
              Recent Projects
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Recent <span className="text-primary">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A selection of applications built with modern technologies,
              focusing on performance, scalability, and user experience.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveTab(category);
                  setShowAll(false); // Reset pagination when changing tabs
                }}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] bg-accent overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.src = `https://placehold.co/600x400/1a1a1a/666?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/95 backdrop-blur-md rounded-lg text-xs font-semibold border border-border/50">
                    {project.category}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  {/* Year */}
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">
                    {project.year}
                  </p>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-5">
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
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm rounded-lg transition-all font-medium group/btn"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Demo</span>
                        <ArrowRight className="h-4 w-4 opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-border hover:border-primary/50 hover:bg-accent text-foreground text-sm rounded-lg transition-all font-medium"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && !showAll && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(true)}
                className="group px-8 py-4 bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all font-semibold inline-flex items-center gap-2"
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
                className="px-8 py-4 bg-card border-2 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground rounded-xl transition-all font-semibold"
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
