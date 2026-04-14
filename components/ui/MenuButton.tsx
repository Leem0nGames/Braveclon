import { cn } from '@/lib/utils';

interface MenuButtonProps {
  title: string;
  subtitle: string;
  color: string;
  onClick: () => void;
}

export function MenuButton({ title, subtitle, color, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl p-4 text-left transition-all duration-200",
        "hover:scale-[1.02] active:scale-[0.98] shadow-lg",
        "bg-gradient-to-br",
        color,
        "before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
      )}
    >
      <div className="relative">
        <div className="text-lg font-bold text-white drop-shadow-md">{title}</div>
        <div className="text-xs text-white/80 font-medium">{subtitle}</div>
      </div>
    </button>
  );
}