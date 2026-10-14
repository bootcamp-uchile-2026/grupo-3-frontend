
import './App.css'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home/Home'
import { Tienda } from './pages/Tienda'
import { HistorialMedico } from './pages/HistorialMedico'
import PerfilMascota from './pages/PerfilMascota'
import { Checkout } from './pages/Checkout/Checkout'
import { ConfirmacionPedido } from './pages/ConfirmacionPedido/ConfirmacionPedido'
import { ProductoIndividual } from './pages/ProductoIndividual/ProductoIndividual'
import { productosMock } from './assets/productoMock'
import CarritoCompras from './pages/CarritoCompras'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route
          path="tienda"
          element={<Tienda productos={productosMock} />}
        />

        <Route
          path="carrito-compras"
          element={<CarritoCompras />}
        />

        <Route
          path="mi-perfil/perfil-mascota"
          element={<PerfilMascota />}
        />

        <Route
          path="mi-perfil/perfil-mascota/historial-medico"
          element={<HistorialMedico />}
        />

        <Route
          path="producto-individual"
          element={<ProductoIndividual />}
        />

        <Route
          path="producto-individual/:id"
          element={<ProductoIndividual />}
        />

        <Route
          path="checkout"
          element={<Checkout />}
        />

        <Route
          path="confirmacion-pedido"
          element={<ConfirmacionPedido />}
        />
      </Route>
    </Routes>
  )
}

export { App }
