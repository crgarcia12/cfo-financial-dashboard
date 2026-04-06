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
    <div className="relative h-2 w-full rounded-full bg-gray-100 mt-1.5">
      <div
        className={`h-2 rounded-full transition-all ${isGood ? 'bg-emerald-400' : 'bg-amber-400'}`}
        style={{ width: `${pct}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-gray-400 rounded"
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
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Liquidity</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-500">Current Ratio</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.currentRatio.value}x</span>
            </div>
            <GaugeBar value={ratios.currentRatio.value} benchmark={ratios.currentRatio.benchmark} max={4} unit="x" />
            <p className="text-xs text-gray-400 mt-1">Benchmark: {ratios.currentRatio.benchmark}x</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-500">Quick Ratio</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.quickRatio.value}x</span>
            </div>
            <GaugeBar value={ratios.quickRatio.value} benchmark={ratios.quickRatio.benchmark} max={4} unit="x" />
            <p className="text-xs text-gray-400 mt-1">Benchmark: {ratios.quickRatio.benchmark}x</p>
          </div>
        </div>
      </div>

      {/* Leverage */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Leverage</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-500">Debt / Equity</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.debtToEquity.value}x</span>
            </div>
            <GaugeBar value={ratios.debtToEquity.value} benchmark={ratios.debtToEquity.benchmark} max={2} positive={false} unit="x" />
            <p className="text-xs text-gray-400 mt-1">Benchmark: {'<'}{ratios.debtToEquity.benchmark}x</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-500">Interest Coverage</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.interestCoverage.value}x</span>
            </div>
            <GaugeBar value={ratios.interestCoverage.value} benchmark={ratios.interestCoverage.benchmark} max={25} unit="x" />
            <p className="text-xs text-gray-400 mt-1">Benchmark: {'>'}{ratios.interestCoverage.benchmark}x</p>
          </div>
        </div>
      </div>

      {/* Returns */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Returns</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-500">Return on Equity</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.returnOnEquity.value}%</span>
            </div>
            <GaugeBar value={ratios.returnOnEquity.value} benchmark={ratios.returnOnEquity.benchmark} max={30} unit="%" />
            <p className="text-xs text-gray-400 mt-1">Benchmark: {'>'}{ratios.returnOnEquity.benchmark}%</p>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-gray-500">Return on Assets</span>
              <span className="text-sm font-bold text-emerald-600">{ratios.returnOnAssets.value}%</span>
            </div>
            <GaugeBar value={ratios.returnOnAssets.value} benchmark={ratios.returnOnAssets.benchmark} max={20} unit="%" />
            <p className="text-xs text-gray-400 mt-1">Benchmark: {'>'}{ratios.returnOnAssets.benchmark}%</p>
          </div>
        </div>
      </div>

      {/* Working Capital */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Working Capital Efficiency</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-center">
            <p className="text-xs text-blue-500 font-medium">DSO</p>
            <p className="text-lg font-bold text-blue-700">{workingCapital.dso.value}d</p>
            <p className="text-xs text-blue-400">↓ {Math.abs(workingCapital.dso.trend)}d YoY</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 text-center">
            <p className="text-xs text-emerald-500 font-medium">DPO</p>
            <p className="text-lg font-bold text-emerald-700">{workingCapital.dpo.value}d</p>
            <p className="text-xs text-emerald-400">↑ {workingCapital.dpo.trend}d YoY</p>
          </div>
          <div className="rounded-xl bg-purple-50 p-3 text-center">
            <p className="text-xs text-purple-500 font-medium">CCC</p>
            <p className="text-lg font-bold text-purple-700">{workingCapital.ccc.value}d</p>
            <p className="text-xs text-purple-400">↓ {Math.abs(workingCapital.ccc.trend)}d YoY</p>
          </div>
        </div>
      </div>

      {/* Balance Sheet Mini Summary */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Balance Sheet Snapshot</p>
        <div className="space-y-2">
          {[
            { label: 'Total Assets', value: `$${balanceSheet.assets.totalAssets}M`, color: 'text-blue-700' },
            { label: 'Total Liabilities', value: `$${balanceSheet.liabilities.totalLiabilities}M`, color: 'text-red-600' },
            { label: 'Total Equity', value: `$${balanceSheet.equity.totalEquity}M`, color: 'text-emerald-600' },
            { label: 'Cash & Equivalents', value: `$${balanceSheet.assets.cash}M`, color: 'text-purple-700' },
            { label: 'Accounts Receivable', value: `$${balanceSheet.assets.accountsReceivable}M`, color: 'text-gray-700' },
            { label: 'Deferred Revenue', value: `$${balanceSheet.liabilities.deferredRevenue}M`, color: 'text-amber-700' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center py-1 border-b border-gray-50">
              <span className="text-xs text-gray-500">{item.label}</span>
              <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
