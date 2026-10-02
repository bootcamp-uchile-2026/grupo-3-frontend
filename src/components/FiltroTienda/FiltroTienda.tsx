export function FiltroTienda() {

    return (
        <div className="filtro">
            <h2>Filtros</h2>
            <div className="filtro-opciones">
                <form id="filtro-form" method="get">
                    <label htmlFor="categoria">Categoría:</label>
                    <select id="categoria" name="categoria">
                        <option value="">Todas</option>
                        <option value="perros">Perros</option>
                        <option value="gatos">Gatos</option>
                        <option value="aves">Aves</option>
                        <option value="peces">Peces</option>
                    </select>

                    <label htmlFor="precio">Precio:</label>
                    <select id="precio" name="precio">
                        <option value="">Todos</option>
                        <option value="0-50">$0 - $50</option>
                        <option value="51-100">$51 - $100</option>
                        <option value="101-200">$101 - $200</option>
                        <option value="201-500">$201 - $500</option>
                    </select>

                    <label htmlFor="marca">Marca:</label>
                    <select id="marca" name="marca">
                        <option value="">Todas</option>
                        <option value="marca1">Marca 1</option>
                        <option value="marca2">Marca 2</option>
                        <option value="marca3">Marca 3</option>
                    </select>
                    <label htmlFor="edad">Edad:</label>
                    <input id="edad" name="edad" type="range" min="0" max="25" value="2" />
                    <button>Aplicar filtros</button>
                </form>
            </div>
        </div>
    )

}