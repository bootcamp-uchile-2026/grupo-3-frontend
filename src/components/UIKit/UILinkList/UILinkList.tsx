import { useId } from "react";
import { UITextLink } from "../UITextLink/UITextLink";
import "./UILinkList.css";

export type UILinkListItem = {
  label: string;
  to?: string;
  href?: string;
};

export type UILinkListProps = {
  links: UILinkListItem[];
  title?: string;
  ariaLabel?: string;
  variant?: "default" | "strong" | "muted";
  size?: "sm" | "md";
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

export function UILinkList({
  links,
  title,
  ariaLabel,
  variant = "strong",
  size = "sm",
  headingLevel = 3,
  className,
}: UILinkListProps) {
  const tituloId = useId();
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <nav
      className={["ui-link-list", className ?? ""].filter(Boolean).join(" ")}
      aria-labelledby={title ? tituloId : undefined}
      aria-label={title ? undefined : ariaLabel}
    >
      {title && (
        <Heading id={tituloId} className="ui-link-list__title">
          {title}
        </Heading>
      )}

      <ul className="ui-link-list__list">
        {links.map((link) => (
          <li key={link.label} className="ui-link-list__item">
            <UITextLink
              to={link.to}
              href={link.href}
              variant={variant}
              size={size}
              disabled={!link.to && !link.href}
            >
              {link.label}
            </UITextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}