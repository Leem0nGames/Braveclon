import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { COLORS, BORDERS, TYPOGRAPHY } from '@/lib/design-tokens';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const VARIANTS = {
  primary: `${COLORS.button.primary} text-zinc-950`,
  secondary: COLORS.button.secondary,
  danger: COLORS.button.danger,
  success: COLORS.button.success,
  ghost: 'bg-transparent hover:bg-zinc-800 text-zinc-300 hover:text-white',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const ICON_SIZES = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      className={`
        inline-flex items-center justify-center gap-2 font-bold tracking-wider transition-all
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${BORDERS.radius.lg}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
        ${className}
      `}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  );
}

interface IconButtonProps {
  icon: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  badge?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function IconButton({
  icon,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  badge,
  onClick,
  className = ''
}: IconButtonProps) {
  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const variants = {
    primary: COLORS.button.primary,
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700',
    ghost: 'bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white',
  };

  return (
    <motion.button
      onClick={onClick}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center rounded-lg transition-all
        ${sizes[size]}
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <span style={{ fontSize: iconSizes[size] }}>{icon}</span>
      {badge && (
        <span className="absolute -top-1 -right-1">{badge}</span>
      )}
    </motion.button>
  );
}

interface ButtonGroupProps {
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ButtonGroup({
  children,
  orientation = 'horizontal',
  gap = 'md',
  className = ''
}: ButtonGroupProps) {
  const gaps = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-4',
  };

  return (
    <div className={`flex ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'} ${gaps[gap]} ${className}`}>
      {children}
    </div>
  );
}