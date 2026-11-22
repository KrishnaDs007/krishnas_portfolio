import nextJest from "next/jest.js";

export default nextJest({ dir: "./" })({
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
  collectCoverage: true,
  collectCoverageFrom: [
    "{app,components,hooks,lib}/**/*.{ts,tsx}",
    "!**/*.test.{ts,tsx}",
    "!**/*.d.ts",
  ],
  coverageReporters: ["text-summary", "html", "lcov"],
  coverageThreshold: {
    global: { branches: 98, functions: 98, lines: 100, statements: 100 },
  },
});
