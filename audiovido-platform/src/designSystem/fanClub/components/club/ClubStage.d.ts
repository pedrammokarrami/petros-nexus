/**
 * ClubStage — the full top section of a Fan Club page. Wraps the CRT,
 * a club-name marquee above it, and the mood meter beside it. Use this
 * to drop a "stage" into any page; pass children to override the screen.
 */
export interface ClubStageProps {
  clubName: string;
  /** Small caption above the club name, e.g. "MUSIC CLUB". */
  kicker?: string;
  /** Mood value 0..1 for the right-side gauge. @default 0.55 */
  mood?: number;
  /** Active member count. @default 47 */
  memberCount?: number;
  /** Live-now flag — adds a pulsing LIVE badge. */
  live?: boolean;
  /** What's on the screen. */
  children: React.ReactNode;
  /** Caption under the screen. */
  caption?: React.ReactNode;
}
