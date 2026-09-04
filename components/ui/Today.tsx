"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-SG", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function localDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function Today() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setDate(new Date());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <time dateTime={date ? localDateValue(date) : undefined} data-system-date>
      {date ? formatter.format(date) : "—"}
    </time>
  );
}
