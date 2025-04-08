import React from 'react';
import { Link } from 'react-router-dom';
import './SeccionCaracteristicas.css';

const SeccionCaracteristicas = () => {
  const caracteristicas = [
    {
      icono: 'app-developer-icon-small-01.png',
      titulo: 'Dashboard intuitivo',
      descripcion: 'Visualiza toda tu información en un solo lugar. Acceso rápido a estadísticas, actividades recientes y métricas clave de clientes.'
    },
    {
      icono: 'app-developer-icon-small-08.png',
      titulo: 'Gestión de clientes',
      descripcion: 'Administra contactos y empresas de manera eficiente. Organización de clientes con perfiles detallados, historial de interacciones y notas.'
    },
    {
      icono: 'app-developer-icon-small-03.png',
      titulo: 'Automatización de tareas',
      descripcion: 'Ahorra tiempo con procesos automatizados. Automatiza seguimientos, envíos de correos y recordatorios de tareas.'
    },
    {
      icono: 'app-developer-icon-small-07.png',
      titulo: 'Informes personalizados',
      descripcion: 'Genera reportes de ventas y rendimiento con gráficos dinámicos. Crea informes visuales con filtros personalizados para análisis de rendimiento.'
    },
    {
      icono: 'app-developer-icon-small-04.png',
      titulo: 'Seguridad avanzada',
      descripcion: 'Protege la información de tus clientes con protocolos de seguridad robustos. Acceso controlado y encriptación.'
    },
    {
      icono: 'app-developer-icon-small-10.png',
      titulo: 'Integraciones',
      descripcion: 'Conéctate fácilmente con redes sociales y herramientas de marketing. Integración con herramientas clave para la productividad.'
    }
  ];

  return (
    <section id="seccion-caracteristicas">
      <div className="introduccion contenedor">
        <h3>Las características que simplifican tu trabajo</h3>
        <h2>Listado de funcionalidades destacadas</h2>
        <p>Con AlhambraCRM automatizarás y mejorarás en tus necesidades como cliente con el mejor servicio posible.</p>
      </div>

      <div className="tarjetas-caracteristicas contenedor">
        <div className="fila-tarjetas">
          {caracteristicas.slice(0, 3).map((caracteristica, index) => (
            <div className="tarjeta" key={index}>
              <img src={`/assets/imgs/${caracteristica.icono}`} alt={`Icono ${caracteristica.titulo}`} />
              <h3>{caracteristica.titulo}</h3>
              <p>{caracteristica.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="fila-tarjetas">
          {caracteristicas.slice(3, 6).map((caracteristica, index) => (
            <div className="tarjeta" key={index + 3}>
              <img src={`/assets/imgs/${caracteristica.icono}`} alt={`Icono ${caracteristica.titulo}`} />
              <h3>{caracteristica.titulo}</h3>
              <p>{caracteristica.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-contacto contenedor">
        <hr />
        <div className="contenido-contacto">
          <div className="texto-contacto">
            <h3>Contacta con nuestros comerciales</h3>
            <p>Lorem ipsum dolor sit amet, consecte adipiscing elit</p>
          </div>
          <div className="botones-contacto">
            <Link to="/contacto" className="boton-oscuro">Reserva tu cita</Link>
            <Link to="/caracteristicas" className="boton-bordeado">Ver detalles</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionCaracteristicas;
