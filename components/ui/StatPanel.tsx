import { COLORS, BORDERS, TYPOGRAPHY } from '@/lib/design-tokens';
import { StatBar } from './StatBar';

interface StatPanelProps {
  stats: {
    hp: number;
    atk: number;
    def: number;
    rec: number;
  };
  equipmentBonuses?: {
    hp?: number;
    atk?: number;
    def?: number;
    rec?: number;
  };
  level: number;
  maxLevel: number;
  exp?: number;
  maxExp?: number;
  element?: string;
  rarity?: number;
  className?: string;
}

export function StatPanel({
  stats,
  equipmentBonuses,
  level,
  maxLevel,
  exp,
  maxExp,
  element,
  rarity,
  className = ''
}: StatPanelProps) {
  const totalHp = stats.hp + (equipmentBonuses?.hp || 0);
  const totalAtk = stats.atk + (equipmentBonuses?.atk || 0);
  const totalDef = stats.def + (equipmentBonuses?.def || 0);
  const totalRec = stats.rec + (equipmentBonuses?.rec || 0);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Header: Level + Element/Rarity */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded ${BORDERS.radius.sm} border ${COLORS.text.primary} ${TYPOGRAPHY.size.base} font-bold`}>
            Lv.{level}/{maxLevel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {element && (
            <span className={COLORS.element[element as keyof typeof COLORS.element] || 'text-zinc-400'}>
              {element}
            </span>
          )}
          {rarity && (
            <span className="text-yellow-400 text-sm">
              {'★'.repeat(Math.min(rarity, 5))}
            </span>
          )}
        </div>
      </div>

      {/* EXP Bar */}
      {exp !== undefined && maxExp !== undefined && maxExp > 0 && (
        <div className="flex flex-col gap-1">
          <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Experience</div>
          <StatBar current={exp} max={maxExp} type="exp" size="sm" />
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        <StatRow label="HP" value={totalHp} base={stats.hp} bonus={equipmentBonuses?.hp} color="text-green-400" />
        <StatRow label="ATK" value={totalAtk} base={stats.atk} bonus={equipmentBonuses?.atk} color="text-red-400" />
        <StatRow label="DEF" value={totalDef} base={stats.def} bonus={equipmentBonuses?.def} color="text-blue-400" />
        <StatRow label="REC" value={totalRec} base={stats.rec} bonus={equipmentBonuses?.rec} color="text-yellow-400" />
      </div>
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: number;
  base: number;
  bonus?: number;
  color: string;
}

function StatRow({ label, value, base, bonus, color }: StatRowProps) {
  const hasBonus = bonus && bonus > 0;
  
  return (
    <div className={`flex items-center justify-between ${BORDERS.radius.md} bg-zinc-800/50 px-2 py-1.5`}>
      <span className={`${TYPOGRAPHY.size.base} text-zinc-400 uppercase`}>{label}</span>
      <div className="flex items-center gap-1">
        <span className={`${TYPOGRAPHY.size.lg} font-mono font-bold ${color}`}>
          {value.toLocaleString()}
        </span>
        {hasBonus && (
          <span className="text-[10px] text-emerald-400">
            +{bonus}
          </span>
        )}
      </div>
    </div>
  );
}