
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function PawIcon(props: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="7" cy="7" rx="1.5" ry="2" />
      <ellipse cx="12" cy="5" rx="1.5" ry="2" />
      <ellipse cx="17" cy="7" rx="1.5" ry="2" />
      <ellipse cx="20" cy="11" rx="1.3" ry="1.7" />
      <path d="M12 11c-2.5 0-3.5 2-5.2 4.1-1.1 1.4-.3 3.9 1.7 3.9 1.4 0 2.2-.9 3.5-.9s2.1.9 3.5.9c2 0 2.8-2.5 1.7-3.9C15.5 13 14.5 11 12 11Z" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}
