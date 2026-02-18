"use client";

import Image from "next/image";
import {
  ArrowRight,
  Download,
  Code2,
  FileCode,
  Palette,
  Server,
  Cloud,
} from "lucide-react";
import { scrollToSection } from "@/lib/scroll-utils";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 pb-20 md:pb-0"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6 order-1 lg:order-1">
              {/* Experience Badge */}
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                7+ YEARS EXPERIENCE
              </span>
            </div> */}

              {/* Animated Title */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-foreground">Senior</span>
                  <span className="block text-primary animate-fade-in-up animation-delay-200">
                    Frontend Engineer
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up animation-delay-400">
                  React | JavaScript | TypeScript | Micro Frontend Architecture
                </p>
              </div>

              {/* Brief Intro */}
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-in-up animation-delay-600">
                Building scalable, high-performance web applications with a
                focus on performance, design systems, and clean frontend
                architecture.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-800">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="/assets/KRISHNA-DEVASHISH.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-background font-medium hover:bg-accent transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </div>

              {/* Stats Section - Commented for later update */}
              {/* 
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-foreground">40+</div>
                <div className="text-sm text-muted-foreground">Projects Shipped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">12k+</div>
                <div className="text-sm text-muted-foreground">Git Commits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">5</div>
                <div className="text-sm text-muted-foreground">Open Source</div>
              </div>
            </div>
            */}
            </div>

            {/* Right side - Profile Image */}
            <div className="order-2 lg:order-2 flex justify-center lg:justify-end animate-fade-in-up animation-delay-400">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />

                {/* Profile card */}
                <div className="relative bg-card border border-border rounded-3xl p-6 shadow-xl">
                  <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-background">
                    {/* Profile Image */}
                    <Image
                      src="/images/Profile_illustrated_clearbg.png"
                      alt="Krishna Devashish"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  {/* Name badge */}
                  <div className="absolute bottom-8 left-8 right-8 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          Krishna Devashish
                        </h3>
                        <p className="text-sm text-primary">
                          Senior Frontend Engineer
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Expertise */}
          <div className="mt-16 pt-8 border-t border-border/50 animate-fade-in-up animation-delay-1000">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6 text-center">
              Technical Expertise
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              <div className="group flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all">
                <Code2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  React/Next.js
                </span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all">
                <FileCode className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  TypeScript
                </span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all">
                <Palette className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Tailwind CSS
                </span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all">
                <Server className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Node.js
                </span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all">
                <Cloud className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">AWS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
