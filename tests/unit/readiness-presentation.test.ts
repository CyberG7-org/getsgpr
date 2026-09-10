import { describe, expect, it } from "vitest";
import { presentationAreas } from "@/lib/readiness-presentation";

describe("readiness result presentation", () => {
  it("keeps improvement priorities longer than visible strengths", () => {
    const result = presentationAreas(
      ["Residence", "Employment", "Income", "Qualifications", "Family ties", "Community"],
      ["Evidence currency"],
      [
        "Assemble your evidence in the order of ICA's document checklist and date-stamp each item.",
        "Draft a one-page cover letter that tells one consistent story across every document.",
        "Book a free 20-minute call to confirm timing and the package that fits.",
      ],
      "SGPR Partnered",
    );

    expect(result.visibleStrong).toHaveLength(4);
    expect(result.visibleWeak.length).toBeGreaterThan(result.visibleStrong.length);
  });

  it("keeps answer-driven weak factors first", () => {
    const result = presentationAreas(
      ["Economic record"],
      ["PR qualifying period", "Length of residence"],
      ["Build an evidence list covering your PR history."],
      "Citizenship Consultation",
    );

    expect(result.visibleWeak.slice(0, 2)).toEqual(["PR qualifying period", "Length of residence"]);
  });
});
