'use client';

import { annualPL } from '../data';

type PLEntry = { actual: number; budget: number; priorYear: number };

type PLRow = {
  label: string;
  key: keyof typeof annualPL;
  indent?: boolean;
  bold?: boolean;
  separator?: boolean;
  highlight?: 'green' | 'blue' | 'purple';
  isExpense?: boolean;
};

const rows: PLRow[] = [
  { label: 'Revenue', key: 'revenue', bold: true, highlight: 'blue' },
  { label: 'Cost of Revenue', key: 'cogs', indent: true, isExpense: true },
  { label: 'Gross Profit', key: 'grossProfit', bold: true, highlight: 'green', separator: true },
  { label: 'Sales & Marketing', key: 'salesMarketing', indent: true, isExpense: true },
  { label: 'Research & Development', key: 'researchDev', indent: true, isExpense: true },
  { label: 'General & Administrative', key: 'generalAdmin', indent: true, isExpense: true },
  { label: 'Total Operating Expenses', key: 'totalOpex', bold: true, isExpense: true },
  { label: 'EBITDA', key: 'ebitda', bold: true, highlight: 'purple', separator: true },
  { label: 'D&A', key: 'depreciationAmort', indent: true, isExpense: true },
  { label: 'EBIT (Operating Income)', key: 'ebit', bold: true },
  { label: 'Interest Expense', key: 'interestExpense', indent: true },
  { label: 'Other Income / (Expense)', key: 'otherIncome', indent: true },
  { label: 'Earnings Before Tax', key: 'ebt', bold: true },
  { label: 'Income Tax', key: 'taxes', indent: true, isExpense: true },
  { label: 'Net Income', key: 'netIncome', bold: true, highlight: 'green', separator: true },
];

function fmt(v: number, isExpense?: boolean) {
  const abs = Math.abs(v);
  const s = abs.toFixed(1);
  if (isExpense && v > 0) return `($${s})`;
  if (v < 0) return `($${Math.abs(v).toFixed(1)})`;
  return `$${s}`;
}

function varianceBadge(variance: number) {
  const pos = variance >= 0;
  return (
    <span className={`inline-block rounded px-1.5 py-0.5 text-xs font-semibold ${pos ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'}`}>
      {pos ? '+' : ''}{variance.toFixed(1)}
    </span>
  );
}

function marginBadge(actual: number, total: number) {
  const pct = ((actual / total) * 100).toFixed(1);
  return <span className="text-xs text-slate-400">{pct}%</span>;
}

export default function PLTable() {
  const revenue = annualPL.revenue.actual;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="w-48 pb-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Line Item</th>
            <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">Actual</th>
            <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">Budget</th>
            <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">Variance</th>
            <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">Prior Yr</th>
            <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">Margin</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const d = annualPL[row.key];
            const variance = d.actual - d.budget;
            const highlight = row.highlight === 'green'
              ? 'bg-emerald-500/8'
              : row.highlight === 'blue'
              ? 'bg-blue-500/8'
              : row.highlight === 'purple'
              ? 'bg-purple-500/8'
              : '';
            return (
              <tr
                key={row.key}
                className={`border-b border-slate-800/80 ${row.separator ? 'border-t-2 border-t-slate-700' : ''} ${highlight}`}
              >
                <td className={`py-2 ${row.indent ? 'pl-4' : ''} ${row.bold ? 'font-semibold text-slate-100' : 'text-slate-300'}`}>
                  {row.label}
                </td>
                <td className={`py-2 text-right font-mono ${row.bold ? 'font-semibold text-slate-100' : 'text-slate-200'}`}>
                  {fmt(d.actual, row.isExpense)}
                </td>
                <td className="py-2 text-right font-mono text-slate-400">{fmt(d.budget, row.isExpense)}</td>
                <td className="py-2 text-right">{varianceBadge(variance)}</td>
                <td className="py-2 text-right font-mono text-slate-500">{fmt((d as PLEntry).priorYear, row.isExpense)}</td>
                <td className="py-2 text-right">
                  {(row.highlight || row.bold) ? marginBadge(Math.abs(d.actual), revenue) : <span className="text-slate-600">—</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
