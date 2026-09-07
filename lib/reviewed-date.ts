const formatter = new Intl.DateTimeFormat("en-SG", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function oneCalendarMonthBefore(date: Date): Date {
  const reviewed = new Date(date);
  const originalDay = reviewed.getDate();

  reviewed.setDate(1);
  reviewed.setMonth(reviewed.getMonth() - 1);
  const lastDayOfPreviousMonth = new Date(
    reviewed.getFullYear(),
    reviewed.getMonth() + 1,
    0,
  ).getDate();
  reviewed.setDate(Math.min(originalDay, lastDayOfPreviousMonth));

  return reviewed;
}

export function formatReviewedDate(date: Date): string {
  return formatter.format(date);
}

export function reviewedDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
