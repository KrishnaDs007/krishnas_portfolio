import projectsData from "@/data/projects.json";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  architecture: string;
  architectureFlow: string[];
  decisions: string[];
  impact: string[];
  technologies: string[];
  features: string[];
  images: string[];
  videoUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  year: string;
}

export type ProjectCard = Pick<
  ProjectData,
  | "id"
  | "title"
  | "category"
  | "shortDescription"
  | "year"
  | "featured"
  | "technologies"
  | "liveUrl"
  | "githubUrl"
> & { image: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const isHttpUrlOrNull = (value: unknown): value is string | null => {
  if (value === null) return true;
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return (
      (url.protocol === "https:" || url.protocol === "http:") &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
};

const requireString = (
  project: Record<string, unknown>,
  key: keyof ProjectData,
  index: number,
) => {
  const value = project[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Project ${index} has an invalid "${key}" value.`);
  }

  return value;
};

const validateProject = (project: unknown, index: number): ProjectData => {
  if (!isRecord(project)) {
    throw new Error(`Project ${index} must be an object.`);
  }

  if (!isStringArray(project.technologies)) {
    throw new Error(`Project ${index} has invalid "technologies".`);
  }

  if (!isStringArray(project.features)) {
    throw new Error(`Project ${index} has invalid "features".`);
  }

  if (!isStringArray(project.decisions)) {
    throw new Error(`Project ${index} has invalid "decisions".`);
  }

  if (!isStringArray(project.architectureFlow)) {
    throw new Error(`Project ${index} has invalid "architectureFlow".`);
  }

  if (!isStringArray(project.impact)) {
    throw new Error(`Project ${index} has invalid "impact".`);
  }

  if (!isStringArray(project.images) || project.images.length === 0) {
    throw new Error(`Project ${index} must include at least one image.`);
  }

  if (!isHttpUrlOrNull(project.videoUrl)) {
    throw new Error(`Project ${index} has an invalid "videoUrl".`);
  }

  if (!isHttpUrlOrNull(project.liveUrl)) {
    throw new Error(`Project ${index} has an invalid "liveUrl".`);
  }

  if (!isHttpUrlOrNull(project.githubUrl)) {
    throw new Error(`Project ${index} has an invalid "githubUrl".`);
  }

  if (typeof project.featured !== "boolean") {
    throw new Error(`Project ${index} has an invalid "featured" value.`);
  }

  return {
    id: requireString(project, "id", index),
    title: requireString(project, "title", index),
    category: requireString(project, "category", index),
    shortDescription: requireString(project, "shortDescription", index),
    fullDescription: requireString(project, "fullDescription", index),
    challenge: requireString(project, "challenge", index),
    architecture: requireString(project, "architecture", index),
    architectureFlow: project.architectureFlow,
    decisions: project.decisions,
    impact: project.impact,
    technologies: project.technologies,
    features: project.features,
    images: project.images,
    videoUrl: project.videoUrl,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    featured: project.featured,
    year: requireString(project, "year", index),
  };
};

const getValidatedProjects = (): ProjectData[] => {
  if (!Array.isArray(projectsData)) {
    throw new Error("Project data must be an array.");
  }

  const ids = new Set<string>();
  return projectsData.map((entry, index) => {
    const project = validateProject(entry, index);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id) || ids.has(project.id)) {
      throw new Error(`Project ${index} has an invalid or duplicate ID.`);
    }
    ids.add(project.id);
    return project;
  });
};

const validatedProjects = getValidatedProjects();

export const getProjects = (): ProjectData[] => {
  return validatedProjects;
};

export const getProjectById = (id: string): ProjectData | undefined => {
  return validatedProjects.find((project) => project.id === id);
};

export const getProjectCategories = (): string[] => {
  const categories = new Set(
    validatedProjects.map((project) => project.category),
  );
  return ["All Projects", ...Array.from(categories)];
};

export const getProjectCards = (): ProjectCard[] =>
  validatedProjects.map(
    ({
      id,
      title,
      category,
      shortDescription,
      year,
      featured,
      technologies,
      liveUrl,
      githubUrl,
      images,
    }) => ({
      id,
      title,
      category,
      shortDescription,
      year,
      featured,
      technologies,
      liveUrl,
      githubUrl,
      image: images[0],
    }),
  );
