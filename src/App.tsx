import './App.css'
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { Home } from './pages/Home';
import { HistorialMedico } from './pages/HistorialMedico';
import Tienda  from "./pages/Tienda";
import { productosMock } from './assets/productoMock';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="mi-perfil/perfil-mascota/historial-medico" element={<HistorialMedico />} />
          <Route path='tienda' element={<Tienda productos={productosMock} /> } />
        </Route>
      </Routes>
    </>
  )
}

export { App }
