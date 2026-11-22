/** @jest-environment node */

import { Resend } from "resend";
import { sendEmail } from "./send-email";
import { allowContactSubmission } from "@/lib/contact-rate-limit";

jest.mock("resend");
jest.mock("@/lib/contact-rate-limit");

const send = jest.fn();
const limit = jest.mocked(allowContactSubmission);
const submission = {
  name: "Test Visitor",
  email: "visitor@example.com",
  subject: "Project Discussion",
  message: "I have a project to discuss.",
};

beforeEach(() => {
  jest.replaceProperty(process, "env", {
    ...process.env,
    RESEND_API_KEY: "re_test",
    RESEND_FROM_EMAIL: "contact@example.com",
    CONTACT_TO_EMAIL: "inbox@example.com",
  });
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.mocked(Resend).mockImplementation(() => ({ emails: { send } }) as unknown as Resend);
  limit.mockReset().mockResolvedValue(true);
  send.mockReset().mockResolvedValue({ error: null });
});

afterEach(() => jest.restoreAllMocks());

test("rejects short and malformed submissions before sending", async () => {
  await expect(sendEmail({ ...submission, message: "short" })).resolves.toMatchObject({ success: false });
  await expect(sendEmail(null!)).resolves.toMatchObject({ success: false });
  expect(limit).not.toHaveBeenCalled();
  expect(send).not.toHaveBeenCalled();
});

test("uses the configured sender and recipient and replies to the visitor", async () => {
  await expect(sendEmail(submission)).resolves.toEqual({ success: true });
  expect(send).toHaveBeenCalledWith(expect.objectContaining({
    from: "Portfolio <contact@example.com>",
    to: ["inbox@example.com"],
    replyTo: submission.email,
  }));
});

test("rejects rate-limited submissions without calling Resend", async () => {
  limit.mockResolvedValue(false);
  await expect(sendEmail(submission)).resolves.toMatchObject({
    success: false,
    error: expect.stringMatching(/too many messages/i),
  });
  expect(send).not.toHaveBeenCalled();
});

test("fails safely when the limiter is unavailable", async () => {
  limit.mockRejectedValue(new Error("internal limiter detail"));
  await expect(sendEmail(submission)).resolves.toEqual({
    success: false,
    error: "Something went wrong. Please try again later.",
  });
  expect(send).not.toHaveBeenCalled();
});

test("keeps provider error details out of the action result", async () => {
  send.mockResolvedValue({ error: { name: "validation_error", message: "private provider detail" } });
  await expect(sendEmail(submission)).resolves.toEqual({
    success: false,
    error: "Something went wrong. Please try again later.",
  });
});

test.each([
  ["name", ""], ["email", "bad-email"], ["email", `${"a".repeat(255)}@example.com`],
  ["subject", "x"], ["subject", "x".repeat(121)], ["name", "x".repeat(101)],
])("rejects invalid %s before calling services", async (field, value) => {
  await expect(sendEmail({ ...submission, [field]: value })).resolves.toMatchObject({ success: false });
  expect(limit).not.toHaveBeenCalled();
});

test.each([
  ["RESEND_API_KEY", ""], ["RESEND_API_KEY", "your_resend_api_key_here"],
  ["RESEND_API_KEY", "re_your_api_key_here"],
  ["RESEND_FROM_EMAIL", ""], ["RESEND_FROM_EMAIL", "invalid"],
  ["CONTACT_TO_EMAIL", "invalid"],
])("rejects invalid %s configuration", async (field, value) => {
  process.env[field] = value;
  await expect(sendEmail(submission)).resolves.toMatchObject({ success: false });
  expect(send).not.toHaveBeenCalled();
});

test("uses the default inbox and handles a failed provider request", async () => {
  delete process.env.CONTACT_TO_EMAIL;
  send.mockRejectedValue(new Error("private provider detail"));
  await expect(sendEmail(submission)).resolves.toMatchObject({ success: false });
  expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: ["contact@krishnadevashish.com"] }));
});
