/**
 * MemberStack — vertical column of avatars for the side wall.
 * Currently-chatting members get the accent glow.
 */
export interface Member {
  name: string;
  avatarSrc?: string;
  active?: boolean;
  status?: "online" | "offline" | "live";
}
export interface MemberStackProps {
  members: Member[];
  /** Max shown before "+N more". @default 7 */
  limit?: number;
  /** Heading. @default "ON THE FLOOR" */
  heading?: string;
}
