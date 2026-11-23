import { PortfolioNavigation } from "@/components/layout/portfolio-navigation";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { CareerChat } from "@/components/sections/career-chat";
import { getCareerAnswers } from "@/lib/career-answers";
import { getProjectCards, getProjectCategories } from "@/lib/projects-utils";

export default function Home() {
  return (
    <PortfolioNavigation>
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects
          projects={getProjectCards()}
          categories={getProjectCategories()}
        />
        <Contact />
      </main>
      <Footer />
      <CareerChat answers={getCareerAnswers()} />
    </PortfolioNavigation>
  );
}
