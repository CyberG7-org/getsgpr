import Link from "next/link";
import { NAV } from "@/content/nav";

export function MobileNav() {
  return (
    <nav aria-label="Primary, compact" className="flex min-[1081px]:hidden items-center gap-1.5 ml-auto">
      {NAV.compact.map((l) => <Link key={l.href} href={l.href} className="text-blue-100 no-underline text-[14px] font-medium px-3 py-2 rounded-[9px]">{l.label}</Link>)}
      <Link href="/contact" className="bg-blue-300 text-navy-900 font-semibold no-underline text-[14px] px-3 py-2 rounded-[9px]">Book</Link>
    </nav>
  );
}
