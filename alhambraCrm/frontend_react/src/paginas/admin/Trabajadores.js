import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Modal, Alert } from 'react-bootstrap';
import { servicioUsuarios } from '../../servicios/api';
import './Trabajadores.css';

const Trabajadores = () => {
  // Estado para almacenar la lista de trabajadores
  const [trabajadores, setTrabajadores] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroDepartamento, setFiltroDepartamento] = useState('todos');
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  
  // Estados para modales
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [trabajadorActual, setTrabajadorActual] = useState(null);
  const [formDatos, setFormDatos] = useState({
    nombre: '',
    email: '',
    telefono: '',
    departamento: 'Desarrollo',
    estado: 'Activo'
  });
  
  // Cargar trabajadores desde la API
  const cargarTrabajadores = async () => {
    setCargando(true);
    try {
      // Obtener solo los usuarios de tipo 'trabajador'
      const datos = await servicioUsuarios.obtenerTodos({ tipo: 'trabajador' });
      setTrabajadores(datos);
    } catch (error) {
      console.error("Error al cargar trabajadores:", error);
      setMensaje({
        tipo: 'danger',
        texto: 'Error al cargar los trabajadores. Por favor, inténtalo de nuevo.'
      });
      
      // Si hay un error en la API, usamos datos de ejemplo para desarrollo
      const trabajadoresMock = [
        { id: 1, nombre: 'Ana Martínez', email: 'ana@alhambra.com', telefono: '612345678', departamento: 'Ventas', fecha: '15/01/2025', estado: 'Activo' },
        { id: 2, nombre: 'Luis García', email: 'luis@alhambra.com', telefono: '623456789', departamento: 'Soporte', fecha: '10/01/2025', estado: 'Activo' },
        { id: 3, nombre: 'Elena Ruiz', email: 'elena@alhambra.com', telefono: '634567890', departamento: 'Desarrollo', fecha: '05/01/2025', estado: 'Inactivo' },
        { id: 4, nombre: 'Carlos Sánchez', email: 'carlos@alhambra.com', telefono: '645678901', departamento: 'Marketing', fecha: '01/01/2025', estado: 'Activo' },
        { id: 5, nombre: 'María López', email: 'maria@alhambra.com', telefono: '656789012', departamento: 'Recursos Humanos', fecha: '20/12/2024', estado: 'Activo' },
        { id: 6, nombre: 'Javier Fernández', email: 'javier@alhambra.com', telefono: '667890123', departamento: 'Ventas', fecha: '15/12/2024', estado: 'Activo' },
        { id: 7, nombre: 'Laura Gómez', email: 'laura@alhambra.com', telefono: '678901234', departamento: 'Soporte', fecha: '10/12/2024', estado: 'Inactivo' },
        { id: 8, nombre: 'Pablo Martín', email: 'pablo@alhambra.com', telefono: '689012345', departamento: 'Desarrollo', fecha: '05/12/2024', estado: 'Activo' }
      ];
      
      setTrabajadores(trabajadoresMock);
    } finally {
      setCargando(false);
    }
  };
  
  useEffect(() => {
    cargarTrabajadores();
  }, []);
  
  // Obtener lista única de departamentos
  const departamentos = ['Ventas', 'Soporte', 'Desarrollo', 'Marketing', 'Recursos Humanos'];
  
  // Filtrar trabajadores según los criterios
  const trabajadoresFiltrados = trabajadores.filter(trabajador => {
    const coincideNombre = trabajador.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideDepartamento = filtroDepartamento === 'todos' || trabajador.departamento === filtroDepartamento;
    
    return coincideNombre && coincideDepartamento;
  });
  
  // Manejadores de eventos
  const handleFiltroNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };
  
  const handleFiltroDepartamentoChange = (e) => {
    setFiltroDepartamento(e.target.value);
  };
  
  const handleNuevoTrabajador = () => {
    setFormDatos({
      nombre: '',
      email: '',
      telefono: '',
      departamento: 'Desarrollo',
      estado: 'Activo'
    });
    setTrabajadorActual(null);
    setMostrarModalNuevo(true);
  };
  
  const handleEditarTrabajador = (id) => {
    const trabajador = trabajadores.find(t => t.id === id);
    if (trabajador) {
      setTrabajadorActual(trabajador);
      setFormDatos({
        nombre: trabajador.nombre,
        email: trabajador.email,
        telefono: trabajador.telefono,
        departamento: trabajador.departamento,
        estado: trabajador.estado
      });
      setMostrarModalEditar(true);
    }
  };
  
  const handleEliminarTrabajador = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este trabajador?')) {
      try {
        setCargando(true);
        // Llamar a la API para eliminar el trabajador
        await servicioUsuarios.eliminar(id);
        
        // Actualizar la lista de trabajadores
        setTrabajadores(trabajadores.filter(trabajador => trabajador.id !== id));
        
        // Mostrar mensaje de éxito
        setMensaje({
          tipo: 'success',
          texto: 'Trabajador eliminado correctamente'
        });
      } catch (error) {
        console.error(`Error al eliminar trabajador con ID ${id}:`, error);
        setMensaje({
          tipo: 'danger',
          texto: 'Error al eliminar el trabajador. Por favor, inténtalo de nuevo.'
        });
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
  
  const handleGuardarTrabajador = async () => {
    // Validar formulario
    if (!formDatos.nombre || !formDatos.email || !formDatos.telefono) {
      setMensaje({
        tipo: 'danger',
        texto: 'Por favor, completa todos los campos obligatorios'
      });
      return;
    }
    
    try {
      setCargando(true);
      
      if (trabajadorActual) {
        // Actualizar trabajador existente
        const datosActualizados = {
          ...formDatos,
          tipo_usuario: 'trabajador' // Aseguramos que se mantenga como trabajador
        };
        
        // Llamar a la API para actualizar el trabajador
        await servicioUsuarios.actualizar(trabajadorActual.id, datosActualizados);
        
        // Actualizar la lista de trabajadores
        const trabajadoresActualizados = trabajadores.map(t => 
          t.id === trabajadorActual.id ? { ...t, ...datosActualizados } : t
        );
        
        setTrabajadores(trabajadoresActualizados);
        setMostrarModalEditar(false);
        
        // Mostrar mensaje de éxito
        setMensaje({
          tipo: 'success',
          texto: 'Trabajador actualizado correctamente'
        });
      } else {
        // Crear nuevo trabajador
        const nuevoTrabajador = {
          ...formDatos,
          tipo_usuario: 'trabajador',
          fecha: new Date().toLocaleDateString('es-ES')
        };
        
        // Llamar a la API para crear el trabajador
        const trabajadorCreado = await servicioUsuarios.crear(nuevoTrabajador);
        
        // Actualizar la lista de trabajadores
        setTrabajadores([...trabajadores, trabajadorCreado]);
        setMostrarModalNuevo(false);
        
        // Mostrar mensaje de éxito
        setMensaje({
          tipo: 'success',
          texto: 'Trabajador creado correctamente'
        });
      }
    } catch (error) {
      console.error('Error al guardar el trabajador:', error);
      setMensaje({
        tipo: 'danger',
        texto: 'Error al guardar el trabajador. Por favor, inténtalo de nuevo.'
      });
    } finally {
      setCargando(false);
    }
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje({ tipo: '', texto: '' });
    }, 3000);
  };
  
  return (
    <div className="pagina-trabajadores-admin">
      <div className="cabecera-seccion">
        <Container>
          <h1>Gestión de Trabajadores</h1>
          <p>Administra todos los trabajadores de AlhambraCRM</p>
        </Container>
      </div>
      
      <Container className="contenido-seccion">
        {mensaje.tipo && (
          <Alert variant={mensaje.tipo} onClose={() => setMensaje({ tipo: '', texto: '' })} dismissible>
            {mensaje.texto}
          </Alert>
        )}
        
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
                  value={filtroDepartamento} 
                  onChange={handleFiltroDepartamentoChange}
                >
                  <option value="todos">Todos los departamentos</option>
                  {departamentos.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </Form.Select>
              </Col>
              
              <Col lg={5} className="text-lg-end">
                <Button 
                  variant="primary" 
                  className="btn-principal"
                  onClick={handleNuevoTrabajador}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Nuevo Trabajador
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        <Card className="tarjeta-tabla">
          <Card.Body>
            {cargando ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando trabajadores...</p>
              </div>
            ) : trabajadoresFiltrados.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-search fs-1 text-muted"></i>
                <p className="mt-3">No se encontraron trabajadores con los filtros aplicados.</p>
              </div>
            ) : (
              <div className="tabla-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Departamento</th>
                      <th>Fecha Incorporación</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trabajadoresFiltrados.map(trabajador => (
                      <tr key={trabajador.id}>
                        <td>#{trabajador.id}</td>
                        <td>{trabajador.nombre}</td>
                        <td>{trabajador.email}</td>
                        <td>{trabajador.telefono}</td>
                        <td>{trabajador.departamento}</td>
                        <td>{trabajador.fecha}</td>
                        <td>
                          <span className={`badge bg-${trabajador.estado === 'Activo' ? 'success' : 'danger'}`}>
                            {trabajador.estado}
                          </span>
                        </td>
                        <td>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 me-2"
                            onClick={() => handleEditarTrabajador(trabajador.id)}
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 text-danger"
                            onClick={() => handleEliminarTrabajador(trabajador.id)}
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
      </Container>
      
      {/* Modal para editar trabajador */}
      <Modal show={mostrarModalEditar} onHide={() => setMostrarModalEditar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Trabajador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                name="nombre"
                value={formDatos.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={formDatos.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control 
                type="tel" 
                name="telefono"
                value={formDatos.telefono}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Select 
                name="departamento"
                value={formDatos.departamento}
                onChange={handleInputChange}
              >
                {departamentos.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select 
                name="estado"
                value={formDatos.estado}
                onChange={handleInputChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalEditar(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarTrabajador}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal para nuevo trabajador */}
      <Modal show={mostrarModalNuevo} onHide={() => setMostrarModalNuevo(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Trabajador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                name="nombre"
                value={formDatos.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={formDatos.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control 
                type="tel" 
                name="telefono"
                value={formDatos.telefono}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Select 
                name="departamento"
                value={formDatos.departamento}
                onChange={handleInputChange}
              >
                {departamentos.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select 
                name="estado"
                value={formDatos.estado}
                onChange={handleInputChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalNuevo(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarTrabajador}>
            Crear Trabajador
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Trabajadores;
