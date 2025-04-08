import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './SeccionIntegraciones.css';

const SeccionIntegraciones = () => {
  const integraciones = [
    {
      nombre: "Salesforce",
      imagen: "Salesforce.com_logo.svg.png",
      descripcion: "Sincroniza datos entre AlhambraCRM y Salesforce"
    },
    {
      nombre: "Google",
      imagen: "Google_2015_logo.svg.png",
      descripcion: "Integración con Google Calendar, Gmail y Drive"
    },
    {
      nombre: "Slack",
      imagen: "Slack_icon_2019.svg.png",
      descripcion: "Recibe notificaciones y actualiza registros desde Slack"
    },
    {
      nombre: "HubSpot",
      imagen: "HubSpot_Logo.svg.png",
      descripcion: "Conecta tus campañas de marketing con AlhambraCRM"
    },
    {
      nombre: "Zapier",
      imagen: "zapier-2.svg",
      descripcion: "Conecta AlhambraCRM con más de 3,000 aplicaciones"
    }
  ];

  return (
    <section className="seccion-integraciones">
      <Container>
        <div className="texto-central mb-5">
          <h2 className="titulo-seccion">Integraciones Poderosas</h2>
          <p className="subtitulo-seccion">
            AlhambraCRM se integra con tus herramientas favoritas para un flujo de trabajo sin interrupciones.
          </p>
        </div>
        
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="contenedor-integraciones">
              {integraciones.map((integracion, index) => (
                <div className="item-integracion" key={index}>
                  <div className="logo-integracion">
                    <img 
                      src={`/assets/imgs/${integracion.imagen}`} 
                      alt={integracion.nombre} 
                    />
                  </div>
                  <h5 className="nombre-integracion">{integracion.nombre}</h5>
                  <p className="descripcion-integracion">{integracion.descripcion}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        
        <div className="texto-adicional text-center mt-4">
          <p>Y muchas más integraciones disponibles en nuestro marketplace.</p>
          <a href="/integraciones" className="enlace-ver-mas">
            Ver todas las integraciones
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default SeccionIntegraciones;
