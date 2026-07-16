import Link from "next/link";
import { ArrowLeft, FileText, FolderGit2, Home, Mail } from "lucide-react";

const helpfulLinks = [
  {
    href: "/",
    label: "Home",
    description: "Return to the main portfolio page.",
    icon: Home,
  },
  {
    href: "/#projects",
    label: "Projects",
    description: "Explore featured work and case studies.",
    icon: FolderGit2,
  },
  {
    href: "/#contact",
    label: "Contact",
    description: "Send a message or connect directly.",
    icon: Mail,
  },
  {
    href: "/assets/KRISHNA-DEVASHISH.pdf",
    label: "Resume",
    description: "Download Krishna's latest resume.",
    icon: FileText,
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col justify-center">
        <Link
          href="/"
          className="mb-10 inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404 - Page not found
        </p>
        <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          This page is not part of the portfolio.
        </h1>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          The link may be old, moved, or mistyped. These quick links should get
          you back to the most useful parts of the site.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {helpfulLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:bg-accent/40"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mb-1 font-semibold text-foreground">
                  {item.label}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
