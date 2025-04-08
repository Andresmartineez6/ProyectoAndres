import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Caracteristicas.css';

const Caracteristicas = () => {
  const caracteristicas = [
    {
      icono: 'app-developer-icon-small-01.png',
      titulo: 'Dashboard intuitivo',
      descripcion: 'Visualiza toda tu información en un solo lugar. Acceso rápido a estadísticas, actividades recientes y métricas clave de clientes.'
    },
    {
      icono: 'app-developer-icon-small-08.png',
      titulo: 'Gestión de clientes',
      descripcion: 'Administra contactos y empresas de manera eficiente. Organización de clientes con perfiles detallados, historial de interacciones y notas.'
    },
    {
      icono: 'app-developer-icon-small-03.png',
      titulo: 'Automatización de tareas',
      descripcion: 'Ahorra tiempo con procesos automatizados. Automatiza seguimientos, envíos de correos y recordatorios de tareas.'
    },
    {
      icono: 'app-developer-icon-small-07.png',
      titulo: 'Informes personalizados',
      descripcion: 'Genera reportes de ventas y rendimiento con gráficos dinámicos. Crea informes visuales con filtros personalizados para análisis de rendimiento.'
    },
    {
      icono: 'app-developer-icon-small-04.png',
      titulo: 'Seguridad avanzada',
      descripcion: 'Protege la información de tus clientes con protocolos de seguridad robustos. Acceso controlado y encriptación.'
    },
    {
      icono: 'app-developer-icon-small-10.png',
      titulo: 'Integraciones',
      descripcion: 'Conéctate fácilmente con redes sociales y herramientas de marketing. Integración con herramientas clave para la productividad.'
    }
  ];

  return (
    <div className="pagina-caracteristicas">
      <div className="cabecera-pagina">
        <Container>
          <h1>Características de AlhambraCRM</h1>
          <p>Descubre todas las funcionalidades que tenemos para mejorar tu negocio</p>
        </Container>
      </div>

      <Container className="contenido-caracteristicas">
        <Row>
          {caracteristicas.map((caracteristica, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>
              <div className="tarjeta-caracteristica">
                <div className="icono-caracteristica">
                  <img 
                    src={`/assets/imgs/${caracteristica.icono}`} 
                    alt={caracteristica.titulo} 
                  />
                </div>
                <h3>{caracteristica.titulo}</h3>
                <p>{caracteristica.descripcion}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Caracteristicas;
