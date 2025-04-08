import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ContextoAutenticacion } from '../../contexto/ContextoAutenticacion';
import './NoEncontrado.css';

const NoEncontrado = () => {
  const { estaAutenticado, esAdmin } = useContext(ContextoAutenticacion);
  const navigate = useNavigate();
  
  const handleVolver = () => {
    if (estaAutenticado()) {
      if (esAdmin()) {
        navigate('/admin');
      } else {
        navigate('/area-privada');
      }
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="pagina-no-encontrado">
      <Container className="contenedor-404">
        <h1 className="titulo-404">404</h1>
        <h2 className="subtitulo-404">Página no encontrada</h2>
        <p className="descripcion-404">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button className="boton-verde" onClick={handleVolver}>
          {estaAutenticado() ? 
            (esAdmin() ? 'Volver al panel de administración' : 'Volver al dashboard') : 
            'Volver al inicio'}
        </Button>
      </Container>
    </div>
  );
};

export default NoEncontrado;
