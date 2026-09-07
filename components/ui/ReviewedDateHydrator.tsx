"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  formatReviewedDate,
  oneCalendarMonthBefore,
  reviewedDateValue,
} from "@/lib/reviewed-date";

function updateReviewedDates() {
  const reviewed = oneCalendarMonthBefore(new Date());
  const label = formatReviewedDate(reviewed);
  const value = reviewedDateValue(reviewed);

  document.querySelectorAll<HTMLTimeElement>("time[data-reviewed-date]").forEach((element) => {
    element.dateTime = value;
    element.textContent = label;
  });
}

export function ReviewedDateHydrator() {
  const pathname = usePathname();

  useEffect(() => {
    updateReviewedDates();
    const interval = window.setInterval(updateReviewedDates, 60_000);
    return () => window.clearInterval(interval);
  }, [pathname]);

  return null;
}
