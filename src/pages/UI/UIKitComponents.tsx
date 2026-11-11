import { useState } from "react"
import {
    UIProductDescription,
    UIKitCarouselPagination,
    UIProductPagination,
    UIProductUsage,
    UITechnicalSheet,
} from "../../components/UIKit"

type PaginationExampleProps = {
    title: string
    totalPages: number
    initialPage?: number
    disabled?: boolean
}

function PaginationExample({
    title,
    totalPages,
    initialPage = 1,
    disabled = false,
}: PaginationExampleProps) {
    const [currentPage, setCurrentPage] = useState(initialPage)

    return (
        <section className="ui-kit-pagination-example">
            <h2>{title}</h2>
            <UIProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                disabled={disabled}
            />
        </section>
    )
}

type CarouselPaginationExampleProps = {
    title: string
    size?: "sm" | "md"
    initialSlide?: number
    clickable?: boolean
    disabled?: boolean
}

function CarouselPaginationExample({
    title,
    size = "md",
    initialSlide = 0,
    clickable = true,
    disabled = false,
}: CarouselPaginationExampleProps) {
    const [currentSlide, setCurrentSlide] = useState(initialSlide)

    return (
        <section className="ui-kit-pagination-example">
            <h2>{title}</h2>
            <UIKitCarouselPagination
                totalSlides={5}
                currentSlide={currentSlide}
                onSlideChange={setCurrentSlide}
                size={size}
                clickable={clickable}
                disabled={disabled}
            />
            <p>Diapositiva activa: {currentSlide + 1}</p>
        </section>
    )
}

export function UIKitComponents() {
    return (
        <main className="container ui-kit-components-page">
            <h1>UI Kit Components</h1>
            <div className="ui-kit-components">
                <PaginationExample title="Paginación básica (5 páginas)" totalPages={5} />
                <PaginationExample title="Paginación (10 páginas)" totalPages={10} initialPage={4} />
                <PaginationExample title="Paginación (20 páginas)" totalPages={20} initialPage={12} />
                <PaginationExample
                    title="Paginación deshabilitada"
                    totalPages={10}
                    initialPage={3}
                    disabled
                />
                <CarouselPaginationExample title="Carrusel — tamaño md (5 diapositivas)" />
                <CarouselPaginationExample
                    title="Carrusel — tamaño sm (5 diapositivas)"
                    size="sm"
                    initialSlide={2}
                />
                <CarouselPaginationExample
                    title="Carrusel — última diapositiva activa"
                    initialSlide={4}
                />
                <CarouselPaginationExample
                    title="Carrusel — no interactivo"
                    initialSlide={1}
                    clickable={false}
                />
                <CarouselPaginationExample
                    title="Carrusel — deshabilitado"
                    initialSlide={3}
                    disabled
                />
                <section className="ui-kit-pagination-example ui-kit-product-description-example">
                    <h2>Accordion de descripción del producto</h2>
                    <p>
                        Usa el encabezado para expandir o contraer cada sección. El contenido
                        acepta cualquier elemento o componente React mediante <code>children</code>.
                    </p>
                    <UIProductDescription type="technical">
                        <UITechnicalSheet
                            variant="common"
                            data={{
                                especie: "Gato o perro",
                                funcion: "Filtra los residuos, ablanda el agua de grifo y neutraliza los olores.",
                                capacidad: "2 litros",
                                peso: "678 gramos",
                                medidas: "20,5 cm x 20,5 cm x 17 cm",
                                material: "Acero inoxidable",
                                caracteristicas: [
                                    "Bomba supersilenciosa y desmontable",
                                    "Filtro de triple acción",
                                    "Apagado automático",
                                    "Indicador LED de bajo nivel de agua y depósito vacío",
                                ],
                            }}
                        />
                    </UIProductDescription>
                    <UIProductDescription
                        type="technical"
                        defaultOpen={true}
                    >
                        <UITechnicalSheet
                            variant="food"
                            data={{
                                especie: "Perro",
                                etapaVida: "Adulto",
                                saborPrincipal: "Pollo",
                                condicionEspecial: "Digestión sensible",
                                ingredientes: "Pollo, arroz, maíz y otros ingredientes.",
                                colorantes: "No contiene",
                                conservantes: "Conservantes naturales",
                                informacionNutricional: "Proteína: 28%, Grasa: 15%, Fibra: 3%",
                            }}
                        />
                    </UIProductDescription>
                    <UIProductDescription type="usage">
                        <UIProductUsage
                            description={"Llene el depósito con agua limpia.\nConecte la fuente de alimentación y espere a que el sistema comience a funcionar."}
                        />
                    </UIProductDescription>
                    <UIProductDescription type="usage" title="Contenido personalizado">
                        <p>
                            También puedes pasar contenido React directamente, como texto,
                            imágenes, tablas o componentes propios. El título puede personalizarse.
                        </p>
                    </UIProductDescription>
                    <div className="ui-kit-product-description-example__api">
                        <h3>Componentes y props</h3>
                        <dl>
                            <div>
                                <dt>UIProductDescription</dt>
                                <dd>
                                    <code>type</code>: <code>technical</code> o <code>usage</code>.
                                    El título y el icono se definen automáticamente; ambos pueden
                                    sobrescribirse con <code>title</code> e <code>icon</code>.
                                </dd>
                            </div>
                            <div>
                                <dt>UITechnicalSheet</dt>
                                <dd>
                                    Elige <code>variant=&quot;common&quot;</code> o{" "}
                                    <code>variant=&quot;food&quot;</code> y pasa sus datos tipados
                                    en <code>data</code>. Los campos vacíos se omiten.
                                </dd>
                            </div>
                            <div>
                                <dt>UIProductUsage</dt>
                                <dd>
                                    Recibe el contenido sin encabezado interno en la prop{" "}
                                    <code>description</code>; admite texto, saltos de línea y
                                    contenido React.
                                </dd>
                            </div>
                            <div>
                                <dt>Otras props</dt>
                                <dd>
                                    <code>children</code> también admite cualquier contenido React;{" "}
                                    <code>defaultOpen</code> inicia expandido y <code>className</code>{" "}
                                    agrega clases.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </section>
            </div>
        </main>
    )
}