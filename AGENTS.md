# AGENTS.md

## Setup (Next.js AI Studio applet)

```bash
npm install
# Create .env.local with GEMINI_API_KEY
cp .env.example .env.local
npm run dev
```

## Braveclon Game Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + TailwindCSS 4 + Motion
- **State**: Local storage persistido (no backend)
- **Audio**: Web Audio API

### Project Structure
```
app/           # Next.js pages (page.tsx = main game)
components/    # UI screens y componentes
  ├── battle/  # Componentes de batalla
hooks/         # useGameApp, useBattle, useMobile
lib/           # gameTypes, gameData, gameState, utils
```

### Core Systems (lib/gameData.ts)
- **6 Elements**: Fire, Water, Earth, Thunder, Light, Dark
- **Unit System**: templates → instances → equip/fuse/evolve
- **Battle**: turn-based con BB gauge, elemental weakness
- **Equipment**: weapon, armor, accessory (slots)

### Key Entry Points
- `app/page.tsx`: Main game router (currentScreen state)
- `hooks/useGameApp.ts`: Global game state + actions
- `hooks/useBattle.ts`: Battle logic
- `lib/gameState.ts`: State persistence

## Game Studio Framework

`opencode-game-studio/` contiene el framework de 54 agentes.

### Recommended Agents for Braveclon

| Task | Agent |
|------|-------|
| Design new unit/feature | @game-designer |
| Battle mechanics | @gameplay-programmer |
| UI/UX improvements | @ui-programmer, @ux-designer |
| Performance | @performance-analyst |
| Code review | @lead-programmer |
| Audio system | @sound-designer |

### Skills Útiles

| Skill | Use Case |
|-------|----------|
| `/code-review` | Review de nuevas features |
| `/balance-check` | Balanceo de stats/ Drop rates |
| `/prototype` | Test de nuevas mecánicas |
| `/playtest-report` | Feedback de gameplay | |