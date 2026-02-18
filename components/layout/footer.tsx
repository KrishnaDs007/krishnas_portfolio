"use client";

import Link from "next/link";
import { Code2, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { socialLinks } from "@/lib/constants";

const navigationLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <Link href="#home" className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary rounded-lg">
                  <Code2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Krishna's Portfolio</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Building pixel-perfect, engaging, and accessible digital
                experiences.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase text-foreground mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase text-foreground mb-4">
                Connect
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon =
                    socialIcons[social.platform as keyof typeof socialIcons];
                  if (!Icon) return null;

                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-accent hover:bg-primary hover:text-primary-foreground rounded-lg transition-all"
                      aria-label={social.platform}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              © {currentYear} Krishna Devashish. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
