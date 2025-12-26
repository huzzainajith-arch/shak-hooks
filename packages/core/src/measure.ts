export interface Rect {
  width: number;
  height: number;
  x: number;
  y: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export type MeasureResult<RefType> = [RefType, Rect];
