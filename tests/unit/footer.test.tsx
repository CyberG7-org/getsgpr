import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/content/site";

describe("Footer", () => {
  const html = renderToStaticMarkup(<Footer />);
  it("carries the independence disclaimer verbatim", () => {
    expect(html.replace(/&amp;/g, "&")).toContain(SITE.disclaimer);
  });
  it("shows legal name, UEN, address and phone, and placeholders for email and hours", () => {
    expect(html).toContain("SGPR Immigration Singapore");
    expect(html).toContain("UEN 53408306D");
    expect(html).toContain("18 Boon Lay Way, #04-118, Tradehub 21, Singapore 609966");
    expect(html).toContain("+65 8934 0818");
    expect(html).toContain('data-ph="Email"');
    expect(html).toContain('data-ph="Opening hours"');
  });
  it("renders the supplied GetSGPR logo", () => {
    expect(html).toContain("getsgpr-logo.png");
    expect(html).toContain('alt="GetSGPR"');
  });
  it("links every footer route", () => {
    for (const href of ["/permanent-resident-sg", "/packages", "/pr-readiness-review", "/about", "/case-studies", "/guides", "/contact", "/privacy-data-security"])
      expect(html).toContain(`href="${href}"`);
  });
});
