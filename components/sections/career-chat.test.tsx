import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { askAboutCareer } from "@/app/actions/career-chat";
import { sendQuickMessage } from "@/app/actions/send-email";
import { getCareerAnswers } from "@/lib/career-answers";
import { CareerChat } from "./career-chat";

jest.mock("@/app/actions/career-chat", () => ({ askAboutCareer: jest.fn() }));
jest.mock("@/app/actions/send-email", () => ({ sendQuickMessage: jest.fn() }));

const answers = getCareerAnswers();
const ask = jest.mocked(askAboutCareer);

beforeEach(() => ask.mockReset());

test("suggests only technical topics and keeps employers out of built-in answers", () => {
  expect(answers.map(({ id }) => id)).toEqual([
    "nextjs",
    "architecture",
    "monorepos",
    "performance",
    "design-systems",
  ]);
  expect(JSON.stringify(answers)).not.toMatch(
    /Nucleo|Brillio|EnterpriseBot|Airtory/i,
  );
});

async function openChat() {
  const user = userEvent.setup();
  render(<CareerChat answers={answers} />);
  expect(screen.queryByLabelText("Your question")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Ask about my work" }));
  const input = await screen.findByLabelText("Your question");
  expect(
    screen.getByRole("dialog", { name: "Ask about my work" }),
  ).toBeVisible();
  return { user, input, submit: screen.getByRole("button", { name: "Ask" }) };
}

test("loads on demand and answers suggested and exact questions without a server call", async () => {
  const { user, input, submit } = await openChat();
  await user.click(screen.getByRole("button", { name: answers[0].question }));
  expect(screen.getByRole("status")).toHaveTextContent("Next.js");
  await user.type(input, answers[2].question);
  await user.click(submit);
  expect(screen.getByRole("status")).toHaveTextContent("Turborepo");
  expect(within(screen.getByRole("status")).getByRole("link")).toHaveAttribute(
    "href",
    "/#skills",
  );
  expect(ask).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "Close chat" }));
  expect(screen.queryByLabelText("Your question")).not.toBeInTheDocument();
});

test("closes on Escape and returns focus to the floating launcher", async () => {
  const { user, input } = await openChat();
  await user.click(input);
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Ask about my work" }),
  ).toHaveFocus();
});

test("sends a message from the chat without asking Groq", async () => {
  const { user, input, submit } = await openChat();
  jest.mocked(sendQuickMessage).mockResolvedValue({ success: true });
  expect(
    screen.queryByRole("textbox", { name: "Message for Krishna" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Send a message" }),
  ).not.toBeInTheDocument();
  await user.type(input, "Can I send you a message?");
  await user.click(submit);
  expect(
    screen.getByText("Write your message below to send it to Krishna."),
  ).toBeVisible();
  expect(sendQuickMessage).not.toHaveBeenCalled();
  await user.type(
    screen.getByRole("textbox", { name: "Message for Krishna" }),
    "I have a project to discuss.",
  );
  await user.click(
    screen.getByRole("button", { name: "Send message to Krishna" }),
  );
  expect(await screen.findByText("Message sent.")).toBeVisible();
  expect(sendQuickMessage).toHaveBeenCalledWith(
    "I have a project to discuss.",
    "chat",
  );
  expect(ask).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: answers[0].question }));
  expect(
    screen.queryByRole("textbox", { name: "Message for Krishna" }),
  ).not.toBeInTheDocument();
});

test("shows messaging for a direct request and keeps technical email questions in chat", async () => {
  const { user, input, submit } = await openChat();
  ask.mockResolvedValue(answers[0]);
  await user.type(input, "send a message");
  await user.click(submit);
  expect(
    screen.getByRole("textbox", { name: "Message for Krishna" }),
  ).toBeVisible();
  expect(ask).not.toHaveBeenCalled();
  await user.type(input, "How do you send an email in Next.js?");
  await user.click(submit);
  expect(await screen.findByText(answers[0].text)).toBeVisible();
  expect(ask).toHaveBeenCalledWith("How do you send an email in Next.js?");
  expect(
    screen.queryByRole("textbox", { name: "Message for Krishna" }),
  ).not.toBeInTheDocument();
});

test("ignores empty and duplicate submissions while a model reply is pending", async () => {
  const { user, input, submit } = await openChat();
  const form = submit.closest("form")!;
  fireEvent.submit(form);
  expect(ask).not.toHaveBeenCalled();
  let resolve!: (answer: (typeof answers)[number]) => void;
  ask.mockReturnValue(
    new Promise((done) => {
      resolve = done;
    }),
  );
  await user.type(input, "How do you build Next.js apps?");
  await user.click(submit);
  expect(screen.getByRole("status")).toHaveTextContent("Finding an answer");
  await user.type(input, "A second question");
  fireEvent.submit(form);
  expect(ask).toHaveBeenCalledTimes(1);
  await act(async () => resolve(answers[0]));
  expect(screen.getByRole("status")).toHaveTextContent("Next.js");
});

test.each([false, true])(
  "falls back to projects when the request is unavailable (rejected=%s)",
  async (rejected) => {
    const { user, input, submit } = await openChat();
    if (rejected) ask.mockRejectedValue(new Error("Offline"));
    else ask.mockResolvedValue(null);
    await user.type(input, "Does this cover my question?");
    await user.click(submit);
    expect(
      await screen.findByRole("link", { name: "Explore projects" }),
    ).toHaveAttribute("href", "/#projects");
  },
);
