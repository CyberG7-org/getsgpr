import { describe, expect, it } from "vitest";
import { CITIZENSHIP_QUESTIONS, assessCitizenship } from "@/lib/citizenship-readiness";

const ready = [2, 0, 1, 2, 0, 2, 0, 0, 0, 1, 1, 0, 0, 2, 1, 1, 0, 1];

describe("citizenship readiness assessment", () => {
  it("has eighteen questions in four groups", () => {
    expect(CITIZENSHIP_QUESTIONS).toHaveLength(18);
    expect(new Set(CITIZENSHIP_QUESTIONS.map((question) => question.group)).size).toBe(4);
  });

  it("returns a preparation result with three actions", () => {
    const result = assessCitizenship(ready);
    expect(result.outcome).toBe("Ready to Prepare");
    expect(result.strong).toContain("Established PR history");
    expect(result.actions).toHaveLength(3);
  });

  it("recommends strengthening when the PR period is short or renunciation is unresolved", () => {
    expect(assessCitizenship([0, ...ready.slice(1)]).outcome).toBe("Strengthen First");
    expect(assessCitizenship([...ready.slice(0, 16), 2, ready[17]]).outcome).toBe("Strengthen First");
  });

  it("asks for a conversation when individual advice is needed", () => {
    expect(assessCitizenship([...ready.slice(0, 4), 1, ...ready.slice(5)]).outcome).toBe("More Information Needed");
    expect(assessCitizenship([...ready.slice(0, 5), 4, ...ready.slice(6)]).outcome).toBe("More Information Needed");
  });
});
