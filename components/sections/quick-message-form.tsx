"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { Loader2, Send, X } from "lucide-react";
import { sendQuickMessage } from "@/app/actions/send-email";
import {
  CONTACT_MESSAGE_MAX_LENGTH,
  getContactMessageError,
} from "@/lib/contact-message";

const SEND_ERROR = "Could not send your message. Please try again.";

type QuickMessageFormProps = {
  source: "quick-form" | "chat";
  label: string;
  placeholder: string;
};

export function QuickMessageForm({
  source,
  label,
  placeholder,
}: QuickMessageFormProps) {
  const hintId = useId();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ text: string } | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!error) return;

    const timeout = window.setTimeout(() => setError(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [error]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    setSent(false);
    const validationError = getContactMessageError(message);
    if (validationError) {
      setError({ text: validationError });
      return;
    }

    setError(null);
    setPending(true);
    try {
      const result = await sendQuickMessage(message, source);
      if (result.success) {
        setMessage("");
        setSent(true);
      } else {
        setError({ text: SEND_ERROR });
      }
    } catch {
      setError({ text: SEND_ERROR });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="w-full min-w-0 space-y-2">
      <div className="relative">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-label={label}
          aria-describedby={hintId}
          placeholder={placeholder}
          disabled={pending}
          rows={3}
          className="block min-h-32 w-full resize-y rounded-xl border border-border bg-background/80 px-4 py-3 pb-12 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          disabled={pending}
          className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 disabled:opacity-60"
          aria-label={pending ? "Sending message" : "Send message to Krishna"}
        >
          {pending ? (
            <Loader2
              aria-hidden="true"
              className="size-5 motion-safe:animate-spin"
            />
          ) : (
            <Send aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>
      <p id={hintId} className="text-xs text-muted-foreground">
        Include your email in the message if you’d like a reply.{" "}
        {message.length}/{CONTACT_MESSAGE_MAX_LENGTH} characters.
      </p>
      {error && (
        <div className="flex items-start justify-between gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          <p role="alert">{error.text}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            aria-label="Dismiss message alert"
            className="grid size-6 shrink-0 place-items-center rounded hover:bg-red-500/15"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
      {sent && (
        <p role="status" className="text-sm font-medium">
          Message sent.
        </p>
      )}
    </form>
  );
}
