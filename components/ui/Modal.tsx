'use client';
import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { COLORS, BORDERS, TYPOGRAPHY } from '@/lib/design-tokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  variant?: 'default' | 'success' | 'error' | 'info';
  showClose?: boolean;
  className?: string;
}

const VARIANTS = {
  default: COLORS.border.default,
  success: 'border-emerald-500/50',
  error: 'border-red-500/50',
  info: 'border-blue-500/50',
};

export function Modal({ isOpen, onClose, title, children, variant = 'default', showClose = true, className = '' }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`bg-zinc-900 border ${VARIANTS[variant]} rounded-3xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-2xl ${className}`}
          >
            {title && (
              <h2 className={`${TYPOGRAPHY.font.heading} text-xl text-white mb-4`}>
                {title}
              </h2>
            )}
            {children}
            {showClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ModalCloseButton({ onClick, label = 'CLOSE' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 ${COLORS.button.secondary} ${BORDERS.radius.lg} ${TYPOGRAPHY.font.body} tracking-wider transition-colors mt-4`}
    >
      {label}
    </button>
  );
}

export function ModalActionButton({ 
  onClick, 
  label, 
  variant = 'primary',
  disabled 
}: { 
  onClick: () => void; 
  label: string; 
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}) {
  const variants = {
    primary: COLORS.button.primary,
    secondary: COLORS.button.secondary,
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 ${variants[variant]} ${BORDERS.radius.lg} font-bold tracking-wider transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'} ${TYPOGRAPHY.font.body}`}
    >
      {label}
    </button>
  );
}