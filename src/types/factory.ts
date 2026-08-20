/**
 * Core factory domain types.
 * These types represent the industrial production system model.
 * Independent from UI and rendering concerns.
 */

export type ComponentType = 'machine' | 'conveyor' | 'robot' | 'sensor' | 'buffer' | 'worker' | 'product' | 'inspection';

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface BaseComponent {
  id: string;
  type: ComponentType;
  name: string;
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  createdAt: number;
  updatedAt: number;
}

export interface MachineComponent extends BaseComponent {
  type: 'machine';
  cycleTime: number; // milliseconds
  processingTime: number;
  capacity: number;
  currentLoad: number;
  utilization: number; // 0-100%
  status: 'idle' | 'processing' | 'blocked' | 'starved';
  inputBuffers: string[]; // IDs of connected buffers
  outputBuffers: string[];
}

export interface ConveyorComponent extends BaseComponent {
  type: 'conveyor';
  speed: number; // units/second
  length: number;
  width: number;
  productIds: string[]; // Products on this conveyor
}

export interface RobotComponent extends BaseComponent {
  type: 'robot';
  cycleTime: number;
  reach: number;
  status: 'idle' | 'working' | 'error';
}

export interface SensorComponent extends BaseComponent {
  type: 'sensor';
  sensorType: 'proximity' | 'vision' | 'weight' | 'temperature';
  detectionRange: number;
}

export interface BufferComponent extends BaseComponent {
  type: 'buffer';
  capacity: number;
  currentItems: number;
  productIds: string[];
}

export interface WorkerComponent extends BaseComponent {
  type: 'worker';
  role: string;
  status: 'idle' | 'working' | 'break';
}

export interface ProductComponent extends BaseComponent {
  type: 'product';
  status: 'created' | 'processing' | 'completed' | 'rejected';
  currentLocation: string | null; // ID of component where product is
  processedBy: string[]; // IDs of machines that have processed this
}

export interface InspectionComponent extends BaseComponent {
  type: 'inspection';
  inspectionTime: number;
  passRate: number;
}

export type Component = MachineComponent | ConveyorComponent | RobotComponent | SensorComponent | BufferComponent | WorkerComponent | ProductComponent | InspectionComponent;

export interface Factory {
  id: string;
  name: string;
  components: Map<string, Component>;
  createdAt: number;
  updatedAt: number;
  description?: string;
}

export interface SimulationState {
  isRunning: boolean;
  currentTime: number; // milliseconds
  productCount: number;
  completedProducts: number;
  machineUtilization: Map<string, number>;
  bottlenecks: string[]; // IDs of bottleneck machines
}
