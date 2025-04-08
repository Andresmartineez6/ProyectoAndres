<?php
/**
 * Controlador de Clientes para AlhambraCRM
 * Maneja todas las operaciones relacionadas con clientes
 */

// Incluir archivos necesarios
require_once '../config/database.php';
require_once '../modelos/Cliente.php';
require_once '../utils/respuesta.php';

class ClienteControlador {
    // Propiedades de la base de datos
    private $baseDatos;
    private $conexion;
    
    // Modelo de cliente
    private $cliente;
    
    /**
     * Constructor
     */
    public function __construct() {
        // Inicializar conexión a la base de datos
        $this->baseDatos = new BaseDatos();
        $this->conexion = $this->baseDatos->conectar();
        
        // Inicializar modelo de cliente
        $this->cliente = new Cliente($this->conexion);
    }
    
    /**
     * Obtener todos los clientes
     * @return void
     */
    public function obtenerTodos() {
        // Obtener datos
        $resultado = $this->cliente->obtenerTodos();
        
        // Verificar si hay registros
        if ($resultado->rowCount() > 0) {
            // Array de clientes
            $clientes_arr = array();
            
            // Recorrer resultados
            while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
                extract($fila);
                
                $cliente_item = array(
                    'id' => $id,
                    'nombre' => $nombre,
                    'apellidos' => $apellidos,
                    'email' => $email,
                    'telefono' => $telefono,
                    'empresa' => $empresa,
                    'cargo' => $cargo,
                    'estado' => $estado,
                    'fecha_registro' => $fecha_registro
                );
                
                // Añadir al array de clientes
                array_push($clientes_arr, $cliente_item);
            }
            
            // Enviar respuesta
            Respuesta::exito('Clientes obtenidos con éxito', $clientes_arr);
        } else {
            // No hay clientes
            Respuesta::exito('No se encontraron clientes', []);
        }
    }
    
    /**
     * Obtener un cliente específico
     * @param int $id ID del cliente
     * @return void
     */
    public function obtenerUno($id) {
        // Establecer ID
        $this->cliente->id = $id;
        
        // Obtener cliente
        if ($this->cliente->obtenerUno()) {
            // Crear array con datos del cliente
            $cliente_arr = array(
                'id' => $this->cliente->id,
                'nombre' => $this->cliente->nombre,
                'apellidos' => $this->cliente->apellidos,
                'email' => $this->cliente->email,
                'telefono' => $this->cliente->telefono,
                'empresa' => $this->cliente->empresa,
                'cargo' => $this->cliente->cargo,
                'direccion' => $this->cliente->direccion,
                'ciudad' => $this->cliente->ciudad,
                'pais' => $this->cliente->pais,
                'fecha_registro' => $this->cliente->fecha_registro,
                'ultima_actualizacion' => $this->cliente->ultima_actualizacion,
                'estado' => $this->cliente->estado,
                'notas' => $this->cliente->notas
            );
            
            // Enviar respuesta
            Respuesta::exito('Cliente obtenido con éxito', $cliente_arr);
        } else {
            // No se encontró el cliente
            Respuesta::error('Cliente no encontrado', 404);
        }
    }
    
    /**
     * Crear un nuevo cliente
     * @param array $datos Datos del cliente
     * @return void
     */
    public function crear($datos) {
        // Verificar datos requeridos
        if (
            empty($datos['nombre']) ||
            empty($datos['apellidos']) ||
            empty($datos['email'])
        ) {
            Respuesta::error('Faltan datos requeridos (nombre, apellidos, email)', 400);
            return;
        }
        
        // Establecer propiedades del cliente
        $this->cliente->nombre = $datos['nombre'];
        $this->cliente->apellidos = $datos['apellidos'];
        $this->cliente->email = $datos['email'];
        $this->cliente->telefono = isset($datos['telefono']) ? $datos['telefono'] : null;
        $this->cliente->empresa = isset($datos['empresa']) ? $datos['empresa'] : null;
        $this->cliente->cargo = isset($datos['cargo']) ? $datos['cargo'] : null;
        $this->cliente->direccion = isset($datos['direccion']) ? $datos['direccion'] : null;
        $this->cliente->ciudad = isset($datos['ciudad']) ? $datos['ciudad'] : null;
        $this->cliente->pais = isset($datos['pais']) ? $datos['pais'] : null;
        $this->cliente->estado = isset($datos['estado']) ? $datos['estado'] : 'activo';
        $this->cliente->notas = isset($datos['notas']) ? $datos['notas'] : null;
        
        // Crear cliente
        if ($this->cliente->crear()) {
            Respuesta::exito('Cliente creado con éxito', ['id' => $this->cliente->id]);
        } else {
            Respuesta::error('No se pudo crear el cliente', 500);
        }
    }
    
    /**
     * Actualizar un cliente existente
     * @param int $id ID del cliente
     * @param array $datos Datos del cliente
     * @return void
     */
    public function actualizar($id, $datos) {
        // Establecer ID
        $this->cliente->id = $id;
        
        // Verificar si el cliente existe
        if (!$this->cliente->obtenerUno()) {
            Respuesta::error('Cliente no encontrado', 404);
            return;
        }
        
        // Actualizar propiedades si están presentes en los datos
        $this->cliente->nombre = isset($datos['nombre']) ? $datos['nombre'] : $this->cliente->nombre;
        $this->cliente->apellidos = isset($datos['apellidos']) ? $datos['apellidos'] : $this->cliente->apellidos;
        $this->cliente->email = isset($datos['email']) ? $datos['email'] : $this->cliente->email;
        $this->cliente->telefono = isset($datos['telefono']) ? $datos['telefono'] : $this->cliente->telefono;
        $this->cliente->empresa = isset($datos['empresa']) ? $datos['empresa'] : $this->cliente->empresa;
        $this->cliente->cargo = isset($datos['cargo']) ? $datos['cargo'] : $this->cliente->cargo;
        $this->cliente->direccion = isset($datos['direccion']) ? $datos['direccion'] : $this->cliente->direccion;
        $this->cliente->ciudad = isset($datos['ciudad']) ? $datos['ciudad'] : $this->cliente->ciudad;
        $this->cliente->pais = isset($datos['pais']) ? $datos['pais'] : $this->cliente->pais;
        $this->cliente->estado = isset($datos['estado']) ? $datos['estado'] : $this->cliente->estado;
        $this->cliente->notas = isset($datos['notas']) ? $datos['notas'] : $this->cliente->notas;
        
        // Actualizar cliente
        if ($this->cliente->actualizar()) {
            Respuesta::exito('Cliente actualizado con éxito');
        } else {
            Respuesta::error('No se pudo actualizar el cliente', 500);
        }
    }
    
    /**
     * Eliminar un cliente
     * @param int $id ID del cliente
     * @return void
     */
    public function eliminar($id) {
        // Establecer ID
        $this->cliente->id = $id;
        
        // Verificar si el cliente existe
        if (!$this->cliente->obtenerUno()) {
            Respuesta::error('Cliente no encontrado', 404);
            return;
        }
        
        // Eliminar cliente
        if ($this->cliente->eliminar()) {
            Respuesta::exito('Cliente eliminado con éxito');
        } else {
            Respuesta::error('No se pudo eliminar el cliente', 500);
        }
    }
    
    /**
     * Buscar clientes
     * @param string $termino Término de búsqueda
     * @return void
     */
    public function buscar($termino) {
        // Verificar término de búsqueda
        if (empty($termino)) {
            Respuesta::error('Término de búsqueda requerido', 400);
            return;
        }
        
        // Realizar búsqueda
        $resultado = $this->cliente->buscar($termino);
        
        // Verificar si hay resultados
        if ($resultado->rowCount() > 0) {
            // Array de clientes
            $clientes_arr = array();
            
            // Recorrer resultados
            while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
                extract($fila);
                
                $cliente_item = array(
                    'id' => $id,
                    'nombre' => $nombre,
                    'apellidos' => $apellidos,
                    'email' => $email,
                    'telefono' => $telefono,
                    'empresa' => $empresa,
                    'cargo' => $cargo,
                    'estado' => $estado,
                    'fecha_registro' => $fecha_registro
                );
                
                // Añadir al array de clientes
                array_push($clientes_arr, $cliente_item);
            }
            
            // Enviar respuesta
            Respuesta::exito('Clientes encontrados', $clientes_arr);
        } else {
            // No hay resultados
            Respuesta::exito('No se encontraron clientes con ese término', []);
        }
    }
}
?>
