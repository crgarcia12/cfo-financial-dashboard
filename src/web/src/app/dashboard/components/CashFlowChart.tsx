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
  ReferenceLine,
} from 'recharts';
import { monthlyCashFlow } from '../data';

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

export default function CashFlowChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={monthlyCashFlow} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 11, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}M`}
          domain={[-2, 6]}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 11, fill: '#9CA3AF' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}M`}
          domain={[60, 120]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
        <ReferenceLine yAxisId="left" y={0} stroke="#E5E7EB" />
        <Bar yAxisId="left" dataKey="operatingCF" name="Operating CF" fill="#3B82F6" radius={[4, 4, 0, 0]} opacity={0.85} isAnimationActive={false} />
        <Bar yAxisId="left" dataKey="capex" name="CapEx" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.75} isAnimationActive={false} />
        <Bar yAxisId="left" dataKey="freeCF" name="Free CF" fill="#10B981" radius={[4, 4, 0, 0]} opacity={0.85} isAnimationActive={false} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="endingCash"
          name="Ending Cash"
          stroke="#8B5CF6"
          strokeWidth={2.5}
          dot={{ r: 3 }}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
