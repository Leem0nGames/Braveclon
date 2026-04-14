import { motion } from 'motion/react';
import { COLORS, BORDERS, TYPOGRAPHY, ANIMATION } from '@/lib/design-tokens';

interface StatBarProps {
  current: number;
  max: number;
  type: 'hp' | 'bb' | 'exp';
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  compact?: boolean;
}

const SIZES = {
  sm: { bar: 'h-1.5', container: 'h-2' },
  md: { bar: 'h-2.5', container: 'h-3.5' },
  lg: { bar: 'h-3', container: 'h-4' },
};

export function StatBar({ 
  current, 
  max, 
  type, 
  showLabel = false, 
  label,
  size = 'md',
  animated = true,
  compact = false 
}: StatBarProps) {
  const percent = Math.min(100, Math.max(0, (current / max) * 100));
  
  const getBarColors = () => {
    if (type === 'hp') {
      if (percent <= 25) return 'bg-gradient-to-b from-red-500 to-red-700';
      if (percent <= 50) return 'bg-gradient-to-b from-yellow-500 to-yellow-600';
      return COLORS.hp.bar;
    }
    if (type === 'bb') {
      if (percent >= 100) return `${COLORS.bb.ready} ${ANIMATION.pulse}`;
      return COLORS.bb.charge;
    }
    if (type === 'exp') {
      return 'bg-gradient-to-b from-green-400 to-emerald-600';
    }
    return 'bg-gradient-to-b from-blue-400 to-blue-600';
  };

  return (
    <div className={`w-full relative ${BORDERS.radius.full} ${COLORS.hp.barBg} border border-zinc-900 overflow-hidden ${compact ? '' : SIZES[size].container}`}>
      <motion.div
        initial={animated ? { width: 0 } : undefined}
        animate={{ width: `${percent}%` }}
        transition={animated ? { duration: 0.3, ease: 'easeOut' } : undefined}
        className={`h-full ${getBarColors()}`}
      />
      {!compact && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${TYPOGRAPHY.size.sm} font-bold text-white drop-shadow-md ${type === 'hp' ? 'text-[9px]' : 'text-[8px]'}`}>
            {type === 'hp' ? `${Math.ceil(current)}/${max}` : type === 'bb' ? `${Math.round(percent)}%` : `${Math.round(percent)}%`}
          </span>
        </div>
      )}
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  showPercent?: boolean;
  glow?: boolean;
}

export function ProgressBar({ 
  progress, 
  color = 'bg-blue-500',
  height = 'md',
  showPercent = false,
  glow = false
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, progress));
  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3' };

  return (
    <div className={`w-full ${BORDERS.radius.full} bg-zinc-950 overflow-hidden`}>
      <div className={`${heights[height]} w-full relative`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className={`h-full ${color} ${glow ? 'shadow-lg' : ''}`}
        />
        {showPercent && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">{Math.round(percent)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

