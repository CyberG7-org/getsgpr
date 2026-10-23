// @vitest-environment node
import { describe, it, expect, vi, afterEach } from "vitest";
import { POST } from "@/app/api/lead/route";

const checkerBody = { source: "checker", email: "a@b.co", answers: [0, 1, 0, 0, 2, 1] };
const prBody = { source: "readiness", email: "alex@example.com", firstName: "Alex", answers: Array(16).fill(0), consent: true };
const citizenshipBody = { source: "citizenship-readiness", email: "alex@example.com", firstName: "Alex", answers: Array(19).fill(0), consent: true };
const submissionId = "53a0c77f-6bd6-4a89-a48d-b4018fb2f41f";
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
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify({ ...prBody, submissionId }) }));
    expect(spy).toHaveBeenCalledWith("https://hook.example/x", expect.objectContaining({ method: "POST" }));
    const forwardedBody = JSON.parse(String(spy.mock.calls[0][1]?.body));
    expect(forwardedBody).toEqual(expect.objectContaining({
      submissionId,
      eventType: "readiness_completed",
      bookingStatus: "Not started",
      schemaVersion: "pr-readiness-v2",
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
    expect(forwardedBody.answers).toHaveLength(16);
    expect(forwardedBody.answers[0]).toEqual(expect.objectContaining({ questionId: "pr-q01", question: "What is your nationality?", answer: "Afghanistan" }));
    expect(await res.json()).toEqual(expect.objectContaining({ ok: true, forwarded: true, submissionId }));
  });

  it("sends new submissions to the Make notification webhook", async () => {
    vi.stubEnv("MAKE_LEAD_WEBHOOK_URL", "https://hook.make.example/x");
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }));
    await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify({ ...prBody, submissionId }) }));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe("https://hook.make.example/x");
    expect(JSON.parse(String(spy.mock.calls[0][1]?.body))).toEqual(expect.objectContaining({
      eventType: "readiness_completed", submissionId, checkerType: "PR readiness", email: "alex@example.com",
      answersText: expect.stringMatching(/^1\. What is your nationality\?: Afghanistan\n2\. Which pass do you hold now\?: Employment Pass\n/),
    }));
  });

  it("forwards the complete readiness record to the sheet webhook", async () => {
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_URL", "https://script.example/x");
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_SECRET", "sheet-secret");
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }));
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify({ ...prBody, submissionId }) }));
    const forwardedBody = JSON.parse(String(spy.mock.calls[0][1]?.body));

    expect(spy.mock.calls[0][0]).toBe("https://script.example/x");
    expect(forwardedBody).toEqual(expect.objectContaining({
      eventType: "readiness_completed",
      submissionId,
      answersSummary: expect.stringContaining("pr-q01:"),
      webhookSecret: "sheet-secret",
    }));
    expect(await res.json()).toEqual(expect.objectContaining({
      ok: true,
      forwarded: false,
      sheetForwarded: true,
      submissionId,
    }));
  });
});
