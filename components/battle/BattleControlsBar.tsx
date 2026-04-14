import { BattleStateData } from './BattleArena';
import { BattleUnit } from '@/lib/battleTypes';

export interface BattleControlsData extends BattleStateData {
  inventoryItems: { id: string; name: string; count: number; icon: string }[];
  setSelectedItem: (id: string | null) => void;
  executeTurn: () => void;
  playerUnits: BattleUnit[];
}

export function BattleControlsBar({ battleState }: { battleState: BattleControlsData }) {
  const { turnState, inventoryItems, selectedItem, setSelectedItem, executeTurn, playerUnits } = battleState;

  const totalBB = playerUnits.reduce((sum, u) => sum + (u.queuedBb ? u.bbGauge : 0), 0);
  const readyUnits = playerUnits.filter(u => u.bbGauge >= u.maxBb && !u.isDead).length;

  return (
    <div className="bg-[url('https://cdn.jsdelivr.net/gh/Leem0nGames/gameassets@main/file_0000000071b471f5851dd21e1a9fc22e.png')] bg-cover bg-bottom border-t-2 border-zinc-700 flex flex-col justify-center px-2 py-1 gap-1 pb-safe relative">
      <div className="absolute inset-0 bg-black/70" />
      
      {/* BB Gauge Bar */}
      {turnState === 'player_input' && (
        <div className="relative z-10 flex items-center gap-2 px-1 mb-1">
          <div className="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-700">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${Math.min(100, (totalBB / 100) * 100)}%` }}
            />
          </div>
          <div className="flex items-center gap-1 text-[9px] font-bold">
            <span className={readyUnits > 0 ? 'text-cyan-400 animate-pulse' : 'text-zinc-500'}>
              {readyUnits}
            </span>
            <span className="text-zinc-400">BB</span>
          </div>
        </div>
      )}
      
      <div className="relative z-10 text-center text-[9px] font-black text-zinc-400 tracking-widest mb-0.5">ITEMS</div>
      
      <div className="flex items-center justify-between gap-2 relative z-10">
        {/* Items */}
        <div className="flex gap-1 flex-1">
          {inventoryItems.map((item, i: number) => (
            <div 
              key={i} 
              onClick={() => {
                if (item.count > 0 && turnState === 'player_input') {
                  setSelectedItem(selectedItem === item.id ? null : item.id);
                }
              }}
              className={`flex-1 aspect-[3/4] max-w-[45px] bg-gradient-to-b from-zinc-800 to-zinc-900 border rounded flex flex-col items-center justify-between p-1 shadow-inner transition-all ${
                item.count === 0 ? 'opacity-30 grayscale' : 'cursor-pointer hover:brightness-110'
              } ${selectedItem === item.id ? 'border-yellow-400 scale-105 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]' : 'border-zinc-600'}`}
            >
              <div className="text-[10px] font-bold text-white drop-shadow-md self-start leading-none">x{item.count}</div>
              <div className="text-xl drop-shadow-md">{item.icon}</div>
              <div className="text-[7px] font-bold text-zinc-300 text-center leading-tight truncate w-full">{item.name}</div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="w-20 shrink-0">
          {turnState === 'player_input' ? (
            <button 
              onClick={executeTurn}
              className="w-full h-10 bg-gradient-to-b from-blue-500 to-blue-800 border-2 border-blue-300 rounded-lg font-black text-sm text-white shadow-[0_0_15px_rgba(59,130,246,0.8)] active:scale-95 transition-transform tracking-widest"
            >
              AUTO
            </button>
          ) : turnState === 'victory' ? (
            <div className="w-full h-10 bg-gradient-to-b from-yellow-400 to-yellow-600 border-2 border-yellow-200 text-black flex items-center justify-center rounded-lg font-black text-xs shadow-[0_0_15px_rgba(250,204,21,0.8)]">
              CLEARED
            </div>
          ) : turnState === 'defeat' ? (
            <div className="w-full h-10 bg-gradient-to-b from-red-600 to-red-900 border-2 border-red-400 text-white flex items-center justify-center rounded-lg font-black text-xs shadow-[0_0_15px_rgba(220,38,38,0.8)]">
              DEFEAT
            </div>
          ) : (
            <div className="w-full h-10 bg-zinc-800 border-2 border-zinc-600 text-zinc-400 flex items-center justify-center rounded-lg font-bold text-[10px]">
              WAIT...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
