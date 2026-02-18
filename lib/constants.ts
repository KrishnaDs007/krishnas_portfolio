// Experience Data
export interface ExperienceItem {
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: string;
    endDate: string | 'Present';
    isCurrent: boolean;
    description: string;
    skills: string[];
    achievements?: string[];
}

export const experiences: ExperienceItem[] = [
    {
        id: 'exp-1',
        title: 'Senior Frontend Engineer',
        company: 'EnterpriseBot (Ebot AI IT Solutions Pvt. Ltd.)',
        location: 'Bangalore, India',
        startDate: '2019',
        endDate: 'Present',
        isCurrent: true,
        description: 'Led micro frontend architecture using React and Webpack. Built shared UI libraries, improved performance, and delivered scalable enterprise dashboards.',
        skills: ['React', 'TypeScript', 'Micro Frontend', 'Webpack', 'Redux', 'Design Systems'],
        achievements: [
            'Reduced feature release cycles by ~30%',
            'Improved Lighthouse scores from ~60 to 90+',
            'Built shared component library reducing duplicate work by 40%',
            'Improved load times by 25–40%',
            'Mentored junior developers and improved team velocity'
        ]
    },
    {
        id: 'exp-2',
        title: 'Frontend Developer',
        company: 'Airtory Interactive Pvt. Ltd.',
        location: 'Bangalore, India',
        startDate: '2018',
        endDate: '2019',
        isCurrent: false,
        description: 'Upgraded Angular applications, built interactive ad experiences, and developed responsive UIs for analytics-driven advertising platforms.',
        skills: ['Angular', 'JavaScript', 'HTML5', 'CSS3', 'Canvas', 'Responsive Design'],
        achievements: [
            'Upgraded product UI from Angular 2 to Angular 8',
            'Increased website engagement by ~40%',
            'Built interactive ad experiences using HTML Canvas',
            'Delivered responsive UIs for global ad campaigns'
        ]
    }
];

// Education Data
export interface EducationItem {
    id: string;
    degree: string;
    field: string;
    institution: string;
    location?: string;
    startDate: string;
    endDate: string | 'Present';
    isCurrent: boolean;
    description: string;
    achievements?: string[];
    gpa?: string;
    courses?: string[];
}

export const education: EducationItem[] = [
    {
        id: 'edu-1',
        degree: 'B.Tech',
        field: 'Computer Science & Engineering',
        institution: 'Gandhi Institute for Engineering and Technology',
        location: 'Gunupur, Odisha, India',
        startDate: '2014',
        endDate: '2018',
        isCurrent: false,
        description: 'Focused on computer science fundamentals, web technologies, and software engineering principles.',
        achievements: [
            'Completed major project in web-based systems',
            'Active participant in technical events and coding activities'
        ],
        gpa: '',
        courses: ['Data Structures', 'Algorithms', 'Web Technologies', 'Database Systems']
    }
];

// Projects Data
export interface ProjectItem {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription?: string;
    image?: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    year: string;
    client?: string;
}

export const projects: ProjectItem[] = [
    {
        id: 'proj-1',
        title: 'E-Commerce Platform',
        category: 'Web Application',
        description: 'A full-featured e-commerce platform with real-time inventory management.',
        longDescription: 'Built a scalable e-commerce platform handling 10k+ daily users. Implemented real-time inventory tracking, payment integration, and admin dashboard.',
        technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com',
        featured: true,
        year: '2023',
        client: 'Retail Corp'
    },
    {
        id: 'proj-2',
        title: 'Design System Library',
        category: 'Component Library',
        description: 'Comprehensive React component library with 50+ components.',
        longDescription: 'Created a design system used across multiple products. Includes documentation, accessibility features, and theming support.',
        technologies: ['React', 'TypeScript', 'Storybook', 'Radix UI'],
        githubUrl: 'https://github.com',
        featured: true,
        year: '2023'
    },
    {
        id: 'proj-3',
        title: 'Portfolio Website',
        category: 'Website',
        description: 'Modern portfolio website with smooth animations and dark mode.',
        technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
        liveUrl: 'https://example.com',
        featured: false,
        year: '2024'
    }
];

// Skills Data
export interface SkillCategory {
    category: string;
    skills: string[];
}

export const skills: SkillCategory[] = [
    {
        category: 'Frontend',
        skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS']
    },
    {
        category: 'Backend',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL']
    },
    {
        category: 'Tools & Others',
        skills: ['Git', 'Docker', 'AWS', 'Figma', 'Storybook', 'Jest']
    },
    {
        category: 'Design',
        skills: ['UI/UX Design', 'Responsive Design', 'Design Systems', 'Accessibility']
    }
];

// Testimonials Data
export interface TestimonialItem {
    id: string;
    name: string;
    role: string;
    company: string;
    image?: string;
    testimonial: string;
    rating?: number;
}

export const testimonials: TestimonialItem[] = [
    {
        id: 'test-1',
        name: 'Sarah Johnson',
        role: 'CTO',
        company: 'TechFlow Solutions',
        testimonial: 'Krishna is an exceptional developer who consistently delivers high-quality work. His attention to detail in UI interactions is unmatched. The component library he built transformed our entire product line.',
        rating: 5
    },
    {
        id: 'test-2',
        name: 'Michael Chen',
        role: 'Product Manager',
        company: 'Creative Digital',
        testimonial: 'Working with Krishna was a game-changer for our startup. He understood our vision immediately and executed it perfectly. The attention to detail in UI interactions is unmatched.',
        rating: 5
    },
    {
        id: 'test-3',
        name: 'Emily Rodriguez',
        role: 'Lead Designer',
        company: 'Design Studio Pro',
        testimonial: 'Krishna bridges the gap between design and development beautifully. His understanding of both disciplines made our collaboration seamless. Highly recommend!',
        rating: 5
    },
    {
        id: 'test-4',
        name: 'David Park',
        role: 'Founder & CEO',
        company: 'StartUp Ventures',
        testimonial: 'The level of strategic thinking and technical execution exceeded our expectations. Our conversion rates have seen a 40% uptick since the relaunch.',
        rating: 5
    },
    {
        id: 'test-5',
        name: 'Amanda Williams',
        role: 'Engineering Manager',
        company: 'Enterprise Solutions Inc',
        testimonial: 'Incredible attention to detail. They didn\'t just build a website; they built a comprehensive brand identity that resonates with our audience. Highly professional!',
        rating: 5
    }
];

// Stats Data
export interface StatsItem {
    label: string;
    value: string;
    suffix?: string;
}

export const stats: StatsItem[] = [
    { label: 'Years Experience', value: '7', suffix: '+' },
    { label: 'Projects Completed', value: '25', suffix: '+' },
    // { label: 'Happy Clients', value: '45', suffix: '+' },
    // { label: 'Awards Won', value: '10', suffix: '+' }
];

// Detailed Skills Data
export interface SkillItem {
    id: string;
    name: string;
    category: 'All' | 'Frontend' | 'Backend' | 'Tools' | 'DevOps';
    proficiencyLevel: 'Expert' | 'Advanced' | 'Intermediate';
    proficiencyPercentage: number;
    yearsOfExperience: string;
    description: string;
    iconKey: string; // Key to map to Lucide icon
}

export const skillsData: SkillItem[] = [
    // Frontend Skills
    {
        id: 'skill-1',
        name: 'React & Next.js',
        category: 'Frontend',
        proficiencyLevel: 'Expert',
        proficiencyPercentage: 95,
        yearsOfExperience: '5+ Years',
        description: 'Building scalable SPAs and SSR applications with React hooks, Redux, and Context API.',
        iconKey: 'react'
    },
    {
        id: 'skill-2',
        name: 'TypeScript',
        category: 'Frontend',
        proficiencyLevel: 'Advanced',
        proficiencyPercentage: 90,
        yearsOfExperience: '4+ Years',
        description: 'Type-safe development ensuring robust codebases and excellent developer experience.',
        iconKey: 'typescript'
    },
    {
        id: 'skill-3',
        name: 'Tailwind CSS',
        category: 'Frontend',
        proficiencyLevel: 'Expert',
        proficiencyPercentage: 98,
        yearsOfExperience: '3+ Years',
        description: 'Utility-first styling for rapid UI development and maintaining consistent design systems.',
        iconKey: 'tailwind'
    },
    {
        id: 'skill-4',
        name: 'JavaScript & ES6+',
        category: 'Frontend',
        proficiencyLevel: 'Expert',
        proficiencyPercentage: 95,
        yearsOfExperience: '8+ Years',
        description: 'Deep understanding of ES6+ features and strict typing to build robust, maintainable, and bug-free codebases.',
        iconKey: 'javascript'
    },
    {
        id: 'skill-5',
        name: 'Responsive Design',
        category: 'Frontend',
        proficiencyLevel: 'Expert',
        proficiencyPercentage: 95,
        yearsOfExperience: '7+ Years',
        description: 'Creating mobile-first, responsive layouts that work seamlessly across all devices.',
        iconKey: 'responsive-design'
    },
    {
        id: 'skill-6',
        name: 'UI/UX Design',
        category: 'Frontend',
        proficiencyLevel: 'Advanced',
        proficiencyPercentage: 85,
        yearsOfExperience: '6+ Years',
        description: 'Designing intuitive user interfaces with focus on accessibility and user experience.',
        iconKey: 'ui-ux'
    },

    // Backend Skills
    {
        id: 'skill-7',
        name: 'Node.js & Express',
        category: 'Backend',
        proficiencyLevel: 'Advanced',
        proficiencyPercentage: 85,
        yearsOfExperience: '5+ Years',
        description: 'Building performant REST and GraphQL APIs with asynchronous logic.',
        iconKey: 'nodejs'
    },
    {
        id: 'skill-8',
        name: 'PostgreSQL',
        category: 'Backend',
        proficiencyLevel: 'Advanced',
        proficiencyPercentage: 80,
        yearsOfExperience: '4+ Years',
        description: 'Optimized database schema design and high-speed caching strategies.',
        iconKey: 'postgresql'
    },
    {
        id: 'skill-9',
        name: 'MongoDB',
        category: 'Backend',
        proficiencyLevel: 'Intermediate',
        proficiencyPercentage: 75,
        yearsOfExperience: '3+ Years',
        description: 'NoSQL database design for flexible, scalable data storage.',
        iconKey: 'mongodb'
    },
    {
        id: 'skill-10',
        name: 'REST APIs',
        category: 'Backend',
        proficiencyLevel: 'Expert',
        proficiencyPercentage: 90,
        yearsOfExperience: '6+ Years',
        description: 'Designing and implementing RESTful APIs following best practices.',
        iconKey: 'rest-api'
    },

    // DevOps & Tools
    {
        id: 'skill-11',
        name: 'Git & GitHub',
        category: 'Tools',
        proficiencyLevel: 'Expert',
        proficiencyPercentage: 95,
        yearsOfExperience: '8+ Years',
        description: 'Version control, branching strategies, and collaborative development workflows.',
        iconKey: 'git'
    },
    {
        id: 'skill-12',
        name: 'Docker',
        category: 'DevOps',
        proficiencyLevel: 'Advanced',
        proficiencyPercentage: 80,
        yearsOfExperience: '3+ Years',
        description: 'Containerization of microservices for consistent development across teams.',
        iconKey: 'docker'
    },
    {
        id: 'skill-13',
        name: 'AWS / Cloud',
        category: 'DevOps',
        proficiencyLevel: 'Advanced',
        proficiencyPercentage: 85,
        yearsOfExperience: '4+ Years',
        description: 'Deploying and managing serverless functions, S3, and EC2 instances.',
        iconKey: 'aws'
    },
    {
        id: 'skill-14',
        name: 'CI/CD Pipelines',
        category: 'DevOps',
        proficiencyLevel: 'Advanced',
        proficiencyPercentage: 82,
        yearsOfExperience: '3+ Years',
        description: 'Automated testing and deployment pipelines for continuous integration.',
        iconKey: 'ci-cd'
    },
];

// Favorite Tools & Workflow
export interface FavoriteToolItem {
    id: string;
    name: string;
    description: string;
    iconKey: string;
}

export const favoriteTools: FavoriteToolItem[] = [
    {
        id: 'tool-1',
        name: 'VS Code',
        description: 'Primary code editor with custom extensions',
        iconKey: 'vscode'
    },
    {
        id: 'tool-2',
        name: 'Git & GitHub',
        description: 'Version control and collaboration',
        iconKey: 'git-github'
    },
    {
        id: 'tool-3',
        name: 'CI/CD Pipelines',
        description: 'Automated testing and deployment',
        iconKey: 'ci-cd-pipelines'
    },
    {
        id: 'tool-4',
        name: 'Terminal / Zsh',
        description: 'Command-line productivity with Oh My Zsh',
        iconKey: 'terminal'
    },
    {
        id: 'tool-5',
        name: 'Docker',
        description: 'Containerization and orchestration',
        iconKey: 'docker'
    },
    {
        id: 'tool-6',
        name: 'Figma',
        description: 'UI/UX design and prototyping',
        iconKey: 'figma'
    },
];

// Social Links
export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

export const socialLinks: SocialLink[] = [
    {
        platform: 'github',
        url: 'https://github.com/KrishnaDs007',
        icon: 'Github'
    },
    {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/mrkd007',
        icon: 'Linkedin'
    },
    {
        platform: 'twitter',
        url: 'https://x.com/itskd_17',
        icon: 'Twitter'
    },
    {
        platform: 'email',
        url: 'mailto:krishnadevashish17@gmail.com',
        icon: 'Mail'
    }
];

// Contact Information
export interface ContactInfo {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
}

export const contactInfo: ContactInfo = {
    email: 'krishnadevashish17@gmail.com',
    phone: '+917978423156',
    whatsapp: '+917978423156',
    location: 'Bengaluru, Karnataka, India'
};

