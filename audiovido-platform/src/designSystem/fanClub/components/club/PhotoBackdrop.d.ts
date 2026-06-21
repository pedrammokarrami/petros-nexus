/**
 * PhotoBackdrop — full-bleed atmospheric room photo. Wraps an
 * <image-slot> so the user can drop in a real photo (concert venue,
 * cinema lobby, jazz lounge). Layers grain, vignette, and a parallax
 * scroll offset on top.
 */
export interface PhotoBackdropProps {
  /** Unique id for the image-slot (per-page). */
  slotId: string;
  /** Caption shown in the empty slot. */
  placeholder?: string;
  /** Optional initial src (will be overridden by a user drop). */
  src?: string;
  /** 0..1 scroll-driven parallax strength. @default 0.15 */
  parallax?: number;
  /** Grain overlay opacity. @default 0.22 */
  grain?: number;
  /** Tint color blended over the photo (use mood gradient or club color). */
  tint?: string;
  /** Vignette strength. @default 0.7 */
  vignette?: number;
}
