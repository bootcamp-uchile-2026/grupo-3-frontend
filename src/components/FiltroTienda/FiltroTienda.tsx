export function FiltroTienda() {

    return (
        <div className="filtro">
            <h2>Filtros</h2>
            <div className="filtro-opciones">
                <form id="filtro-form">
                    <fieldset>
                        <legend>Tipo de Mascota</legend>
                        <label><input type="checkbox" name="tipo-mascota" value="perro" /> Perro</label>
                        <label><input type="checkbox" name="tipo-mascota" value="gato" /> Gato</label>
                        <label><input type="checkbox" name="tipo-mascota" value="ave" /> Ave</label>
                        <label><input type="checkbox" name="tipo-mascota" value="reptil" /> Reptil</label>
                        <label><input type="checkbox" name="tipo-mascota" value="roedores" /> Roedores</label>
                        <label><input type="checkbox" name="tipo-mascota" value="huron" /> Hurón</label>
                    </fieldset>

                    <fieldset>
                        <legend>Tipo de Producto</legend>
                        <label><input type="checkbox" name="tipo-producto" value="alimento" /> Alimento</label>
                        <label><input type="checkbox" name="tipo-producto" value="accesorio" /> Accesorio</label>
                        <label><input type="checkbox" name="tipo-producto" value="salud" /> Salud</label>
                        <label><input type="checkbox" name="tipo-producto" value="farmacia" /> Farmacia</label>
                    </fieldset>

                    <fieldset>
                        <legend>Edad de la mascota</legend>
                        <label><input type="checkbox" name="edad" value="adulto" /> Adulto</label>
                        <label><input type="checkbox" name="edad" value="senior" /> Senior</label>
                        <label><input type="checkbox" name="edad" value="cachorro" /> Cachorro</label>
                    </fieldset>

                    <fieldset>
                        <legend>Material</legend>
                        <label><input type="checkbox" name="material" value="acero" /> Acero</label>
                        <label><input type="checkbox" name="material" value="ceramica" /> Cerámica</label>
                        <label><input type="checkbox" name="material" value="plastico" /> Plástico</label>
                        <label><input type="checkbox" name="material" value="silicona" /> Silicona</label>
                    </fieldset>

                    <fieldset>
                        <legend>Marca</legend>
                        <label><input type="checkbox" name="marca" value="marca1" /> Marca 1</label>
                        <label><input type="checkbox" name="marca" value="marca2" /> Marca 2</label>
                        <label><input type="checkbox" name="marca" value="marca3" /> Marca 3</label>
                    </fieldset>
                </form>
            </div>
        </div>
    )

}