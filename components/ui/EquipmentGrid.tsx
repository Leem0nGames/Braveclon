import { COLORS, BORDERS, TYPOGRAPHY } from '@/lib/design-tokens';
import { EquipmentTemplate, EquipSlot } from '@/lib/gameData';

interface EquipmentSlotProps {
  slot: EquipSlot;
  equipment: EquipmentTemplate | null;
  onEquip: () => void;
  onUnequip: () => void;
  className?: string;
}

const SLOT_ICONS = {
  weapon: '⚔️',
  armor: '🛡️',
  accessory: '💍',
};

const SLOT_COLORS = {
  weapon: 'border-red-600 from-red-900/50 to-red-950',
  armor: 'border-blue-600 from-blue-900/50 to-blue-950',
  accessory: 'border-yellow-600 from-yellow-900/50 to-yellow-950',
};

export function EquipmentSlot({ slot, equipment, onEquip, onUnequip, className = '' }: EquipmentSlotProps) {
  const hasEquipment = !!equipment;
  
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span className={`text-[10px] uppercase text-zinc-500 tracking-wider`}>{slot}</span>
        {!hasEquipment && (
          <button 
            onClick={onEquip}
            className="text-[10px] text-yellow-400 hover:text-yellow-300"
          >
            + Equip
          </button>
        )}
      </div>
      
      <div className={`
        ${BORDERS.radius.lg} border-2 p-2 flex items-center gap-2
        bg-gradient-to-b ${hasEquipment ? SLOT_COLORS[slot] : 'bg-zinc-900 border-zinc-700'}
        ${hasEquipment ? '' : 'border-dashed'}
        ${!hasEquipment ? 'cursor-pointer hover:border-zinc-500' : ''}
        transition-all
      `}>
        {hasEquipment ? (
          <>
            <div className="w-8 h-8 flex items-center justify-center text-xl bg-black/30 rounded">
              {equipment.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{equipment.name}</div>
              <div className="text-[9px] text-zinc-400 flex flex-wrap gap-1">
                {Object.entries(equipment.statsBonus).map(([stat, value]) => (
                  value ? (
                    <span key={stat} className={stat === 'hp' ? 'text-green-400' : stat === 'atk' ? 'text-red-400' : stat === 'def' ? 'text-blue-400' : 'text-yellow-400'}>
                      {stat.toUpperCase()}+{value}
                    </span>
                  ) : null
                ))}
              </div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onUnequip(); }}
              className="text-zinc-500 hover:text-red-400 text-sm"
            >
              ×
            </button>
          </>
        ) : (
          <div 
            onClick={onEquip}
            className="flex-1 flex items-center justify-center gap-1 text-zinc-500"
          >
            <span className="text-lg">{SLOT_ICONS[slot]}</span>
            <span className="text-[10px]">Empty</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface EquipmentGridProps {
  equipment: {
    weapon: EquipmentTemplate | null;
    armor: EquipmentTemplate | null;
    accessory: EquipmentTemplate | null;
  };
  onEquip: (slot: EquipSlot) => void;
  onUnequip: (slot: EquipSlot) => void;
  className?: string;
}

export function EquipmentGrid({ equipment, onEquip, onUnequip, className = '' }: EquipmentGridProps) {
  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
      <EquipmentSlot 
        slot="weapon" 
        equipment={equipment.weapon} 
        onEquip={() => onEquip('weapon')}
        onUnequip={() => onUnequip('weapon')}
      />
      <EquipmentSlot 
        slot="armor" 
        equipment={equipment.armor} 
        onEquip={() => onEquip('armor')}
        onUnequip={() => onUnequip('armor')}
      />
      <EquipmentSlot 
        slot="accessory" 
        equipment={equipment.accessory} 
        onEquip={() => onEquip('accessory')}
        onUnequip={() => onUnequip('accessory')}
      />
    </div>
  );
}