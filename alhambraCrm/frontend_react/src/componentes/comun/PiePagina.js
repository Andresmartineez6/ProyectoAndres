import React from 'react';
import { Link } from 'react-router-dom';
import './PiePagina.css';

const PiePagina = () => {
  return (
    <footer id="pie">
      <div className="contenedor contenedor-footer">
        <div className="logo-footer">
          <img src="/assets/imgs/Property 1=Default.png" alt="Logo Alhambra CRM" />
        </div>
    
        <div className="enlaces-footer">
          <Link to="/condiciones">Condiciones de uso</Link>
          <span>|</span>
          <Link to="/privacidad">Política de privacidad</Link>
          <span>|</span>
          <Link to="/cookies">Política de cookies</Link>
          <span>|</span>
          <Link to="/contacto">Contacta</Link>
        </div>
    
        <hr />
    
        <div className="info-inferior">
          <p> 2025 AlhambraCRM. Todos los derechos reservados.</p>
    
          <div className="redes-sociales">
            <a href="#"><img src="/assets/imgs/icons8-facebook-nuevo.svg" alt="Facebook" /></a>
            <a href="#"><img src="/assets/imgs/icons8-x.svg" alt="Twitter" /></a>
            <a href="#"><img src="/assets/imgs/icons8-youtube.svg" alt="YouTube" /></a>
            <a href="#"><img src="/assets/imgs/icons8-instagram.svg" alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PiePagina;
