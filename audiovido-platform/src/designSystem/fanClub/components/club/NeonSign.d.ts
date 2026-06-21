/**
 * NeonSign — glowing neon-tube text. Two visual styles: tube (outlined
 * letters with a thick stroke + bloom) and solid (filled glow). Add
 * `flicker` for the dying-bulb effect.
 *
 * Use these as on-wall decor: "LIVE MUSIC", "NOW SHOWING", "OPEN MIC".
 */
export interface NeonSignProps {
  /** Sign text. */
  children: React.ReactNode;
  /** Visual style. @default "tube" */
  style?: "tube" | "solid";
  /** Neon color. Defaults to current room --accent. */
  color?: string;
  /** Size in px (the height of the cap-line). @default 56 */
  size?: number;
  /** Random flicker every few seconds. @default false */
  flicker?: boolean;
  /** Frame the sign in a metal bracket. @default false */
  framed?: boolean;
  /** Tilt the sign (deg). @default 0 */
  rotate?: number;
}
