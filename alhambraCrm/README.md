# AlhambraCRM

Sistema de gestión de clientes con funcionalidades completas para administrar clientes, proyectos, tareas y contactos.

## Características

- **Gestión de Clientes**: Registro, actualización y seguimiento de clientes.
- **Gestión de Proyectos**: Planificación y seguimiento de proyectos.
- **Gestión de Tareas**: Asignación y seguimiento de tareas.
- **Gestión de Contactos**: Organización de contactos relacionados con clientes.
- **Panel de Control**: Visualización de estadísticas y actividades recientes.
- **Autenticación**: Sistema de login con roles (administrador, cliente, trabajador).
- **Interfaz Moderna**: Diseño con tema oscuro, efectos y transiciones.

## Estructura del Proyecto

```
alhambraCrm/
├── backend/
│   ├── api/           # Endpoints de la API REST
│   ├── config/        # Configuración de la base de datos
│   ├── controladores/ # Controladores MVC
│   ├── db/            # Scripts SQL de la base de datos
│   ├── modelos/       # Modelos de datos
│   └── utils/         # Utilidades (respuestas, validaciones)
├── frontend/
│   ├── assets/        # Imágenes, iconos, etc.
│   ├── css/           # Estilos CSS
│   ├── html/          # Páginas HTML
│   └── js/            # Scripts JavaScript
└── docker-compose.yml # Configuración de Docker
```

## Requisitos

- PHP 7.4 o superior
- MySQL 5.7 o superior
- Servidor web (Apache, Nginx)
- Navegador web moderno

## Instalación

### Opción 1: Instalación Manual

1. Clona o descarga este repositorio en tu servidor web.
2. Crea una base de datos MySQL para la aplicación.
3. Importa el archivo `backend/db/alhambracrm.sql` para crear las tablas y datos de ejemplo.
4. Configura la conexión a la base de datos en `backend/config/database.php`.
5. Accede a la aplicación a través de tu navegador.

### Opción 2: Instalación con Docker

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Clona o descarga este repositorio.
3. Ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up -d
```

4. La aplicación estará disponible en `http://localhost:8080`.

## Acceso al Sistema

Por defecto, se crea un usuario administrador con las siguientes credenciales:

- **Email**: admin@alhambracrm.com
- **Contraseña**: admin123

## Configuración de la Base de Datos

Para configurar manualmente la conexión a la base de datos, edita el archivo `backend/config/database.php` con tus credenciales:

```php
private $host = "localhost";
private $db_name = "alhambracrm";
private $username = "tu_usuario";
private $password = "tu_contraseña";
```

## Uso del Sistema

1. **Iniciar Sesión**: Accede con tus credenciales según tu rol (administrador, cliente o trabajador).
2. **Panel de Control**: Visualiza estadísticas y actividades recientes.
3. **Gestión de Clientes**: Administra la información de tus clientes.
4. **Gestión de Proyectos**: Crea y gestiona proyectos asociados a clientes.
5. **Gestión de Tareas**: Asigna y realiza seguimiento de tareas dentro de los proyectos.
6. **Gestión de Contactos**: Organiza los contactos relacionados con tus clientes.

## Personalización

El sistema está diseñado para ser fácilmente personalizable:

- **Temas**: Modifica los archivos CSS en `frontend/css/temas/` para cambiar la apariencia.
- **Funcionalidades**: Extiende los modelos y controladores para añadir nuevas funcionalidades.
- **Interfaz**: Modifica las páginas HTML para adaptar la interfaz a tus necesidades.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
