// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/lead/booking-intent/route";

const body = { submissionId: "53a0c77f-6bd6-4a89-a48d-b4018fb2f41f", email: "alex@example.com" };

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
    expect(await response.json()).toEqual({ ok: true, forwarded: false });
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
    });
    expect(response.status).toBe(202);
  });
});
