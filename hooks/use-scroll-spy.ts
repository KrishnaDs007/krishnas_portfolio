'use client';

import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[]): string => {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; // Offset for header

            for (const sectionId of sectionIds) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        let frame: number | null = null;
        const scheduleScroll = () => {
            if (frame !== null) return;
            frame = window.requestAnimationFrame(() => {
                frame = null;
                handleScroll();
            });
        };
        window.addEventListener('scroll', scheduleScroll, { passive: true });
        handleScroll(); // Call once on mount

        return () => {
            window.removeEventListener('scroll', scheduleScroll);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, [sectionIds]);

    return activeSection;
};
