<?php
/**
 * Modelo Cliente para AlhambraCRM
 * Maneja todas las operaciones relacionadas con los clientes en la base de datos
 */

class Cliente {
    // Conexión a la base de datos y tabla
    private $conexion;
    private $tabla = 'clientes';

    // Propiedades del cliente
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
    public $fecha_registro;
    public $ultima_actualizacion;
    public $estado; // activo, inactivo, potencial, etc.
    public $notas;

    /**
     * Constructor con conexión a la base de datos
     * @param PDO $db Conexión a la base de datos
     */
    public function __construct($db) {
        $this->conexion = $db;
    }

    /**
     * Obtener todos los clientes
     * @return PDOStatement
     */
    public function obtenerTodos() {
        // Consulta SQL
        $consulta = 'SELECT 
                    c.id, 
                    c.nombre, 
                    c.apellidos, 
                    c.email, 
                    c.telefono, 
                    c.empresa, 
                    c.cargo,
                    c.estado,
                    c.fecha_registro
                FROM 
                    ' . $this->tabla . ' c
                ORDER BY 
                    c.nombre ASC';

        // Preparar consulta
        $stmt = $this->conexion->prepare($consulta);

        // Ejecutar consulta
        $stmt->execute();

        return $stmt;
    }

    /**
     * Obtener un solo cliente
     * @return boolean
     */
    public function obtenerUno() {
        // Consulta SQL
        $consulta = 'SELECT 
                    c.id, 
                    c.nombre, 
                    c.apellidos, 
                    c.email, 
                    c.telefono, 
                    c.empresa, 
                    c.cargo, 
                    c.direccion, 
                    c.ciudad, 
                    c.pais, 
                    c.fecha_registro, 
                    c.ultima_actualizacion, 
                    c.estado, 
                    c.notas
                FROM 
                    ' . $this->tabla . ' c
                WHERE 
                    c.id = :id
                LIMIT 0,1';

        // Preparar consulta
        $stmt = $this->conexion->prepare($consulta);

        // Vincular parámetro
        $stmt->bindParam(':id', $this->id);

        // Ejecutar consulta
        $stmt->execute();

        // Obtener fila
        $fila = $stmt->fetch(PDO::FETCH_ASSOC);

        // Si existe, asignar valores a las propiedades del objeto
        if ($fila) {
            $this->nombre = $fila['nombre'];
            $this->apellidos = $fila['apellidos'];
            $this->email = $fila['email'];
            $this->telefono = $fila['telefono'];
            $this->empresa = $fila['empresa'];
            $this->cargo = $fila['cargo'];
            $this->direccion = $fila['direccion'];
            $this->ciudad = $fila['ciudad'];
            $this->pais = $fila['pais'];
            $this->fecha_registro = $fila['fecha_registro'];
            $this->ultima_actualizacion = $fila['ultima_actualizacion'];
            $this->estado = $fila['estado'];
            $this->notas = $fila['notas'];
            return true;
        }

        return false;
    }

    /**
     * Crear un nuevo cliente
     * @return boolean
     */
    public function crear() {
        // Consulta SQL
        $consulta = 'INSERT INTO ' . $this->tabla . '
                SET
                    nombre = :nombre,
                    apellidos = :apellidos,
                    email = :email,
                    telefono = :telefono,
                    empresa = :empresa,
                    cargo = :cargo,
                    direccion = :direccion,
                    ciudad = :ciudad,
                    pais = :pais,
                    estado = :estado,
                    notas = :notas,
                    fecha_registro = NOW(),
                    ultima_actualizacion = NOW()';

        // Preparar consulta
        $stmt = $this->conexion->prepare($consulta);

        // Limpiar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellidos = htmlspecialchars(strip_tags($this->apellidos));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->telefono = htmlspecialchars(strip_tags($this->telefono));
        $this->empresa = htmlspecialchars(strip_tags($this->empresa));
        $this->cargo = htmlspecialchars(strip_tags($this->cargo));
        $this->direccion = htmlspecialchars(strip_tags($this->direccion));
        $this->ciudad = htmlspecialchars(strip_tags($this->ciudad));
        $this->pais = htmlspecialchars(strip_tags($this->pais));
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->notas = htmlspecialchars(strip_tags($this->notas));

        // Vincular parámetros
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':apellidos', $this->apellidos);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':telefono', $this->telefono);
        $stmt->bindParam(':empresa', $this->empresa);
        $stmt->bindParam(':cargo', $this->cargo);
        $stmt->bindParam(':direccion', $this->direccion);
        $stmt->bindParam(':ciudad', $this->ciudad);
        $stmt->bindParam(':pais', $this->pais);
        $stmt->bindParam(':estado', $this->estado);
        $stmt->bindParam(':notas', $this->notas);

        // Ejecutar consulta
        if ($stmt->execute()) {
            // Obtener el ID generado
            $this->id = $this->conexion->lastInsertId();
            return true;
        }

        // Si algo sale mal
        if ($stmt->errorInfo()[2]) {
            error_log("Error en la consulta: " . $stmt->errorInfo()[2]);
        }
        return false;
    }

    /**
     * Actualizar un cliente
     * @return boolean
     */
    public function actualizar() {
        // Consulta SQL
        $consulta = 'UPDATE ' . $this->tabla . '
                SET
                    nombre = :nombre,
                    apellidos = :apellidos,
                    email = :email,
                    telefono = :telefono,
                    empresa = :empresa,
                    cargo = :cargo,
                    direccion = :direccion,
                    ciudad = :ciudad,
                    pais = :pais,
                    estado = :estado,
                    notas = :notas,
                    ultima_actualizacion = NOW()
                WHERE
                    id = :id';

        // Preparar consulta
        $stmt = $this->conexion->prepare($consulta);

        // Limpiar datos
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
        $this->estado = htmlspecialchars(strip_tags($this->estado));
        $this->notas = htmlspecialchars(strip_tags($this->notas));

        // Vincular parámetros
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':apellidos', $this->apellidos);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':telefono', $this->telefono);
        $stmt->bindParam(':empresa', $this->empresa);
        $stmt->bindParam(':cargo', $this->cargo);
        $stmt->bindParam(':direccion', $this->direccion);
        $stmt->bindParam(':ciudad', $this->ciudad);
        $stmt->bindParam(':pais', $this->pais);
        $stmt->bindParam(':estado', $this->estado);
        $stmt->bindParam(':notas', $this->notas);

        // Ejecutar consulta
        if ($stmt->execute()) {
            return true;
        }

        // Si algo sale mal
        if ($stmt->errorInfo()[2]) {
            error_log("Error en la consulta: " . $stmt->errorInfo()[2]);
        }
        return false;
    }

    /**
     * Eliminar un cliente
     * @return boolean
     */
    public function eliminar() {
        // Consulta SQL
        $consulta = 'DELETE FROM ' . $this->tabla . ' WHERE id = :id';

        // Preparar consulta
        $stmt = $this->conexion->prepare($consulta);

        // Limpiar ID
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Vincular parámetro
        $stmt->bindParam(':id', $this->id);

        // Ejecutar consulta
        if ($stmt->execute()) {
            return true;
        }

        // Si algo sale mal
        if ($stmt->errorInfo()[2]) {
            error_log("Error en la consulta: " . $stmt->errorInfo()[2]);
        }
        return false;
    }

    /**
     * Buscar clientes
     * @param string $termino Término de búsqueda
     * @return PDOStatement
     */
    public function buscar($termino) {
        // Consulta SQL
        $consulta = 'SELECT 
                    c.id, 
                    c.nombre, 
                    c.apellidos, 
                    c.email, 
                    c.telefono, 
                    c.empresa, 
                    c.cargo,
                    c.estado,
                    c.fecha_registro
                FROM 
                    ' . $this->tabla . ' c
                WHERE 
                    c.nombre LIKE :termino OR
                    c.apellidos LIKE :termino OR
                    c.email LIKE :termino OR
                    c.empresa LIKE :termino
                ORDER BY 
                    c.nombre ASC';

        // Preparar consulta
        $stmt = $this->conexion->prepare($consulta);

        // Término de búsqueda con comodines
        $termino = '%' . $termino . '%';

        // Vincular parámetro
        $stmt->bindParam(':termino', $termino);

        // Ejecutar consulta
        $stmt->execute();

        return $stmt;
    }
}
?>
