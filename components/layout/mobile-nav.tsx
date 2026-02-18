"use client";

import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/lib/navigation-config";
import { scrollToSection } from "@/lib/scroll-utils";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import * as LucideIcons from "lucide-react";

export function MobileNav() {
  const activeSection = useScrollSpy(NAV_ITEMS.map((item) => item.id));
  const [isVisible, setIsVisible] = useState(true);

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
    scrollToSection(sectionId);
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={(e) => handleNavClick(e, item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors min-w-[60px] ${
              activeSection === item.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
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
