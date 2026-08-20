/**
 * Left sidebar with component library
 */

import React from 'react';
import { useStore } from '@/state';
import { Wrench, Wind, Zap, Eye, Container, Users, Package, CheckCircle } from 'lucide-react';

const COMPONENT_TYPES = [
  { id: 'machine', name: 'Machine', icon: Wrench },
  { id: 'conveyor', name: 'Conveyor', icon: Wind },
  { id: 'robot', name: 'Robot', icon: Zap },
  { id: 'sensor', name: 'Sensor', icon: Eye },
  { id: 'buffer', name: 'Buffer', icon: Container },
  { id: 'worker', name: 'Worker', icon: Users },
  { id: 'product', name: 'Product', icon: Package },
  { id: 'inspection', name: 'Inspection', icon: CheckCircle },
];

export const LeftSidebar: React.FC = () => {
  const { addComponent } = useStore();
  const [draggedType, setDraggedType] = React.useState<string | null>(null);

  const handleDragStart = (type: string) => {
    setDraggedType(type);
  };

  const handleDragEnd = () => {
    setDraggedType(null);
  };

  return (
    <div className="w-64 h-full bg-dia-dark border-r border-gray-700 flex flex-col">
      <div className="px-4 py-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold accent-text">Components</h2>
        <p className="text-xs text-gray-500 mt-1">Drag to viewport to add</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {COMPONENT_TYPES.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            draggable
            onDragStart={() => handleDragStart(id)}
            onDragEnd={handleDragEnd}
            onClick={() => addComponent(id, `${name} 1`, { x: 0, y: 0, z: 0 })}
            className={`w-full px-3 py-2 rounded border border-gray-600 hover:border-blue-400 hover:bg-gray-800 transition flex items-center gap-2 cursor-move ${
              draggedType === id ? 'bg-blue-900 border-blue-500' : 'bg-gray-900'
            }`}
          >
            <Icon size={16} className="flex-shrink-0" />
            <span className="text-sm">{name}</span>
          </button>
        ))}
      </div>

      <div className="px-4 py-4 border-t border-gray-700 text-xs text-gray-400">
        <p>Tip: Click to add component at origin</p>
      </div>
    </div>
  );
};
