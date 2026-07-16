"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Code2,
  FolderGit2,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import type { ComponentType } from "react";
import { useTheme } from "next-themes";
import { NAV_ITEMS } from "@/lib/navigation-config";
import { scrollToSection } from "@/lib/scroll-utils";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const NAV_ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Mail,
};

export function Header() {
  const { theme, setTheme } = useTheme();
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    const activeItem = itemRefs.current[activeSection];

    if (!nav || !activeItem) {
      setIndicatorStyle((current) => ({ ...current, opacity: 0 }));
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    setIndicatorStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  }, [activeSection]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const scheduleUpdate = () => {
      window.requestAnimationFrame(updateIndicator);
    };
    const frameId = window.requestAnimationFrame(updateIndicator);
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(nav);

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [updateIndicator]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    scrollToSection(sectionId, sectionId !== "contact" ? 65 : -180);
  };

  const getIcon = (iconName: string) => {
    const Icon = NAV_ICON_MAP[iconName];
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
            <span className="hidden lg:inline">Krishna&apos;s Portfolio</span>
            <span className="lg:hidden">Krishna</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav
            ref={navRef}
            className="relative hidden items-center gap-1 rounded-xl border border-border/30 bg-background/35 p-1 backdrop-blur-md md:flex"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1 bottom-1 rounded-lg border border-primary/30 bg-primary/20 shadow-lg shadow-primary/15 backdrop-blur-md transition-[left,width,opacity] duration-300 ease-out"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                ref={(element) => {
                  itemRefs.current[item.id] = element;
                }}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={activeSection === item.id ? "page" : undefined}
                className={`relative z-10 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
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
