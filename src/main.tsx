import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
/*
BrowserRouter es un componente que permite la navegación en una aplicación React 
utilizando rutas basadas en el historial del navegador. 
Proporciona un contexto de enrutamiento para los componentes hijos, lo que permite 
definir rutas y navegar entre ellas sin recargar la página.
*/
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> 
    <App />
    </BrowserRouter>
  </StrictMode>,
)
