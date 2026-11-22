import { getProjectCards, getProjects } from "./projects-utils";
import projects from "@/data/projects.json";

test("builds a card for each case study using only its first image", () => {
  const projects = getProjects();
  const cards = getProjectCards();
  expect(cards).toHaveLength(projects.length);

  for (const project of projects) {
    const card = cards.find(({ id }) => id === project.id);
    expect(card).toMatchObject({ title: project.title, image: project.images[0] });
    expect(card).not.toHaveProperty("fullDescription");
    expect(card).not.toHaveProperty("images");
  }
});

const project = projects[0];

test.each([
  ["technologies", [1]], ["features", null], ["decisions", "decision"],
  ["architectureFlow", false], ["impact", {}], ["images", []], ["images", [1]],
  ["videoUrl", 2], ["liveUrl", "not a URL"], ["githubUrl", "ftp://example.com"],
  ["githubUrl", "https://user@example.com"], ["githubUrl", "https://:pass@example.com"],
  ["featured", "yes"], ["title", "  "], ["title", null], ["id", "Invalid_ID"],
])("rejects invalid project field %s (%j)", (field, value) => {
  expect(() => loadProjects([{ ...project, [field]: value }])).toThrow();
});

test("rejects malformed records and duplicate project IDs", () => {
  expect(() => loadProjects(null)).toThrow(/must be an array/);
  for (const invalid of [null, [], 42]) {
    expect(() => loadProjects([invalid])).toThrow(/must be an object/);
  }
  expect(() => loadProjects([project, project])).toThrow(/duplicate ID/);
});

test("accepts an HTTP URL and null optional URLs", () => {
  expect(loadProjects([{ ...project, videoUrl: "http://example.com", liveUrl: null, githubUrl: null }]))
    .toHaveLength(1);
});

function loadProjects(data: unknown) {
  let result: unknown;
  try {
    jest.isolateModules(() => {
      jest.doMock("@/data/projects.json", () => data);
      result = jest.requireActual<typeof import("./projects-utils")>("./projects-utils").getProjects();
    });
  } finally {
    jest.dontMock("@/data/projects.json");
  }
  return result;
}
