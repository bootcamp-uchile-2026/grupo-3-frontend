import { NavLink } from "react-router-dom";

interface FooterProps {
  companyName?: string;
  year?: number;
  sections?: { title?: string; items: { to?: string; label: string }[] }[];
  socialLinks?: { to?: string; iconSrc: string; alt: string }[];
}

export function Footer({
  companyName = "PetLove",
  year = new Date().getFullYear(),
  sections = [
    {
      items: [
        { label: "Preguntas frecuentes" },
        { label: "Términos y condiciones" },
        { label: "Políticas de privacidad" },
        { label: "Cambios y devoluciones" },
      ],
    },
    {
      items: [
        { label: "Nosotros" },
        { label: "Sobre nosotros" },
        { label: "Horario de atención" },
        { label: "Sugerencias y reclamos" },
      ],
    },
  ],
  socialLinks = [
    { iconSrc: "/assets/images/facebook.svg", alt: "Facebook" },
    { iconSrc: "/assets/images/instagram.svg", alt: "Instagram" },
    { iconSrc: "/assets/images/youtube.svg", alt: "YouTube" },
    { iconSrc: "/assets/images/tiktok.svg", alt: "TikTok" },
  ],
}: FooterProps) {
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
                  {item.to ? (
                    <NavLink to={item.to}>{item.label}</NavLink>
                  ) : (
                    <span aria-disabled="true">{item.label}</span>
                  )}
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
            social.to ? (
              <NavLink key={i} to={social.to} aria-label={social.alt}>
                <img src={social.iconSrc} alt={social.alt} />
              </NavLink>
            ) : (
              <span key={i} aria-label={social.alt} aria-disabled="true">
                <img src={social.iconSrc} alt={social.alt} />
              </span>
            )
          ))}
        </div>
      </div>
    </footer>
  );
}