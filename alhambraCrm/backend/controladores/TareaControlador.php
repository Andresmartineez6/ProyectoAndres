<?php
/**
 * Controlador Tarea
 * AlhambraCRM - Sistema de gestión de clientes
 */

class TareaControlador {
    // Propiedades de la base de datos
    private $db;
    private $tarea;

    // Constructor
    public function __construct($db) {
        $this->db = $db;
        $this->tarea = new Tarea($db);
    }

    // Obtener todas las tareas
    public function obtenerTodas() {
        // Obtener tareas desde el modelo
        $stmt = $this->tarea->obtenerTodas();
        $num = $stmt->rowCount();

        // Verificar si se encontraron tareas
        if($num > 0) {
            // Array de tareas
            $tareas_arr = array();
            $tareas_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $tarea_item = array(
                    "id" => $id,
                    "titulo" => $titulo,
                    "descripcion" => $descripcion,
                    "id_proyecto" => $id_proyecto,
                    "nombre_proyecto" => $nombre_proyecto,
                    "asignado_a" => $asignado_a,
                    "nombre_asignado" => $nombre_asignado,
                    "fecha_inicio" => $fecha_inicio,
                    "fecha_fin" => $fecha_fin,
                    "estado" => $estado,
                    "prioridad" => $prioridad,
                    "fecha_creacion" => $fecha_creacion,
                    "fecha_actualizacion" => $fecha_actualizacion
                );

                array_push($tareas_arr["registros"], $tarea_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($tareas_arr);
        } else {
            // No se encontraron tareas
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron tareas.")
            );
        }
    }

    // Obtener tareas por proyecto
    public function obtenerPorProyecto($id_proyecto) {
        // Obtener tareas desde el modelo
        $stmt = $this->tarea->obtenerPorProyecto($id_proyecto);
        $num = $stmt->rowCount();

        // Verificar si se encontraron tareas
        if($num > 0) {
            // Array de tareas
            $tareas_arr = array();
            $tareas_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $tarea_item = array(
                    "id" => $id,
                    "titulo" => $titulo,
                    "descripcion" => $descripcion,
                    "id_proyecto" => $id_proyecto,
                    "asignado_a" => $asignado_a,
                    "nombre_asignado" => $nombre_asignado,
                    "fecha_inicio" => $fecha_inicio,
                    "fecha_fin" => $fecha_fin,
                    "estado" => $estado,
                    "prioridad" => $prioridad,
                    "fecha_creacion" => $fecha_creacion,
                    "fecha_actualizacion" => $fecha_actualizacion
                );

                array_push($tareas_arr["registros"], $tarea_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($tareas_arr);
        } else {
            // No se encontraron tareas
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron tareas para este proyecto.")
            );
        }
    }

    // Obtener tareas asignadas a un trabajador
    public function obtenerPorTrabajador($id_trabajador) {
        // Obtener tareas desde el modelo
        $stmt = $this->tarea->obtenerPorTrabajador($id_trabajador);
        $num = $stmt->rowCount();

        // Verificar si se encontraron tareas
        if($num > 0) {
            // Array de tareas
            $tareas_arr = array();
            $tareas_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $tarea_item = array(
                    "id" => $id,
                    "titulo" => $titulo,
                    "descripcion" => $descripcion,
                    "id_proyecto" => $id_proyecto,
                    "nombre_proyecto" => $nombre_proyecto,
                    "asignado_a" => $asignado_a,
                    "fecha_inicio" => $fecha_inicio,
                    "fecha_fin" => $fecha_fin,
                    "estado" => $estado,
                    "prioridad" => $prioridad,
                    "fecha_creacion" => $fecha_creacion,
                    "fecha_actualizacion" => $fecha_actualizacion
                );

                array_push($tareas_arr["registros"], $tarea_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($tareas_arr);
        } else {
            // No se encontraron tareas
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron tareas asignadas a este trabajador.")
            );
        }
    }

    // Obtener una sola tarea
    public function obtenerUna($id) {
        // Establecer el ID de la tarea a leer
        $this->tarea->id = $id;

        // Obtener tarea
        if($this->tarea->obtenerUna()) {
            // Crear array
            $tarea_arr = array(
                "id" =>  $this->tarea->id,
                "titulo" => $this->tarea->titulo,
                "descripcion" => $this->tarea->descripcion,
                "id_proyecto" => $this->tarea->id_proyecto,
                "asignado_a" => $this->tarea->asignado_a,
                "fecha_inicio" => $this->tarea->fecha_inicio,
                "fecha_fin" => $this->tarea->fecha_fin,
                "estado" => $this->tarea->estado,
                "prioridad" => $this->tarea->prioridad,
                "fecha_creacion" => $this->tarea->fecha_creacion,
                "fecha_actualizacion" => $this->tarea->fecha_actualizacion
            );

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($tarea_arr);
        } else {
            // No se encontró la tarea
            http_response_code(404);

            // Informar al usuario
            return json_encode(array("mensaje" => "La tarea no existe."));
        }
    }

    // Crear una tarea
    public function crear($datos) {
        // Verificar que no esté vacío
        if(!empty($datos->titulo)) {
            // Establecer valores de propiedad de la tarea
            $this->tarea->titulo = $datos->titulo;
            $this->tarea->descripcion = $datos->descripcion ?? "";
            $this->tarea->id_proyecto = $datos->id_proyecto ?? null;
            $this->tarea->asignado_a = $datos->asignado_a ?? null;
            $this->tarea->fecha_inicio = $datos->fecha_inicio ?? null;
            $this->tarea->fecha_fin = $datos->fecha_fin ?? null;
            $this->tarea->estado = $datos->estado ?? "pendiente";
            $this->tarea->prioridad = $datos->prioridad ?? "media";

            // Crear la tarea
            if($this->tarea->crear()) {
                // Código de respuesta - 201 creado
                http_response_code(201);

                // Informar al usuario
                return json_encode(array("mensaje" => "Tarea creada correctamente."));
            } else {
                // Código de respuesta - 503 servicio no disponible
                http_response_code(503);

                // Informar al usuario
                return json_encode(array("mensaje" => "No se pudo crear la tarea."));
            }
        } else {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se puede crear la tarea. Los datos están incompletos."));
        }
    }

    // Actualizar una tarea
    public function actualizar($id, $datos) {
        // Establecer el ID de la tarea a actualizar
        $this->tarea->id = $id;

        // Verificar que no esté vacío
        if(!empty($datos->titulo)) {
            // Establecer valores de propiedad de la tarea
            $this->tarea->titulo = $datos->titulo;
            $this->tarea->descripcion = $datos->descripcion ?? "";
            $this->tarea->id_proyecto = $datos->id_proyecto ?? null;
            $this->tarea->asignado_a = $datos->asignado_a ?? null;
            $this->tarea->fecha_inicio = $datos->fecha_inicio ?? null;
            $this->tarea->fecha_fin = $datos->fecha_fin ?? null;
            $this->tarea->estado = $datos->estado ?? "pendiente";
            $this->tarea->prioridad = $datos->prioridad ?? "media";

            // Actualizar la tarea
            if($this->tarea->actualizar()) {
                // Código de respuesta - 200 OK
                http_response_code(200);

                // Informar al usuario
                return json_encode(array("mensaje" => "Tarea actualizada correctamente."));
            } else {
                // Código de respuesta - 503 servicio no disponible
                http_response_code(503);

                // Informar al usuario
                return json_encode(array("mensaje" => "No se pudo actualizar la tarea."));
            }
        } else {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se puede actualizar la tarea. Los datos están incompletos."));
        }
    }

    // Eliminar una tarea
    public function eliminar($id) {
        // Establecer el ID de la tarea a eliminar
        $this->tarea->id = $id;

        // Eliminar la tarea
        if($this->tarea->eliminar()) {
            // Código de respuesta - 200 OK
            http_response_code(200);

            // Informar al usuario
            return json_encode(array("mensaje" => "Tarea eliminada correctamente."));
        } else {
            // Código de respuesta - 503 servicio no disponible
            http_response_code(503);

            // Informar al usuario
            return json_encode(array("mensaje" => "No se pudo eliminar la tarea."));
        }
    }

    // Buscar tareas
    public function buscar($palabraClave) {
        // Buscar tareas
        $stmt = $this->tarea->buscar($palabraClave);
        $num = $stmt->rowCount();

        // Verificar si se encontraron tareas
        if($num > 0) {
            // Array de tareas
            $tareas_arr = array();
            $tareas_arr["registros"] = array();

            // Recorrer los resultados
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $tarea_item = array(
                    "id" => $id,
                    "titulo" => $titulo,
                    "descripcion" => $descripcion,
                    "nombre_proyecto" => $nombre_proyecto,
                    "estado" => $estado,
                    "prioridad" => $prioridad
                );

                array_push($tareas_arr["registros"], $tarea_item);
            }

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode($tareas_arr);
        } else {
            // No se encontraron tareas
            http_response_code(404);

            // Informar al usuario
            return json_encode(
                array("mensaje" => "No se encontraron tareas que coincidan con la búsqueda.")
            );
        }
    }
}
?>
