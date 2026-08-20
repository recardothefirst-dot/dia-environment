/**
 * Top navigation bar with controls
 */

import React from 'react';
import { useStore } from '@/state';
import { Play, Square, RotateCcw, Save, Upload, FileText } from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    isSimulationRunning,
    startSimulation,
    stopSimulation,
    resetSimulation,
  } = useStore();

  return (
    <div className="h-16 bg-dia-darker border-b border-gray-700 flex items-center px-6 gap-4">
      <div className="flex-1">
        <h1 className="text-2xl font-bold accent-text">DIA Environment</h1>
      </div>

      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2 transition"
          onClick={() => alert('New factory - feature coming soon')}
        >
          New
        </button>

        <button
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 transition"
          onClick={() => alert('Save - feature coming soon')}
        >
          <Save size={16} />
          Save
        </button>

        <button
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 transition"
          onClick={() => alert('Load - feature coming soon')}
        >
          <Upload size={16} />
          Load
        </button>

        <div className="border-l border-gray-700 mx-2"></div>

        <button
          className={`px-4 py-2 rounded flex items-center gap-2 transition ${
            isSimulationRunning
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          onClick={isSimulationRunning ? stopSimulation : startSimulation}
        >
          {isSimulationRunning ? (
            <>
              <Square size={16} />
              Stop
            </>
          ) : (
            <>
              <Play size={16} />
              Run
            </>
          )}
        </button>

        <button
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 transition"
          onClick={resetSimulation}
        >
          <RotateCcw size={16} />
          Reset
        </button>

        <button
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 transition"
          onClick={() => alert('Export - feature coming soon')}
        >
          <FileText size={16} />
          Export
        </button>
      </div>
    </div>
  );
};
