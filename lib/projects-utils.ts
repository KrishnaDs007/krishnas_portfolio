import projectsData from '@/data/projects.json';

export interface ProjectData {
    id: string;
    title: string;
    category: string;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    features: string[];
    images: string[];
    videoUrl: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    featured: boolean;
    year: string;
}

export const getProjects = (): ProjectData[] => {
    return projectsData as ProjectData[];
};

export const getProjectById = (id: string): ProjectData | undefined => {
    return projectsData.find((project) => project.id === id) as ProjectData | undefined;
};

export const getProjectCategories = (): string[] => {
    const categories = new Set(projectsData.map((project) => project.category));
    return ['All Projects', ...Array.from(categories)];
};

export const getProjectsByCategory = (category: string): ProjectData[] => {
    if (category === 'All Projects') {
        return projectsData as ProjectData[];
    }
    return projectsData.filter((project) => project.category === category) as ProjectData[];
};
