/**
 * ChatMessage — a single message on the club floor.
 *
 * Three personas:
 *   · member    — default. Avatar + name + bubble.
 *   · spotlight — top active member gets accent glow above the bubble.
 *   · dj        — AI / host persona. Larger, spotlit, badge "DJ".
 */
export interface ChatMessageProps {
  author: string;
  avatarSrc?: string;
  /** Message body — string or rich node. */
  children: React.ReactNode;
  /** ISO/clock label. */
  time?: string;
  /** @default "member" */
  persona?: "member" | "spotlight" | "dj";
  /** Reaction tally, e.g. [{emoji: "🔥", count: 3}]. */
  reactions?: { emoji: string; count: number }[];
  /** Slide in from "left" (others) or "right" (self). @default "left" */
  align?: "left" | "right";
}
