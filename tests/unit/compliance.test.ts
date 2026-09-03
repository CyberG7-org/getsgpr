import { describe, it, expect } from "vitest";
import { findViolations, stripPlaceholders } from "@/lib/compliance";

describe("compliance", () => {
  it("flags forbidden phrases", () => {
    expect(findViolations("We have a high success rate and are ICA approved.")).toEqual(["high success rate", "ICA approved"]);
    expect(findViolations("90% approval rate")).toEqual(["90% approval"]);
    expect(findViolations("Guaranteed approval or your money back")).toEqual(["Guaranteed approval"]);
    expect(findViolations("We guarantee 100% approval.")).toEqual(["100% approval"]);
    expect(findViolations("You guarantee approval.")).toEqual(["guarantee approval"]);
  });
  it("ignores allowed copy", () => {
    expect(findViolations("We do not guarantee 100% approval simply for marketing purposes.")).toEqual([]);
    expect(findViolations("No approval guarantees.")).toEqual([]);
    expect(findViolations("We never guarantee approval.")).toEqual([]);
    expect(findViolations("Do you guarantee 100% approval if I engage your firm?")).toEqual([]);
    expect(findViolations("Do you guarantee approval?")).toEqual([]);
  });
  it("strips placeholder spans before checking", () => {
    const html = 'Rate <span class="ph" data-ph="x">[90% approval]</span> and [[success rate]] here';
    expect(findViolations(stripPlaceholders(html))).toEqual([]);
  });
});
