<?php
// Cabeceras requeridas
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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

// Obtener los datos enviados
$datos = json_decode(file_get_contents("php://input"));

// Crear la tarea
$resultado = $tareaControlador->crear($datos);

// Devolver el resultado
echo $resultado;
?>
