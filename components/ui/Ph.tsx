export function Ph({ label }: { label: string }) {
  return <span className="ph" data-ph={label}>[{label}]</span>;
}
