import Link from "next/link";

export function Brand({ large = false, gradientId = "gm" }: { large?: boolean; gradientId?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline text-on-dark">
      <svg viewBox="0 0 40 40" aria-hidden="true" className="w-[30px] h-[30px]">
        <defs><linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#93AEDC" /><stop offset="1" stopColor="#1B2B57" /></linearGradient></defs>
        <circle cx="20" cy="20" r="14" fill="none" stroke={`url(#${gradientId})`} strokeWidth="6" strokeDasharray="70 18" strokeLinecap="round" transform="rotate(-60 20 20)" />
      </svg>
      <b className={`font-display font-semibold tracking-[-.02em] ${large ? "text-[22px]" : "text-[19px]"}`}>GetSGPR</b>
    </Link>
  );
}
