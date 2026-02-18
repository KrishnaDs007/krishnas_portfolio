"use client";

import Link from "next/link";
import { Moon, Sun, Code2 } from "lucide-react";
import { useTheme } from "next-themes";
import { NAV_ITEMS } from "@/lib/navigation-config";
import { scrollToSection } from "@/lib/scroll-utils";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import * as LucideIcons from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <Code2 className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline">Krishna's Portfolio</span>
            <span className="sm:hidden">Krishna</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {getIcon(item.icon)}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right side - Theme toggle only */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
