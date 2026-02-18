import {
    Code2,
    Palette,
    Database,
    Cloud,
    Wrench,
    FileCode,
    Layout,
    Smartphone,
    Server,
    GitBranch,
    Package,
    Boxes,
    Cpu,
    Workflow,
    Terminal,
    type LucideIcon,
} from 'lucide-react';

// Icon mapping for skills
export const skillIcons: Record<string, LucideIcon> = {
    // Frontend
    'react': Code2,
    'nextjs': Code2,
    'typescript': FileCode,
    'javascript': FileCode,
    'html-css': Layout,
    'tailwind': Palette,
    'sass': Palette,
    'responsive-design': Smartphone,
    'ui-ux': Palette,
    'design-systems': Boxes,

    // Backend
    'nodejs': Server,
    'express': Server,
    'postgresql': Database,
    'mongodb': Database,
    'rest-api': Server,
    'graphql': Server,

    // DevOps & Tools
    'git': GitBranch,
    'docker': Package,
    'aws': Cloud,
    'ci-cd': Workflow,
    'linux': Terminal,

    // Default
    'default': Code2,
};

// Tool/Workflow icons
export const toolIcons: Record<string, LucideIcon> = {
    'vscode': FileCode,
    'git-github': GitBranch,
    'ci-cd-pipelines': Workflow,
    'terminal': Terminal,
    'docker': Package,
    'figma': Palette,
    'default': Wrench,
};

// Helper function to get icon
export const getSkillIcon = (iconKey: string): LucideIcon => {
    return skillIcons[iconKey.toLowerCase()] || skillIcons['default'];
};

export const getToolIcon = (iconKey: string): LucideIcon => {
    return toolIcons[iconKey.toLowerCase()] || toolIcons['default'];
};
