import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'ghost' | 'danger' | 'subtle';

const variants: Record<Variant, string> = {
  primary: 'bg-maroon-800 text-cream-50 hover:bg-maroon-900 shadow-sm',
  ghost: 'bg-transparent text-maroon-800 hover:bg-maroon-50',
  danger: 'bg-transparent text-red-700 hover:bg-red-50',
  subtle: 'bg-cream-100 text-maroon-900 hover:bg-cream-200 border border-cream-200',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export function Button({ variant = 'primary', loading, children, className = '', disabled, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-20 text-maroon-700">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'amber' | 'red' }) {
  const tones = {
    neutral: 'bg-cream-200 text-maroon-900',
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-800',
  } as const;
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-maroon-950">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-maroon-700/70">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-cream-200 bg-white/50 py-16 text-center text-sm text-maroon-700/60">
      {message}
    </div>
  );
}
