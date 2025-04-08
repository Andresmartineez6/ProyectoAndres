import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Contexto de autenticación
import { ProveedorAutenticacion } from './contexto/ContextoAutenticacion';

// Páginas
import Inicio from './paginas/publico/Inicio';
import NoEncontrado from './paginas/publico/NoEncontrado';

// Componentes comunes
import RutaProtegida from './componentes/comun/RutaProtegida';
import RutaAdmin from './componentes/comun/RutaAdmin';
import Cabecera from './componentes/comun/Cabecera';
import PiePagina from './componentes/comun/PiePagina';

// Páginas adicionales
import Caracteristicas from './paginas/publico/Caracteristicas';
import Precios from './paginas/publico/Precios';
import Contacto from './paginas/publico/Contacto';
import Login from './paginas/publico/Login';
import Registro from './paginas/publico/Registro';

// Páginas de cliente
import AreaPrivada from './paginas/cliente/AreaPrivada';
import Dashboard from './paginas/cliente/Dashboard';
import Tareas from './paginas/cliente/Tareas';
import Contactos from './paginas/cliente/Contactos';
import Calendario from './paginas/cliente/Calendario';
import Proyectos from './paginas/cliente/Proyectos';
import Informes from './paginas/cliente/Informes';

// Páginas de administrador
import DashboardAdmin from './paginas/admin/Dashboard';
import Clientes from './paginas/admin/Clientes';
import Trabajadores from './paginas/admin/Trabajadores';
import ProyectosAdmin from './paginas/admin/Proyectos';
import InformesAdmin from './paginas/admin/Informes';
import Configuracion from './paginas/admin/Configuracion';

function App() {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simulación de carga inicial
    const timer = setTimeout(() => {
      setCargando(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (cargando) {
    return <div className="pantalla-carga">Cargando...</div>;
  }

  return (
    <ProveedorAutenticacion>
      <div className="App">
        <Cabecera />
        <main>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/caracteristicas" element={<Caracteristicas />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            
            {/* Rutas protegidas para clientes */}
            <Route path="/area-privada" element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            } />
            <Route path="/area-privada/tareas" element={
              <RutaProtegida>
                <Tareas />
              </RutaProtegida>
            } />
            <Route path="/area-privada/contactos" element={
              <RutaProtegida>
                <Contactos />
              </RutaProtegida>
            } />
            <Route path="/area-privada/calendario" element={
              <RutaProtegida>
                <Calendario />
              </RutaProtegida>
            } />
            <Route path="/area-privada/proyectos" element={
              <RutaProtegida>
                <Proyectos />
              </RutaProtegida>
            } />
            <Route path="/area-privada/informes" element={
              <RutaProtegida>
                <Informes />
              </RutaProtegida>
            } />
            
            {/* Rutas protegidas para administradores */}
            <Route path="/admin" element={
              <RutaAdmin>
                <DashboardAdmin />
              </RutaAdmin>
            } />
            <Route path="/admin/clientes" element={
              <RutaAdmin>
                <Clientes />
              </RutaAdmin>
            } />
            <Route path="/admin/trabajadores" element={
              <RutaAdmin>
                <Trabajadores />
              </RutaAdmin>
            } />
            <Route path="/admin/proyectos" element={
              <RutaAdmin>
                <ProyectosAdmin />
              </RutaAdmin>
            } />
            <Route path="/admin/informes" element={
              <RutaAdmin>
                <InformesAdmin />
              </RutaAdmin>
            } />
            <Route path="/admin/configuracion" element={
              <RutaAdmin>
                <Configuracion />
              </RutaAdmin>
            } />
            
            {/* Ruta para páginas no encontradas */}
            <Route path="*" element={<NoEncontrado />} />
          </Routes>
        </main>
        <PiePagina />
      </div>
    </ProveedorAutenticacion>
  );
}

export default App;
