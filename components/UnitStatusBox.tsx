/* eslint-disable @next/next/no-img-element */
import { BattleUnit } from '@/lib/battleTypes';
import { StatBar } from './ui/StatBar';
import { COLORS } from '@/lib/design-tokens';

export function UnitStatusBox({ unit, onClick, interactive, isItemSelected }: { unit?: BattleUnit, onClick?: () => void, interactive?: boolean, isItemSelected?: boolean }) {
  if (!unit) {
    return <div className="border-2 border-zinc-800/50 bg-zinc-900/50 rounded-lg" />;
  }

  const isBbReady = unit.bbGauge >= unit.maxBb;

  return (
    <div 
      onClick={onClick}
      className={`relative border-2 ${unit.queuedBb ? 'border-yellow-400' : 'border-[#b89947]'} rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 p-1.5 flex items-center gap-2 ${interactive && (isBbReady || isItemSelected) ? 'cursor-pointer hover:brightness-110' : ''} ${unit.isDead ? 'opacity-50 grayscale' : ''}`}
    >
      {/* Thumbnail */}
      <div className="w-12 h-12 bg-zinc-800 rounded border border-zinc-600 shrink-0 relative overflow-hidden">
        <img 
          src={unit.template.spriteUrl} 
          className="w-full h-full object-cover scale-[2.5] origin-[50%_20%]" 
          style={{ imageRendering: 'pixelated' }} 
          alt={`${unit.template.name} portrait`}
        />
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
        <div className="text-[11px] font-bold text-white truncate drop-shadow-md leading-none">{unit.template.name}</div>
        
        <StatBar current={unit.hp} max={unit.maxHp} type="hp" size="sm" />
        <StatBar current={unit.bbGauge} max={unit.maxBb} type="bb" size="sm" />
      </div>
      
      {/* Element Icon */}
      <div className="absolute top-1 right-1 text-[8px] font-bold px-1 rounded bg-black/50 text-white border border-zinc-700">
        {unit.template.element.substring(0, 3).toUpperCase()}
      </div>
    </div>
  );
}
