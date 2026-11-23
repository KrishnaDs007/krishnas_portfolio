"use client";

import { useState, type FormEvent } from "react";
import { Dialog } from "radix-ui";
import { askAboutCareer } from "@/app/actions/career-chat";
import {
  MAX_CAREER_QUESTION_LENGTH,
  type CareerAnswer,
} from "@/lib/career-answers";

const fallback = {
  text: "I can answer questions about the technologies and engineering practices I use. Try a suggested question or explore my projects.",
  href: "/#projects",
  label: "Explore projects",
};

export default function CareerChatPanel({
  answers,
}: {
  answers: CareerAnswer[];
}) {
  const [question, setQuestion] = useState("");
  const [askedQuestion, setAskedQuestion] = useState("");
  const [reply, setReply] = useState<Pick<
    CareerAnswer,
    "text" | "href" | "label"
  > | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = question.trim();
    if (!text || pending) return;

    setQuestion("");
    setAskedQuestion(text);
    const suggested = answers.find(
      (answer) => answer.question.toLowerCase() === text.toLowerCase(),
    );
    if (suggested) {
      setReply(suggested);
      return;
    }

    setPending(true);
    setReply(null);
    try {
      setReply((await askAboutCareer(text)) ?? fallback);
    } catch {
      setReply(fallback);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {answers.map((answer) => (
          <button
            key={answer.id}
            type="button"
            disabled={pending}
            onClick={() => {
              setAskedQuestion(answer.question);
              setReply(answer);
            }}
            className="rounded-full border border-border px-3 py-1.5 text-left text-sm hover:bg-accent"
          >
            {answer.question}
          </button>
        ))}
      </div>
      {askedQuestion && (
        <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm break-words text-primary-foreground">
          {askedQuestion}
        </p>
      )}
      <div role="status" className="text-sm">
        {pending && <p className="text-muted-foreground">Finding an answer…</p>}
        {reply && (
          <div className="max-w-[95%] space-y-2 rounded-2xl rounded-bl-sm bg-accent px-3 py-2">
            <p className="leading-relaxed text-accent-foreground">
              {reply.text}
            </p>
            <Dialog.Close asChild>
              <a
                href={reply.href}
                className="inline-block font-medium text-primary underline underline-offset-4"
              >
                {reply.label}
              </a>
            </Dialog.Close>
          </div>
        )}
      </div>
      <form onSubmit={submit} className="space-y-2">
        <label htmlFor="career-question" className="block text-sm font-medium">
          Your question
        </label>
        <div className="flex gap-2">
          <input
            id="career-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={MAX_CAREER_QUESTION_LENGTH}
            aria-describedby="career-chat-privacy"
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm"
            required
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            Ask
          </button>
        </div>
        <p id="career-chat-privacy" className="text-xs text-muted-foreground">
          Typed questions may be sent to Groq. Please keep personal details out
          of the chat.
        </p>
      </form>
    </div>
  );
}
