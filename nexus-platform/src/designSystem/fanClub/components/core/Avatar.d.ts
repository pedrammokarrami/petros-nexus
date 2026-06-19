/**
 * Avatar — circular member portrait. Optional accent ring for active speakers.
 */
export interface AvatarProps {
  /** Display name (used for initials + alt text). */
  name: string;
  /** Image URL. */
  src?: string;
  /** Pixel diameter. @default 40 */
  size?: number;
  /** Show pulsing accent ring (currently speaking / spotlit). */
  active?: boolean;
  /** Status dot. */
  status?: "online" | "offline" | "live" | null;
}
