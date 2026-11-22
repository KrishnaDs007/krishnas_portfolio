import { experiences } from "./constants";

export function getCareerAnswers() {
  const brillio = experiences.find(({ id }) => id === "exp-4")!;
  const nucleo = experiences.find(({ id }) => id === "exp-3")!;
  const enterprisebot = experiences.find(({ id }) => id === "exp-1")!;
  return [
    {
      id: "current",
      question: "What are you working on now?",
      text: `My official title at ${brillio.company} is ${brillio.title}. I ${brillio.description.charAt(0).toLowerCase()}${brillio.description.slice(1)}`,
      href: "/resume#experience-heading",
      label: "View current experience",
    },
    {
      id: "nucleo",
      question: "What did you build at Nucleo?",
      text: nucleo.description,
      href: "/resume#experience-heading",
      label: "View résumé",
    },
    {
      id: "architecture",
      question: "Where can I see your architecture work?",
      text: enterprisebot.description,
      href: "/#projects",
      label: "View architecture work",
    },
    {
      id: "resume",
      question: "Where can I find your résumé?",
      text: "My online résumé covers my current role, experience, skills, and education.",
      href: "/resume",
      label: "View résumé",
    },
    {
      id: "contact",
      question: "How can I contact you?",
      text: "Use the contact form to discuss a project or role.",
      href: "/#contact",
      label: "Contact me",
    },
  ];
}

export type CareerAnswer = ReturnType<typeof getCareerAnswers>[number];
export const MAX_CAREER_QUESTION_LENGTH = 300;
