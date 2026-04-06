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
    <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-semibold ${pos ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
      {pos ? '+' : ''}{variance.toFixed(1)}
    </span>
  );
}

function marginBadge(actual: number, total: number) {
  const pct = ((actual / total) * 100).toFixed(1);
  return <span className="text-xs text-gray-400">{pct}%</span>;
}

export default function PLTable() {
  const revenue = annualPL.revenue.actual;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide w-48">Line Item</th>
            <th className="text-right pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actual</th>
            <th className="text-right pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Budget</th>
            <th className="text-right pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Variance</th>
            <th className="text-right pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Prior Yr</th>
            <th className="text-right pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Margin</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const d = annualPL[row.key];
            const variance = d.actual - d.budget;
            const highlight = row.highlight === 'green'
              ? 'bg-emerald-50/50'
              : row.highlight === 'blue'
              ? 'bg-blue-50/50'
              : row.highlight === 'purple'
              ? 'bg-purple-50/50'
              : '';
            return (
              <tr
                key={row.key}
                className={`border-b border-gray-50 ${row.separator ? 'border-t-2 border-t-gray-200' : ''} ${highlight}`}
              >
                <td className={`py-2 ${row.indent ? 'pl-4' : ''} ${row.bold ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                  {row.label}
                </td>
                <td className={`py-2 text-right font-mono ${row.bold ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                  {fmt(d.actual, row.isExpense)}
                </td>
                <td className="py-2 text-right font-mono text-gray-500">{fmt(d.budget, row.isExpense)}</td>
                <td className="py-2 text-right">{varianceBadge(variance)}</td>
                <td className="py-2 text-right font-mono text-gray-400">{fmt((d as PLEntry).priorYear, row.isExpense)}</td>
                <td className="py-2 text-right">
                  {(row.highlight || row.bold) ? marginBadge(Math.abs(d.actual), revenue) : <span className="text-gray-300">—</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
