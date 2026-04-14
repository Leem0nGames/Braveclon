import { ReactNode } from 'react';
import { COLORS, BORDERS, TYPOGRAPHY } from '@/lib/design-tokens';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'rarity' | 'element' | 'status' | 'info';
  rarity?: number;
  element?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RARITY_COLORS = {
  1: 'border-zinc-500 text-zinc-300 bg-zinc-800',
  2: 'border-green-500 text-green-300 bg-green-900/30',
  3: 'border-blue-500 text-blue-300 bg-blue-900/30',
  4: 'border-purple-500 text-purple-300 bg-purple-900/30',
  5: 'border-yellow-500 text-yellow-300 bg-yellow-900/30',
};

const ELEMENT_COLORS = {
  Fire: 'border-red-500 text-red-300 bg-red-900/30',
  Water: 'border-blue-500 text-blue-300 bg-blue-900/30',
  Earth: 'border-green-500 text-green-300 bg-green-900/30',
  Thunder: 'border-yellow-500 text-yellow-300 bg-yellow-900/30',
  Light: 'border-yellow-200 text-yellow-200 bg-yellow-900/30',
  Dark: 'border-purple-500 text-purple-300 bg-purple-900/30',
};

const STATUS_COLORS = {
  ready: 'border-yellow-500 text-yellow-300 bg-yellow-900/30',
  fullHp: 'border-green-500 text-green-300 bg-green-900/30',
  lowHp: 'border-red-500 text-red-300 bg-red-900/30',
  dead: 'border-zinc-500 text-zinc-400 bg-zinc-800/50 grayscale',
  heal: 'border-emerald-400 text-emerald-300 bg-emerald-900/30',
};

const SIZES = {
  sm: 'px-1 py-0.5 text-[8px]',
  md: 'px-2 py-1 text-[10px]',
  lg: 'px-3 py-1.5 text-xs',
};

export function Badge({ children, variant = 'default', rarity, element, size = 'md', className = '' }: BadgeProps) {
  let colorClass = '';
  
  if (variant === 'rarity' && rarity) {
    colorClass = RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] || RARITY_COLORS[1];
  } else if (variant === 'element' && element) {
    colorClass = ELEMENT_COLORS[element as keyof typeof ELEMENT_COLORS] || ELEMENT_COLORS.Fire;
  } else if (variant === 'status' && typeof children === 'string') {
    const statusKey = children.toLowerCase().replace(' ', '') as keyof typeof STATUS_COLORS;
    colorClass = STATUS_COLORS[statusKey] || '';
  } else {
    colorClass = 'border-zinc-600 text-zinc-300 bg-zinc-800';
  }

  return (
    <span className={`font-bold border ${BORDERS.radius.sm} ${SIZES[size]} ${colorClass} ${className}`}>
      {children}
    </span>
  );
}

export function RarityBadge({ rarity, showLabel = false, size = 'sm' }: { rarity: number; showLabel?: boolean; size?: 'sm' | 'md' }) {
  const stars = '★'.repeat(rarity);
  return (
    <span className={RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] || RARITY_COLORS[1]}>
      {stars}
      {showLabel && <span className="ml-1">{rarity}</span>}
    </span>
  );
}

export function ElementBadge({ element, size = 'sm' }: { element: string; size?: 'sm' | 'md' }) {
  return (
    <Badge variant="element" element={element} size={size}>
      {element.substring(0, 3).toUpperCase()}
    </Badge>
  );
}

export function LevelBadge({ level, max }: { level: number; max?: number }) {
  return (
    <span className="bg-black/70 px-1.5 py-0.5 rounded text-[8px] font-bold text-white">
      Lv.{level}
      {max && <span className="text-zinc-500">/{max}</span>}
    </span>
  );
}

export function LeaderBadge() {
  return (
    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-lg z-10">
      L
    </span>
  );
}

export function TeamBadge() {
  return (
    <span className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center text-[8px] font-bold text-yellow-400">
      TEAM
    </span>
  );
}

export function StatBadge({ label, value, color = 'text-white' }: { label: string; value: number | string; color?: string }) {
  return (
    <span className={`text-[10px] font-mono ${color}`}>
      {label}:{value}
    </span>
  );
}