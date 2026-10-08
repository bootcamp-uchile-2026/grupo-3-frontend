import './App.css'
import { Route, Routes } from 'react-router/internal/react-server-client'
import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home'
import { HistorialMedico } from './pages/HistorialMedico'
import PerfilMascota from './pages/PerfilMascota'
import CarritoCompras from './pages/CarritoCompras'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

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
        </Route>
      </Routes>
    </>
  )
}

export { App }