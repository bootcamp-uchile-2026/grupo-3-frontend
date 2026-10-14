export function OrdenTienda() {

    return (
        <div className="orden-productos">
            <div className="orden-productos-botones">
                <button>X</button>
                <button>X</button>
            </div>
            <select name="ordenar-productos" id="ordenar-productos">
                <option>Orden: Popularidad</option>
                <option>Orden precio: Mayor a Menor</option>
                <option>Orden precio: Menor a Mayor</option>
            </select>
        </div>
    )

}