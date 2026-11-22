import type { NavItem } from "@/types/navigation";

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "#home",
    icon: "Home",
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    icon: "User",
  },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
    icon: "Briefcase",
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: "FolderGit2",
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: "Mail",
  },
];

export const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.id);
