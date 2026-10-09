interface HeroProps {
  imageSrc: string;
  title: string;
}

export function Hero({ imageSrc, title }: HeroProps) {
  return (
    <section>
      <div className="banner">
        <img src={imageSrc} alt={title} />
        <h1 className="titulo-seccion">{title}</h1>
      </div>
    </section>
  );
}