import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, variant = 'default', showLabel = false, className, ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100);

    const variantStyles = {
      default: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      success: 'bg-gradient-to-r from-emerald-500 to-green-500',
      warning: 'bg-gradient-to-r from-amber-500 to-orange-500',
      danger: 'bg-gradient-to-r from-red-500 to-rose-500',
    };

    return (
      <div ref={ref} className={`w-full ${className || ''}`} {...props}>
        <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
          <div
            className={`h-full ${variantStyles[variant]} transition-all duration-300 rounded-full shadow-lg shadow-current/30`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <div className="text-xs text-zinc-400 mt-1 text-center">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
