import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { headers } from "next/headers";

const incrementWithExpiry = `
local count = redis.call("INCR", KEYS[1])
if count == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end
return count
`;

export async function allowContactSubmission() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url && !token && process.env.NODE_ENV !== "production") return true;
  if (!url || !token) throw new Error("Missing contact rate limit configuration");

  const requestHeaders = await headers();
  const ip = process.env.VERCEL === "1"
    ? requestHeaders.get("x-vercel-forwarded-for")?.trim()
    : undefined;
  const client = ip && isIP(ip)
    ? createHmac("sha256", token).update(ip).digest("hex")
    : "shared";
  const environment = process.env.VERCEL_ENV ?? process.env.NODE_ENV;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(["EVAL", incrementWithExpiry, "1", `portfolio:contact:${environment}:${client}`, "600"]),
    cache: "no-store",
    signal: AbortSignal.timeout(3000),
  });
  if (!response.ok) throw new Error("Contact rate limit request failed");
  const { result } = await response.json();
  if (!Number.isInteger(result) || result < 1) {
    throw new Error("Invalid contact rate limit response");
  }
  return result <= 5;
}
