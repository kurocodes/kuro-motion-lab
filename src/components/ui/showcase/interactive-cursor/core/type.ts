export interface CursorProps {
  size?: number;
  color?: React.CSSProperties["color"];
  stiffness?: number;
  damping?: number;
  spring?: boolean;
}

export interface HoverElementData {
  width: number;
  height: number;
  x: number;
  y: number;
  borderRadius: number;
  tagName: string;
}

export interface MagneticOptions {
  maxX?: number;
  maxY?: number;
}