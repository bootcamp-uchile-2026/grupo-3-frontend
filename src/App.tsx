import './App.css'
import { Route, Routes } from 'react-router/internal/react-server-client'
import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home'
import { Tienda } from './pages/Tienda'
import { HistorialMedico } from './pages/HistorialMedico'
import { Checkout } from './pages/Checkout/Checkout'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="tienda" element={<Tienda />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="mi-perfil/perfil-mascota/historial-medico" element={<HistorialMedico />} />
        </Route>
      </Routes>
    </>
  )
}

export { App }
