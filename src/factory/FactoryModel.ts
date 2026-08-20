/**
 * Factory Model - Core business logic
 * Independent from React and Three.js
 * Handles factory state and operations
 */

import { Factory, Component, ComponentType, Vector3, MachineComponent, ConveyorComponent, BufferComponent, ProductComponent } from '@/types/factory';
import { generateId } from '@/utils/id';

export class FactoryModel {
  private factory: Factory;

  constructor(name: string = 'Default Factory') {
    this.factory = {
      id: generateId(),
      name,
      components: new Map(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  getFactory(): Factory {
    return this.factory;
  }

  addComponent(type: ComponentType, name: string, position: Vector3): Component {
    const id = generateId();
    const now = Date.now();
    const scale = { x: 1, y: 1, z: 1 };
    const rotation = { x: 0, y: 0, z: 0 };

    let component: Component;

    switch (type) {
      case 'machine':
        component = {
          id,
          type,
          name,
          position,
          rotation,
          scale,
          createdAt: now,
          updatedAt: now,
          cycleTime: 5000,
          processingTime: 5000,
          capacity: 1,
          currentLoad: 0,
          utilization: 0,
          status: 'idle',
          inputBuffers: [],
          outputBuffers: [],
        } as MachineComponent;
        break;
      case 'conveyor':
        component = {
          id,
          type,
          name,
          position,
          rotation,
          scale,
          createdAt: now,
          updatedAt: now,
          speed: 2,
          length: 10,
          width: 1,
          productIds: [],
        } as ConveyorComponent;
        break;
      case 'buffer':
        component = {
          id,
          type,
          name,
          position,
          rotation,
          scale,
          createdAt: now,
          updatedAt: now,
          capacity: 10,
          currentItems: 0,
          productIds: [],
        } as BufferComponent;
        break;
      case 'robot':
        component = {
          id,
          type,
          name,
          position,
          rotation,
          scale,
          createdAt: now,
          updatedAt: now,
          cycleTime: 3000,
          reach: 2,
          status: 'idle',
        };
        break;
      case 'sensor':
        component = {
          id,
          type,
          name,
          position,
          rotation,
          scale,
          createdAt: now,
          updatedAt: now,
          sensorType: 'proximity',
          detectionRange: 1,
        };
        break;
      case 'inspection':
        component = {
          id,
          type,
          name,
          position,
          rotation,
          scale,
          createdAt: now,
          updatedAt: now,
          inspectionTime: 2000,
          passRate: 95,
        };
        break;
      case 'worker':
        component = {
          id,
          type,
          name,
          position,
          rotation,
          scale,
          createdAt: now,
          updatedAt: now,
          role: 'operator',
          status: 'idle',
        };
        break;
      case 'product':
        component = {
          id,
          type,
          name,
          position,
          rotation,
          scale,
          createdAt: now,
          updatedAt: now,
          status: 'created',
          currentLocation: null,
          processedBy: [],
        } as ProductComponent;
        break;
      default:
        throw new Error(`Unknown component type: ${type}`);
    }

    this.factory.components.set(id, component);
    this.factory.updatedAt = Date.now();
    return component;
  }

  getComponent(id: string): Component | undefined {
    return this.factory.components.get(id);
  }

  updateComponentPosition(id: string, position: Vector3): void {
    const component = this.factory.components.get(id);
    if (component) {
      component.position = position;
      component.updatedAt = Date.now();
      this.factory.updatedAt = Date.now();
    }
  }

  updateComponentRotation(id: string, rotation: Vector3): void {
    const component = this.factory.components.get(id);
    if (component) {
      component.rotation = rotation;
      component.updatedAt = Date.now();
      this.factory.updatedAt = Date.now();
    }
  }

  deleteComponent(id: string): void {
    this.factory.components.delete(id);
    this.factory.updatedAt = Date.now();
  }

  getAllComponents(): Component[] {
    return Array.from(this.factory.components.values());
  }

  getComponentsByType(type: ComponentType): Component[] {
    return Array.from(this.factory.components.values()).filter(c => c.type === type);
  }
}
