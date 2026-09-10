// Cargar header y footer
fetch('header.html').then(r=>r.text()).then(h=>document.getElementById('header-placeholder').innerHTML=h);
fetch('footer.html').then(r=>r.text()).then(h=>document.getElementById('footer-placeholder').innerHTML=h);

let mascotaSel = localStorage.getItem('mascotaSeleccionada') || null;
const mascotasCards = document.querySelectorAll('.mascota-card');
const btnsAgendar = document.querySelectorAll('.btn-agendar');

// Selección de mascota
mascotasCards.forEach(card=>{
    if(card.dataset.mascota === mascotaSel) {
        card.classList.add('selected');
    }

    card.addEventListener('click', ()=>{
        mascotasCards.forEach(c=>c.classList.remove('selected'));
        card.classList.add('selected');
        card.querySelector('input').checked = true;
        localStorage.setItem('mascotaSeleccionada', card.dataset.mascota);
        localStorage.setItem('tipoMascota', card.dataset.tipo);
        mascotaSel = card.dataset.mascota;
    });
});

// Agregar servicio al carrito y redirigir
btnsAgendar.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        if(!mascotaSel){ 
            alert('Debes seleccionar una mascota primero'); 
            return; 
        }

        let carrito = JSON.parse(localStorage.getItem('serviciosPetLove') || '[]');
        carrito.push({ 
            nombre: btn.dataset.servicio, 
            precio: btn.dataset.precio, 
            cantidad: 1,
            mascota: mascotaSel, 
            tipo: localStorage.getItem('tipoMascota') 
        });
        localStorage.setItem('serviciosPetLove', JSON.stringify(carrito));
        window.location.href = 'serviciosMascotas.html';
    });
});