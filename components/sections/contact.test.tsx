import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendEmail, sendQuickMessage } from "@/app/actions/send-email";
import { Contact } from "./contact";

jest.mock("@/app/actions/send-email", () => ({
  sendEmail: jest.fn(),
  sendQuickMessage: jest.fn(),
}));

const send = jest.mocked(sendEmail);
const sendQuickMessageMock = jest.mocked(sendQuickMessage);

beforeEach(() => {
  send.mockReset();
  sendQuickMessageMock.mockReset();
});
afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  message: string,
) {
  await user.type(screen.getByLabelText("Your Name"), "Test Visitor");
  await user.type(
    screen.getByLabelText("Email Address"),
    "visitor@example.com",
  );
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
  expect(screen.getByLabelText("Message", { exact: true })).toHaveValue(
    "short",
  );
});

test("shows and clears a server error while preserving the draft", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  send.mockResolvedValue({ success: false, error: "Too many messages." });
  render(<Contact />);
  const message = "I have a project to discuss.";
  await fillForm(user, message);
  await user.click(screen.getByRole("button", { name: "Send Message" }));
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Too many messages.",
  );
  act(() => jest.advanceTimersByTime(5000));
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.getByLabelText("Message", { exact: true })).toHaveValue(
    message,
  );
});

test("sends a custom subject and resets the form on success", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  send.mockResolvedValue({ success: true });
  render(<Contact />);
  await fillForm(user, "I have a project to discuss.");
  await user.selectOptions(
    screen.getByLabelText("Subject", { exact: true }),
    "Other",
  );
  await user.type(
    screen.getByLabelText("Please specify your subject"),
    "Design systems",
  );
  await user.click(screen.getByRole("button", { name: "Send Message" }));
  expect(send).toHaveBeenCalledWith(
    expect.objectContaining({ subject: "Design systems" }),
  );
  expect(await screen.findByRole("status")).toHaveTextContent(
    /sent successfully/i,
  );
  expect(screen.getByLabelText("Message", { exact: true })).toHaveValue("");
  act(() => jest.advanceTimersByTime(5000));
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});

test("guards against duplicate submissions and reports a rejected request", async () => {
  const user = userEvent.setup();
  let reject!: (error: Error) => void;
  send.mockReturnValue(
    new Promise((_, fail) => {
      reject = fail;
    }),
  );
  render(<Contact />);
  await fillForm(user, "I have a project to discuss.");
  await user.click(screen.getByRole("button", { name: "Send Message" }));
  const pending = screen.getByRole("button", { name: "Sending..." });
  fireEvent.submit(pending.closest("form")!);
  expect(send).toHaveBeenCalledTimes(1);
  await act(async () => reject(new Error("offline")));
  expect(await screen.findByRole("alert")).toHaveTextContent(
    /check your connection/i,
  );
});

test("opens WhatsApp and handles the call shortcut", async () => {
  const user = userEvent.setup();
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  jest.spyOn(console, "error").mockImplementation(() => {});
  render(<Contact />);
  await user.click(
    screen.getByRole("button", { name: "Contact me on WhatsApp" }),
  );
  expect(open).toHaveBeenCalledWith(
    expect.stringMatching(/^https:\/\/wa\.me\//),
    "_blank",
  );
  await user.click(screen.getByRole("button", { name: "Call me" }));
});

test("validates and sends a quick message without opening a mail app", async () => {
  const user = userEvent.setup();
  let resolve!: (value: { success: true }) => void;
  sendQuickMessageMock.mockImplementation(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
  );
  render(<Contact />);
  const quick = screen.getByRole("textbox", { name: "Quick project message" });
  const sendQuick = screen.getByRole("button", {
    name: "Send message to Krishna",
  });
  await user.type(quick, "short");
  await user.click(sendQuick);
  expect(screen.getByRole("alert")).toHaveTextContent(/at least 10/);
  expect(sendQuickMessageMock).not.toHaveBeenCalled();
  await user.click(
    screen.getByRole("button", { name: "Dismiss message alert" }),
  );
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(quick).toHaveValue("short");
  await user.clear(quick);
  await user.type(quick, "A project idea to discuss.");
  await user.click(sendQuick);
  expect(sendQuickMessageMock).toHaveBeenCalledWith(
    "A project idea to discuss.",
    "quick-form",
  );
  expect(quick).toBeDisabled();
  fireEvent.submit(sendQuick.closest("form")!);
  expect(sendQuickMessageMock).toHaveBeenCalledTimes(1);
  await act(async () => resolve({ success: true }));
  expect(await screen.findByRole("status")).toHaveTextContent("Message sent.");
  expect(quick).toHaveValue("");
});

test("automatically hides the quick-message length warning and keeps the draft", () => {
  jest.useFakeTimers();
  render(<Contact />);
  const quick = screen.getByRole("textbox", { name: "Quick project message" });
  const message = "a".repeat(501);
  fireEvent.change(quick, { target: { value: message } });
  fireEvent.click(
    screen.getByRole("button", { name: "Send message to Krishna" }),
  );
  expect(screen.getByRole("alert")).toHaveTextContent(
    /500 characters or fewer/,
  );
  expect(sendQuickMessageMock).not.toHaveBeenCalled();
  act(() => jest.advanceTimersByTime(5000));
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(quick).toHaveValue(message);
});

test.each([false, true])(
  "preserves a quick-message draft after failure (rejected=%s)",
  async (rejected) => {
    const user = userEvent.setup();
    if (rejected) sendQuickMessageMock.mockRejectedValue(new Error("Offline"));
    else
      sendQuickMessageMock.mockResolvedValue({
        success: false,
        error: "Provider configuration error.",
      });
    render(<Contact />);
    const quick = screen.getByRole("textbox", {
      name: "Quick project message",
    });
    await user.type(quick, "A project idea to discuss.");
    await user.click(
      screen.getByRole("button", { name: "Send message to Krishna" }),
    );
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Could not send your message. Please try again.",
    );
    expect(quick).toHaveValue("A project idea to discuss.");
  },
);
