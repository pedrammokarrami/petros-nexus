/**
 * LightingFx — overhead lighting overlay for the room. Two slow-sweeping
 * spotlights, optional god rays cutting diagonally, and an ambient floor
 * wash that picks up the current --accent.
 *
 * Sits above PhotoBackdrop, below the room objects.
 */
export interface LightingFxProps {
  /** How many spotlights to draw. @default 2 */
  spotlights?: number;
  /** Diagonal volumetric "god ray" beams. @default true */
  godRays?: boolean;
  /** Floor ambient wash — the warm/cool pool on the ground. @default true */
  floorWash?: boolean;
  /** 0..1 — overall mood. Higher = warmer + brighter. */
  mood?: number;
}
