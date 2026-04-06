'use client';

import { budgetVsActual } from '../data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList } from 'recharts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { category: string; variance: number; pct: number } }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  const pct = payload[0].payload.pct;
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-lg px-4 py-3 text-xs">
      <p className="font-semibold text-gray-700">{label}</p>
      <p className={`font-bold ${v >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
        Variance: {v >= 0 ? '+' : ''}${v.toFixed(1)}M ({pct.toFixed(1)}%)
      </p>
    </div>
  );
}

export default function BudgetVarianceChart() {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={budgetVsActual}
          layout="vertical"
          margin={{ top: 4, right: 60, left: 100, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v >= 0 ? '+' : ''}$${v}M`}
            domain={[-8, 8]}
          />
          <YAxis
            type="category"
            dataKey="category"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
            width={95}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={0} stroke="#D1D5DB" strokeWidth={1.5} />
          <Bar dataKey="variance" radius={[0, 4, 4, 0]} maxBarSize={18} isAnimationActive={false}>
            {budgetVsActual.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.variance >= 0 ? '#10B981' : '#EF4444'} />
            ))}
            <LabelList
              dataKey="variance"
              position="right"
              formatter={(v: unknown) => {
                const n = typeof v === 'number' ? v : 0;
                return `${n >= 0 ? '+' : ''}$${n.toFixed(1)}M`;
              }}
              style={{ fontSize: 10, fill: '#6B7280' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 text-center">Positive variance = favorable (above budget revenue / below budget expense)</p>
    </div>
  );
}
