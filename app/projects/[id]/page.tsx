import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Star } from "lucide-react";
import { getProjectById, getProjects } from "@/lib/projects-utils";
import { siteConfig } from "@/lib/site-config";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Krishna Devashish`,
      description: project.shortDescription,
      images: [
        {
          url: project.images[0],
          alt: `${project.title} project screenshot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Krishna Devashish`,
      description: project.shortDescription,
      images: [project.images[0]],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const projectUrl = `${siteConfig.url}/projects/${project.id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: project.category,
    description: project.shortDescription,
    url: project.liveUrl ?? projectUrl,
    image: project.images.map((image) =>
      new URL(image, siteConfig.url).toString(),
    ),
    codeRepository: project.githubUrl ?? undefined,
    programmingLanguage: project.technologies,
    dateCreated: project.year,
    author: {
      "@type": "Person",
      name: "Krishna Devashish",
      url: siteConfig.url,
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <section className="border-b border-border/50 bg-accent/20 pt-8 pb-10 sm:pb-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/#projects"
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to projects
            </Link>

            <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {project.year}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-700/30 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:border-amber-400/40 dark:bg-amber-950 dark:text-amber-100">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      Star Project
                    </span>
                  )}
                </div>

                <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {project.title}
                </h1>
                <p className="mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <Image
                  src={project.images[0]}
                  alt={`${project.title} cover screenshot`}
                  fill
                  sizes="(min-width: 1024px) 640px, calc(100vw - 32px)"
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
            <div className="space-y-10">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Project Overview
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {project.fullDescription}
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <article className="rounded-xl border border-border bg-card p-5">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    Challenge
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    {project.challenge}
                  </p>
                </article>

                <article className="rounded-xl border border-border bg-card p-5">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                    Architecture
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    {project.architecture}
                  </p>
                </article>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    Key Decisions
                  </h2>
                  <ul className="grid gap-3">
                    {project.decisions.map((decision) => (
                      <li
                        key={decision}
                        className="rounded-xl border border-border bg-card p-4 text-muted-foreground"
                      >
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    Impact
                  </h2>
                  <ul className="grid gap-3">
                    {project.impact.map((item) => (
                      <li
                        key={item}
                        className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Key Features
                </h2>
                <ul className="grid gap-3">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-xl border border-border bg-card p-4 text-muted-foreground"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {project.images.length > 1 && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    Screenshots
                  </h2>
                  <div className="grid gap-5 md:grid-cols-2">
                    {project.images.slice(1).map((image, index) => (
                      <div
                        key={image}
                        className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-card"
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 2}`}
                          fill
                          sizes="(min-width: 768px) 50vw, calc(100vw - 32px)"
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
              <h2 className="mb-4 text-lg font-bold text-foreground">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
