import { describe, it, expect } from "vitest";
import { SITE } from "@/content/site";
import { NAV } from "@/content/nav";
import { TESTIMONIALS } from "@/content/testimonials";

describe("site facts", () => {
  it("carries the live-site facts", () => {
    expect(SITE.legalName).toBe("SGPR Immigration Singapore");
    expect(SITE.uen).toBe("53408306D");
    expect(SITE.address).toBe("18 Boon Lay Way, #04-118, Tradehub 21, Singapore 609966");
    expect(SITE.whatsappUrl).toBe("https://wa.me/6589340818?text=Hi%20GetSGPR%2C%20I%20would%20like%20to%20enquire%20about%20my%20Singapore%20PR%20application");
    expect(SITE.email).toBe("info@getsgpr.com");
    expect(SITE.openingHours).toBe("9 AM–6 PM");
  });
  it("lists published routes and excludes case studies", () => {
    const expected = ["/", "/pr-readiness-review", "/services", "/permanent-resident-sg",
      "/permanent-resident-sg/first-time-application", "/permanent-resident-sg/family-spouse",
      "/permanent-resident-sg/ep-s-pass-holders", "/permanent-resident-sg/founders-self-employed",
      "/singapore-citizen", "/citizenship-readiness-review", "/ltvp", "/pr-appeal", "/packages", "/sgpr-lite-diy-tier",
      "/sgpr-partnered-do-with-you", "/sgpr-premium-concierge", "/about",
      "/privacy-data-security", "/guides", "/guides/singapore-pr-faq", "/contact", "/book-a-call"];
    for (const r of expected) expect(NAV.routes).toContain(r);
    expect(NAV.routes.some((r) => r.startsWith("/case-studies"))).toBe(false);
    expect(NAV.cta.href).toBe("/book-a-call");
  });
  it("uses the requested primary navigation order", () => {
    expect(NAV.primary.map((link) => link.label)).toEqual(["About", "Services", "Packages", "Knowledge Centre", "Contact Us"]);
    expect(NAV.cta.label).toBe("Book a free call");
  });
  it("flags all nine testimonials as unverified", () => {
    expect(TESTIMONIALS).toHaveLength(9);
    expect(TESTIMONIALS.every((t) => t.rating === 5)).toBe(true);
    expect(TESTIMONIALS.map((t) => t.name)).toContain("Olivia Tan");
  });
});
