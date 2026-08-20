/**
 * Global application state management using Zustand
 */

import { create } from 'zustand';
import { FactoryModel } from '@/factory';
import { SimulationEngine } from '@/simulation';
import { Component, Vector3 } from '@/types/factory';
import { UIState } from '@/types/ui';

interface AppState {
  // Factory and Simulation
  factory: FactoryModel | null;
  simulation: SimulationEngine | null;
  
  // UI State
  selectedComponentId: string | null;
  isDragging: boolean;
  dragMode: 'move' | 'rotate' | null;
  showPropertyPanel: boolean;
  showSimulationStats: boolean;
  
  // Simulation State
  isSimulationRunning: boolean;
  simulationTime: number;
  productCount: number;
  completedProducts: number;
  throughput: number;
  bottlenecks: string[];
  machineUtilization: Map<string, number>;
  
  // Actions
  initializeFactory: (name?: string) => void;
  addComponent: (type: string, name: string, position: Vector3) => void;
  selectComponent: (id: string | null) => void;
  deleteComponent: (id: string) => void;
  moveComponent: (id: string, position: Vector3) => void;
  rotateComponent: (id: string, rotation: Vector3) => void;
  startDrag: (mode: 'move' | 'rotate') => void;
  endDrag: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  resetSimulation: () => void;
  updateSimulation: (deltaTime: number) => void;
  togglePropertyPanel: () => void;
  toggleSimulationStats: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  factory: null,
  simulation: null,
  selectedComponentId: null,
  isDragging: false,
  dragMode: null,
  showPropertyPanel: true,
  showSimulationStats: true,
  isSimulationRunning: false,
  simulationTime: 0,
  productCount: 0,
  completedProducts: 0,
  throughput: 0,
  bottlenecks: [],
  machineUtilization: new Map(),

  initializeFactory: (name = 'DIA Factory') => {
    const factory = new FactoryModel(name);
    const simulation = new SimulationEngine(factory.getFactory());
    set({
      factory,
      simulation,
      selectedComponentId: null,
      bottlenecks: [],
      machineUtilization: new Map(),
    });
  },

  addComponent: (type: string, name: string, position: Vector3) => {
    const state = get();
    if (!state.factory) return;
    
    state.factory.addComponent(type as any, name, position);
    set({ factory: state.factory });
  },

  selectComponent: (id: string | null) => {
    set({ selectedComponentId: id });
  },

  deleteComponent: (id: string) => {
    const state = get();
    if (!state.factory) return;
    
    state.factory.deleteComponent(id);
    set({
      factory: state.factory,
      selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
    });
  },

  moveComponent: (id: string, position: Vector3) => {
    const state = get();
    if (!state.factory) return;
    
    state.factory.updateComponentPosition(id, position);
    set({ factory: state.factory });
  },

  rotateComponent: (id: string, rotation: Vector3) => {
    const state = get();
    if (!state.factory) return;
    
    state.factory.updateComponentRotation(id, rotation);
    set({ factory: state.factory });
  },

  startDrag: (mode: 'move' | 'rotate') => {
    set({ isDragging: true, dragMode: mode });
  },

  endDrag: () => {
    set({ isDragging: false, dragMode: null });
  },

  startSimulation: () => {
    const state = get();
    if (!state.simulation) return;
    
    state.simulation.start();
    set({ isSimulationRunning: true });
  },

  stopSimulation: () => {
    const state = get();
    if (!state.simulation) return;
    
    state.simulation.stop();
    set({ isSimulationRunning: false });
  },

  resetSimulation: () => {
    const state = get();
    if (!state.simulation) return;
    
    state.simulation.reset();
    set({
      isSimulationRunning: false,
      simulationTime: 0,
      productCount: 0,
      completedProducts: 0,
      throughput: 0,
      bottlenecks: [],
    });
  },

  updateSimulation: (deltaTime: number) => {
    const state = get();
    if (!state.simulation || !state.isSimulationRunning) return;
    
    state.simulation.simulate(deltaTime);
    const simState = state.simulation.getState();
    
    set({
      simulationTime: simState.currentTime,
      productCount: simState.productCount,
      completedProducts: simState.completedProducts,
      throughput: state.simulation.getThroughput(),
      bottlenecks: simState.bottlenecks,
      machineUtilization: simState.machineUtilization,
    });
  },

  togglePropertyPanel: () => {
    set((state) => ({ showPropertyPanel: !state.showPropertyPanel }));
  },

  toggleSimulationStats: () => {
    set((state) => ({ showSimulationStats: !state.showSimulationStats }));
  },
}));
