import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextoAutenticacion } from '../../contexto/ContextoAutenticacion';

const RutaProtegida = ({ children }) => {
  const { estaAutenticado } = useContext(ContextoAutenticacion);
  
  if (!estaAutenticado()) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default RutaProtegida;
