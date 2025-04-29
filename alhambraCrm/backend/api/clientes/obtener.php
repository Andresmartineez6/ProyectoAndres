<?php
// Cabeceras requeridas
header("Access-Control-Allow-Origin: *");
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

// Obtener todos los clientes
$resultado = $clienteControlador->obtenerTodos();

// Devolver el resultado
echo $resultado;
?>
