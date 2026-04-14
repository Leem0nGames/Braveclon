import { STAGES } from '@/lib/gameData';
import WorldMap from './WorldMap';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type ViewMode = 'map' | 'list';

export default function QuestScreen({ onStartBattle }: { onStartBattle: (stageId: number) => void }) {
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  
  const handleSelectStage = (stageId: number) => {
    onStartBattle(stageId);
  };

  const handleCompleteStage = (stageId: number) => {
    if (!completedStages.includes(stageId)) {
      setCompletedStages(prev => [...prev, stageId]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with toggle */}
      <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900">
        <h2 className="text-xl font-black italic text-zinc-100 uppercase tracking-wider">World Map</h2>
        
        {/* View toggle */}
        <div className="flex bg-zinc-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
              viewMode === 'map' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🗺️ Map
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
              viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            📋 List
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <AnimatePresence mode="wait">
          {viewMode === 'map' ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <WorldMap 
                completedStages={completedStages} 
                onSelectStage={handleSelectStage} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-4 h-full overflow-y-auto"
            >
              {STAGES.map(stage => {
                const isUnlocked = stage.id === 1 || completedStages.includes(stage.id - 1);
                const isCompleted = completedStages.includes(stage.id);
                
                return (
                  <div 
                    key={stage.id} 
                    className={`
                      bg-zinc-900 border rounded-xl overflow-hidden shadow-md transition-all
                      ${isCompleted ? 'border-emerald-700/50' : isUnlocked ? 'border-zinc-700 hover:border-zinc-600' : 'border-zinc-800 opacity-50'}
                    `}
                  >
                    <div className="bg-zinc-800 px-4 py-2 border-b border-zinc-700 flex justify-between items-center">
                      <span className="font-bold text-sm text-zinc-300">{stage.name}</span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">⚡ {stage.energy}</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg text-white">{stage.area}</h3>
                        <p className="text-xs text-zinc-500 mt-1">{stage.description}</p>
                        <div className="flex gap-3 mt-2 text-xs">
                          <span className="text-yellow-400">💰 {stage.zelReward}</span>
                          <span className="text-blue-400">✨ {stage.expReward} EXP</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => isUnlocked && handleSelectStage(stage.id)}
                        disabled={!isUnlocked}
                        className={`
                          font-bold py-2 px-6 rounded-lg transition-colors
                          ${isUnlocked 
                            ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          }
                        `}
                      >
                        {isCompleted ? '✓ CLEARED' : isUnlocked ? 'START' : 'LOCKED'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
