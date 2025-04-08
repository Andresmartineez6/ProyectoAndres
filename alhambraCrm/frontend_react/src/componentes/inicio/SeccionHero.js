import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SeccionHero.css';

const SeccionHero = () => {
  return (
    <section id="seccion-hero">
      <div className="contenido-hero contenedor">
        <div className="texto-hero">
          <h1>
            <span className="negrita">La Herramienta perfecta</span> para gestionar y crecer
          </h1>
          <p>
            La herramienta perfecta para automatizar procesos, potenciar ventas y fortalecer relaciones
          </p>
          <div className="botones-hero">
            <Link to="/registro" className="boton-verde">
              Descargar demo
            </Link>
            <Link to="/contacto" className="boton-bordeado">
              Solicitar información
            </Link>
          </div>
        </div>
        <div className="imagen-hero">
          <img src="/assets/imgs/image 12.png" alt="Imagen de CRM futurista" />
        </div>
      </div>
    </section>
  );
};

export default SeccionHero;
