import "./Footer.css";
import { UILogo } from "../../components/UIKit/UILogo/UILogo";
import { UIInfoBlock } from "../../components/UIKit/UIInfoBlock/UIInfoBlock";
import { UILinkList } from "../../components/UIKit/UILinkList/UILinkList";
import { UISocialLinks } from "../../components/UIKit/UISocialLinks/UISocialLinks";
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
  illustrationSrc?: string;
  branch?: FooterBranch;
  sections?: { title?: string; items: { to?: string; label: string }[] }[];
  socialLinks?: { href?: string; iconSrc: string; alt: string }[];
  /** El diseño actual no muestra copyright. Actívalo si lo necesitas. */
  showCopyright?: boolean;
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
  showCopyright = false,
}: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        {/* Mascotas + logo, con enlace al inicio */}
        <div className="footer-brand">
          <UILogo variant="con-mascotas" src={illustrationSrc} alt={companyName} />
        </div>

        {/* Columnas + redes */}
        <div className="footer-info">
          <div className="footer-links">
            <UIInfoBlock
              title={branch.title ?? "Sucursal"}
              lines={[branch.address, ...branch.hours]}
              asAddress
            />

            {sections.map((section, i) => (
              <UILinkList
                key={section.title ?? i}
                title={section.title}
                ariaLabel={section.title ?? "Información"}
                links={section.items}
                /* Lista sin título en negrita; "Nosotros" en peso normal */
                variant={section.title ? "default" : "strong"}
              />
            ))}
          </div>

          <UISocialLinks
            className="footer-social"
            links={socialLinks.map((social) => ({
              name: social.alt,
              iconSrc: social.iconSrc,
              href: social.href,
            }))}
          />
        </div>
      </div>

      {showCopyright && (
        <div className="footer-bottom">
          <p className="footer-copyright">
            Copyright © {year} {companyName}. All Rights Reserved
          </p>
        </div>
      )}
    </footer>
  );
}