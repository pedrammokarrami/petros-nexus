/**
 * MoodMeter — animated gauge showing the room's emotional temperature.
 * Sits as a corner widget. Subtitle reads "Based on N messages in the
 * last 10 minutes."
 */
export interface MoodMeterProps {
  /** 0..1. 0 = melancholic, 1 = euphoric. @default 0.5 */
  value?: number;
  /** Sample size for the subtitle. */
  sampleCount?: number;
  /** Time window for subtitle. @default "last 10 minutes" */
  windowLabel?: string;
  /** Compact (no wave). @default false */
  compact?: boolean;
}
