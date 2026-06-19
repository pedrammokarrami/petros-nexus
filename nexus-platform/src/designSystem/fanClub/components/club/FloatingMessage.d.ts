/**
 * FloatingMessage — chat bubble that lives in the center of the room,
 * tilted slightly in 3D. Not a feed; messages float up + fade out.
 */
export interface FloatingMessageProps {
  author: string;
  /** Message body. */
  children: React.ReactNode;
  /** Persona drives styling. @default "member" */
  persona?: "member" | "dj" | "spotlight";
  /** Avatar URL. */
  avatarSrc?: string;
  /** 0..1 — "energy" of the message; tunes glow + tilt. @default 0.5 */
  intensity?: number;
}
