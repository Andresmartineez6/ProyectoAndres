import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Modal, Alert } from 'react-bootstrap';
import { servicioUsuarios } from '../../servicios/api';
import './Clientes.css';

const Clientes = () => {
  // Estado para almacenar la lista de clientes
  const [clientes, setClientes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  
  // Estados para modales
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [clienteActual, setClienteActual] = useState(null);
  const [formDatos, setFormDatos] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo: 'Estándar',
    estado: 'Activo'
  });
  
  // Cargar clientes desde la API
  const cargarClientes = async () => {
    setCargando(true);
    try {
      // Obtener solo los usuarios de tipo 'cliente'
      const datos = await servicioUsuarios.obtenerTodos({ tipo: 'cliente' });
      setClientes(datos);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      setMensaje({
        tipo: 'danger',
        texto: 'Error al cargar los clientes. Por favor, inténtalo de nuevo.'
      });
      
      // Si hay un error en la API, usamos datos de ejemplo para desarrollo
      const clientesMock = [
        { id: 1, nombre: 'Empresa ABC', email: 'contacto@abc.com', telefono: '912345678', fecha: '05/04/2025', estado: 'Activo', tipo: 'Premium' },
        { id: 2, nombre: 'Corporación XYZ', email: 'info@xyz.com', telefono: '934567890', fecha: '03/04/2025', estado: 'Activo', tipo: 'Estándar' },
        { id: 3, nombre: 'Industrias 123', email: 'ventas@123.com', telefono: '956789012', fecha: '01/04/2025', estado: 'Pendiente', tipo: 'Premium' },
        { id: 4, nombre: 'Servicios Pro', email: 'admin@pro.com', telefono: '978901234', fecha: '29/03/2025', estado: 'Activo', tipo: 'Básico' },
        { id: 5, nombre: 'Consultora Global', email: 'info@global.com', telefono: '990123456', fecha: '25/03/2025', estado: 'Inactivo', tipo: 'Estándar' },
        { id: 6, nombre: 'Distribuciones Rápidas', email: 'contacto@rapidas.com', telefono: '912345678', fecha: '20/03/2025', estado: 'Activo', tipo: 'Premium' },
        { id: 7, nombre: 'Tecnología Avanzada', email: 'info@tecno.com', telefono: '934567890', fecha: '15/03/2025', estado: 'Activo', tipo: 'Estándar' },
        { id: 8, nombre: 'Marketing Digital', email: 'contacto@marketing.com', telefono: '956789012', fecha: '10/03/2025', estado: 'Pendiente', tipo: 'Básico' }
      ];
      
      setClientes(clientesMock);
    } finally {
      setCargando(false);
    }
  };
  
  useEffect(() => {
    cargarClientes();
  }, []);
  
  // Filtrar clientes según los criterios
  const clientesFiltrados = clientes.filter(cliente => {
    const coincideNombre = cliente.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideEstado = filtroEstado === 'todos' || cliente.estado === filtroEstado;
    
    return coincideNombre && coincideEstado;
  });
  
  // Manejadores de eventos
  const handleFiltroNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };
  
  const handleFiltroEstadoChange = (e) => {
    setFiltroEstado(e.target.value);
  };
  
  const handleNuevoCliente = () => {
    setFormDatos({
      nombre: '',
      email: '',
      telefono: '',
      tipo: 'Estándar',
      estado: 'Activo'
    });
    setClienteActual(null);
    setMostrarModalNuevo(true);
  };
  
  const handleEditarCliente = (id) => {
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
      setClienteActual(cliente);
      setFormDatos({
        nombre: cliente.nombre,
        email: cliente.email,
        telefono: cliente.telefono,
        tipo: cliente.tipo,
        estado: cliente.estado
      });
      setMostrarModalEditar(true);
    }
  };
  
  const handleEliminarCliente = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      try {
        setCargando(true);
        // Llamar a la API para eliminar el cliente
        await servicioUsuarios.eliminar(id);
        
        // Actualizar la lista de clientes
        setClientes(clientes.filter(cliente => cliente.id !== id));
        
        // Mostrar mensaje de éxito
        setMensaje({
          tipo: 'success',
          texto: 'Cliente eliminado correctamente'
        });
      } catch (error) {
        console.error(`Error al eliminar cliente con ID ${id}:`, error);
        setMensaje({
          tipo: 'danger',
          texto: 'Error al eliminar el cliente. Por favor, inténtalo de nuevo.'
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
  
  const handleGuardarCliente = async () => {
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
      
      if (clienteActual) {
        // Actualizar cliente existente
        const datosActualizados = {
          ...formDatos,
          tipo_usuario: 'cliente' // Aseguramos que se mantenga como cliente
        };
        
        // Llamar a la API para actualizar el cliente
        await servicioUsuarios.actualizar(clienteActual.id, datosActualizados);
        
        // Actualizar la lista de clientes
        const clientesActualizados = clientes.map(c => 
          c.id === clienteActual.id ? { ...c, ...datosActualizados } : c
        );
        
        setClientes(clientesActualizados);
        setMostrarModalEditar(false);
        
        // Mostrar mensaje de éxito
        setMensaje({
          tipo: 'success',
          texto: 'Cliente actualizado correctamente'
        });
      } else {
        // Crear nuevo cliente
        const nuevoCliente = {
          ...formDatos,
          tipo_usuario: 'cliente',
          fecha: new Date().toLocaleDateString('es-ES')
        };
        
        // Llamar a la API para crear el cliente
        const clienteCreado = await servicioUsuarios.crear(nuevoCliente);
        
        // Actualizar la lista de clientes
        setClientes([...clientes, clienteCreado]);
        setMostrarModalNuevo(false);
        
        // Mostrar mensaje de éxito
        setMensaje({
          tipo: 'success',
          texto: 'Cliente creado correctamente'
        });
      }
    } catch (error) {
      console.error('Error al guardar el cliente:', error);
      setMensaje({
        tipo: 'danger',
        texto: 'Error al guardar el cliente. Por favor, inténtalo de nuevo.'
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
    <div className="pagina-clientes-admin">
      <div className="cabecera-seccion">
        <Container>
          <h1>Gestión de Clientes</h1>
          <p>Administra todos los clientes de AlhambraCRM</p>
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
                  value={filtroEstado} 
                  onChange={handleFiltroEstadoChange}
                >
                  <option value="todos">Todos los estados</option>
                  <option value="Activo">Activo</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Inactivo">Inactivo</option>
                </Form.Select>
              </Col>
              
              <Col lg={5} className="text-lg-end">
                <Button 
                  variant="primary" 
                  className="btn-principal"
                  onClick={handleNuevoCliente}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Nuevo Cliente
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
                <p className="mt-3">Cargando clientes...</p>
              </div>
            ) : clientesFiltrados.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-search fs-1 text-muted"></i>
                <p className="mt-3">No se encontraron clientes con los filtros aplicados.</p>
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
                      <th>Fecha Registro</th>
                      <th>Tipo</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientesFiltrados.map(cliente => (
                      <tr key={cliente.id}>
                        <td>#{cliente.id}</td>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.telefono}</td>
                        <td>{cliente.fecha}</td>
                        <td>
                          <span className={`badge bg-${cliente.tipo === 'Premium' ? 'primary' : cliente.tipo === 'Estándar' ? 'success' : 'secondary'}`}>
                            {cliente.tipo}
                          </span>
                        </td>
                        <td>
                          <span className={`badge bg-${cliente.estado === 'Activo' ? 'success' : cliente.estado === 'Pendiente' ? 'warning' : 'danger'}`}>
                            {cliente.estado}
                          </span>
                        </td>
                        <td>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 me-2"
                            onClick={() => handleEditarCliente(cliente.id)}
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 text-danger"
                            onClick={() => handleEliminarCliente(cliente.id)}
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
      
      {/* Modal para editar cliente */}
      <Modal show={mostrarModalEditar} onHide={() => setMostrarModalEditar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
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
              <Form.Label>Tipo</Form.Label>
              <Form.Select 
                name="tipo"
                value={formDatos.tipo}
                onChange={handleInputChange}
              >
                <option value="Básico">Básico</option>
                <option value="Estándar">Estándar</option>
                <option value="Premium">Premium</option>
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
                <option value="Pendiente">Pendiente</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalEditar(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCliente}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal para nuevo cliente */}
      <Modal show={mostrarModalNuevo} onHide={() => setMostrarModalNuevo(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Cliente</Modal.Title>
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
              <Form.Label>Tipo</Form.Label>
              <Form.Select 
                name="tipo"
                value={formDatos.tipo}
                onChange={handleInputChange}
              >
                <option value="Básico">Básico</option>
                <option value="Estándar">Estándar</option>
                <option value="Premium">Premium</option>
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
                <option value="Pendiente">Pendiente</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalNuevo(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardarCliente}>
            Crear Cliente
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Clientes;
