/**
 * Right sidebar with properties panel
 */

import React from 'react';
import { useStore } from '@/state';
import { ChevronDown } from 'lucide-react';

export const RightSidebar: React.FC = () => {
  const { selectedComponentId, factory, deleteComponent, showPropertyPanel, togglePropertyPanel } = useStore();

  const selectedComponent = selectedComponentId && factory ? factory.getComponent(selectedComponentId) : null;

  return (
    <div className="w-80 h-full bg-dia-dark border-l border-gray-700 flex flex-col">
      <div className="px-4 py-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold accent-text">Properties</h2>
        <button
          onClick={togglePropertyPanel}
          className="p-1 hover:bg-gray-700 rounded transition"
        >
          <ChevronDown size={20} className={`transition-transform ${!showPropertyPanel ? '-rotate-90' : ''}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {selectedComponent ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-400">Name</label>
              <p className="text-sm mt-1">{selectedComponent.name}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400">Type</label>
              <p className="text-sm mt-1 capitalize">{selectedComponent.type}</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400">ID</label>
              <p className="text-xs mt-1 font-mono text-gray-500 break-all">{selectedComponent.id}</p>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <label className="text-xs font-semibold text-gray-400">Position</label>
              <div className="text-sm mt-2 space-y-1">
                <p>X: {selectedComponent.position.x.toFixed(2)}</p>
                <p>Y: {selectedComponent.position.y.toFixed(2)}</p>
                <p>Z: {selectedComponent.position.z.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400">Rotation</label>
              <div className="text-sm mt-2 space-y-1">
                <p>X: {selectedComponent.rotation.x.toFixed(2)}</p>
                <p>Y: {selectedComponent.rotation.y.toFixed(2)}</p>
                <p>Z: {selectedComponent.rotation.z.toFixed(2)}</p>
              </div>
            </div>

            {selectedComponent.type === 'machine' && 'cycleTime' in selectedComponent && (
              <div className="border-t border-gray-700 pt-4">
                <label className="text-xs font-semibold text-gray-400">Machine Parameters</label>
                <div className="text-sm mt-2 space-y-1">
                  <p>Cycle Time: {(selectedComponent as any).cycleTime}ms</p>
                  <p>Capacity: {(selectedComponent as any).capacity}</p>
                  <p>Utilization: {(selectedComponent as any).utilization.toFixed(1)}%</p>
                  <p>Status: {(selectedComponent as any).status}</p>
                </div>
              </div>
            )}

            <button
              onClick={() => deleteComponent(selectedComponentId!)}
              className="w-full mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition"
            >
              Delete Component
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>Select a component to view its properties</p>
          </div>
        )}
      </div>
    </div>
  );
};
