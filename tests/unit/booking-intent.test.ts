// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/lead/booking-intent/route";

const body = {
  submissionId: "53a0c77f-6bd6-4a89-a48d-b4018fb2f41f",
  email: "alex@example.com",
  recommendedPackage: "SGPR Partnered",
};

afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("POST /api/lead/booking-intent", () => {
  it("rejects an invalid submission ID", async () => {
    const response = await POST(new Request("http://x/api/lead/booking-intent", {
      method: "POST",
      body: JSON.stringify({ ...body, submissionId: "invalid" }),
    }));
    expect(response.status).toBe(400);
  });

  it("accepts booking intent when no webhook is configured", async () => {
    const response = await POST(new Request("http://x/api/lead/booking-intent", { method: "POST", body: JSON.stringify(body) }));
    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ ok: true, forwarded: false, sheetForwarded: false });
  });

  it("forwards a booking-started event to GHL", async () => {
    vi.stubEnv("GHL_LEAD_WEBHOOK_URL", "https://hook.example/x");
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }));
    const response = await POST(new Request("http://x/api/lead/booking-intent", { method: "POST", body: JSON.stringify(body) }));
    const forwardedBody = JSON.parse(String(spy.mock.calls[0][1]?.body));

    expect(forwardedBody).toEqual({
      eventType: "booking_started",
      submissionId: body.submissionId,
      email: body.email,
      bookingStatus: "Booking started",
      bookingClickedAt: expect.any(String),
      recommendedPackage: body.recommendedPackage,
    });
    expect(response.status).toBe(202);
  });

  it("forwards booking intent to the sheet webhook with its secret", async () => {
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_URL", "https://script.example/x");
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_SECRET", "sheet-secret");
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }));
    const response = await POST(new Request("http://x/api/lead/booking-intent", { method: "POST", body: JSON.stringify(body) }));
    const forwardedBody = JSON.parse(String(spy.mock.calls[0][1]?.body));

    expect(spy.mock.calls[0][0]).toBe("https://script.example/x");
    expect(forwardedBody).toEqual(expect.objectContaining({
      eventType: "booking_started",
      submissionId: body.submissionId,
      webhookSecret: "sheet-secret",
    }));
    expect(await response.json()).toEqual({ ok: true, forwarded: false, sheetForwarded: true });
  });
});
