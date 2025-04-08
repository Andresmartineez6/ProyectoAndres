import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Table, Modal } from 'react-bootstrap';
import './Contactos.css';

const Contactos = () => {
  const [contactos, setContactos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [contactoActual, setContactoActual] = useState({
    id: null,
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    cargo: '',
    notas: ''
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  
  // Simulación de carga de datos
  useEffect(() => {
    // En un caso real, estos datos vendrían de una API
    setTimeout(() => {
      const contactosMock = [
        { id: 1, nombre: 'Juan Pérez', email: 'juan@empresa.com', telefono: '612345678', empresa: 'Empresa ABC', cargo: 'Director Comercial', notas: 'Cliente potencial interesado en el plan Premium' },
        { id: 2, nombre: 'María López', email: 'maria@corporacion.com', telefono: '623456789', empresa: 'Corporación XYZ', cargo: 'CEO', notas: 'Reunión programada para el próximo mes' },
        { id: 3, nombre: 'Carlos Gómez', email: 'carlos@industrias.com', telefono: '634567890', empresa: 'Industrias 123', cargo: 'Gerente de Compras', notas: 'Solicita información sobre integraciones' },
        { id: 4, nombre: 'Laura Martínez', email: 'laura@servicios.com', telefono: '645678901', empresa: 'Servicios Pro', cargo: 'Directora de Marketing', notas: 'Cliente actual, plan Estándar' },
        { id: 5, nombre: 'Javier Sánchez', email: 'javier@consultora.com', telefono: '656789012', empresa: 'Consultora Global', cargo: 'Consultor Senior', notas: 'Interesado en cambiar de proveedor' }
      ];
      
      setContactos(contactosMock);
      setCargando(false);
    }, 1000);
  }, []);
  
  // Filtrar contactos según el nombre
  const contactosFiltrados = contactos.filter(contacto => {
    return contacto.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) ||
           contacto.empresa.toLowerCase().includes(filtroNombre.toLowerCase());
  });
  
  // Manejadores de eventos
  const handleFiltroNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  };
  
  const handleAbrirModal = (modo, contacto = null) => {
    setModoEdicion(modo === 'editar');
    
    if (contacto) {
      setContactoActual({ ...contacto });
    } else {
      setContactoActual({
        id: null,
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        cargo: '',
        notas: ''
      });
    }
    
    setMostrarModal(true);
  };
  
  const handleCerrarModal = () => {
    setMostrarModal(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactoActual({ ...contactoActual, [name]: value });
  };
  
  const handleGuardarContacto = () => {
    if (modoEdicion) {
      // Actualizar contacto existente
      setContactos(contactos.map(contacto => 
        contacto.id === contactoActual.id ? contactoActual : contacto
      ));
    } else {
      // Crear nuevo contacto
      const nuevoContacto = {
        ...contactoActual,
        id: Date.now()
      };
      setContactos([...contactos, nuevoContacto]);
    }
    
    handleCerrarModal();
  };
  
  const handleEliminarContacto = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
      setContactos(contactos.filter(contacto => contacto.id !== id));
    }
  };
  
  return (
    <div className="pagina-contactos">
      <div className="cabecera-seccion">
        <Container>
          <h1>Mis Contactos</h1>
          <p>Gestiona tus contactos y mantén tu red organizada</p>
        </Container>
      </div>
      
      <Container className="contenido-seccion">
        <Card className="tarjeta-filtros mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col lg={6} md={8} className="mb-3 mb-lg-0">
                <InputGroup>
                  <InputGroup.Text>
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Buscar por nombre o empresa..."
                    value={filtroNombre}
                    onChange={handleFiltroNombreChange}
                  />
                </InputGroup>
              </Col>
              
              <Col lg={6} md={4} className="text-md-end">
                <Button 
                  variant="primary" 
                  className="btn-principal"
                  onClick={() => handleAbrirModal('nuevo')}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Nuevo Contacto
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
                <p className="mt-3">Cargando contactos...</p>
              </div>
            ) : contactosFiltrados.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-people fs-1 text-muted"></i>
                <p className="mt-3">No se encontraron contactos con los filtros aplicados.</p>
              </div>
            ) : (
              <div className="tabla-responsive">
                <Table hover>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Empresa</th>
                      <th>Cargo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactosFiltrados.map(contacto => (
                      <tr key={contacto.id}>
                        <td>{contacto.nombre}</td>
                        <td>{contacto.email}</td>
                        <td>{contacto.telefono}</td>
                        <td>{contacto.empresa}</td>
                        <td>{contacto.cargo}</td>
                        <td>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 me-2 btn-accion"
                            onClick={() => handleAbrirModal('editar', contacto)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 text-danger btn-accion"
                            onClick={() => handleEliminarContacto(contacto.id)}
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
      
      {/* Modal para añadir/editar contacto */}
      <Modal show={mostrarModal} onHide={handleCerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicion ? 'Editar Contacto' : 'Nuevo Contacto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Group>
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={contactoActual.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={contactoActual.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={contactoActual.telefono}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control
                    type="text"
                    name="empresa"
                    value={contactoActual.empresa}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Cargo</Form.Label>
                  <Form.Control
                    type="text"
                    name="cargo"
                    value={contactoActual.cargo}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Notas</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notas"
                    value={contactoActual.notas}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" className="btn-principal" onClick={handleGuardarContacto}>
            {modoEdicion ? 'Actualizar' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Contactos;
