import { describe, it, expect } from "vitest";
import { READINESS_QUESTIONS, assess } from "@/lib/readiness";

// answers are option indexes for Q1..Q15
const base = [0, 2, 2, 1, 3, 2, 2, 0, 1, 0, 0, 0, 0, 0, 5];

describe("readiness assessment", () => {
  it("has fifteen questions in four groups", () => {
    expect(READINESS_QUESTIONS).toHaveLength(15);
    expect(new Set(READINESS_QUESTIONS.map((q) => q.group)).size).toBe(4);
  });
  it("solid profile with complete evidence → Ready to Prepare", () => {
    const r = assess(base);
    expect(r.outcome).toBe("Ready to Prepare");
    expect(r.actions).toHaveLength(3);
    expect(r.pkg.href).toBe("/sgpr-partnered-do-with-you");
  });
  it("under one year residence → Strengthen First", () => {
    expect(assess([...base.slice(0, 4), 0, ...base.slice(5)]).outcome).toBe("Strengthen First");
  });
  it("missing evidence or known inconsistencies → Strengthen First", () => {
    expect(assess([...base.slice(0, 11), 2, ...base.slice(12)]).outcome).toBe("Strengthen First");
    expect(assess([...base.slice(0, 12), 3, ...base.slice(13)]).outcome).toBe("Strengthen First");
  });
  it("self-employed, variable income, 'Other' pass or unsure what changed → More Information Needed", () => {
    expect(assess([...base.slice(0, 7), 1, ...base.slice(8)]).outcome).toBe("More Information Needed");
    expect(assess([6, ...base.slice(1)]).outcome).toBe("More Information Needed");
    expect(assess([...base.slice(0, 13), 2, 6]).outcome).toBe("More Information Needed");
  });
  it("rejected more than once with nothing changed → Strengthen First, concierge", () => {
    const r = assess([...base.slice(0, 13), 3, 5]);
    expect(r.outcome).toBe("Strengthen First");
    expect(r.pkg.href).toBe("/sgpr-premium-concierge");
  });
});
