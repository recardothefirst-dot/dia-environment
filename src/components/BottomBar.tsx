/**
 * Bottom status bar showing simulation stats
 */

import React from 'react';
import { useStore } from '@/state';

export const BottomBar: React.FC = () => {
  const {
    isSimulationRunning,
    simulationTime,
    completedProducts,
    throughput,
    bottlenecks,
    factory,
  } = useStore();

  const bottleneckNames = bottlenecks
    .map((id) => factory?.getComponent(id)?.name)
    .filter(Boolean)
    .join(', ');

  return (
    <div className="h-12 bg-dia-darker border-t border-gray-700 flex items-center px-6 gap-8 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-gray-400">Status:</span>
        <span className={isSimulationRunning ? 'text-green-400 font-semibold' : 'text-gray-500'}>
          {isSimulationRunning ? '● Running' : '○ Stopped'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-400">Time:</span>
        <span>{(simulationTime / 1000).toFixed(2)}s</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-400">Completed:</span>
        <span>{completedProducts} products</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-400">Throughput:</span>
        <span>{throughput.toFixed(2)} products/s</span>
      </div>

      {bottlenecks.length > 0 && (
        <div className="flex items-center gap-2 ml-auto text-orange-400 font-semibold">
          <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          Bottleneck: {bottleneckNames || 'Unknown'}
        </div>
      )}
    </div>
  );
};
