import { existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const MAX_PROJECT_IMAGE_BYTES = 250 * 1024;
const projectsPath = path.join(process.cwd(), "data", "projects.json");
const publicPath = path.join(process.cwd(), "public");

const projects = JSON.parse(await readFile(projectsPath, "utf8"));
const failures = [];

if (!Array.isArray(projects)) {
  failures.push("data/projects.json must contain an array.");
}

for (const project of Array.isArray(projects) ? projects : []) {
  if (!project || typeof project !== "object") {
    failures.push("Each project must be an object.");
    continue;
  }

  if (!Array.isArray(project.images) || project.images.length === 0) {
    failures.push(`${project.title ?? project.id} must include images.`);
    continue;
  }

  for (const image of project.images) {
    if (typeof image !== "string" || !image.startsWith("/")) {
      failures.push(`${project.title} has an invalid image path: ${image}`);
      continue;
    }

    const imagePath = path.join(publicPath, image);

    if (!existsSync(imagePath)) {
      failures.push(`${project.title} is missing image: ${image}`);
      continue;
    }

    const size = statSync(imagePath).size;

    if (size > MAX_PROJECT_IMAGE_BYTES) {
      failures.push(
        `${project.title} image is too large (${Math.round(
          size / 1024,
        )}KB): ${image}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated project assets for ${projects.length} projects.`);
