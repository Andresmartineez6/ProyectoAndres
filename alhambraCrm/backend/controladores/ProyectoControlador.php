<?php
/**
 * Controlador Proyecto
 * AlhambraCRM - Sistema de gestión de clientes
 */

class ProyectoControlador {
    // Propiedades de la base de datos
    private $db;
    private $proyecto;

    // Constructor
    public function __construct($db) {
        $this->db = $db;
        $this->proyecto = new Proyecto($db);
    }

    // Obtener todos los proyectos
    public function obtenerTodos() {
        // Obtener proyectos desde el modelo
        $stmt = $this->proyecto->obtenerTodos();
        $num = $stmt->rowCount();

        // Verificar si se encontraron proyectos
        if($num > 0) {
            // Array de proyectos
            $proyectos_arr = array();
            $proyectos_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $proyecto_item = array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "descripcion" => $descripcion,
                    "id_cliente" => $id_cliente,
                    "nombre_cliente" => $nombre_cliente,
                    "responsable_id" => $responsable_id,
                    "nombre_responsable" => $nombre_responsable,
                    "fecha_inicio" => $fecha_inicio,
                    "fecha_fin" => $fecha_fin,
                    "presupuesto" => $presupuesto,
                    "estado" => $estado,
                    "prioridad" => $prioridad,
                    "fecha_creacion" => $fecha_creacion,
                    "fecha_actualizacion" => $fecha_actualizacion
                );

                array_push($proyectos_arr["registros"], $proyecto_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($proyectos_arr);
        } else {
            // No se encontraron proyectos
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron proyectos.")
            );
        }
    }

    // Obtener proyectos por cliente
    public function obtenerPorCliente($id_cliente) {
        // Obtener proyectos desde el modelo
        $stmt = $this->proyecto->obtenerPorCliente($id_cliente);
        $num = $stmt->rowCount();

        // Verificar si se encontraron proyectos
        if($num > 0) {
            // Array de proyectos
            $proyectos_arr = array();
            $proyectos_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $proyecto_item = array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "descripcion" => $descripcion,
                    "id_cliente" => $id_cliente,
                    "responsable_id" => $responsable_id,
                    "nombre_responsable" => $nombre_responsable,
                    "fecha_inicio" => $fecha_inicio,
                    "fecha_fin" => $fecha_fin,
                    "presupuesto" => $presupuesto,
                    "estado" => $estado,
                    "prioridad" => $prioridad,
                    "fecha_creacion" => $fecha_creacion,
                    "fecha_actualizacion" => $fecha_actualizacion
                );

                array_push($proyectos_arr["registros"], $proyecto_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($proyectos_arr);
        } else {
            // No se encontraron proyectos
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron proyectos para este cliente.")
            );
        }
    }

    // Obtener un solo proyecto
    public function obtenerUno($id) {
        // Establecer el ID del proyecto a leer
        $this->proyecto->id = $id;

        // Obtener proyecto
        if($this->proyecto->obtenerUno()) {
            // Crear array
            $proyecto_arr = array(
                "id" =>  $this->proyecto->id,
                "nombre" => $this->proyecto->nombre,
                "descripcion" => $this->proyecto->descripcion,
                "id_cliente" => $this->proyecto->id_cliente,
                "responsable_id" => $this->proyecto->responsable_id,
                "fecha_inicio" => $this->proyecto->fecha_inicio,
                "fecha_fin" => $this->proyecto->fecha_fin,
                "presupuesto" => $this->proyecto->presupuesto,
                "estado" => $this->proyecto->estado,
                "prioridad" => $this->proyecto->prioridad,
                "fecha_creacion" => $this->proyecto->fecha_creacion,
                "fecha_actualizacion" => $this->proyecto->fecha_actualizacion
            );

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($proyecto_arr);
        } else {
            // No se encontró el proyecto
            http_response_code(404);

            // Informar al usuario
            return json_encode(array("mensaje" => "El proyecto no existe."));
        }
    }

    // Crear un proyecto
    public function crear($datos) {
        // Verificar que no esté vacío
        if(
            !empty($datos->nombre) &&
            !empty($datos->id_cliente)
        ) {
            // Establecer valores de propiedad del proyecto
            $this->proyecto->nombre = $datos->nombre;
            $this->proyecto->descripcion = $datos->descripcion ?? "";
            $this->proyecto->id_cliente = $datos->id_cliente;
            $this->proyecto->responsable_id = $datos->responsable_id ?? null;
            $this->proyecto->fecha_inicio = $datos->fecha_inicio ?? null;
            $this->proyecto->fecha_fin = $datos->fecha_fin ?? null;
            $this->proyecto->presupuesto = $datos->presupuesto ?? 0;
            $this->proyecto->estado = $datos->estado ?? "pendiente";
            $this->proyecto->prioridad = $datos->prioridad ?? "media";

            // Crear el proyecto
            if($this->proyecto->crear()) {
                // Código de respuesta - 201 creado
                http_response_code(201);

                // Informar al usuario
                return json_encode(array("mensaje" => "Proyecto creado correctamente."));
            } else {
                // Código de respuesta - 503 servicio no disponible
                http_response_code(503);

                // Informar al usuario
                return json_encode(array("mensaje" => "No se pudo crear el proyecto."));
            }
        } else {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se puede crear el proyecto. Los datos están incompletos."));
        }
    }

    // Actualizar un proyecto
    public function actualizar($id, $datos) {
        // Establecer el ID del proyecto a actualizar
        $this->proyecto->id = $id;

        // Verificar que no esté vacío
        if(
            !empty($datos->nombre) &&
            !empty($datos->id_cliente)
        ) {
            // Establecer valores de propiedad del proyecto
            $this->proyecto->nombre = $datos->nombre;
            $this->proyecto->descripcion = $datos->descripcion ?? "";
            $this->proyecto->id_cliente = $datos->id_cliente;
            $this->proyecto->responsable_id = $datos->responsable_id ?? null;
            $this->proyecto->fecha_inicio = $datos->fecha_inicio ?? null;
            $this->proyecto->fecha_fin = $datos->fecha_fin ?? null;
            $this->proyecto->presupuesto = $datos->presupuesto ?? 0;
            $this->proyecto->estado = $datos->estado ?? "pendiente";
            $this->proyecto->prioridad = $datos->prioridad ?? "media";

            // Actualizar el proyecto
            if($this->proyecto->actualizar()) {
                // Código de respuesta - 200 OK
                http_response_code(200);

                // Informar al usuario
                return json_encode(array("mensaje" => "Proyecto actualizado correctamente."));
            } else {
                // Código de respuesta - 503 servicio no disponible
                http_response_code(503);

                // Informar al usuario
                return json_encode(array("mensaje" => "No se pudo actualizar el proyecto."));
            }
        } else {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se puede actualizar el proyecto. Los datos están incompletos."));
        }
    }

    // Eliminar un proyecto
    public function eliminar($id) {
        // Establecer el ID del proyecto a eliminar
        $this->proyecto->id = $id;

        // Eliminar el proyecto
        if($this->proyecto->eliminar()) {
            // Código de respuesta - 200 OK
            http_response_code(200);

            // Informar al usuario
            return json_encode(array("mensaje" => "Proyecto eliminado correctamente."));
        } else {
            // Código de respuesta - 503 servicio no disponible
            http_response_code(503);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se pudo eliminar el proyecto."));
        }
    }

    // Buscar proyectos
    public function buscar($palabraClave) {
        // Buscar proyectos
        $stmt = $this->proyecto->buscar($palabraClave);
        $num = $stmt->rowCount();

        // Verificar si se encontraron proyectos
        if($num > 0) {
            // Array de proyectos
            $proyectos_arr = array();
            $proyectos_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $proyecto_item = array(
                    "id" => $id,
                    "nombre" => $nombre,
                    "descripcion" => $descripcion,
                    "nombre_cliente" => $nombre_cliente,
                    "estado" => $estado,
                    "prioridad" => $prioridad
                );

                array_push($proyectos_arr["registros"], $proyecto_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($proyectos_arr);
        } else {
            // No se encontraron proyectos
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron proyectos que coincidan con la búsqueda.")
            );
        }
    }
}
?>
