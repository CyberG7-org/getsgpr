import Link from "next/link";

const cornerPath = "M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015V32Z";

export function BookCallButton({ href = "/contact" }: { href?: string }) {
  return (
    <span className="sg-call-button ml-2.5">
      <span className="sg-call-drawer sg-call-drawer-top" aria-hidden="true">Start your</span>
      <span className="sg-call-drawer sg-call-drawer-bottom" aria-hidden="true">SG journey</span>
      <Link href={href} className="sg-call-link">Book a free call</Link>
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
