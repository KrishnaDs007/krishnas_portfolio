"use client";

import { lazy, Suspense } from "react";
import { MessageCircle, X } from "lucide-react";
import { Dialog } from "radix-ui";
import type { CareerAnswer } from "@/lib/career-answers";

const CareerChatPanel = lazy(() => import("./career-chat-panel"));

export function CareerChat({ answers }: { answers: CareerAnswer[] }) {
  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger
        aria-label="Ask about my work"
        className="fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[60] grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 md:right-6 md:bottom-6"
      >
        <MessageCircle aria-hidden="true" className="size-6" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed right-4 bottom-[calc(8.75rem+env(safe-area-inset-bottom))] z-[60] flex max-h-[calc(100dvh-10rem-env(safe-area-inset-bottom))] w-[min(25rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200 md:right-6 md:bottom-24 md:max-h-[calc(100dvh-7.5rem)]">
          <header className="flex shrink-0 items-start justify-between gap-3 border-b border-border bg-accent/60 px-4 py-3">
            <div>
              <Dialog.Title className="font-semibold">
                Ask about my work
              </Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground">
                Ask about Next.js, frontend architecture, and other technologies
                I use.
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Close chat"
              className="grid size-10 shrink-0 place-items-center rounded-lg hover:bg-accent"
            >
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </header>
          <div className="min-h-0 overflow-y-auto overscroll-contain p-4">
            <Suspense fallback={<p role="status">Loading chat…</p>}>
              <CareerChatPanel answers={answers} />
            </Suspense>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
