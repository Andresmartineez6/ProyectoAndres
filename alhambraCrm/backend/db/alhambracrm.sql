-- Script SQL para la base de datos de AlhambraCRM
-- Este script crea la base de datos y las tablas necesarias para el CRM

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS alhambracrm CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

-- Usar la base de datos
USE alhambracrm;

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    empresa VARCHAR(100),
    cargo VARCHAR(100),
    direccion VARCHAR(200),
    ciudad VARCHAR(100),
    pais VARCHAR(100),
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estado ENUM('activo', 'inactivo', 'potencial', 'perdido') NOT NULL DEFAULT 'activo',
    notas TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de usuarios del sistema
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'vendedor', 'soporte') NOT NULL DEFAULT 'vendedor',
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estado ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de contactos (personas asociadas a un cliente)
CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    cargo VARCHAR(100),
    es_principal BOOLEAN NOT NULL DEFAULT FALSE,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de oportunidades de venta
CREATE TABLE IF NOT EXISTS oportunidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    usuario_id INT NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    estado ENUM('nueva', 'contactado', 'propuesta', 'negociacion', 'ganada', 'perdida') NOT NULL DEFAULT 'nueva',
    fecha_cierre_estimada DATE,
    probabilidad INT NOT NULL DEFAULT 0,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    notas TEXT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de tareas
CREATE TABLE IF NOT EXISTS tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    cliente_id INT,
    oportunidad_id INT,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    tipo ENUM('llamada', 'reunion', 'email', 'visita', 'otro') NOT NULL,
    fecha_vencimiento DATETIME NOT NULL,
    estado ENUM('pendiente', 'completada', 'cancelada') NOT NULL DEFAULT 'pendiente',
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (oportunidad_id) REFERENCES oportunidades(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de interacciones con clientes
CREATE TABLE IF NOT EXISTS interacciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo ENUM('llamada', 'reunion', 'email', 'visita', 'otro') NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha DATETIME NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de productos/servicios
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(100),
    estado ENUM('activo', 'inactivo') NOT NULL DEFAULT 'activo',
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultima_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Tabla de productos en oportunidades
CREATE TABLE IF NOT EXISTS oportunidad_productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    oportunidad_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) NOT NULL DEFAULT 0,
    FOREIGN KEY (oportunidad_id) REFERENCES oportunidades(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Insertar un usuario administrador por defecto
-- Contraseña: admin123 (en un entorno real, usar password_hash)
INSERT INTO usuarios (nombre, apellidos, email, contrasena, rol)
VALUES ('Admin', 'AlhambraCRM', 'admin@alhambracrm.com', '$2y$10$8tGmGzgvGmQQLzZ1gXdgQeXfKNGdRmqPEgdEqc6ZYw.ZiYJsZyKQK', 'admin');

-- Insertar algunos clientes de ejemplo
INSERT INTO clientes (nombre, apellidos, email, telefono, empresa, cargo, ciudad, pais, estado)
VALUES 
('Juan', 'Pérez', 'juan.perez@horizon.com', '612345678', 'Horizon', 'CEO', 'Madrid', 'España', 'activo'),
('María', 'López', 'maria.lopez@techrius.com', '623456789', 'Techrius', 'Gerente', 'Barcelona', 'España', 'activo'),
('Carlos', 'Fernández', 'carlos.fernandez@traineds.com', '634567890', 'Traineds', 'CTO', 'Valencia', 'España', 'activo'),
('Ana', 'Martínez', 'ana.martinez@salorixa.com', '645678901', 'Salorixa', 'Directora', 'Sevilla', 'España', 'potencial'),
('Roberto', 'Sánchez', 'roberto.sanchez@debugged.com', '656789012', 'Debugged', 'Fundador', 'Bilbao', 'España', 'activo');

-- Insertar algunos productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, categoria)
VALUES 
('CRM Básico', 'Plan básico con funcionalidades esenciales', 29.99, 'Suscripción'),
('CRM Profesional', 'Plan profesional con funcionalidades avanzadas', 49.99, 'Suscripción'),
('CRM Empresarial', 'Plan empresarial con todas las funcionalidades', 99.99, 'Suscripción'),
('Implementación', 'Servicio de implementación y configuración', 499.99, 'Servicio'),
('Formación', 'Sesiones de formación para usuarios', 299.99, 'Servicio'),
('Soporte Premium', 'Soporte prioritario 24/7', 199.99, 'Servicio');
