import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextoAutenticacion } from '../../contexto/ContextoAutenticacion';

const RutaAdmin = ({ children }) => {
  const { esAdmin } = useContext(ContextoAutenticacion);
  
  if (!esAdmin()) {
    return <Navigate to="/area-privada" />;
  }
  
  return children;
};

export default RutaAdmin;
