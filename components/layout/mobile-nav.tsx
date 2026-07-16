"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { Briefcase, FolderGit2, Home, Mail, User } from "lucide-react";
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

export function MobileNav() {
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));
  const [isVisible, setIsVisible] = useState(true);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const updateIndicator = useCallback(() => {
    const navItems = navItemsRef.current;
    const activeItem = itemRefs.current[activeSection];

    if (!navItems || !activeItem) {
      setIndicatorStyle((current) => ({ ...current, opacity: 0 }));
      return;
    }

    const navRect = navItems.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    setIndicatorStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  }, [activeSection]);

  useEffect(() => {
    const navItems = navItemsRef.current;
    if (!navItems) return;

    const scheduleUpdate = () => {
      window.requestAnimationFrame(updateIndicator);
    };
    const frameId = window.requestAnimationFrame(updateIndicator);
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(navItems);

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [updateIndicator]);

  useEffect(() => {
    // Create an Intersection Observer to detect when footer is visible
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Hide mobile nav when footer is intersecting (visible)
          setIsVisible(!entry.isIntersecting);
        });
      },
      {
        // Trigger when footer is at least 10% visible
        threshold: 0.1,
        // Add some margin to trigger slightly before footer is fully visible
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    scrollToSection(sectionId, sectionId !== "contact" ? 65 : -180); // Adjust offset for header height
  };

  const getIcon = (iconName: string) => {
    const Icon = NAV_ICON_MAP[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <nav
      aria-label="Mobile section navigation"
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        ref={navItemsRef}
        className="relative flex items-center justify-around px-2 py-2"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-2 bottom-2 rounded-xl border border-primary/25 bg-primary/15 shadow-lg shadow-primary/10 backdrop-blur-md transition-[left,width,opacity] duration-300 ease-out"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            opacity: indicatorStyle.opacity,
          }}
        />
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            ref={(element) => {
              itemRefs.current[item.id] = element;
            }}
            onClick={(e) => handleNavClick(e, item.id)}
            aria-current={activeSection === item.id ? "page" : undefined}
            className={`relative z-10 flex min-w-[60px] flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              activeSection === item.id
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {getIcon(item.icon)}
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
