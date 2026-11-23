export function getCareerAnswers() {
  return [
    {
      id: "nextjs",
      question: "How do you use Next.js?",
      text: "I use the App Router to render static content on the server and add Client Components where users need interactivity. In this portfolio, Server Actions handle form submissions and keep provider credentials on the server.",
      href: "/#projects",
      label: "Explore Next.js projects",
    },
    {
      id: "architecture",
      question: "How do you design micro frontends?",
      text: "I start by defining module boundaries around product responsibilities. Shared UI components and clear contracts help modules stay consistent while allowing teams to work independently.",
      href: "/#projects",
      label: "View architecture work",
    },
    {
      id: "monorepos",
      question: "How do you structure a Turborepo monorepo?",
      text: "I separate deployable apps from shared packages and give each package a clear role. I use Turborepo to coordinate common tasks such as building, linting, and type checking across the workspace.",
      href: "/#skills",
      label: "View technical skills",
    },
    {
      id: "performance",
      question: "How do you improve web performance?",
      text: "I use Lighthouse to diagnose issues and Speed Insights to track how real visitors experience the site. I prioritize reducing work during initial load, sizing images for their layout, and keeping animations off the layout path where possible.",
      href: "/#skills",
      label: "View technical skills",
    },
    {
      id: "design-systems",
      question: "How do you build a design system?",
      text: "I start with shared tokens for color, spacing, and typography. Then I build reusable React components with accessible defaults and document their use so teams can apply them consistently.",
      href: "/#projects",
      label: "Explore UI projects",
    },
  ];
}

export type CareerAnswer = ReturnType<typeof getCareerAnswers>[number];
export const MAX_CAREER_QUESTION_LENGTH = 300;
