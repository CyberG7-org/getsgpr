import { describe, it, expect } from "vitest";
import { REDIRECTS } from "@/lib/redirects";

describe("redirects", () => {
  it("maps every old GoHighLevel URL permanently", () => {
    const map = Object.fromEntries(REDIRECTS.map((r) => [r.source, r.destination]));
    expect(map).toEqual({
      "/home": "/",
      "/about-us": "/about",
      "/contactus": "/contact",
      "/service": "/services",
      "/package": "/packages",
      "/privacy-policy": "/privacy-data-security",
      "/terms-of-use": "/privacy-data-security#terms",
    });
    expect(REDIRECTS.every((r) => r.permanent)).toBe(true);
  });
});
