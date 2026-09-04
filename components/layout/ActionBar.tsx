"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/content/site";

export function ActionBar() {
  const pathname = usePathname();
  if (pathname === "/book-a-call") return null;

  return (
    <div className="hidden max-[1080px]:flex fixed bottom-0 inset-x-0 z-[90] bg-[rgba(10,18,35,.97)] backdrop-blur-[12px] border-t border-[rgba(147,174,220,.2)] px-3 py-2.5 gap-2">
      <a href={SITE.whatsappUrl} className="flex-1 min-h-[52px] inline-flex items-center justify-center rounded-btn no-underline font-semibold text-[15px] bg-[rgba(147,174,220,.14)] text-on-dark">WhatsApp</a>
      <Link href="/book-a-call" className="flex-[1.3] min-h-[52px] inline-flex items-center justify-center rounded-btn no-underline font-semibold text-[15px] bg-blue-300 text-navy-900">Book a call</Link>
    </div>
  );
}
