'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { company, annualKPIs } from './data';
import KPICard from './components/KPICard';
import SectionCard from './components/SectionCard';
import PLTable from './components/PLTable';
import RatiosPanel from './components/RatiosPanel';
import SaaSMetricsPanel from './components/SaaSMetricsPanel';

// Dynamic import for chart components: recharts uses DOM measurement APIs
// (ResizeObserver, getBoundingClientRect) and SVG rendering that require a
// browser environment — they must not run during Next.js server-side rendering.
const RevenueChart = dynamic(() => import('./components/RevenueChart'), { ssr: false });
const CashFlowChart = dynamic(() => import('./components/CashFlowChart'), { ssr: false });
const RevenuePieChart = dynamic(() => import('./components/RevenuePieChart'), { ssr: false });
const QuarterlyChart = dynamic(() => import('./components/QuarterlyChart'), { ssr: false });
const BudgetVarianceChart = dynamic(() => import('./components/BudgetVarianceChart'), { ssr: false });

// ── Icons ────────────────────────────────────────────────────────────────────
const RevenueIcon = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const GrossProfitIcon = () => (
  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const EBITDAIcon = () => (
  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const NetIncomeIcon = () => (
  <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);
const FCFIcon = () => (
  <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const CashIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

type TabId = 'overview' | 'pl' | 'cashflow' | 'ratios' | 'saas';

const tabs: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'pl', label: 'P&L Statement' },
  { id: 'cashflow', label: 'Cash Flow' },
  { id: 'ratios', label: 'Balance Sheet & Ratios' },
  { id: 'saas', label: 'SaaS & Productivity' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [pieView, setPieView] = useState<'segment' | 'geo'>('segment');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-lg shadow">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">{company.name}</h1>
              <p className="text-xs text-gray-400">{company.industry} &mdash; {company.ticker}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 rounded-lg px-3 py-1.5 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              All Systems Healthy
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-700">{company.reportingPeriod}</p>
              <p className="text-xs text-gray-400">As of {company.reportDate}</p>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="max-w-screen-2xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">

        {/* ── KPI Cards (always visible) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard
            title="Revenue"
            value={`$${annualKPIs.revenue.actual}M`}
            subtitle={`FY2024 — ${annualKPIs.revenue.unit}`}
            badge={{ label: `${annualKPIs.revenue.growth}% YoY`, positive: true }}
            badge2={{ label: `+${annualKPIs.revenue.vsbudget}% vs Budget`, positive: true }}
            icon={<RevenueIcon />}
            accentColor="bg-blue-500"
          />
          <KPICard
            title="Gross Profit"
            value={`$${annualKPIs.grossProfit.actual}M`}
            subtitle={`${annualKPIs.grossProfit.margin}% margin`}
            badge={{ label: `${(annualKPIs.grossProfit.margin - annualKPIs.grossProfit.priorYearMargin).toFixed(1)}pp margin`, positive: true }}
            icon={<GrossProfitIcon />}
            accentColor="bg-emerald-500"
          />
          <KPICard
            title="EBITDA"
            value={`$${annualKPIs.ebitda.actual}M`}
            subtitle={`${annualKPIs.ebitda.margin}% margin`}
            badge={{ label: `${(annualKPIs.ebitda.margin - annualKPIs.ebitda.priorYearMargin).toFixed(1)}pp margin`, positive: true }}
            icon={<EBITDAIcon />}
            accentColor="bg-purple-500"
          />
          <KPICard
            title="Net Income"
            value={`$${annualKPIs.netIncome.actual}M`}
            subtitle={`${annualKPIs.netIncome.margin}% margin`}
            badge={{ label: `${(annualKPIs.netIncome.margin - annualKPIs.netIncome.priorYearMargin).toFixed(1)}pp margin`, positive: true }}
            icon={<NetIncomeIcon />}
            accentColor="bg-teal-500"
          />
          <KPICard
            title="Free Cash Flow"
            value={`$${annualKPIs.freeCashFlow.actual}M`}
            subtitle={`${annualKPIs.freeCashFlow.conversionRate}% FCF conversion`}
            badge={{ label: 'vs Budget +12%', positive: true }}
            icon={<FCFIcon />}
            accentColor="bg-amber-500"
          />
          <KPICard
            title="Cash & Equivalents"
            value={`$${annualKPIs.cash.ending}M`}
            subtitle={`+$${annualKPIs.cash.change}M YTD`}
            badge={{ label: 'Net Cash Position', positive: true }}
            icon={<CashIcon />}
            accentColor="bg-indigo-500"
          />
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SectionCard
                  title="Revenue, Gross Profit & EBITDA"
                  subtitle="Monthly trend FY2024 | Bars = $M | Lines = Margin %"
                >
                  <RevenueChart />
                </SectionCard>
              </div>
              <div>
                <SectionCard
                  title="Revenue Mix"
                  subtitle="By customer segment or geography"
                  action={
                    <div className="flex rounded-lg overflow-hidden border border-gray-100 text-xs">
                      <button
                        onClick={() => setPieView('segment')}
                        className={`px-2.5 py-1 font-medium transition-colors ${pieView === 'segment' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Segment
                      </button>
                      <button
                        onClick={() => setPieView('geo')}
                        className={`px-2.5 py-1 font-medium transition-colors ${pieView === 'geo' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Geography
                      </button>
                    </div>
                  }
                >
                  <RevenuePieChart type={pieView} />
                </SectionCard>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SectionCard
                title="Quarterly Performance"
                subtitle="Revenue vs EBITDA | Gray = FY2023 | Color = FY2024"
              >
                <QuarterlyChart />
              </SectionCard>
              <SectionCard
                title="Budget vs Actual Variance"
                subtitle="FY2024 full year | Positive = favorable"
              >
                <BudgetVarianceChart />
              </SectionCard>
            </div>
          </div>
        )}

        {/* ── P&L Tab ── */}
        {activeTab === 'pl' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <SectionCard
                title="Income Statement"
                subtitle="FY2024 Actual vs Budget vs Prior Year | USD Millions"
              >
                <PLTable />
              </SectionCard>
            </div>
            <div className="space-y-6">
              <SectionCard title="Revenue & Margin Trend" subtitle="Monthly FY2024">
                <RevenueChart />
              </SectionCard>
              <SectionCard title="Budget Variance" subtitle="Key line items">
                <BudgetVarianceChart />
              </SectionCard>
            </div>
          </div>
        )}

        {/* ── Cash Flow Tab ── */}
        {activeTab === 'cashflow' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <SectionCard
                title="Cash Flow Waterfall"
                subtitle="Monthly Operating CF, CapEx, Free CF & Ending Cash Balance"
              >
                <CashFlowChart />
              </SectionCard>
            </div>
            <div>
              <SectionCard title="Cash Metrics" subtitle="FY2024 summary">
                <div className="space-y-3">
                  {[
                    { label: 'Beginning Cash (Jan 2024)', value: '$70.8M', color: 'text-gray-700' },
                    { label: 'Total Operating Cash Flow', value: '$43.8M', color: 'text-blue-700' },
                    { label: 'Total CapEx', value: '($11.3M)', color: 'text-red-600' },
                    { label: 'Free Cash Flow', value: '$32.5M', color: 'text-emerald-700', bold: true },
                    { label: 'Other (Financing, etc.)', value: '$1.0M', color: 'text-gray-500' },
                    { label: 'Ending Cash (Dec 2024)', value: '$104.3M', color: 'text-purple-700', bold: true },
                    { label: 'FCF Conversion Rate', value: '87.4%', color: 'text-amber-700' },
                    { label: 'Cash as % of Revenue', value: '54.6%', color: 'text-indigo-700' },
                    { label: 'Runway (at current burn)', value: 'N/A (cash positive)', color: 'text-emerald-600' },
                  ].map((item) => (
                    <div key={item.label} className={`flex justify-between items-center py-1.5 border-b border-gray-50`}>
                      <span className="text-xs text-gray-500">{item.label}</span>
                      <span className={`text-xs font-bold ${item.color} ${item.bold ? 'text-sm' : ''}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>
        )}

        {/* ── Balance Sheet & Ratios Tab ── */}
        {activeTab === 'ratios' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SectionCard title="Financial Ratios & Working Capital" subtitle="Dec 31, 2024 | Gray bar = benchmark">
              <RatiosPanel />
            </SectionCard>
            <div className="space-y-6">
              <SectionCard title="Quarterly Revenue vs EBITDA" subtitle="8-quarter view">
                <QuarterlyChart />
              </SectionCard>
              <SectionCard title="Revenue Mix by Segment" subtitle="FY2024">
                <RevenuePieChart type="segment" />
              </SectionCard>
            </div>
          </div>
        )}

        {/* ── SaaS & Productivity Tab ── */}
        {activeTab === 'saas' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SectionCard title="SaaS KPIs & Unit Economics" subtitle="Acme Technologies — Enterprise SaaS benchmarks">
              <SaaSMetricsPanel />
            </SectionCard>
            <div className="space-y-6">
              <SectionCard title="Revenue by Geography" subtitle="FY2024">
                <RevenuePieChart type="geo" />
              </SectionCard>
              <SectionCard title="Budget Variance" subtitle="Key financial line items">
                <BudgetVarianceChart />
              </SectionCard>
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <footer className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
          <p>
            {company.name} &mdash; CFO Financial Dashboard &mdash; <strong>Demo Data Only</strong> &mdash;
            All figures are fictional and for demonstration purposes only.
          </p>
          <p className="mt-1">Reporting Period: {company.reportingPeriod} &mdash; Generated: {company.reportDate}</p>
        </footer>
      </main>
    </div>
  );
}
