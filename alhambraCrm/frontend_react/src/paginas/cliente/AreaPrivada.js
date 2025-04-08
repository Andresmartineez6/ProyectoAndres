import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AreaPrivada.css';

const AreaPrivada = () => {
  // Datos de ejemplo para el dashboard
  const estadisticas = [
    { titulo: 'Clientes Activos', valor: '124', icono: 'bi-people-fill', color: '#00f7d3' },
    { titulo: 'Ventas del Mes', valor: '€8,540', icono: 'bi-graph-up', color: '#05044c' },
    { titulo: 'Tareas Pendientes', valor: '15', icono: 'bi-check2-square', color: '#ff7700' },
    { titulo: 'Oportunidades', valor: '32', icono: 'bi-lightning-fill', color: '#0088ff' }
  ];

  return (
    <div className="pagina-area-privada">
      <div className="cabecera-dashboard">
        <Container>
          <h1>Bienvenido a tu Dashboard</h1>
          <p>Gestiona tus clientes y visualiza tus estadísticas</p>
        </Container>
      </div>

      <Container className="contenido-dashboard">
        <Row className="mb-4">
          {estadisticas.map((item, index) => (
            <Col lg={3} md={6} className="mb-4" key={index}>
              <Card className="tarjeta-estadistica">
                <Card.Body>
                  <div className="icono-estadistica" style={{ backgroundColor: `${item.color}20` }}>
                    <i className={`bi ${item.icono}`} style={{ color: item.color }}></i>
                  </div>
                  <div className="datos-estadistica">
                    <h3>{item.valor}</h3>
                    <p>{item.titulo}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={8} className="mb-4">
            <Card className="tarjeta-dashboard">
              <Card.Header>
                <h2>Actividad Reciente</h2>
              </Card.Header>
              <Card.Body>
                <div className="actividad-placeholder">
                  <p>Aquí se mostrará un gráfico con tu actividad reciente</p>
                  <div className="grafico-placeholder"></div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} className="mb-4">
            <Card className="tarjeta-dashboard">
              <Card.Header>
                <h2>Próximas Tareas</h2>
              </Card.Header>
              <Card.Body>
                <div className="lista-tareas">
                  <div className="tarea">
                    <div className="estado-tarea pendiente"></div>
                    <div className="contenido-tarea">
                      <h4>Llamar a Cliente XYZ</h4>
                      <p>Hoy, 15:30</p>
                    </div>
                  </div>
                  <div className="tarea">
                    <div className="estado-tarea en-progreso"></div>
                    <div className="contenido-tarea">
                      <h4>Preparar propuesta comercial</h4>
                      <p>Mañana, 10:00</p>
                    </div>
                  </div>
                  <div className="tarea">
                    <div className="estado-tarea pendiente"></div>
                    <div className="contenido-tarea">
                      <h4>Reunión con equipo de ventas</h4>
                      <p>Jueves, 09:00</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AreaPrivada;
