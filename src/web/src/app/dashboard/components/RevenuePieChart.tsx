'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { revenueBySegment, revenueByGeo } from '../data';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { pct: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/95 px-4 py-3 text-xs shadow-xl shadow-black/20">
      <p className="font-semibold text-slate-100">{p.name}</p>
      <p className="text-slate-300">${p.value}M &mdash; {p.payload.pct}%</p>
    </div>
  );
}

interface RevenuePieChartProps {
  type: 'segment' | 'geo';
}

export default function RevenuePieChart({ type }: RevenuePieChartProps) {
  const data = type === 'segment' ? revenueBySegment : revenueByGeo;
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span className="text-xs text-slate-300">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
