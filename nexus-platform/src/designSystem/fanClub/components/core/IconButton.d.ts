/**
 * IconButton — circular pill for icon-only actions.
 * Floor-action toolbar, react picker, dismiss buttons.
 */
export interface IconButtonProps {
  /** Visual flavor. @default "ghost" */
  variant?: "primary" | "ghost" | "glow";
  /** Sizing. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Icon node. */
  children: React.ReactNode;
  /** Tooltip / aria-label. */
  label?: string;
  /** Disabled. */
  disabled?: boolean;
  /** Show a small unread dot. */
  badge?: boolean;
  /** Click handler. */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
