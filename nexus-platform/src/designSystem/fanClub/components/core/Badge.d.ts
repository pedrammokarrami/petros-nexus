/**
 * Badge — a small mono-cased marquee label.
 * Used for status pills: LIVE, OPEN MIC, MEMBER, MOOD: HYPE, etc.
 */
export interface BadgeProps {
  /** @default "default" */
  variant?: "default" | "live" | "accent" | "outline";
  /** Show a leading pulsing dot. */
  pulse?: boolean;
  children: React.ReactNode;
}
