// Example data structure for your portfolio
// You can move this to a database or CMS later

import { Project, Experience, Skill, SocialLink } from '@/types';

export const projects: Project[] = [
    {
        id: '1',
        title: 'Example Project',
        description: 'A brief description of your project',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        featured: true,
    },
    // Add more projects here
];

export const experiences: Experience[] = [
    {
        id: '1',
        company: 'Company Name',
        position: 'Your Position',
        duration: '2021 - Present',
        description: 'Brief description of your role and achievements',
        technologies: ['React', 'TypeScript', 'Node.js'],
    },
    // Add more experiences here
];

export const skills: Skill[] = [
    { name: 'React', category: 'frontend', proficiency: 90 },
    { name: 'Next.js', category: 'frontend', proficiency: 85 },
    { name: 'TypeScript', category: 'frontend', proficiency: 85 },
    { name: 'Tailwind CSS', category: 'frontend', proficiency: 90 },
    // Add more skills here
];

export const socialLinks: SocialLink[] = [
    { platform: 'GitHub', url: 'https://github.com/yourusername' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { platform: 'Twitter', url: 'https://twitter.com/yourusername' },
    // Add more social links here
];
