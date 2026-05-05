import { Home, Users, Sparkles, Swords } from 'lucide-react';
import { Screen } from '@/hooks/useGameApp';

export function BottomNav({ currentScreen, setCurrentScreen }: { currentScreen: Screen, setCurrentScreen: (s: Screen) => void }) {
  return (
    <nav className="flex justify-around bg-zinc-950 pb-safe pt-2 border-t border-zinc-800 z-10">
      <NavButton 
        icon={<Home size={24} />} 
        label="Home" 
        isActive={currentScreen === 'home'} 
        onClick={() => setCurrentScreen('home')} 
        ariaCurrent={currentScreen === 'home' ? 'page' : undefined}
      />
      <NavButton 
        icon={<Users size={24} />} 
        label="Units" 
        isActive={currentScreen === 'units'} 
        onClick={() => setCurrentScreen('units')} 
        ariaCurrent={currentScreen === 'units' ? 'page' : undefined}
      />
      <NavButton 
        icon={<Swords size={24} />} 
        label="Quest" 
        isActive={currentScreen === 'quest'} 
        onClick={() => setCurrentScreen('quest')} 
        ariaCurrent={currentScreen === 'quest' ? 'page' : undefined}
      />
      <NavButton 
        icon={<Sparkles size={24} />} 
        label="Summon" 
        isActive={currentScreen === 'summon'} 
        onClick={() => setCurrentScreen('summon')} 
        ariaCurrent={currentScreen === 'summon' ? 'page' : undefined}
      />
    </nav>
  );
}

function NavButton({ icon, label, isActive, onClick, ariaCurrent }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, ariaCurrent?: "page" | "step" | "location" | "date" | "time" | "true" | "false" }) {
  return (
    <button 
      onClick={onClick}
      aria-current={ariaCurrent}
      className={`flex flex-col items-center justify-center w-16 h-14 transition-colors ${
        isActive ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="text-[10px] mt-1 font-medium uppercase tracking-wider">{label}</span>
    </button>
  );
}
