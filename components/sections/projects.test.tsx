import { screen } from "@testing-library/react";
import { renderWithNext } from "@/test/render-with-next";
import userEvent from "@testing-library/user-event";
import { Projects } from "./projects";
import type { ProjectCard } from "@/lib/projects-utils";

test("expands the results and resets pagination when categories change", async () => {
  const projects: ProjectCard[] = Array.from({ length: 8 }, (_, index) => ({
    id: `project-${index}`,
    title: `Project ${index}`,
    category: index === 7 ? "Other" : "Web",
    shortDescription: "A project for testing pagination.",
    year: "2026",
    featured: false,
    technologies: [],
    liveUrl: null,
    githubUrl: null,
    image: "/images/Krishna.jpeg",
  }));
  const user = userEvent.setup();
  renderWithNext(<Projects projects={projects} categories={["All Projects", "Web", "Other"]} />);
  const cards = () => screen.getAllByRole("link", { name: /view details for/i });
  expect(cards()).toHaveLength(6);
  await user.click(screen.getByRole("button", { name: "Load More Projects" }));
  expect(cards()).toHaveLength(8);
  await user.click(screen.getByRole("button", { name: "Show Less" }));
  expect(cards()).toHaveLength(6);
  await user.click(screen.getByRole("button", { name: "Load More Projects" }));
  await user.click(screen.getByRole("button", { name: "Other" }));
  expect(cards()).toHaveLength(1);
  await user.click(screen.getByRole("button", { name: "All Projects" }));
  expect(cards()).toHaveLength(6);
});
