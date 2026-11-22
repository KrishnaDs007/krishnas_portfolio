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
    learning?: string;
}

export const experiences: ExperienceItem[] = [
    {
        id: 'exp-4',
        title: 'Senior Data Scientist',
        company: 'Brillio Technologies',
        startDate: '15 October 2026',
        endDate: 'Present',
        isCurrent: true,
        description: 'Work on a client project as a full-stack engineer, using Next.js across the frontend and server-side application.',
        skills: ['Next.js', 'Full-Stack Development'],
        learning: 'Developing a broader view of how frontend and server-side decisions fit together when delivering features for a client.'
    },
    {
        id: 'exp-3',
        title: 'Senior Developer',
        company: 'Nucleo',
        startDate: '1 September 2026',
        endDate: '15 October 2026',
        isCurrent: false,
        description: 'Worked full-time at an early-stage startup, defining product workflows and module boundaries, planning the frontend architecture, and setting up a Turborepo workspace for the company’s UI projects. Mentored junior developers and new hires and helped interview and select engineering candidates.',
        skills: ['Turborepo', 'Frontend Architecture', 'Technical Mentoring', 'Technical Interviewing'],
        achievements: [
            'Mapped core product workflows and defined how responsibilities were split across modules.',
            'Created an architecture plan for the modules and set up a Turborepo workspace for the company’s frontend projects.',
            'Wrote development guidelines for junior developers and mentored them and new hires as they joined the team.',
            'Interviewed engineering candidates and contributed to hiring decisions.'
        ],
        learning: 'Learned how clear module boundaries, shared tooling, and written guidelines can help an early-stage team onboard and build consistently.'
    },
    {
        id: 'exp-1',
        title: 'Senior Frontend Engineer',
        company: 'EnterpriseBot (Ebot AI IT Solutions Pvt. Ltd.)',
        location: 'Bangalore, India',
        startDate: 'September 2019',
        endDate: '2 June 2026',
        isCurrent: false,
        description: 'Led micro frontend architecture using React and Webpack. Built shared UI libraries, improved performance, and delivered scalable enterprise dashboards.',
        skills: ['React', 'TypeScript', 'Micro Frontend', 'Webpack', 'Redux', 'Design Systems'],
        achievements: [
            'Reduced feature release cycles by ~30%',
            'Improved Lighthouse scores from ~60 to 90+',
            'Built shared component library reducing duplicate work by 40%',
            'Improved load times by 25-40%',
            'Mentored junior developers and improved team velocity'
        ]
    },
    {
        id: 'exp-2',
        title: 'Frontend Developer',
        company: 'Airtory Interactive Pvt. Ltd.',
        location: 'Bangalore, India',
        startDate: 'June 2018',
        endDate: 'August 2019',
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

// Stats Data
export interface StatsItem {
    label: string;
    value: string;
    suffix?: string;
}

export const stats: StatsItem[] = [
    { label: 'Years Experience', value: '8', suffix: '+' },
    { label: 'Projects Completed', value: '25', suffix: '+' },
    // { label: 'Happy Clients', value: '45', suffix: '+' },
    // { label: 'Awards Won', value: '10', suffix: '+' }
];

// Detailed Skills Data
export interface SkillItem {
    id: string;
    name: string;
    category: 'All' | 'Frontend' | 'Backend' | 'Tools' | 'DevOps';
    proficiencyLevel: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
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
        yearsOfExperience: '6+ Years',
        description: 'Building scalable SPAs and SSR applications with React hooks, Redux, and Context API.',
        iconKey: 'react'
    },
    {
        id: 'skill-2',
        name: 'TypeScript',
        category: 'Frontend',
        proficiencyLevel: 'Advanced',
        proficiencyPercentage: 70,
        yearsOfExperience: '2+ Years',
        description: 'Type-safe development ensuring robust codebases and excellent developer experience.',
        iconKey: 'typescript'
    },
    {
        id: 'skill-3',
        name: 'Tailwind CSS',
        category: 'Frontend',
        proficiencyLevel: 'Advanced',
        proficiencyPercentage: 75,
        yearsOfExperience: '2+ Years',
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
        yearsOfExperience: '8+ Years',
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
        proficiencyPercentage: 60,
        yearsOfExperience: '1+ Years',
        description: 'Building performant REST and GraphQL APIs with asynchronous logic.',
        iconKey: 'nodejs'
    },
    {
        id: 'skill-8',
        name: 'PostgreSQL',
        category: 'Backend',
        proficiencyLevel: 'Beginner',
        proficiencyPercentage: 30,
        yearsOfExperience: '1+ Years',
        description: 'Optimized database schema design and high-speed caching strategies.',
        iconKey: 'postgresql'
    },
    {
        id: 'skill-9',
        name: 'MongoDB',
        category: 'Backend',
        proficiencyLevel: 'Intermediate',
        proficiencyPercentage: 45,
        yearsOfExperience: '2+ Years',
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
    {
        id: 'skill-10-fastapi',
        name: 'Python FastAPI',
        category: 'Backend',
        proficiencyLevel: 'Beginner',
        proficiencyPercentage: 30,
        yearsOfExperience: 'Learning',
        description: 'Building typed Python API foundations with FastAPI, request validation, and clean endpoint structure.',
        iconKey: 'fastapi'
    },

    // DevOps & Tools
    {
        id: 'skill-11',
        name: 'Git & GitHub',
        category: 'Tools',
        proficiencyLevel: 'Expert',
        proficiencyPercentage: 95,
        yearsOfExperience: '7+ Years',
        description: 'Version control, branching strategies, and collaborative development workflows.',
        iconKey: 'git'
    },
    {
        id: 'skill-12',
        name: 'Docker',
        category: 'DevOps',
        proficiencyLevel: 'Beginner',
        proficiencyPercentage: 30,
        yearsOfExperience: '1+ Years',
        description: 'Containerization of microservices for consistent development across teams.',
        iconKey: 'docker'
    },
    // {
    //     id: 'skill-13',
    //     name: 'AWS / Cloud',
    //     category: 'DevOps',
    //     proficiencyLevel: 'Advanced',
    //     proficiencyPercentage: 85,
    //     yearsOfExperience: '4+ Years',
    //     description: 'Deploying and managing serverless functions, S3, and EC2 instances.',
    //     iconKey: 'aws'
    // },
    {
        id: 'skill-14',
        name: 'CI/CD Pipelines',
        category: 'DevOps',
        proficiencyLevel: 'Intermediate',
        proficiencyPercentage: 60,
        yearsOfExperience: '2+ Years',
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
    // {
    //     id: 'tool-5',
    //     name: 'Docker',
    //     description: 'Containerization and orchestration',
    //     iconKey: 'docker'
    // },
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
        url: 'mailto:contact@krishnadevashish.com',
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
    email: 'contact@krishnadevashish.com',
    phone: '+917978423156',
    whatsapp: '+917978423156',
    location: 'Bengaluru, Karnataka, India'
};

