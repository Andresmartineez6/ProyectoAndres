import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Modal, Badge, ProgressBar } from 'react-bootstrap';
import { servicioProyectos } from '../../servicios/api';
import './Proyectos.css';

const Proyectos = () => {
  // Estado para almacenar la lista de proyectos
  const [proyectos, setProyectos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [cargando, setCargando] = useState(true);
  const [vistaActiva, setVistaActiva] = useState('tabla');
  
  // Estados para modales
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [proyectoActual, setProyectoActual] = useState(null);
  const [formDatos, setFormDatos] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'Pendiente',
    presupuesto: '',
    cliente: '',
    responsable: ''
  });
  
  // Cargar proyectos desde la API
  const cargarProyectos = async () => {
    setCargando(true);
    try {
      const datos = await servicioProyectos.obtenerTodos();
      setProyectos(datos);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
      // Si hay un error en la API, usamos datos de ejemplo para desarrollo
      const proyectosMock = [
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
          progreso: 45
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
          progreso: 100
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
          progreso: 10
        },
        {
          id: 4,
          nombre: 'Desarrollo de aplicación móvil',
          descripcion: 'Desarrollo de una aplicación móvil para Android e iOS',
          fechaInicio: '2025-05-01',
          fechaFin: '2025-08-31',
          estado: 'Pendiente',
          presupuesto: 20000,
          cliente: 'Consultora Global',
          responsable: 'Javier Fernández',
          progreso: 0
        }
      ];
      
      setProyectos(proyectosMock);
    } finally {
      setCargando(false);
    }
  };
  
  useEffect(() => {
    cargarProyectos();
  }, []);
  
  // Filtrar proyectos según los criterios
  const proyectosFiltrados = proyectos.filter(proyecto => {
    const coincideNombre = proyecto.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideEstado = filtroEstado === 'todos' || proyecto.estado === filtroEstado;
    
    return coincideNombre && coincideEstado;
  });
  
  // Manejadores de eventos
  const handleFiltroNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };
  
  const handleFiltroEstadoChange = (e) => {
    setFiltroEstado(e.target.value);
  };
  
  const handleNuevoProyecto = () => {
    setFormDatos({
      nombre: '',
      descripcion: '',
      fechaInicio: new Date().toISOString().split('T')[0],
      fechaFin: '',
      estado: 'Pendiente',
      presupuesto: '',
      cliente: '',
      responsable: ''
    });
    setProyectoActual(null);
    setMostrarModalNuevo(true);
  };
  
  const handleEditarProyecto = (id) => {
    const proyecto = proyectos.find(p => p.id === id);
    if (proyecto) {
      setProyectoActual(proyecto);
      setFormDatos({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fechaInicio: proyecto.fechaInicio,
        fechaFin: proyecto.fechaFin,
        estado: proyecto.estado,
        presupuesto: proyecto.presupuesto,
        cliente: proyecto.cliente,
        responsable: proyecto.responsable
      });
      setMostrarModalEditar(true);
    }
  };
  
  const handleEliminarProyecto = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
      try {
        setCargando(true);
        // Llamar a la API para eliminar el proyecto
        await servicioProyectos.eliminar(id);
        
        // Actualizar la lista de proyectos
        setProyectos(proyectos.filter(proyecto => proyecto.id !== id));
        
        // Mostrar mensaje de éxito
        alert('Proyecto eliminado correctamente');
      } catch (error) {
        console.error(`Error al eliminar proyecto con ID ${id}:`, error);
        alert('Error al eliminar el proyecto. Por favor, inténtalo de nuevo.');
      } finally {
        setCargando(false);
      }
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDatos({
      ...formDatos,
      [name]: value
    });
  };
  
  const handleGuardarProyecto = async () => {
    // Validar formulario
    if (!formDatos.nombre || !formDatos.fechaInicio) {
      alert('Por favor, completa los campos obligatorios');
      return;
    }
    
    try {
      setCargando(true);
      
      if (proyectoActual) {
        // Actualizar proyecto existente
        const datosActualizados = {
          ...formDatos,
          progreso: formDatos.estado === 'Completado' ? 100 : 
                   formDatos.estado === 'En progreso' ? 45 : 10
        };
        
        // Llamar a la API para actualizar el proyecto
        await servicioProyectos.actualizar(proyectoActual.id, datosActualizados);
        
        // Actualizar la lista de proyectos
        const proyectosActualizados = proyectos.map(p => 
          p.id === proyectoActual.id ? { 
            ...p, 
            ...datosActualizados
          } : p
        );
        
        setProyectos(proyectosActualizados);
        setMostrarModalEditar(false);
        
        // Mostrar mensaje de éxito
        alert('Proyecto actualizado correctamente');
      } else {
        // Crear nuevo proyecto
        const nuevoProyecto = {
          ...formDatos,
          progreso: formDatos.estado === 'Completado' ? 100 : 
                   formDatos.estado === 'En progreso' ? 45 : 10
        };
        
        // Llamar a la API para crear el proyecto
        const proyectoCreado = await servicioProyectos.crear(nuevoProyecto);
        
        // Actualizar la lista de proyectos
        setProyectos([...proyectos, proyectoCreado]);
        setMostrarModalNuevo(false);
        
        // Mostrar mensaje de éxito
        alert('Proyecto creado correctamente');
      }
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      alert('Error al guardar el proyecto. Por favor, inténtalo de nuevo.');
    } finally {
      setCargando(false);
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
  
  const obtenerVarianteProgreso = (estado) => {
    switch(estado) {
      case 'Completado':
        return 'success';
      case 'En progreso':
        return 'primary';
      case 'Pendiente':
        return 'warning';
      default:
        return 'info';
    }
  };
  
  return (
    <div className="pagina-proyectos-admin">
      <div className="cabecera-seccion">
        <Container>
          <h1>Gestión de Proyectos</h1>
          <p>Administra todos los proyectos de AlhambraCRM</p>
        </Container>
      </div>
      
      <Container className="contenido-seccion">
        <Card className="tarjeta-filtros mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col lg={4} md={6} className="mb-3 mb-lg-0">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Buscar por nombre..."
                    value={filtroNombre}
                    onChange={handleFiltroNombreChange}
                  />
                </InputGroup>
              </Col>
              
              <Col lg={3} md={6} className="mb-3 mb-lg-0">
                <Form.Select 
                  value={filtroEstado} 
                  onChange={handleFiltroEstadoChange}
                >
                  <option value="todos">Todos los estados</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Completado">Completado</option>
                </Form.Select>
              </Col>
              
              <Col lg={5} className="text-lg-end">
                <div className="d-flex justify-content-lg-end gap-2">
                  <div className="btn-group me-2">
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
                  
                  <Button 
                    variant="primary" 
                    className="btn-principal"
                    onClick={handleNuevoProyecto}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Nuevo Proyecto
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        {vistaActiva === 'tabla' ? (
          <Card className="tarjeta-tabla">
            <Card.Body>
              {cargando ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                  <p className="mt-3">Cargando proyectos...</p>
                </div>
              ) : proyectosFiltrados.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-search fs-1 text-muted"></i>
                  <p className="mt-3">No se encontraron proyectos con los filtros aplicados.</p>
                </div>
              ) : (
                <div className="tabla-responsive">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cliente</th>
                        <th>Responsable</th>
                        <th>Fechas</th>
                        <th>Estado</th>
                        <th>Progreso</th>
                        <th>Presupuesto</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyectosFiltrados.map(proyecto => (
                        <tr key={proyecto.id}>
                          <td>#{proyecto.id}</td>
                          <td>{proyecto.nombre}</td>
                          <td>{proyecto.cliente}</td>
                          <td>{proyecto.responsable}</td>
                          <td>{proyecto.fechaInicio} a {proyecto.fechaFin}</td>
                          <td>
                            <Badge className={obtenerClaseEstado(proyecto.estado)}>
                              {proyecto.estado}
                            </Badge>
                          </td>
                          <td>
                            <ProgressBar 
                              now={proyecto.progreso} 
                              label={`${proyecto.progreso}%`}
                              variant={obtenerVarianteProgreso(proyecto.estado)}
                              style={{ height: '10px' }}
                            />
                          </td>
                          <td>{proyecto.presupuesto}€</td>
                          <td>
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="p-0 me-2 btn-accion"
                              onClick={() => handleEditarProyecto(proyecto.id)}
                              title="Editar"
                            >
                              <i className="bi bi-pencil"></i>
                            </Button>
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="p-0 text-danger btn-accion"
                              onClick={() => handleEliminarProyecto(proyecto.id)}
                              title="Eliminar"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {cargando ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando proyectos...</p>
              </div>
            ) : proyectosFiltrados.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-search fs-1 text-muted"></i>
                <p className="mt-3">No se encontraron proyectos con los filtros aplicados.</p>
              </div>
            ) : (
              proyectosFiltrados.map(proyecto => (
                <Col key={proyecto.id} lg={4} md={6} className="mb-4">
                  <Card className="tarjeta-proyecto">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="mb-0">{proyecto.nombre}</h5>
                        <Badge className={obtenerClaseEstado(proyecto.estado)}>
                          {proyecto.estado}
                        </Badge>
                      </div>
                      
                      <p className="texto-descripcion">{proyecto.descripcion}</p>
                      
                      <div className="info-proyecto mb-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="etiqueta">Cliente:</span>
                          <span className="valor">{proyecto.cliente}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="etiqueta">Responsable:</span>
                          <span className="valor">{proyecto.responsable}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="etiqueta">Fechas:</span>
                          <span className="valor">{proyecto.fechaInicio} a {proyecto.fechaFin}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="etiqueta">Presupuesto:</span>
                          <span className="valor">{proyecto.presupuesto}€</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span>Progreso</span>
                          <span>{proyecto.progreso}%</span>
                        </div>
                        <ProgressBar 
                          now={proyecto.progreso} 
                          variant={obtenerVarianteProgreso(proyecto.estado)}
                          style={{ height: '10px' }}
                        />
                      </div>
                      
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          className="w-100"
                          onClick={() => handleEditarProyecto(proyecto.id)}
                        >
                          <i className="bi bi-pencil me-2"></i>Editar
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          className="w-100"
                          onClick={() => handleEliminarProyecto(proyecto.id)}
                        >
                          <i className="bi bi-trash me-2"></i>Eliminar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}
      </Container>
      
      {/* Modal para editar proyecto */}
      <Modal show={mostrarModalEditar} onHide={() => setMostrarModalEditar(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del proyecto</Form.Label>
              <Form.Control 
                type="text" 
                name="nombre"
                value={formDatos.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                name="descripcion"
                value={formDatos.descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de inicio</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="fechaInicio"
                    value={formDatos.fechaInicio}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de fin</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="fechaFin"
                    value={formDatos.fechaFin}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="cliente"
                    value={formDatos.cliente}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Responsable</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="responsable"
                    value={formDatos.responsable}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select 
                    name="estado"
                    value={formDatos.estado}
                    onChange={handleInputChange}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completado">Completado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Presupuesto (€)</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="presupuesto"
                    value={formDatos.presupuesto}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalEditar(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarProyecto}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal para nuevo proyecto */}
      <Modal show={mostrarModalNuevo} onHide={() => setMostrarModalNuevo(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del proyecto</Form.Label>
              <Form.Control 
                type="text" 
                name="nombre"
                value={formDatos.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                name="descripcion"
                value={formDatos.descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de inicio</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="fechaInicio"
                    value={formDatos.fechaInicio}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de fin</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="fechaFin"
                    value={formDatos.fechaFin}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="cliente"
                    value={formDatos.cliente}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Responsable</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="responsable"
                    value={formDatos.responsable}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select 
                    name="estado"
                    value={formDatos.estado}
                    onChange={handleInputChange}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completado">Completado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Presupuesto (€)</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="presupuesto"
                    value={formDatos.presupuesto}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalNuevo(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarProyecto}>
            Crear Proyecto
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Proyectos;
