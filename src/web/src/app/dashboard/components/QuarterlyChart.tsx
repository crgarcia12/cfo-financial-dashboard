'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { quarterlyData } from '../data';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-lg px-4 py-3 text-xs">
      <p className="font-semibold text-gray-700 mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="flex justify-between gap-4">
          <span>{p.name}</span>
          <span className="font-semibold">${p.value}M</span>
        </p>
      ))}
    </div>
  );
}

export default function QuarterlyChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={quarterlyData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
        <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine x="Q4 2023" stroke="#E5E7EB" strokeDasharray="4 2" label={{ value: 'FY24 Start', fill: '#9CA3AF', fontSize: 10 }} />
        <Bar dataKey="revenue" name="Revenue" radius={[4, 4, 0, 0]} isAnimationActive={false}>
          {quarterlyData.map((_, i) => (
            <Cell key={i} fill={i < 4 ? '#CBD5E1' : '#3B82F6'} />
          ))}
        </Bar>
        <Bar dataKey="ebitda" name="EBITDA" radius={[4, 4, 0, 0]} isAnimationActive={false}>
          {quarterlyData.map((_, i) => (
            <Cell key={i} fill={i < 4 ? '#A7F3D0' : '#10B981'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
