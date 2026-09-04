import { Today } from "./Today";

export function Ph({ label }: { label: string }) {
  if (["date", "date checked"].includes(label.trim().toLowerCase())) return <Today />;
  return <span className="ph" data-ph={label}>[{label}]</span>;
}
