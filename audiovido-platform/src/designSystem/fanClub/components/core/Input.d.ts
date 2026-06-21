/**
 * Input — text field on a dark surface.
 * Composer is the main use site; also Search and inline edit fields.
 */
export interface InputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  /** Leading icon. */
  icon?: React.ReactNode;
  /** Trailing element (button, badge, etc). */
  suffix?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  /** Show accent glow on focus. @default true */
  glow?: boolean;
  /** Submit on Enter. */
  onSubmit?: (v: string) => void;
  disabled?: boolean;
}
