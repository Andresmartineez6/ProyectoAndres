import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost/alhambraCrm/backend/api';

// Modo de desarrollo (usar datos de ejemplo)
const MODO_DESARROLLO = true;

// Configuración de axios con token de autenticación
const configurarAxios = () => {
  const token = localStorage.getItem('token');
  
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
};

// Datos de ejemplo para desarrollo
const datosMock = {
  clientes: [
    { id: 1, nombre: 'Empresa ABC', email: 'contacto@abc.com', telefono: '612345678', direccion: 'Calle Principal 123', ciudad: 'Granada', estado: 'Activo', fechaRegistro: '2025-01-15' },
    { id: 2, nombre: 'Corporación XYZ', email: 'info@xyz.com', telefono: '687654321', direccion: 'Avenida Central 456', ciudad: 'Sevilla', estado: 'Activo', fechaRegistro: '2025-02-20' },
    { id: 3, nombre: 'Industrias 123', email: 'ventas@123.com', telefono: '654123789', direccion: 'Plaza Mayor 789', ciudad: 'Madrid', estado: 'Pendiente', fechaRegistro: '2025-03-10' },
    { id: 4, nombre: 'Servicios Pro', email: 'admin@pro.com', telefono: '678912345', direccion: 'Calle Secundaria 321', ciudad: 'Barcelona', estado: 'Activo', fechaRegistro: '2025-03-25' }
  ],
  trabajadores: [
    { id: 1, nombre: 'Ana Martínez', email: 'ana@alhambra.com', telefono: '612345678', departamento: 'Ventas', cargo: 'Gerente de Ventas', estado: 'Activo', fechaContratacion: '2024-01-10' },
    { id: 2, nombre: 'Luis García', email: 'luis@alhambra.com', telefono: '687654321', departamento: 'Soporte', cargo: 'Técnico de Soporte', estado: 'Activo', fechaContratacion: '2024-02-15' },
    { id: 3, nombre: 'Elena Ruiz', email: 'elena@alhambra.com', telefono: '654123789', departamento: 'Desarrollo', cargo: 'Desarrolladora Senior', estado: 'Inactivo', fechaContratacion: '2024-03-05' },
    { id: 4, nombre: 'Carlos Sánchez', email: 'carlos@alhambra.com', telefono: '678912345', departamento: 'Marketing', cargo: 'Especialista en Marketing', estado: 'Activo', fechaContratacion: '2024-03-20' }
  ],
  proyectos: [
    { id: 1, nombre: 'Desarrollo de aplicación web', descripcion: 'Desarrollo de una aplicación web para gestión de inventario', fechaInicio: '2025-03-01', fechaFin: '2025-06-30', estado: 'En progreso', presupuesto: 15000, cliente: 'Empresa ABC', responsable: 'Elena Ruiz', progreso: 45 },
    { id: 2, nombre: 'Rediseño de marca', descripcion: 'Rediseño completo de la identidad corporativa', fechaInicio: '2025-02-15', fechaFin: '2025-04-15', estado: 'Completado', presupuesto: 8000, cliente: 'Corporación XYZ', responsable: 'Carlos Sánchez', progreso: 100 },
    { id: 3, nombre: 'Campaña de marketing digital', descripcion: 'Implementación de estrategia de marketing en redes sociales', fechaInicio: '2025-04-01', fechaFin: '2025-07-31', estado: 'Pendiente', presupuesto: 12000, cliente: 'Industrias 123', responsable: 'Ana Martínez', progreso: 10 }
  ],
  informes: [
    { id: 1, titulo: 'Informe de ventas Q1 2025', descripcion: 'Análisis detallado de las ventas del primer trimestre de 2025', tipo: 'Ventas', fechaCreacion: '2025-04-01', fechaActualizacion: '2025-04-05', autor: 'Ana Martínez', proyecto: 'Desarrollo de aplicación web', contenido: 'Este informe muestra un análisis detallado de las ventas del primer trimestre del año 2025. Se observa un incremento del 15% respecto al mismo período del año anterior.' },
    { id: 2, titulo: 'Informe financiero marzo 2025', descripcion: 'Resumen financiero del mes de marzo de 2025', tipo: 'Financiero', fechaCreacion: '2025-04-02', fechaActualizacion: '2025-04-02', autor: 'Luis García', proyecto: 'Rediseño de marca', contenido: 'Este informe presenta el estado financiero de la empresa durante el mes de marzo de 2025. Se incluyen ingresos, gastos y balance general.' },
    { id: 3, titulo: 'Informe de progreso de proyecto', descripcion: 'Estado actual del proyecto de desarrollo web', tipo: 'Proyecto', fechaCreacion: '2025-03-25', fechaActualizacion: '2025-04-03', autor: 'Elena Ruiz', proyecto: 'Desarrollo de aplicación web', contenido: 'Este informe detalla el avance del proyecto de desarrollo web. Se han completado las fases de diseño y se está avanzando en la implementación del backend.' }
  ],
  tareas: [
    { id: 1, titulo: 'Diseñar interfaz de usuario', descripcion: 'Crear wireframes y mockups para la aplicación', fechaCreacion: '2025-03-05', fechaVencimiento: '2025-03-15', estado: 'Completada', prioridad: 'Alta', asignado: 'Elena Ruiz', proyecto: 'Desarrollo de aplicación web' },
    { id: 2, titulo: 'Implementar backend', descripcion: 'Desarrollar API RESTful para la aplicación', fechaCreacion: '2025-03-16', fechaVencimiento: '2025-04-15', estado: 'En progreso', prioridad: 'Alta', asignado: 'Luis García', proyecto: 'Desarrollo de aplicación web' },
    { id: 3, titulo: 'Crear logo', descripcion: 'Diseñar nuevo logo corporativo', fechaCreacion: '2025-02-20', fechaVencimiento: '2025-03-10', estado: 'Completada', prioridad: 'Media', asignado: 'Carlos Sánchez', proyecto: 'Rediseño de marca' },
    { id: 4, titulo: 'Planificar campaña en redes sociales', descripcion: 'Definir estrategia y calendario de publicaciones', fechaCreacion: '2025-04-02', fechaVencimiento: '2025-04-20', estado: 'Pendiente', prioridad: 'Media', asignado: 'Ana Martínez', proyecto: 'Campaña de marketing digital' }
  ]
};

// Servicios para tareas
export const servicioTareas = {
  obtenerTodas: async (filtros = {}) => {
    if (MODO_DESARROLLO) {
      // Simular retraso de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filtrar tareas según los criterios
      let tareasFiltradas = [...datosMock.tareas];
      
      if (filtros.estado) {
        tareasFiltradas = tareasFiltradas.filter(tarea => tarea.estado === filtros.estado);
      }
      
      if (filtros.proyecto) {
        tareasFiltradas = tareasFiltradas.filter(tarea => tarea.proyecto === filtros.proyecto);
      }
      
      return tareasFiltradas;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get('/tareas', { params: filtros });
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      throw error;
    }
  },
  
  obtenerPorId: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const tarea = datosMock.tareas.find(t => t.id === parseInt(id));
      if (!tarea) throw new Error(`Tarea con ID ${id} no encontrada`);
      return tarea;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get(`/tareas/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al obtener tarea con ID ${id}:`, error);
      throw error;
    }
  },
  
  crear: async (datosTarea) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 700));
      const nuevaTarea = {
        ...datosTarea,
        id: datosMock.tareas.length > 0 ? Math.max(...datosMock.tareas.map(t => t.id)) + 1 : 1,
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      datosMock.tareas.push(nuevaTarea);
      return nuevaTarea;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.post('/tareas', datosTarea);
      return respuesta.data;
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw error;
    }
  },
  
  actualizar: async (id, datosTarea) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const tarea = datosMock.tareas.find(t => t.id === parseInt(id));
      if (!tarea) throw new Error(`Tarea con ID ${id} no encontrada`);
      Object.assign(tarea, datosTarea);
      return tarea;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.put(`/tareas/${id}`, datosTarea);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al actualizar tarea con ID ${id}:`, error);
      throw error;
    }
  },
  
  eliminar: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const tarea = datosMock.tareas.find(t => t.id === parseInt(id));
      if (!tarea) throw new Error(`Tarea con ID ${id} no encontrada`);
      datosMock.tareas = datosMock.tareas.filter(t => t.id !== parseInt(id));
      return tarea;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.delete(`/tareas/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al eliminar tarea con ID ${id}:`, error);
      throw error;
    }
  }
};

// Servicios para proyectos
export const servicioProyectos = {
  obtenerTodos: async (filtros = {}) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      let proyectosFiltrados = [...datosMock.proyectos];
      
      if (filtros.estado) {
        proyectosFiltrados = proyectosFiltrados.filter(proyecto => proyecto.estado === filtros.estado);
      }
      
      if (filtros.cliente) {
        proyectosFiltrados = proyectosFiltrados.filter(proyecto => proyecto.cliente === filtros.cliente);
      }
      
      return proyectosFiltrados;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get('/proyectos', { params: filtros });
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      throw error;
    }
  },
  
  obtenerPorId: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const proyecto = datosMock.proyectos.find(p => p.id === parseInt(id));
      if (!proyecto) throw new Error(`Proyecto con ID ${id} no encontrado`);
      return proyecto;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get(`/proyectos/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al obtener proyecto con ID ${id}:`, error);
      throw error;
    }
  },
  
  crear: async (datosProyecto) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const nuevoProyecto = {
        ...datosProyecto,
        id: datosMock.proyectos.length > 0 ? Math.max(...datosMock.proyectos.map(p => p.id)) + 1 : 1,
        progreso: 0
      };
      datosMock.proyectos.push(nuevoProyecto);
      return nuevoProyecto;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.post('/proyectos', datosProyecto);
      return respuesta.data;
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      throw error;
    }
  },
  
  actualizar: async (id, datosProyecto) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const proyecto = datosMock.proyectos.find(p => p.id === parseInt(id));
      if (!proyecto) throw new Error(`Proyecto con ID ${id} no encontrado`);
      Object.assign(proyecto, datosProyecto);
      return proyecto;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.put(`/proyectos/${id}`, datosProyecto);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al actualizar proyecto con ID ${id}:`, error);
      throw error;
    }
  },
  
  eliminar: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const proyecto = datosMock.proyectos.find(p => p.id === parseInt(id));
      if (!proyecto) throw new Error(`Proyecto con ID ${id} no encontrado`);
      datosMock.proyectos = datosMock.proyectos.filter(p => p.id !== parseInt(id));
      return proyecto;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.delete(`/proyectos/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al eliminar proyecto con ID ${id}:`, error);
      throw error;
    }
  }
};

// Servicios para informes
export const servicioInformes = {
  obtenerTodos: async (filtros = {}) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 550));
      
      let informesFiltrados = [...datosMock.informes];
      
      if (filtros.tipo) {
        informesFiltrados = informesFiltrados.filter(informe => informe.tipo === filtros.tipo);
      }
      
      if (filtros.proyecto) {
        informesFiltrados = informesFiltrados.filter(informe => informe.proyecto === filtros.proyecto);
      }
      
      return informesFiltrados;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get('/informes', { params: filtros });
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener informes:', error);
      throw error;
    }
  },
  
  obtenerPorId: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const informe = datosMock.informes.find(i => i.id === parseInt(id));
      if (!informe) throw new Error(`Informe con ID ${id} no encontrado`);
      return informe;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get(`/informes/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al obtener informe con ID ${id}:`, error);
      throw error;
    }
  },
  
  crear: async (datosInforme) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 700));
      const nuevoInforme = {
        ...datosInforme,
        id: datosMock.informes.length > 0 ? Math.max(...datosMock.informes.map(i => i.id)) + 1 : 1,
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      datosMock.informes.push(nuevoInforme);
      return nuevoInforme;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.post('/informes', datosInforme);
      return respuesta.data;
    } catch (error) {
      console.error('Error al crear informe:', error);
      throw error;
    }
  },
  
  actualizar: async (id, datosInforme) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const informe = datosMock.informes.find(i => i.id === parseInt(id));
      if (!informe) throw new Error(`Informe con ID ${id} no encontrado`);
      Object.assign(informe, datosInforme);
      return informe;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.put(`/informes/${id}`, datosInforme);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al actualizar informe con ID ${id}:`, error);
      throw error;
    }
  },
  
  eliminar: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      const informe = datosMock.informes.find(i => i.id === parseInt(id));
      if (!informe) throw new Error(`Informe con ID ${id} no encontrado`);
      datosMock.informes = datosMock.informes.filter(i => i.id !== parseInt(id));
      return informe;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.delete(`/informes/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al eliminar informe con ID ${id}:`, error);
      throw error;
    }
  },
  
  exportar: async (id, formato = 'pdf') => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const informe = datosMock.informes.find(i => i.id === parseInt(id));
      if (!informe) throw new Error(`Informe con ID ${id} no encontrado`);
      return {
        contenido: `Este es el contenido del informe ${informe.titulo} en formato ${formato}`,
        tipo: formato
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get(`/informes/${id}/exportar`, { 
        params: { formato },
        responseType: 'blob'
      });
      return respuesta.data;
    } catch (error) {
      console.error(`Error al exportar informe con ID ${id}:`, error);
      throw error;
    }
  }
};

// Servicios para usuarios (clientes y trabajadores)
export const servicioUsuarios = {
  obtenerTodos: async (filtros = {}) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (filtros.tipo === 'cliente') {
        return [...datosMock.clientes];
      } else if (filtros.tipo === 'trabajador') {
        return [...datosMock.trabajadores];
      } else {
        // Si no se especifica tipo, devolver todos
        return [...datosMock.clientes, ...datosMock.trabajadores];
      }
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get('/usuarios', { params: filtros });
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  },
  
  obtenerPorId: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Buscar en clientes y trabajadores
      const cliente = datosMock.clientes.find(c => c.id === parseInt(id));
      if (cliente) return { ...cliente, tipo: 'cliente' };
      
      const trabajador = datosMock.trabajadores.find(t => t.id === parseInt(id));
      if (trabajador) return { ...trabajador, tipo: 'trabajador' };
      
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get(`/usuarios/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw error;
    }
  },
  
  crear: async (datosUsuario) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      if (datosUsuario.tipo === 'cliente') {
        const nuevoCliente = {
          ...datosUsuario,
          id: datosMock.clientes.length > 0 ? Math.max(...datosMock.clientes.map(c => c.id)) + 1 : 1,
          fechaRegistro: new Date().toISOString().split('T')[0]
        };
        datosMock.clientes.push(nuevoCliente);
        return nuevoCliente;
      } else if (datosUsuario.tipo === 'trabajador') {
        const nuevoTrabajador = {
          ...datosUsuario,
          id: datosMock.trabajadores.length > 0 ? Math.max(...datosMock.trabajadores.map(t => t.id)) + 1 : 1,
          fechaContratacion: new Date().toISOString().split('T')[0]
        };
        datosMock.trabajadores.push(nuevoTrabajador);
        return nuevoTrabajador;
      } else {
        throw new Error('Tipo de usuario no válido');
      }
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.post('/usuarios', datosUsuario);
      return respuesta.data;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  },
  
  actualizar: async (id, datosUsuario) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Buscar en clientes y trabajadores
      const cliente = datosMock.clientes.find(c => c.id === parseInt(id));
      if (cliente) {
        Object.assign(cliente, datosUsuario);
        return cliente;
      }
      
      const trabajador = datosMock.trabajadores.find(t => t.id === parseInt(id));
      if (trabajador) {
        Object.assign(trabajador, datosUsuario);
        return trabajador;
      }
      
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.put(`/usuarios/${id}`, datosUsuario);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error);
      throw error;
    }
  },
  
  eliminar: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Buscar en clientes y trabajadores
      const cliente = datosMock.clientes.find(c => c.id === parseInt(id));
      if (cliente) {
        datosMock.clientes = datosMock.clientes.filter(c => c.id !== parseInt(id));
        return cliente;
      }
      
      const trabajador = datosMock.trabajadores.find(t => t.id === parseInt(id));
      if (trabajador) {
        datosMock.trabajadores = datosMock.trabajadores.filter(t => t.id !== parseInt(id));
        return trabajador;
      }
      
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.delete(`/usuarios/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error);
      throw error;
    }
  }
};

// Servicios para configuración del sistema
export const servicioConfiguracion = {
  obtenerGeneral: async () => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        nombreEmpresa: 'AlhambraCRM',
        logoEmpresa: '/assets/imgs/logo.png',
        colorPrimario: '#3498db',
        colorSecundario: '#2ecc71',
        idiomaPredeterminado: 'es',
        zonaHoraria: 'Europe/Madrid',
        formatoFecha: 'DD/MM/YYYY',
        formatoHora: '24h'
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get('/configuracion/general');
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener configuración general:', error);
      throw error;
    }
  },
  
  guardarGeneral: async (datosConfiguracion) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return datosConfiguracion;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.put('/configuracion/general', datosConfiguracion);
      return respuesta.data;
    } catch (error) {
      console.error('Error al guardar configuración general:', error);
      throw error;
    }
  },
  
  obtenerCorreo: async () => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        servidorSmtp: 'smtp.gmail.com',
        puertoSmtp: 587,
        usuarioSmtp: 'alhambra.crm@gmail.com',
        contrasenaSmtp: 'password',
        asuntoPredeterminado: 'Correo electrónico desde AlhambraCRM',
        cuerpoPredeterminado: 'Este es el cuerpo del correo electrónico'
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get('/configuracion/correo');
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener configuración de correo:', error);
      throw error;
    }
  },
  
  guardarCorreo: async (datosConfiguracion) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return datosConfiguracion;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.put('/configuracion/correo', datosConfiguracion);
      return respuesta.data;
    } catch (error) {
      console.error('Error al guardar configuración de correo:', error);
      throw error;
    }
  },
  
  probarCorreo: async (datosConfiguracion) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        mensaje: 'Correo electrónico enviado correctamente'
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.post('/configuracion/correo/probar', datosConfiguracion);
      return respuesta.data;
    } catch (error) {
      console.error('Error al probar configuración de correo:', error);
      throw error;
    }
  },
  
  obtenerNotificaciones: async () => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        notificacionesActivadas: true,
        tipoNotificaciones: ['email', 'sms'],
        asuntoNotificacion: 'Notificación desde AlhambraCRM',
        cuerpoNotificacion: 'Este es el cuerpo de la notificación'
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get('/configuracion/notificaciones');
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener configuración de notificaciones:', error);
      throw error;
    }
  },
  
  guardarNotificaciones: async (datosConfiguracion) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return datosConfiguracion;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.put('/configuracion/notificaciones', datosConfiguracion);
      return respuesta.data;
    } catch (error) {
      console.error('Error al guardar configuración de notificaciones:', error);
      throw error;
    }
  },
  
  obtenerSeguridad: async () => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        autenticacionActivada: true,
        tipoAutenticacion: 'local',
        claveSecreta: 'clave_secreta',
        tiempoSesion: 30
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get('/configuracion/seguridad');
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener configuración de seguridad:', error);
      throw error;
    }
  },
  
  guardarSeguridad: async (datosConfiguracion) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return datosConfiguracion;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.put('/configuracion/seguridad', datosConfiguracion);
      return respuesta.data;
    } catch (error) {
      console.error('Error al guardar configuración de seguridad:', error);
      throw error;
    }
  },
  
  obtenerBackup: async () => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        backupActivado: true,
        tipoBackup: 'local',
        rutaBackup: '/backup',
        frecuenciaBackup: 'diario'
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get('/configuracion/backup');
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener configuración de backup:', error);
      throw error;
    }
  },
  
  guardarBackup: async (datosConfiguracion) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return datosConfiguracion;
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.put('/configuracion/backup', datosConfiguracion);
      return respuesta.data;
    } catch (error) {
      console.error('Error al guardar configuración de backup:', error);
      throw error;
    }
  },
  
  crearBackup: async (tipo) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        mensaje: 'Backup creado correctamente'
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.post('/configuracion/backup/crear', { tipo });
      return respuesta.data;
    } catch (error) {
      console.error('Error al crear backup:', error);
      throw error;
    }
  },
  
  descargarBackup: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        contenido: 'Este es el contenido del backup',
        tipo: 'application/zip'
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.get(`/configuracion/backup/${id}/descargar`, {
        responseType: 'blob'
      });
      return respuesta.data;
    } catch (error) {
      console.error(`Error al descargar backup con ID ${id}:`, error);
      throw error;
    }
  },
  
  eliminarBackup: async (id) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return {
        mensaje: 'Backup eliminado correctamente'
      };
    }
    
    try {
      const api = configurarAxios();
      const respuesta = await api.delete(`/configuracion/backup/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(`Error al eliminar backup con ID ${id}:`, error);
      throw error;
    }
  }
};

// Servicios para autenticación
export const servicioAutenticacion = {
  iniciarSesion: async (credenciales) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const usuario = datosMock.trabajadores.find(t => t.email === credenciales.email && t.contrasena === credenciales.contrasena);
      if (!usuario) throw new Error('Credenciales inválidas');
      
      return {
        token: 'token_de_autenticacion',
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          departamento: usuario.departamento,
          cargo: usuario.cargo
        }
      };
    }
    
    try {
      const api = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const respuesta = await api.post('/auth/login', credenciales);
      
      // Guardar token en localStorage
      if (respuesta.data.token) {
        localStorage.setItem('token', respuesta.data.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario));
      }
      
      return respuesta.data;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },
  
  registrar: async (datosUsuario) => {
    if (MODO_DESARROLLO) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const nuevoTrabajador = {
        ...datosUsuario,
        id: datosMock.trabajadores.length > 0 ? Math.max(...datosMock.trabajadores.map(t => t.id)) + 1 : 1,
        fechaContratacion: new Date().toISOString().split('T')[0]
      };
      datosMock.trabajadores.push(nuevoTrabajador);
      
      return {
        token: 'token_de_autenticacion',
        usuario: {
          id: nuevoTrabajador.id,
          nombre: nuevoTrabajador.nombre,
          email: nuevoTrabajador.email,
          departamento: nuevoTrabajador.departamento,
          cargo: nuevoTrabajador.cargo
        }
      };
    }
    
    try {
      const api = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const respuesta = await api.post('/auth/registro', datosUsuario);
      
      // Guardar token en localStorage si el registro incluye inicio de sesión
      if (respuesta.data.token) {
        localStorage.setItem('token', respuesta.data.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.data.usuario));
      }
      
      return respuesta.data;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  },
  
  cerrarSesion: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },
  
  obtenerUsuarioActual: () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  },
  
  estaAutenticado: () => {
    return !!localStorage.getItem('token');
  }
};

// Exportar todos los servicios juntos
export default {
  tareas: servicioTareas,
  proyectos: servicioProyectos,
  informes: servicioInformes,
  usuarios: servicioUsuarios,
  autenticacion: servicioAutenticacion,
  configuracion: servicioConfiguracion
};
