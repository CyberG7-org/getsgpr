// @vitest-environment node
import { describe, it, expect, vi, afterEach } from "vitest";
import { POST } from "@/app/api/lead/route";

const checkerBody = { source: "checker", email: "a@b.co", answers: [0, 1, 0, 0, 2, 1] };
const prBody = { source: "readiness", email: "alex@example.com", firstName: "Alex", answers: Array(15).fill(0), consent: true };
const citizenshipBody = { source: "citizenship-readiness", email: "alex@example.com", firstName: "Alex", answers: Array(18).fill(0), consent: true };
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("POST /api/lead", () => {
  it("rejects a bad email", async () => {
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify({ ...checkerBody, email: "nope" }) }));
    expect(res.status).toBe(400);
  });
  it("accepts without forwarding when no webhook is configured", async () => {
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify(checkerBody) }));
    expect(res.status).toBe(202);
    expect(await res.json()).toEqual(expect.objectContaining({ ok: true, forwarded: false, submissionId: expect.any(String) }));
  });
  it("accepts citizenship readiness leads", async () => {
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify(citizenshipBody) }));
    expect(res.status).toBe(202);
  });
  it("requires consent for readiness records", async () => {
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify({ ...prBody, consent: undefined }) }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "consent required" });
  });
  it("rejects answers that do not match the form", async () => {
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify({ ...prBody, answers: [0, 1] }) }));
    expect(res.status).toBe(400);
  });
  it("forwards when GHL_LEAD_WEBHOOK_URL is set", async () => {
    vi.stubEnv("GHL_LEAD_WEBHOOK_URL", "https://hook.example/x");
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }));
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify(prBody) }));
    expect(spy).toHaveBeenCalledWith("https://hook.example/x", expect.objectContaining({ method: "POST" }));
    const forwardedBody = JSON.parse(String(spy.mock.calls[0][1]?.body));
    expect(forwardedBody).toEqual(expect.objectContaining({
      submissionId: expect.any(String),
      schemaVersion: "pr-readiness-v1",
      checkerType: "PR readiness",
      email: "alex@example.com",
      outcome: expect.any(String),
      recommendedPackage: expect.any(String),
      strongAreas: expect.any(Array),
      areasToStrengthen: expect.any(Array),
      howWeCanHelp: expect.any(Array),
      answersJson: expect.any(String),
      answersSummary: expect.stringContaining("pr-q01:"),
      consentAt: expect.any(String),
    }));
    expect(forwardedBody.answers).toHaveLength(15);
    expect(await res.json()).toEqual(expect.objectContaining({ ok: true, forwarded: true, submissionId: expect.any(String) }));
  });
});
