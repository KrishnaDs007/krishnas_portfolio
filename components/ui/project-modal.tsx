"use client";

import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Info,
} from "lucide-react";
import { ProjectData } from "@/lib/projects-utils";

interface ProjectModalProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right",
  );

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset media index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentMediaIndex(0);
      setShowDetails(false);
    }
  }, [isOpen, project]);

  if (!isOpen) return null;

  // Combine images and video into media array
  const mediaItems = [
    ...(project.videoUrl
      ? [{ type: "video" as const, url: project.videoUrl }]
      : []),
    ...project.images.map((img) => ({ type: "image" as const, url: img })),
  ];

  const handlePrevious = () => {
    setSlideDirection("left");
    setCurrentMediaIndex((prev) =>
      prev === 0 ? mediaItems.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setSlideDirection("right");
    setCurrentMediaIndex((prev) =>
      prev === mediaItems.length - 1 ? 0 : prev + 1,
    );
  };

  const currentMedia = mediaItems[currentMediaIndex];

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-7xl h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-card/95 backdrop-blur-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {project.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {project.category} • {project.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Media Gallery - Fixed Height */}
        <div className="relative flex-1 bg-gradient-to-b from-accent/20 to-accent/40 overflow-hidden">
          {/* Media Display with Slide Animation */}
          <div className="h-full flex items-center justify-center p-4 md:p-8">
            {currentMedia.type === "video" ? (
              <div
                key={currentMediaIndex}
                className="w-full aspect-video max-h-full animate-slide-in"
              >
                <iframe
                  src={currentMedia.url}
                  className="w-full h-full rounded-lg shadow-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${project.title} video`}
                />
              </div>
            ) : (
              <div
                key={currentMediaIndex}
                className={`relative w-full h-full flex items-center justify-center ${
                  slideDirection === "right"
                    ? "animate-slide-in-right"
                    : "animate-slide-in-left"
                }`}
              >
                <img
                  src={currentMedia.url}
                  alt={`${project.title} screenshot ${currentMediaIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.src = `https://placehold.co/800x600/1a1a1a/666?text=${encodeURIComponent(project.title)}`;
                  }}
                />
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-card/95 hover:bg-card hover:scale-110 rounded-full shadow-xl transition-all backdrop-blur-sm border border-border/50"
                aria-label="Previous media"
              >
                <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-card/95 hover:bg-card hover:scale-110 rounded-full shadow-xl transition-all backdrop-blur-sm border border-border/50"
                aria-label="Next media"
              >
                <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
              </button>
            </>
          )}

          {/* Media Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card/95 backdrop-blur-sm rounded-full text-sm font-semibold border border-border/50 shadow-lg">
            {currentMediaIndex + 1} / {mediaItems.length}
          </div>

          {/* Thumbnail Dots */}
          {mediaItems.length > 1 && mediaItems.length <= 10 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlideDirection(
                      index > currentMediaIndex ? "right" : "left",
                    );
                    setCurrentMediaIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentMediaIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/50 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to media ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Details Overlay */}
          {showDetails && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm p-4 md:p-8 overflow-y-auto animate-fade-in">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-6">Project Details</h3>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                      Description
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-md border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="text-primary mt-1 text-lg">•</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with CTAs */}
        <div className="p-4 md:p-6 border-t border-border bg-card/95 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle Details Button */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/80 text-foreground rounded-lg transition-all font-medium"
            >
              <Info className="h-4 w-4" />
              {showDetails ? "Hide Details" : "View Details"}
            </button>

            {/* Live Demo Button */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all font-medium shadow-lg shadow-primary/25"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}

            {/* GitHub Button */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-border hover:border-primary/50 hover:bg-accent text-foreground rounded-lg transition-all font-medium"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.4s ease-out;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
