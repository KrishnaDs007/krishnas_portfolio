import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects-utils";

const siteUrl = "https://krishnasportfolio-rho.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = getProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.9 : 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
