import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-zinc-800 text-zinc-100',
      success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
      info: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${variantStyles[variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
