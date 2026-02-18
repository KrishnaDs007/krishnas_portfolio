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
      return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
    case "Advanced":
      return "bg-primary/10 text-primary border-primary/20";
    case "Intermediate":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    default:
      return "bg-accent text-foreground border-border";
  }
};

export function Skills() {
  const [activeTab, setActiveTab] = useState<TabCategory>("All");

  const filteredSkills =
    activeTab === "All"
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeTab);

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center py-20 bg-accent/30"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
              Expertise
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical <span className="text-primary">Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit honed over 8+ years of frontend
              development, focusing on performance and scalability.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filteredSkills.map((skill) => {
              const IconComponent = getSkillIcon(skill.iconKey);
              return (
                <div
                  key={skill.id}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
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
                    <div className="h-1.5 bg-accent rounded-full overflow-hidden">
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
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">
                Tools & <span className="text-primary">Workflow</span>
                {/* Favorite Tools & <span className="text-primary">Workflow</span> */}
              </h3>
              <p className="text-muted-foreground">
                Essential tools and technologies that power my development
                workflow
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {favoriteTools.map((tool) => {
                const IconComponent = getToolIcon(tool.iconKey);
                return (
                  <div
                    key={tool.id}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all text-center group"
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
