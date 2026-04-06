'use client';

import { saasMetrics, headcount } from '../data';

interface MetricRowProps {
  label: string;
  value: string;
  trend?: string;
  positive?: boolean;
  highlight?: boolean;
}

function MetricRow({ label, value, trend, positive, highlight }: MetricRowProps) {
  return (
    <div className={`flex items-center justify-between py-2 border-b border-gray-50 ${highlight ? 'bg-gradient-to-r from-transparent to-purple-50/30 -mx-2 px-2 rounded' : ''}`}>
      <span className="text-xs text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        {trend && (
          <span className={`text-xs font-medium ${positive ? 'text-emerald-500' : 'text-red-500'}`}>
            {positive ? '↑' : '↓'} {trend}
          </span>
        )}
        <span className="text-sm font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
}

export default function SaaSMetricsPanel() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">ARR & Growth</p>
        <MetricRow label="Annual Recurring Revenue (ARR)" value={`$${saasMetrics.arr}M`} trend="22%" positive highlight />
        <MetricRow label="Net Revenue Retention (NRR)" value={`${saasMetrics.nrr}%`} trend="↑3pp YoY" positive />
        <MetricRow label="Gross Revenue Retention (GRR)" value={`${saasMetrics.grr}%`} />
        <MetricRow label="Magic Number" value={`${saasMetrics.magicNumber}x`} trend="strong" positive />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Unit Economics</p>
        <MetricRow label="Customer Acquisition Cost (CAC)" value={`$${saasMetrics.cac.toLocaleString()}`} />
        <MetricRow label="Lifetime Value (LTV)" value={`$${saasMetrics.ltv.toLocaleString()}`} trend="15% YoY" positive highlight />
        <MetricRow label="LTV / CAC Ratio" value={`${saasMetrics.ltvCacRatio}x`} trend="best-in-class" positive />
        <MetricRow label="CAC Payback Period" value={`${saasMetrics.paybackMonths} months`} />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Productivity</p>
        <MetricRow label="Total Headcount" value={headcount.total.toLocaleString()} trend="+48 YoY" positive />
        <MetricRow label="Revenue per Employee" value={`$${(headcount.revenuePerEmployee * 1000).toFixed(0)}K`} trend="12% YoY" positive highlight />
        <MetricRow label="EBITDA per Employee" value={`$${(headcount.ebitdaPerEmployee * 1000).toFixed(0)}K`} trend="28% YoY" positive />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Headcount Mix</p>
        {[
          { label: 'Engineering & Product', count: headcount.engineering, color: 'bg-blue-500' },
          { label: 'Sales & Marketing', count: headcount.salesMarketing, color: 'bg-emerald-500' },
          { label: 'Customer Success', count: headcount.customerSuccess, color: 'bg-purple-500' },
          { label: 'General & Administrative', count: headcount.generalAdmin, color: 'bg-gray-400' },
        ].map((dept) => {
          const pct = ((dept.count / headcount.total) * 100).toFixed(0);
          return (
            <div key={dept.label} className="mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{dept.label}</span>
                <span className="font-semibold text-gray-700">{dept.count} ({pct}%)</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div className={`h-1.5 rounded-full ${dept.color}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
