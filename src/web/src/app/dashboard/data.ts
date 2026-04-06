// CFO Financial Dashboard — Demo Data
// Company: Acme Technologies (fictional B2B SaaS)
// Fiscal Year: 2024 | Currency: USD (Millions)

export const company = {
  name: 'Acme Technologies',
  ticker: 'ACME',
  industry: 'Enterprise SaaS',
  reportingPeriod: 'FY 2024 — Q4',
  currency: 'USD',
  employees: 624,
  reportDate: 'December 31, 2024',
};

// ─── Monthly P&L (Jan–Dec 2024) ─────────────────────────────────────────────
export const monthlyPL = [
  { month: 'Jan', revenue: 13.2, cogs: 3.6, grossProfit: 9.6, opex: 6.8, ebitda: 2.1, netIncome: 1.3 },
  { month: 'Feb', revenue: 13.8, cogs: 3.7, grossProfit: 10.1, opex: 7.0, ebitda: 2.4, netIncome: 1.5 },
  { month: 'Mar', revenue: 14.5, cogs: 3.9, grossProfit: 10.6, opex: 7.2, ebitda: 2.7, netIncome: 1.8 },
  { month: 'Apr', revenue: 14.9, cogs: 4.0, grossProfit: 10.9, opex: 7.1, ebitda: 3.1, netIncome: 2.0 },
  { month: 'May', revenue: 15.4, cogs: 4.1, grossProfit: 11.3, opex: 7.3, ebitda: 3.3, netIncome: 2.2 },
  { month: 'Jun', revenue: 16.1, cogs: 4.3, grossProfit: 11.8, opex: 7.5, ebitda: 3.6, netIncome: 2.4 },
  { month: 'Jul', revenue: 15.8, cogs: 4.2, grossProfit: 11.6, opex: 7.6, ebitda: 3.3, netIncome: 2.1 },
  { month: 'Aug', revenue: 16.3, cogs: 4.3, grossProfit: 12.0, opex: 7.7, ebitda: 3.6, netIncome: 2.3 },
  { month: 'Sep', revenue: 17.0, cogs: 4.5, grossProfit: 12.5, opex: 7.9, ebitda: 3.9, netIncome: 2.6 },
  { month: 'Oct', revenue: 17.4, cogs: 4.6, grossProfit: 12.8, opex: 8.0, ebitda: 4.1, netIncome: 2.7 },
  { month: 'Nov', revenue: 17.9, cogs: 4.7, grossProfit: 13.2, opex: 8.1, ebitda: 4.4, netIncome: 2.9 },
  { month: 'Dec', revenue: 18.6, cogs: 4.9, grossProfit: 13.7, opex: 8.3, ebitda: 4.7, netIncome: 3.1 },
];

// ─── Monthly Cash Flow ────────────────────────────────────────────────────────
export const monthlyCashFlow = [
  { month: 'Jan', operatingCF: 2.4, capex: -0.8, freeCF: 1.6, endingCash: 72.4 },
  { month: 'Feb', operatingCF: 2.7, capex: -0.7, freeCF: 2.0, endingCash: 74.4 },
  { month: 'Mar', operatingCF: 3.1, capex: -1.1, freeCF: 2.0, endingCash: 76.4 },
  { month: 'Apr', operatingCF: 3.4, capex: -0.9, freeCF: 2.5, endingCash: 78.9 },
  { month: 'May', operatingCF: 3.6, capex: -0.8, freeCF: 2.8, endingCash: 81.7 },
  { month: 'Jun', operatingCF: 3.9, capex: -1.3, freeCF: 2.6, endingCash: 84.3 },
  { month: 'Jul', operatingCF: 3.5, capex: -0.7, freeCF: 2.8, endingCash: 87.1 },
  { month: 'Aug', operatingCF: 3.8, capex: -0.9, freeCF: 2.9, endingCash: 90.0 },
  { month: 'Sep', operatingCF: 4.2, capex: -1.0, freeCF: 3.2, endingCash: 93.2 },
  { month: 'Oct', operatingCF: 4.4, capex: -0.8, freeCF: 3.6, endingCash: 96.8 },
  { month: 'Nov', operatingCF: 4.7, capex: -1.1, freeCF: 3.6, endingCash: 100.4 },
  { month: 'Dec', operatingCF: 5.1, capex: -1.2, freeCF: 3.9, endingCash: 104.3 },
];

// ─── Annual Summary KPIs ──────────────────────────────────────────────────────
export const annualKPIs = {
  revenue: {
    actual: 190.9,
    budget: 185.0,
    priorYear: 156.4,
    unit: '$M',
    growth: 22.1,   // % YoY
    vsbudget: 3.2,  // % vs budget
  },
  grossProfit: {
    actual: 140.1,
    budget: 134.5,
    margin: 73.4,   // %
    priorYearMargin: 71.8,
    unit: '$M',
  },
  ebitda: {
    actual: 37.2,
    budget: 35.0,
    margin: 19.5,   // %
    priorYearMargin: 17.2,
    unit: '$M',
  },
  netIncome: {
    actual: 26.9,
    budget: 24.0,
    margin: 14.1,   // %
    priorYearMargin: 11.9,
    unit: '$M',
  },
  freeCashFlow: {
    actual: 32.5,
    budget: 29.0,
    conversionRate: 87.4,  // FCF / Net Income %
    unit: '$M',
  },
  cash: {
    ending: 104.3,
    beginning: 70.8,
    change: 33.5,
    unit: '$M',
  },
};

// ─── Annual P&L Statement ─────────────────────────────────────────────────────
export const annualPL = {
  revenue: { actual: 190.9, budget: 185.0, priorYear: 156.4 },
  cogs: { actual: 50.8, budget: 50.5, priorYear: 44.2 },
  grossProfit: { actual: 140.1, budget: 134.5, priorYear: 112.2 },
  salesMarketing: { actual: 42.0, budget: 43.0, priorYear: 37.5 },
  researchDev: { actual: 31.5, budget: 32.0, priorYear: 25.0 },
  generalAdmin: { actual: 29.4, budget: 24.5, priorYear: 22.4 },
  totalOpex: { actual: 102.9, budget: 99.5, priorYear: 84.9 },
  ebitda: { actual: 37.2, budget: 35.0, priorYear: 27.3 },
  depreciationAmort: { actual: 4.8, budget: 4.5, priorYear: 3.9 },
  ebit: { actual: 32.4, budget: 30.5, priorYear: 23.4 },
  interestExpense: { actual: -1.9, budget: -2.0, priorYear: -2.1 },
  otherIncome: { actual: 1.2, budget: 0.5, priorYear: 0.8 },
  ebt: { actual: 31.7, budget: 29.0, priorYear: 22.1 },
  taxes: { actual: 4.8, budget: 5.0, priorYear: 3.5 },
  netIncome: { actual: 26.9, budget: 24.0, priorYear: 18.6 },
};

// ─── Balance Sheet Snapshot (Dec 31, 2024) ───────────────────────────────────
export const balanceSheet = {
  assets: {
    cash: 104.3,
    accountsReceivable: 22.6,
    prepaidExpenses: 5.1,
    otherCurrentAssets: 3.8,
    totalCurrentAssets: 135.8,
    ppe: 18.4,
    intangibles: 31.5,
    goodwill: 45.0,
    otherLongTermAssets: 8.2,
    totalAssets: 238.9,
  },
  liabilities: {
    accountsPayable: 8.4,
    accruedLiabilities: 12.1,
    deferredRevenue: 28.7,
    currentPortionDebt: 5.0,
    totalCurrentLiabilities: 54.2,
    longTermDebt: 35.0,
    otherLongTermLiabilities: 6.3,
    totalLiabilities: 95.5,
  },
  equity: {
    commonStock: 0.1,
    addlPaidInCapital: 118.4,
    retainedEarnings: 24.9,
    totalEquity: 143.4,
  },
};

// ─── Liquidity & Leverage Ratios ──────────────────────────────────────────────
export const ratios = {
  currentRatio: { value: 2.51, benchmark: 2.0, status: 'good' },
  quickRatio: { value: 2.40, benchmark: 1.5, status: 'good' },
  debtToEquity: { value: 0.28, benchmark: 0.5, status: 'good' },
  netDebtEbitda: { value: -1.87, benchmark: 2.0, status: 'good' },  // net cash position
  interestCoverage: { value: 17.1, benchmark: 5.0, status: 'good' },
  assetTurnover: { value: 0.80, benchmark: 0.6, status: 'good' },
  returnOnEquity: { value: 18.7, benchmark: 15.0, status: 'good' },
  returnOnAssets: { value: 11.3, benchmark: 8.0, status: 'good' },
};

// ─── Working Capital Metrics ──────────────────────────────────────────────────
export const workingCapital = {
  dso: { value: 43, benchmark: 45, trend: -2, unit: 'days', status: 'good' },
  dpo: { value: 38, benchmark: 30, trend: +3, unit: 'days', status: 'good' },
  dio: { value: 0, benchmark: 0, unit: 'days', status: 'good' },  // SaaS — no inventory
  ccc: { value: 5, benchmark: 15, trend: -5, unit: 'days', status: 'good' },  // DSO - DPO
  workingCapital: { value: 81.6, change: 12.4, unit: '$M' },
};

// ─── Revenue by Segment ───────────────────────────────────────────────────────
export const revenueBySegment = [
  { name: 'Enterprise', value: 98.5, pct: 51.6, color: '#3B82F6' },
  { name: 'Mid-Market', value: 57.3, pct: 30.0, color: '#10B981' },
  { name: 'SMB', value: 22.8, pct: 11.9, color: '#F59E0B' },
  { name: 'Professional Services', value: 12.3, pct: 6.5, color: '#8B5CF6' },
];

// ─── Revenue by Geography ─────────────────────────────────────────────────────
export const revenueByGeo = [
  { name: 'North America', value: 114.5, pct: 60.0, color: '#3B82F6' },
  { name: 'Europe', value: 45.8, pct: 24.0, color: '#10B981' },
  { name: 'Asia Pacific', value: 22.9, pct: 12.0, color: '#F59E0B' },
  { name: 'Rest of World', value: 7.7, pct: 4.0, color: '#EF4444' },
];

// ─── Headcount & Productivity ────────────────────────────────────────────────
export const headcount = {
  total: 624,
  revenuePerEmployee: 0.306,   // $M per employee
  ebitdaPerEmployee: 0.060,
  engineering: 248,
  salesMarketing: 156,
  generalAdmin: 94,
  customerSuccess: 126,
};

// ─── Budget vs Actual (key line items) ────────────────────────────────────────
export const budgetVsActual = [
  { category: 'Revenue',      actual: 190.9, budget: 185.0, variance: 5.9,  pct: 3.2 },
  { category: 'Gross Profit', actual: 140.1, budget: 134.5, variance: 5.6,  pct: 4.2 },
  { category: 'S&M Expense',  actual: -42.0, budget: -43.0, variance: 1.0,  pct: 2.3 },
  { category: 'R&D Expense',  actual: -31.5, budget: -32.0, variance: 0.5,  pct: 1.6 },
  { category: 'G&A Expense',  actual: -29.4, budget: -24.5, variance: -4.9, pct: -20.0 },
  { category: 'EBITDA',       actual: 37.2,  budget: 35.0,  variance: 2.2,  pct: 6.3 },
  { category: 'Net Income',   actual: 26.9,  budget: 24.0,  variance: 2.9,  pct: 12.1 },
  { category: 'Free Cash Flow', actual: 32.5, budget: 29.0, variance: 3.5,  pct: 12.1 },
];

// ─── Quarterly Performance ────────────────────────────────────────────────────
export const quarterlyData = [
  { quarter: 'Q1 2023', revenue: 34.8, ebitda: 4.2, netIncome: 2.8, fcf: 6.1 },
  { quarter: 'Q2 2023', revenue: 37.4, ebitda: 5.1, netIncome: 3.5, fcf: 7.2 },
  { quarter: 'Q3 2023', revenue: 39.6, ebitda: 6.8, netIncome: 4.8, fcf: 8.0 },
  { quarter: 'Q4 2023', revenue: 44.6, ebitda: 11.2, netIncome: 7.5, fcf: 9.8 },
  { quarter: 'Q1 2024', revenue: 41.5, ebitda: 7.2, netIncome: 4.6, fcf: 6.1 },
  { quarter: 'Q2 2024', revenue: 46.4, ebitda: 10.0, netIncome: 6.6, fcf: 7.9 },
  { quarter: 'Q3 2024', revenue: 51.7, ebitda: 10.9, netIncome: 7.0, fcf: 9.7 },
  { quarter: 'Q4 2024', revenue: 51.3, ebitda: 9.1, netIncome: 8.7, fcf: 8.8 },
];

// ─── ARR / SaaS Metrics ──────────────────────────────────────────────────────
export const saasMetrics = {
  arr: 223.2,    // $M - run rate
  nrr: 118,      // Net Revenue Retention %
  grr: 94,       // Gross Revenue Retention %
  cac: 28500,    // $ Customer Acquisition Cost
  ltv: 285000,   // $ Lifetime Value
  ltvCacRatio: 10.0,
  paybackMonths: 14,
  magicNumber: 1.2,
};

export type SegmentData = typeof revenueBySegment[0];
export type MonthlyPLRow = typeof monthlyPL[0];
export type MonthlyCFRow = typeof monthlyCashFlow[0];
