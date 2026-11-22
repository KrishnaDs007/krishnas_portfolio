"use client";

import { lazy, Suspense, useState } from "react";
import type { CareerAnswer } from "@/lib/career-answers";

const CareerChatPanel = lazy(() => import("./career-chat-panel"));

export function CareerChat({ answers }: { answers: CareerAnswer[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3 text-left">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="career-chat"
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-accent"
      >
        {open ? "Close chat" : "Ask about my work"}
      </button>
      <div id="career-chat" hidden={!open}>
        {open && (
          <Suspense fallback={<p role="status">Loading chat…</p>}>
            <CareerChatPanel answers={answers} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
