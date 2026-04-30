interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export default function SectionCard({ title, subtitle, children, className = '', action }: SectionCardProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/85 shadow-xl shadow-black/10 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 px-6 pt-5 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6 pt-4">{children}</div>
    </div>
  );
}
