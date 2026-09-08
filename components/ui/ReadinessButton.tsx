import Link from "next/link";

type ReadinessButtonProps = {
  label: string;
  href: string;
  small?: boolean;
};

export function ReadinessButton({ label, href, small }: ReadinessButtonProps) {
  const className = `readiness-cta${small ? " readiness-cta-sm" : ""}`;

  return href.startsWith("/") || href.startsWith("#") ? (
    <Link href={href} className={className}>
      <span>{label}</span>
    </Link>
  ) : (
    <a href={href} className={className}>
      <span>{label}</span>
    </a>
  );
}
