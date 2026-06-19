/**
 * ChallengeCard — the active club challenge with a glowing progress bar.
 * Lives in the side panel.
 */
export interface ChallengeCardProps {
  title: string;
  /** Subtitle / description. */
  description?: string;
  /** 0..1 */
  progress: number;
  /** "12 of 50" style label. */
  progressLabel?: string;
  /** Tag like "DAILY", "WEEKLY". */
  tag?: string;
  onJoin?: () => void;
}
