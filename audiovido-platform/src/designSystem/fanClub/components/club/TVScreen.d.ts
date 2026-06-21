/**
 * TVScreen — the vintage CRT centerpiece of every club. Houses
 * music videos, film clips, performance footage. Has scanlines,
 * an occasional flicker, and a chromatic-aberration glow.
 */
export interface TVScreenProps {
  /** Any node — typically a <video>, <img>, or styled label. */
  children: React.ReactNode;
  /** Show static/scanlines overlay. @default true */
  scanlines?: boolean;
  /** Cycle the occasional flicker. @default true */
  flicker?: boolean;
  /** Width × aspect controls. @default "16/9" */
  aspect?: string;
  /** Caption strip below the glass (e.g. "LIVE FROM TOKYO"). */
  caption?: React.ReactNode;
  /** Bezel size scale. @default "md" */
  size?: "sm" | "md" | "lg";
}
