"use client";

import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";
import { experiences, education, stats } from "@/lib/constants";

export function Experience() {
  return (
    <section id="experience" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
              My Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience & <span className="text-primary">Education</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A timeline of my professional career and academic background as a
              Senior Frontend Developer.
            </p>
          </div>

          {/* Stats Cards - Desktop Only */}
          <div className="hidden lg:flex justify-end gap-4 mb-8">
            {
              stats.map((stat, index) => (
                <div key={index} className="px-6 py-4 rounded-xl bg-card border border-border">
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))
            }
            {/* <div className="px-6 py-4 rounded-xl bg-card border border-border">
              <div className="text-2xl font-bold text-primary">
                {stats[1].value}
                {stats[1].suffix}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                Projects
              </div>
            </div> */}
          </div>

          {/* Two Column Layout - Desktop */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Work Experience Column */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Work Experience</h3>
              </div>

              <div className="space-y-8 relative">
                {/* Timeline Line */}
                <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-border hidden sm:block" />

                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative pl-0 sm:pl-12">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-0 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-primary">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>

                    {/* Content Card */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-1">
                            {exp.title}
                          </h4>
                          <p className="text-primary font-medium">
                            {exp.company}
                          </p>
                        </div>
                        {exp.isCurrent && (
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                            CURRENT
                          </span>
                        )}
                      </div>

                      {/* Date & Location */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Skills Tags */}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs rounded-md bg-accent text-foreground border border-border"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Education</h3>
              </div>

              <div className="space-y-8 relative">
                {/* Timeline Line */}
                <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-border hidden sm:block" />

                {education.map((edu, index) => (
                  <div key={edu.id} className="relative pl-0 sm:pl-12">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-0 hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-primary">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>

                    {/* Content Card */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground mb-1">
                            {edu.degree} {edu.field}
                          </h4>
                          <p className="text-primary font-medium">
                            {edu.institution}
                          </p>
                        </div>
                        {edu.isCurrent && (
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                            CURRENT
                          </span>
                        )}
                      </div>

                      {/* Date & Location */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        {edu.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{edu.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {edu.description}
                      </p>

                      {/* Courses/Skills Tags */}
                      {edu.courses && edu.courses.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course) => (
                            <span
                              key={course}
                              className="px-2 py-1 text-xs rounded-md bg-accent text-foreground border border-border"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
