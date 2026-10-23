import { describe, expect, it } from "vitest";
import { CITIZENSHIP_QUESTIONS, assessCitizenship } from "@/lib/citizenship-readiness";

// answers are option indexes for the scored questions Q2..Q19; score() prepends a nationality answer
const ready = [2, 0, 1, 2, 0, 2, 0, 0, 0, 1, 1, 0, 0, 2, 1, 1, 0, 1];
const score = (answers: number[]) => assessCitizenship([0, ...answers]);

describe("citizenship readiness assessment", () => {
  it("has nineteen questions in four groups, starting with nationality", () => {
    expect(CITIZENSHIP_QUESTIONS).toHaveLength(19);
    expect(CITIZENSHIP_QUESTIONS[0].q).toBe("1. What is your nationality?");
    expect(new Set(CITIZENSHIP_QUESTIONS.map((question) => question.group)).size).toBe(4);
  });

  it("nationality never changes the result", () => {
    for (const nationality of [0, 105, 190]) expect(assessCitizenship([nationality, ...ready])).toEqual(score(ready));
  });

  it("returns a preparation result with three actions", () => {
    const result = score(ready);
    expect(result.outcome).toBe("Ready to Prepare");
    expect(result.strong).toContain("Established PR history");
    expect(result.actions).toHaveLength(3);
  });

  it("recommends strengthening when the PR period is short or renunciation is unresolved", () => {
    expect(score([0, ...ready.slice(1)]).outcome).toBe("Strengthen First");
    expect(score([...ready.slice(0, 16), 2, ready[17]]).outcome).toBe("Strengthen First");
  });

  it("asks for a conversation when individual advice is needed", () => {
    expect(score([...ready.slice(0, 4), 1, ...ready.slice(5)]).outcome).toBe("More Information Needed");
    expect(score([...ready.slice(0, 5), 4, ...ready.slice(6)]).outcome).toBe("More Information Needed");
  });
});
