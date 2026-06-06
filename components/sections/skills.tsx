"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { skillsData, favoriteTools } from "@/lib/constants";
import { getSkillIcon, getToolIcon } from "@/lib/icon-mapping";

type TabCategory = "All" | "Frontend" | "Backend" | "Tools" | "DevOps";

const tabs: { id: TabCategory; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Frontend", label: "Frontend" },
  { id: "Backend", label: "Backend" },
  { id: "Tools", label: "Tools" },
  { id: "DevOps", label: "DevOps" },
];

const getProficiencyColor = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-green-50 text-green-800 border-green-700/30 dark:bg-green-950 dark:text-green-200 dark:border-green-400/40";
    case "Advanced":
      return "bg-primary/10 text-primary border-primary/20";
    case "Intermediate":
      return "bg-blue-50 text-blue-800 border-blue-700/30 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-400/40";
    default:
      return "bg-accent text-foreground border-border";
  }
};

export function Skills() {
  const [activeTab, setActiveTab] = useState<TabCategory>("Frontend");

  const filteredSkills =
    activeTab === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeTab);

  return (
    <section
      id="skills"
      className="flex items-center bg-accent/30 py-12 sm:py-14 lg:min-h-screen lg:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 text-center sm:mb-10 lg:mb-12">
            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
              Expertise
            </p>
            <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-4xl">
              Technical <span className="text-primary">Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit honed over 8+ years of frontend
              development, focusing on performance and scalability.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10 lg:mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all sm:px-6 sm:py-2.5 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mb-16 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {filteredSkills.map((skill) => {
              const IconComponent = getSkillIcon(skill.iconKey);
              return (
                <div
                  key={skill.id}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
                >
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-md border ${getProficiencyColor(
                        skill.proficiencyLevel,
                      )}`}
                    >
                      {skill.proficiencyLevel}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {skill.description}
                  </p>

                  {/* Experience & Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{skill.yearsOfExperience} Experience</span>
                      </div>
                      <span className="font-medium text-primary">
                        {skill.proficiencyPercentage}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div
                      className="h-1.5 bg-accent rounded-full overflow-hidden"
                      role="progressbar"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={skill.proficiencyPercentage}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiencyPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Favorite Tools & Workflow Section */}
          <div className="mt-10 lg:mt-16">
            <div className="mb-6 text-center sm:mb-8">
              <h3 className="mb-2 text-xl font-bold sm:text-2xl">
                Tools & <span className="text-primary">Workflow</span>
                {/* Favorite Tools & <span className="text-primary">Workflow</span> */}
              </h3>
              <p className="text-muted-foreground">
                Essential tools and technologies that power my development
                workflow
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
              {favoriteTools.map((tool) => {
                const IconComponent = getToolIcon(tool.iconKey);
                return (
                  <div
                    key={tool.id}
                    className="group rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
                  >
                    <div className="inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-3">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
