// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  formatReviewedDate,
  oneCalendarMonthBefore,
  reviewedDateValue,
} from "@/lib/reviewed-date";

describe("reviewed date", () => {
  it("uses the same day in the previous calendar month", () => {
    const reviewed = oneCalendarMonthBefore(new Date(2026, 8, 7, 10, 30));

    expect(reviewedDateValue(reviewed)).toBe("2026-08-07");
    expect(formatReviewedDate(reviewed)).toBe("07 August 2026");
  });

  it("clamps the day at the end of a shorter previous month", () => {
    const reviewed = oneCalendarMonthBefore(new Date(2026, 2, 31, 10, 30));

    expect(reviewedDateValue(reviewed)).toBe("2026-02-28");
  });

  it("crosses the year boundary", () => {
    const reviewed = oneCalendarMonthBefore(new Date(2026, 0, 15, 10, 30));

    expect(reviewedDateValue(reviewed)).toBe("2025-12-15");
  });
});
