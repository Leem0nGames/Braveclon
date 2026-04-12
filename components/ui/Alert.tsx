import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  closeable?: boolean;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, closeable = false, onClose, className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(true);

    const variantStyles = {
      info: {
        bg: 'bg-cyan-500/10 border-cyan-500/30',
        icon: Info,
        color: 'text-cyan-400',
        title: 'text-cyan-300',
      },
      success: {
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        icon: CheckCircle,
        color: 'text-emerald-400',
        title: 'text-emerald-300',
      },
      warning: {
        bg: 'bg-amber-500/10 border-amber-500/30',
        icon: AlertTriangle,
        color: 'text-amber-400',
        title: 'text-amber-300',
      },
      error: {
        bg: 'bg-red-500/10 border-red-500/30',
        icon: AlertCircle,
        color: 'text-red-400',
        title: 'text-red-300',
      },
    };

    const styles = variantStyles[variant];
    const Icon = styles.icon;

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={`border rounded-lg p-4 flex gap-3 ${styles.bg} ${className || ''}`}
        {...props}
      >
        <Icon className={`flex-shrink-0 ${styles.color}`} size={20} />
        <div className="flex-1">
          {title && <h4 className={`font-semibold ${styles.title} mb-1`}>{title}</h4>}
          <p className="text-sm text-zinc-300">{children}</p>
        </div>
        {closeable && (
          <button
            onClick={() => {
              setIsOpen(false);
              onClose?.();
            }}
            className="text-zinc-500 hover:text-zinc-300 ml-2"
            aria-label="Close alert"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
