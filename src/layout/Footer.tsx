export function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="footer-logo">
                    <a href="/">
                        <div className="logo-placeholder"></div>
                        <span>PetLove</span>
                    </a>
                </div>
                <div className="footer-links">
                    <ul>
                        <li><a href="/preguntas-frecuentes">Preguntas frecuentes</a></li>
                        <li><a href="/terminos-condiciones">Términos y condiciones</a></li>
                        <li><a href="/politicas-privacidad">Políticas de privacidad</a></li>
                        <li><a href="/cambios-devoluciones">Cambios y devoluciones</a></li>
                    </ul>
                    <ul>
                        <li><a href="/nosotros">Nosotros</a></li>
                        <li><a href="/sobre-nosotros">Sobre nosotros</a></li>
                        <li><a href="/horario-atencion">Horario de atención</a></li>
                        <li><a href="/sugerencias-reclamos">Sugerencias y reclamos</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Copyright © 2024 Company name. All Rights Reserved</p>
                <div className="social">
                    <a href="#" aria-label="Facebook">f</a>
                    <a href="#" aria-label="Instagram">◎</a>
                    <a href="#" aria-label="YouTube">▶</a>
                    <a href="#" aria-label="TikTok">♪</a>
                </div>
            </div>
        </footer>
    )
}