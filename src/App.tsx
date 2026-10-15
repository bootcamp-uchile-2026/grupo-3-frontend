import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { AgendarVeterinarioDatosContacto } from './pages/AgendarVeterinarioDatosContacto/AgendarVeterinarioDatosContacto'
import { AgendarVeterinarioProfesional } from './pages/AgendarVeterinarioProfesional/AgendarVeterinarioProfesional'
import { CarritoCompras } from './pages/CarritoCompras/CarritoCompras'
import { Checkout } from './pages/Checkout/Checkout'
import { Configuracion } from './pages/Configuracion/Configuracion'
import { ConfirmacionPedido } from './pages/ConfirmacionPedido/ConfirmacionPedido'
import { HistorialMedico } from './pages/HistorialMedico/HistorialMedico'
import { Home } from './pages/Home/Home'
import { PerfilMascota } from './pages/PerfilMascota/PerfilMascota'
import { PerfilUsuario } from './pages/PerfilUsuario/PerfilUsuario'
import { ProductoIndividual } from './pages/ProductoIndividual/ProductoIndividual'
import { Tienda } from './pages/Tienda/Tienda'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="tienda" element={<Tienda />} />
        <Route path="categoria/*" element={<Tienda />} />
        <Route path="producto-individual" element={<ProductoIndividual />} />
        <Route path="producto-individual/:id" element={<ProductoIndividual />} />

        <Route path="carrito-compras" element={<CarritoCompras />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="carrito-compras/checkout" element={<Checkout />} />
        <Route path="confirmacion-pedido/:id" element={<ConfirmacionPedido />} />
        <Route path="carrito-compras/confirmacion-pedido/:id" element={<ConfirmacionPedido />} />
        <Route path="confirmacion-pedido" element={<ConfirmacionPedido />} />
        <Route path="carrito-compras/confirmacion-pedido" element={<ConfirmacionPedido />} />

        <Route path="mi-perfil/perfil-usuario" element={<PerfilUsuario />} />
        <Route path="mi-perfil/configuracion" element={<Configuracion />} />
        <Route path="mi-perfil/perfil-mascota" element={<PerfilMascota />} />
        <Route path="mi-perfil/perfil-mascota/historial-medico" element={<HistorialMedico />} />

        <Route
          path="servicios-veterinarios/agendar-veterinario-lista-servicios"
          element={<AgendarVeterinarioProfesional />}
        />
        <Route
          path="servicios-veterinarios/agendar-veterinario-datos-contacto"
          element={<AgendarVeterinarioDatosContacto />}
        />
      </Route>
    </Routes>
  )
}

export { App }
