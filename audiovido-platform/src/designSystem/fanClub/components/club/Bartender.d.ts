/**
 * Bartender — the venue's NPC. An <image-slot> for the character portrait,
 * with a speech-bubble queue that cycles through ambient greetings.
 *
 * Position in a top corner. The bartender speaks at intervals (or you can
 * push lines via `speak`).
 */
export interface BartenderProps {
  /** Display name. @default "Bartender" */
  name?: string;
  /** image-slot id for the character portrait. */
  slotId: string;
  placeholder?: string;
  /** Optional initial portrait src. */
  src?: string;
  /** Cycling ambient lines (cycled every `interval` ms). */
  lines?: string[];
  /** Optional currently-active line — overrides the cycle. */
  speak?: string | null;
  /** ms between auto-cycled lines. @default 5000 */
  interval?: number;
  /** Place top-right of viewport. @default "right" */
  side?: "left" | "right";
  /** Size of the portrait. @default 120 */
  size?: number;
}
