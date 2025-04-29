<?php
// Cabeceras requeridas
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
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

// Obtener el ID de la tarea a actualizar
$id = isset($_GET['id']) ? $_GET['id'] : die();

// Obtener los datos enviados
$datos = json_decode(file_get_contents("php://input"));

// Actualizar la tarea
$resultado = $tareaControlador->actualizar($id, $datos);

// Devolver el resultado
echo $resultado;
?>
