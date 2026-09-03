import type { Table } from "@/content/types";
import { SectionHead } from "@/components/ui/SectionHead";
import { DataTable } from "@/components/ui/DataTable";
import { RichText } from "@/components/ui/RichText";
import { FootRow } from "./Text";

export function TableBlock(b: Table) {
  return (
    <>
      <SectionHead eyebrow={b.eyebrow} title={b.title} sub={b.sub} />
      <DataTable columns={b.columns} rows={b.rows} />
      {b.note && <RichText as="p" className="note" value={b.note} />}
      <FootRow foot={b.foot} />
    </>
  );
}
