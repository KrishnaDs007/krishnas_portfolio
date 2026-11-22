/** @jest-environment node */

import { askAboutCareer } from "./career-chat";
import { allowContactSubmission } from "@/lib/contact-rate-limit";

jest.mock("@/lib/contact-rate-limit", () => ({ allowContactSubmission: jest.fn() }));

const allow = jest.mocked(allowContactSubmission);

beforeEach(() => {
  jest.replaceProperty(process, "env", { ...process.env, GROQ_API_KEY: "test-key", GROQ_MODEL: "" });
  allow.mockReset().mockResolvedValue(true);
  jest.spyOn(globalThis, "fetch");
});

afterEach(() => jest.restoreAllMocks());

test.each([null, "  ", "x".repeat(301)])("rejects invalid questions", async (question) => {
  await expect(askAboutCareer(question as string)).resolves.toBeNull();
  expect(allow).not.toHaveBeenCalled();
  expect(fetch).not.toHaveBeenCalled();
});

test("keeps model calls disabled without a key", async () => {
  delete process.env.GROQ_API_KEY;
  await expect(askAboutCareer("Tell me about Nucleo")).resolves.toBeNull();
  expect(allow).not.toHaveBeenCalled();
});

test("returns the curated answer for a valid topic", async () => {
  jest.mocked(fetch).mockResolvedValue(Response.json({ choices: [{ message: { content: " nucleo " } }] }));
  await expect(askAboutCareer(" Tell me about Nucleo ")).resolves.toMatchObject({
    id: "nucleo", text: expect.stringContaining("Turborepo"),
  });
  expect(allow).toHaveBeenCalledWith("career-chat");
  const [url, options] = jest.mocked(fetch).mock.calls[0];
  expect(url).toBe("https://api.groq.com/openai/v1/chat/completions");
  expect(JSON.parse(String(options?.body))).toMatchObject({
    model: "openai/gpt-oss-20b", messages: expect.arrayContaining([{ role: "user", content: "Tell me about Nucleo" }]),
  });
});

test.each([
  [{ choices: [{ message: { content: "unsupported private detail" } }] }, 200],
  [{}, 200], [{ choices: [] }, 200], [{ choices: [{}] }, 200],
  [{ choices: [{ message: {} }] }, 200], [{}, 429],
])("keeps unsupported output out of the reply (%j, %s)", async (body, status) => {
  process.env.GROQ_MODEL = "configured-model";
  jest.mocked(fetch).mockResolvedValue(Response.json(body, { status }));
  await expect(askAboutCareer("Tell me a private detail")).resolves.toBeNull();
});

test("skips Groq on rate limit and falls back on provider failure", async () => {
  allow.mockResolvedValueOnce(false);
  await expect(askAboutCareer("Tell me about your work")).resolves.toBeNull();
  expect(fetch).not.toHaveBeenCalled();
  jest.mocked(fetch).mockRejectedValue(new Error("Provider offline"));
  await expect(askAboutCareer("Tell me about your work")).resolves.toBeNull();
});
