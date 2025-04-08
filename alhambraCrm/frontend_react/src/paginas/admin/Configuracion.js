import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav, Tab, Alert } from 'react-bootstrap';
import './Configuracion.css';

const Configuracion = () => {
  // Estados para los diferentes formularios
  const [configuracionGeneral, setConfiguracionGeneral] = useState({
    nombreEmpresa: 'AlhambraCRM',
    direccion: 'Calle Principal 123, Granada',
    telefono: '958123456',
    email: 'info@alhambracrm.com',
    sitioWeb: 'www.alhambracrm.com',
    logoURL: '/logo.png'
  });

  const [configuracionCorreo, setConfiguracionCorreo] = useState({
    servidorSMTP: 'smtp.alhambracrm.com',
    puerto: '587',
    usuario: 'notificaciones@alhambracrm.com',
    password: '',
    usarSSL: true,
    firmaCorreo: 'Equipo de AlhambraCRM\nSoporte técnico\nTel: 958123456'
  });

  const [configuracionNotificaciones, setConfiguracionNotificaciones] = useState({
    notificarNuevoCliente: true,
    notificarNuevoProyecto: true,
    notificarTareaAsignada: true,
    notificarInformeGenerado: false,
    notificarFacturaEmitida: true,
    frecuenciaResumen: 'diario'
  });

  const [configuracionSeguridad, setConfiguracionSeguridad] = useState({
    tiempoSesion: '60',
    intentosMaximos: '5',
    longitudMinPassword: '8',
    requerirMayusculas: true,
    requerirNumeros: true,
    requerirCaracteresEspeciales: true,
    cambioPasswordDias: '90'
  });

  // Estado para mensajes de éxito o error
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Manejadores de cambios para los formularios
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setConfiguracionGeneral({
      ...configuracionGeneral,
      [name]: value
    });
  };

  const handleCorreoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfiguracionCorreo({
      ...configuracionCorreo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNotificacionesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfiguracionNotificaciones({
      ...configuracionNotificaciones,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSeguridadChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfiguracionSeguridad({
      ...configuracionSeguridad,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Manejadores para guardar configuraciones
  const guardarConfiguracionGeneral = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en la API
    console.log('Guardando configuración general:', configuracionGeneral);
    
    // Mostrar mensaje de éxito
    setMensaje({
      tipo: 'success',
      texto: 'Configuración general guardada correctamente'
    });
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje({ tipo: '', texto: '' });
    }, 3000);
  };

  const guardarConfiguracionCorreo = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en la API
    console.log('Guardando configuración de correo:', configuracionCorreo);
    
    // Mostrar mensaje de éxito
    setMensaje({
      tipo: 'success',
      texto: 'Configuración de correo guardada correctamente'
    });
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje({ tipo: '', texto: '' });
    }, 3000);
  };

  const guardarConfiguracionNotificaciones = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en la API
    console.log('Guardando configuración de notificaciones:', configuracionNotificaciones);
    
    // Mostrar mensaje de éxito
    setMensaje({
      tipo: 'success',
      texto: 'Configuración de notificaciones guardada correctamente'
    });
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje({ tipo: '', texto: '' });
    }, 3000);
  };

  const guardarConfiguracionSeguridad = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar en la API
    console.log('Guardando configuración de seguridad:', configuracionSeguridad);
    
    // Mostrar mensaje de éxito
    setMensaje({
      tipo: 'success',
      texto: 'Configuración de seguridad guardada correctamente'
    });
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje({ tipo: '', texto: '' });
    }, 3000);
  };

  // Probar configuración de correo
  const probarConfiguracionCorreo = () => {
    // Aquí iría la lógica para probar la configuración de correo
    console.log('Probando configuración de correo');
    
    // Simulación de prueba exitosa
    setMensaje({
      tipo: 'info',
      texto: 'Correo de prueba enviado correctamente a ' + configuracionCorreo.usuario
    });
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje({ tipo: '', texto: '' });
    }, 3000);
  };

  return (
    <div className="pagina-configuracion-admin">
      <div className="cabecera-seccion">
        <Container>
          <h1>Configuración del Sistema</h1>
          <p>Administra todas las configuraciones de AlhambraCRM</p>
        </Container>
      </div>
      
      <Container className="contenido-seccion">
        {mensaje.tipo && (
          <Alert variant={mensaje.tipo} onClose={() => setMensaje({ tipo: '', texto: '' })} dismissible>
            {mensaje.texto}
          </Alert>
        )}
        
        <Tab.Container id="configuracion-tabs" defaultActiveKey="general">
          <Row>
            <Col lg={3} md={4} className="mb-4">
              <Card className="tarjeta-configuracion">
                <Card.Body className="p-0">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="general">
                        <i className="bi bi-gear icono-configuracion"></i>
                        General
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="correo">
                        <i className="bi bi-envelope icono-configuracion"></i>
                        Correo Electrónico
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="notificaciones">
                        <i className="bi bi-bell icono-configuracion"></i>
                        Notificaciones
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="seguridad">
                        <i className="bi bi-shield-lock icono-configuracion"></i>
                        Seguridad
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="backup">
                        <i className="bi bi-database icono-configuracion"></i>
                        Copias de Seguridad
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={9} md={8}>
              <Tab.Content>
                {/* Configuración General */}
                <Tab.Pane eventKey="general">
                  <Card className="tarjeta-configuracion">
                    <Card.Header>
                      <h5>Configuración General</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={guardarConfiguracionGeneral}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Nombre de la Empresa</Form.Label>
                              <Form.Control 
                                type="text" 
                                name="nombreEmpresa"
                                value={configuracionGeneral.nombreEmpresa}
                                onChange={handleGeneralChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Sitio Web</Form.Label>
                              <Form.Control 
                                type="text" 
                                name="sitioWeb"
                                value={configuracionGeneral.sitioWeb}
                                onChange={handleGeneralChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Dirección</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="direccion"
                            value={configuracionGeneral.direccion}
                            onChange={handleGeneralChange}
                          />
                        </Form.Group>
                        
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Teléfono</Form.Label>
                              <Form.Control 
                                type="text" 
                                name="telefono"
                                value={configuracionGeneral.telefono}
                                onChange={handleGeneralChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control 
                                type="email" 
                                name="email"
                                value={configuracionGeneral.email}
                                onChange={handleGeneralChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>URL del Logo</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="logoURL"
                            value={configuracionGeneral.logoURL}
                            onChange={handleGeneralChange}
                          />
                          <Form.Text className="text-muted">
                            Ruta relativa al logo de la empresa.
                          </Form.Text>
                        </Form.Group>
                        
                        <div className="d-flex justify-content-end">
                          <Button variant="primary" type="submit" className="btn-principal">
                            Guardar Configuración
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                
                {/* Configuración de Correo */}
                <Tab.Pane eventKey="correo">
                  <Card className="tarjeta-configuracion">
                    <Card.Header>
                      <h5>Configuración de Correo Electrónico</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={guardarConfiguracionCorreo}>
                        <Row>
                          <Col md={8}>
                            <Form.Group className="mb-3">
                              <Form.Label>Servidor SMTP</Form.Label>
                              <Form.Control 
                                type="text" 
                                name="servidorSMTP"
                                value={configuracionCorreo.servidorSMTP}
                                onChange={handleCorreoChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>Puerto</Form.Label>
                              <Form.Control 
                                type="text" 
                                name="puerto"
                                value={configuracionCorreo.puerto}
                                onChange={handleCorreoChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Usuario</Form.Label>
                              <Form.Control 
                                type="email" 
                                name="usuario"
                                value={configuracionCorreo.usuario}
                                onChange={handleCorreoChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Contraseña</Form.Label>
                              <Form.Control 
                                type="password" 
                                name="password"
                                value={configuracionCorreo.password}
                                onChange={handleCorreoChange}
                                placeholder="••••••••"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox" 
                            label="Usar SSL/TLS" 
                            name="usarSSL"
                            checked={configuracionCorreo.usarSSL}
                            onChange={handleCorreoChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Firma de Correo</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={3}
                            name="firmaCorreo"
                            value={configuracionCorreo.firmaCorreo}
                            onChange={handleCorreoChange}
                          />
                        </Form.Group>
                        
                        <div className="d-flex justify-content-end gap-2">
                          <Button 
                            variant="outline-primary" 
                            onClick={probarConfiguracionCorreo}
                          >
                            Probar Configuración
                          </Button>
                          <Button variant="primary" type="submit" className="btn-principal">
                            Guardar Configuración
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                
                {/* Configuración de Notificaciones */}
                <Tab.Pane eventKey="notificaciones">
                  <Card className="tarjeta-configuracion">
                    <Card.Header>
                      <h5>Configuración de Notificaciones</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={guardarConfiguracionNotificaciones}>
                        <h6 className="mb-3">Notificaciones por Correo</h6>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox" 
                            label="Notificar cuando se registre un nuevo cliente" 
                            name="notificarNuevoCliente"
                            checked={configuracionNotificaciones.notificarNuevoCliente}
                            onChange={handleNotificacionesChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox" 
                            label="Notificar cuando se cree un nuevo proyecto" 
                            name="notificarNuevoProyecto"
                            checked={configuracionNotificaciones.notificarNuevoProyecto}
                            onChange={handleNotificacionesChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox" 
                            label="Notificar cuando se asigne una tarea" 
                            name="notificarTareaAsignada"
                            checked={configuracionNotificaciones.notificarTareaAsignada}
                            onChange={handleNotificacionesChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox" 
                            label="Notificar cuando se genere un informe" 
                            name="notificarInformeGenerado"
                            checked={configuracionNotificaciones.notificarInformeGenerado}
                            onChange={handleNotificacionesChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox" 
                            label="Notificar cuando se emita una factura" 
                            name="notificarFacturaEmitida"
                            checked={configuracionNotificaciones.notificarFacturaEmitida}
                            onChange={handleNotificacionesChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Frecuencia de Resumen</Form.Label>
                          <Form.Select 
                            name="frecuenciaResumen"
                            value={configuracionNotificaciones.frecuenciaResumen}
                            onChange={handleNotificacionesChange}
                          >
                            <option value="diario">Diario</option>
                            <option value="semanal">Semanal</option>
                            <option value="mensual">Mensual</option>
                            <option value="nunca">Nunca</option>
                          </Form.Select>
                          <Form.Text className="text-muted">
                            Frecuencia con la que se enviará un resumen de actividades.
                          </Form.Text>
                        </Form.Group>
                        
                        <div className="d-flex justify-content-end">
                          <Button variant="primary" type="submit" className="btn-principal">
                            Guardar Configuración
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                
                {/* Configuración de Seguridad */}
                <Tab.Pane eventKey="seguridad">
                  <Card className="tarjeta-configuracion">
                    <Card.Header>
                      <h5>Configuración de Seguridad</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={guardarConfiguracionSeguridad}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Tiempo de Sesión (minutos)</Form.Label>
                              <Form.Control 
                                type="number" 
                                name="tiempoSesion"
                                value={configuracionSeguridad.tiempoSesion}
                                onChange={handleSeguridadChange}
                              />
                              <Form.Text className="text-muted">
                                Tiempo de inactividad antes de cerrar sesión automáticamente.
                              </Form.Text>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Intentos Máximos de Inicio de Sesión</Form.Label>
                              <Form.Control 
                                type="number" 
                                name="intentosMaximos"
                                value={configuracionSeguridad.intentosMaximos}
                                onChange={handleSeguridadChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <h6 className="mb-3 mt-4">Política de Contraseñas</h6>
                        
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Longitud Mínima</Form.Label>
                              <Form.Control 
                                type="number" 
                                name="longitudMinPassword"
                                value={configuracionSeguridad.longitudMinPassword}
                                onChange={handleSeguridadChange}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Cambio de Contraseña (días)</Form.Label>
                              <Form.Control 
                                type="number" 
                                name="cambioPasswordDias"
                                value={configuracionSeguridad.cambioPasswordDias}
                                onChange={handleSeguridadChange}
                              />
                              <Form.Text className="text-muted">
                                0 para no requerir cambios.
                              </Form.Text>
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox" 
                            label="Requerir letras mayúsculas" 
                            name="requerirMayusculas"
                            checked={configuracionSeguridad.requerirMayusculas}
                            onChange={handleSeguridadChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox" 
                            label="Requerir números" 
                            name="requerirNumeros"
                            checked={configuracionSeguridad.requerirNumeros}
                            onChange={handleSeguridadChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox" 
                            label="Requerir caracteres especiales" 
                            name="requerirCaracteresEspeciales"
                            checked={configuracionSeguridad.requerirCaracteresEspeciales}
                            onChange={handleSeguridadChange}
                          />
                        </Form.Group>
                        
                        <div className="d-flex justify-content-end">
                          <Button variant="primary" type="submit" className="btn-principal">
                            Guardar Configuración
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                
                {/* Copias de Seguridad */}
                <Tab.Pane eventKey="backup">
                  <Card className="tarjeta-configuracion">
                    <Card.Header>
                      <h5>Copias de Seguridad</h5>
                    </Card.Header>
                    <Card.Body>
                      <p>Gestiona las copias de seguridad de la base de datos y archivos del sistema.</p>
                      
                      <h6 className="mb-3">Copias de Seguridad Programadas</h6>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Frecuencia de Copia de Seguridad</Form.Label>
                        <Form.Select>
                          <option value="diario">Diario</option>
                          <option value="semanal">Semanal</option>
                          <option value="mensual">Mensual</option>
                          <option value="nunca">Nunca</option>
                        </Form.Select>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Hora de Ejecución</Form.Label>
                        <Form.Control type="time" defaultValue="02:00" />
                        <Form.Text className="text-muted">
                          Se recomienda programar las copias en horas de baja actividad.
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Retención de Copias (días)</Form.Label>
                        <Form.Control type="number" defaultValue="30" />
                      </Form.Group>
                      
                      <h6 className="mb-3 mt-4">Copia de Seguridad Manual</h6>
                      
                      <p>Realiza una copia de seguridad inmediata de la base de datos y archivos del sistema.</p>
                      
                      <div className="d-flex gap-2 mb-4">
                        <Button variant="outline-primary">
                          <i className="bi bi-database me-2"></i>
                          Copia de Base de Datos
                        </Button>
                        <Button variant="outline-primary">
                          <i className="bi bi-file-earmark-zip me-2"></i>
                          Copia Completa
                        </Button>
                      </div>
                      
                      <h6 className="mb-3">Copias de Seguridad Recientes</h6>
                      
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Fecha</th>
                              <th>Tipo</th>
                              <th>Tamaño</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>08/04/2025 01:00</td>
                              <td>Base de datos</td>
                              <td>15.2 MB</td>
                              <td>
                                <Button variant="link" size="sm" className="p-0 me-2">
                                  <i className="bi bi-download"></i>
                                </Button>
                                <Button variant="link" size="sm" className="p-0 text-danger">
                                  <i className="bi bi-trash"></i>
                                </Button>
                              </td>
                            </tr>
                            <tr>
                              <td>07/04/2025 01:00</td>
                              <td>Completa</td>
                              <td>256.7 MB</td>
                              <td>
                                <Button variant="link" size="sm" className="p-0 me-2">
                                  <i className="bi bi-download"></i>
                                </Button>
                                <Button variant="link" size="sm" className="p-0 text-danger">
                                  <i className="bi bi-trash"></i>
                                </Button>
                              </td>
                            </tr>
                            <tr>
                              <td>06/04/2025 01:00</td>
                              <td>Base de datos</td>
                              <td>14.8 MB</td>
                              <td>
                                <Button variant="link" size="sm" className="p-0 me-2">
                                  <i className="bi bi-download"></i>
                                </Button>
                                <Button variant="link" size="sm" className="p-0 text-danger">
                                  <i className="bi bi-trash"></i>
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="d-flex justify-content-end mt-3">
                        <Button variant="primary" className="btn-principal">
                          Guardar Configuración
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Configuracion;
