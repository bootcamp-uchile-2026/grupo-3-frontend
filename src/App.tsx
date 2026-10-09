import './App.css'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home'
import { HistorialMedico } from './pages/HistorialMedico'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="mi-perfil/perfil-mascota/historial-medico" element={<HistorialMedico />} />
        </Route>
      </Routes>
    </>
  )
}

export { App }
