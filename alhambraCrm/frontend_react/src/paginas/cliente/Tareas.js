import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup } from 'react-bootstrap';
import './Tareas.css';

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const [cargando, setCargando] = useState(true);
  
  // Simulación de carga de datos
  useEffect(() => {
    // En un caso real, estos datos vendrían de una API
    setTimeout(() => {
      const tareasMock = [
        { id: 1, texto: 'Llamar a cliente ABC para seguimiento', completada: false, prioridad: 'alta', fecha: '10/04/2025' },
        { id: 2, texto: 'Preparar propuesta para XYZ Corp', completada: false, prioridad: 'media', fecha: '12/04/2025' },
        { id: 3, texto: 'Enviar factura a Servicios Pro', completada: true, prioridad: 'baja', fecha: '05/04/2025' },
        { id: 4, texto: 'Actualizar información de cliente en el sistema', completada: false, prioridad: 'media', fecha: '15/04/2025' },
        { id: 5, texto: 'Revisar contrato con Industrias 123', completada: true, prioridad: 'alta', fecha: '03/04/2025' }
      ];
      
      setTareas(tareasMock);
      setCargando(false);
    }, 1000);
  }, []);
  
  // Filtrar tareas según el criterio seleccionado
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'todas') return true;
    if (filtro === 'pendientes') return !tarea.completada;
    if (filtro === 'completadas') return tarea.completada;
    return true;
  });
  
  // Manejadores de eventos
  const handleNuevaTareaChange = (e) => {
    setNuevaTarea(e.target.value);
  };
  
  const handleAgregarTarea = (e) => {
    e.preventDefault();
    
    if (nuevaTarea.trim() === '') return;
    
    const nuevaTareaObj = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
      prioridad: 'media',
      fecha: new Date().toLocaleDateString('es-ES')
    };
    
    setTareas([nuevaTareaObj, ...tareas]);
    setNuevaTarea('');
  };
  
  const handleToggleCompletada = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? {...tarea, completada: !tarea.completada} : tarea
    ));
  };
  
  const handleCambiarPrioridad = (id, nuevaPrioridad) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? {...tarea, prioridad: nuevaPrioridad} : tarea
    ));
  };
  
  const handleEliminarTarea = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setTareas(tareas.filter(tarea => tarea.id !== id));
    }
  };
  
  return (
    <div className="pagina-tareas">
      <div className="cabecera-seccion">
        <Container>
          <h1>Mis Tareas</h1>
          <p>Gestiona tus tareas y aumenta tu productividad</p>
        </Container>
      </div>
      
      <Container className="contenido-seccion">
        <Row>
          <Col lg={4} className="mb-4">
            <Card className="tarjeta-nueva-tarea">
              <Card.Body>
                <h5 className="mb-3">Añadir Nueva Tarea</h5>
                <Form onSubmit={handleAgregarTarea}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Describe tu tarea..."
                      value={nuevaTarea}
                      onChange={handleNuevaTareaChange}
                      required
                    />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="btn-principal w-100"
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Añadir Tarea
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            
            <Card className="tarjeta-filtros mt-4">
              <Card.Body>
                <h5 className="mb-3">Filtros</h5>
                <div className="opciones-filtro">
                  <Form.Check
                    type="radio"
                    id="filtro-todas"
                    name="filtro"
                    label="Todas las tareas"
                    checked={filtro === 'todas'}
                    onChange={() => setFiltro('todas')}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    id="filtro-pendientes"
                    name="filtro"
                    label="Tareas pendientes"
                    checked={filtro === 'pendientes'}
                    onChange={() => setFiltro('pendientes')}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    id="filtro-completadas"
                    name="filtro"
                    label="Tareas completadas"
                    checked={filtro === 'completadas'}
                    onChange={() => setFiltro('completadas')}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={8}>
            <Card className="tarjeta-lista-tareas">
              <Card.Body>
                <h5 className="mb-4">Lista de Tareas</h5>
                
                {cargando ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-3">Cargando tareas...</p>
                  </div>
                ) : tareasFiltradas.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-clipboard-check fs-1 text-muted"></i>
                    <p className="mt-3">No hay tareas {filtro !== 'todas' ? `${filtro}` : ''} para mostrar.</p>
                  </div>
                ) : (
                  <ListGroup variant="flush" className="lista-tareas">
                    {tareasFiltradas.map(tarea => (
                      <ListGroup.Item key={tarea.id} className="tarea-item">
                        <div className="d-flex align-items-start">
                          <Form.Check
                            type="checkbox"
                            id={`tarea-${tarea.id}`}
                            checked={tarea.completada}
                            onChange={() => handleToggleCompletada(tarea.id)}
                            className="me-3 mt-1"
                          />
                          <div className="tarea-contenido flex-grow-1">
                            <p className={`tarea-texto ${tarea.completada ? 'completada' : ''}`}>
                              {tarea.texto}
                            </p>
                            <div className="tarea-meta">
                              <span className={`badge prioridad-${tarea.prioridad}`}>
                                {tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
                              </span>
                              <span className="fecha-tarea">
                                <i className="bi bi-calendar3 me-1"></i>
                                {tarea.fecha}
                              </span>
                            </div>
                          </div>
                          <div className="tarea-acciones">
                            <div className="dropdown">
                              <Button 
                                variant="link" 
                                className="dropdown-toggle p-0 text-muted" 
                                id={`dropdown-prioridad-${tarea.id}`}
                                onClick={(e) => e.currentTarget.nextElementSibling.classList.toggle('show')}
                              >
                                <i className="bi bi-flag"></i>
                              </Button>
                              <div className="dropdown-menu">
                                <Button 
                                  variant="link" 
                                  className="dropdown-item" 
                                  onClick={() => handleCambiarPrioridad(tarea.id, 'alta')}
                                >
                                  Alta
                                </Button>
                                <Button 
                                  variant="link" 
                                  className="dropdown-item" 
                                  onClick={() => handleCambiarPrioridad(tarea.id, 'media')}
                                >
                                  Media
                                </Button>
                                <Button 
                                  variant="link" 
                                  className="dropdown-item" 
                                  onClick={() => handleCambiarPrioridad(tarea.id, 'baja')}
                                >
                                  Baja
                                </Button>
                              </div>
                            </div>
                            <Button 
                              variant="link" 
                              className="p-0 text-danger ms-3" 
                              onClick={() => handleEliminarTarea(tarea.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tareas;
