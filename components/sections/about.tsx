"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Twitter, Mail, MapPin, type LucideIcon } from "lucide-react";
import { socialLinks, contactInfo } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll-utils";

const expertiseAreas = [
  { id: "overview", label: "Overview" },
  { id: "frontend", label: "Frontend Development" },
  { id: "architecture", label: "Architecture & Performance" },
  { id: "design", label: "Design Systems" },
];

export function About() {
  const [activeArea, setActiveArea] = useState("overview");

  return (
    <section
      id="about"
      className="flex items-center bg-accent/30 pb-12 sm:pb-14 lg:min-h-screen lg:pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <p className="text-sm text-primary font-semibold uppercase tracking-[0.2em] mb-3">
              About Me
            </p>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Architecting digital experiences with{" "}
              <span className="text-primary">precision</span>.
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid items-start gap-8 lg:grid-cols-[400px_1fr] lg:gap-12">
            {/* Left Column - Profile Image (Smaller) */}
            <div className="order-1 lg:order-1">
              <div className="relative mx-auto max-w-xs sm:max-w-sm lg:mx-0">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl" />

                {/* Profile Image Card */}
                <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/Krishna.jpeg"
                      alt="Krishna Devashish"
                      fill
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 320px"
                      quality={60}
                      className="object-cover"
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
                <div className="relative z-1 mt-4 sm:mt-6">
                  <p className="mb-3 text-sm uppercase tracking-wider text-muted-foreground sm:mb-4">
                    Connect with me
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => {
                      const iconMap: Record<string, LucideIcon> = {
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
                          aria-label={`${social.platform} Profile`}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Core Expertise */}
                {/* <div className="mt-6">
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
                </div> */}
              </div>
            </div>

            {/* Right Column - Content with Tags */}
            <div className="order-2 lg:order-2">
              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
                {expertiseAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => setActiveArea(area.id)}
                    aria-pressed={activeArea === area.id}
                    className={`px-4 py-2.5 border rounded-lg text-sm font-medium transition-all ${
                      activeArea === area.id
                        ? "border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="space-y-5 sm:space-y-6">
                {activeArea === "overview" && (
                  <div className="space-y-3 animate-fade-in-up sm:space-y-4">
                    <h3 className="text-xl font-bold sm:text-2xl">
                      Senior React & Micro Frontend Engineer
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      I am a Senior Frontend Engineer with 8+ years of experience. I build fast, scalable, and user-friendly web apps using React, TypeScript, and modern JavaScript. My goal is always clean code that performs well at scale.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      At EnterpriseBot, I led major improvements:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-muted-foreground sm:space-y-2">
                      <li>
                        Led Micro Frontend architecture with React + Webpack and reduced release cycles by 30%
                      </li>
                      <li>
                        Built shared React component library with Design Tokens and cut duplicate work by 40%
                      </li>
                      <li>
                        Improved Lighthouse scores from 55-60 to 90+ across dashboards
                      </li>
                      <li>
                        Integrated Azure, OpenAI, and Gemini LLMs and created dynamic model-switching dashboard
                      </li>
                      <li>Mentored juniors and boosted team speed by 20%</li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed">
                      I love solving tough frontend challenges, mentoring teams, and building systems that grow easily with the product.
                    </p>
                  </div>
                )}

                {activeArea === "frontend" && (
                  <div className="space-y-4 animate-fade-in-up">
                    <h3 className="text-2xl font-bold">Frontend Development</h3>

                    <p className="text-muted-foreground leading-relaxed">
                      I specialize in creating responsive, high-performance UIs with React, TypeScript, and modern JavaScript. I have worked on enterprise dashboards, analytics tools, and AI chatbot interfaces for global users.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      Key things I focus on:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Reusable components and scalable code</li>
                      <li>State management with Redux and React patterns</li>
                      <li>REST API integration and real-time data handling</li>
                      <li>
                        Accessibility (a11y), responsiveness, and cross-browser support
                      </li>
                      <li>
                        Agile teamwork with designers and backend engineers
                      </li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed">
                      I deliver clean, production-ready interfaces that give users a smooth and fast experience.
                    </p>
                  </div>
                )}

                {activeArea === "architecture" && (
                  <div className="space-y-4 animate-fade-in-up">
                    <h3 className="text-2xl font-bold">
                      Architecture & Performance
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      I design frontend systems that are easy to scale, maintain, and perform well. I led the move to Micro Frontends at EnterpriseBot, splitting big apps into independent parts.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      My key achievements:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>Built Micro Frontend setup with React + Webpack</li>
                      <li>
                        Used code splitting, lazy loading, and bundle optimization
                      </li>
                      <li>
                        Boosted Lighthouse scores to 90+ and improved Web Vitals
                      </li>
                      <li>Reduced release time by 30% with modular design</li>
                      <li>
                        Integrated multi-LLM (Azure, OpenAI, Gemini) with configurable dashboard
                      </li>
                      <li>
                        Upgraded build tools (Webpack v3 to v5) for faster workflows
                      </li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed">
                      I build strong foundations so teams can add features quickly without breaking things.
                    </p>
                  </div>
                )}

                {activeArea === "design" && (
                  <div className="space-y-4 animate-fade-in-up">
                    <h3 className="text-2xl font-bold">
                      Design Systems & Component Libraries
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      I love building design systems that make teams faster and UI consistent. At EnterpriseBot, I created a shared React component library used across products.
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      What I have done:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      <li>
                        Developed reusable React components with Design Tokens
                      </li>
                      <li>
                        Added accessibility, dark/light themes, and responsive styles
                      </li>
                      <li>
                        Worked with designers for consistent look and feel
                      </li>
                      <li>Used tools like Storybook for easy documentation</li>
                      <li>
                        Reduced duplicate code by 40% and sped up development
                      </li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed">
                      The result: cleaner code, faster delivery, and better user experience everywhere.
                    </p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:gap-4 sm:pt-6">
                  <button
                    onClick={() => scrollToSection("contact", -180)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </button>
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
