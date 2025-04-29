<?php
/**
 * Modelo Tarea
 * AlhambraCRM - Sistema de gestión de clientes
 */

class Tarea {
    // Conexión a la base de datos y nombre de la tabla
    private $conn;
    private $tabla = "tareas";

    // Propiedades del objeto
    public $id;
    public $titulo;
    public $descripcion;
    public $id_proyecto;
    public $asignado_a;
    public $fecha_inicio;
    public $fecha_fin;
    public $estado;
    public $prioridad;
    public $fecha_creacion;
    public $fecha_actualizacion;

    // Constructor con la conexión a la base de datos
    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener todas las tareas
    public function obtenerTodas() {
        // Consulta SQL
        $query = "SELECT 
                    t.id, t.titulo, t.descripcion, t.id_proyecto, t.asignado_a, 
                    t.fecha_inicio, t.fecha_fin, t.estado, t.prioridad,
                    t.fecha_creacion, t.fecha_actualizacion,
                    p.nombre as nombre_proyecto,
                    CONCAT(u.nombre, ' ', u.apellidos) as nombre_asignado
                FROM 
                    " . $this->tabla . " t
                LEFT JOIN
                    proyectos p ON t.id_proyecto = p.id
                LEFT JOIN
                    trabajadores tr ON t.asignado_a = tr.id
                LEFT JOIN
                    usuarios u ON tr.id_usuario = u.id
                ORDER BY 
                    t.fecha_creacion DESC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }

    // Obtener tareas por proyecto
    public function obtenerPorProyecto($id_proyecto) {
        // Consulta SQL
        $query = "SELECT 
                    t.id, t.titulo, t.descripcion, t.id_proyecto, t.asignado_a, 
                    t.fecha_inicio, t.fecha_fin, t.estado, t.prioridad,
                    t.fecha_creacion, t.fecha_actualizacion,
                    CONCAT(u.nombre, ' ', u.apellidos) as nombre_asignado
                FROM 
                    " . $this->tabla . " t
                LEFT JOIN
                    trabajadores tr ON t.asignado_a = tr.id
                LEFT JOIN
                    usuarios u ON tr.id_usuario = u.id
                WHERE 
                    t.id_proyecto = ?
                ORDER BY 
                    t.fecha_creacion DESC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Vincular el ID del proyecto
        $stmt->bindParam(1, $id_proyecto);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }

    // Obtener tareas asignadas a un trabajador
    public function obtenerPorTrabajador($id_trabajador) {
        // Consulta SQL
        $query = "SELECT 
                    t.id, t.titulo, t.descripcion, t.id_proyecto, t.asignado_a, 
                    t.fecha_inicio, t.fecha_fin, t.estado, t.prioridad,
                    t.fecha_creacion, t.fecha_actualizacion,
                    p.nombre as nombre_proyecto
                FROM 
                    " . $this->tabla . " t
                LEFT JOIN
                    proyectos p ON t.id_proyecto = p.id
                WHERE 
                    t.asignado_a = ?
                ORDER BY 
                    t.fecha_creacion DESC";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Vincular el ID del trabajador
        $stmt->bindParam(1, $id_trabajador);

        // Ejecutar la consulta
        $stmt->execute();

        return $stmt;
    }

    // Obtener una sola tarea
    public function obtenerUna() {
        // Consulta SQL
        $query = "SELECT 
                    t.id, t.titulo, t.descripcion, t.id_proyecto, t.asignado_a, 
                    t.fecha_inicio, t.fecha_fin, t.estado, t.prioridad,
                    t.fecha_creacion, t.fecha_actualizacion,
                    p.nombre as nombre_proyecto,
                    CONCAT(u.nombre, ' ', u.apellidos) as nombre_asignado
                FROM 
                    " . $this->tabla . " t
                LEFT JOIN
                    proyectos p ON t.id_proyecto = p.id
                LEFT JOIN
                    trabajadores tr ON t.asignado_a = tr.id
                LEFT JOIN
                    usuarios u ON tr.id_usuario = u.id
                WHERE 
                    t.id = ?
                LIMIT 0,1";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Vincular el ID
        $stmt->bindParam(1, $this->id);

        // Ejecutar la consulta
        $stmt->execute();

        // Obtener el registro
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si se encontró la tarea
        if($row) {
            // Establecer los valores a las propiedades del objeto
            $this->titulo = $row['titulo'];
            $this->descripcion = $row['descripcion'];
            $this->id_proyecto = $row['id_proyecto'];
            $this->asignado_a = $row['asignado_a'];
            $this->fecha_inicio = $row['fecha_inicio'];
            $this->fecha_fin = $row['fecha_fin'];
            $this->estado = $row['estado'];
            $this->prioridad = $row['prioridad'];
            $this->fecha_creacion = $row['fecha_creacion'];
            $this->fecha_actualizacion = $row['fecha_actualizacion'];
            
            return true;
        }

        return false;
    }

    // Crear una tarea
    public function crear() {
        // Consulta SQL
        $query = "INSERT INTO 
                    " . $this->tabla . "
                SET 
                    titulo=:titulo, 
                    descripcion=:descripcion, 
                    id_proyecto=:id_proyecto, 
                    asignado_a=:asignado_a, 
                    fecha_inicio=:fecha_inicio, 
                    fecha_fin=:fecha_fin, 
                    estado=:estado, 
                    prioridad=:prioridad";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->id_proyecto = $this->id_proyecto ? htmlspecialchars(strip_tags($this->id_proyecto)) : null;
        $this->asignado_a = $this->asignado_a ? htmlspecialchars(strip_tags($this->asignado_a)) : null;
        $this->fecha_inicio = htmlspecialchars(strip_tags($this->fecha_inicio));
        $this->fecha_fin = htmlspecialchars(strip_tags($this->fecha_fin));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->prioridad = htmlspecialchars(strip_tags($this->prioridad));

        // Vincular los valores
        $stmt->bindParam(":titulo", $this->titulo);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":id_proyecto", $this->id_proyecto);
        $stmt->bindParam(":asignado_a", $this->asignado_a);
        $stmt->bindParam(":fecha_inicio", $this->fecha_inicio);
        $stmt->bindParam(":fecha_fin", $this->fecha_fin);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":prioridad", $this->prioridad);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Actualizar una tarea
    public function actualizar() {
        // Consulta SQL
        $query = "UPDATE 
                    " . $this->tabla . "
                SET 
                    titulo=:titulo, 
                    descripcion=:descripcion, 
                    id_proyecto=:id_proyecto, 
                    asignado_a=:asignado_a, 
                    fecha_inicio=:fecha_inicio, 
                    fecha_fin=:fecha_fin, 
                    estado=:estado, 
                    prioridad=:prioridad
                WHERE 
                    id=:id";

        // Preparar la consulta
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->titulo = htmlspecialchars(strip_tags($this->titulo));
        $this->descripcion = htmlspecialchars(strip_tags($this->descripcion));
        $this->id_proyecto = $this->id_proyecto ? htmlspecialchars(strip_tags($this->id_proyecto)) : null;
        $this->asignado_a = $this->asignado_a ? htmlspecialchars(strip_tags($this->asignado_a)) : null;
        $this->fecha_inicio = htmlspecialchars(strip_tags($this->fecha_inicio));
        $this->fecha_fin = htmlspecialchars(strip_tags($this->fecha_fin));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->prioridad = htmlspecialchars(strip_tags($this->prioridad));

        // Vincular los valores
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":titulo", $this->titulo);
        $stmt->bindParam(":descripcion", $this->descripcion);
        $stmt->bindParam(":id_proyecto", $this->id_proyecto);
        $stmt->bindParam(":asignado_a", $this->asignado_a);
        $stmt->bindParam(":fecha_inicio", $this->fecha_inicio);
        $stmt->bindParam(":fecha_fin", $this->fecha_fin);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":prioridad", $this->prioridad);

        // Ejecutar la consulta
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Eliminar una tarea
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

    // Buscar tareas
    public function buscar($palabraClave) {
        // Consulta SQL
        $query = "SELECT 
                    t.id, t.titulo, t.descripcion, t.estado, t.prioridad,
                    p.nombre as nombre_proyecto
                FROM 
                    " . $this->tabla . " t
                LEFT JOIN
                    proyectos p ON t.id_proyecto = p.id
                WHERE 
                    t.titulo LIKE ? OR 
                    t.descripcion LIKE ? OR 
                    p.nombre LIKE ?
                ORDER BY 
                    t.fecha_creacion DESC";

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
