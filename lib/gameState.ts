import { useState, useEffect, useCallback } from 'react';
import { UnitTemplate, UNIT_DATABASE, Stats, QR_REWARD_TABLE, GACHA_POOL, EQUIPMENT_DATABASE, EquipSlot, STAGES, getExpForLevel, getFusionCost, getFusionExpGain, getEvolutionCost } from './gameData';
import { UnitInstance, EquipInstance, QRState, PlayerState, INITIAL_STATE } from './gameTypes';
import { saveGameState, loadGameState } from './auth';

export * from './gameTypes';

const ENERGY_REGEN_MS = 3 * 60 * 1000; // 3 minutes in ms

export function calculateStats(template: UnitTemplate, level: number, equipment?: UnitInstance['equipment'], equipInventory?: EquipInstance[]): Stats {
  const base = {
    hp: template.baseStats.hp + template.growthRate.hp * (level - 1),
    atk: template.baseStats.atk + template.growthRate.atk * (level - 1),
    def: template.baseStats.def + template.growthRate.def * (level - 1),
    rec: template.baseStats.rec + template.growthRate.rec * (level - 1),
  };

  if (equipment && equipInventory) {
    const equipIds = [equipment.weapon, equipment.armor, equipment.accessory].filter(Boolean);
    equipIds.forEach(eqInstId => {
      const eqInst = equipInventory.find(e => e.instanceId === eqInstId);
      if (eqInst) {
        const eqTemplate = EQUIPMENT_DATABASE[eqInst.templateId];
        if (eqTemplate && eqTemplate.statsBonus) {
          base.hp += eqTemplate.statsBonus.hp || 0;
          base.atk += eqTemplate.statsBonus.atk || 0;
          base.def += eqTemplate.statsBonus.def || 0;
          base.rec += eqTemplate.statsBonus.rec || 0;
        }
      }
    });
  }
  return base;
}

interface UseGameStateOptions {
  userId?: string | null;
  autoSave?: boolean;
  saveInterval?: number;
}

export function useGameState(options: UseGameStateOptions = {}) {
  const { userId, autoSave = true, saveInterval = 30000 } = options;
  const [state, setState] = useState<PlayerState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeToNextEnergy, setTimeToNextEnergy] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load state - local first, then cloud if userId provided
  useEffect(() => {
    const loadState = async () => {
      // Always load local first for offline support
      const saved = localStorage.getItem('rpg_game_state');
      let loadedState: PlayerState | null = null;
      
      if (saved) {
        try {
          loadedState = JSON.parse(saved);
          if (loadedState && !loadedState.lastEnergyUpdateTime) {
            loadedState.lastEnergyUpdateTime = Date.now();
          }
          if (loadedState && !loadedState.qrState) {
            loadedState.qrState = INITIAL_STATE.qrState;
          } else if (loadedState && loadedState.qrState && !loadedState.qrState.scannedHashes) {
            loadedState.qrState.scannedHashes = [];
          }
          if (loadedState && !loadedState.equipmentInventory) {
            loadedState.equipmentInventory = INITIAL_STATE.equipmentInventory;
          }
          if (loadedState && loadedState.inventory) {
            loadedState.inventory.forEach((unit: UnitInstance) => {
              if (!unit.equipment) {
                unit.equipment = { weapon: null, armor: null, accessory: null };
              }
            });
          }
        } catch (e) {
          console.error('Failed to parse save data', e);
        }
      }

      // If user is logged in, try to load from cloud
      if (userId && loadedState) {
        const cloudState = await loadGameState(userId);
        if (cloudState) {
          // Prefer cloud state (more recent)
          loadedState = cloudState;
          // Also save locally to keep in sync
          localStorage.setItem('rpg_game_state', JSON.stringify(cloudState));
        }
      }

      setState(loadedState || INITIAL_STATE);
      setIsLoaded(true);
    };

    loadState();
  }, [userId]);

  // Auto-save to local storage
  useEffect(() => {
    if (isLoaded && state) {
      localStorage.setItem('rpg_game_state', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  // Auto-save to cloud
  useEffect(() => {
    if (!isLoaded || !userId || !autoSave) return;

    const interval = setInterval(async () => {
      setIsSaving(true);
      await saveGameState(userId, state);
      setIsSaving(false);
      setLastSaved(new Date());
    }, saveInterval);

    return () => clearInterval(interval);
  }, [userId, isLoaded, autoSave, saveInterval, state]);

  // Save on important events (unload, etc)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (userId) {
        saveGameState(userId, state);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [userId, state]);

  // Manual save function
  const saveToCloud = useCallback(async () => {
    if (!userId) return false;
    setIsSaving(true);
    const success = await saveGameState(userId, state);
    setIsSaving(false);
    if (success) setLastSaved(new Date());
    return success;
  }, [userId, state]);

  // Energy regeneration logic
  useEffect(() => {
    if (!isLoaded) return;

    const tick = () => {
      setState(prev => {
        if (prev.energy >= prev.maxEnergy) {
          setTimeToNextEnergy(0);
          return { ...prev, lastEnergyUpdateTime: Date.now() };
        }

        const now = Date.now();
        const timePassed = now - prev.lastEnergyUpdateTime;
        
        if (timePassed >= ENERGY_REGEN_MS) {
          const energyToAdd = Math.floor(timePassed / ENERGY_REGEN_MS);
          const newEnergy = Math.min(prev.maxEnergy, prev.energy + energyToAdd);
          const remainder = timePassed % ENERGY_REGEN_MS;
          
          setTimeToNextEnergy(ENERGY_REGEN_MS - remainder);
          return {
            ...prev,
            energy: newEnergy,
            lastEnergyUpdateTime: now - remainder
          };
        }

        setTimeToNextEnergy(ENERGY_REGEN_MS - timePassed);
        return prev;
      });
    };

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isLoaded]);

  const updateState = (updates: Partial<PlayerState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const addUnit = (templateId: string): UnitInstance => {
    const newUnit: UnitInstance = {
      instanceId: `inst_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      templateId,
      level: 1,
      exp: 0,
      equipment: { weapon: null, armor: null, accessory: null }
    };
    setState(prev => ({ ...prev, inventory: [...prev.inventory, newUnit] }));
    return newUnit;
  };

  const setTeamMember = (slot: number, unitInstanceId: string | null) => {
    setState(prev => {
      const newTeam = [...prev.team];
      newTeam[slot] = unitInstanceId;
      return { ...prev, team: newTeam };
    });
  };

  const spendGems = (amount: number): boolean => {
    if (state.gems < amount) return false;
    setState(prev => ({ ...prev, gems: prev.gems - amount }));
    return true;
  };

  const spendEnergy = (amount: number): boolean => {
    if (state.energy < amount) return false;
    setState(prev => ({ ...prev, energy: prev.energy - amount }));
    return true;
  };

  const processQrScan = (qrHash: string) => {
    const today = new Date().toISOString().split('T')[0];
    const qrState = state.qrState;
    
    if (qrState.scansToday >= 5) {
      return { success: false, message: "Daily scan limit reached (5/5).", rewardType: undefined, rewardValue: undefined };
    }
    
    if (qrState.scannedHashes.includes(qrHash)) {
      return { success: false, message: "This QR code has already been scanned!", rewardType: undefined, rewardValue: undefined };
    }
    
    const reward = QR_REWARD_TABLE[Math.floor(Math.random() * QR_REWARD_TABLE.length)];
    let zelReward = 0;
    let expReward = 0;
    let gemsReward = 0;
    let energyReward = 0;
    
    if (reward.type === 'zel' && reward.min && reward.max) {
      zelReward = Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
    } else if (reward.type === 'gems' && reward.min && reward.max) {
      gemsReward = Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
    } else if (reward.type === 'energy' && reward.min && reward.max) {
      energyReward = Math.floor(Math.random() * (reward.max - reward.min + 1)) + reward.min;
    } else {
      zelReward = 500;
      expReward = 100;
    }
    
    const newScannedHashes = [...qrState.scannedHashes, qrHash];
    
    setState(prev => ({
      ...prev,
      qrState: {
        scansToday: qrState.lastScanDate === today ? qrState.scansToday + 1 : 1,
        lastScanDate: today,
        scannedHashes: newScannedHashes
      },
      zel: prev.zel + zelReward,
      exp: prev.exp + expReward,
      gems: prev.gems + gemsReward,
      energy: Math.min(prev.maxEnergy, prev.energy + energyReward)
    }));
    
    const message = zelReward > 0 ? `+${zelReward} zel` : gemsReward > 0 ? `+${gemsReward} gems` : `+${energyReward} energy`;
    return { success: true, message, rewardType: reward.type, rewardValue: zelReward || gemsReward || energyReward };
  };

  const rollGacha = (count: number = 1): { templateId: string; rarity: number }[] => {
    const results: { templateId: string; rarity: number }[] = [];
    const pool = GACHA_POOL;
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    
    for (let i = 0; i < count; i++) {
      const rand = Math.random() * totalWeight;
      let cumulative = 0;
      let selected = pool[0];
      
      for (const item of pool) {
        cumulative += item.weight;
        if (rand <= cumulative) {
          selected = item;
          break;
        }
      }
      
      let rarity = 1;
      if (selected.weight >= 100) rarity = 3;
      else if (selected.weight >= 20) rarity = 4;
      else if (selected.weight >= 2) rarity = 5;
      
      results.push({ templateId: selected.unitId, rarity });
      
      setState(prev => ({
        ...prev,
        summonPity: {
          star5Pulls: rarity === 5 ? 0 : prev.summonPity.star5Pulls + 1,
          star4Pulls: rarity === 4 ? 0 : prev.summonPity.star4Pulls + 1,
          lastStar5Pull: rarity === 5 ? rarity : prev.summonPity.lastStar5Pull
        }
      }));
    }
    
    return results;
  };

  const equipItem = (unitInstanceId: string, slot: EquipSlot, itemInstanceId: string | null) => {
    setState(prev => {
      const newInventory = prev.inventory.map(u => {
        if (u.instanceId === unitInstanceId) {
          return { ...u, equipment: { ...u.equipment, [slot]: itemInstanceId } };
        }
        return u;
      });
      return { ...prev, inventory: newInventory };
    });
  };

  const unequipItem = (unitInstanceId: string, slot: EquipSlot) => {
    setState(prev => {
      const newInventory = prev.inventory.map(u => {
        if (u.instanceId === unitInstanceId) {
          return { ...u, equipment: { ...u.equipment, [slot]: null } };
        }
        return u;
      });
      return { ...prev, inventory: newInventory };
    });
  };

  const winBattle = (stageId: number) => {
    const stage = STAGES.find(s => s.id === stageId);
    if (!stage) return null;

    const zelReward = stage.zelReward;
    const expReward = stage.expReward;
    
    const newInventory = [...state.inventory];
    const leveledUp: { name: string; oldLevel: number; newLevel: number }[] = [];
    
    const teamUnits = state.team
      .filter(id => id !== null)
      .map(id => newInventory.find(u => u.instanceId === id))
      .filter(Boolean);
    
    teamUnits.forEach(unit => {
      if (!unit) return;
      const template = UNIT_DATABASE[unit.templateId];
      const newExp = unit.exp + expReward;
      const expNeeded = getExpForLevel(unit.level);
      
      if (newExp >= expNeeded && unit.level < template.maxLevel) {
        const oldLevel = unit.level;
        const newLevel = Math.min(template.maxLevel, unit.level + 1);
        unit.level = newLevel;
        unit.exp = newExp - expNeeded;
        leveledUp.push({ name: template.name, oldLevel, newLevel });
      } else {
        unit.exp = newExp;
      }
    });

    const playerExpGain = expReward * teamUnits.length;
    const playerNewExp = state.exp + playerExpGain;
    const playerExpNeeded = state.level * 100;
    const playerLeveledUp = playerNewExp >= playerExpNeeded;
    const newPlayerLevel = playerLeveledUp ? state.level + 1 : state.level;
    const newPlayerExp = playerLeveledUp ? playerNewExp - playerExpNeeded : playerNewExp;
    
    setState(prev => ({
      ...prev,
      zel: prev.zel + zelReward,
      exp: newPlayerExp,
      level: newPlayerLevel,
      energy: playerLeveledUp ? prev.maxEnergy : prev.energy,
      inventory: newInventory
    }));

    return {
      zel: zelReward,
      exp: playerExpGain,
      playerLeveledUp,
      leveledUpUnits: leveledUp,
      equipmentDropped: []
    };
  };

  const fuseUnits = (targetInstanceId: string, materialInstanceIds: string[]) => {
    const targetUnit = state.inventory.find(u => u.instanceId === targetInstanceId);
    if (!targetUnit) return { success: false, message: 'Target unit not found' };

    const template = UNIT_DATABASE[targetUnit.templateId];
    if (targetUnit.level >= template.maxLevel) return { success: false, message: 'Unit is already at max level' };

    const materialUnits = materialInstanceIds
      .map(id => state.inventory.find(u => u.instanceId === id))
      .filter(Boolean);

    if (materialUnits.length === 0) return { success: false, message: 'No materials selected' };

    const fusionCost = getFusionCost(targetUnit.level, materialUnits.length);
    if (state.zel < fusionCost) return { success: false, message: 'Not enough zel' };

    const expGained = getFusionExpGain(3, targetUnit.level, false);
    let newExp = targetUnit.exp + expGained;
    let newLevel = targetUnit.level;
    const expNeeded = getExpForLevel(newLevel);

    while (newExp >= expNeeded && newLevel < template.maxLevel) {
      newExp -= expNeeded;
      newLevel++;
    }

    const newInventory = state.inventory
      .filter(u => !materialInstanceIds.includes(u.instanceId))
      .map(u => {
        if (u.instanceId === targetInstanceId) {
          return { ...u, level: newLevel, exp: newExp };
        }
        return u;
      });

    setState(prev => ({
      ...prev,
      zel: prev.zel - fusionCost,
      inventory: newInventory
    }));

    return { success: true, expGained, newLevel, message: 'Fusion complete!' };
  };

  const evolveUnit = (targetInstanceId: string) => {
    const targetUnit = state.inventory.find(u => u.instanceId === targetInstanceId);
    if (!targetUnit) return { success: false, message: 'Unit not found' };

    const template = UNIT_DATABASE[targetUnit.templateId];
    if (!template.evolutionTarget) return { success: false, message: 'This unit cannot evolve' };

    const evolutionCost = getEvolutionCost(template.rarity);
    if (state.zel < evolutionCost) return { success: false, message: 'Not enough zel' };

    setState(prev => ({ ...prev, 
      inventory: prev.inventory.map(u => {
        if (u.instanceId === targetInstanceId) {
          return { ...u, templateId: template.evolutionTarget! };
        }
        return u;
      }),
      zel: prev.zel - evolutionCost
    }));
    return { success: true, newTemplateId: template.evolutionTarget, message: 'Evolution complete!' };
  };

  return {
    state,
    isLoaded,
    timeToNextEnergy,
    isSaving,
    lastSaved,
    updateState,
    addUnit,
    setTeamMember,
    spendGems,
    spendEnergy,
    processQrScan,
    rollGacha,
    equipItem,
    unequipItem,
    winBattle,
    fuseUnits,
    evolveUnit,
    unitTemplates: UNIT_DATABASE,
    saveToCloud
  };
}