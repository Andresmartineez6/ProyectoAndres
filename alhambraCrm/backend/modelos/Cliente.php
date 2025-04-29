<?php
/**
 * Modelo Cliente
 * AlhambraCRM - Sistema de gestión de clientes
 */

class Cliente {
    // Conexión a la base de datos y nombre de la tabla
    private $conn;
    private $tabla = "clientes";

    // Propiedades del objeto
    public $id;
    public $nombre;
    public $apellidos;
    public $email;
    public $telefono;
    public $empresa;
    public $cargo;
    public $direccion;
    public $ciudad;
    public $pais;
    public $fechaCreacion;
    public $fechaActualizacion;

    // Constructor con la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los clientes
    public function obtenerTodos() {
        // Consulta SQL
        $query = "SELECT 
                    id, nombre, apellidos, email, telefono, empresa, cargo, 
                    direccion, ciudad, pais, fecha_creacion, fecha_actualizacion
                FROM 
                    " . $this->tabla . "
                ORDER BY 
                    nombre ASC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }

    // Obtener un solo cliente
    public function obtenerUno() {
        // Consulta SQL
        $query = "SELECT 
                    id, nombre, apellidos, email, telefono, empresa, cargo, 
                    direccion, ciudad, pais, fecha_creacion, fecha_actualizacion
                FROM 
                    " . $this->tabla . "
                WHERE 
                    id = ?
                LIMIT 0,1";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Vincular el ID
        $stmt->bindParam(1, $this->id);

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener el registro
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Establecer los valores a las propiedades del objeto
        if($row) {
            $this->nombre = $row['nombre'];
            $this->apellidos = $row['apellidos'];
            $this->email = $row['email'];
            $this->telefono = $row['telefono'];
            $this->empresa = $row['empresa'];
            $this->cargo = $row['cargo'];
            $this->direccion = $row['direccion'];
            $this->ciudad = $row['ciudad'];
            $this->pais = $row['pais'];
            $this->fechaCreacion = $row['fecha_creacion'];
            $this->fechaActualizacion = $row['fecha_actualizacion'];
            return true;
        }

        return false;
    }

    // Crear un cliente
    public function crear() {
        // Consulta SQL
        $query = "INSERT INTO 
                    " . $this->tabla . "
                SET 
                    nombre=:nombre, 
                    apellidos=:apellidos, 
                    email=:email, 
                    telefono=:telefono, 
                    empresa=:empresa, 
                    cargo=:cargo, 
                    direccion=:direccion, 
                    ciudad=:ciudad, 
                    pais=:pais";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellidos = htmlspecialchars(strip_tags($this->apellidos));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->empresa = htmlspecialchars(strip_tags($this->empresa));
        $this->cargo = htmlspecialchars(strip_tags($this->cargo));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->ciudad = htmlspecialchars(strip_tags($this->ciudad));
        $this->pais = htmlspecialchars(strip_tags($this->pais));

        // Vincular los valores
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellidos", $this->apellidos);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":empresa", $this->empresa);
        $stmt->bindParam(":cargo", $this->cargo);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":ciudad", $this->ciudad);
        $stmt->bindParam(":pais", $this->pais);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Actualizar un cliente
    public function actualizar() {
        // Consulta SQL
        $query = "UPDATE 
                    " . $this->tabla . "
                SET 
                    nombre=:nombre, 
                    apellidos=:apellidos, 
                    email=:email, 
                    telefono=:telefono, 
                    empresa=:empresa, 
                    cargo=:cargo, 
                    direccion=:direccion, 
                    ciudad=:ciudad, 
                    pais=:pais
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
        $this->empresa = htmlspecialchars(strip_tags($this->empresa));
        $this->cargo = htmlspecialchars(strip_tags($this->cargo));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->ciudad = htmlspecialchars(strip_tags($this->ciudad));
        $this->pais = htmlspecialchars(strip_tags($this->pais));

        // Vincular los valores
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellidos", $this->apellidos);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":empresa", $this->empresa);
        $stmt->bindParam(":cargo", $this->cargo);
        $stmt->bindParam(":direccion", $this->direccion);
        $stmt->bindParam(":ciudad", $this->ciudad);
        $stmt->bindParam(":pais", $this->pais);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Eliminar un cliente
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

    // Buscar clientes
    public function buscar($palabraClave) {
        // Consulta SQL
        $query = "SELECT 
                    id, nombre, apellidos, email, telefono, empresa
                FROM 
                    " . $this->tabla . "
                WHERE 
                    nombre LIKE ? OR 
                    apellidos LIKE ? OR 
                    email LIKE ? OR 
                    empresa LIKE ?
                ORDER BY 
                    nombre ASC";

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

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }
}
?>
