// Cargar header y footer
fetch('header.html').then(r=>r.text()).then(h=>document.getElementById('header-placeholder').innerHTML=h);
fetch('footer.html').then(r=>r.text()).then(h=>document.getElementById('footer-placeholder').innerHTML=h);

let carrito = JSON.parse(localStorage.getItem('serviciosPetLove') || '[]');
let descuento = 0;

const lista = document.getElementById('listaCarrito');
const btnFinalizar = document.getElementById('btnFinalizar');
const countArt = document.getElementById('countArt');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const carruselItems = document.getElementById('carruselItems');

function renderCarrito(){
    if(carrito.length===0){
        lista.innerHTML = `<div class="carrito-empty">No has seleccionado ningún servicio<br><a href="seleccionar-mascota.html" style="font-size:11px;color:#333">Ir a seleccionar servicios</a></div>`;
        countArt.textContent = '0 artículos';
        btnFinalizar.disabled = true;
        actualizarTotales();
        return;
    }

    countArt.textContent = `${carrito.reduce((a,b)=>a+(b.cantidad||1),0)} artículos`;
    btnFinalizar.disabled = false;

    lista.innerHTML = carrito.map((item,i)=>`
        <div class="carrito-item">
            <div class="item-info">
                <span class="item-nombre">${item.nombre}</span>
                <span class="item-mascota">Mascota: ${item.mascota} (${item.tipo||''})</span>
                <button class="item-eliminar" data-index="${i}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
                    Eliminar
                </button>
            </div>
            <div class="item-right">
                <span class="item-precio">$${Number(item.precio).toLocaleString('es-CL')}</span>
                <div class="qty-box">
                    <button class="qty-minus" data-index="${i}">-</button>
                    <span>${item.cantidad||1}</span>
                    <button class="qty-plus" data-index="${i}">+</button>
                </div>
            </div>
        </div>
    `).join('');

    // Asignar eventos a botones generados dinámicamente
    document.querySelectorAll('.item-eliminar').forEach(btn=> btn.addEventListener('click', e=> eliminarItem(parseInt(e.currentTarget.dataset.index))));
    document.querySelectorAll('.qty-minus').forEach(btn=> btn.addEventListener('click', e=> cambiarCant(parseInt(e.currentTarget.dataset.index), -1)));
    document.querySelectorAll('.qty-plus').forEach(btn=> btn.addEventListener('click', e=> cambiarCant(parseInt(e.currentTarget.dataset.index), 1)));

    actualizarTotales();
}

function actualizarTotales(){
    let subtotal = carrito.reduce((acc,it)=> acc + (Number(it.precio)*(it.cantidad||1)), 0);
    let total = subtotal - descuento;
    if(total < 0) total = 0;

    subtotalEl.textContent = `$${subtotal.toLocaleString('es-CL')}`;
    totalEl.textContent = `$${total.toLocaleString('es-CL')}`;

    localStorage.setItem('serviciosPetLove', JSON.stringify(carrito));
    renderTeFaltoAlgo();
}

function cambiarCant(index, delta){
    carrito[index].cantidad = Math.max(1, (carrito[index].cantidad||1)+delta);
    renderCarrito();
}

function eliminarItem(index){
    carrito.splice(index,1);
    renderCarrito();
}

function aplicarCupon(){
    const codigo = document.getElementById('cuponInput').value.trim().toLowerCase();
    if(codigo==='petlove10'){
        descuento = carrito.reduce((a,b)=>a+Number(b.precio)*(b.cantidad||1),0)*0.1;
        alert('Cupón 10% aplicado');
    } else if(codigo){
        alert('Cupón no válido');
        descuento = 0;
    }
    actualizarTotales();
}

function renderTeFaltoAlgo(){
    const todos = [
        "Consulta Veterinaria",
        "Consulta Veterinaria + Vacunas",
        "Consulta Veterinaria + Certificado de viaje",
        "Consulta + Implantación de Microchip"
    ];
    const faltantes = todos.filter(n=>!carrito.map(c=>c.nombre).includes(n));

    if(faltantes.length===0){
        carruselItems.innerHTML = '<p style="font-size:11px;color:#888">¡Ya agregaste todos!</p>';
        return;
    }

    carruselItems.innerHTML = faltantes.map(nombre=>`
        <div class="carrusel-card">
            <div class="img-x"></div>
            <div style="font-size:9px;text-align:center;padding:0 5px">${nombre}</div>
            <button class="btn-add-carrusel" data-nombre="${nombre}">Añadir al carrito</button>
        </div>
    `).join('');

    document.querySelectorAll('.btn-add-carrusel').forEach(btn=>{
        btn.addEventListener('click', e=> agregarDesdeCarrusel(e.currentTarget.dataset.nombre));
    });
}

function agregarDesdeCarrusel(nombre){
    const precios = {
        "Consulta Veterinaria": 9990,
        "Consulta Veterinaria + Vacunas": 23990,
        "Consulta Veterinaria + Certificado de viaje": 31990,
        "Consulta + Implantación de Microchip": 25990
    };
    carrito.push({
        nombre: nombre,
        precio: precios[nombre]||9990,
        cantidad: 1,
        mascota: localStorage.getItem('mascotaSeleccionada')||'Luna',
        tipo: localStorage.getItem('tipoMascota')||'Perro'
    });
    renderCarrito();
}

// Eventos estáticos
document.getElementById('btnCupon').addEventListener('click', aplicarCupon);
document.getElementById('btnPrev').addEventListener('click', ()=> carruselItems.scrollBy({left:-150,behavior:'smooth'}));
document.getElementById('btnNext').addEventListener('click', ()=> carruselItems.scrollBy({left:150,behavior:'smooth'}));
btnFinalizar.addEventListener('click', ()=>{
    if(carrito.length>0) window.location.href='agendar-fecha-hora.html';
});

// Inicializar
renderCarrito();