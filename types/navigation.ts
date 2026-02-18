export interface NavItem {
    id: string;
    label: string;
    href: string;
    icon: string; // Lucide icon name
}

export type SectionId = 'home' | 'about' | 'experience' | 'projects' | 'contact';
