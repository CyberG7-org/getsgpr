import Link from "next/link";
import type { MouseEventHandler } from "react";

type ReadinessButtonProps = {
  label: string;
  href: string;
  variant: "pr" | "citizenship";
  small?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function ReadinessButton({ label, href, variant, small, onClick }: ReadinessButtonProps) {
  const className = `readiness-cta readiness-cta-${variant}${small ? " readiness-cta-sm" : ""}`;

  return href.startsWith("/") || href.startsWith("#") ? (
    <Link href={href} className={className} onClick={onClick}>
      <span>{label}</span>
    </Link>
  ) : (
    <a href={href} className={className} onClick={onClick}>
      <span>{label}</span>
    </a>
  );
}
