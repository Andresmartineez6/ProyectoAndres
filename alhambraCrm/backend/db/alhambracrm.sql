-- AlhambraCRM - Estructura de la base de datos
-- Creado para el proyecto AlhambraCRM

-- Eliminar base de datos si existe
DROP DATABASE IF EXISTS alhambracrm;

-- Crear base de datos
CREATE DATABASE alhambracrm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE alhambracrm;

-- Tabla de usuarios (para autenticación)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    tipo ENUM('admin', 'cliente', 'trabajador') NOT NULL,
    estado ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    empresa VARCHAR(100),
    cargo VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(200),
    ciudad VARCHAR(100),
    pais VARCHAR(100),
    codigo_postal VARCHAR(20),
    sector VARCHAR(100),
    notas TEXT,
    valor_cliente ENUM('bajo', 'medio', 'alto', 'vip') DEFAULT 'medio',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de trabajadores
CREATE TABLE trabajadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    departamento VARCHAR(100),
    cargo VARCHAR(100),
    telefono VARCHAR(20),
    fecha_contratacion DATE,
    salario DECIMAL(10,2),
    supervisor_id INT,
    estado ENUM('activo', 'vacaciones', 'baja') DEFAULT 'activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (supervisor_id) REFERENCES trabajadores(id) ON DELETE SET NULL
);

-- Tabla de proyectos
CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_cliente INT NOT NULL,
    responsable_id INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    presupuesto DECIMAL(10,2),
    estado ENUM('pendiente', 'en_progreso', 'completado', 'cancelado') DEFAULT 'pendiente',
    prioridad ENUM('baja', 'media', 'alta', 'urgente') DEFAULT 'media',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (responsable_id) REFERENCES trabajadores(id) ON DELETE SET NULL
);

-- Tabla de tareas
CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_proyecto INT,
    asignado_a INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado ENUM('pendiente', 'en_progreso', 'completada', 'cancelada') DEFAULT 'pendiente',
    prioridad ENUM('baja', 'media', 'alta', 'urgente') DEFAULT 'media',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id) ON DELETE CASCADE,
    FOREIGN KEY (asignado_a) REFERENCES trabajadores(id) ON DELETE SET NULL
);

-- Tabla de contactos (para la gestión de contactos de los clientes)
CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    cargo VARCHAR(100),
    es_principal BOOLEAN DEFAULT FALSE,
    notas TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Tabla de interacciones (para registrar comunicaciones con clientes)
CREATE TABLE interacciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo ENUM('llamada', 'email', 'reunion', 'nota') NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    contenido TEXT,
    fecha_interaccion DATETIME NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de recordatorios
CREATE TABLE recordatorios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_recordatorio DATETIME NOT NULL,
    completado BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de facturas
CREATE TABLE facturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(20) NOT NULL UNIQUE,
    id_cliente INT NOT NULL,
    id_proyecto INT,
    fecha_emision DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    impuestos DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'pagada', 'vencida', 'cancelada') DEFAULT 'pendiente',
    notas TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id) ON DELETE SET NULL
);

-- Tabla de detalles de factura
CREATE TABLE detalles_factura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_factura INT NOT NULL,
    concepto VARCHAR(200) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    importe DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_factura) REFERENCES facturas(id) ON DELETE CASCADE
);

-- Tabla de eventos del calendario
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    todo_el_dia BOOLEAN DEFAULT FALSE,
    color VARCHAR(7) DEFAULT '#00f7d3',
    recordatorio INT, -- Minutos antes del evento
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de configuración
CREATE TABLE configuracion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clave VARCHAR(50) NOT NULL UNIQUE,
    valor TEXT NOT NULL,
    descripcion VARCHAR(255),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================================
-- DATOS DE EJEMPLO
-- ============================================================================

-- Insertar datos de ejemplo para el administrador
INSERT INTO usuarios (email, contrasena, nombre, apellidos, tipo) 
VALUES ('admin@alhambracrm.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador', 'Sistema', 'admin');

-- Insertar datos de ejemplo para un cliente
INSERT INTO usuarios (email, contrasena, nombre, apellidos, tipo) 
VALUES ('cliente@ejemplo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Juan', 'Pérez', 'cliente');

INSERT INTO clientes (id_usuario, empresa, cargo, telefono, direccion, ciudad, pais, codigo_postal, sector)
VALUES (2, 'Empresa Ejemplo', 'Director General', '612345678', 'Calle Principal 123', 'Madrid', 'España', '28001', 'Tecnología');

-- Insertar datos de ejemplo para un trabajador
INSERT INTO usuarios (email, contrasena, nombre, apellidos, tipo) 
VALUES ('trabajador@alhambracrm.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ana', 'Gómez', 'trabajador');

INSERT INTO trabajadores (id_usuario, departamento, cargo, telefono, fecha_contratacion)
VALUES (3, 'Desarrollo', 'Desarrollador Web', '623456789', '2025-01-15');

-- Insertar datos de ejemplo para un proyecto
INSERT INTO proyectos (nombre, descripcion, id_cliente, responsable_id, fecha_inicio, fecha_fin, presupuesto, estado)
VALUES ('Desarrollo Web Corporativo', 'Creación de sitio web corporativo con área privada para clientes', 1, 1, '2025-04-01', '2025-06-30', 5000.00, 'en_progreso');

-- Insertar datos de ejemplo para tareas
INSERT INTO tareas (titulo, descripcion, id_proyecto, asignado_a, fecha_inicio, fecha_fin, estado)
VALUES ('Diseño de interfaz', 'Crear mockups y diseño visual del sitio web', 1, 1, '2025-04-01', '2025-04-15', 'completada');

INSERT INTO tareas (titulo, descripcion, id_proyecto, asignado_a, fecha_inicio, fecha_fin, estado)
VALUES ('Desarrollo frontend', 'Implementación HTML, CSS y JavaScript', 1, 1, '2025-04-16', '2025-05-15', 'en_progreso');

-- Insertar datos de ejemplo para contactos
INSERT INTO contactos (id_cliente, nombre, apellidos, email, telefono, cargo, es_principal)
VALUES (1, 'María', 'López', 'maria.lopez@empresaejemplo.com', '654321987', 'Directora de Marketing', TRUE);

-- Insertar datos de ejemplo para interacciones
INSERT INTO interacciones (id_cliente, id_usuario, tipo, asunto, contenido, fecha_interaccion)
VALUES (1, 1, 'reunion', 'Reunión inicial', 'Definición de requisitos y alcance del proyecto', '2025-04-01 10:00:00');

-- Insertar datos de ejemplo para recordatorios
INSERT INTO recordatorios (id_usuario, titulo, descripcion, fecha_recordatorio)
VALUES (1, 'Seguimiento cliente', 'Llamar para verificar satisfacción con el avance', '2025-05-01 09:00:00');

-- Insertar datos de ejemplo para eventos
INSERT INTO eventos (id_usuario, titulo, descripcion, fecha_inicio, fecha_fin)
VALUES (1, 'Presentación de avance', 'Mostrar el progreso del proyecto al cliente', '2025-05-15 15:00:00', '2025-05-15 16:30:00');

-- Insertar datos de ejemplo para configuración
INSERT INTO configuracion (clave, valor, descripcion)
VALUES ('nombre_empresa', 'AlhambraCRM', 'Nombre de la empresa');

INSERT INTO configuracion (clave, valor, descripcion)
VALUES ('email_contacto', 'info@alhambracrm.com', 'Email de contacto principal');

INSERT INTO configuracion (clave, valor, descripcion)
VALUES ('telefono_contacto', '636 60 85 69', 'Teléfono de contacto principal');

-- Insertar datos adicionales de ejemplo (usuarios)
INSERT INTO usuarios (email, contrasena, nombre, apellidos, tipo) 
VALUES ('juan@ejemplo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Juan', 'Pérez', 'cliente');

INSERT INTO usuarios (email, contrasena, nombre, apellidos, tipo) 
VALUES ('maria@ejemplo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'María', 'González', 'trabajador');

-- Cliente adicional
INSERT INTO clientes (id_usuario, empresa, cargo, telefono, sector)
VALUES (4, 'Empresa ABC', 'Director General', '912345678', 'Tecnología');

-- Trabajador adicional
INSERT INTO trabajadores (id_usuario, departamento, cargo)
VALUES (5, 'Tecnología', 'Desarrollador');

-- Proyecto adicional
INSERT INTO proyectos (nombre, descripcion, id_cliente, responsable_id, fecha_inicio, fecha_fin, presupuesto, estado)
VALUES ('Rediseño Web Corporativa', 'Rediseño completo de la web corporativa con nuevas funcionalidades', 
       2, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 60 DAY), 5000.00, 'en_progreso');

-- Contacto adicional
INSERT INTO contactos (id_cliente, nombre, apellidos, email, telefono)
VALUES (2, 'Ana', 'García', 'ana.garcia@empresaabc.com', '612345678');

-- Tarea adicional
INSERT INTO tareas (titulo, descripcion, id_proyecto, asignado_a, fecha_inicio, fecha_fin, estado, prioridad)
VALUES ('Diseñar nueva interfaz de usuario', 'Crear mockups y diseños para la nueva interfaz de usuario', 
       2, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 15 DAY), 'en_progreso', 'alta');

-- Interacción adicional
INSERT INTO interacciones (id_cliente, id_usuario, tipo, asunto, contenido, fecha_interaccion)
VALUES (2, 5, 'reunion', 'Reunión inicial de proyecto', 'Definición de requisitos y alcance del proyecto', NOW());

-- Recordatorio adicional
INSERT INTO recordatorios (id_usuario, titulo, descripcion, fecha_recordatorio)
VALUES (5, 'Enviar propuesta', 'Enviar propuesta detallada del proyecto', DATE_ADD(NOW(), INTERVAL 3 DAY));
