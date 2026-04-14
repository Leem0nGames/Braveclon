import Image from 'next/image';
import { Card, CardBody, Button, Badge } from '@/components/ui';
import { MenuButton } from '@/components/ui/MenuButton';
import { Sword, Crown, Gift, Zap } from 'lucide-react';

export default function HomeScreen({ onNavigate }: { onNavigate: (screen: 'home' | 'quest' | 'units' | 'battle' | 'qrhunt' | 'summon' | 'arena' | 'shop') => void }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-amber-600/20 via-zinc-900 to-transparent px-4 py-8 text-center border-b border-amber-500/10">
        <div className="space-y-3">
          <div className="text-6xl font-black italic drop-shadow-lg">⚔️</div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-orange-600">
            BRAVE<br/>FRONTIER
          </h1>
          <p className="text-sm text-zinc-400">Tactical RPG Adventure</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-4 grid grid-cols-3 gap-2">
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl mb-1">💪</div>
          <p className="text-xs font-mono text-zinc-400">Level Up Ready</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-green-600/10 border border-emerald-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl mb-1">⚡</div>
          <p className="text-xs font-mono text-zinc-400">Energy Full</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl mb-1">✨</div>
          <p className="text-xs font-mono text-zinc-400">Summon Ready</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-8">
        <MenuButton 
          title="Quest" 
          subtitle="Story Mode" 
          color="from-blue-500 to-cyan-600"
          onClick={() => onNavigate('quest')}
        />
        <MenuButton 
          title="Units" 
          subtitle="Manage Team" 
          color="from-emerald-500 to-green-600"
          onClick={() => onNavigate('units')}
        />
        <MenuButton 
          title="Summon" 
          subtitle="Get Heroes" 
          color="from-purple-500 to-pink-600"
          onClick={() => onNavigate('summon')}
        />
        <MenuButton 
          title="Shop" 
          subtitle="Buy Items!" 
          color="from-yellow-600 to-amber-700"
          onClick={() => onNavigate('shop')}
        />
        <MenuButton 
          title="Arena" 
          subtitle="Practice Battle!" 
          color="from-zinc-600 to-zinc-700"
          onClick={() => onNavigate('arena')}
        />
        
        <div className="col-span-2">
          <MenuButton 
            title="QR Hunt" 
            subtitle="Scan Codes for Loot!" 
            color="from-emerald-400 to-teal-600"
            onClick={() => onNavigate('qrhunt')}
          />
        </div>
      </div>

      {/* Tips Section */}
      <div className="px-4 py-4">
        <Card variant="outlined" className="bg-zinc-800/30">
          <CardBody className="p-3">
            <p className="text-xs text-zinc-300 leading-relaxed">
              💡 <strong>Pro Tip:</strong> Fuse units with the same element for bonus damage! Elemental advantages are key to victory.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
