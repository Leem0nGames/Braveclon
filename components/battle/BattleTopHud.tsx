interface BattleTopHudProps {
  zel: number;
  gems: number;
  turnCount?: number;
  battlePhase?: 'player_input' | 'player_executing' | 'enemy_executing' | 'victory' | 'defeat';
}

import { UI } from '@/lib/design-tokens';

export function BattleTopHud({ zel, gems, turnCount = 1, battlePhase = 'player_input' }: BattleTopHudProps) {
  const phaseColors = {
    player_input: 'text-green-400',
    player_executing: 'text-yellow-400',
    enemy_executing: 'text-red-400',
    victory: 'text-yellow-400',
    defeat: 'text-red-400'
  };

  const phaseLabels = {
    player_input: 'YOUR TURN',
    player_executing: 'ATTACKING...',
    enemy_executing: 'ENEMY TURN',
    victory: 'VICTORY!',
    defeat: 'DEFEAT'
  };

  return (
    <div className="relative z-20 h-12 shrink-0 bg-gradient-to-b from-[#4a78a6] to-[#2b4c7e] border-b-2 border-[#b89947] flex items-center px-3 justify-between text-xs font-bold text-white shadow-md">
      <div className="flex gap-3">
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-sm drop-shadow-md">💰</span> 
          <span className="drop-shadow-md tabular-nums">{zel.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-blue-400 text-sm drop-shadow-md">💎</span> 
          <span className="drop-shadow-md">{gems}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded">
          <span className="text-zinc-400 text-[10px]">TURN</span>
          <span className="text-white font-bold tabular-nums">{turnCount}</span>
        </div>
        <div className={`font-bold tracking-wider ${phaseColors[battlePhase]} drop-shadow-md text-[10px]`}>
          {phaseLabels[battlePhase]}
        </div>
      </div>

      <button className="bg-gradient-to-b from-[#2b4c7e] to-[#1a2e4c] border border-[#b89947] px-3 py-1 rounded shadow-inner text-[10px] uppercase tracking-wider drop-shadow-md">
        MENU
      </button>
    </div>
  );
}
