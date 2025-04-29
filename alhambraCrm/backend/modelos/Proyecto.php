<?php
/**
 * Modelo Proyecto
 * AlhambraCRM - Sistema de gestión de clientes
 */

class Proyecto {
    // Conexión a la base de datos y nombre de la tabla
    private $conn;
    private $tabla = "proyectos";

    // Propiedades del objeto
    public $id;
    public $nombre;
    public $descripcion;
    public $id_cliente;
    public $responsable_id;
    public $fecha_inicio;
    public $fecha_fin;
    public $presupuesto;
    public $estado;
    public $prioridad;
    public $fecha_creacion;
    public $fecha_actualizacion;

    // Constructor con la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todos los proyectos
    public function obtenerTodos() {
        // Consulta SQL
        $query = "SELECT 
                    p.id, p.nombre, p.descripcion, p.id_cliente, p.responsable_id, 
                    p.fecha_inicio, p.fecha_fin, p.presupuesto, p.estado, p.prioridad,
                    p.fecha_creacion, p.fecha_actualizacion,
                    c.empresa as nombre_cliente,
                    CONCAT(u.nombre, ' ', u.apellidos) as nombre_responsable
                FROM 
                    " . $this->tabla . " p
                LEFT JOIN
                    clientes c ON p.id_cliente = c.id
                LEFT JOIN
                    trabajadores t ON p.responsable_id = t.id
                LEFT JOIN
                    usuarios u ON t.id_usuario = u.id
                ORDER BY 
                    p.fecha_creacion DESC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }

    // Obtener proyectos por cliente
    public function obtenerPorCliente($id_cliente) {
        // Consulta SQL
        $query = "SELECT 
                    p.id, p.nombre, p.descripcion, p.id_cliente, p.responsable_id, 
                    p.fecha_inicio, p.fecha_fin, p.presupuesto, p.estado, p.prioridad,
                    p.fecha_creacion, p.fecha_actualizacion,
                    CONCAT(u.nombre, ' ', u.apellidos) as nombre_responsable
                FROM 
                    " . $this->tabla . " p
                LEFT JOIN
                    trabajadores t ON p.responsable_id = t.id
                LEFT JOIN
                    usuarios u ON t.id_usuario = u.id
                WHERE 
                    p.id_cliente = ?
                ORDER BY 
                    p.fecha_creacion DESC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Vincular el ID del cliente
        $stmt->bindParam(1, $id_cliente);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }

    // Obtener un solo proyecto
    public function obtenerUno() {
        // Consulta SQL
        $query = "SELECT 
                    p.id, p.nombre, p.descripcion, p.id_cliente, p.responsable_id, 
                    p.fecha_inicio, p.fecha_fin, p.presupuesto, p.estado, p.prioridad,
                    p.fecha_creacion, p.fecha_actualizacion,
                    c.empresa as nombre_cliente,
                    CONCAT(u.nombre, ' ', u.apellidos) as nombre_responsable
                FROM 
                    " . $this->tabla . " p
                LEFT JOIN
                    clientes c ON p.id_cliente = c.id
                LEFT JOIN
                    trabajadores t ON p.responsable_id = t.id
                LEFT JOIN
                    usuarios u ON t.id_usuario = u.id
                WHERE 
                    p.id = ?
                LIMIT 0,1";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Vincular el ID
        $stmt->bindParam(1, $this->id);

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener el registro
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si se encontró el proyecto
        if($row) {
            // Establecer los valores a las propiedades del objeto
            $this->nombre = $row['nombre'];
            $this->descripcion = $row['descripcion'];
            $this->id_cliente = $row['id_cliente'];
            $this->responsable_id = $row['responsable_id'];
            $this->fecha_inicio = $row['fecha_inicio'];
            $this->fecha_fin = $row['fecha_fin'];
            $this->presupuesto = $row['presupuesto'];
            $this->estado = $row['estado'];
            $this->prioridad = $row['prioridad'];
            $this->fecha_creacion = $row['fecha_creacion'];
            $this->fecha_actualizacion = $row['fecha_actualizacion'];
            
            return true;
        }

        return false;
    }

    // Crear un proyecto
    public function crear() {
        // Consulta SQL
        $query = "INSERT INTO 
                    " . $this->tabla . "
                SET 
                    nombre=:nombre, 
                    descripcion=:descripcion, 
                    id_cliente=:id_cliente, 
                    responsable_id=:responsable_id, 
                    fecha_inicio=:fecha_inicio, 
                    fecha_fin=:fecha_fin, 
                    presupuesto=:presupuesto, 
                    estado=:estado, 
                    prioridad=:prioridad";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->id_cliente = htmlspecialchars(strip_tags($this->id_cliente));
        $this->responsable_id = $this->responsable_id ? htmlspecialchars(strip_tags($this->responsable_id)) : null;
        $this->fecha_inicio = htmlspecialchars(strip_tags($this->fecha_inicio));
        $this->fecha_fin = htmlspecialchars(strip_tags($this->fecha_fin));
        $this->presupuesto = htmlspecialchars(strip_tags($this->presupuesto));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->prioridad = htmlspecialchars(strip_tags($this->prioridad));

        // Vincular los valores
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":id_cliente", $this->id_cliente);
        $stmt->bindParam(":responsable_id", $this->responsable_id);
        $stmt->bindParam(":fecha_inicio", $this->fecha_inicio);
        $stmt->bindParam(":fecha_fin", $this->fecha_fin);
        $stmt->bindParam(":presupuesto", $this->presupuesto);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":prioridad", $this->prioridad);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Actualizar un proyecto
    public function actualizar() {
        // Consulta SQL
        $query = "UPDATE 
                    " . $this->tabla . "
                SET 
                    nombre=:nombre, 
                    descripcion=:descripcion, 
                    id_cliente=:id_cliente, 
                    responsable_id=:responsable_id, 
                    fecha_inicio=:fecha_inicio, 
                    fecha_fin=:fecha_fin, 
                    presupuesto=:presupuesto, 
                    estado=:estado, 
                    prioridad=:prioridad
                WHERE 
                    id=:id";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->id_cliente = htmlspecialchars(strip_tags($this->id_cliente));
        $this->responsable_id = $this->responsable_id ? htmlspecialchars(strip_tags($this->responsable_id)) : null;
        $this->fecha_inicio = htmlspecialchars(strip_tags($this->fecha_inicio));
        $this->fecha_fin = htmlspecialchars(strip_tags($this->fecha_fin));
        $this->presupuesto = htmlspecialchars(strip_tags($this->presupuesto));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->prioridad = htmlspecialchars(strip_tags($this->prioridad));

        // Vincular los valores
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":id_cliente", $this->id_cliente);
        $stmt->bindParam(":responsable_id", $this->responsable_id);
        $stmt->bindParam(":fecha_inicio", $this->fecha_inicio);
        $stmt->bindParam(":fecha_fin", $this->fecha_fin);
        $stmt->bindParam(":presupuesto", $this->presupuesto);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":prioridad", $this->prioridad);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Eliminar un proyecto
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

    // Buscar proyectos
    public function buscar($palabraClave) {
        // Consulta SQL
        $query = "SELECT 
                    p.id, p.nombre, p.descripcion, p.estado, p.prioridad,
                    c.empresa as nombre_cliente
                FROM 
                    " . $this->tabla . " p
                LEFT JOIN
                    clientes c ON p.id_cliente = c.id
                WHERE 
                    p.nombre LIKE ? OR 
                    p.descripcion LIKE ? OR 
                    c.empresa LIKE ?
                ORDER BY 
                    p.fecha_creacion DESC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar la palabra clave
        $palabraClave = htmlspecialchars(strip_tags($palabraClave));
        $palabraClave = "%{$palabraClave}%";

        // Vincular la palabra clave
        $stmt->bindParam(1, $palabraClave);
        $stmt->bindParam(2, $palabraClave);
        $stmt->bindParam(3, $palabraClave);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }
}
?>
