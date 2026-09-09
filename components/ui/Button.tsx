import Link from "next/link";
import type { Btn } from "@/content/types";
import { ReadinessButton } from "./ReadinessButton";

export function Button({ label, href, style, small }: Btn & { small?: boolean }) {
  const readinessDestination = href === "/pr-readiness-review" || href === "/citizenship-readiness-review";
  const readinessFormAction = href === "#form" && /review|check/i.test(label);

  if (readinessDestination || readinessFormAction) {
    const variant = href === "/citizenship-readiness-review" || /citizenship/i.test(label) ? "citizenship" : "pr";
    return <ReadinessButton label={label} href={href} variant={variant} small={small} />;
  }

  const cls = `btn btn-${style}${small ? " btn-sm" : ""}`;
  return href.startsWith("/") || href.startsWith("#")
    ? <Link href={href} className={cls}>{label}</Link>
    : <a href={href} className={cls}>{label}</a>;
}

export function ButtonRow({ buttons, className = "" }: { buttons?: Btn[]; className?: string }) {
  if (!buttons?.length) return null;
  return <div className={`flex flex-wrap gap-3 items-center ${className}`}>{buttons.map((b) => <Button key={b.href + b.label} {...b} />)}</div>;
}
