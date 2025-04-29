/**
 * AlhambraCRM - Servicio API
 * Gestiona las comunicaciones con el backend a través de la API REST
 */

// Importar el servicio de autenticación
// const autenticacion = new Autenticacion(); // Comentado porque se cargará desde el archivo autenticacion.js

// Clase ApiServicio - Implementa el patrón Singleton
class ApiServicio {
    constructor() {
        // Evitar múltiples instancias
        if (ApiServicio.instancia) {
            return ApiServicio.instancia;
        }
        
        this.urlBase = '/alhambraCrm/backend/api';
        ApiServicio.instancia = this;
    }
    
    /**
     * Realizar una petición a la API
     * @param {string} endpoint - Endpoint de la API
     * @param {string} metodo - Método HTTP (GET, POST, PUT, DELETE)
     * @param {Object} datos - Datos a enviar en la petición
     * @param {boolean} autenticada - Indica si la petición requiere autenticación
     * @returns {Promise} - Promesa con la respuesta de la API
     */
    async peticion(endpoint, metodo = 'GET', datos = null, autenticada = true) {
        try {
            // Configurar opciones de la petición
            const opciones = {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            // Añadir token de autenticación si es necesario
            if (autenticada) {
                const token = autenticacion.obtenerToken();
                if (!token) {
                    throw new Error('No hay token de autenticación');
                }
                opciones.headers['Authorization'] = `Bearer ${token}`;
            }
            
            // Añadir cuerpo de la petición si hay datos
            if (datos && (metodo === 'POST' || metodo === 'PUT')) {
                opciones.body = JSON.stringify(datos);
            }
            
            // Realizar la petición
            const respuesta = await fetch(`${this.urlBase}/${endpoint}`, opciones);
            
            // Verificar si la respuesta es JSON
            const contentType = respuesta.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const datos = await respuesta.json();
                return datos;
            } else {
                const texto = await respuesta.text();
                return { exito: respuesta.ok, mensaje: texto };
            }
        } catch (error) {
            console.error('Error en petición API:', error);
            return { exito: false, mensaje: error.message };
        }
    }
    
    // Métodos específicos para cada entidad
    
    // Clientes
    async obtenerClientes() {
        return await this.peticion('clientes/obtener.php');
    }
    
    async obtenerCliente(id) {
        return await this.peticion(`clientes/obtener_uno.php?id=${id}`);
    }
    
    async crearCliente(datos) {
        return await this.peticion('clientes/crear.php', 'POST', datos);
    }
    
    async actualizarCliente(id, datos) {
        return await this.peticion(`clientes/actualizar.php?id=${id}`, 'PUT', datos);
    }
    
    async eliminarCliente(id) {
        return await this.peticion(`clientes/eliminar.php?id=${id}`, 'DELETE');
    }
    
    async buscarClientes(termino) {
        return await this.peticion(`clientes/buscar.php?s=${termino}`);
    }
    
    // Proyectos
    async obtenerProyectos() {
        return await this.peticion('proyectos/obtener.php');
    }
    
    async obtenerProyecto(id) {
        return await this.peticion(`proyectos/obtener_uno.php?id=${id}`);
    }
    
    async crearProyecto(datos) {
        return await this.peticion('proyectos/crear.php', 'POST', datos);
    }
    
    async actualizarProyecto(id, datos) {
        return await this.peticion(`proyectos/actualizar.php?id=${id}`, 'PUT', datos);
    }
    
    async eliminarProyecto(id) {
        return await this.peticion(`proyectos/eliminar.php?id=${id}`, 'DELETE');
    }
    
    // Tareas
    async obtenerTareas(idProyecto = null) {
        const endpoint = idProyecto 
            ? `tareas/obtener.php?id_proyecto=${idProyecto}`
            : 'tareas/obtener.php';
        return await this.peticion(endpoint);
    }
    
    async obtenerTarea(id) {
        return await this.peticion(`tareas/obtener_uno.php?id=${id}`);
    }
    
    async crearTarea(datos) {
        return await this.peticion('tareas/crear.php', 'POST', datos);
    }
    
    async actualizarTarea(id, datos) {
        return await this.peticion(`tareas/actualizar.php?id=${id}`, 'PUT', datos);
    }
    
    async eliminarTarea(id) {
        return await this.peticion(`tareas/eliminar.php?id=${id}`, 'DELETE');
    }
    
    // Contactos
    async obtenerContactos(idCliente = null) {
        const endpoint = idCliente 
            ? `contactos/obtener.php?id_cliente=${idCliente}`
            : 'contactos/obtener.php';
        return await this.peticion(endpoint);
    }
    
    async obtenerContacto(id) {
        return await this.peticion(`contactos/obtener_uno.php?id=${id}`);
    }
    
    async crearContacto(datos) {
        return await this.peticion('contactos/crear.php', 'POST', datos);
    }
    
    async actualizarContacto(id, datos) {
        return await this.peticion(`contactos/actualizar.php?id=${id}`, 'PUT', datos);
    }
    
    async eliminarContacto(id) {
        return await this.peticion(`contactos/eliminar.php?id=${id}`, 'DELETE');
    }
    
    // Interacciones
    async obtenerInteracciones(idCliente) {
        return await this.peticion(`interacciones/obtener.php?id_cliente=${idCliente}`);
    }
    
    async crearInteraccion(datos) {
        return await this.peticion('interacciones/crear.php', 'POST', datos);
    }
    
    // Eventos del calendario
    async obtenerEventos(fechaInicio, fechaFin) {
        return await this.peticion(`eventos/obtener.php?inicio=${fechaInicio}&fin=${fechaFin}`);
    }
    
    async crearEvento(datos) {
        return await this.peticion('eventos/crear.php', 'POST', datos);
    }
    
    async actualizarEvento(id, datos) {
        return await this.peticion(`eventos/actualizar.php?id=${id}`, 'PUT', datos);
    }
    
    async eliminarEvento(id) {
        return await this.peticion(`eventos/eliminar.php?id=${id}`, 'DELETE');
    }
    
    // Informes
    async obtenerInformeVentas(fechaInicio, fechaFin) {
        return await this.peticion(`informes/ventas.php?inicio=${fechaInicio}&fin=${fechaFin}`);
    }
    
    async obtenerInformeClientes() {
        return await this.peticion('informes/clientes.php');
    }
    
    async obtenerInformeProyectos(estado = null) {
        const endpoint = estado 
            ? `informes/proyectos.php?estado=${estado}`
            : 'informes/proyectos.php';
        return await this.peticion(endpoint);
    }
    
    // Usuarios y autenticación
    async login(email, contrasena) {
        return await this.peticion('usuarios/login.php', 'POST', { email, contrasena }, false);
    }
    
    async registro(datos) {
        return await this.peticion('usuarios/registro.php', 'POST', datos, false);
    }
    
    async obtenerPerfil() {
        return await this.peticion('usuarios/perfil.php');
    }
    
    async actualizarPerfil(datos) {
        return await this.peticion('usuarios/actualizar.php', 'PUT', datos);
    }
    
    async cambiarContrasena(contrasenaActual, nuevaContrasena) {
        return await this.peticion('usuarios/cambiar_contrasena.php', 'POST', {
            contrasena_actual: contrasenaActual,
            nueva_contrasena: nuevaContrasena
        });
    }
}

// Exportar una instancia única de ApiServicio
const api = new ApiServicio();
