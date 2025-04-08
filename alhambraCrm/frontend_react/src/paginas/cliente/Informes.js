import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Dropdown } from 'react-bootstrap';
import './Informes.css';

const Informes = () => {
  const [tipoInforme, setTipoInforme] = useState('tareas');
  const [periodoTiempo, setPeriodoTiempo] = useState('mes');
  const [informeGenerado, setInformeGenerado] = useState(false);
  
  // Datos simulados para los informes
  const [datosInforme, setDatosInforme] = useState({
    tareas: {
      completadas: 24,
      pendientes: 8,
      enProgreso: 12,
      total: 44,
      porCategoria: [
        { categoria: 'Desarrollo', cantidad: 18 },
        { categoria: 'Diseño', cantidad: 12 },
        { categoria: 'Marketing', cantidad: 8 },
        { categoria: 'Administración', cantidad: 6 }
      ],
      porPrioridad: [
        { prioridad: 'Alta', cantidad: 15 },
        { prioridad: 'Media', cantidad: 20 },
        { prioridad: 'Baja', cantidad: 9 }
      ]
    },
    proyectos: {
      activos: 3,
      completados: 2,
      pendientes: 1,
      total: 6,
      porEstado: [
        { estado: 'Completado', cantidad: 2 },
        { estado: 'En progreso', cantidad: 3 },
        { estado: 'Pendiente', cantidad: 1 }
      ],
      presupuestoTotal: 28000,
      presupuestoPromedio: 4666
    },
    contactos: {
      total: 25,
      nuevos: 5,
      porEmpresa: [
        { empresa: 'Tecnología Avanzada SL', cantidad: 8 },
        { empresa: 'Innovación Digital', cantidad: 6 },
        { empresa: 'Soluciones Web', cantidad: 5 },
        { empresa: 'Otros', cantidad: 6 }
      ]
    }
  });
  
  const generarInforme = () => {
    // Aquí se haría la petición al backend para obtener los datos reales
    // Por ahora, simulamos un tiempo de carga
    setInformeGenerado(false);
    
    setTimeout(() => {
      setInformeGenerado(true);
    }, 1000);
  };
  
  const exportarInforme = (formato) => {
    // Aquí se implementaría la lógica para exportar el informe
    alert(`Informe exportado en formato ${formato}`);
  };
  
  // Renderizar el contenido del informe según el tipo seleccionado
  const renderizarInforme = () => {
    if (!informeGenerado) {
      return (
        <div className="informe-placeholder">
          <p>Selecciona los parámetros y haz clic en "Generar informe" para visualizar los datos.</p>
        </div>
      );
    }
    
    switch (tipoInforme) {
      case 'tareas':
        return renderizarInformeTareas();
      case 'proyectos':
        return renderizarInformeProyectos();
      case 'contactos':
        return renderizarInformeContactos();
      default:
        return null;
    }
  };
  
  const renderizarInformeTareas = () => {
    const datos = datosInforme.tareas;
    
    return (
      <div className="informe-contenido">
        <Row className="mb-4">
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica completadas">
                  <i className="bi bi-check-circle"></i>
                </div>
                <h3>{datos.completadas}</h3>
                <p>Tareas completadas</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica pendientes">
                  <i className="bi bi-hourglass-split"></i>
                </div>
                <h3>{datos.pendientes}</h3>
                <p>Tareas pendientes</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica en-progreso">
                  <i className="bi bi-arrow-repeat"></i>
                </div>
                <h3>{datos.enProgreso}</h3>
                <p>Tareas en progreso</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica total">
                  <i className="bi bi-list-check"></i>
                </div>
                <h3>{datos.total}</h3>
                <p>Total de tareas</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Tareas por categoría</h5>
              </Card.Header>
              <Card.Body>
                <div className="grafico-barras">
                  {datos.porCategoria.map((item, index) => (
                    <div key={index} className="barra-item">
                      <div className="barra-etiqueta">{item.categoria}</div>
                      <div className="barra-contenedor">
                        <div 
                          className="barra" 
                          style={{ 
                            width: `${(item.cantidad / Math.max(...datos.porCategoria.map(i => i.cantidad))) * 100}%`,
                            backgroundColor: index % 2 === 0 ? 'var(--color-primario)' : 'var(--color-secundario)'
                          }}
                        ></div>
                        <span className="barra-valor">{item.cantidad}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Tareas por prioridad</h5>
              </Card.Header>
              <Card.Body>
                <div className="grafico-circular">
                  <div className="grafico-circular-contenedor">
                    <div className="grafico-circular-placeholder">
                      <div className="segmento alta" style={{ transform: 'rotate(0deg)', clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)' }}></div>
                      <div className="segmento media" style={{ transform: 'rotate(130deg)', clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)' }}></div>
                      <div className="segmento baja" style={{ transform: 'rotate(260deg)', clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)' }}></div>
                      <div className="grafico-circular-centro"></div>
                    </div>
                  </div>
                  
                  <div className="grafico-circular-leyenda">
                    <div className="leyenda-item">
                      <div className="leyenda-color alta"></div>
                      <div className="leyenda-texto">
                        <span className="leyenda-etiqueta">Alta</span>
                        <span className="leyenda-valor">{datos.porPrioridad[0].cantidad} ({Math.round((datos.porPrioridad[0].cantidad / datos.total) * 100)}%)</span>
                      </div>
                    </div>
                    <div className="leyenda-item">
                      <div className="leyenda-color media"></div>
                      <div className="leyenda-texto">
                        <span className="leyenda-etiqueta">Media</span>
                        <span className="leyenda-valor">{datos.porPrioridad[1].cantidad} ({Math.round((datos.porPrioridad[1].cantidad / datos.total) * 100)}%)</span>
                      </div>
                    </div>
                    <div className="leyenda-item">
                      <div className="leyenda-color baja"></div>
                      <div className="leyenda-texto">
                        <span className="leyenda-etiqueta">Baja</span>
                        <span className="leyenda-valor">{datos.porPrioridad[2].cantidad} ({Math.round((datos.porPrioridad[2].cantidad / datos.total) * 100)}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  const renderizarInformeProyectos = () => {
    const datos = datosInforme.proyectos;
    
    return (
      <div className="informe-contenido">
        <Row className="mb-4">
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica activos">
                  <i className="bi bi-kanban"></i>
                </div>
                <h3>{datos.activos}</h3>
                <p>Proyectos activos</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica completados">
                  <i className="bi bi-check-circle"></i>
                </div>
                <h3>{datos.completados}</h3>
                <p>Proyectos completados</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica presupuesto">
                  <i className="bi bi-cash"></i>
                </div>
                <h3>{datos.presupuestoTotal}€</h3>
                <p>Presupuesto total</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica promedio">
                  <i className="bi bi-calculator"></i>
                </div>
                <h3>{datos.presupuestoPromedio}€</h3>
                <p>Presupuesto promedio</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col md={12}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Proyectos por estado</h5>
              </Card.Header>
              <Card.Body>
                <div className="grafico-estado-proyectos">
                  {datos.porEstado.map((item, index) => (
                    <div key={index} className="estado-proyecto-item">
                      <div className={`estado-proyecto-icono ${item.estado.toLowerCase().replace(' ', '-')}`}>
                        <i className={
                          item.estado === 'Completado' ? 'bi bi-check-circle' : 
                          item.estado === 'En progreso' ? 'bi bi-arrow-repeat' : 'bi bi-hourglass-split'
                        }></i>
                      </div>
                      <div className="estado-proyecto-info">
                        <h6>{item.estado}</h6>
                        <div className="estado-proyecto-barra">
                          <div 
                            className="barra" 
                            style={{ 
                              width: `${(item.cantidad / datos.total) * 100}%`,
                              backgroundColor: 
                                item.estado === 'Completado' ? '#28a745' : 
                                item.estado === 'En progreso' ? '#007bff' : '#fd7e14'
                            }}
                          ></div>
                        </div>
                        <div className="estado-proyecto-valores">
                          <span className="cantidad">{item.cantidad}</span>
                          <span className="porcentaje">{Math.round((item.cantidad / datos.total) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  const renderizarInformeContactos = () => {
    const datos = datosInforme.contactos;
    
    return (
      <div className="informe-contenido">
        <Row className="mb-4">
          <Col md={6}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica total">
                  <i className="bi bi-people"></i>
                </div>
                <h3>{datos.total}</h3>
                <p>Total de contactos</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="tarjeta-estadistica">
              <Card.Body>
                <div className="icono-estadistica nuevos">
                  <i className="bi bi-person-plus"></i>
                </div>
                <h3>{datos.nuevos}</h3>
                <p>Nuevos contactos</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Contactos por empresa</h5>
              </Card.Header>
              <Card.Body>
                <div className="grafico-dona">
                  <div className="grafico-dona-contenedor">
                    <div className="grafico-dona-placeholder">
                      <div className="dona-segmento empresa1"></div>
                      <div className="dona-segmento empresa2"></div>
                      <div className="dona-segmento empresa3"></div>
                      <div className="dona-segmento empresa4"></div>
                      <div className="grafico-dona-centro"></div>
                    </div>
                  </div>
                  
                  <div className="grafico-dona-leyenda">
                    {datos.porEmpresa.map((item, index) => (
                      <div key={index} className="leyenda-item">
                        <div className={`leyenda-color empresa${index + 1}`}></div>
                        <div className="leyenda-texto">
                          <span className="leyenda-etiqueta">{item.empresa}</span>
                          <span className="leyenda-valor">{item.cantidad} ({Math.round((item.cantidad / datos.total) * 100)}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  return (
    <div className="informes-cliente">
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <div className="cabecera-informes">
              <h1>Informes</h1>
              <div className="controles-informes">
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="dropdown-exportar">
                    <i className="bi bi-download"></i> Exportar
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => exportarInforme('PDF')}>
                      <i className="bi bi-file-pdf"></i> PDF
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => exportarInforme('Excel')}>
                      <i className="bi bi-file-excel"></i> Excel
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => exportarInforme('CSV')}>
                      <i className="bi bi-file-text"></i> CSV
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Tipo de informe</Form.Label>
                        <Form.Select 
                          value={tipoInforme} 
                          onChange={(e) => setTipoInforme(e.target.value)}
                        >
                          <option value="tareas">Informe de tareas</option>
                          <option value="proyectos">Informe de proyectos</option>
                          <option value="contactos">Informe de contactos</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Periodo de tiempo</Form.Label>
                        <Form.Select 
                          value={periodoTiempo} 
                          onChange={(e) => setPeriodoTiempo(e.target.value)}
                        >
                          <option value="semana">Última semana</option>
                          <option value="mes">Último mes</option>
                          <option value="trimestre">Último trimestre</option>
                          <option value="anio">Último año</option>
                          <option value="personalizado">Personalizado</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4} className="d-flex align-items-end">
                      <Button 
                        variant="primary" 
                        className="w-100 mb-3"
                        onClick={generarInforme}
                      >
                        <i className="bi bi-graph-up"></i> Generar informe
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card>
              <Card.Body>
                {renderizarInforme()}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Informes;
