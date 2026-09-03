import Link from "next/link";
import type { Btn } from "@/content/types";

export function Button({ label, href, style, small }: Btn & { small?: boolean }) {
  const cls = `btn btn-${style}${small ? " btn-sm" : ""}`;
  return href.startsWith("/") || href.startsWith("#")
    ? <Link href={href} className={cls}>{label}</Link>
    : <a href={href} className={cls}>{label}</a>;
}

export function ButtonRow({ buttons, className = "" }: { buttons?: Btn[]; className?: string }) {
  if (!buttons?.length) return null;
  return <div className={`flex flex-wrap gap-3 items-center ${className}`}>{buttons.map((b) => <Button key={b.href + b.label} {...b} />)}</div>;
}
