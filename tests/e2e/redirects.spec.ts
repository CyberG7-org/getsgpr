import { test, expect } from "@playwright/test";
import { REDIRECTS } from "../../lib/redirects";

for (const r of REDIRECTS) {
  test(`redirect ${r.source} → ${r.destination}`, async ({ request }) => {
    const res = await request.get(r.source, { maxRedirects: 0 });
    expect([301, 308]).toContain(res.status());
    expect(res.headers()["location"]).toContain(r.destination.split("#")[0]);
  });
}
