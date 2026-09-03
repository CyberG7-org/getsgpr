import Link from "next/link";
import { parseRich } from "@/lib/rich";
import { Ph } from "./Ph";

type Props = { value: string; as?: keyof React.JSX.IntrinsicElements; className?: string };

export function RichText({ value, as, className }: Props) {
  const nodes = parseRich(value).map((n, i) => {
    switch (n.t) {
      case "ph": return <Ph key={i} label={n.v} />;
      case "strong": return <strong key={i}>{n.v}</strong>;
      case "link": return n.href.startsWith("/") ? <Link key={i} href={n.href}>{n.v}</Link> : <a key={i} href={n.href}>{n.v}</a>;
      default: return n.v;
    }
  });
  if (!as) return <>{nodes}</>;
  const Tag = as as "p";
  return <Tag className={className}>{nodes}</Tag>;
}
