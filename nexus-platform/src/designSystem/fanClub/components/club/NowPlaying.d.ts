/**
 * NowPlaying — small ambient music widget. Track name + waveform.
 * Lives bottom-right of the chat area.
 */
export interface NowPlayingProps {
  track: string;
  artist: string;
  /** 0..1 — progress through track. @default 0.3 */
  progress?: number;
  /** Show heart button. @default true */
  votable?: boolean;
  /** Did this user already heart? */
  voted?: boolean;
  onVote?: () => void;
}
