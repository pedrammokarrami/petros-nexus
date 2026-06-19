/**
 * SpatialAvatar — a member positioned at an absolute coordinate in the
 * room. Glow intensity tracks activity; a speech bubble can appear above
 * them when they post.
 *
 * The avatar shows initials when no `src` is supplied, hashed-color
 * gradient as a fallback background.
 */
export interface SpatialAvatarProps {
  name: string;
  /** Image src for the avatar. */
  src?: string;
  /** CSS top — e.g. "62%" or "320px". */
  top?: string;
  /** CSS left — e.g. "30%". */
  left?: string;
  /** Pixel size of the avatar. @default 48 */
  size?: number;
  /** 0..1 — activity level. Higher = brighter ring. */
  activity?: number;
  /** Active speech bubble text. Disappears after a few seconds in real use. */
  speech?: React.ReactNode;
  /** Where the bubble points. @default "top" */
  bubbleDir?: "top" | "right";
  /** Click handler — typically reveals the member's last message. */
  onClick?: () => void;
}
