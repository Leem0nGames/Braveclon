# Braveclon Polish Report

## Assessment - Inconsistencias Identificadas

### 1. UI Components (CRITICAL - usar diseño system existente)
| Archivo | Issue | Solución |
|---------|-------|----------|
| `UnitFrame.tsx` | Duplicado, usar solo `UnitDisplay` | Deprecate |
| `UnitSprite.tsx` | Usa hardcoded borders | Usar design-tokens |
| `UnitStatusBox.tsx` | Duplica funcionalidad de `UnitDisplay` | Unificar |

### 2. Estilos Hardcodeados (HIGH)
| Patrón | Archivos Afectados | Propuesta |
|-------|-------------------|------------|
| `border-zinc-700` | 40+ files | Usar `COLORS.border.default` |
| `bg-zinc-900` | 30+ files | Usar `COLORS.background.secondary` |
| `text-zinc-400` | 25+ files | Usar `COLORS.text.muted` |
| `#b89947` (gold) | BattleTopHud | tokenizar |

### 3. Components UI Sin Usar (MEDIUM)
- `components/ui/` tiene: `Modal`, `StatBar`, `Badge`, `Button`, `UnitDisplay`
- Mucho still usando código hardcodeado

### 4. Propuestas de Fix

#### A) Consolidar Unit Components (Priority 1)
- Mantener `UnitDisplay` como única fuente
- Deprecate `UnitFrame`, `UnitSprite`, `UnitStatusBox`
- Migrar todos los usos

#### B) Crear Design Token Helper (Priority 2)
```typescript
// lib/ui-tokens.ts export const UI = {
  borders: 'border-2 border-zinc-700',
  cards: 'bg-zinc-900 rounded-xl p-4',
  buttons: 'bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-4 py-2',
}
```

#### C) Actualizar Componentes de Batalla (Priority 3)
- `BattleTopHud` gold color → design token
- `BattleControlsBar` → usar Button component
- `BattleArena` → consistencia con resto

### 5. Priority List

| # | Task | Severity | Esfuerzo |
|---|------|----------|----------|
| 1 | Deprecate UnitFrame, migrrar a UnitDisplay | Critical | Medium |
| 2 | Agregar design token helper | High | Low |
| 3 | Unificar BattleTopHud gold color | Medium | Low |
| 4 | Usar Button en modals | Medium | Low |
| 5 | Audit StatBar usage | Low | Medium |

---
**Recommendation**: Empezar con #1 para evitar duplicación futura, luego #2 para consistency.