'use client';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  badge?: { label: string; positive: boolean };
  badge2?: { label: string; positive: boolean };
  icon: React.ReactNode;
  accentColor: string;
  onClick?: () => void;
  active?: boolean;
}

const borderColorMap: Record<string, string> = {
  'bg-blue-500': 'border-blue-500',
  'bg-emerald-500': 'border-emerald-500',
  'bg-purple-500': 'border-purple-500',
  'bg-teal-500': 'border-teal-500',
  'bg-amber-500': 'border-amber-500',
  'bg-indigo-500': 'border-indigo-500',
  'bg-rose-500': 'border-rose-500',
  'bg-orange-500': 'border-orange-500',
};

export default function KPICard({
  title,
  value,
  subtitle,
  badge,
  badge2,
  icon,
  accentColor,
  onClick,
  active,
}: KPICardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border border-slate-800 bg-slate-900/85 p-5 text-left shadow-lg shadow-black/10 transition-all duration-200 hover:border-slate-700 hover:shadow-xl hover:shadow-black/10 focus:outline-none ${
        active
          ? `border-2 ${borderColorMap[accentColor] ?? accentColor}`
          : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-slate-50">{value}</p>
          {subtitle && <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {badge && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  badge.positive
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'bg-red-500/15 text-red-300'
                }`}
              >
                {badge.positive ? '▲' : '▼'} {badge.label}
              </span>
            )}
            {badge2 && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  badge2.positive
                    ? 'bg-blue-500/15 text-blue-300'
                    : 'bg-orange-500/15 text-orange-300'
                }`}
              >
                {badge2.positive ? '↑' : '↓'} {badge2.label}
              </span>
            )}
          </div>
        </div>
        <div className={`rounded-xl border border-white/5 p-2.5 ${accentColor} bg-opacity-10`}>
          {icon}
        </div>
      </div>
    </button>
  );
}
