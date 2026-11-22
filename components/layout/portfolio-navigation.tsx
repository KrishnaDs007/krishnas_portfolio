"use client";

import type { ReactNode } from "react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NAV_SECTION_IDS } from "@/lib/navigation-config";
import { Header } from "./header";
import { MobileNav } from "./mobile-nav";

export function PortfolioNavigation({ children }: { children: ReactNode }) {
  const activeSection = useScrollSpy(NAV_SECTION_IDS);

  return (
    <>
      <Header activeSection={activeSection} />
      {children}
      <MobileNav activeSection={activeSection} />
    </>
  );
}
