import React, { createContext, useState, useEffect } from 'react';
import { servicioAutenticacion } from '../servicios/api';

// Crear el contexto
export const ContextoAutenticacion = createContext();

export const ProveedorAutenticacion = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  
  useEffect(() => {
    // Comprobar si hay un usuario en localStorage
    const usuarioActual = servicioAutenticacion.obtenerUsuarioActual();
    if (usuarioActual) {
      setUsuario(usuarioActual);
    }
    setCargando(false);
  }, []);
  
  // Función para iniciar sesión
  const iniciarSesion = async (datosUsuario, callback) => {
    try {
      // En un entorno real, esto se conectaría con el backend
      // Por ahora, simulamos un inicio de sesión exitoso
      setCargando(true);
      
      // Simulación de conexión con el backend
      const usuarioAutenticado = {
        id: 1,
        nombre: 'Usuario',
        apellidos: 'Demo',
        email: datosUsuario.email,
        rol: datosUsuario.email.includes('admin') ? 'admin' : 'cliente'
      };
      
      // En un entorno real, esto sería:
      // const respuesta = await servicioAutenticacion.iniciarSesion(datosUsuario);
      // const usuarioAutenticado = respuesta.usuario;
      
      setUsuario(usuarioAutenticado);
      localStorage.setItem('usuario', JSON.stringify(usuarioAutenticado));
      
      setCargando(false);
      
      if (callback) callback();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setCargando(false);
      throw error;
    }
  };
  
  // Función para registrar un nuevo usuario
  const registrarUsuario = async (datosUsuario, callback) => {
    try {
      // En un entorno real, esto se conectaría con el backend
      // Por ahora, simulamos un registro exitoso
      setCargando(true);
      
      // Generamos un ID único para el nuevo usuario
      const nuevoId = Date.now();
      
      const nuevoUsuario = {
        id: nuevoId,
        nombre: datosUsuario.nombre,
        apellidos: datosUsuario.apellidos,
        email: datosUsuario.email,
        telefono: datosUsuario.telefono || '',
        empresa: datosUsuario.empresa || '',
        rol: 'cliente' // Por defecto, todos los usuarios nuevos son clientes
      };
      
      // En un entorno real, esto sería:
      // const respuesta = await servicioAutenticacion.registrar(datosUsuario);
      // const nuevoUsuario = respuesta.usuario;
      
      // Guardamos el usuario en el estado y en localStorage
      setUsuario(nuevoUsuario);
      localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
      
      setCargando(false);
      
      // En un caso real, aquí se enviarían los datos al backend
      console.log('Nuevo usuario registrado:', nuevoUsuario);
      
      if (callback) callback();
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setCargando(false);
      throw error;
    }
  };
  
  // Función para actualizar datos del usuario
  const actualizarUsuario = async (datosUsuario, callback) => {
    try {
      setCargando(true);
      
      // En un entorno real, esto se conectaría con el backend
      // const respuesta = await servicioUsuarios.actualizar(usuario.id, datosUsuario);
      // const usuarioActualizado = respuesta.data;
      
      // Simulación de actualización
      const usuarioActualizado = {
        ...usuario,
        ...datosUsuario
      };
      
      setUsuario(usuarioActualizado);
      localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      
      setCargando(false);
      
      if (callback) callback();
      
      return usuarioActualizado;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setCargando(false);
      throw error;
    }
  };
  
  // Función para cerrar sesión
  const cerrarSesion = (callback) => {
    // En un entorno real, esto sería:
    // servicioAutenticacion.cerrarSesion();
    
    setUsuario(null);
    localStorage.removeItem('usuario');
    
    if (callback) callback();
  };
  
  // Verificar si el usuario está autenticado
  const estaAutenticado = () => {
    return !!usuario;
  };
  
  // Verificar si el usuario es administrador
  const esAdmin = () => {
    return usuario && usuario.rol === 'admin';
  };
  
  // Valores que se proporcionarán a través del contexto
  const valor = {
    usuario,
    cargando,
    iniciarSesion,
    registrarUsuario,
    actualizarUsuario,
    cerrarSesion,
    estaAutenticado,
    esAdmin
  };
  
  return (
    <ContextoAutenticacion.Provider value={valor}>
      {children}
    </ContextoAutenticacion.Provider>
  );
};
