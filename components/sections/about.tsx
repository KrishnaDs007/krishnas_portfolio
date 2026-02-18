"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { socialLinks, contactInfo } from "@/lib/constants";

const expertiseAreas = [
  { id: "overview", label: "Overview" },
  { id: "frontend", label: "Frontend Development" },
  { id: "architecture", label: "Architecture & Performance" },
  { id: "design", label: "Design Systems" },
];

const coreExpertise = [
  "React & Next.js",
  "Node.js",
  "TypeScript",
  "Cloud Architecture",
  "UI/UX Design",
];

export function About() {
  const [activeArea, setActiveArea] = useState("overview");

  return (
    <section
      id="about"
      className="min-h-screen flex items-center py-20 bg-accent/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-sm text-primary font-semibold uppercase tracking-[0.2em] mb-3">
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Architecting digital experiences with{" "}
              <span className="text-primary">precision</span>.
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start">
            {/* Left Column - Profile Image (Smaller) */}
            <div className="order-1 lg:order-1">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl" />

                {/* Profile Image Card */}
                <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/Krishna.jpeg"
                      alt="Krishna Devashish"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent p-6 pb-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{contactInfo.location}</span>
                    </div>
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span>Available for projects</span>
                    </div> */}
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 relative z-1">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                    Connect with me
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => {
                      const iconMap: Record<string, any> = {
                        github: Github,
                        linkedin: Linkedin,
                        twitter: Twitter,
                        email: Mail,
                      };
                      const Icon = iconMap[social.platform];
                      if (!Icon) return null;

                      return (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-card border border-border border-color-primary hover:border-primary hover:bg-primary/10 transition-colors bg-transparent"
                          aria-label={social.platform}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Core Expertise */}
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                    Core Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {coreExpertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm rounded-lg bg-card border border-border text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content with Tags */}
            <div className="order-2 lg:order-2">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {expertiseAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setActiveArea(area.id)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeArea === area.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="space-y-6">
                {activeArea === "overview" && (
                  <div className="space-y-4 animate-fade-in-up">
                    <h3 className="text-2xl font-bold">
                      Senior Frontend Engineer & Architect
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I’m a Senior Frontend Engineer with over 7 years of
                      experience building scalable, high-performance web
                      applications using React, TypeScript, and modern
                      JavaScript. My focus is on creating fast, reliable, and
                      user-friendly interfaces that work at scale across
                      enterprise products.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      At EnterpriseBot, I’ve led the adoption of micro frontend
                      architecture, built shared component libraries, and
                      improved performance scores across major dashboards. My
                      work has helped reduce release cycles, improve load times,
                      and standardize UI across multiple products.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      I enjoy solving complex frontend problems, mentoring
                      developers, and building systems that are easy to scale,
                      maintain, and extend over time.
                    </p>
                  </div>
                )}

                {activeArea === "frontend" && (
                  <div className="space-y-4 animate-fade-in-up">
                    <h3 className="text-2xl font-bold">
                      Frontend Development Excellence
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I specialize in building responsive, high-performance user
                      interfaces using React, TypeScript, and modern JavaScript.
                      My experience ranges from enterprise dashboards to
                      analytics platforms and chatbot interfaces used by global
                      clients.
                    </p>
                    <div className="text-muted-foreground leading-relaxed">
                      I focus on:
                      <ul className="list-disc list-inside mt-2">
                        <li>Building reusable, scalable components</li>
                        <li>
                          Managing complex state with modern React patterns and
                          Redux
                        </li>
                        <li>Integrating REST APIs and real-time data</li>
                        <li>
                          Ensuring accessibility, responsiveness, and
                          cross-browser compatibility
                        </li>
                      </ul>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      I’ve worked in Agile teams, collaborated closely with
                      designers and backend engineers, and delivered
                      production-ready interfaces that balance performance with
                      great user experience.
                    </p>
                  </div>
                )}

                {activeArea === "architecture" && (
                  <div className="space-y-4 animate-fade-in-up">
                    <h3 className="text-2xl font-bold">
                      Architecture & Performance
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I design frontend systems with scalability,
                      maintainability, and performance in mind. One of my key
                      contributions has been leading the adoption of micro
                      frontend architecture, breaking large applications into
                      modular, independently deployable units.
                    </p>
                    <div className="text-muted-foreground leading-relaxed">
                      My work includes:
                      <ul className="list-disc list-inside mt-2">
                        <li>
                          Designing micro frontend systems using React and
                          Webpack
                        </li>
                        <li>
                          Optimizing bundles with code splitting and lazy
                          loading
                        </li>
                        <li>
                          Improving Lighthouse and Web Vitals scores across
                          enterprise dashboards
                        </li>
                        <li>
                          Reducing feature release cycles through modular
                          architecture
                        </li>
                        <li>
                          Modernizing build systems and improving developer
                          workflows
                        </li>
                      </ul>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      I focus on building architectures that scale with product
                      growth while keeping performance and maintainability at
                      the core.
                    </p>
                  </div>
                )}

                {activeArea === "design" && (
                  <div className="space-y-4 animate-fade-in-up">
                    <h3 className="text-2xl font-bold">
                      Design Systems & Component Libraries
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Building and maintaining design systems is one of my core
                      strengths. I create reusable component libraries that
                      ensure consistency across products while enabling teams to
                      move faster.
                    </p>
                    <div className="text-muted-foreground leading-relaxed">
                      My design system work includes:
                      <ul className="list-disc list-inside mt-2">
                        <li>Developing shared React component libraries</li>
                        <li>
                          Implementing design tokens and standardized UI
                          patterns
                        </li>
                        <li>
                          Creating accessible, responsive, and theme-ready
                          components
                        </li>
                        <li>
                          Collaborating with designers to maintain a consistent
                          visual language
                        </li>
                        <li>
                          Using tools like Storybook for documentation and
                          collaboration
                        </li>
                      </ul>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      The goal is to build systems that reduce duplication,
                      improve developer productivity, and deliver a consistent
                      user experience across all products.
                    </p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </a>
                  <a
                    href="/assets/KRISHNA-DEVASHISH.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-background font-medium hover:bg-accent transition-colors"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
