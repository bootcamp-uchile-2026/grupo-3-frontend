import { Link } from "react-router-dom";

type HeroButton = {
  text: string;
  to: string;
};

interface HeroProps {
  imageSrc: string;
  title: string;
  buttons?: HeroButton[];
}

export function Hero({ imageSrc, title, buttons = [] }: HeroProps) {
  return (
    <section id="hero">
      <div className="banner">
        <img src={imageSrc} alt={title} />
        <h1 className="titulo-seccion">{title}</h1>
        {buttons.length > 0 && (
          <div className="hero-buttons">
            {buttons.map((btn, i) => (
              <Link key={i} to={btn.to}>
                <button>{btn.text}</button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}