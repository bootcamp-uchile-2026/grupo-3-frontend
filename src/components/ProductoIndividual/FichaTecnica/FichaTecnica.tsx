type FichaTecnicaProps = {
    detalle?: Record<string, string>;
    texto?: string;
};

export function FichaTecnica({ detalle, texto }: FichaTecnicaProps) {
    const filas = Object.entries(detalle ?? {});
    if (texto?.trim()) filas.unshift(["Ficha técnica", texto]);

    if (filas.length === 0) {
        return <p className="ficha-tecnica__vacia">No hay ficha técnica disponible para este producto.</p>;
    }

    return (
        <div className="ficha-tecnica__contenedor">
            <table className="ficha-tecnica">
                <tbody>
                    {filas.map(([caracteristica, valor], index) => (
                        <tr key={`${index}-${caracteristica}`}>
                            <th scope="row">{caracteristica}</th>
                            <td>{valor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
