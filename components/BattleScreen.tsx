import { useState, useEffect, useCallback } from 'react';
import { calculateStats } from '@/lib/gameState';
import { UNIT_DATABASE, ENEMIES, STAGES, UnitTemplate, getElementMultiplier, StageTemplate } from '@/lib/gameData';
import { UnitInstance, EquipInstance } from '@/lib/gameTypes';
import { motion, AnimatePresence } from 'motion/react';
import { playSound } from '@/lib/audio';
import { BattleUnit } from '@/lib/battleTypes';
import { BBCutIn } from './BBCutIn';
import { UnitSprite } from './UnitSprite';

export default function BattleScreen({ stage, playerTeam, equipmentInventory, onBattleEnd }: { stage: StageTemplate, playerTeam: UnitInstance[], equipmentInventory: EquipInstance[], onBattleEnd: (victory: boolean) => void }) {
  const [playerUnits, setPlayerUnits] = useState<BattleUnit[]>(() => {
    return playerTeam.map((inst, idx) => {
      const template = UNIT_DATABASE[inst.templateId];
      const stats = calculateStats(template, inst.level, inst.equipment, equipmentInventory);
      return {
        id: `p_${idx}`,
        template,
        isPlayer: true,
        hp: stats.hp,
        maxHp: stats.hp,
        atk: stats.atk,
        def: stats.def,
        bbGauge: 0,
        maxBb: template.skill.cost,
        isDead: false,
        queuedBb: false,
        actionState: 'idle'
      };
    });
  });

  const [enemyUnits, setEnemyUnits] = useState<BattleUnit[]>(() => {
    return stage.enemies.map((enemyId, idx) => {
      const template = ENEMIES.find(e => e.id === enemyId) || ENEMIES[0];
      return {
        id: `e_${idx}`,
        template,
        isPlayer: false,
        hp: template.baseStats.hp,
        maxHp: template.baseStats.hp,
        atk: template.baseStats.atk,
        def: template.baseStats.def,
        bbGauge: 0,
        maxBb: 100,
        isDead: false,
        queuedBb: false,
        actionState: 'idle'
      };
    });
  });

  const [turnState, setTurnState] = useState<'player_input' | 'executing' | 'victory' | 'defeat'>('player_input');
  const [combatLog, setCombatLog] = useState<string[]>(['Battle Started!']);
  const [bbFlash, setBbFlash] = useState(false);
  const [bbCutInUnit, setBbCutInUnit] = useState<BattleUnit | null>(null);
  const [bbHitEffect, setBbHitEffect] = useState<{ targetId: string, element: string } | null>(null);
  const [unitsActed, setUnitsActed] = useState<Set<string>>(new Set());

  const addLog = (msg: string) => {
    setCombatLog(prev => [...prev.slice(-4), msg]);
  };

  const toggleBb = (id: string) => {
    if (turnState !== 'player_input') return;
    setPlayerUnits(prev => prev.map(u => {
      if (u.id === id && u.bbGauge >= u.maxBb && !u.isDead) {
        playSound('bb_cast');
        return { ...u, queuedBb: !u.queuedBb };
      }
      return u;
    }));
  };

  const handleUnitAction = async (unitId: string) => {
    if (turnState !== 'player_input' || unitsActed.has(unitId)) return;
    
    const unitIdx = playerUnits.findIndex(u => u.id === unitId);
    const attacker = playerUnits[unitIdx];
    if (attacker.isDead) return;

    setUnitsActed(prev => new Set(prev).add(unitId));
    await executeAttack(unitId, true);
  };

  const executeAttack = useCallback(async (attackerId: string, isPlayer: boolean) => {
    let targetId = '';
    let finalDamage = 0;
    let isBbAction = false;
    let isWeakness = false;
    let attackerName = '';
    let attackerElement = '';
    let attackerTemplate: UnitTemplate | undefined;

    // Use functional updates to always get the freshest state and avoid stale closures
    if (isPlayer) {
      setEnemyUnits(prevEnemies => {
        const aliveTarget = prevEnemies.find(e => !e.isDead);
        if (!aliveTarget) return prevEnemies;
        targetId = aliveTarget.id;

        setPlayerUnits(prevPlayers => {
          const attacker = prevPlayers.find(u => u.id === attackerId);
          if (!attacker || attacker.isDead) return prevPlayers;

          attackerName = attacker.template.name;
          attackerElement = attacker.template.element;
          attackerTemplate = attacker.template;
          isBbAction = attacker.queuedBb;
          const powerMultiplier = isBbAction ? attacker.template.skill.power : 1.0;
          const elementMultiplier = getElementMultiplier(attacker.template.element, aliveTarget.template.element);
          isWeakness = elementMultiplier > 1.0;

          let rawDamage = Math.max(1, (attacker.atk * powerMultiplier) - (aliveTarget.def * 0.5));
          finalDamage = Math.floor(rawDamage * elementMultiplier);

          return prevPlayers.map(u => u.id === attackerId ? { ...u, actionState: isBbAction ? 'skill' : 'attacking' } : u);
        });

        return prevEnemies;
      });
    } else {
      setPlayerUnits(prevPlayers => {
        const aliveTarget = prevPlayers.find(p => !p.isDead);
        if (!aliveTarget) return prevPlayers;
        targetId = aliveTarget.id;

        setEnemyUnits(prevEnemies => {
          const attacker = prevEnemies.find(u => u.id === attackerId);
          if (!attacker || attacker.isDead) return prevEnemies;

          attackerName = attacker.template.name;
          attackerElement = attacker.template.element;
          attackerTemplate = attacker.template;
          isBbAction = attacker.queuedBb;
          const powerMultiplier = isBbAction ? attacker.template.skill.power : 1.0;
          const elementMultiplier = getElementMultiplier(attacker.template.element, aliveTarget.template.element);
          isWeakness = elementMultiplier > 1.0;

          let rawDamage = Math.max(1, (attacker.atk * powerMultiplier) - (aliveTarget.def * 0.5));
          finalDamage = Math.floor(rawDamage * elementMultiplier);

          return prevEnemies.map(u => u.id === attackerId ? { ...u, actionState: isBbAction ? 'skill' : 'attacking' } : u);
        });

        return prevPlayers;
      });
    }

    // Wait for state updates to propagate and for the attack animation to start
    await new Promise(r => setTimeout(r, 100));
    if (!targetId) return;

    if (isBbAction && attackerTemplate) {
      setBbCutInUnit({ template: attackerTemplate } as any);
      playSound('bb_cast');
      await new Promise(r => setTimeout(r, 1200));
      setBbCutInUnit(null);
      setBbFlash(true);
      setTimeout(() => setBbFlash(false), 150);
      await new Promise(r => setTimeout(r, 100));
    } else {
      await new Promise(r => setTimeout(r, 150));
    }

    // Apply damage to target
    if (isPlayer) {
      setEnemyUnits(prev => prev.map(u => {
        if (u.id === targetId) {
          const newHp = Math.max(0, u.hp - finalDamage);
          return { ...u, hp: newHp, isDead: newHp === 0, actionState: isBbAction ? 'bb_hurt' : 'hurt', isWeaknessHit: isWeakness };
        }
        return u;
      }));
    } else {
      setPlayerUnits(prev => prev.map(u => {
        if (u.id === targetId) {
          const newHp = Math.max(0, u.hp - finalDamage);
          return { ...u, hp: newHp, isDead: newHp === 0, actionState: isBbAction ? 'bb_hurt' : 'hurt', isWeaknessHit: isWeakness };
        }
        return u;
      }));
    }

    if (isBbAction) {
      setBbHitEffect({ targetId: targetId, element: attackerElement });
      playSound('bb_hit');
      if (isWeakness) setTimeout(() => playSound('weakness'), 100);
      setTimeout(() => setBbHitEffect(null), 800);
    } else {
      playSound(isWeakness ? 'weakness' : 'hit');
    }

    addLog(`${attackerName} ${isBbAction ? 'uses BB!' : 'attacks'} for ${finalDamage} dmg!`);
    await new Promise(r => setTimeout(r, 300));

    // Reset attacker and target states
    if (isPlayer) {
      setPlayerUnits(prev => prev.map(u => u.id === attackerId ? { ...u, queuedBb: false, bbGauge: isBbAction ? 0 : Math.min(u.maxBb, u.bbGauge + 8), actionState: 'idle' } : u));
      setEnemyUnits(prev => prev.map(u => u.id === targetId ? { ...u, actionState: u.isDead ? 'dead' : 'idle', isWeaknessHit: false } : u));
    } else {
      setEnemyUnits(prev => prev.map(u => u.id === attackerId ? { ...u, queuedBb: false, bbGauge: isBbAction ? 0 : Math.min(u.maxBb, u.bbGauge + 8), actionState: 'idle' } : u));
      setPlayerUnits(prev => prev.map(u => u.id === targetId ? { ...u, actionState: u.isDead ? 'dead' : 'idle', isWeaknessHit: false } : u));
    }
  }, []);

  const autoFight = async () => {
    if (turnState !== 'player_input') return;
    setTurnState('executing');

    const availableUnits = playerUnits.filter(u => !u.isDead && !unitsActed.has(u.id));
    for (const unit of availableUnits) {
      // Check if enemies are all dead before each unit attacks
      let allEnemiesDead = false;
      setEnemyUnits(prev => {
        allEnemiesDead = prev.every(e => e.isDead);
        return prev;
      });
      if (allEnemiesDead) break;

      await handleUnitAction(unit.id);
      await new Promise(r => setTimeout(r, 200));
    }

    // Wait for animations to settle
    await new Promise(r => setTimeout(r, 500));
    checkTurnEnd();
  };

  const checkTurnEnd = useCallback(async () => {
    // Check victory
    let isVictory = false;
    setEnemyUnits(prev => {
      isVictory = prev.every(e => e.isDead);
      return prev;
    });

    if (isVictory) {
      setTurnState('victory');
      addLog("Victory!");
      setTimeout(() => onBattleEnd(true), 2000);
      return;
    }

    // Enemy Turn
    setTurnState('executing');
    addLog("Enemy Turn...");
    await new Promise(r => setTimeout(r, 1000));

    // Iterate through enemies and attack
    const enemies = [...enemyUnits]; // use copy for loop but executeAttack uses latest state
    for (let i = 0; i < enemies.length; i++) {
      let allPlayersDead = false;
      setPlayerUnits(prev => {
        allPlayersDead = prev.every(p => p.isDead);
        return prev;
      });
      if (allPlayersDead) break;
      if (enemies[i].isDead) continue;

      await executeAttack(enemies[i].id, false);
      await new Promise(r => setTimeout(r, 400));
    }

    // Check defeat
    let isDefeat = false;
    setPlayerUnits(prev => {
      isDefeat = prev.every(p => p.isDead);
      return prev;
    });

    if (isDefeat) {
      setTurnState('defeat');
      addLog("Defeat...");
      setTimeout(() => onBattleEnd(false), 2000);
      return;
    }

    // Reset for player turn
    setUnitsActed(new Set());
    setTurnState('player_input');
    addLog("Player Turn");
  }, [enemyUnits, onBattleEnd, executeAttack]);

  useEffect(() => {
    if (turnState === 'player_input' && unitsActed.size > 0) {
      const alivePlayers = playerUnits.filter(u => !u.isDead);
      if (unitsActed.size >= alivePlayers.length || enemyUnits.every(e => e.isDead)) {
        const timer = setTimeout(checkTurnEnd, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [unitsActed, playerUnits, turnState, checkTurnEnd, enemyUnits]);

  return (
    <div className="flex flex-col h-full bg-zinc-950 relative overflow-hidden font-sans select-none">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[url('https://cdn.jsdelivr.net/gh/Leem0nGames/gameassets@main/file_0000000071b471f5851dd21e1a9fc22e.png')] opacity-60 bg-cover bg-center" />

      {/* Side-Scroller Battlefield (60% height) */}
      <div className="relative h-[60%] w-full overflow-hidden border-b-4 border-zinc-900/50">
        {/* Perspective Ground */}
        <div
          className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"
          style={{ transform: 'perspective(100px) rotateX(20deg)', transformOrigin: 'bottom' }}
        />

        {/* Enemies (Left Side) */}
        <div className="absolute inset-0 pointer-events-none">
          {enemyUnits.map((unit, idx) => {
            const positions = [
              { left: '15%', top: '25%' },
              { left: '5%', top: '45%' },
              { left: '15%', top: '65%' },
              { left: '25%', top: '45%' },
            ];
            const pos = positions[idx % positions.length];
            return (
              <div key={unit.id} className="absolute transition-all duration-500" style={pos}>
                <UnitSprite
                  unit={unit}
                  hideStats
                  hitEffectElement={bbHitEffect?.targetId === unit.id ? bbHitEffect.element : null}
                />
              </div>
            );
          })}
        </div>

        {/* Players (Right Side) */}
        <div className="absolute inset-0 pointer-events-none">
          {playerUnits.map((unit, idx) => {
            const positions = [
              { right: '15%', top: '25%' },
              { right: '35%', top: '45%' },
              { right: '15%', top: '65%' },
              { right: '55%', top: '35%' },
              { right: '55%', top: '55%' },
            ];
            const pos = positions[idx % positions.length];
            return (
              <div key={unit.id} className="absolute transition-all duration-500" style={pos}>
                <UnitSprite
                  unit={unit}
                  hideStats
                  hitEffectElement={bbHitEffect?.targetId === unit.id ? bbHitEffect.element : null}
                />
              </div>
            );
          })}
        </div>

        {/* HUD Elements */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-30 pointer-events-none">
           <div
             className="bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 text-[10px] font-mono w-48 shadow-xl"
             aria-live="polite"
           >
             {combatLog.map((log, i) => (
               <div key={i} className={`${i === combatLog.length - 1 ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>
                 {log}
               </div>
             ))}
           </div>
           <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-zinc-300">
             STAGE {stage.id}: {stage.area}
           </div>
        </div>
      </div>

      {/* Unit Tray (40% height) */}
      <div className="relative h-[40%] w-full bg-zinc-900 border-t-2 border-zinc-800 p-2 grid grid-cols-3 grid-rows-2 gap-2 shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]">
        {[0, 1, 2, 3, 4, 5].map((slotIdx) => {
          const unit = playerUnits[slotIdx];
          if (!unit) return <div key={slotIdx} className="bg-black/20 rounded-xl border border-white/5" />;

          const hasActed = unitsActed.has(unit.id);
          const bbReady = unit.bbGauge >= unit.maxBb;
          const hpPercent = Math.round((unit.hp / unit.maxHp) * 100);
          const bbStatus = bbReady ? "Brave Burst Ready" : "Brave Burst Charging";

          return (
            <motion.button
              key={unit.id}
              type="button"
              whileTap={!hasActed ? { scale: 0.95 } : {}}
              className={`relative overflow-hidden rounded-xl border-2 transition-all group focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                hasActed || unit.isDead || turnState !== 'player_input'
                  ? 'border-zinc-800 grayscale brightness-50 cursor-not-allowed'
                  : bbReady
                    ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] cursor-pointer'
                    : 'border-zinc-700 active:border-zinc-400 cursor-pointer'
              } ${unit.isDead ? 'opacity-50 grayscale' : ''}`}
              onClick={() => handleUnitAction(unit.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                toggleBb(unit.id);
              }}
              aria-label={`${unit.template.name}, HP: ${hpPercent}%, ${bbStatus}${unit.isDead ? ', Fainted' : ''}${hasActed ? ', Acted this turn' : ''}`}
              disabled={hasActed || unit.isDead || turnState !== 'player_input'}
            >
              {/* Background gradient based on element */}
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${
                unit.template.element === 'Fire' ? 'from-red-600' :
                unit.template.element === 'Water' ? 'from-blue-600' :
                unit.template.element === 'Earth' ? 'from-green-600' :
                unit.template.element === 'Thunder' ? 'from-yellow-400' :
                unit.template.element === 'Light' ? 'from-zinc-100' : 'from-purple-800'
              } to-black`} />

              <div className="relative h-full p-2 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black italic tracking-tighter text-white/90 drop-shadow-md truncate max-w-[60px]">
                    {unit.template.name.toUpperCase()}
                  </span>
                  <div className={`w-3 h-3 rounded-full border border-white/20 shadow-sm ${
                    unit.template.element === 'Fire' ? 'bg-red-500' :
                    unit.template.element === 'Water' ? 'bg-blue-500' :
                    unit.template.element === 'Earth' ? 'bg-green-500' :
                    unit.template.element === 'Thunder' ? 'bg-yellow-400' :
                    unit.template.element === 'Light' ? 'bg-zinc-100' : 'bg-purple-800'
                  }`} />
                </div>

                {/* Bars Area */}
                <div className="space-y-1">
                  {/* HP Bar */}
                  <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: `${(unit.hp / unit.maxHp) * 100}%` }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                    />
                  </div>
                  {/* BB Gauge */}
                  <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${(unit.bbGauge / unit.maxBb) * 100}%` }}
                      className={`h-full ${bbReady ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse' : 'bg-sky-500'}`}
                    />
                  </div>
                </div>
              </div>

              {/* BB Swipe Overlay Trigger */}
              {bbReady && !hasActed && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-amber-400/10 group-hover:bg-amber-400/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBb(unit.id);
                  }}
                >
                  <span className="text-[8px] font-bold text-amber-300 animate-bounce">TAP FOR BB</span>
                </div>
              )}
            </motion.button>
          );
        })}

        {/* Global Controls Overlay */}
        {turnState === 'player_input' && (
          <div className="absolute -top-12 right-4 flex gap-2">
            <button
              type="button"
              onClick={autoFight}
              className="px-6 py-2 bg-gradient-to-b from-indigo-500 to-indigo-700 rounded-full border-2 border-indigo-400 text-xs font-black tracking-widest text-white shadow-lg active:scale-95 transition-transform focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none cursor-pointer"
            >
              AUTO
            </button>
          </div>
        )}
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {bbCutInUnit && <BBCutIn unit={bbCutInUnit} />}
      </AnimatePresence>

      <AnimatePresence>
        {bbFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/30 z-[60] pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>

      {/* Battle Status Overlay */}
      {turnState === 'victory' && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            className="text-6xl font-black text-amber-400 italic drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]"
            style={{ WebkitTextStroke: '2px black' }}
          >
            VICTORY!!
          </motion.h1>
        </div>
      )}
      {turnState === 'defeat' && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            className="text-6xl font-black text-red-600 italic drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]"
            style={{ WebkitTextStroke: '2px black' }}
          >
            DEFEAT...
          </motion.h1>
        </div>
      )}
    </div>
  );
}
