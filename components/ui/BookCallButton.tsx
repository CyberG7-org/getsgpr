"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const cornerPath = "M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015V32Z";

export function BookCallButton({ href = "/contact" }: { href?: string }) {
  const pathname = usePathname();
  const isCurrentPage = pathname === href;

  return (
    <span className={`sg-call-button ml-2.5${isCurrentPage ? " sg-call-button-current" : ""}`}>
      <span className="sg-call-drawer sg-call-drawer-top" aria-hidden="true">Start your</span>
      <span className="sg-call-drawer sg-call-drawer-bottom" aria-hidden="true">SG journey</span>
      <Link href={href} className="sg-call-link" aria-current={isCurrentPage ? "page" : undefined}>Book a free call</Link>
      {[0, 1, 2, 3].map((corner) => (
        <svg
          key={corner}
          className="sg-call-corner"
          viewBox="-1 1 32 32"
          aria-hidden="true"
        >
          <path d={cornerPath} />
        </svg>
      ))}
    </span>
  );
}
