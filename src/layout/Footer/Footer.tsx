import { NavLink } from "react-router-dom";
import "./Footer.css";
import mascotasImg from "../../assets/brand/logo-petlove-mascotas.png";
import instagramIcon from "../../assets/Icons/instagram.svg";
import tiktokIcon from "../../assets/Icons/tiktok.svg";
import whatsappIcon from "../../assets/Icons/whatsapp.svg";
import facebookIcon from "../../assets/Icons/facebook.svg";

interface FooterBranch {
  title?: string;
  address: string;
  hours: string[];
}

interface FooterProps {
  companyName?: string;
  year?: number;
  logoSrc?: string;
  illustrationSrc?: string;
  branch?: FooterBranch;
   sections?: { title?: string; items: { to?: string; label: string }[] }[];
  socialLinks?: { href?: string; iconSrc: string; alt: string }[];
}

export function Footer({
  companyName = "PetLove",
  year = new Date().getFullYear(),
  illustrationSrc = mascotasImg,
  branch = {
    title: "Sucursal",
    address: "Avenida Nueva Providencia 2556",
    hours: ["Lunes a Viernes 9:00 a 20:00", "Sábado y Domingo 10:00 a 18:00"],
  },
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
      title: "Nosotros",
      items: [
        { label: "Sobre nosotros" },
        { label: "Horario de atención" },
        { label: "Sugerencias y reclamos" },
      ],
    },
  ],
  socialLinks = [
    { iconSrc: instagramIcon, alt: "Instagram" },
    { iconSrc: tiktokIcon, alt: "TikTok" },
    { iconSrc: whatsappIcon, alt: "WhatsApp" },
    { iconSrc: facebookIcon, alt: "Facebook" },
  ],
}: FooterProps) {

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={illustrationSrc} alt="" className="footer-mascotas" />

          <NavLink
            to="/"
            className="footer-logo"
            aria-label={`${companyName}, ir al inicio`}>
          </NavLink>
        </div>

        <div className="footer-links">
          <div className="footer-branch">
            {branch.title && <h4>{branch.title}</h4>}
            <p>{branch.address}</p>
            {branch.hours.map((line, i) => <p key={i}>{line}</p>)}
          </div>

          {sections.map((section, i) => (
            <ul key={i}>
              {section.title && <li className="section-title">{section.title}</li>}
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
          {socialLinks.map((social) => {
            const icono = (
              <span
                className="social-icon"
                style={{
                  maskImage: `url(${social.iconSrc})`,
                  WebkitMaskImage: `url(${social.iconSrc})`,
                }}
              />
            );

            return social.href ? (
              <a
                key={social.alt}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.alt}
              >
                {icono}
              </a>
            ) : (
              <span key={social.alt} aria-label={social.alt} aria-disabled="true">
                {icono}
              </span>
            );
          })}
        </div>
      </div>
    </footer>
  );
}