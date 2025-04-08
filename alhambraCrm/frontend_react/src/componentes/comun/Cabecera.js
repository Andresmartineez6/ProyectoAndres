import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown, Modal, Form, Badge, ListGroup, Image } from 'react-bootstrap';
import { ContextoAutenticacion } from '../../contexto/ContextoAutenticacion';
import './Cabecera.css';

const Cabecera = () => {
  const { usuario, estaAutenticado, esAdmin, cerrarSesion, actualizarUsuario } = useContext(ContextoAutenticacion);
  const navigate = useNavigate();
  
  // Estados para notificaciones
  const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [contadorNotificaciones, setContadorNotificaciones] = useState(0);
  
  // Estados para perfil de usuario
  const [mostrarModalPerfil, setMostrarModalPerfil] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(usuario?.fotoPerfil || '');
  const [fotoPerfilPreview, setFotoPerfilPreview] = useState(usuario?.fotoPerfil || '');
  const [nombreUsuario, setNombreUsuario] = useState(usuario?.nombre || '');
  const [apellidosUsuario, setApellidosUsuario] = useState(usuario?.apellidos || '');
  const [emailUsuario, setEmailUsuario] = useState(usuario?.email || '');
  
  // Cargar notificaciones de ejemplo
  useEffect(() => {
    // En un entorno real, estas notificaciones vendrían de una API
    const notificacionesEjemplo = [
      {
        id: 1,
        tipo: 'info',
        mensaje: 'Bienvenido a AlhambraCRM',
        fecha: '2025-04-08T10:30:00',
        leida: false
      },
      {
        id: 2,
        tipo: 'success',
        mensaje: 'Proyecto "Desarrollo web" completado',
        fecha: '2025-04-07T15:45:00',
        leida: false
      },
      {
        id: 3,
        tipo: 'warning',
        mensaje: 'Reunión programada para mañana',
        fecha: '2025-04-06T09:15:00',
        leida: false
      },
      {
        id: 4,
        tipo: 'danger',
        mensaje: 'Tarea "Diseño de logo" vencida',
        fecha: '2025-04-05T18:20:00',
        leida: false
      },
      {
        id: 5,
        tipo: 'info',
        mensaje: 'Nuevo cliente registrado',
        fecha: '2025-04-04T11:10:00',
        leida: false
      }
    ];
    
    setNotificaciones(notificacionesEjemplo);
    setContadorNotificaciones(notificacionesEjemplo.filter(n => !n.leida).length);
  }, []);
  
  const handleCerrarSesion = () => {
    cerrarSesion(() => {
      navigate('/');
    });
  };
  
  // Manejar click en campana de notificaciones
  const toggleNotificaciones = (e) => {
    e.preventDefault();
    setMostrarNotificaciones(!mostrarNotificaciones);
  };
  
  // Marcar notificación como leída
  const marcarComoLeida = (id) => {
    const nuevasNotificaciones = notificaciones.map(notif => 
      notif.id === id ? { ...notif, leida: true } : notif
    );
    setNotificaciones(nuevasNotificaciones);
    setContadorNotificaciones(nuevasNotificaciones.filter(n => !n.leida).length);
  };
  
  // Marcar todas las notificaciones como leídas
  const marcarTodasComoLeidas = () => {
    const nuevasNotificaciones = notificaciones.map(notif => ({ ...notif, leida: true }));
    setNotificaciones(nuevasNotificaciones);
    setContadorNotificaciones(0);
  };
  
  // Eliminar notificación
  const eliminarNotificacion = (id) => {
    const nuevasNotificaciones = notificaciones.filter(notif => notif.id !== id);
    setNotificaciones(nuevasNotificaciones);
    setContadorNotificaciones(nuevasNotificaciones.filter(n => !n.leida).length);
  };
  
  // Formatear fecha de notificación
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(hoy.getDate() - 1);
    
    if (fecha.toDateString() === hoy.toDateString()) {
      return `Hoy ${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, '0')}`;
    } else if (fecha.toDateString() === ayer.toDateString()) {
      return `Ayer ${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return `${fecha.getDate()}/${fecha.getMonth() + 1} ${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, '0')}`;
    }
  };
  
  // Obtener ícono según tipo de notificación
  const getIconoNotificacion = (tipo) => {
    switch(tipo) {
      case 'success':
        return 'bi-check-circle-fill text-success';
      case 'warning':
        return 'bi-exclamation-triangle-fill text-warning';
      case 'danger':
        return 'bi-x-circle-fill text-danger';
      case 'info':
      default:
        return 'bi-info-circle-fill text-info';
    }
  };
  
  // Manejar cambio de foto de perfil
  const handleCambioFotoPerfil = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfilPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Guardar cambios de perfil
  const guardarCambiosPerfil = () => {
    const datosActualizados = {
      ...usuario,
      nombre: nombreUsuario,
      apellidos: apellidosUsuario,
      email: emailUsuario,
      fotoPerfil: fotoPerfilPreview
    };
    
    // En un entorno real, aquí se enviarían los datos a una API
    actualizarUsuario(datosActualizados);
    setFotoPerfil(fotoPerfilPreview);
    setMostrarModalPerfil(false);
  };
  
  // Componente de notificaciones
  const renderPanelNotificaciones = () => (
    <div className={`panel-notificaciones ${mostrarNotificaciones ? 'activo' : ''}`}>
      <div className="cabecera-notificaciones">
        <h5>Notificaciones</h5>
        <Button variant="link" size="sm" onClick={marcarTodasComoLeidas}>
          Marcar todas como leídas
        </Button>
      </div>
      
      <ListGroup className="lista-notificaciones">
        {notificaciones.length === 0 ? (
          <div className="sin-notificaciones">
            <i className="bi bi-bell-slash"></i>
            <p>No tienes notificaciones</p>
          </div>
        ) : (
          notificaciones.map(notif => (
            <ListGroup.Item 
              key={notif.id} 
              className={`notificacion-item ${notif.leida ? 'leida' : ''}`}
              onClick={() => marcarComoLeida(notif.id)}
            >
              <div className="icono-notificacion">
                <i className={`bi ${getIconoNotificacion(notif.tipo)}`}></i>
              </div>
              <div className="contenido-notificacion">
                <p className="mensaje-notificacion">{notif.mensaje}</p>
                <span className="fecha-notificacion">{formatearFecha(notif.fecha)}</span>
              </div>
              <Button 
                variant="link" 
                className="btn-eliminar-notificacion"
                onClick={(e) => {
                  e.stopPropagation();
                  eliminarNotificacion(notif.id);
                }}
              >
                <i className="bi bi-x"></i>
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </div>
  );
  
  // Renderizar cabecera para usuarios no autenticados
  const renderCabeceraPublica = () => {
    return (
      <header id="cabecera">
        <div className="barra-superior contenedor">
          <div className="logo">
            <Link to="/">
              <img src="/assets/imgs/Property 1=Default.png" alt="logo" />
            </Link>
          </div>
          <div className="info-contacto">
            <div className="email">
              <img src="/assets/imgs/emailLogoHeader.svg" alt="Email" />
              <div>
                <p className="titulo">Escríbenos</p>
                <p className="dato">info@alhambracrm.com</p>
              </div>
            </div>
            <div className="telefono">
              <img src="/assets/imgs/telefonoLogoHeader.svg" alt="Teléfono" />
              <div>
                <p className="titulo">Llámanos</p>
                <p className="dato">636 60 85 69</p>
              </div>
            </div>
            <Link to="/contacto" className="boton-principal">Solicitar demo gratis</Link>
          </div>
        </div>

        <nav className="menu-navegacion contenedor">
          <ul>
            <li className={window.location.pathname === '/' ? 'activo' : ''}>
              <Link to="/">Inicio</Link>
            </li>
            <li className={window.location.pathname === '/caracteristicas' ? 'activo' : ''}>
              <Link to="/caracteristicas">Características</Link>
            </li>
            <li className={window.location.pathname === '/precios' ? 'activo' : ''}>
              <Link to="/precios">Precios</Link>
            </li>
            <li className={window.location.pathname === '/contacto' ? 'activo' : ''}>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/login" className="boton-login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/registro" className="boton-registro">Registrarse</Link>
            </li>
          </ul>

          <div className="redes-sociales">
            <a href="#"><img src="/assets/imgs/icons8-facebook-nuevo.svg" alt="Facebook" /></a>
            <a href="#"><img src="/assets/imgs/icons8-x.svg" alt="Twitter" /></a>
            <a href="#"><img src="/assets/imgs/icons8-youtube.svg" alt="YouTube" /></a>
            <a href="#"><img src="/assets/imgs/icons8-instagram.svg" alt="Instagram" /></a>
          </div>
        </nav>
      </header>
    );
  };
  
  // Renderizar cabecera para administradores
  const renderCabeceraAdmin = () => {
    return (
      <header id="cabecera-admin" className="cabecera-mejorada">
        <div className="barra-superior">
          <div className="logo">
            <Link to="/admin/dashboard">
              <img src="/assets/logo-alhambra-blanco.svg" alt="AlhambraCRM" className="logo-blanco" />
            </Link>
          </div>
          
          <nav className="menu-navegacion">
            <ul>
              <li className={window.location.pathname === '/admin/dashboard' ? 'activo' : ''}>
                <Link to="/admin/dashboard">
                  <i className="bi bi-speedometer2"></i> Dashboard
                </Link>
              </li>
              <li className={window.location.pathname === '/admin/clientes' ? 'activo' : ''}>
                <Link to="/admin/clientes">
                  <i className="bi bi-people"></i> Clientes
                </Link>
              </li>
              <li className={window.location.pathname === '/admin/proyectos' ? 'activo' : ''}>
                <Link to="/admin/proyectos">
                  <i className="bi bi-kanban"></i> Proyectos
                </Link>
              </li>
              <li className={window.location.pathname === '/admin/trabajadores' ? 'activo' : ''}>
                <Link to="/admin/trabajadores">
                  <i className="bi bi-person-badge"></i> Trabajadores
                </Link>
              </li>
              <li className={window.location.pathname === '/admin/informes' ? 'activo' : ''}>
                <Link to="/admin/informes">
                  <i className="bi bi-file-earmark-text"></i> Informes
                </Link>
              </li>
              <li className={window.location.pathname === '/admin/calendario' ? 'activo' : ''}>
                <Link to="/admin/calendario">
                  <i className="bi bi-calendar3"></i> Calendario
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="usuario-info">
            <div className="notificaciones" onClick={toggleNotificaciones}>
              <i className="bi bi-bell"></i>
              {contadorNotificaciones > 0 && <span className="contador">{contadorNotificaciones}</span>}
            </div>
            
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-usuario" className="dropdown-usuario">
                <div className="avatar-usuario">
                  {fotoPerfil ? (
                    <Image src={fotoPerfil} roundedCircle />
                  ) : (
                    <span>{usuario?.nombre?.charAt(0)}{usuario?.apellidos?.charAt(0)}</span>
                  )}
                </div>
                <div className="nombre-usuario d-none d-md-block">
                  {usuario?.nombre} {usuario?.apellidos}
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => setMostrarModalPerfil(true)}>
                  <i className="bi bi-person"></i> Mi Perfil
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/admin/configuracion">
                  <i className="bi bi-gear"></i> Configuración
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleCerrarSesion}>
                  <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            {mostrarNotificaciones && renderPanelNotificaciones()}
          </div>
        </div>
      </header>
    );
  };

  // Renderizar cabecera para clientes
  const renderCabeceraCliente = () => {
    return (
      <header id="cabecera-cliente" className="cabecera-mejorada">
        <div className="barra-superior">
          <div className="logo">
            <Link to="/area-privada/dashboard">
              <img src="/assets/logo-alhambra-blanco.svg" alt="AlhambraCRM" className="logo-blanco" />
            </Link>
          </div>
          
          <nav className="menu-navegacion">
            <ul>
              <li className={window.location.pathname === '/area-privada/dashboard' ? 'activo' : ''}>
                <Link to="/area-privada/dashboard">
                  <i className="bi bi-speedometer2"></i> Dashboard
                </Link>
              </li>
              <li className={window.location.pathname === '/area-privada/proyectos' ? 'activo' : ''}>
                <Link to="/area-privada/proyectos">
                  <i className="bi bi-kanban"></i> Proyectos
                </Link>
              </li>
              <li className={window.location.pathname === '/area-privada/informes' ? 'activo' : ''}>
                <Link to="/area-privada/informes">
                  <i className="bi bi-file-earmark-text"></i> Informes
                </Link>
              </li>
              <li className={window.location.pathname === '/area-privada/calendario' ? 'activo' : ''}>
                <Link to="/area-privada/calendario">
                  <i className="bi bi-calendar3"></i> Calendario
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="usuario-info">
            <div className="notificaciones" onClick={toggleNotificaciones}>
              <i className="bi bi-bell"></i>
              {contadorNotificaciones > 0 && <span className="contador">{contadorNotificaciones}</span>}
            </div>
            
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-usuario" className="dropdown-usuario">
                <div className="avatar-usuario">
                  {fotoPerfil ? (
                    <Image src={fotoPerfil} roundedCircle />
                  ) : (
                    <span>{usuario?.nombre?.charAt(0)}{usuario?.apellidos?.charAt(0)}</span>
                  )}
                </div>
                <div className="nombre-usuario d-none d-md-block">
                  {usuario?.nombre} {usuario?.apellidos}
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => setMostrarModalPerfil(true)}>
                  <i className="bi bi-person"></i> Mi Perfil
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/area-privada/configuracion">
                  <i className="bi bi-gear"></i> Configuración
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleCerrarSesion}>
                  <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            {mostrarNotificaciones && renderPanelNotificaciones()}
          </div>
        </div>
      </header>
    );
  };
  
  // Modal de perfil de usuario
  const modalPerfil = (
    <Modal show={mostrarModalPerfil} onHide={() => setMostrarModalPerfil(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Mi Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <div className="avatar-perfil-grande mx-auto">
            {fotoPerfilPreview ? (
              <Image src={fotoPerfilPreview} roundedCircle className="img-fluid" />
            ) : (
              <span>{nombreUsuario?.charAt(0)}{apellidosUsuario?.charAt(0)}</span>
            )}
          </div>
          <div className="mt-3">
            <input
              type="file"
              id="upload-foto-perfil"
              className="d-none"
              accept="image/*"
              onChange={handleCambioFotoPerfil}
            />
            <label htmlFor="upload-foto-perfil" className="btn btn-outline-primary btn-sm">
              <i className="bi bi-camera"></i> Cambiar foto
            </label>
          </div>
        </div>
        
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              value={apellidosUsuario}
              onChange={(e) => setApellidosUsuario(e.target.value)}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={emailUsuario}
              onChange={(e) => setEmailUsuario(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalPerfil(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={guardarCambiosPerfil}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
  // Determinar qué cabecera mostrar según el estado de autenticación y el rol
  return (
    <>
      {!estaAutenticado() ? renderCabeceraPublica() : 
       esAdmin() ? renderCabeceraAdmin() : renderCabeceraCliente()}
      {modalPerfil}
    </>
  );
};

export default Cabecera;
