/**
 * Button — the club's primary call-to-action.
 *
 * Three flavors:
 *   · primary — accent fill, full glow. Use sparingly (one per surface).
 *   · ghost   — transparent with a soft outline. Default for most actions.
 *   · glow    — accent text on translucent base, halo on hover.
 */
export interface ButtonProps {
  /** Visual flavor. @default "ghost" */
  variant?: "primary" | "ghost" | "glow";
  /** Sizing. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Leading icon (any node). */
  icon?: React.ReactNode;
  /** Disable interactions. */
  disabled?: boolean;
  /** Full-width. */
  block?: boolean;
  /** Click handler. */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Label content. */
  children: React.ReactNode;
  /** Extra class names. */
  className?: string;
}
