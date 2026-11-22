import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects-utils";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = getProjects().map((project) => ({
    url: `${siteConfig.url}/projects/${project.id}`,
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.9 : 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
  ];
}
