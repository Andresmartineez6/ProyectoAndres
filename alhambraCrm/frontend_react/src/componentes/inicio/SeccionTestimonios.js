import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './SeccionTestimonios.css';

const SeccionTestimonios = () => {
  const [testimonioActivo, setTestimonioActivo] = useState(0);
  const intervaloRef = useRef(null);
  
  const testimonios = [
    {
      id: 1,
      nombre: "Carlos Rodríguez",
      cargo: "Director de Ventas, TechSolutions",
      imagen: "carlos reseña.jfif",
      texto: "AlhambraCRM ha transformado completamente nuestra gestión de clientes. Ahora podemos hacer seguimiento de todas las interacciones y cerrar más ventas. La interfaz es intuitiva y el soporte técnico es excelente."
    },
    {
      id: 2,
      nombre: "María González",
      cargo: "CEO, Marketing Digital Pro",
      imagen: "maria gonzalez.jpg",
      texto: "Desde que implementamos AlhambraCRM, nuestra productividad ha aumentado un 40%. La automatización de tareas nos permite enfocarnos en lo que realmente importa: nuestros clientes."
    },
    {
      id: 3,
      nombre: "Javier Martínez",
      cargo: "Gerente de Operaciones, Innovatech",
      imagen: "javier martinez.jpg",
      texto: "La capacidad de personalización de AlhambraCRM es impresionante. Hemos adaptado el sistema a nuestras necesidades específicas y ahora tenemos una visión completa de nuestro negocio."
    }
  ];

  useEffect(() => {
    // Iniciar rotación automática
    iniciarRotacionAutomatica();
    
    // Limpiar intervalo al desmontar
    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, []);

  const iniciarRotacionAutomatica = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }
    
    intervaloRef.current = setInterval(() => {
      setTestimonioActivo(prev => (prev + 1) % testimonios.length);
    }, 5000);
  };

  const seleccionarTestimonio = (index) => {
    setTestimonioActivo(index);
    // Reiniciar rotación automática
    iniciarRotacionAutomatica();
  };

  return (
    <section id="seccion-testimonios">
      <Container>
        <h2>Lo que dicen nuestros clientes</h2>
        <p className="subtitulo">Miles de empresas confían en AlhambraCRM para gestionar sus relaciones con clientes.</p>
        
        <div className="contenedor-testimonios">
          <div className="carrusel-testimonios">
            {testimonios.map((testimonio, index) => (
              <div 
                key={testimonio.id}
                className={`testimonio ${index === testimonioActivo ? 'activo' : ''}`}
              >
                <div className="contenido-testimonio">
                  <p className="texto-testimonio">"{testimonio.texto}"</p>
                  <div className="info-cliente">
                    <div className="avatar-cliente">
                      <img 
                        src={`/assets/imgs/${testimonio.imagen}`} 
                        alt={testimonio.nombre} 
                      />
                    </div>
                    <div className="detalles-cliente">
                      <h4 className="nombre-cliente">{testimonio.nombre}</h4>
                      <p className="cargo-cliente">{testimonio.cargo}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="controles-testimonios">
            {testimonios.map((_, index) => (
              <button 
                key={index}
                className={`control-punto ${index === testimonioActivo ? 'activo' : ''}`}
                onClick={() => seleccionarTestimonio(index)}
                aria-label={`Testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SeccionTestimonios;
