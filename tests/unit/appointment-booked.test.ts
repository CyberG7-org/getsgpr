// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/lead/appointment-booked/route";

const url = "http://x/api/lead/appointment-booked?token=appointment-secret";
const body = {
  customData: {
    submissionId: "53a0c77f-6bd6-4a89-a48d-b4018fb2f41f",
    appointmentStart: "2026-09-25T15:00:00+08:00",
  },
};

afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("POST /api/lead/appointment-booked", () => {
  it("rejects an invalid webhook token", async () => {
    vi.stubEnv("GHL_APPOINTMENT_WEBHOOK_TOKEN", "appointment-secret");
    const response = await POST(new Request(`${url}x`, { method: "POST", body: JSON.stringify(body) }));
    expect(response.status).toBe(401);
  });

  it("forwards the appointment to the matching sheet record", async () => {
    vi.stubEnv("GHL_APPOINTMENT_WEBHOOK_TOKEN", "appointment-secret");
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_URL", "https://script.example/x");
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_SECRET", "sheet-secret");
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }));

    const response = await POST(new Request(url, { method: "POST", body: JSON.stringify(body) }));
    const forwardedBody = JSON.parse(String(spy.mock.calls[0][1]?.body));

    expect(forwardedBody).toEqual({
      eventType: "appointment_booked",
      submissionId: body.customData.submissionId,
      bookingStatus: "Booked",
      appointmentStart: body.customData.appointmentStart,
      webhookSecret: "sheet-secret",
    });
    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ ok: true, sheetForwarded: true });
  });
});
