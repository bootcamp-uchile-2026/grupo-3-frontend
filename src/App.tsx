import './App.css'
import { Route, Routes } from 'react-router/internal/react-server-client'
import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home/Home'
import { Tienda } from './pages/Tienda'
import { HistorialMedico } from './pages/HistorialMedico'
import { Checkout } from './pages/Checkout/Checkout'
import { ConfirmacionPedido } from './pages/ConfirmacionPedido/ConfirmacionPedido'
import { ProductoIndividual } from './pages/ProductoIndividual/ProductoIndividual'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="tienda" element={<Tienda />} />
          <Route path="producto-individual" element={<ProductoIndividual />} />
          <Route path="producto-individual/:id" element={<ProductoIndividual />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="confirmacion-pedido" element={<ConfirmacionPedido />} />
          <Route path="mi-perfil/perfil-mascota/historial-medico" element={<HistorialMedico />} />
        </Route>
      </Routes>
    </>
  )
}

export { App }
