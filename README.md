<h1 align="center" style="font-size: 3rem; color: #3498db; margin-top: 2rem; margin-bottom: 1rem;">AlhambraCRM</h1>

<p align="center">
  <b>Sistema de gestión de relaciones con clientes moderno, potente y visual para empresas españolas</b>
</p>

<p align="center">
  <a href="#✨-características-principales"><img src="https://img.shields.io/badge/✨-Características-blue.svg" alt="Características"></a>
  <a href="#🚀-tecnologías"><img src="https://img.shields.io/badge/🚀-Tecnologías-green.svg" alt="Tecnologías"></a>
  <a href="#📊-capturas-de-pantalla"><img src="https://img.shields.io/badge/📊-Capturas-orange.svg" alt="Capturas"></a>
  <a href="#🛠️-instalación"><img src="https://img.shields.io/badge/🛠️-Instalación-red.svg" alt="Instalación"></a>
  <a href="#📋-estructura-del-proyecto"><img src="https://img.shields.io/badge/📋-Estructura-purple.svg" alt="Estructura"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Versión-2.0-blue.svg" alt="Versión">
  <img src="https://img.shields.io/badge/Licencia-MIT-green.svg" alt="Licencia">
  <img src="https://img.shields.io/badge/Estado-En%20desarrollo-orange.svg" alt="Estado">
  <img src="https://img.shields.io/badge/Hecho%20con-❤️-ff69b4.svg" alt="Hecho con amor">
</p>

<hr>

## 🌟 Introducción

**AlhambraCRM** es un sistema completo de gestión de relaciones con clientes diseñado específicamente para pequeñas y medianas empresas españolas. Inspirado en la elegancia y sofisticación de la Alhambra de Granada, este CRM combina una interfaz moderna y atractiva con potentes funcionalidades para ayudar a las empresas a gestionar sus relaciones con clientes, proyectos y equipos de trabajo de manera eficiente.

> "La gestión de clientes tan elegante como la Alhambra, tan potente como tu ambición"

<hr>

## ✨ Características Principales

### 👥 Gestión de Clientes
- **Perfiles Completos**: Almacena toda la información relevante de tus clientes
- **Segmentación Avanzada**: Clasifica clientes por categorías, estado y valor
- **Historial de Interacciones**: Registra todas las comunicaciones con cada cliente
- **Notas y Recordatorios**: Nunca olvides detalles importantes

### 📊 Informes y Análisis
- **Dashboards Personalizables**: Visualiza los KPIs más importantes para tu negocio
- **Informes Detallados**: Analiza el rendimiento de ventas, clientes y proyectos
- **Exportación a PDF y Excel**: Comparte informes con tu equipo o clientes
- **Gráficos Interactivos**: Visualiza tendencias y patrones con gráficos dinámicos

### 📋 Gestión de Proyectos
- **Seguimiento de Proyectos**: Controla el estado y progreso de cada proyecto
- **Asignación de Tareas**: Distribuye el trabajo entre tu equipo
- **Calendario Integrado**: Visualiza fechas clave y plazos
- **Presupuestos y Facturación**: Gestiona el aspecto financiero de tus proyectos

### 👨‍💼 Gestión de Equipo
- **Perfiles de Empleados**: Mantén actualizada la información de tu equipo
- **Asignación de Roles**: Define permisos y responsabilidades
- **Seguimiento de Actividad**: Monitoriza la productividad de tu equipo
- **Comunicación Interna**: Facilita la colaboración entre departamentos

### 🔄 Automatización
- **Flujos de Trabajo**: Automatiza procesos repetitivos
- **Notificaciones**: Recibe alertas sobre eventos importantes
- **Emails Automáticos**: Envía comunicaciones programadas a clientes
- **Seguimiento de Leads**: Nunca pierdas una oportunidad de venta

<hr>

## 🚀 Tecnologías

AlhambraCRM está construido con un stack tecnológico moderno y robusto:

### Frontend
- **React**: Biblioteca JavaScript para construir interfaces de usuario
- **Bootstrap**: Framework CSS para diseño responsive
- **Chart.js**: Biblioteca para visualización de datos
- **Axios**: Cliente HTTP para realizar peticiones a la API
- **jsPDF**: Biblioteca para generación de documentos PDF

### Backend
- **PHP**: Lenguaje de programación del lado del servidor
- **Arquitectura MVC**: Patrón de diseño para organizar el código
- **API RESTful**: Interfaz para comunicación entre frontend y backend

### Base de Datos
- **MySQL**: Sistema de gestión de bases de datos relacional

### Herramientas de Desarrollo
- **Git**: Control de versiones
- **npm**: Gestor de paquetes de Node.js
- **Docker**: Contenedorización para desarrollo y despliegue

<hr>

## 📊 Capturas de Pantalla

### Dashboard Administrativo
<p align="center">
  <img src="./docs/screenshots/dashboard-admin.png" width="90%" alt="Dashboard Administrativo" />
</p>

### Gestión de Clientes
<p align="center">
  <img src="./docs/screenshots/clientes.png" width="90%" alt="Gestión de Clientes" />
</p>

### Informes y Análisis
<p align="center">
  <img src="./docs/screenshots/informes.png" width="90%" alt="Informes y Análisis" />
</p>

### Página de Inicio
<p align="center">
  <img src="./docs/screenshots/inicio.png" width="90%" alt="Página de Inicio" />
</p>

<hr>

## 🛠️ Instalación

### Requisitos Previos
- PHP 7.4 o superior
- MySQL 5.7 o superior
- Node.js 14 o superior
- npm 6 o superior
- Docker (opcional)

### Instalación con Docker
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Andresmartineez6/ProyectoAndres.git
   cd ProyectoAndres
   ```

2. Inicia los contenedores con Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Accede a la aplicación en tu navegador:
   ```
   http://localhost:3000
   ```

### Instalación Manual
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Andresmartineez6/ProyectoAndres.git
   cd ProyectoAndres
   ```

2. Configura la base de datos:
   ```bash
   mysql -u root -p < alhambraCrm/backend/db/alhambracrm.sql
   ```

3. Configura el backend:
   ```bash
   cd alhambraCrm/backend
   # Edita el archivo config/database.php con tus credenciales de MySQL
   ```

4. Instala las dependencias del frontend:
   ```bash
   cd ../frontend_react
   npm install
   ```

5. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

6. Accede a la aplicación en tu navegador:
   ```
   http://localhost:3000
   ```

<hr>

## 📋 Estructura del Proyecto

```
alhambraCrm/
├── backend/                  # Backend PHP con arquitectura MVC
│   ├── api/                  # Endpoints de la API REST
│   ├── config/               # Configuración de la aplicación
│   ├── controladores/        # Controladores MVC
│   ├── db/                   # Scripts de base de datos
│   ├── modelos/              # Modelos de datos
│   └── utils/                # Utilidades y helpers
│
├── frontend_react/           # Frontend React
│   ├── public/               # Archivos públicos
│   │   └── assets/           # Imágenes, iconos y recursos
│   └── src/                  # Código fuente
│       ├── componentes/      # Componentes React reutilizables
│       ├── contexto/         # Contextos de React (autenticación, etc.)
│       ├── estilos/          # Archivos CSS globales
│       ├── paginas/          # Componentes de página
│       │   ├── admin/        # Páginas del panel de administración
│       │   ├── cliente/      # Páginas del área de cliente
│       │   └── publico/      # Páginas públicas (inicio, login, etc.)
│       ├── servicios/        # Servicios para comunicación con la API
│       └── utilidades/       # Funciones de utilidad
│
└── docker-compose.yml        # Configuración de Docker para desarrollo
```

<hr>

## 🌐 Despliegue

AlhambraCRM puede desplegarse en cualquier servidor que cumpla con los requisitos mínimos. Recomendamos:

- **Servidor Web**: Apache o Nginx
- **PHP**: 7.4 o superior
- **MySQL**: 5.7 o superior
- **Memoria RAM**: 2GB mínimo
- **Almacenamiento**: 10GB mínimo

Para un despliegue en producción, asegúrate de:
1. Configurar correctamente las variables de entorno
2. Optimizar la base de datos para producción
3. Habilitar HTTPS para conexiones seguras
4. Configurar copias de seguridad automáticas

<hr>

## 🔒 Seguridad

AlhambraCRM implementa diversas medidas de seguridad:

- **Autenticación Segura**: Sistema de login con protección contra ataques
- **Encriptación de Datos**: Información sensible almacenada de forma segura
- **Validación de Entradas**: Prevención de inyecciones SQL y XSS
- **Control de Acceso**: Permisos basados en roles
- **Auditoría**: Registro de actividades importantes

<hr>

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

<hr>

## 📞 Soporte

Si tienes alguna pregunta o problema, puedes:
- Abrir un issue en GitHub
- Contactar por email: soporte@alhambracrm.com
- Visitar nuestra documentación en línea: [docs.alhambracrm.com](https://docs.alhambracrm.com)

<hr>

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

<hr>

<p align="center">
  <b>AlhambraCRM</b> - Desarrollado con ❤️ por <a href="https://github.com/Andresmartineez6">Andrés Martínez</a>
</p>

<p align="center">
  © 2025 AlhambraCRM. Todos los derechos reservados.
</p>
