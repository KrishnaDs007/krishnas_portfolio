import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Mail, MapPin, Phone } from "lucide-react";
import {
  contactInfo,
  education,
  experiences,
  skillsData,
} from "@/lib/constants";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "ATS-friendly resume for Krishna Devashish, Senior Frontend Engineer specializing in React, TypeScript, Micro Frontends, design systems, and performance.",
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: "Krishna Devashish Resume",
    description:
      "Senior Frontend Engineer resume with React, TypeScript, Micro Frontends, design systems, and performance experience.",
    url: `${siteConfig.url}/resume`,
    images: ["/og-image.jpeg"],
  },
};

const coreSkills = Array.from(
  new Set(
    skillsData
      .filter((skill) => skill.category === "Frontend")
      .flatMap((skill) => [skill.name, skill.category]),
  ),
).slice(0, 14);

const resumeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: "Krishna Devashish",
    jobTitle: "Senior Frontend Engineer",
    url: siteConfig.url,
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    knowsAbout: [
      "React",
      "TypeScript",
      "Micro Frontends",
      "Webpack",
      "Design Systems",
      "Frontend Performance",
      "Accessibility",
      "LLM Integration",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Gandhi Institute for Engineering and Technology",
    },
  },
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resumeJsonLd),
        }}
      />
      <section className="border-b border-border bg-accent/20 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to portfolio
            </Link>

            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  ATS Friendly Resume
                </p>
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                  Krishna Devashish
                </h1>
                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                  Senior Frontend Engineer with 8+ years of experience building
                  scalable React, TypeScript, Micro Frontend, design-system, and
                  performance-focused web applications.
                </p>
              </div>

              <a
                href="/assets/KRISHNA-DEVASHISH.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_300px]">
            <div className="space-y-8">
              <section aria-labelledby="summary-heading">
                <h2 id="summary-heading" className="mb-3 text-2xl font-bold">
                  Professional Summary
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  I build fast, accessible, and maintainable frontend systems
                  for enterprise products. My work spans Micro Frontend
                  architecture, shared component libraries, design tokens,
                  dashboard performance, LLM integrations, and mentoring
                  frontend teams.
                </p>
              </section>

              <section aria-labelledby="experience-heading">
                <h2 id="experience-heading" className="mb-4 text-2xl font-bold">
                  Experience
                </h2>
                <div className="space-y-5">
                  {experiences.map((experience) => (
                    <article
                      key={experience.id}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {experience.title}
                          </h3>
                          <p className="font-medium text-primary">
                            {experience.company}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {experience.startDate} - {experience.endDate}
                        </p>
                      </div>
                      <p className="mb-4 leading-relaxed text-muted-foreground">
                        {experience.description}
                      </p>
                      {experience.achievements && (
                        <ul className="mb-4 grid gap-2 text-muted-foreground">
                          {experience.achievements.map((achievement) => (
                            <li key={achievement}>- {achievement}</li>
                          ))}
                        </ul>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md border border-border bg-accent px-2.5 py-1 text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section aria-labelledby="education-heading">
                <h2 id="education-heading" className="mb-4 text-2xl font-bold">
                  Education
                </h2>
                {education.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-border bg-card p-5"
                  >
                    <h3 className="text-xl font-semibold">
                      {item.degree} {item.field}
                    </h3>
                    <p className="font-medium text-primary">
                      {item.institution}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.startDate} - {item.endDate}
                      {item.location ? ` | ${item.location}` : ""}
                    </p>
                  </article>
                ))}
              </section>
            </div>

            <aside className="space-y-6">
              <section
                aria-labelledby="contact-heading"
                className="rounded-xl border border-border bg-card p-5"
              >
                <h2 id="contact-heading" className="mb-4 text-lg font-bold">
                  Contact
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-2 break-all transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    {contactInfo.email}
                  </a>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    {contactInfo.phone}
                  </a>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {contactInfo.location}
                  </p>
                </div>
              </section>

              <section
                aria-labelledby="skills-heading"
                className="rounded-xl border border-border bg-card p-5"
              >
                <h2 id="skills-heading" className="mb-4 text-lg font-bold">
                  Core Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {coreSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
