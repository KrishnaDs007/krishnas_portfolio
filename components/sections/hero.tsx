import Image from "next/image";
import {
  ArrowRight,
  Download,
  Code2,
  FileCode,
  FileText,
  Palette,
  Server,
} from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left side - Text content */}
            <div className="order-1 space-y-4 text-center sm:space-y-5 lg:order-1 lg:space-y-6 lg:text-left">
              {/* Experience Badge */}
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                8+ YEARS EXPERIENCE
              </span>
            </div> */}

              {/* Animated Title */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  <span className="sr-only">Krishna Devashish | Senior React & Micro Frontend Engineer</span>
                  <span className="block text-foreground">Senior</span>
                  <span className="block text-primary animate-fade-in-up animation-delay-200">
                    Frontend Engineer
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground animate-fade-in-up animation-delay-400 sm:text-xl md:text-2xl">
                  React | JavaScript | TypeScript | Micro Frontend Architecture
                </p>
              </div>

              {/* Brief Intro */}
              <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground animate-fade-in-up animation-delay-600 sm:text-lg lg:mx-0">
                Building scalable, high-performance web applications with a
                focus on performance, design systems, and clean frontend
                architecture.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col justify-center gap-3 animate-fade-in-up animation-delay-800 sm:flex-row sm:flex-wrap lg:justify-start lg:gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/assets/KRISHNA-DEVASHISH.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-background font-medium hover:bg-accent transition-colors"
                  aria-label="Download CV (PDF)"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
                <a
                  href="/resume"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-primary/30 bg-primary/10 font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="View resume page"
                >
                  <FileText className="h-4 w-4" />
                  View Resume
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
            <div className="order-2 lg:order-2 hidden lg:flex justify-center lg:justify-end animate-fade-in-up animation-delay-400">
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
                      sizes="(min-width: 768px) 320px, 256px"
                      className="object-contain"
                    />
                  </div>

                  {/* Name badge */}
                  <div className="absolute bottom-8 left-8 right-8 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">
                          Krishna Devashish
                        </p>
                        {/* <p className="text-sm text-primary">
                          Senior Frontend Engineer
                        </p> */}
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
          <div className="mt-10 border-t border-border/50 pt-6 animate-fade-in-up animation-delay-1000 sm:mt-12 lg:mt-14 lg:pt-8">
            <p className="mb-4 text-center text-sm uppercase tracking-wider text-muted-foreground sm:mb-6">
              Technical Expertise
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
              {/* <div className="group flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-accent transition-all">
                <Cloud className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">AWS</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
