import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import './Calendario.css';

const Calendario = () => {
  const [eventos, setEventos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [eventoActual, setEventoActual] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [mesActual, setMesActual] = useState(new Date());
  
  // Estado para el formulario de evento
  const [formEvento, setFormEvento] = useState({
    titulo: '',
    fechaInicio: '',
    horaInicio: '',
    fechaFin: '',
    horaFin: '',
    descripcion: '',
    participantes: '',
    color: '#00f7d3'
  });
  
  useEffect(() => {
    // Simulación de carga de datos
    // En un caso real, estos datos vendrían del backend
    const eventosIniciales = [
      {
        id: 1,
        titulo: 'Reunión con equipo de desarrollo',
        fechaInicio: '2025-04-10',
        horaInicio: '10:00',
        fechaFin: '2025-04-10',
        horaFin: '11:30',
        descripcion: 'Revisión de avances del proyecto y planificación de próximas tareas',
        participantes: 'María López, Carlos Ruiz',
        color: '#00f7d3'
      },
      {
        id: 2,
        titulo: 'Presentación de propuesta',
        fechaInicio: '2025-04-15',
        horaInicio: '15:00',
        fechaFin: '2025-04-15',
        horaFin: '16:00',
        descripcion: 'Presentación de propuesta comercial a nuevo cliente',
        participantes: 'Laura Martínez',
        color: '#05044c'
      },
      {
        id: 3,
        titulo: 'Entrega de proyecto',
        fechaInicio: '2025-04-20',
        horaInicio: '09:00',
        fechaFin: '2025-04-20',
        horaFin: '10:00',
        descripcion: 'Entrega final del proyecto y documentación',
        participantes: 'Todo el equipo',
        color: '#fd7e14'
      }
    ];
    
    setEventos(eventosIniciales);
  }, []);
  
  const abrirModal = (fecha = null, evento = null) => {
    if (evento) {
      // Editar evento existente
      setEventoActual(evento);
      setFormEvento({
        titulo: evento.titulo,
        fechaInicio: evento.fechaInicio,
        horaInicio: evento.horaInicio,
        fechaFin: evento.fechaFin,
        horaFin: evento.horaFin,
        descripcion: evento.descripcion,
        participantes: evento.participantes,
        color: evento.color
      });
    } else {
      // Nuevo evento
      const hoy = fecha || new Date().toISOString().split('T')[0];
      setEventoActual(null);
      setFechaSeleccionada(hoy);
      setFormEvento({
        titulo: '',
        fechaInicio: hoy,
        horaInicio: '09:00',
        fechaFin: hoy,
        horaFin: '10:00',
        descripcion: '',
        participantes: '',
        color: '#00f7d3'
      });
    }
    
    setMostrarModal(true);
  };
  
  const cerrarModal = () => {
    setMostrarModal(false);
    setEventoActual(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormEvento({
      ...formEvento,
      [name]: value
    });
  };
  
  const guardarEvento = () => {
    if (!formEvento.titulo) {
      alert('El título es obligatorio');
      return;
    }
    
    if (eventoActual) {
      // Actualizar evento existente
      const eventosActualizados = eventos.map(ev => 
        ev.id === eventoActual.id ? { ...formEvento, id: eventoActual.id } : ev
      );
      setEventos(eventosActualizados);
    } else {
      // Crear nuevo evento
      const nuevoEvento = {
        ...formEvento,
        id: Date.now() // Generamos un ID único
      };
      setEventos([...eventos, nuevoEvento]);
    }
    
    cerrarModal();
  };
  
  const eliminarEvento = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      const eventosActualizados = eventos.filter(ev => ev.id !== id);
      setEventos(eventosActualizados);
      cerrarModal();
    }
  };
  
  // Funciones para generar el calendario
  const obtenerDiasEnMes = (año, mes) => {
    return new Date(año, mes + 1, 0).getDate();
  };
  
  const obtenerPrimerDiaSemana = (año, mes) => {
    return new Date(año, mes, 1).getDay();
  };
  
  const generarCalendario = () => {
    const año = mesActual.getFullYear();
    const mes = mesActual.getMonth();
    
    const diasEnMes = obtenerDiasEnMes(año, mes);
    const primerDiaSemana = obtenerPrimerDiaSemana(año, mes);
    
    const diasCalendario = [];
    
    // Días del mes anterior
    for (let i = 0; i < primerDiaSemana; i++) {
      const diaAnterior = new Date(año, mes, 0 - (primerDiaSemana - i - 1));
      diasCalendario.push({
        dia: diaAnterior.getDate(),
        mes: diaAnterior.getMonth(),
        año: diaAnterior.getFullYear(),
        esOtroMes: true
      });
    }
    
    // Días del mes actual
    for (let i = 1; i <= diasEnMes; i++) {
      diasCalendario.push({
        dia: i,
        mes,
        año,
        esOtroMes: false
      });
    }
    
    // Completar la última semana con días del mes siguiente si es necesario
    const diasRestantes = 7 - (diasCalendario.length % 7);
    if (diasRestantes < 7) {
      for (let i = 1; i <= diasRestantes; i++) {
        const diaSiguiente = new Date(año, mes + 1, i);
        diasCalendario.push({
          dia: diaSiguiente.getDate(),
          mes: diaSiguiente.getMonth(),
          año: diaSiguiente.getFullYear(),
          esOtroMes: true
        });
      }
    }
    
    return diasCalendario;
  };
  
  const cambiarMes = (incremento) => {
    const nuevaFecha = new Date(mesActual);
    nuevaFecha.setMonth(mesActual.getMonth() + incremento);
    setMesActual(nuevaFecha);
  };
  
  const formatearFecha = (año, mes, dia) => {
    return `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
  };
  
  const obtenerEventosDia = (año, mes, dia) => {
    const fecha = formatearFecha(año, mes + 1, dia);
    return eventos.filter(evento => evento.fechaInicio === fecha);
  };
  
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const diasCalendario = generarCalendario();
  
  return (
    <div className="calendario-cliente">
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <div className="cabecera-calendario">
              <h1>Calendario</h1>
              <div className="controles-calendario">
                <Button variant="outline-secondary" onClick={() => cambiarMes(-1)}>
                  <i className="bi bi-chevron-left"></i>
                </Button>
                <h2>{nombresMeses[mesActual.getMonth()]} {mesActual.getFullYear()}</h2>
                <Button variant="outline-secondary" onClick={() => cambiarMes(1)}>
                  <i className="bi bi-chevron-right"></i>
                </Button>
              </div>
              <Button variant="primary" onClick={() => abrirModal()}>
                <i className="bi bi-plus"></i> Nuevo evento
              </Button>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div className="calendario">
                  <div className="dias-semana">
                    {diasSemana.map((dia, index) => (
                      <div key={index} className="dia-semana">{dia}</div>
                    ))}
                  </div>
                  
                  <div className="dias-calendario">
                    {diasCalendario.map((dia, index) => {
                      const fechaFormateada = formatearFecha(dia.año, dia.mes, dia.dia);
                      const eventosDia = obtenerEventosDia(dia.año, dia.mes, dia.dia);
                      const esHoy = new Date().toISOString().split('T')[0] === fechaFormateada;
                      
                      return (
                        <div 
                          key={index} 
                          className={`dia-calendario ${dia.esOtroMes ? 'otro-mes' : ''} ${esHoy ? 'hoy' : ''}`}
                          onClick={() => abrirModal(fechaFormateada)}
                        >
                          <div className="numero-dia">{dia.dia}</div>
                          <div className="eventos-dia">
                            {eventosDia.slice(0, 3).map(evento => (
                              <div 
                                key={evento.id} 
                                className="evento" 
                                style={{ backgroundColor: evento.color }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  abrirModal(null, evento);
                                }}
                              >
                                <span className="hora-evento">{evento.horaInicio}</span>
                                <span className="titulo-evento">{evento.titulo}</span>
                              </div>
                            ))}
                            {eventosDia.length > 3 && (
                              <div className="mas-eventos">+{eventosDia.length - 3} más</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Próximos eventos</h5>
              </Card.Header>
              <Card.Body>
                <div className="lista-eventos">
                  {eventos
                    .filter(evento => new Date(evento.fechaInicio) >= new Date())
                    .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))
                    .slice(0, 5)
                    .map(evento => (
                      <div key={evento.id} className="evento-item" onClick={() => abrirModal(null, evento)}>
                        <div className="fecha-evento" style={{ backgroundColor: evento.color }}>
                          <span className="dia-evento">{evento.fechaInicio.split('-')[2]}</span>
                          <span className="mes-evento">{nombresMeses[parseInt(evento.fechaInicio.split('-')[1]) - 1].substring(0, 3)}</span>
                        </div>
                        <div className="detalles-evento">
                          <h6>{evento.titulo}</h6>
                          <p><i className="bi bi-clock"></i> {evento.horaInicio} - {evento.horaFin}</p>
                          {evento.participantes && (
                            <p><i className="bi bi-people"></i> {evento.participantes}</p>
                          )}
                        </div>
                      </div>
                    ))
                  }
                  
                  {eventos.filter(evento => new Date(evento.fechaInicio) >= new Date()).length === 0 && (
                    <p className="text-center text-muted my-4">No hay eventos próximos</p>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Modal para crear/editar eventos */}
      <Modal show={mostrarModal} onHide={cerrarModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{eventoActual ? 'Editar evento' : 'Nuevo evento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={formEvento.titulo}
                onChange={handleInputChange}
                placeholder="Título del evento"
                required
              />
            </Form.Group>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha de inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaInicio"
                    value={formEvento.fechaInicio}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Hora de inicio</Form.Label>
                  <Form.Control
                    type="time"
                    name="horaInicio"
                    value={formEvento.horaInicio}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha de fin</Form.Label>
                  <Form.Control
                    type="date"
                    name="fechaFin"
                    value={formEvento.fechaFin}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Hora de fin</Form.Label>
                  <Form.Control
                    type="time"
                    name="horaFin"
                    value={formEvento.horaFin}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formEvento.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del evento"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Participantes</Form.Label>
              <Form.Control
                type="text"
                name="participantes"
                value={formEvento.participantes}
                onChange={handleInputChange}
                placeholder="Nombres separados por comas"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="color"
                  name="color"
                  value={formEvento.color}
                  onChange={handleInputChange}
                  title="Elige un color para el evento"
                />
                <span className="ms-3 d-flex align-items-center">{formEvento.color}</span>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {eventoActual && (
            <Button variant="danger" onClick={() => eliminarEvento(eventoActual.id)}>
              Eliminar
            </Button>
          )}
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarEvento}>
            {eventoActual ? 'Actualizar' : 'Crear'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendario;
