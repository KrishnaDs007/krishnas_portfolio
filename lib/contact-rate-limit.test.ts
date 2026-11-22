/** @jest-environment node */

import { headers } from "next/headers";
import { allowContactSubmission } from "./contact-rate-limit";

jest.mock("next/headers", () => ({ headers: jest.fn() }));

beforeEach(() => {
  jest.replaceProperty(process, "env", {
    ...process.env,
    NODE_ENV: "production",
    VERCEL: "1",
    VERCEL_ENV: "production",
    UPSTASH_REDIS_REST_URL: "https://redis.example.com",
    UPSTASH_REDIS_REST_TOKEN: "test-token",
  });
  jest.mocked(headers).mockResolvedValue(
    new Headers({
      "x-vercel-forwarded-for": "203.0.113.4",
    }),
  );
});

afterEach(() => jest.restoreAllMocks());

test.each([
  [5, true],
  [6, false],
])("allows or rejects attempt %i", async (result, allowed) => {
  const fetchRedis = jest
    .spyOn(globalThis, "fetch")
    .mockResolvedValue(Response.json({ result }));
  await expect(allowContactSubmission()).resolves.toBe(allowed);
  const body = JSON.parse(String(fetchRedis.mock.calls[0][1]?.body));
  expect(body).toEqual([
    "EVAL",
    expect.any(String),
    "1",
    expect.stringMatching(/^portfolio:contact:production:[a-f0-9]{64}$/),
    "600",
  ]);
});

test("requires Redis credentials in production", async () => {
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  await expect(allowContactSubmission()).rejects.toThrow(/configuration/);
});

test("allows unconfigured local tests without calling Redis", async () => {
  Object.assign(process.env, { NODE_ENV: "test" });
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  const request = jest.spyOn(globalThis, "fetch");
  await expect(allowContactSubmission()).resolves.toBe(true);
  expect(request).not.toHaveBeenCalled();
});

test.each([undefined, "invalid"])(
  "uses a shared limiter without a trusted IP (%s)",
  async (ip) => {
    if (!ip) delete process.env.VERCEL;
    delete process.env.VERCEL_ENV;
    jest
      .mocked(headers)
      .mockResolvedValue(
        new Headers(ip ? { "x-vercel-forwarded-for": ip } : {}),
      );
    const request = jest
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(Response.json({ result: 1 }));
    await expect(allowContactSubmission()).resolves.toBe(true);
    expect(request.mock.calls[0][1]?.body).toContain(
      "portfolio:contact:production:shared",
    );
  },
);

test.each([
  [503, 1, /request failed/],
  [200, 0, /invalid/i],
  [200, "1", /invalid/i],
])("rejects unusable Redis results (%i, %j)", async (status, result, error) => {
  jest
    .spyOn(globalThis, "fetch")
    .mockResolvedValue(Response.json({ result }, { status }));
  await expect(allowContactSubmission()).rejects.toThrow(error);
});
