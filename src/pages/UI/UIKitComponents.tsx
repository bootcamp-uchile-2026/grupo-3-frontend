import { useState } from "react"
import {
    UIProductDescription,
    UIKitCarouselPagination,
    UIProductPagination,
    UIProductUsage,
    UITechnicalSheet,
} from "../../components/UIKit"
import {
    UIProductCard,
    UIProductCardButton,
} from "../../components/UIKit/UIProductCard"

const productCardExample = {
    imageSrc: new URL(
        "../../components/UIKit/UIProductCard/assets/product-card-example.png",
        import.meta.url,
    ).href,
    imageAlt: "Caja de bolsas biodegradables Paw Bags",
    name: "Bolsas Biodegradables Paw Bags (400 bolsas)",
    price: "$8.993",
    rating: 4,
}

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
                <section className="ui-kit-pagination-example ui-kit-product-card-example">
                    <h2>Tarjeta de producto</h2>
                    <p>
                        Tarjeta responsive para mostrar imagen, calificación, precio y descuento
                        opcional. La variante de Figma corresponde al estado seleccionado.
                    </p>
                    <div className="ui-kit-product-card-example__cards">
                        <div>
                            <h3>Seleccionado con descuento (Figma)</h3>
                            <UIProductCard
                                {...productCardExample}
                                discountPercentage={22}
                                buttonLabel="Producto agregado"
                                selected
                                onAddToCart={() => undefined}
                            />
                        </div>
                        <div>
                            <h3>Sin descuento</h3>
                            <UIProductCard
                                {...productCardExample}
                                buttonLabel="Agregar al carrito"
                                onAddToCart={() => undefined}
                            />
                        </div>
                    </div>
                    <h3>UIProductCardButton</h3>
                    <div className="ui-kit-product-card-example__buttons">
                        <UIProductCardButton
                            label="Agregar al carrito"
                            onClick={() => undefined}
                        />
                        <UIProductCardButton
                            label="Producto agregado"
                            onClick={() => undefined}
                            selected
                        />
                        <UIProductCardButton
                            label="Cargando"
                            onClick={() => undefined}
                            loading
                        />
                        <UIProductCardButton
                            label="No disponible"
                            onClick={() => undefined}
                            disabled
                        />
                    </div>
                    <p>
                        Prueba hover y active al pasar el puntero y hacer clic. Usa Tab para
                        comprobar el foco visible. Sin stock no aparece en la selección de Figma;
                        disabled se muestra como estado de botón.
                    </p>
                    <div className="ui-kit-product-card-example__api">
                        <h3>Props de UIProductCard</h3>
                        <div className="ui-kit-product-card-example__table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Requerida</th>
                                        <th>Por defecto</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>imageSrc</td><td>string</td><td>Sí</td><td>—</td><td>URL o ruta de la imagen del producto.</td></tr>
                                    <tr><td>imageAlt</td><td>string</td><td>Sí</td><td>—</td><td>Texto alternativo significativo.</td></tr>
                                    <tr><td>name</td><td>string</td><td>Sí</td><td>—</td><td>Nombre que se muestra en la tarjeta.</td></tr>
                                    <tr><td>price</td><td>string</td><td>Sí</td><td>—</td><td>Precio con formato de presentación.</td></tr>
                                    <tr><td>rating</td><td>number</td><td>Sí</td><td>—</td><td>Calificación redondeada y limitada al rango de 0 a 5.</td></tr>
                                    <tr><td>buttonLabel</td><td>string</td><td>Sí</td><td>—</td><td>Texto accesible del botón.</td></tr>
                                    <tr><td>onAddToCart</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback al activar el botón.</td></tr>
                                    <tr><td>discountPercentage</td><td>number</td><td>No</td><td>—</td><td>Porcentaje de descuento; si se omite, no se muestra la insignia.</td></tr>
                                    <tr><td>selected</td><td>boolean</td><td>No</td><td>false</td><td>Representa el estado agregado del diseño.</td></tr>
                                    <tr><td>className</td><td>string</td><td>No</td><td>&quot;&quot;</td><td>Clase adicional para el artículo.</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Props de UIProductCardButton</h3>
                        <div className="ui-kit-product-card-example__table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Requerida</th>
                                        <th>Por defecto</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>label</td><td>string</td><td>Sí</td><td>—</td><td>Texto del botón.</td></tr>
                                    <tr><td>onClick</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback de activación.</td></tr>
                                    <tr><td>disabled</td><td>boolean</td><td>No</td><td>false</td><td>Deshabilita la activación.</td></tr>
                                    <tr><td>loading</td><td>boolean</td><td>No</td><td>false</td><td>Muestra el indicador y deshabilita el botón.</td></tr>
                                    <tr><td>selected</td><td>boolean</td><td>No</td><td>false</td><td>Muestra el check y expone el estado pulsado.</td></tr>
                                    <tr><td>className</td><td>string</td><td>No</td><td>&quot;&quot;</td><td>Clase adicional para el botón.</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Props de UIProductCardDiscount y UIProductCardRating</h3>
                        <div className="ui-kit-product-card-example__table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Componente</th>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Requerida</th>
                                        <th>Por defecto</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>UIProductCardDiscount</td><td>percentage</td><td>number</td><td>Sí</td><td>—</td><td>Porcentaje de descuento con su icono.</td></tr>
                                    <tr><td>UIProductCardRating</td><td>rating</td><td>number</td><td>Sí</td><td>—</td><td>Calificación representada con cinco estrellas.</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Uso</h3>
                        <pre><code>{`<UIProductCard
  imageSrc={product.image}
  imageAlt={product.imageAlt}
  name={product.name}
  price={product.price}
  rating={product.rating}
  discountPercentage={product.discountPercentage}
  buttonLabel="Agregar al carrito"
  onAddToCart={handleAddToCart}
/>`}</code></pre>
                    </div>
                </section>
            </div>
        </main>
    )
}