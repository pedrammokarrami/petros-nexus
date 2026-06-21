/**
 * Card — base surface container. Three treatments:
 *   · solid  — opaque surface, sits on the page
 *   · glass  — translucent, used on top of the mood gradient
 *   · stage  — deep recessed surface, holds the CRT
 */
export interface CardProps {
  variant?: "solid" | "glass" | "stage";
  /** Inner padding multiplier on --space-4. @default 4 (16px) */
  pad?: 0 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Add an accent halo. */
  glow?: boolean;
  /** Optional click handler — makes the card behave as a button. */
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
