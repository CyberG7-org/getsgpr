import { describe, expect, it } from "vitest";
import { buildLeadRecord } from "@/lib/lead-record";
import { buildResultEmail, buildTeamEmail } from "@/lib/emails";
import { findViolations } from "@/lib/compliance";
import { SITE } from "@/content/site";
import type { LeadSubmission } from "@/lib/lead";

const id = "53a0c77f-6bd6-4a89-a48d-b4018fb2f41f";
const record = (lead: Partial<LeadSubmission> & Pick<LeadSubmission, "source" | "answers">) =>
  buildLeadRecord({ email: "alex@example.com", consent: true, ...lead }, "2026-10-23T00:00:00.000Z", id);

describe("customer result email", () => {
  const pr = buildResultEmail(record({ source: "readiness", firstName: "<Alex>", answers: Array(16).fill(0) }));

  it("brands the PR readiness result and links to WhatsApp and booking", () => {
    expect(pr.subject).toMatch(/^Your PR readiness result: /);
    expect(pr.html).toContain("https://www.getsgpr.com/email/getsgpr-logo.png");
    expect(pr.html).toContain("Hi &lt;Alex&gt;,");
    expect(pr.html).not.toContain("<Alex>");
    expect(pr.html).toContain(SITE.whatsappUrl);
    expect(pr.html).toContain(`https://www.getsgpr.com/book-a-call?rid=${id}`);
    expect(pr.html).toContain("Strong areas");
    expect(pr.html).toContain("It is not an ICA score");
  });

  it("keeps every result email free of forbidden claims", () => {
    const emails = [
      pr,
      buildResultEmail(record({ source: "citizenship-readiness", answers: Array(19).fill(0) })),
      buildResultEmail(record({ source: "checker", answers: [0, 1, 0, 0, 2, 1] })),
    ];
    for (const email of emails) expect(findViolations(email.html.replace(/<[^>]+>/g, " "))).toEqual([]);
  });

  it("sends eligibility users their snapshot and the document checklist", () => {
    const email = buildResultEmail(record({ source: "checker", answers: [0, 1, 0, 0, 2, 1] }));
    expect(email.subject).toBe("Your GetSGPR eligibility snapshot");
    expect(email.html).toContain("Hi there,");
    expect(email.html).toContain("/guides/pr-document-checklist");
    expect(email.html).not.toContain("Strong areas");
  });
});

describe("team notification email", () => {
  const email = buildTeamEmail(record({ source: "readiness", firstName: "<Alex>", answers: [105, ...Array(15).fill(0)] }));

  it("uses the branded layout with the lead's details and answers", () => {
    expect(email.subject).toMatch(/^New PR readiness submission: <Alex> \(/);
    expect(email.html).toContain("https://www.getsgpr.com/email/getsgpr-logo.png");
    expect(email.html).toContain("PR readiness: &lt;Alex&gt;");
    expect(email.html).not.toContain("<Alex>");
    expect(email.html).toContain("What is your nationality? <b>Malaysia</b>");
    expect(email.html).toContain('href="mailto:alex@example.com"');
    expect(email.html).toContain("Internal notification");
  });
});
