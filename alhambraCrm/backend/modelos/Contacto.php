<?php
/**
 * Modelo Contacto
 * AlhambraCRM - Sistema de gestión de clientes
 */

class Contacto {
    // Conexión a la base de datos y nombre de la tabla
    private $conn;
    private $tabla = "contactos";

    // Propiedades del objeto
    public $id;
    public $nombre;
    public $apellidos;
    public $email;
    public $telefono;
    public $cargo;
    public $empresa;
    public $id_cliente;
    public $notas;
    public $fecha_creacion;
    public $fecha_actualizacion;

    // Constructor con la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los contactos
    public function obtenerTodos() {
        // Consulta SQL
        $query = "SELECT 
                    c.id, c.nombre, c.apellidos, c.email, c.telefono, 
                    c.cargo, c.empresa, c.id_cliente, c.notas,
                    c.fecha_creacion, c.fecha_actualizacion,
                    cl.nombre as nombre_cliente
                FROM 
                    " . $this->tabla . " c
                LEFT JOIN
                    clientes cl ON c.id_cliente = cl.id
                ORDER BY 
                    c.nombre ASC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }

    // Obtener contactos por cliente
    public function obtenerPorCliente($id_cliente) {
        // Consulta SQL
        $query = "SELECT 
                    c.id, c.nombre, c.apellidos, c.email, c.telefono, 
                    c.cargo, c.empresa, c.id_cliente, c.notas,
                    c.fecha_creacion, c.fecha_actualizacion
                FROM 
                    " . $this->tabla . " c
                WHERE 
                    c.id_cliente = ?
                ORDER BY 
                    c.nombre ASC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Vincular el ID del cliente
        $stmt->bindParam(1, $id_cliente);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }

    // Obtener un solo contacto
    public function obtenerUno() {
        // Consulta SQL
        $query = "SELECT 
                    c.id, c.nombre, c.apellidos, c.email, c.telefono, 
                    c.cargo, c.empresa, c.id_cliente, c.notas,
                    c.fecha_creacion, c.fecha_actualizacion,
                    cl.nombre as nombre_cliente
                FROM 
                    " . $this->tabla . " c
                LEFT JOIN
                    clientes cl ON c.id_cliente = cl.id
                WHERE 
                    c.id = ?
                LIMIT 0,1";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Vincular el ID
        $stmt->bindParam(1, $this->id);

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener el registro
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si se encontró el contacto
        if($row) {
            // Establecer los valores a las propiedades del objeto
            $this->nombre = $row['nombre'];
            $this->apellidos = $row['apellidos'];
            $this->email = $row['email'];
            $this->telefono = $row['telefono'];
            $this->cargo = $row['cargo'];
            $this->empresa = $row['empresa'];
            $this->id_cliente = $row['id_cliente'];
            $this->notas = $row['notas'];
            $this->fecha_creacion = $row['fecha_creacion'];
            $this->fecha_actualizacion = $row['fecha_actualizacion'];
            
            return true;
        }

        return false;
    }

    // Crear un contacto
    public function crear() {
        // Consulta SQL
        $query = "INSERT INTO 
                    " . $this->tabla . "
                SET 
                    nombre=:nombre, 
                    apellidos=:apellidos, 
                    email=:email, 
                    telefono=:telefono, 
                    cargo=:cargo, 
                    empresa=:empresa, 
                    id_cliente=:id_cliente, 
                    notas=:notas";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellidos = htmlspecialchars(strip_tags($this->apellidos));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->cargo = htmlspecialchars(strip_tags($this->cargo));
        $this->empresa = htmlspecialchars(strip_tags($this->empresa));
        $this->id_cliente = $this->id_cliente ? htmlspecialchars(strip_tags($this->id_cliente)) : null;
        $this->notas = htmlspecialchars(strip_tags($this->notas));

        // Vincular los valores
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellidos", $this->apellidos);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":cargo", $this->cargo);
        $stmt->bindParam(":empresa", $this->empresa);
        $stmt->bindParam(":id_cliente", $this->id_cliente);
        $stmt->bindParam(":notas", $this->notas);

        // Ejecutar la consulta
        if($stmt->execute()) {
            // Obtener el ID generado
            $this->id = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    // Actualizar un contacto
    public function actualizar() {
        // Consulta SQL
        $query = "UPDATE
                    " . $this->tabla . "
                SET
                    nombre=:nombre, 
                    apellidos=:apellidos, 
                    email=:email, 
                    telefono=:telefono, 
                    cargo=:cargo, 
                    empresa=:empresa, 
                    id_cliente=:id_cliente, 
                    notas=:notas
                WHERE
                    id=:id";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellidos = htmlspecialchars(strip_tags($this->apellidos));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->cargo = htmlspecialchars(strip_tags($this->cargo));
        $this->empresa = htmlspecialchars(strip_tags($this->empresa));
        $this->id_cliente = $this->id_cliente ? htmlspecialchars(strip_tags($this->id_cliente)) : null;
        $this->notas = htmlspecialchars(strip_tags($this->notas));

        // Vincular los valores
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellidos", $this->apellidos);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":cargo", $this->cargo);
        $stmt->bindParam(":empresa", $this->empresa);
        $stmt->bindParam(":id_cliente", $this->id_cliente);
        $stmt->bindParam(":notas", $this->notas);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Eliminar un contacto
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

    // Buscar contactos
    public function buscar($palabraClave) {
        // Consulta SQL
        $query = "SELECT 
                    c.id, c.nombre, c.apellidos, c.email, c.telefono, 
                    c.cargo, c.empresa, cl.nombre as nombre_cliente
                FROM 
                    " . $this->tabla . " c
                LEFT JOIN
                    clientes cl ON c.id_cliente = cl.id
                WHERE 
                    c.nombre LIKE ? OR 
                    c.apellidos LIKE ? OR 
                    c.email LIKE ? OR 
                    c.telefono LIKE ? OR 
                    c.cargo LIKE ? OR 
                    c.empresa LIKE ? OR
                    cl.nombre LIKE ?
                ORDER BY 
                    c.nombre ASC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar la palabra clave
        $palabraClave = htmlspecialchars(strip_tags($palabraClave));
        $palabraClave = "%{$palabraClave}%";

        // Vincular la palabra clave
        $stmt->bindParam(1, $palabraClave);
        $stmt->bindParam(2, $palabraClave);
        $stmt->bindParam(3, $palabraClave);
        $stmt->bindParam(4, $palabraClave);
        $stmt->bindParam(5, $palabraClave);
        $stmt->bindParam(6, $palabraClave);
        $stmt->bindParam(7, $palabraClave);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }
}
?>
