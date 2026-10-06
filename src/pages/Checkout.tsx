export function Checkout() {

return(
<section>
            <div className="container checkout-container">
                <div className="datos-envio-div">
                    <div className="titulo-icono">
                        <img src="https://placehold.co/30x30" alt="" />
                        <h2>Datos para el despacho</h2>
                    </div>
                    <form action="" id="datos-envio">
                        <div className="form-row">
                            <input type="text" name="nombre-envio" id="nombre-envio" placeholder="Nombre*" />
                            <input type="text" name="apellidos-envio" id="apellidos-envio" placeholder="Apellidos*" />
                        </div>
                        <div className="form-row">
                            <input type="text" name="direccion-envio" id="direccion-envio" placeholder="Dirección, calle y número*" />
                            <input type="text" name="direccion-detalle-envio" id="direccion-detalle-envio" placeholder="N° depto, oficina, etc. (Opcional)" />
                        </div>
                        <select name="region-envio" id="region-envio">
                            <option value="" disabled selected>Selecciona una región</option>
                            <option value="region-1">Región 1</option>
                            <option value="region-2">Región 2</option>
                            <option value="region-3">Región 3</option>
                        </select>
                        <select name="comuna-envio" id="comuna-envio">
                            <option value="" disabled selected>Comuna</option>
                            <option value="comuna-1">Comuna 1</option>
                            <option value="comuna-2">Comuna 2</option>
                            <option value="comuna-3">Comuna 3</option>
                        </select>
                        <div className="form-row">
                            <input type="email" name="email-envio" id="email-envio" placeholder="Correo electrónico*" />
                            <input type="tel" name="telefono-envio" id="telefono-envio" placeholder="Teléfono*" />
                        </div>
                        <select name="boleta-factura-envio" id="boleta-factura-envio">
                            <option value="" disabled selected>¿Boleta o factura?*</option>
                            <option value="boleta">Boleta</option>
                            <option value="Factura">Factura</option>
                        </select>
                        <input type="number" name="rut-envio" id="rut-envio" placeholder="Rut*" />
                    </form>
                </div>
                <div className="metodo-envio-div">
                    <div className="titulo-icono">
                        <img src="https://placehold.co/30x30" alt="" />
                        <h2>¿Recibes o retiras tu pedido?</h2>
                    </div>
                    <form action="" className="sel-metodos">
                        <div className="sel-metodo">
                            <div className="input-label">
                                <input type="radio" name="metodo-envio" id="envio-normal" />
                                <label htmlFor="envio-normal">Envío Normal</label>
                            </div>
                            <p>$3.990</p>
                        </div>
                        <div className="sel-metodo">
                            <div className="input-label">
                                <input type="radio" name="metodo-envio" id="retiro-tienda" />
                                <label htmlFor="retiro-tienda">Retiro gratis en tienda.</label>
                            </div>
                            <p>Gratis</p>
                        </div>
                    </form>
                </div>
                <div className="metodo-pago-div">
                    <div className="titulo-icono">
                        <img src="https://placehold.co/30x30" alt="" />
                        <h2>¿Cómo vas a pagar?</h2>
                    </div>
                    <form action="" id="metodo-pago" className="sel-metodos">
                        <div className="sel-metodo">
                            <div className="input-label">
                                <input type="radio" name="metodo-pago" id="mercado-pago" />
                                <label htmlFor="mercado-pago">Mercado Pago</label>
                            </div>
                            <img src="https://placehold.co/45x30" alt="" />
                        </div>
                        <div className="sel-metodo">
                            <div className="input-label">
                                <input type="radio" name="metodo-pago" id="tarjetas" />
                                <label htmlFor="tarjetas">Tarjeta crédito, débito y prepago.</label>
                            </div>
                        </div>
                        <div className="sel-metodo">
                            <div className="input-label">
                                <input type="radio" name="metodo-pago" id="webpay-plus" />
                                <label htmlFor="webpay-plus">Webpay Plus</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="resumen-pedido-div">
                    <div className="titulo-icono">
                        <img src="https://placehold.co/30x30" alt="" />
                        <h2>Resumen del pedido</h2>
                    </div>
                    <div className="productos-resumen-pedido">
                        <article className="producto-resumen-pedido">
                            <div className="info-producto">
                                <img src="https://placehold.co/80x80" alt="" className="imagen-producto-resumen" />
                                <p className="nombre-producto-resumen">Nombre de producto</p>
                            </div>
                            <p className="precio-producto-resumen">$7.490</p>
                        </article>
                        <article className="producto-resumen-pedido">
                            <div className="info-producto">
                                <img src="https://placehold.co/80x80" alt="" className="imagen-producto-resumen" />
                                <p className="nombre-producto-resumen">Nombre de producto</p>
                            </div>
                            <p className="precio-producto-resumen">$7.490</p>
                        </article>
                        <article className="producto-resumen-pedido">
                            <div className="info-producto">
                                <img src="https://placehold.co/80x80" alt="" className="imagen-producto-resumen" />
                                <p className="nombre-producto-resumen">Nombre de producto</p>
                            </div>
                            <p className="precio-producto-resumen">$7.490</p>
                        </article>
                    </div>
                    <div className="cupon-descuento">
                        <div className="titulo-icono">
                            <img src="https://placehold.co/30x30" alt="" />
                            <h3>Cupón de descuento o Giftcard</h3>
                        </div>
                        <form action="" id="codigo-cupon">
                            <input type="text" name="codigo" id="codigo" placeholder="Introduce el código promocional" />
                            <button type="submit">Aplicar</button>
                        </form>
                    </div>
                    <div className="subtotal-total-resumen-div">
                        <div className="subtotal-div">
                            <p>Subtotal: </p>
                            <p>$29.960</p>
                        </div>
                        <div className="total-div">
                            <p>Total</p>
                            <span>$29.960</span>
                        </div>
                    </div>
                    <form action="/carrito-compras/confirmacion-pedido.html" id="finalizar-compra">
                        <div className="check-terminos">

                            <input type="checkbox" name="terminos-condiciones" id="terminos-condiciones" />
                            <label htmlFor="terminos-condiciones">He leído y estoy de acuerdo con los <a href="#"
                                    target="_blank"> términos y condiciones.</a></label>

                        </div>
                        <button type="submit">Finalizar compra</button>
                    </form>
                </div>
            </div>
        </section>

)

}