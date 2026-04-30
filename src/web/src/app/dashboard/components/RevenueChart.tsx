'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { monthlyPL } from '../data';

const data = monthlyPL.map((d) => ({
  ...d,
  grossMarginPct: +((d.grossProfit / d.revenue) * 100).toFixed(1),
  ebitdaMarginPct: +((d.ebitda / d.revenue) * 100).toFixed(1),
}));

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/95 px-4 py-3 text-xs shadow-xl shadow-black/20">
      <p className="mb-1.5 font-semibold text-slate-100">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="flex justify-between gap-4">
          <span>{p.name}</span>
          <span className="font-semibold">
            {p.name.includes('%') ? `${p.value}%` : `$${p.value}M`}
          </span>
        </p>
      ))}
    </div>
  );
}

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 11, fill: '#94A3B8' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}M`}
          domain={[0, 22]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 11, fill: '#94A3B8' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          formatter={(value) => <span className="text-xs text-slate-300">{value}</span>}
        />
        <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} opacity={0.9} isAnimationActive={false} />
        <Bar yAxisId="left" dataKey="grossProfit" name="Gross Profit" fill="#10B981" radius={[4, 4, 0, 0]} opacity={0.85} isAnimationActive={false} />
        <Bar yAxisId="left" dataKey="ebitda" name="EBITDA" fill="#8B5CF6" radius={[4, 4, 0, 0]} opacity={0.85} isAnimationActive={false} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="grossMarginPct"
          name="Gross Margin %"
          stroke="#F59E0B"
          strokeWidth={2}
          dot={{ r: 3, fill: '#F59E0B' }}
          isAnimationActive={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="ebitdaMarginPct"
          name="EBITDA Margin %"
          stroke="#EF4444"
          strokeWidth={2}
          dot={{ r: 3, fill: '#EF4444' }}
          strokeDasharray="4 2"
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
