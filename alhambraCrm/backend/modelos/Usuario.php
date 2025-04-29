<?php
/**
 * Modelo Usuario
 * AlhambraCRM - Sistema de gestión de clientes
 */

class Usuario {
    // Conexión a la base de datos y nombre de la tabla
    private $conn;
    private $tabla = "usuarios";

    // Propiedades del objeto
    public $id;
    public $nombre;
    public $apellidos;
    public $email;
    public $contrasena;
    public $tipo; // admin, cliente, trabajador
    public $estado; // activo, inactivo
    public $fecha_creacion;
    public $fecha_actualizacion;

    // Constructor con la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db;
    }

    // Verificar si el usuario existe por email y contraseña (login)
    public function login() {
        // Consulta SQL
        $query = "SELECT 
                    u.id, u.nombre, u.apellidos, u.email, u.contrasena, u.tipo, u.estado,
                    u.fecha_creacion, u.fecha_actualizacion
                FROM 
                    " . $this->tabla . " u
                WHERE 
                    u.email = ?
                LIMIT 0,1";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar
        $this->email = htmlspecialchars(strip_tags($this->email));

        // Vincular el email
        $stmt->bindParam(1, $this->email);

        // Ejecutar la consulta
        $stmt->execute();

        // Verificar si se encontró el usuario
        if($stmt->rowCount() > 0) {
            // Obtener el registro
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Verificar la contraseña
            if(password_verify($this->contrasena, $row['contrasena'])) {
                // Verificar si el usuario está activo
                if($row['estado'] != 'activo') {
                    return false;
                }
                
                // Establecer los valores a las propiedades del objeto
                $this->id = $row['id'];
                $this->nombre = $row['nombre'];
                $this->apellidos = $row['apellidos'];
                $this->tipo = $row['tipo'];
                $this->estado = $row['estado'];
                $this->fecha_creacion = $row['fecha_creacion'];
                $this->fecha_actualizacion = $row['fecha_actualizacion'];
                
                return true;
            }
        }

        return false;
    }

    // Registrar un nuevo usuario
    public function crear() {
        // Consulta SQL
        $query = "INSERT INTO 
                    " . $this->tabla . "
                SET 
                    nombre=:nombre, 
                    apellidos=:apellidos, 
                    email=:email, 
                    contrasena=:contrasena, 
                    tipo=:tipo, 
                    estado=:estado";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellidos = htmlspecialchars(strip_tags($this->apellidos));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->contrasena = htmlspecialchars(strip_tags($this->contrasena));
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));
        $this->estado = htmlspecialchars(strip_tags($this->estado));

        // Encriptar la contraseña
        $hash_contrasena = password_hash($this->contrasena, PASSWORD_BCRYPT);

        // Vincular los valores
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellidos", $this->apellidos);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":contrasena", $hash_contrasena);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":estado", $this->estado);

        // Ejecutar la consulta
        if($stmt->execute()) {
            // Obtener el ID generado
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    // Verificar si el email ya existe
    public function emailExiste() {
        // Consulta SQL
        $query = "SELECT id FROM " . $this->tabla . " WHERE email = ? LIMIT 0,1";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar
        $this->email = htmlspecialchars(strip_tags($this->email));

        // Vincular el email
        $stmt->bindParam(1, $this->email);

        // Ejecutar la consulta
        $stmt->execute();

        // Verificar si se encontró el email
        if($stmt->rowCount() > 0) {
            return true;
        }

        return false;
    }

    // Obtener un usuario por ID
    public function obtenerPorId() {
        // Consulta SQL
        $query = "SELECT 
                    u.id, u.nombre, u.apellidos, u.email, u.tipo, u.estado,
                    u.fecha_creacion, u.fecha_actualizacion
                FROM 
                    " . $this->tabla . " u
                WHERE 
                    u.id = ?
                LIMIT 0,1";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Vincular el ID
        $stmt->bindParam(1, $this->id);

        // Ejecutar la consulta
        $stmt->execute();

        // Verificar si se encontró el usuario
        if($stmt->rowCount() > 0) {
            // Obtener el registro
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Establecer los valores a las propiedades del objeto
            $this->nombre = $row['nombre'];
            $this->apellidos = $row['apellidos'];
            $this->email = $row['email'];
            $this->tipo = $row['tipo'];
            $this->estado = $row['estado'];
            $this->fecha_creacion = $row['fecha_creacion'];
            $this->fecha_actualizacion = $row['fecha_actualizacion'];
            
            return true;
        }

        return false;
    }

    // Actualizar un usuario
    public function actualizar() {
        // Consulta SQL
        $query = "UPDATE
                    " . $this->tabla . "
                SET
                    nombre=:nombre, 
                    apellidos=:apellidos, 
                    email=:email, 
                    tipo=:tipo, 
                    estado=:estado
                WHERE
                    id=:id";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellidos = htmlspecialchars(strip_tags($this->apellidos));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->tipo = htmlspecialchars(strip_tags($this->tipo));
        $this->estado = htmlspecialchars(strip_tags($this->estado));

        // Vincular los valores
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellidos", $this->apellidos);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":tipo", $this->tipo);
        $stmt->bindParam(":estado", $this->estado);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Actualizar la contraseña de un usuario
    public function actualizarContrasena() {
        // Consulta SQL
        $query = "UPDATE
                    " . $this->tabla . "
                SET
                    contrasena=:contrasena
                WHERE
                    id=:id";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->contrasena = htmlspecialchars(strip_tags($this->contrasena));

        // Encriptar la contraseña
        $hash_contrasena = password_hash($this->contrasena, PASSWORD_BCRYPT);

        // Vincular los valores
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":contrasena", $hash_contrasena);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Eliminar un usuario
    public function eliminar() {
        // Consulta SQL
        $query = "DELETE FROM " . $this->tabla . " WHERE id = ?";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar el ID
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Vincular el ID
        $stmt->bindParam(1, $this->id);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
