
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "L" | "M" | "S";

interface UIButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

export default function UIButton({
  variant = "primary",
  size = "L",
  iconLeft,
  iconRight,
  children,
  className = "",
  type = "button",
  disabled = false,
  ...props
}: UIButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`ui-button ui-button--${variant} ui-button--${size.toLowerCase()} ${className}`}
      {...props}
    >
      {iconLeft && (
        <span className="ui-button__icon" aria-hidden="true">
          {iconLeft}
        </span>
      )}

      <span className="ui-button__label">{children}</span>

      {iconRight && (
        <span className="ui-button__icon" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
}
