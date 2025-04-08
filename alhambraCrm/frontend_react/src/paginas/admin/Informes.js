import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Modal, Badge, Alert } from 'react-bootstrap';
import { servicioInformes, servicioProyectos } from '../../servicios/api';
import { exportarInformePDF, exportarInformeExcel, exportarListaInformesPDF, exportarListaInformesExcel } from '../../utilidades/exportarPDF';
import './Informes.css';

const Informes = () => {
  // Estado para almacenar la lista de informes
  const [informes, setInformes] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [cargando, setCargando] = useState(true);
  const [vistaActiva, setVistaActiva] = useState('tabla');
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  
  // Estados para modales
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [informeActual, setInformeActual] = useState(null);
  const [formDatos, setFormDatos] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'Ventas',
    fechaCreacion: '',
    fechaActualizacion: '',
    autor: '',
    proyecto: '',
    contenido: ''
  });
  
  // Cargar informes desde la API
  const cargarInformes = async () => {
    setCargando(true);
    try {
      const datos = await servicioInformes.obtenerTodos();
      setInformes(datos);
      
      // Cargar proyectos para el formulario
      const datosProyectos = await servicioProyectos.obtenerTodos();
      setProyectos(datosProyectos);
    } catch (error) {
      console.error("Error al cargar informes:", error);
      setMensaje({
        tipo: 'danger',
        texto: 'Error al cargar los informes. Por favor, inténtalo de nuevo.'
      });
      
      // Datos de ejemplo para desarrollo en caso de error
      const informesMock = [
        {
          id: 1,
          titulo: 'Informe de ventas Q1 2025',
          descripcion: 'Análisis detallado de las ventas del primer trimestre de 2025',
          tipo: 'Ventas',
          fechaCreacion: '2025-04-01',
          fechaActualizacion: '2025-04-05',
          autor: 'María López',
          proyecto: 'Desarrollo de aplicación web',
          contenido: 'Este informe muestra un análisis detallado de las ventas del primer trimestre del año 2025. Se observa un incremento del 15% respecto al mismo período del año anterior.'
        },
        {
          id: 2,
          titulo: 'Informe de gastos operativos',
          descripcion: 'Análisis de los gastos operativos del departamento de marketing',
          tipo: 'Gastos',
          fechaCreacion: '2025-03-15',
          fechaActualizacion: '2025-03-20',
          autor: 'Carlos Ruiz',
          proyecto: 'Campaña de marketing digital',
          contenido: 'Este informe detalla los gastos operativos del departamento de marketing durante el primer trimestre. Se ha conseguido una reducción del 8% en comparación con el presupuesto inicial.'
        },
        {
          id: 3,
          titulo: 'Rendimiento de campaña publicitaria',
          descripcion: 'Análisis del rendimiento de la campaña en redes sociales',
          tipo: 'Rendimiento',
          fechaCreacion: '2025-02-20',
          fechaActualizacion: '2025-02-25',
          autor: 'Laura Martínez',
          proyecto: 'Campaña de marketing digital',
          contenido: 'Este informe analiza el rendimiento de la campaña publicitaria en redes sociales. Se ha alcanzado un ROI del 120% y un incremento del 25% en el engagement.'
        },
        {
          id: 4,
          titulo: 'Informe de actividad de desarrollo',
          descripcion: 'Seguimiento del progreso del equipo de desarrollo',
          tipo: 'Actividad',
          fechaCreacion: '2025-03-25',
          fechaActualizacion: '2025-03-30',
          autor: 'Javier Fernández',
          proyecto: 'Desarrollo de aplicación móvil',
          contenido: 'Este informe muestra el progreso del equipo de desarrollo durante el último mes. Se han completado 45 tareas de las 50 planificadas, lo que representa un 90% de cumplimiento.'
        }
      ];
      
      setInformes(informesMock);
      
      const proyectosMock = [
        { id: 1, nombre: 'Desarrollo de aplicación web' },
        { id: 2, nombre: 'Rediseño de marca' },
        { id: 3, nombre: 'Campaña de marketing digital' }
      ];
      
      setProyectos(proyectosMock);
    } finally {
      setCargando(false);
    }
  };
  
  // Cargar informes al montar el componente
  useEffect(() => {
    cargarInformes();
  }, []);
  
  // Filtrar informes según los criterios de búsqueda
  const informesFiltrados = informes.filter(informe => {
    // Verificar que informe y sus propiedades existan
    if (!informe || !informe.titulo || !informe.tipo) return false;
    
    const coincideTitulo = informe.titulo.toLowerCase().includes(filtroTitulo.toLowerCase());
    const coincideTipo = filtroTipo === 'todos' || informe.tipo === filtroTipo;
    
    return coincideTitulo && coincideTipo;
  });
  
  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDatos({
      ...formDatos,
      [name]: value
    });
  };
  
  // Abrir modal para editar informe
  const handleEditarInforme = (informe) => {
    setInformeActual(informe);
    setFormDatos({
      titulo: informe.titulo,
      descripcion: informe.descripcion,
      tipo: informe.tipo,
      fechaCreacion: informe.fechaCreacion,
      fechaActualizacion: new Date().toISOString().split('T')[0],
      autor: informe.autor,
      proyecto: informe.proyecto,
      contenido: informe.contenido
    });
    setMostrarModalEditar(true);
  };
  
  // Abrir modal para crear nuevo informe
  const handleNuevoInforme = () => {
    const fechaHoy = new Date().toISOString().split('T')[0];
    setFormDatos({
      titulo: '',
      descripcion: '',
      tipo: 'Ventas',
      fechaCreacion: fechaHoy,
      fechaActualizacion: fechaHoy,
      autor: '',
      proyecto: '',
      contenido: ''
    });
    setMostrarModalNuevo(true);
  };
  
  // Guardar cambios en informe existente
  const handleGuardarCambios = async () => {
    try {
      setCargando(true);
      
      const informeActualizado = {
        ...informeActual,
        ...formDatos
      };
      
      await servicioInformes.actualizar(informeActual.id, informeActualizado);
      
      // Actualizar la lista de informes
      setInformes(informes.map(informe => 
        informe.id === informeActual.id ? informeActualizado : informe
      ));
      
      setMostrarModalEditar(false);
      setMensaje({ tipo: 'success', texto: 'Informe actualizado correctamente' });
    } catch (error) {
      console.error("Error al actualizar informe:", error);
      setMensaje({ tipo: 'danger', texto: 'Error al actualizar el informe. Por favor, inténtalo de nuevo.' });
    } finally {
      setCargando(false);
    }
  };
  
  // Crear nuevo informe
  const handleCrearInforme = async () => {
    try {
      setCargando(true);
      
      const nuevoInforme = await servicioInformes.crear(formDatos);
      
      // Añadir el nuevo informe a la lista
      setInformes([...informes, nuevoInforme]);
      
      setMostrarModalNuevo(false);
      setMensaje({ tipo: 'success', texto: 'Informe creado correctamente' });
    } catch (error) {
      console.error("Error al crear informe:", error);
      setMensaje({ tipo: 'danger', texto: 'Error al crear el informe. Por favor, inténtalo de nuevo.' });
    } finally {
      setCargando(false);
    }
  };
  
  // Eliminar informe
  const handleEliminarInforme = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este informe?')) {
      try {
        setCargando(true);
        
        await servicioInformes.eliminar(id);
        
        // Eliminar el informe de la lista
        setInformes(informes.filter(informe => informe.id !== id));
        
        setMensaje({ tipo: 'success', texto: 'Informe eliminado correctamente' });
      } catch (error) {
        console.error(`Error al eliminar informe con ID ${id}:`, error);
        setMensaje({ tipo: 'danger', texto: 'Error al eliminar el informe. Por favor, inténtalo de nuevo.' });
      } finally {
        setCargando(false);
      }
    }
  };
  
  // Exportar informe
  const handleExportarInforme = async (id, formato) => {
    try {
      setCargando(true);
      
      // Buscar el informe en la lista
      const informe = informes.find(inf => inf.id === id);
      
      if (!informe) {
        throw new Error(`No se encontró el informe con ID ${id}`);
      }
      
      console.log(`Exportando informe en formato ${formato}:`, informe);
      
      // Exportar según el formato solicitado
      if (formato === 'pdf') {
        exportarInformePDF(informe);
        setMensaje({ tipo: 'success', texto: 'Informe exportado en formato PDF correctamente' });
      } else if (formato === 'excel') {
        exportarInformeExcel(informe);
        setMensaje({ tipo: 'success', texto: 'Informe exportado en formato Excel correctamente' });
      } else {
        throw new Error(`Formato de exportación no soportado: ${formato}`);
      }
    } catch (error) {
      console.error(`Error al exportar informe con ID ${id}:`, error);
      setMensaje({ 
        tipo: 'danger', 
        texto: `Error al exportar el informe: ${error.message}` 
      });
    } finally {
      setCargando(false);
    }
  };
  
  // Exportar lista de informes
  const handleExportarListaInformes = (formato = 'pdf') => {
    try {
      setCargando(true);
      
      // Verificar que tengamos informes para exportar
      if (!informesFiltrados || informesFiltrados.length === 0) {
        throw new Error('No hay informes para exportar');
      }
      
      // Crear una versión simplificada de los informes para exportar
      const informesSimplificados = informesFiltrados.map(informe => {
        return {
          id: informe.id || 0,
          titulo: typeof informe.titulo === 'string' ? informe.titulo : 'Sin título',
          tipo: typeof informe.tipo === 'string' ? informe.tipo : 'Sin tipo',
          autor: typeof informe.autor === 'string' ? informe.autor : 'Sin autor',
          fechaCreacion: typeof informe.fechaCreacion === 'string' ? informe.fechaCreacion : '',
          fechaActualizacion: typeof informe.fechaActualizacion === 'string' ? informe.fechaActualizacion : '',
          proyecto: typeof informe.proyecto === 'string' ? informe.proyecto : ''
        };
      });
      
      console.log(`Exportando lista de informes en formato ${formato}:`, informesSimplificados);
      
      // Exportar según el formato
      if (formato === 'pdf') {
        exportarListaInformesPDF(informesSimplificados);
        setMensaje({ tipo: 'success', texto: 'Lista de informes exportada en formato PDF correctamente' });
      } else if (formato === 'excel') {
        exportarListaInformesExcel(informesSimplificados);
        setMensaje({ tipo: 'success', texto: 'Lista de informes exportada en formato Excel correctamente' });
      } else {
        throw new Error(`Formato de exportación no soportado: ${formato}`);
      }
    } catch (error) {
      console.error('Error al exportar lista de informes:', error);
      setMensaje({ 
        tipo: 'danger', 
        texto: `Error al exportar la lista de informes: ${error.message}` 
      });
    } finally {
      setCargando(false);
    }
  };

  // Obtener clase para el tipo de informe
  const obtenerClaseTipo = (tipo) => {
    switch(tipo) {
      case 'Ventas':
        return 'bg-success';
      case 'Financiero':
        return 'bg-primary';
      case 'Proyecto':
        return 'bg-info';
      case 'Rendimiento':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="pagina-informes">
      <div className="cabecera-pagina">
        <Container>
          <h1>Informes</h1>
          <p>Gestiona los informes de AlhambraCRM</p>
        </Container>
      </div>
      
      <Container className="contenido-pagina">
        {mensaje.tipo && (
          <Alert variant={mensaje.tipo} onClose={() => setMensaje({ tipo: '', texto: '' })} dismissible>
            {mensaje.texto}
          </Alert>
        )}
        
        <Card className="mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6} lg={3} className="mb-3 mb-lg-0">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Buscar por título..."
                    value={filtroTitulo}
                    onChange={(e) => setFiltroTitulo(e.target.value)}
                  />
                </InputGroup>
              </Col>
              
              <Col md={6} lg={3} className="mb-3 mb-lg-0">
                <Form.Select 
                  value={filtroTipo} 
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <option value="todos">Todos los tipos</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Financiero">Financiero</option>
                  <option value="Proyecto">Proyecto</option>
                  <option value="Rendimiento">Rendimiento</option>
                </Form.Select>
              </Col>
              
              <Col md={6} lg={3} className="mb-3 mb-lg-0">
                <div className="d-flex">
                  <Button 
                    variant="link" 
                    className="btn-sm text-primary me-1" 
                    onClick={() => setVistaActiva('tabla')}
                  >
                    <i className="bi bi-table"></i> Tabla
                  </Button>
                  <Button 
                    variant="link" 
                    className="btn-sm text-success me-1"
                    onClick={() => setVistaActiva('tarjetas')}
                  >
                    <i className="bi bi-grid"></i> Tarjetas
                  </Button>
                </div>
              </Col>
              
              <Col md={6} lg={3} className="text-md-end">
                <Button variant="success" onClick={handleNuevoInforme}>
                  <i className="bi bi-plus-circle"></i> Nuevo Informe
                </Button>
                <div className="btn-group">
                  <Button variant="info" onClick={() => handleExportarListaInformes('pdf')}>
                    <i className="bi bi-file-pdf"></i> Exportar PDF
                  </Button>
                  <Button variant="outline-info" onClick={() => handleExportarListaInformes('excel')}>
                    <i className="bi bi-file-excel"></i> Exportar Excel
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        {cargando ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando informes...</p>
          </div>
        ) : informesFiltrados.length === 0 ? (
          <Card className="text-center py-5">
            <Card.Body>
              <i className="bi bi-file-earmark-x display-1 text-muted"></i>
              <h3 className="mt-4">No se encontraron informes</h3>
              <p className="text-muted">No hay informes que coincidan con los criterios de búsqueda.</p>
              <Button variant="primary" onClick={handleNuevoInforme}>
                Crear Nuevo Informe
              </Button>
            </Card.Body>
          </Card>
        ) : vistaActiva === 'tabla' ? (
          <Card>
            <Card.Body>
              <div className="tabla-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Tipo</th>
                      <th>Fecha</th>
                      <th>Autor</th>
                      <th>Proyecto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {informesFiltrados.map(informe => (
                      <tr key={informe.id}>
                        <td>{informe.titulo}</td>
                        <td>
                          <Badge className={obtenerClaseTipo(informe.tipo)}>
                            {informe.tipo}
                          </Badge>
                        </td>
                        <td>{informe.fechaActualizacion}</td>
                        <td>{informe.autor}</td>
                        <td>{informe.proyecto}</td>
                        <td>
                          <Button 
                            variant="link" 
                            className="btn-sm text-primary me-1" 
                            onClick={() => handleEditarInforme(informe)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button 
                            variant="link" 
                            className="btn-sm text-success me-1"
                            onClick={() => handleExportarInforme(informe.id, 'pdf')}
                          >
                            <i className="bi bi-file-pdf"></i>
                          </Button>
                          <Button 
                            variant="link" 
                            className="btn-sm text-info me-1"
                            onClick={() => handleExportarInforme(informe.id, 'excel')}
                          >
                            <i className="bi bi-file-excel"></i>
                          </Button>
                          <Button 
                            variant="link" 
                            className="btn-sm text-danger"
                            onClick={() => handleEliminarInforme(informe.id)}
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
          <Row>
            {informesFiltrados.map(informe => (
              <Col lg={4} md={6} className="mb-4" key={informe.id}>
                <Card className="h-100 tarjeta-informe">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <Badge className={obtenerClaseTipo(informe.tipo)}>
                      {informe.tipo}
                    </Badge>
                    <div>
                      <Button 
                        variant="link" 
                        className="btn-sm text-primary me-1"
                        onClick={() => handleEditarInforme(informe)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button 
                        variant="link" 
                        className="btn-sm text-danger"
                        onClick={() => handleEliminarInforme(informe.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{informe.titulo}</Card.Title>
                    <Card.Text className="texto-secundario mb-3">
                      {informe.descripcion}
                    </Card.Text>
                    <div className="detalles-informe">
                      <div className="detalle-item">
                        <i className="bi bi-person"></i> {informe.autor}
                      </div>
                      <div className="detalle-item">
                        <i className="bi bi-calendar"></i> {informe.fechaActualizacion}
                      </div>
                      <div className="detalle-item">
                        <i className="bi bi-folder"></i> {informe.proyecto}
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white">
                    <div className="d-flex justify-content-end">
                      <Button 
                        variant="outline-success" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleExportarInforme(informe.id, 'pdf')}
                      >
                        <i className="bi bi-file-pdf"></i> PDF
                      </Button>
                      <Button 
                        variant="outline-info" 
                        size="sm"
                        onClick={() => handleExportarInforme(informe.id, 'excel')}
                      >
                        <i className="bi bi-file-excel"></i> Excel
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      
      {/* Modal para editar informe */}
      <Modal show={mostrarModalEditar} onHide={() => setMostrarModalEditar(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Informe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    name="titulo"
                    value={formDatos.titulo}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select
                    name="tipo"
                    value={formDatos.tipo}
                    onChange={handleInputChange}
                  >
                    <option value="Ventas">Ventas</option>
                    <option value="Financiero">Financiero</option>
                    <option value="Proyecto">Proyecto</option>
                    <option value="Rendimiento">Rendimiento</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="descripcion"
                value={formDatos.descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha Creación</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaCreacion"
                    value={formDatos.fechaCreacion}
                    onChange={handleInputChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha Actualización</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaActualizacion"
                    value={formDatos.fechaActualizacion}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control
                    type="text"
                    name="autor"
                    value={formDatos.autor}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Proyecto</Form.Label>
                  <Form.Select
                    name="proyecto"
                    value={formDatos.proyecto}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar proyecto...</option>
                    {proyectos.map(proyecto => (
                      <option key={proyecto.id} value={proyecto.nombre}>
                        {proyecto.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Contenido</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="contenido"
                value={formDatos.contenido}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalEditar(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios} disabled={cargando}>
            {cargando ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal para nuevo informe */}
      <Modal show={mostrarModalNuevo} onHide={() => setMostrarModalNuevo(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Informe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    name="titulo"
                    value={formDatos.titulo}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select
                    name="tipo"
                    value={formDatos.tipo}
                    onChange={handleInputChange}
                  >
                    <option value="Ventas">Ventas</option>
                    <option value="Financiero">Financiero</option>
                    <option value="Proyecto">Proyecto</option>
                    <option value="Rendimiento">Rendimiento</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="descripcion"
                value={formDatos.descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control
                    type="text"
                    name="autor"
                    value={formDatos.autor}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Proyecto</Form.Label>
                  <Form.Select
                    name="proyecto"
                    value={formDatos.proyecto}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccionar proyecto...</option>
                    {proyectos.map(proyecto => (
                      <option key={proyecto.id} value={proyecto.nombre}>
                        {proyecto.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Contenido</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="contenido"
                value={formDatos.contenido}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalNuevo(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleCrearInforme} disabled={cargando}>
            {cargando ? 'Creando...' : 'Crear Informe'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Informes;
