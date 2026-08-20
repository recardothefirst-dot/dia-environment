/**
 * Simulation Engine - Discrete event simulation
 * Handles product flow, machine processing, bottleneck detection
 */

import { Factory, Component, MachineComponent, ConveyorComponent, BufferComponent, ProductComponent, SimulationState } from '@/types/factory';
import { generateId } from '@/utils/id';

export class SimulationEngine {
  private factory: Factory;
  private state: SimulationState;
  private machineTimers: Map<string, number> = new Map();
  private productLocationMap: Map<string, string> = new Map(); // productId -> componentId

  constructor(factory: Factory) {
    this.factory = factory;
    this.state = {
      isRunning: false,
      currentTime: 0,
      productCount: 0,
      completedProducts: 0,
      machineUtilization: new Map(),
      bottlenecks: [],
    };
    this.initializeMachineUtilization();
  }

  private initializeMachineUtilization(): void {
    this.factory.components.forEach((component, id) => {
      if (component.type === 'machine') {
        this.state.machineUtilization.set(id, 0);
      }
    });
  }

  getState(): SimulationState {
    return this.state;
  }

  start(): void {
    this.state.isRunning = true;
    this.state.currentTime = 0;
    this.state.productCount = 0;
    this.state.completedProducts = 0;
    this.machineTimers.clear();
    this.productLocationMap.clear();
    this.state.machineUtilization.clear();
    this.initializeMachineUtilization();
  }

  stop(): void {
    this.state.isRunning = false;
    this.machineTimers.clear();
  }

  reset(): void {
    this.stop();
    this.state.currentTime = 0;
    this.state.productCount = 0;
    this.state.completedProducts = 0;
    this.machineTimers.clear();
    this.productLocationMap.clear();
    this.state.machineUtilization.clear();
    this.initializeMachineUtilization();
    this.state.bottlenecks = [];
  }

  simulate(deltaTime: number): void {
    if (!this.state.isRunning) return;

    this.state.currentTime += deltaTime;

    // Process machines
    this.factory.components.forEach((component) => {
      if (component.type === 'machine') {
        this.processMachine(component as MachineComponent, deltaTime);
      }
    });

    // Move products on conveyors
    this.factory.components.forEach((component) => {
      if (component.type === 'conveyor') {
        this.moveProductsOnConveyor(component as ConveyorComponent, deltaTime);
      }
    });

    // Detect bottlenecks
    this.detectBottlenecks();
  }

  private processMachine(machine: MachineComponent, deltaTime: number): void {
    const timerId = machine.id;
    const currentTimer = this.machineTimers.get(timerId) || 0;
    const newTimer = currentTimer + deltaTime;

    if (machine.status === 'idle' && newTimer >= machine.cycleTime) {
      machine.status = 'processing';
      this.machineTimers.set(timerId, 0);
      machine.utilization = Math.min(100, machine.utilization + 15);
    } else if (machine.status === 'processing') {
      this.machineTimers.set(timerId, newTimer);
      if (newTimer >= machine.processingTime) {
        machine.status = 'idle';
        machine.utilization = Math.max(0, machine.utilization - 5);
        this.machineTimers.set(timerId, 0);
      }
    }
  }

  private moveProductsOnConveyor(conveyor: ConveyorComponent, deltaTime: number): void {
    // Simple conveyor movement - products move along the conveyor
    // In a real system, products would have positions along the conveyor length
  }

  private detectBottlenecks(): void {
    const bottlenecks: string[] = [];
    const threshold = 80; // 80% utilization

    this.factory.components.forEach((component, id) => {
      if (component.type === 'machine') {
        const machine = component as MachineComponent;
        if (machine.utilization >= threshold) {
          bottlenecks.push(id);
        }
      }
    });

    this.state.bottlenecks = bottlenecks;
  }

  createProduct(machineId: string): void {
    this.state.productCount++;
    const product = this.factory.components.get(machineId);
    if (product && product.type === 'machine') {
      const machine = product as MachineComponent;
      machine.currentLoad++;
    }
  }

  completeProduct(): void {
    this.state.completedProducts++;
  }

  getMachineUtilization(): Map<string, number> {
    return this.state.machineUtilization;
  }

  updateMachineUtilization(machineId: string, utilization: number): void {
    this.state.machineUtilization.set(machineId, Math.min(100, Math.max(0, utilization)));
  }

  getThroughput(): number {
    if (this.state.currentTime === 0) return 0;
    return (this.state.completedProducts / this.state.currentTime) * 1000; // products per second
  }
}
