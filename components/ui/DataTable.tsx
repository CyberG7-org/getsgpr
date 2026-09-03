import { RichText } from "./RichText";

export function DataTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto bg-white border border-line rounded-card shadow-card">
      <table className="data-table">
        <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => cell === "✓"
                ? <td key={j} className="text-center text-green font-bold">✓</td>
                : cell === "—" ? <td key={j} className="text-center text-slate-300">—</td>
                : <td key={j}><RichText value={cell} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
