<?php
/**
 * Controlador Contacto
 * AlhambraCRM - Sistema de gestión de clientes
 */

class ContactoControlador {
    // Propiedades de la base de datos
    private $db;
    private $contacto;

    // Constructor
    public function __construct($db) {
        $this->db = $db;
        $this->contacto = new Contacto($db);
    }

    // Obtener todos los contactos
    public function obtenerTodos() {
        // Obtener contactos desde el modelo
        $stmt = $this->contacto->obtenerTodos();
        $num = $stmt->rowCount();

        // Verificar si se encontraron contactos
        if($num > 0) {
            // Array de contactos
            $contactos_arr = array();
            $contactos_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $contacto_item = array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "apellidos" => $apellidos,
                    "email" => $email,
                    "telefono" => $telefono,
                    "cargo" => $cargo,
                    "empresa" => $empresa,
                    "id_cliente" => $id_cliente,
                    "nombre_cliente" => $nombre_cliente ?? "",
                    "notas" => $notas,
                    "fecha_creacion" => $fecha_creacion,
                    "fecha_actualizacion" => $fecha_actualizacion
                );

                array_push($contactos_arr["registros"], $contacto_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($contactos_arr);
        } else {
            // No se encontraron contactos
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron contactos.")
            );
        }
    }

    // Obtener contactos por cliente
    public function obtenerPorCliente($id_cliente) {
        // Obtener contactos desde el modelo
        $stmt = $this->contacto->obtenerPorCliente($id_cliente);
        $num = $stmt->rowCount();

        // Verificar si se encontraron contactos
        if($num > 0) {
            // Array de contactos
            $contactos_arr = array();
            $contactos_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $contacto_item = array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "apellidos" => $apellidos,
                    "email" => $email,
                    "telefono" => $telefono,
                    "cargo" => $cargo,
                    "empresa" => $empresa,
                    "id_cliente" => $id_cliente,
                    "notas" => $notas,
                    "fecha_creacion" => $fecha_creacion,
                    "fecha_actualizacion" => $fecha_actualizacion
                );

                array_push($contactos_arr["registros"], $contacto_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($contactos_arr);
        } else {
            // No se encontraron contactos
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron contactos para este cliente.")
            );
        }
    }

    // Obtener un solo contacto
    public function obtenerUno($id) {
        // Establecer el ID del contacto a leer
        $this->contacto->id = $id;

        // Obtener contacto
        if($this->contacto->obtenerUno()) {
            // Crear array
            $contacto_arr = array(
                "id" =>  $this->contacto->id,
                "nombre" => $this->contacto->nombre,
                "apellidos" => $this->contacto->apellidos,
                "email" => $this->contacto->email,
                "telefono" => $this->contacto->telefono,
                "cargo" => $this->contacto->cargo,
                "empresa" => $this->contacto->empresa,
                "id_cliente" => $this->contacto->id_cliente,
                "notas" => $this->contacto->notas,
                "fecha_creacion" => $this->contacto->fecha_creacion,
                "fecha_actualizacion" => $this->contacto->fecha_actualizacion
            );

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($contacto_arr);
        } else {
            // No se encontró el contacto
            http_response_code(404);

            // Informar al usuario
            return json_encode(array("mensaje" => "El contacto no existe."));
        }
    }

    // Crear un contacto
    public function crear($datos) {
        // Verificar que no esté vacío
        if(!empty($datos->nombre) && !empty($datos->email)) {
            // Establecer valores de propiedad del contacto
            $this->contacto->nombre = $datos->nombre;
            $this->contacto->apellidos = $datos->apellidos ?? "";
            $this->contacto->email = $datos->email;
            $this->contacto->telefono = $datos->telefono ?? "";
            $this->contacto->cargo = $datos->cargo ?? "";
            $this->contacto->empresa = $datos->empresa ?? "";
            $this->contacto->id_cliente = $datos->id_cliente ?? null;
            $this->contacto->notas = $datos->notas ?? "";

            // Crear el contacto
            if($this->contacto->crear()) {
                // Código de respuesta - 201 creado
                http_response_code(201);

                // Informar al usuario
                return json_encode(array("mensaje" => "Contacto creado correctamente."));
            } else {
                // Código de respuesta - 503 servicio no disponible
                http_response_code(503);

                // Informar al usuario
                return json_encode(array("mensaje" => "No se pudo crear el contacto."));
            }
        } else {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se puede crear el contacto. Los datos están incompletos."));
        }
    }

    // Actualizar un contacto
    public function actualizar($id, $datos) {
        // Establecer el ID del contacto a actualizar
        $this->contacto->id = $id;

        // Verificar que no esté vacío
        if(!empty($datos->nombre) && !empty($datos->email)) {
            // Establecer valores de propiedad del contacto
            $this->contacto->nombre = $datos->nombre;
            $this->contacto->apellidos = $datos->apellidos ?? "";
            $this->contacto->email = $datos->email;
            $this->contacto->telefono = $datos->telefono ?? "";
            $this->contacto->cargo = $datos->cargo ?? "";
            $this->contacto->empresa = $datos->empresa ?? "";
            $this->contacto->id_cliente = $datos->id_cliente ?? null;
            $this->contacto->notas = $datos->notas ?? "";

            // Actualizar el contacto
            if($this->contacto->actualizar()) {
                // Código de respuesta - 200 OK
                http_response_code(200);

                // Informar al usuario
                return json_encode(array("mensaje" => "Contacto actualizado correctamente."));
            } else {
                // Código de respuesta - 503 servicio no disponible
                http_response_code(503);

                // Informar al usuario
                return json_encode(array("mensaje" => "No se pudo actualizar el contacto."));
            }
        } else {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se puede actualizar el contacto. Los datos están incompletos."));
        }
    }

    // Eliminar un contacto
    public function eliminar($id) {
        // Establecer el ID del contacto a eliminar
        $this->contacto->id = $id;

        // Eliminar el contacto
        if($this->contacto->eliminar()) {
            // Código de respuesta - 200 OK
            http_response_code(200);

            // Informar al usuario
            return json_encode(array("mensaje" => "Contacto eliminado correctamente."));
        } else {
            // Código de respuesta - 503 servicio no disponible
            http_response_code(503);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se pudo eliminar el contacto."));
        }
    }

    // Buscar contactos
    public function buscar($palabraClave) {
        // Buscar contactos
        $stmt = $this->contacto->buscar($palabraClave);
        $num = $stmt->rowCount();

        // Verificar si se encontraron contactos
        if($num > 0) {
            // Array de contactos
            $contactos_arr = array();
            $contactos_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $contacto_item = array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "apellidos" => $apellidos,
                    "email" => $email,
                    "telefono" => $telefono,
                    "cargo" => $cargo,
                    "empresa" => $empresa,
                    "nombre_cliente" => $nombre_cliente ?? ""
                );

                array_push($contactos_arr["registros"], $contacto_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($contactos_arr);
        } else {
            // No se encontraron contactos
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron contactos que coincidan con la búsqueda.")
            );
        }
    }
}
?>
