import React from 'react';
import SeccionHero from '../../componentes/inicio/SeccionHero';
import SeccionCaracteristicas from '../../componentes/inicio/SeccionCaracteristicas';
import SeccionTestimonios from '../../componentes/inicio/SeccionTestimonios';
import SeccionIntegraciones from '../../componentes/inicio/SeccionIntegraciones';
import './Inicio.css';

const Inicio = () => {
  return (
    <div className="pagina-inicio">
      <main>
        <SeccionHero />
        <SeccionCaracteristicas />
        <SeccionTestimonios />
        <SeccionIntegraciones />
      </main>
    </div>
  );
};

export default Inicio;
