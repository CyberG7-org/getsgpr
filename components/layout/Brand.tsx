import Link from "next/link";
import Image from "next/image";

export function Brand({ large = false }: { large?: boolean; gradientId?: string }) {
  return (
    <Link href="/" aria-label="GetSGPR home" className="inline-flex items-center no-underline shrink-0">
      <Image
        src="/getsgpr-logo.png"
        alt="GetSGPR"
        width={1025}
        height={682}
        priority={!large}
        className={`object-contain object-left ${large ? "w-[160px] h-auto" : "w-[92px] h-[52px]"}`}
      />
    </Link>
  );
}
