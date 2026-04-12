import Image from 'next/image';
import { Card, CardBody, Button, Badge } from '@/components/ui';
import { Sword, Crown, Gift, Zap } from 'lucide-react';

export default function HomeScreen({ onNavigate }: { onNavigate: (screen: any) => void }) {
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

      {/* Main Actions */}
      <div className="px-4 py-2 space-y-3">
        <h2 className="text-lg font-bold text-zinc-200 uppercase tracking-wider px-2">Quick Actions</h2>
        
        {/* Primary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card variant="elevated" hover className="overflow-hidden cursor-pointer" onClick={() => onNavigate('quest')}>
            <CardBody className="p-0">
              <button className="w-full h-full flex flex-col items-center justify-center p-4 gap-2 group">
                <div className="text-4xl group-hover:scale-110 transition-transform">⚔️</div>
                <div className="text-center">
                  <p className="font-bold text-sm">Quest</p>
                  <p className="text-xs text-zinc-500">Story Mode</p>
                </div>
              </button>
            </CardBody>
          </Card>

          <Card variant="elevated" hover className="overflow-hidden cursor-pointer" onClick={() => onNavigate('summon')}>
            <CardBody className="p-0">
              <button className="w-full h-full flex flex-col items-center justify-center p-4 gap-2 group">
                <div className="text-4xl group-hover:scale-110 transition-transform">✨</div>
                <div className="text-center">
                  <p className="font-bold text-sm">Summon</p>
                  <p className="text-xs text-zinc-500">Get Heroes</p>
                </div>
              </button>
            </CardBody>
          </Card>

          <Card variant="elevated" hover className="overflow-hidden cursor-pointer" onClick={() => onNavigate('units')}>
            <CardBody className="p-0">
              <button className="w-full h-full flex flex-col items-center justify-center p-4 gap-2 group">
                <div className="text-4xl group-hover:scale-110 transition-transform">👥</div>
                <div className="text-center">
                  <p className="font-bold text-sm">Units</p>
                  <p className="text-xs text-zinc-500">Your Team</p>
                </div>
              </button>
            </CardBody>
          </Card>

          <Card variant="elevated" hover className="overflow-hidden cursor-pointer" onClick={() => onNavigate('fusion')}>
            <CardBody className="p-0">
              <button className="w-full h-full flex flex-col items-center justify-center p-4 gap-2 group">
                <div className="text-4xl group-hover:scale-110 transition-transform">🔀</div>
                <div className="text-center">
                  <p className="font-bold text-sm">Fusion</p>
                  <p className="text-xs text-zinc-500">Fuse Heroes</p>
                </div>
              </button>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Featured Section */}
      <div className="px-4 py-4">
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-zinc-200 uppercase tracking-wider">Featured</h2>
          
          {/* QR Hunt Card */}
          <Card variant="elevated" hover className="overflow-hidden">
            <CardBody className="p-4">
              <button 
                onClick={() => onNavigate('qrhunt')}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-base mb-1">QR Hunt</h3>
                    <p className="text-xs text-zinc-400">Scan codes for special loot!</p>
                  </div>
                  <div className="text-2xl">📱</div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="success">Daily Bonus</Badge>
                  <Badge variant="warning">5 Scans Left</Badge>
                </div>
              </button>
            </CardBody>
          </Card>

          {/* Events Card */}
          <Card variant="elevated" className="overflow-hidden border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-transparent">
            <CardBody className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                    <span>🏆</span> Special Event
                  </h3>
                  <p className="text-xs text-zinc-400">Legendary Heroes reduced summon!</p>
                </div>
                <Badge variant="danger">Limited</Badge>
              </div>
            </CardBody>
          </Card>
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
