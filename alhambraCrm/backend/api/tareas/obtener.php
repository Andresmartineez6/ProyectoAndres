<?php
// Cabeceras requeridas
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Incluir archivos de configuración y modelos
include_once '../../config/database.php';
include_once '../../modelos/Tarea.php';
include_once '../../controladores/TareaControlador.php';
include_once '../../utils/respuesta.php';

// Instanciar la base de datos y conectar
$database = new Database();
$db = $database->getConnection();

// Instanciar el controlador de tareas
$tareaControlador = new TareaControlador($db);

// Verificar si se solicitan tareas de un proyecto específico
if(isset($_GET['id_proyecto'])) {
    // Obtener tareas por proyecto
    $resultado = $tareaControlador->obtenerPorProyecto($_GET['id_proyecto']);
} 
// Verificar si se solicitan tareas asignadas a un trabajador específico
else if(isset($_GET['asignado_a'])) {
    // Obtener tareas por trabajador
    $resultado = $tareaControlador->obtenerPorTrabajador($_GET['asignado_a']);
} 
// Si no hay parámetros, obtener todas las tareas
else {
    // Obtener todas las tareas
    $resultado = $tareaControlador->obtenerTodas();
}

// Devolver el resultado
echo $resultado;
?>
