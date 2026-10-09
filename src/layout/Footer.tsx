import { NavLink } from "react-router-dom";

interface FooterProps {
  companyName: string;
  year: number;
  sections: { title?: string; items: { to: string; label: string }[] }[];
  socialLinks: { to: string; iconSrc: string; alt: string }[];
}

export function Footer({ companyName, year, sections, socialLinks }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-logo">
          <NavLink to="/">
            <div className="logo-placeholder"></div>
            <span>{companyName}</span>
          </NavLink>
        </div>

        <div className="footer-links">
          {sections.map((section, i) => (
            <ul key={i}>
              {section.items.map((item, j) => (
                <li key={j}>
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © {year} {companyName}. All Rights Reserved</p>
        <div className="social">
          {socialLinks.map((social, i) => (
            <NavLink key={i} to={social.to} aria-label={social.alt}>
              <img src={social.iconSrc} alt={social.alt} />
            </NavLink>
          ))}
        </div>
      </div>
    </footer>
  );
}