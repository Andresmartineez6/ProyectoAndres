<?php
// Cabeceras requeridas
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Incluir archivos de configuración y modelos
include_once '../../config/database.php';
include_once '../../modelos/Cliente.php';
include_once '../../controladores/ClienteControlador.php';
include_once '../../utils/respuesta.php';

// Instanciar la base de datos y conectar
$database = new Database();
$db = $database->getConnection();

// Instanciar el controlador de clientes
$clienteControlador = new ClienteControlador($db);

// Obtener el ID del cliente
$id = isset($_GET['id']) ? $_GET['id'] : die();

// Obtener el cliente
$resultado = $clienteControlador->obtenerUno($id);

// Devolver el resultado
echo $resultado;
?>
