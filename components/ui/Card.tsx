import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = false, className, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl transition-all';
    
    const variantStyles = {
      default: 'bg-zinc-900 border border-zinc-800/50',
      elevated: 'bg-zinc-800 shadow-lg shadow-zinc-900/50',
      outlined: 'bg-transparent border-2 border-zinc-700',
    };

    const hoverStyles = hover ? 'hover:shadow-lg hover:shadow-amber-500/20 hover:border-amber-500/30' : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`px-4 py-3 border-b border-zinc-800/50 ${className || ''}`} {...props} />
);

export const CardBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 ${className || ''}`} {...props} />
);

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`px-4 py-3 border-t border-zinc-800/50 flex gap-2 ${className || ''}`} {...props} />
);
