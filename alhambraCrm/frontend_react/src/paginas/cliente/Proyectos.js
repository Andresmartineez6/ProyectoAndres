import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Modal, Form, Tabs, Tab } from 'react-bootstrap';
import './Proyectos.css';

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proyectoActual, setProyectoActual] = useState(null);
  const [vistaActiva, setVistaActiva] = useState('tabla');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  
  // Estado para el formulario de proyecto
  const [formProyecto, setFormProyecto] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'Pendiente',
    presupuesto: '',
    cliente: '',
    responsable: ''
  });
  
  useEffect(() => {
    // Simulación de carga de datos
    // En un caso real, estos datos vendrían del backend
    const proyectosIniciales = [
      {
        id: 1,
        nombre: 'Desarrollo de aplicación web',
        descripcion: 'Desarrollo de una aplicación web para gestión de inventario',
        fechaInicio: '2025-03-01',
        fechaFin: '2025-06-30',
        estado: 'En progreso',
        presupuesto: 15000,
        cliente: 'Tecnología Avanzada SL',
        responsable: 'María López',
        tareas: [
          { id: 1, nombre: 'Diseño de interfaz', estado: 'Completada', responsable: 'Carlos Ruiz' },
          { id: 2, nombre: 'Desarrollo frontend', estado: 'En progreso', responsable: 'Laura Martínez' },
          { id: 3, nombre: 'Desarrollo backend', estado: 'Pendiente', responsable: 'Juan Pérez' }
        ]
      },
      {
        id: 2,
        nombre: 'Rediseño de marca',
        descripcion: 'Rediseño completo de la identidad corporativa',
        fechaInicio: '2025-02-15',
        fechaFin: '2025-04-15',
        estado: 'Completado',
        presupuesto: 5000,
        cliente: 'Innovación Digital',
        responsable: 'Carlos Ruiz',
        tareas: [
          { id: 1, nombre: 'Análisis de marca actual', estado: 'Completada', responsable: 'Carlos Ruiz' },
          { id: 2, nombre: 'Propuestas de diseño', estado: 'Completada', responsable: 'Ana García' },
          { id: 3, nombre: 'Implementación de nueva marca', estado: 'Completada', responsable: 'Carlos Ruiz' }
        ]
      },
      {
        id: 3,
        nombre: 'Campaña de marketing digital',
        descripcion: 'Campaña en redes sociales y Google Ads',
        fechaInicio: '2025-04-01',
        fechaFin: '2025-07-31',
        estado: 'Pendiente',
        presupuesto: 8000,
        cliente: 'Soluciones Web',
        responsable: 'Laura Martínez',
        tareas: [
          { id: 1, nombre: 'Estrategia de contenidos', estado: 'Pendiente', responsable: 'Laura Martínez' },
          { id: 2, nombre: 'Diseño de creatividades', estado: 'Pendiente', responsable: 'Ana García' },
          { id: 3, nombre: 'Configuración de campañas', estado: 'Pendiente', responsable: 'Juan Pérez' }
        ]
      }
    ];
    
    setProyectos(proyectosIniciales);
  }, []);
  
  const abrirModal = (proyecto = null) => {
    if (proyecto) {
      // Editar proyecto existente
      setProyectoActual(proyecto);
      setFormProyecto({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fechaInicio: proyecto.fechaInicio,
        fechaFin: proyecto.fechaFin,
        estado: proyecto.estado,
        presupuesto: proyecto.presupuesto,
        cliente: proyecto.cliente,
        responsable: proyecto.responsable
      });
    } else {
      // Nuevo proyecto
      setProyectoActual(null);
      setFormProyecto({
        nombre: '',
        descripcion: '',
        fechaInicio: new Date().toISOString().split('T')[0],
        fechaFin: '',
        estado: 'Pendiente',
        presupuesto: '',
        cliente: '',
        responsable: ''
      });
    }
    
    setMostrarModal(true);
  };
  
  const cerrarModal = () => {
    setMostrarModal(false);
    setProyectoActual(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormProyecto({
      ...formProyecto,
      [name]: value
    });
  };
  
  const guardarProyecto = () => {
    if (!formProyecto.nombre) {
      alert('El nombre del proyecto es obligatorio');
      return;
    }
    
    if (proyectoActual) {
      // Actualizar proyecto existente
      const proyectosActualizados = proyectos.map(p => 
        p.id === proyectoActual.id ? { ...proyectoActual, ...formProyecto } : p
      );
      setProyectos(proyectosActualizados);
    } else {
      // Crear nuevo proyecto
      const nuevoProyecto = {
        ...formProyecto,
        id: Date.now(), // Generamos un ID único
        tareas: [] // Inicialmente sin tareas
      };
      setProyectos([...proyectos, nuevoProyecto]);
    }
    
    cerrarModal();
    
    // Aquí se enviarían los datos al backend
    console.log('Datos del proyecto a guardar:', formProyecto);
  };
  
  const eliminarProyecto = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      const proyectosActualizados = proyectos.filter(p => p.id !== id);
      setProyectos(proyectosActualizados);
      cerrarModal();
      
      // Aquí se enviaría la solicitud de eliminación al backend
      console.log('Proyecto a eliminar, ID:', id);
    }
  };
  
  const obtenerClaseEstado = (estado) => {
    switch(estado) {
      case 'Completado':
        return 'estado-completado';
      case 'En progreso':
        return 'estado-progreso';
      case 'Pendiente':
        return 'estado-pendiente';
      default:
        return '';
    }
  };
  
  const proyectosFiltrados = filtroEstado === 'todos' 
    ? proyectos 
    : proyectos.filter(p => p.estado === filtroEstado);
  
  return (
    <div className="proyectos-cliente">
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <div className="cabecera-proyectos">
              <h1>Proyectos</h1>
              <div className="controles-proyectos">
                <div className="filtros-proyectos">
                  <Form.Select 
                    value={filtroEstado} 
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="filtro-estado"
                  >
                    <option value="todos">Todos los estados</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completado">Completado</option>
                  </Form.Select>
                  
                  <div className="cambio-vista">
                    <Button 
                      variant={vistaActiva === 'tabla' ? 'primary' : 'outline-primary'}
                      onClick={() => setVistaActiva('tabla')}
                    >
                      <i className="bi bi-table"></i>
                    </Button>
                    <Button 
                      variant={vistaActiva === 'tarjetas' ? 'primary' : 'outline-primary'}
                      onClick={() => setVistaActiva('tarjetas')}
                    >
                      <i className="bi bi-grid-3x3-gap"></i>
                    </Button>
                  </div>
                </div>
                
                <Button variant="primary" onClick={() => abrirModal()}>
                  <i className="bi bi-plus"></i> Nuevo proyecto
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col>
            {vistaActiva === 'tabla' ? (
              <Card>
                <Card.Body>
                  <div className="tabla-responsive">
                    <Table hover>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Cliente</th>
                          <th>Responsable</th>
                          <th>Fecha inicio</th>
                          <th>Fecha fin</th>
                          <th>Estado</th>
                          <th>Presupuesto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proyectosFiltrados.map(proyecto => (
                          <tr key={proyecto.id}>
                            <td>{proyecto.nombre}</td>
                            <td>{proyecto.cliente}</td>
                            <td>{proyecto.responsable}</td>
                            <td>{proyecto.fechaInicio}</td>
                            <td>{proyecto.fechaFin}</td>
                            <td>
                              <Badge className={obtenerClaseEstado(proyecto.estado)}>
                                {proyecto.estado}
                              </Badge>
                            </td>
                            <td>{proyecto.presupuesto}€</td>
                            <td>
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => abrirModal(proyecto)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                className="ms-1"
                                onClick={() => eliminarProyecto(proyecto.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <div className="vista-tarjetas">
                <Row>
                  {proyectosFiltrados.map(proyecto => (
                    <Col key={proyecto.id} lg={4} md={6} className="mb-4">
                      <Card className="tarjeta-proyecto">
                        <Card.Body>
                          <div className="cabecera-tarjeta">
                            <h5>{proyecto.nombre}</h5>
                            <Badge className={obtenerClaseEstado(proyecto.estado)}>
                              {proyecto.estado}
                            </Badge>
                          </div>
                          <p className="descripcion-proyecto">{proyecto.descripcion}</p>
                          <div className="detalles-proyecto">
                            <div className="detalle">
                              <span className="etiqueta">Cliente:</span>
                              <span className="valor">{proyecto.cliente}</span>
                            </div>
                            <div className="detalle">
                              <span className="etiqueta">Responsable:</span>
                              <span className="valor">{proyecto.responsable}</span>
                            </div>
                            <div className="detalle">
                              <span className="etiqueta">Fechas:</span>
                              <span className="valor">{proyecto.fechaInicio} al {proyecto.fechaFin}</span>
                            </div>
                            <div className="detalle">
                              <span className="etiqueta">Presupuesto:</span>
                              <span className="valor">{proyecto.presupuesto}€</span>
                            </div>
                          </div>
                          <div className="progreso-proyecto">
                            <div className="barra-progreso">
                              <div 
                                className="progreso" 
                                style={{ 
                                  width: proyecto.estado === 'Completado' ? '100%' : 
                                         proyecto.estado === 'En progreso' ? '50%' : '10%' 
                                }}
                              ></div>
                            </div>
                            <span className="porcentaje">
                              {proyecto.estado === 'Completado' ? '100%' : 
                               proyecto.estado === 'En progreso' ? '50%' : '10%'}
                            </span>
                          </div>
                          <div className="acciones-proyecto">
                            <Button 
                              variant="outline-primary" 
                              onClick={() => abrirModal(proyecto)}
                            >
                              <i className="bi bi-pencil"></i> Editar
                            </Button>
                            <Button 
                              variant="outline-danger"
                              onClick={() => eliminarProyecto(proyecto.id)}
                            >
                              <i className="bi bi-trash"></i> Eliminar
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      
      {/* Modal para crear/editar proyectos */}
      <Modal show={mostrarModal} onHide={cerrarModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{proyectoActual ? 'Editar proyecto' : 'Nuevo proyecto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del proyecto</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formProyecto.nombre}
                onChange={handleInputChange}
                placeholder="Nombre del proyecto"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formProyecto.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del proyecto"
              />
            </Form.Group>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha de inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaInicio"
                    value={formProyecto.fechaInicio}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha de fin</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaFin"
                    value={formProyecto.fechaFin}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="estado"
                    value={formProyecto.estado}
                    onChange={handleInputChange}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completado">Completado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Presupuesto (€)</Form.Label>
                  <Form.Control
                    type="number"
                    name="presupuesto"
                    value={formProyecto.presupuesto}
                    onChange={handleInputChange}
                    placeholder="Presupuesto en euros"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="cliente"
                    value={formProyecto.cliente}
                    onChange={handleInputChange}
                    placeholder="Nombre del cliente"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Responsable</Form.Label>
                  <Form.Control
                    type="text"
                    name="responsable"
                    value={formProyecto.responsable}
                    onChange={handleInputChange}
                    placeholder="Nombre del responsable"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {proyectoActual && (
            <Button variant="danger" onClick={() => eliminarProyecto(proyectoActual.id)}>
              Eliminar
            </Button>
          )}
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarProyecto}>
            {proyectoActual ? 'Actualizar' : 'Crear'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Proyectos;
