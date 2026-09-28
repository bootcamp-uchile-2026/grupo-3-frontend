import './App.css'
import { Route, Routes } from 'react-router/internal/react-server-client'
import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
       <Route index element={<Home />} />
      </Route>
    </Routes>
    </>
  )
}

export { App }
