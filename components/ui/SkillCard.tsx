import { COLORS, BORDERS, TYPOGRAPHY } from '@/lib/design-tokens';
import { Skill, LeaderSkill } from '@/lib/gameData';

interface SkillCardProps {
  skill: Skill | null | undefined;
  type?: 'brave' | 'leader' | 'extra';
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const SKILL_TYPE_COLORS = {
  brave: 'from-blue-500 to-blue-700',
  leader: 'from-purple-500 to-purple-700',
  extra: 'from-green-500 to-green-700',
};

const SKILL_TYPE_LABELS = {
  brave: 'Brave Burst',
  leader: 'Leader Skill',
  extra: 'Extra Skill',
};

export function SkillCard({ skill, type = 'brave', isActive, onClick, className = '' }: SkillCardProps) {
  if (!skill) {
    return (
      <div className={`${BORDERS.radius.lg} bg-zinc-900/50 border border-dashed border-zinc-700 p-3 flex items-center justify-center ${className}`}>
        <span className="text-zinc-500 text-xs uppercase">No Skill</span>
      </div>
    );
  }

  const getTargetLabel = () => {
    switch (skill.target) {
      case 'self': return 'Self';
      case 'ally': return 'Single Ally';
      case 'all_allies': return 'All Allies';
      case 'enemy': return 'Single Enemy';
      case 'all_enemies': return 'All Enemies';
      default: return 'Single Enemy';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`
        ${BORDERS.radius.lg} border overflow-hidden flex flex-col gap-1
        ${onClick ? 'cursor-pointer hover:brightness-110' : ''}
        bg-zinc-900 border-zinc-700
        ${className}
      `}
    >
      {/* Header with type */}
      <div className={`px-2 py-1 bg-gradient-to-r ${SKILL_TYPE_COLORS[type]} flex items-center justify-between`}>
        <span className={`text-[10px] font-bold text-white uppercase tracking-wider`}>
          {SKILL_TYPE_LABELS[type]}
        </span>
        {skill.cost > 0 && (
          <span className="text-[10px] font-bold text-white bg-black/30 px-1.5 py-0.5 rounded">
            {skill.cost} BC
          </span>
        )}
      </div>

      {/* Skill Info */}
      <div className="px-2 py-1.5 flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white truncate">{skill.name}</span>
          {type === 'brave' && isActive && (
            <span className="text-[10px] font-bold text-yellow-400 animate-pulse">READY</span>
          )}
        </div>
        
        <div className="text-[10px] text-zinc-400">
          {getTargetLabel()} · {skill.type === 'damage' ? `=${Math.round(skill.power * 100)}% DMG` : skill.type === 'heal' ? `+${Math.round(skill.power * 100)}% Heal` : skill.type === 'buff' ? 'Buff' : ''}
        </div>
        
        <p className="text-[9px] text-zinc-500 line-clamp-2">{skill.description}</p>
      </div>
    </div>
  );
}

interface LeaderSkillDisplayProps {
  skill: LeaderSkill | null | undefined;
  isActive?: boolean;
  className?: string;
}

export function LeaderSkillDisplay({ skill, isActive, className = '' }: LeaderSkillDisplayProps) {
  if (!skill) {
    return (
      <div className={`${BORDERS.radius.lg} bg-zinc-900/50 border border-dashed border-zinc-700 p-3 flex items-center justify-center ${className}`}>
        <span className="text-zinc-500 text-xs uppercase">No Leader Skill</span>
      </div>
    );
  }

  const getBoostDescription = () => {
    const parts: string[] = [];
    if (skill.statBoost) {
      if (skill.statBoost.hp) parts.push(`+${Math.round(skill.statBoost.hp * 100)}% HP`);
      if (skill.statBoost.atk) parts.push(`+${Math.round(skill.statBoost.atk * 100)}% ATK`);
      if (skill.statBoost.def) parts.push(`+${Math.round(skill.statBoost.def * 100)}% DEF`);
      if (skill.statBoost.rec) parts.push(`+${Math.round(skill.statBoost.rec * 100)}% REC`);
    }
    if (skill.elementBoost) {
      Object.entries(skill.elementBoost).forEach(([elem, boost]) => {
        if (boost > 0) parts.push(`+${Math.round(boost * 100)}% ${elem}`);
      });
    }
    if (skill.damageReduction) {
      parts.push(`${Math.round(skill.damageReduction * 100)}% DMG Reduct`);
    }
    return parts.join(' / ') || 'No boosts';
  };

  return (
    <div className={`${BORDERS.radius.lg} border overflow-hidden bg-zinc-900 border-purple-700 ${className}`}>
      <div className="px-2 py-1 bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-between">
        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Leader Skill</span>
        {isActive && (
          <span className="text-[10px] font-bold text-yellow-400">ACTIVE</span>
        )}
      </div>
      <div className="px-2 py-1.5 flex flex-col gap-0.5">
        <span className="text-sm font-bold text-white">{skill.name}</span>
        <span className="text-[10px] text-purple-400">{getBoostDescription()}</span>
        <p className="text-[9px] text-zinc-500 line-clamp-2">{skill.description}</p>
      </div>
    </div>
  );
}