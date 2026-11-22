import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendEmail } from "@/app/actions/send-email";
import { Contact } from "./contact";

jest.mock("@/app/actions/send-email", () => ({ sendEmail: jest.fn() }));

const send = jest.mocked(sendEmail);

beforeEach(() => send.mockReset());
afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

async function fillForm(user: ReturnType<typeof userEvent.setup>, message: string) {
  await user.type(screen.getByLabelText("Your Name"), "Test Visitor");
  await user.type(screen.getByLabelText("Email Address"), "visitor@example.com");
  await user.type(screen.getByLabelText("Message", { exact: true }), message);
}

test("rejects a short message and allows the error to be cleared", async () => {
  const user = userEvent.setup();
  render(<Contact />);
  await fillForm(user, "short");
  await user.click(screen.getByRole("button", { name: "Send Message" }));
  expect(screen.getByRole("alert")).toHaveTextContent(/at least 10/);
  expect(send).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "Clear error message" }));
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.getByLabelText("Message", { exact: true })).toHaveValue("short");
});

test("shows and clears a server error while preserving the draft", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  send.mockResolvedValue({ success: false, error: "Too many messages." });
  render(<Contact />);
  const message = "I have a project to discuss.";
  await fillForm(user, message);
  await user.click(screen.getByRole("button", { name: "Send Message" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Too many messages.");
  act(() => jest.advanceTimersByTime(5000));
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.getByLabelText("Message", { exact: true })).toHaveValue(message);
});

test("sends a custom subject and resets the form on success", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  send.mockResolvedValue({ success: true });
  render(<Contact />);
  await fillForm(user, "I have a project to discuss.");
  await user.selectOptions(screen.getByLabelText("Subject", { exact: true }), "Other");
  await user.type(screen.getByLabelText("Please specify your subject"), "Design systems");
  await user.click(screen.getByRole("button", { name: "Send Message" }));
  expect(send).toHaveBeenCalledWith(expect.objectContaining({ subject: "Design systems" }));
  expect(await screen.findByRole("status")).toHaveTextContent(/sent successfully/i);
  expect(screen.getByLabelText("Message", { exact: true })).toHaveValue("");
  act(() => jest.advanceTimersByTime(5000));
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});

test("guards against duplicate submissions and reports a rejected request", async () => {
  const user = userEvent.setup();
  let reject!: (error: Error) => void;
  send.mockReturnValue(new Promise((_, fail) => { reject = fail; }));
  render(<Contact />);
  await fillForm(user, "I have a project to discuss.");
  await user.click(screen.getByRole("button", { name: "Send Message" }));
  const pending = screen.getByRole("button", { name: "Sending..." });
  fireEvent.submit(pending.closest("form")!);
  expect(send).toHaveBeenCalledTimes(1);
  await act(async () => reject(new Error("offline")));
  expect(await screen.findByRole("alert")).toHaveTextContent(/check your connection/i);
});

test("opens WhatsApp and handles quick contact actions", async () => {
  const user = userEvent.setup();
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  jest.spyOn(console, "error").mockImplementation(() => {});
  render(<Contact />);
  await user.click(screen.getByRole("button", { name: "Contact me on WhatsApp" }));
  expect(open).toHaveBeenCalledWith(expect.stringMatching(/^https:\/\/wa\.me\//), "_blank");
  await user.click(screen.getByRole("button", { name: "Call me" }));
  const quick = screen.getByRole("textbox", { name: "Quick project message" });
  const sendQuick = screen.getByRole("button", { name: "Send quick message by email" });
  await user.type(quick, "  ");
  await user.click(sendQuick);
  expect(quick).toHaveValue("  ");
  await user.type(quick, "Project idea");
  await user.click(sendQuick);
  expect(quick).toHaveValue("");
});
