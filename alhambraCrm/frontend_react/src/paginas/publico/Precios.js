import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Precios.css';

const Precios = () => {
  const planes = [
    {
      nombre: 'Básico',
      precio: '19,99€',
      periodo: 'mes',
      descripcion: 'Ideal para autónomos y pequeñas empresas que comienzan.',
      caracteristicas: [
        'Hasta 500 contactos',
        'Gestión básica de clientes',
        'Seguimiento de ventas',
        'Soporte por email',
        'Actualizaciones gratuitas'
      ],
      botonTexto: 'Comenzar gratis',
      botonLink: '/registro',
      destacado: false
    },
    {
      nombre: 'Profesional',
      precio: '49,99€',
      periodo: 'mes',
      descripcion: 'Perfecto para empresas en crecimiento con necesidades avanzadas.',
      caracteristicas: [
        'Hasta 5.000 contactos',
        'Automatización de marketing',
        'Informes personalizados',
        'Integración con herramientas',
        'Soporte prioritario',
        'Acceso API'
      ],
      botonTexto: 'Contratar ahora',
      botonLink: '/registro',
      destacado: true
    },
    {
      nombre: 'Empresarial',
      precio: '99,99€',
      periodo: 'mes',
      descripcion: 'Solución completa para grandes empresas con necesidades específicas.',
      caracteristicas: [
        'Contactos ilimitados',
        'Automatización avanzada',
        'Análisis predictivo',
        'Integraciones personalizadas',
        'Soporte 24/7',
        'Consultor dedicado'
      ],
      botonTexto: 'Contactar ventas',
      botonLink: '/contacto',
      destacado: false
    }
  ];

  return (
    <div className="pagina-precios">
      <div className="cabecera-pagina">
        <Container>
          <h1>Planes y Precios</h1>
          <p>Elige el plan que mejor se adapte a las necesidades de tu negocio</p>
        </Container>
      </div>

      <Container className="contenedor-planes">
        <Row>
          {planes.map((plan, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <div className={`tarjeta-plan ${plan.destacado ? 'plan-destacado' : ''}`}>
                <div className="cabecera-plan">
                  <h3>{plan.nombre}</h3>
                  <div className="precio">
                    <span className="cantidad">{plan.precio}</span>
                    <span className="periodo">/{plan.periodo}</span>
                  </div>
                  <p className="descripcion-plan">{plan.descripcion}</p>
                </div>
                <div className="caracteristicas-plan">
                  <ul>
                    {plan.caracteristicas.map((caracteristica, i) => (
                      <li key={i}>{caracteristica}</li>
                    ))}
                  </ul>
                </div>
                <div className="pie-plan">
                  <Link to={plan.botonLink}>
                    <Button className={plan.destacado ? 'boton-verde' : 'boton-bordeado'}>
                      {plan.botonTexto}
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      
      <Container className="seccion-contacto-precios">
        <div className="contenido-contacto">
          <div className="texto-contacto">
            <h2>¿Necesitas un plan personalizado?</h2>
            <p>Contacta con nuestro equipo de ventas para obtener una solución a medida para tu empresa.</p>
          </div>
          <Link to="/contacto">
            <Button className="boton-oscuro">Contactar ahora</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Precios;
