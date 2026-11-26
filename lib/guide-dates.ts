const createdAtFormatter = new Intl.DateTimeFormat("en-SG", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Singapore",
});

export function formatGuideCreatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid guide createdAt timestamp: ${value}`);

  return `${createdAtFormatter.format(date).replace(/\b(am|pm)\b/, (period) => period.toUpperCase())} SGT`;
}
