<?php
/**
 * Controlador Cliente
 * AlhambraCRM - Sistema de gestión de clientes
 */

class ClienteControlador {
    // Propiedades de la base de datos
    private $db;
    private $cliente;

    // Constructor
    public function __construct($db) {
        $this->db = $db;
        $this->cliente = new Cliente($db);
    }

    // Obtener todos los clientes
    public function obtenerTodos() {
        // Obtener clientes desde el modelo
        $stmt = $this->cliente->obtenerTodos();
        $num = $stmt->rowCount();

        // Verificar si se encontraron clientes
        if($num > 0) {
            // Array de clientes
            $clientes_arr = array();
            $clientes_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $cliente_item = array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "apellidos" => $apellidos,
                    "email" => $email,
                    "telefono" => $telefono,
                    "empresa" => $empresa,
                    "cargo" => $cargo,
                    "direccion" => $direccion,
                    "ciudad" => $ciudad,
                    "pais" => $pais,
                    "fechaCreacion" => $fecha_creacion,
                    "fechaActualizacion" => $fecha_actualizacion
                );

                array_push($clientes_arr["registros"], $cliente_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($clientes_arr);
        } else {
            // No se encontraron clientes
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron clientes.")
            );
        }
    }

    // Obtener un solo cliente
    public function obtenerUno($id) {
        // Establecer el ID del cliente a leer
        $this->cliente->id = $id;

        // Obtener cliente
        if($this->cliente->obtenerUno()) {
            // Crear array
            $cliente_arr = array(
                "id" =>  $this->cliente->id,
                "nombre" => $this->cliente->nombre,
                "apellidos" => $this->cliente->apellidos,
                "email" => $this->cliente->email,
                "telefono" => $this->cliente->telefono,
                "empresa" => $this->cliente->empresa,
                "cargo" => $this->cliente->cargo,
                "direccion" => $this->cliente->direccion,
                "ciudad" => $this->cliente->ciudad,
                "pais" => $this->cliente->pais,
                "fechaCreacion" => $this->cliente->fechaCreacion,
                "fechaActualizacion" => $this->cliente->fechaActualizacion
            );

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($cliente_arr);
        } else {
            // No se encontró el cliente
            http_response_code(404);

            // Informar al usuario
            return json_encode(array("mensaje" => "El cliente no existe."));
        }
    }

    // Crear un cliente
    public function crear($datos) {
        // Verificar que no esté vacío
        if(
            !empty($datos->nombre) &&
            !empty($datos->apellidos) &&
            !empty($datos->email)
        ) {
            // Establecer valores de propiedad del cliente
            $this->cliente->nombre = $datos->nombre;
            $this->cliente->apellidos = $datos->apellidos;
            $this->cliente->email = $datos->email;
            $this->cliente->telefono = $datos->telefono ?? "";
            $this->cliente->empresa = $datos->empresa ?? "";
            $this->cliente->cargo = $datos->cargo ?? "";
            $this->cliente->direccion = $datos->direccion ?? "";
            $this->cliente->ciudad = $datos->ciudad ?? "";
            $this->cliente->pais = $datos->pais ?? "";

            // Crear el cliente
            if($this->cliente->crear()) {
                // Código de respuesta - 201 creado
                http_response_code(201);

                // Informar al usuario
                return json_encode(array("mensaje" => "Cliente creado correctamente."));
            } else {
                // Código de respuesta - 503 servicio no disponible
                http_response_code(503);

                // Informar al usuario
                return json_encode(array("mensaje" => "No se pudo crear el cliente."));
            }
        } else {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se puede crear el cliente. Los datos están incompletos."));
        }
    }

    // Actualizar un cliente
    public function actualizar($id, $datos) {
        // Establecer el ID del cliente a actualizar
        $this->cliente->id = $id;

        // Verificar que no esté vacío
        if(
            !empty($datos->nombre) &&
            !empty($datos->apellidos) &&
            !empty($datos->email)
        ) {
            // Establecer valores de propiedad del cliente
            $this->cliente->nombre = $datos->nombre;
            $this->cliente->apellidos = $datos->apellidos;
            $this->cliente->email = $datos->email;
            $this->cliente->telefono = $datos->telefono ?? "";
            $this->cliente->empresa = $datos->empresa ?? "";
            $this->cliente->cargo = $datos->cargo ?? "";
            $this->cliente->direccion = $datos->direccion ?? "";
            $this->cliente->ciudad = $datos->ciudad ?? "";
            $this->cliente->pais = $datos->pais ?? "";

            // Actualizar el cliente
            if($this->cliente->actualizar()) {
                // Código de respuesta - 200 OK
                http_response_code(200);

                // Informar al usuario
                return json_encode(array("mensaje" => "Cliente actualizado correctamente."));
            } else {
                // Código de respuesta - 503 servicio no disponible
                http_response_code(503);

                // Informar al usuario
                return json_encode(array("mensaje" => "No se pudo actualizar el cliente."));
            }
        } else {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se puede actualizar el cliente. Los datos están incompletos."));
        }
    }

    // Eliminar un cliente
    public function eliminar($id) {
        // Establecer el ID del cliente a eliminar
        $this->cliente->id = $id;

        // Eliminar el cliente
        if($this->cliente->eliminar()) {
            // Código de respuesta - 200 OK
            http_response_code(200);

            // Informar al usuario
            return json_encode(array("mensaje" => "Cliente eliminado correctamente."));
        } else {
            // Código de respuesta - 503 servicio no disponible
            http_response_code(503);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se pudo eliminar el cliente."));
        }
    }

    // Buscar clientes
    public function buscar($palabraClave) {
        // Buscar clientes
        $stmt = $this->cliente->buscar($palabraClave);
        $num = $stmt->rowCount();

        // Verificar si se encontraron clientes
        if($num > 0) {
            // Array de clientes
            $clientes_arr = array();
            $clientes_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $cliente_item = array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "apellidos" => $apellidos,
                    "email" => $email,
                    "telefono" => $telefono,
                    "empresa" => $empresa
                );

                array_push($clientes_arr["registros"], $cliente_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($clientes_arr);
        } else {
            // No se encontraron clientes
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron clientes que coincidan con la búsqueda.")
            );
        }
    }
}
?>
