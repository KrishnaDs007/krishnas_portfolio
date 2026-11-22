import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { askAboutCareer } from "@/app/actions/career-chat";
import { getCareerAnswers } from "@/lib/career-answers";
import { CareerChat } from "./career-chat";

jest.mock("@/app/actions/career-chat", () => ({ askAboutCareer: jest.fn() }));

const answers = getCareerAnswers();
const ask = jest.mocked(askAboutCareer);

beforeEach(() => ask.mockReset());

async function openChat() {
  const user = userEvent.setup();
  render(<CareerChat answers={answers} />);
  expect(screen.queryByLabelText("Your question")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Ask about my work" }));
  const input = await screen.findByLabelText("Your question");
  return { user, input, submit: screen.getByRole("button", { name: "Ask" }) };
}

test("loads on demand and answers suggested and exact questions without a server call", async () => {
  const { user, input, submit } = await openChat();
  await user.click(screen.getByRole("button", { name: answers[0].question }));
  expect(screen.getByRole("status")).toHaveTextContent("Senior Data Scientist");
  await user.type(input, answers[1].question);
  await user.click(submit);
  expect(screen.getByRole("status")).toHaveTextContent("Turborepo");
  expect(within(screen.getByRole("status")).getByRole("link")).toHaveAttribute("href", "/resume#experience-heading");
  expect(ask).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "Close chat" }));
  expect(screen.queryByLabelText("Your question")).not.toBeInTheDocument();
});

test("ignores empty and duplicate submissions while a model reply is pending", async () => {
  const { user, input, submit } = await openChat();
  const form = submit.closest("form")!;
  fireEvent.submit(form);
  expect(ask).not.toHaveBeenCalled();
  let resolve!: (answer: typeof answers[number]) => void;
  ask.mockReturnValue(new Promise((done) => { resolve = done; }));
  await user.type(input, "Tell me about your current role");
  await user.click(submit);
  expect(screen.getByRole("status")).toHaveTextContent("Finding an answer");
  await user.type(input, "A second question");
  fireEvent.submit(form);
  expect(ask).toHaveBeenCalledTimes(1);
  await act(async () => resolve(answers[0]));
  expect(screen.getByRole("status")).toHaveTextContent("Brillio");
});

test.each([false, true])("falls back to contact when the request is unavailable (rejected=%s)", async (rejected) => {
  const { user, input, submit } = await openChat();
  if (rejected) ask.mockRejectedValue(new Error("Offline"));
  else ask.mockResolvedValue(null);
  await user.type(input, "Does this cover my question?");
  await user.click(submit);
  expect(await screen.findByRole("link", { name: "Contact me" })).toHaveAttribute("href", "/#contact");
});
