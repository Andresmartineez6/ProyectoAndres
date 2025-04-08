import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ContextoAutenticacion } from '../../contexto/ContextoAutenticacion';
import './Dashboard.css';

const Dashboard = () => {
  const { usuario } = useContext(ContextoAutenticacion);
  const [estadisticas, setEstadisticas] = useState({
    tareasCompletadas: 0,
    tareasPendientes: 0,
    proyectosActivos: 0,
    proximasReuniones: 0
  });
  
  const [tareasRecientes, setTareasRecientes] = useState([]);
  const [contactosRecientes, setContactosRecientes] = useState([]);
  
  useEffect(() => {
    // Simulación de carga de datos
    // En un caso real, estos datos vendrían del backend
    setEstadisticas({
      tareasCompletadas: 12,
      tareasPendientes: 5,
      proyectosActivos: 3,
      proximasReuniones: 2
    });
    
    setTareasRecientes([
      { id: 1, titulo: 'Revisar propuesta comercial', estado: 'Pendiente', fechaLimite: '2025-04-15', prioridad: 'Alta' },
      { id: 2, titulo: 'Actualizar documentación', estado: 'En progreso', fechaLimite: '2025-04-12', prioridad: 'Media' },
      { id: 3, titulo: 'Preparar reunión con cliente', estado: 'Completada', fechaLimite: '2025-04-08', prioridad: 'Alta' },
      { id: 4, titulo: 'Enviar facturas mensuales', estado: 'Pendiente', fechaLimite: '2025-04-20', prioridad: 'Baja' }
    ]);
    
    setContactosRecientes([
      { id: 1, nombre: 'María López', empresa: 'Tecnología Avanzada SL', telefono: '612345678', email: 'maria@tecavanzada.com' },
      { id: 2, nombre: 'Carlos Ruiz', empresa: 'Innovación Digital', telefono: '623456789', email: 'carlos@innovaciondigital.com' },
      { id: 3, nombre: 'Laura Martínez', empresa: 'Soluciones Web', telefono: '634567890', email: 'laura@solucionesweb.com' }
    ]);
  }, []);
  
  const obtenerClaseEstado = (estado) => {
    switch(estado) {
      case 'Completada':
        return 'estado-completada';
      case 'En progreso':
        return 'estado-progreso';
      case 'Pendiente':
        return 'estado-pendiente';
      default:
        return '';
    }
  };
  
  const obtenerClasePrioridad = (prioridad) => {
    switch(prioridad) {
      case 'Alta':
        return 'prioridad-alta';
      case 'Media':
        return 'prioridad-media';
      case 'Baja':
        return 'prioridad-baja';
      default:
        return '';
    }
  };
  
  return (
    <div className="dashboard-cliente">
      <Container fluid className="py-4">
        <div className="bienvenida mb-4">
          <h1>Bienvenido, {usuario?.nombre}</h1>
          <p>Este es tu panel de control donde puedes gestionar tus tareas, contactos y proyectos.</p>
        </div>
        
        <Row className="mb-4">
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica tareas-completadas">
                  <i className="bi bi-check-circle"></i>
                </div>
                <h3>{estadisticas.tareasCompletadas}</h3>
                <p>Tareas completadas</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica tareas-pendientes">
                  <i className="bi bi-list-task"></i>
                </div>
                <h3>{estadisticas.tareasPendientes}</h3>
                <p>Tareas pendientes</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica proyectos-activos">
                  <i className="bi bi-kanban"></i>
                </div>
                <h3>{estadisticas.proyectosActivos}</h3>
                <p>Proyectos activos</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica proximas-reuniones">
                  <i className="bi bi-calendar-event"></i>
                </div>
                <h3>{estadisticas.proximasReuniones}</h3>
                <p>Próximas reuniones</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col lg={7}>
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Tareas recientes</h5>
                <Link to="/area-privada/tareas" className="btn btn-sm btn-outline-primary">Ver todas</Link>
              </Card.Header>
              <Card.Body>
                <div className="tabla-responsive">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Tarea</th>
                        <th>Estado</th>
                        <th>Fecha límite</th>
                        <th>Prioridad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tareasRecientes.map(tarea => (
                        <tr key={tarea.id}>
                          <td>{tarea.titulo}</td>
                          <td><span className={`estado ${obtenerClaseEstado(tarea.estado)}`}>{tarea.estado}</span></td>
                          <td>{tarea.fechaLimite}</td>
                          <td><span className={`prioridad ${obtenerClasePrioridad(tarea.prioridad)}`}>{tarea.prioridad}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={5}>
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Contactos recientes</h5>
                <Link to="/area-privada/contactos" className="btn btn-sm btn-outline-primary">Ver todos</Link>
              </Card.Header>
              <Card.Body>
                <div className="lista-contactos">
                  {contactosRecientes.map(contacto => (
                    <div key={contacto.id} className="contacto-item">
                      <div className="avatar-contacto">
                        <span>{contacto.nombre.charAt(0)}</span>
                      </div>
                      <div className="info-contacto">
                        <h6>{contacto.nombre}</h6>
                        <p className="empresa">{contacto.empresa}</p>
                        <div className="contacto-detalles">
                          <span><i className="bi bi-telephone"></i> {contacto.telefono}</span>
                          <span><i className="bi bi-envelope"></i> {contacto.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Header>
                <h5 className="mb-0">Próximas reuniones</h5>
              </Card.Header>
              <Card.Body>
                <div className="proximas-reuniones">
                  <div className="reunion-item">
                    <div className="fecha-reunion">
                      <span className="dia">12</span>
                      <span className="mes">Abr</span>
                    </div>
                    <div className="detalles-reunion">
                      <h6>Revisión de proyecto</h6>
                      <p><i className="bi bi-clock"></i> 10:00 - 11:30</p>
                      <p><i className="bi bi-people"></i> María López, Carlos Ruiz</p>
                    </div>
                  </div>
                  
                  <div className="reunion-item">
                    <div className="fecha-reunion">
                      <span className="dia">15</span>
                      <span className="mes">Abr</span>
                    </div>
                    <div className="detalles-reunion">
                      <h6>Presentación de propuesta</h6>
                      <p><i className="bi bi-clock"></i> 15:00 - 16:00</p>
                      <p><i className="bi bi-people"></i> Laura Martínez</p>
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

export default Dashboard;
