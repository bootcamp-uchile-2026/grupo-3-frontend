import { useState } from "react"
import { iconRegistry } from "../../components/UIKit/UIIcons/iconRegistry"
import { UIKitIcon } from "../../components/UIKit/UIIcons/UIKitIcon"
import type { UIKitIconName } from "../../components/UIKit/UIIcons/UIKitIcon"

const icons = (Object.keys(iconRegistry) as UIKitIconName[]).map((name) => [
    name,
    iconRegistry[name],
] as const)

const usageExamples = [
    {
        title: "Uso básico",
        code: '<UIKitIcon name="Search" />',
    },
    {
        title: "Personalizar el tamaño",
        code: '<UIKitIcon name="Search" size={32} />',
    },
    {
        title: "Personalizar el color",
        code: '<UIKitIcon name="Search" color="#FF1C67" />',
    },
    {
        title: "Combinar tamaño y color",
        code: '<UIKitIcon name="Search" size={24} color="#FF1C67" />',
    },
    {
        title: "Dentro de un botón",
        code: '<button type="button" aria-label="Buscar">\n  <UIKitIcon name="Search" size={20} />\n</button>',
    },
]

export function UIKitIcons() {
    const [search, setSearch] = useState("")
    const [copyMessage, setCopyMessage] = useState("")
    const normalizedSearch = search.trim().toLowerCase()
    const filteredIcons = icons.filter(([name, { componentName }]) =>
        `${name} ${componentName}`.toLowerCase().includes(normalizedSearch),
    )

    async function copyExample(name: UIKitIconName) {
        const code = `<UIKitIcon name="${name}" size={24} color="#333333" />`

        if (!navigator.clipboard) {
            setCopyMessage("El portapapeles no está disponible en este navegador o contexto.")
            return
        }

        try {
            await navigator.clipboard.writeText(code)
            setCopyMessage(`Ejemplo de ${name} copiado.`)
        } catch (error) {
            const reason = error instanceof Error ? ` ${error.message}` : ""
            setCopyMessage(`No se pudo copiar el ejemplo.${reason}`)
        }
    }

    return (
        <div className="ui-kit-icons-page">
            <header className="ui-kit-icons-header">
                <p className="ui-kit-icons-eyebrow">Sistema de diseño</p>
                <h1>UIKit Icons</h1>
                <p>
                    Catálogo de los componentes SVG disponibles en el UIKit.
                    Usa <code>UIKitIcon</code> para seleccionarlos por nombre y
                    personalizar su tamaño, color y atributos SVG.
                </p>
            </header>

            <section className="ui-kit-icons-catalog" aria-labelledby="icon-catalog-title">
                <div className="ui-kit-icons-section-heading">
                    <div>
                        <h2 id="icon-catalog-title">Catálogo de iconos</h2>
                        <p>{filteredIcons.length} de {icons.length} iconos</p>
                    </div>
                    <label className="ui-kit-icons-search">
                        <span>Buscar por nombre</span>
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.currentTarget.value)}
                            placeholder="Ej. Search"
                        />
                    </label>
                </div>

                {filteredIcons.length > 0 ? (
                    <div className="ui-kit-icons-grid">
                        {filteredIcons.map(([name, { componentName }]) => (
                            <article className="ui-kit-icon-card" key={name}>
                                <div className="ui-kit-icon-card-preview">
                                    <UIKitIcon name={name} size={32} color="#333333" />
                                </div>
                                <h3>{name}</h3>
                                <p>
                                    Componente: <code>{componentName}</code>
                                </p>
                                <p>
                                    Prop <code>name</code>: <code>{name}</code>
                                </p>
                                <pre>
                                    <code>{`<UIKitIcon name="${name}" size={24} color="#333333" />`}</code>
                                </pre>
                                <button
                                    type="button"
                                    onClick={() => void copyExample(name)}
                                    aria-label={`Copiar ejemplo de ${name}`}
                                >
                                    Copiar ejemplo
                                </button>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="ui-kit-icons-empty" role="status">
                        No hay iconos que coincidan con «{search}».
                    </p>
                )}
                <p className="ui-kit-icons-copy-status" aria-live="polite">
                    {copyMessage}
                </p>
            </section>

            <section className="ui-kit-icons-docs" aria-labelledby="icon-props-title">
                <h2 id="icon-props-title">Props de UIKitIcon</h2>
                <div className="ui-kit-icons-table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Prop</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Ejemplo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"><code>name</code></th>
                                <td>Nombre permitido del icono. El tipo se deriva del registro.</td>
                                <td><code>"Search"</code></td>
                            </tr>
                            <tr>
                                <th scope="row"><code>size</code></th>
                                <td>Tamaño del SVG; acepta un número o una medida CSS.</td>
                                <td><code>24</code> o <code>"1.5rem"</code></td>
                            </tr>
                            <tr>
                                <th scope="row"><code>color</code></th>
                                <td>Color del icono, heredado por sus trazos SVG.</td>
                                <td><code>"#FF1C67"</code></td>
                            </tr>
                            <tr>
                                <th scope="row"><code>iconColor</code></th>
                                <td>Alias heredado de <code>color</code>, mantenido para compatibilidad.</td>
                                <td><code>"#333333"</code></td>
                            </tr>
                            <tr>
                                <th scope="row"><code>className</code></th>
                                <td>Clase CSS que se aplica al elemento SVG.</td>
                                <td><code>"mi-icono"</code></td>
                            </tr>
                            <tr>
                                <th scope="row"><code>style</code></th>
                                <td>Estilos en línea del elemento SVG.</td>
                                <td><code>{"{{ marginRight: 8 }}"}</code></td>
                            </tr>
                            <tr>
                                <th scope="row">Props SVG</th>
                                <td>También admite los atributos SVG restantes, como <code>aria-label</code>.</td>
                                <td><code>aria-hidden="true"</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="ui-kit-icons-docs" aria-labelledby="icon-examples-title">
                <h2 id="icon-examples-title">Ejemplos en React</h2>
                <p>
                    Importa <code>UIKitIcon</code> desde{" "}
                    <code>src/components/UIKit/UIIcons/UIKitIcon</code> y utiliza
                    cualquiera de los nombres mostrados en el catálogo.
                </p>
                <div className="ui-kit-icons-examples">
                    {usageExamples.map(({ title, code }) => (
                        <article key={title}>
                            <h3>{title}</h3>
                            <pre><code>{code}</code></pre>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}
