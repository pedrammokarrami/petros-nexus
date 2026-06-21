/**
 * PhysicalButton — themed action button styled as a physical venue object.
 *
 *   · drink     — looks like a cocktail glass with the liquid as accent
 *   · jukebox   — selector knob (round, chrome ring)
 *   · arcade    — glowing arcade pushbutton
 *   · neon      — neon-sign pill
 */
export interface PhysicalButtonProps {
  variant: "drink" | "jukebox" | "arcade" | "neon";
  /** Short label under or inside the button. */
  label: string;
  /** Icon / glyph. */
  icon?: React.ReactNode;
  /** Active state — pressed in, glowing harder. */
  active?: boolean;
  onClick?: () => void;
}
