'use client';

import { ratios, workingCapital, balanceSheet } from '../data';

interface GaugeBarProps {
  value: number;
  benchmark: number;
  max: number;
  positive?: boolean;  // higher is better
  unit?: string;
}

function GaugeBar({ value, benchmark, max, positive = true, unit = '' }: GaugeBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  const bPct = Math.min((benchmark / max) * 100, 100);
  const isGood = positive ? value >= benchmark : value <= benchmark;
  return (
    <div className="relative mt-1.5 h-2 w-full rounded-full bg-slate-800">
      <div
        className={`h-2 rounded-full transition-all ${isGood ? 'bg-emerald-400' : 'bg-amber-400'}`}
        style={{ width: `${pct}%` }}
      />
      <div
        className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 rounded bg-slate-500"
        style={{ left: `${bPct}%` }}
        title={`Benchmark: ${benchmark}${unit}`}
      />
    </div>
  );
}

export default function RatiosPanel() {
  return (
    <div className="space-y-5">
      {/* Liquidity */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Liquidity</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Current Ratio</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.currentRatio.value}x</span>
            </div>
            <GaugeBar value={ratios.currentRatio.value} benchmark={ratios.currentRatio.benchmark} max={4} unit="x" />
            <p className="mt-1 text-xs text-slate-500">Benchmark: {ratios.currentRatio.benchmark}x</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Quick Ratio</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.quickRatio.value}x</span>
            </div>
            <GaugeBar value={ratios.quickRatio.value} benchmark={ratios.quickRatio.benchmark} max={4} unit="x" />
            <p className="mt-1 text-xs text-slate-500">Benchmark: {ratios.quickRatio.benchmark}x</p>
          </div>
        </div>
      </div>

      {/* Leverage */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Leverage</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Debt / Equity</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.debtToEquity.value}x</span>
            </div>
            <GaugeBar value={ratios.debtToEquity.value} benchmark={ratios.debtToEquity.benchmark} max={2} positive={false} unit="x" />
            <p className="mt-1 text-xs text-slate-500">Benchmark: {'<'}{ratios.debtToEquity.benchmark}x</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Interest Coverage</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.interestCoverage.value}x</span>
            </div>
            <GaugeBar value={ratios.interestCoverage.value} benchmark={ratios.interestCoverage.benchmark} max={25} unit="x" />
            <p className="mt-1 text-xs text-slate-500">Benchmark: {'>'}{ratios.interestCoverage.benchmark}x</p>
          </div>
        </div>
      </div>

      {/* Returns */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Returns</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Return on Equity</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.returnOnEquity.value}%</span>
            </div>
            <GaugeBar value={ratios.returnOnEquity.value} benchmark={ratios.returnOnEquity.benchmark} max={30} unit="%" />
            <p className="mt-1 text-xs text-slate-500">Benchmark: {'>'}{ratios.returnOnEquity.benchmark}%</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-slate-400">Return on Assets</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.returnOnAssets.value}%</span>
            </div>
            <GaugeBar value={ratios.returnOnAssets.value} benchmark={ratios.returnOnAssets.benchmark} max={20} unit="%" />
            <p className="mt-1 text-xs text-slate-500">Benchmark: {'>'}{ratios.returnOnAssets.benchmark}%</p>
          </div>
        </div>
      </div>

      {/* Working Capital */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Working Capital Efficiency</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-blue-500/10 p-3 text-center ring-1 ring-inset ring-blue-500/20">
            <p className="text-xs font-medium text-blue-300">DSO</p>
            <p className="text-lg font-bold text-blue-100">{workingCapital.dso.value}d</p>
            <p className="text-xs text-blue-300/80">↓ {Math.abs(workingCapital.dso.trend)}d YoY</p>
          </div>
          <div className="rounded-xl bg-emerald-500/10 p-3 text-center ring-1 ring-inset ring-emerald-500/20">
            <p className="text-xs font-medium text-emerald-300">DPO</p>
            <p className="text-lg font-bold text-emerald-100">{workingCapital.dpo.value}d</p>
            <p className="text-xs text-emerald-300/80">↑ {workingCapital.dpo.trend}d YoY</p>
          </div>
          <div className="rounded-xl bg-purple-500/10 p-3 text-center ring-1 ring-inset ring-purple-500/20">
            <p className="text-xs font-medium text-purple-300">CCC</p>
            <p className="text-lg font-bold text-purple-100">{workingCapital.ccc.value}d</p>
            <p className="text-xs text-purple-300/80">↓ {Math.abs(workingCapital.ccc.trend)}d YoY</p>
          </div>
        </div>
      </div>

      {/* Balance Sheet Mini Summary */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Balance Sheet Snapshot</p>
        <div className="space-y-2">
          {[
            { label: 'Total Assets', value: `$${balanceSheet.assets.totalAssets}M`, color: 'text-blue-700' },
            { label: 'Total Liabilities', value: `$${balanceSheet.liabilities.totalLiabilities}M`, color: 'text-red-600' },
            { label: 'Total Equity', value: `$${balanceSheet.equity.totalEquity}M`, color: 'text-emerald-600' },
            { label: 'Cash & Equivalents', value: `$${balanceSheet.assets.cash}M`, color: 'text-purple-700' },
            { label: 'Accounts Receivable', value: `$${balanceSheet.assets.accountsReceivable}M`, color: 'text-slate-200' },
            { label: 'Deferred Revenue', value: `$${balanceSheet.liabilities.deferredRevenue}M`, color: 'text-amber-700' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between border-b border-slate-800 py-1">
              <span className="text-xs text-slate-400">{item.label}</span>
              <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
