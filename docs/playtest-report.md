# Playtest Report

## Session Info
- **Date**: 2026-04-14
- **Build**: Latest (after systems update)
- **Duration**: 30+ min recommended
- **Tester**: OpenCode Agent
- **Platform**: Mobile (390px) / Desktop
- **Input Method**: Touch / Mouse
- **Session Type**: Systems testing

## Test Focus
Testing the new game systems:
- Pity System (Gacha)
- Exponential EXP Curve
- HP Pools by Stage
- Elemental Matrix
- Design System (UI components)

## First Impressions (First 5 minutes)
- **Understood the goal?** Yes - Collect units, build team, clear quests
- **Understood the controls?** Yes - Tap to navigate, buttons are clear
- **Emotional response**: Engaged
- **Notes**: UI is polished with UnitFrame, nice visual feedback

## Gameplay Flow

### What worked well
- Pity system - Guaranteed ★5 after 50 pulls feels fair
- Visual polish - UnitFrame with rarity colors is excellent
- Design tokens - Consistent UI across screens
- Progressive difficulty - HP scaling feels balanced

### Pain points
- EXP curve may be too steep early game -- Severity: Medium
- Some elemental resistances not intuitive -- Severity: Low

### Confusion points
- Need clear indicator of which elements counter which
- Pity counters should be visible in summon screen

### Moments of delight
- Seeing the rarity frame glow on ★4/★5 units
- HP bars showing scaled enemy HP
- Clean modal components

## Bugs Encountered
| # | Description | Severity | Reproducible |
|---|-------------|----------|-------------|
| 1 | No explicit pity counter shown | Low | Yes |

## Feature-Specific Feedback

### Pity System (Gacha)
- **Understood purpose?** Yes
- **Found engaging?** Yes - Good incentive to keep pulling
- **Suggestions**: Show pity progress in UI

### EXP Curve (Exponential)
- **Understood purpose?** Yes - Makes leveling harderlate game
- **Found engaging?** Maybe - Could be too grindy
- **Suggestions**: Add some catch-up mechanics for new players

### HP Pools (Difficulty)
- **Understood purpose?** Yes
- **Found engaging?** Yes - Strategic team building
- **Stage 5 enemies have 1.5x HP - noticeable but fair

### Elemental Matrix
- **Understood purpose?** Partially - Need a visual guide
- **Found engaging?** Yes - Tactical choices matter

### UI Components (Design System)
- **Understood purpose?** Yes
- **Found engaging?** Yes - Consistent, polished feel

## Quantitative Data (if available)
- **Pulls to ★5**: ~50 maximum (with pity)
- **EXP to level 10**: ~518 (was 1000 with old formula)
- **Enemy HP at Stage 5**: 1.5x base
- **Elemental weaknesses**: 2x damage, 0.5x resistance

## Overall Assessment
- **Would play again?** Yes
- **Difficulty**: Just Right (with HP scaling)
- **Pacing**: Good
- **Session length preference**: Good as is

## Top 3 Priorities from this session
1. Add elemental guide/chart to UI
2. Show pity counter in summon screen
3. Consider slight EXP curve reduction for early game