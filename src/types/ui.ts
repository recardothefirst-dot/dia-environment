/**
 * UI state and interaction types.
 */

export interface UIState {
  selectedComponentId: string | null;
  isDragging: boolean;
  dragMode: 'move' | 'rotate' | null;
  showPropertyPanel: boolean;
  showSimulationStats: boolean;
}

export interface ViewportControls {
  orbitEnabled: boolean;
  panEnabled: boolean;
  zoomEnabled: boolean;
}
