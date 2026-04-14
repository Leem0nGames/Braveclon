/**
 * BRAVECLON GAME SYSTEMS DESIGN
 * 
 * sistemas diseñados para brave frontierclone
 * Complexity: INTERMEDIATE
 * 
 * Tabla de contenidos:
 * 1. Battle System
 * 2. Progression System  
 * 3. Gacha/Summon System
 * 4. Evolution System
 * 5. Economy System
 * 6. Difficulty Tuning
 */

// ============================================================================
// 1. BATTLE SYSTEM
// ============================================================================

/**
 * Damage Formula
 * Raw = (ATK × SkillPower × PositionBonus × Random) - (DEF × DEFRedux)
 * Final = Raw × ElementMultiplier × WeaknessBonus
 */
export const BATTLE_FORMULAS = {
  // Position bonus for player units (front row gets bonus damage)
  positionBonus: {
    front: 1.2,    // 120% damage to front
    back: 1.0,     // 100% to back
  },
  
  // Reduce factor for DEF (not full reduction)
  defReduction: 0.4,   // Only 40% of DEF is applied
  
  // Random variance (90% to 110%)
  randomVariance: {
    min: 0.9,
    max: 1.1,
  },
  
  // HP Pool scaling for difficulty
  enemyHpMultiplier: {
    easy: 1.0,
    normal: 1.5,
    hard: 2.0,
    extreme: 3.0,
  },
  
  // Turn-based BB gauge gain
  bbGaugePerTurn: 10,
  bbGaugePerHit: 5,
  bbGaugePerDamage: 2,  // Per 100 damage dealt
} as const;

/**
 * Elemental Interaction Matrix
 * Attack → Defense = Damage Multiplier
 */
export const ELEMENTAL_MATRIX: Record<string, Record<string, number>> = {
  Fire:    { Fire: 0.5, Water: 0.5, Earth: 2.0, Thunder: 0.5, Light: 1.0, Dark: 1.0 },
  Water:   { Fire: 2.0, Water: 0.5, Earth: 0.5, Thunder: 2.0, Light: 1.0, Dark: 1.0 },
  Earth:   { Fire: 0.5, Water: 1.0, Earth: 0.5, Thunder: 2.0, Light: 1.0, Dark: 1.0 },
  Thunder:{ Fire: 1.0, Water: 0.5, Earth: 0.5, Thunder: 0.5, Light: 1.0, Dark: 1.0 },
  Light:   { Fire: 1.0, Water: 1.0, Earth: 1.0, Thunder: 1.0, Light: 0.5, Dark: 2.0 },
  Dark:    { Fire: 1.0, Water: 1.0, Earth: 1.0, Thunder: 1.0, Light: 2.0, Dark: 0.5 },
};

// ============================================================================
// 2. PROGRESSION SYSTEM
// ============================================================================

/**
 * EXP Curve - Exponential Growth
 * Formula: Base × (Level^Exponent) + BaseOffset
 */
export const PROGRESSION_FORMULAS = {
  // EXP needed for next level
  expForLevel: (level: number): number => {
    const baseExp = 100;
    const multiplier = 1.15;  // 15% growth per level
    return Math.floor(baseExp * Math.pow(multiplier, level));
  },
  
  // Alternative: simpler curve
  expCurve: {
    formula: 'level * baseExp * (1 + level/10)',
    baseExp: 100,
  },
  
  // Enemy EXP reward by stage
  enemyExpReward: {
    baseMultiplier: 1.0,
    perStageMultiplier: 0.15,  // +15% per stage
  },
  
  // Level cap for rarities
  maxLevelByRarity: {
    1: 20,
    2: 30,
    3: 40,
    4: 60,
    5: 80,
  },
  
  // Growth rate tier
  growthRate: {
    low: 0.8,
    normal: 1.0,
    high: 1.2,
    heroic: 1.5,
  },
} as const;

// ============================================================================
// 3. GACHA/SUMMON SYSTEM  
// ============================================================================

/**
 * Pity System Implementation
 * Guarantees higher rarity after failed pulls
 */
export const GACHA_FORMULAS = {
  // Base rates (before pity)
  baseRates: {
    star5: 0.01,    // 1%
    star4: 0.04,     // 4%
    star3: 0.15,     // 15%
    star2: 0.30,     // 30%
    star1: 0.50,     // 50%
  },
  
  // Pity thresholds (pulls without guaranteed)
  pityThresholds: {
    star5: 50,      // Guaranteed ��5 after 50 without
    star4: 20,      // Guaranteed ★4 after 20 without
  },
  
  // Pity increase per pull (capped)
  pityIncrease: {
    perPull: 0.005,  // +0.5% per pull
    maxBonus: 0.10, // Max 10% bonus
  },
  
  // Rate-up events (temporary buffs)
  rateUpMultipliers: {
    star5: 3.0,   // 3x rate during rate-up
    star4: 2.0,  // 2x rate during rate-up
  },
  
  // Cost per pull
  summonCost: {
    normal: 5,   // gems
    multi: 40,   // 10 pulls = 4 gems each
  },
  
  // Guaranteed pulls
  guaranteedPulls: {
    normal: 1,
    multi: 10,
  },
} as const;

/**
 * Calculate actual rate with pity applied
 */
export function getActualGachaRate(
  baseRate: number, 
  pityCounter: number,
  pityThreshold: number,
  pityBonus: number
): number {
  const pityActive = pityCounter >= pityThreshold;
  const pityBonusAmount = pityActive 
    ? Math.min(pityBonus, BATTLE_FORMULAS.randomVariance.max) 
    : 0;
  return baseRate + (pityCounter * pityBonusAmount);
}

// ============================================================================
// 4. EVOLUTION SYSTEM
// ============================================================================

export const EVOLUTION_FORMULAS = {
  // Cost scaling: base × rarity^exponent
  costScaling: {
    formula: 'base * Math.pow(rarity, 1.5)',
    baseCost: 5000,
  },
  
  // Cost by rarity
  costByRarity: {
    2: 5000,
    3: 15000,
    4: 50000,
    5: 150000,
  },
  
  // Material requirement multiplier
  materialMultiplier: {
    sameElement: 1.0,
    diffElement: 2.0,
  },
  
  // Level reset on evolution
  resetsLevel: true,
  newLevelOnEvolve: 1,
  
  // EXP carryover
  carriesExp: false,
} as const;

// ============================================================================
// 5. ECONOMY SYSTEM
// ============================================================================

export const ECONOMY_FORMULAS = {
  // Zel rewards by stage
  zelReward: (stageLevel: number): number => {
    const base = 100;
    const multiplier = 1.1;
    return Math.floor(base * Math.pow(multiplier, stageLevel));
  },
  
  // Equipment drop rates
  equipmentDropRates: {
    base: 0.05,      // 5% base
    perStageBonus: 0.01, // +1% per stage
    maxBonus: 0.15,   // 15% max
  },
  
  // Energy system
  energy: {
    maxEnergy: 50,
    regenRate: 5,     // per hour
    regenInterval: 3600, // 1 hour in seconds
  },
  
  // Gems (premium currency)
  gemRewards: {
    login: 5,
    questClear: 10,
    weekly: 50,
  },
} as const;

// ============================================================================
// 6. DIFFICULTY TUNING
// ============================================================================

export const DIFFICULTY_TUNING = {
  // Stage difficulty tiers
  difficultyTiers: {
    tier1: { enemyHpMult: 1.0, enemyAtkMult: 1.0, zelMult: 1.0, expMult: 1.0 },
    tier2: { enemyHpMult: 1.3, enemyAtkMult: 1.2, zelMult: 1.3, expMult: 1.2 },
    tier3: { enemyHpMult: 1.7, enemyAtkMult: 1.5, zelMult: 1.7, expMult: 1.5 },
    tier4: { enemyHpMult: 2.2, enemyAtkMult: 1.9, zelMult: 2.2, expMult: 1.9 },
    tier5: { enemyHpMult: 3.0, enemyAtkMult: 2.5, zelMult: 3.0, expMult: 2.5 },
  },
  
  // HP Pool approach for difficulty
  // Increase enemy HP instead of player damage
  hpPoolScaling: {
    formula: 'baseHp * difficultyMultiplier * (1 + stageNumber * 0.1)',
    baseEnemyHp: 1000,
  },
  
  // Tuning parameters (adjustable)
  tunableParams: {
    enemyBaseHp: 1000,
    enemyAtkBase: 100,
    enemyDefBase: 50,
    playerBaseHp: 2000,
    playerBaseAtk: 200,
    playerBaseDef: 100,
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate enemy stats with HP pools
 */
export function calculateEnemyStats(
  baseStats: { hp: number; atk: number; def: number },
  stageNumber: number,
  difficulty: keyof typeof DIFFICULTY_TUNING.difficultyTiers = 'tier1'
): { hp: number; atk: number; def: number } {
  const tier = DIFFICULTY_TUNING.difficultyTiers[difficulty];
  return {
    hp: Math.floor(baseStats.hp * tier.enemyHpMult * (1 + stageNumber * 0.1)),
    atk: Math.floor(baseStats.atk * tier.enemyAtkMult),
    def: baseStats.def,
  };
}

/**
 * Calculate final damage with all modifiers
 */
export function calculateDamage(
  atk: number,
  def: number,
  skillPower: number,
  attackerElement: string,
  defenderElement: string,
  isFrontRow: boolean = true,
  randomVariance: [number, number] = [0.9, 1.1]
): number {
  // Random factor
  const random = randomVariance[0] + Math.random() * (randomVariance[1] - randomVariance[0]);
  
  // Position bonus
  const positionMult = isFrontRow ? BATTLE_FORMULAS.positionBonus.front : BATTLE_FORMULAS.positionBonus.back;
  
  // Element multiplier
  const elementMult = ELEMENTAL_MATRIX[attackerElement]?.[defenderElement] || 1.0;
  
  // Raw damage
  const raw = (atk * skillPower * positionMult * random) - (def * BATTLE_FORMULAS.defReduction);
  const rawDamage = Math.max(1, Math.floor(raw));
  
  // Final with element
  return Math.floor(rawDamage * elementMult);
}

/**
 * EXP curve simplified lookup table
 */
export const EXP_CURVE: number[] = [
  0,    // Level 0
  100,  // Level 1
  120,  // Level 2
  144,  // Level 3
  173,  // Level 4
  208,  // Level 5
  250,  // Level 6
  300,  // Level 7
  360,  // Level 8
  432,  // Level 9
  518,  // Level 10
  622,  // Level 11
  747,  // Level 12
  896,  // Level 13
  1075, // Level 14
  1290, // Level 15
  1548, // Level 16
  1858, // Level 17
  2230, // Level 18
  2676, // Level 19
  3211, // Level 20
];

export function getExpRequired(level: number): number {
  if (level < EXP_CURVE.length) return EXP_CURVE[level];
  // Extrapolate for higher levels
  return Math.floor(100 * Math.pow(1.15, level));
}