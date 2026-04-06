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
      className={`text-left w-full rounded-2xl bg-white border transition-all duration-200 p-5 shadow-sm hover:shadow-md focus:outline-none ${
        active
          ? `border-2 ${borderColorMap[accentColor] ?? accentColor}`
          : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {badge && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  badge.positive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {badge.positive ? '▲' : '▼'} {badge.label}
              </span>
            )}
            {badge2 && (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                  badge2.positive
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-orange-50 text-orange-700'
                }`}
              >
                {badge2.positive ? '↑' : '↓'} {badge2.label}
              </span>
            )}
          </div>
        </div>
        <div className={`rounded-xl p-2.5 ${accentColor} bg-opacity-10`}>
          {icon}
        </div>
      </div>
    </button>
  );
}
