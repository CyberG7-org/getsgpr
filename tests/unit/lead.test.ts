// @vitest-environment node
import { describe, it, expect, vi, afterEach } from "vitest";
import { POST } from "@/app/api/lead/route";

const body = { source: "checker", email: "a@b.co", answers: [0, 1], outcome: "x", pkg: "Lite" };
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("POST /api/lead", () => {
  it("rejects a bad email", async () => {
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify({ ...body, email: "nope" }) }));
    expect(res.status).toBe(400);
  });
  it("accepts without forwarding when no webhook is configured", async () => {
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify(body) }));
    expect(res.status).toBe(202);
    expect(await res.json()).toEqual({ ok: true, forwarded: false });
  });
  it("forwards when GHL_LEAD_WEBHOOK_URL is set", async () => {
    vi.stubEnv("GHL_LEAD_WEBHOOK_URL", "https://hook.example/x");
    const spy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }));
    const res = await POST(new Request("http://x/api/lead", { method: "POST", body: JSON.stringify(body) }));
    expect(spy).toHaveBeenCalledWith("https://hook.example/x", expect.objectContaining({ method: "POST" }));
    expect(await res.json()).toEqual({ ok: true, forwarded: true });
  });
});
