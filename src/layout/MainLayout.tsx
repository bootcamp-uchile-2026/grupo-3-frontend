import { Header } from "./Header";
import { Footer } from "./Footer";
import { Body } from "./Body";

export function MainLayout(){

    return(
        <>
        <Header 
            logoSrc="/assets/images/logo-petlove.svg"
            logoAlt="Petlove"
            accountIconSrc="/assets/images/user.svg"
            cartIconSrc="/assets/images/cart.svg"
        />

        <Body />

        <Footer 
            companyName="PetLove"
            year={2026}
            sections={[
            {
                items: [
                { to: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
                { to: "/terminos-condiciones", label: "Términos y condiciones" },
                { to: "/politicas-privacidad", label: "Políticas de privacidad" },
                { to: "/cambios-devoluciones", label: "Cambios y devoluciones" },
                ],
            },
            {
                items: [
                { to: "/nosotros", label: "Nosotros" },
                { to: "/sobre-nosotros", label: "Sobre nosotros" },
                { to: "/horario-atencion", label: "Horario de atención" },
                { to: "/sugerencias-reclamos", label: "Sugerencias y reclamos" },
                ],
            },
            ]}
            socialLinks={[
            { to: "#", iconSrc: "/assets/images/facebook.svg", alt: "Facebook" },
            { to: "#", iconSrc: "/assets/images/instagram.svg", alt: "Instagram" },
            { to: "#", iconSrc: "/assets/images/youtube.svg", alt: "YouTube" },
            { to: "#", iconSrc: "/assets/images/tiktok.svg", alt: "TikTok" },
            ]}
        />
        </>
    )

}