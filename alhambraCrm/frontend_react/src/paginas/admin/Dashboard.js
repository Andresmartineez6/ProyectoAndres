import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { servicioUsuarios, servicioTareas, servicioProyectos } from '../../servicios/api';
import './Dashboard.css';

const Dashboard = () => {
  // Estado para almacenar datos del dashboard
  const [estadisticas, setEstadisticas] = useState({
    clientes: 0,
    trabajadores: 0,
    proyectos: 0,
    tareas: 0,
    ingresos: 0
  });
  
  const [clientesRecientes, setClientesRecientes] = useState([]);
  const [trabajadoresRecientes, setTrabajadoresRecientes] = useState([]);
  const [proyectosRecientes, setProyectosRecientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  
  // Cargar datos del dashboard desde la API
  const cargarDatosDashboard = async () => {
    setCargando(true);
    try {
      // Cargar clientes
      const clientes = await servicioUsuarios.obtenerTodos({ tipo: 'cliente' });
      setClientesRecientes(clientes.slice(0, 4));
      
      // Cargar trabajadores
      const trabajadores = await servicioUsuarios.obtenerTodos({ tipo: 'trabajador' });
      setTrabajadoresRecientes(trabajadores.slice(0, 3));
      
      // Cargar proyectos
      const proyectos = await servicioProyectos.obtenerTodos();
      setProyectosRecientes(proyectos.slice(0, 3));
      
      // Cargar tareas
      const tareas = await servicioTareas.obtenerTodas();
      
      // Calcular ingresos totales de proyectos
      const ingresosTotales = proyectos.reduce((total, proyecto) => total + (proyecto.presupuesto || 0), 0);
      
      // Actualizar estadísticas
      setEstadisticas({
        clientes: clientes.length,
        trabajadores: trabajadores.length,
        proyectos: proyectos.length,
        tareas: tareas.length,
        ingresos: ingresosTotales
      });
    } catch (error) {
      console.error("Error al cargar datos del dashboard:", error);
      setMensaje({
        tipo: 'danger',
        texto: 'Error al cargar los datos del dashboard. Por favor, inténtalo de nuevo.'
      });
      
      // Datos de ejemplo para desarrollo en caso de error
      setEstadisticas({
        clientes: 24,
        trabajadores: 8,
        proyectos: 15,
        tareas: 47,
        ingresos: 125000
      });
      
      setClientesRecientes([
        { id: 1, nombre: 'María', apellidos: 'González', email: 'maria@ejemplo.com', telefono: '612345678', empresa: 'Tecnologías Avanzadas S.L.' },
        { id: 2, nombre: 'Juan', apellidos: 'Pérez', email: 'juan@ejemplo.com', telefono: '623456789', empresa: 'Desarrollos Web Modernos' },
        { id: 3, nombre: 'Ana', apellidos: 'Martínez', email: 'ana@ejemplo.com', telefono: '634567890', empresa: 'Consultora Digital' },
        { id: 4, nombre: 'Carlos', apellidos: 'Rodríguez', email: 'carlos@ejemplo.com', telefono: '645678901', empresa: 'Innovación Tecnológica' }
      ]);
      
      setTrabajadoresRecientes([
        { id: 1, nombre: 'Laura', apellidos: 'Sánchez', email: 'laura@alhambracrm.com', telefono: '656789012', puesto: 'Desarrolladora Frontend' },
        { id: 2, nombre: 'Miguel', apellidos: 'López', email: 'miguel@alhambracrm.com', telefono: '667890123', puesto: 'Desarrollador Backend' },
        { id: 3, nombre: 'Elena', apellidos: 'Ruiz', email: 'elena@alhambracrm.com', telefono: '678901234', puesto: 'Diseñadora UX/UI' }
      ]);
      
      setProyectosRecientes([
        { id: 1, nombre: 'Desarrollo de aplicación web', cliente: 'Tecnologías Avanzadas S.L.', estado: 'En progreso', fechaInicio: '2025-01-15', fechaFin: '2025-05-30', presupuesto: 45000 },
        { id: 2, nombre: 'Rediseño de marca', cliente: 'Consultora Digital', estado: 'Completado', fechaInicio: '2025-02-01', fechaFin: '2025-03-15', presupuesto: 15000 },
        { id: 3, nombre: 'Campaña de marketing digital', cliente: 'Innovación Tecnológica', estado: 'Pendiente', fechaInicio: '2025-04-15', fechaFin: '2025-07-30', presupuesto: 30000 }
      ]);
    } finally {
      setCargando(false);
    }
  };
  
  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatosDashboard();
  }, []);
  
  // Formatear número como moneda
  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor);
  };
  
  // Obtener clase según estado del proyecto
  const obtenerClaseEstado = (estado) => {
    switch(estado) {
      case 'Completado':
        return 'text-success';
      case 'En progreso':
        return 'text-primary';
      case 'Pendiente':
        return 'text-warning';
      case 'Cancelado':
        return 'text-danger';
      default:
        return '';
    }
  };
  
  return (
    <div className="pagina-dashboard fade-in">
      <div className="cabecera-pagina">
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <h1>Dashboard</h1>
              <p>Bienvenido al panel de control de AlhambraCRM</p>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={cargarDatosDashboard} disabled={cargando}>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Actualizar datos
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      
      {mensaje.texto && (
        <Container fluid className="mt-3">
          <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje({ tipo: '', texto: '' })}>
            {mensaje.texto}
          </Alert>
        </Container>
      )}
      
      <Container fluid className="mt-4">
        {/* Tarjetas de estadísticas */}
        <Row className="mb-4">
          <Col md={6} lg>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica">
                  <i className="bi bi-people-fill"></i>
                </div>
                <div className="datos-estadistica">
                  <h2 className="valor-estadistica">{estadisticas.clientes}</h2>
                  <p className="titulo-estadistica">Clientes</p>
                </div>
                <div className="enlace-estadistica">
                  <Link to="/admin/clientes">Ver todos <i className="bi bi-arrow-right"></i></Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica">
                  <i className="bi bi-person-badge-fill"></i>
                </div>
                <div className="datos-estadistica">
                  <h2 className="valor-estadistica">{estadisticas.trabajadores}</h2>
                  <p className="titulo-estadistica">Trabajadores</p>
                </div>
                <div className="enlace-estadistica">
                  <Link to="/admin/trabajadores">Ver todos <i className="bi bi-arrow-right"></i></Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica">
                  <i className="bi bi-kanban-fill"></i>
                </div>
                <div className="datos-estadistica">
                  <h2 className="valor-estadistica">{estadisticas.proyectos}</h2>
                  <p className="titulo-estadistica">Proyectos</p>
                </div>
                <div className="enlace-estadistica">
                  <Link to="/admin/proyectos">Ver todos <i className="bi bi-arrow-right"></i></Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica">
                  <i className="bi bi-list-check"></i>
                </div>
                <div className="datos-estadistica">
                  <h2 className="valor-estadistica">{estadisticas.tareas}</h2>
                  <p className="titulo-estadistica">Tareas</p>
                </div>
                <div className="enlace-estadistica">
                  <Link to="/admin/tareas">Ver todas <i className="bi bi-arrow-right"></i></Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica">
                  <i className="bi bi-cash-stack"></i>
                </div>
                <div className="datos-estadistica">
                  <h2 className="valor-estadistica">{formatearMoneda(estadisticas.ingresos)}</h2>
                  <p className="titulo-estadistica">Ingresos</p>
                </div>
                <div className="enlace-estadistica">
                  <Link to="/admin/informes">Ver informes <i className="bi bi-arrow-right"></i></Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Secciones de datos recientes */}
        <Row>
          <Col lg={6} className="mb-4">
            <Card className="h-100 dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-people me-2"></i>
                    Clientes recientes
                  </h5>
                  <Link to="/admin/clientes" className="btn btn-sm btn-outline-primary">
                    Ver todos
                  </Link>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="tabla-responsive">
                  <Table hover className="mb-0">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Contacto</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientesRecientes.map(cliente => (
                        <tr key={cliente.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="avatar-mini me-2">
                                <span>{cliente.nombre.charAt(0)}{cliente.apellidos.charAt(0)}</span>
                              </div>
                              <div>
                                {cliente.nombre} {cliente.apellidos}
                              </div>
                            </div>
                          </td>
                          <td>{cliente.empresa}</td>
                          <td>
                            <div className="contacto-cliente">
                              <div><i className="bi bi-envelope-fill me-1"></i> {cliente.email}</div>
                              <div><i className="bi bi-telephone-fill me-1"></i> {cliente.telefono}</div>
                            </div>
                          </td>
                          <td>
                            <Link to={`/admin/clientes/${cliente.id}`} className="btn btn-sm btn-link">
                              <i className="bi bi-eye"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-4">
            <Card className="h-100 dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-kanban me-2"></i>
                    Proyectos recientes
                  </h5>
                  <Link to="/admin/proyectos" className="btn btn-sm btn-outline-primary">
                    Ver todos
                  </Link>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="tabla-responsive">
                  <Table hover className="mb-0">
                    <thead>
                      <tr>
                        <th>Proyecto</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Presupuesto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyectosRecientes.map(proyecto => (
                        <tr key={proyecto.id}>
                          <td>
                            <Link to={`/admin/proyectos/${proyecto.id}`} className="fw-medium text-decoration-none">
                              {proyecto.nombre}
                            </Link>
                            <div className="text-muted small">
                              {proyecto.fechaInicio} - {proyecto.fechaFin}
                            </div>
                          </td>
                          <td>{proyecto.cliente}</td>
                          <td>
                            <span className={`badge ${obtenerClaseEstado(proyecto.estado)}`}>
                              {proyecto.estado}
                            </span>
                          </td>
                          <td>{formatearMoneda(proyecto.presupuesto)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col lg={6} className="mb-4">
            <Card className="h-100 dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-person-badge me-2"></i>
                    Equipo
                  </h5>
                  <Link to="/admin/trabajadores" className="btn btn-sm btn-outline-primary">
                    Ver todos
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="lista-trabajadores">
                  {trabajadoresRecientes.map(trabajador => (
                    <div key={trabajador.id} className="tarjeta-trabajador">
                      <div className="avatar-trabajador">
                        <span>{trabajador.nombre.charAt(0)}{trabajador.apellidos.charAt(0)}</span>
                      </div>
                      <div className="info-trabajador">
                        <h6>{trabajador.nombre} {trabajador.apellidos}</h6>
                        <p className="puesto">{trabajador.puesto}</p>
                        <div className="contacto">
                          <span><i className="bi bi-envelope"></i> {trabajador.email}</span>
                          <span><i className="bi bi-telephone"></i> {trabajador.telefono}</span>
                        </div>
                      </div>
                      <div className="acciones-trabajador">
                        <Link to={`/admin/trabajadores/${trabajador.id}`} className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-eye"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6} className="mb-4">
            <Card className="h-100 dashboard-card">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-graph-up me-2"></i>
                    Resumen de actividad
                  </h5>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="actividad-resumen">
                  <div className="actividad-item">
                    <div className="actividad-icono">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <div className="actividad-contenido">
                      <h6>Tareas completadas este mes</h6>
                      <div className="actividad-valor">15</div>
                    </div>
                  </div>
                  
                  <div className="actividad-item">
                    <div className="actividad-icono">
                      <i className="bi bi-calendar-check-fill"></i>
                    </div>
                    <div className="actividad-contenido">
                      <h6>Reuniones programadas</h6>
                      <div className="actividad-valor">8</div>
                    </div>
                  </div>
                  
                  <div className="actividad-item">
                    <div className="actividad-icono">
                      <i className="bi bi-hourglass-split"></i>
                    </div>
                    <div className="actividad-contenido">
                      <h6>Proyectos en progreso</h6>
                      <div className="actividad-valor">6</div>
                    </div>
                  </div>
                  
                  <div className="actividad-item">
                    <div className="actividad-icono">
                      <i className="bi bi-trophy-fill"></i>
                    </div>
                    <div className="actividad-contenido">
                      <h6>Proyectos completados</h6>
                      <div className="actividad-valor">9</div>
                    </div>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer>
                <Link to="/admin/informes" className="btn btn-sm btn-primary w-100">
                  <i className="bi bi-bar-chart-fill me-2"></i>
                  Ver informes detallados
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
