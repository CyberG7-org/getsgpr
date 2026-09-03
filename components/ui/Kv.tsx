import { RichText } from "./RichText";

export function Kv({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <dl className="grid grid-cols-[160px_1fr] max-[980px]:grid-cols-1 gap-x-5 gap-y-2.5 text-[15.5px] m-0">
      {rows.map((r) => (
        <div key={r.k} className="contents">
          <dt className="text-slate-400 text-[12.5px] font-semibold tracking-[.06em] uppercase pt-[3px]">{r.k}</dt>
          <dd className="m-0 text-slate-500"><RichText value={r.v} /></dd>
        </div>
      ))}
    </dl>
  );
}
