/**
 * AlhambraCRM - Módulo de Autenticación
 * Gestiona la autenticación de usuarios y el control de acceso a las áreas privadas
 */

// Clase Autenticacion - Implementa el patrón Singleton
class Autenticacion {
    constructor() {
        // Evitar múltiples instancias
        if (Autenticacion.instancia) {
            return Autenticacion.instancia;
        }
        
        this.tokenKey = 'alhambracrm_token';
        this.usuarioKey = 'alhambracrm_usuario';
        this.urlBase = '/alhambraCrm/backend/api';
        
        Autenticacion.instancia = this;
    }
    
    /**
     * Iniciar sesión de usuario
     * @param {string} email - Email del usuario
     * @param {string} contrasena - Contraseña del usuario
     * @returns {Promise} - Promesa con el resultado del inicio de sesión
     */
    async iniciarSesion(email, contrasena) {
        try {
            const respuesta = await fetch(`${this.urlBase}/usuarios/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, contrasena })
            });
            
            const datos = await respuesta.json();
            
            if (datos.exito) {
                // Guardar token y datos del usuario
                localStorage.setItem(this.tokenKey, datos.token);
                localStorage.setItem(this.usuarioKey, JSON.stringify(datos.usuario));
                
                // Redirigir según el tipo de usuario
                this.redirigirSegunTipoUsuario(datos.usuario.tipo);
                return { exito: true, mensaje: datos.mensaje };
            } else {
                return { exito: false, mensaje: datos.mensaje };
            }
        } catch (error) {
            console.error('Error en inicio de sesión:', error);
            return { exito: false, mensaje: 'Error al conectar con el servidor' };
        }
    }
    
    /**
     * Cerrar sesión del usuario actual
     */
    cerrarSesion() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.usuarioKey);
        
        // Redirigir a la página de inicio
        window.location.href = '/alhambraCrm/frontend/html/index.html';
    }
    
    /**
     * Verificar si el usuario está autenticado
     * @returns {boolean} - true si está autenticado, false en caso contrario
     */
    estaAutenticado() {
        const token = localStorage.getItem(this.tokenKey);
        return !!token;
    }
    
    /**
     * Obtener el token de autenticación
     * @returns {string|null} - Token de autenticación o null si no existe
     */
    obtenerToken() {
        return localStorage.getItem(this.tokenKey);
    }
    
    /**
     * Obtener los datos del usuario actual
     * @returns {Object|null} - Datos del usuario o null si no existe
     */
    obtenerUsuario() {
        const usuarioJSON = localStorage.getItem(this.usuarioKey);
        return usuarioJSON ? JSON.parse(usuarioJSON) : null;
    }
    
    /**
     * Verificar si el usuario tiene un rol específico
     * @param {string} rol - Rol a verificar (admin, cliente, trabajador)
     * @returns {boolean} - true si tiene el rol, false en caso contrario
     */
    tieneRol(rol) {
        const usuario = this.obtenerUsuario();
        return usuario && usuario.tipo === rol;
    }
    
    /**
     * Redirigir al usuario según su tipo
     * @param {string} tipo - Tipo de usuario (admin, cliente, trabajador)
     */
    redirigirSegunTipoUsuario(tipo) {
        switch (tipo) {
            case 'admin':
                window.location.href = '/alhambraCrm/frontend/html/privado/admin/dashboard.html';
                break;
            case 'cliente':
                window.location.href = '/alhambraCrm/frontend/html/privado/cliente/dashboard.html';
                break;
            case 'trabajador':
                window.location.href = '/alhambraCrm/frontend/html/privado/trabajador/dashboard.html';
                break;
            default:
                window.location.href = '/alhambraCrm/frontend/html/index.html';
        }
    }
    
    /**
     * Proteger una página para que solo sea accesible por usuarios autenticados
     * @param {Array} rolesPermitidos - Roles que pueden acceder a la página
     */
    protegerPagina(rolesPermitidos = []) {
        if (!this.estaAutenticado()) {
            // Redirigir a la página de login
            window.location.href = '/alhambraCrm/frontend/html/login.html';
            return;
        }
        
        // Si hay roles específicos permitidos, verificar
        if (rolesPermitidos.length > 0) {
            const usuario = this.obtenerUsuario();
            if (!usuario || !rolesPermitidos.includes(usuario.tipo)) {
                // Redirigir a la página de acceso denegado
                window.location.href = '/alhambraCrm/frontend/html/acceso-denegado.html';
            }
        }
    }
}

// Exportar una instancia única de Autenticacion
const autenticacion = new Autenticacion();
