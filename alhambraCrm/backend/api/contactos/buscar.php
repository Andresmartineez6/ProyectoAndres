<?php
// Cabeceras requeridas
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Incluir archivos de configuración y modelos
include_once '../../config/database.php';
include_once '../../modelos/Contacto.php';
include_once '../../controladores/ContactoControlador.php';
include_once '../../utils/respuesta.php';

// Instanciar la base de datos y conectar
$database = new Database();
$db = $database->getConnection();

// Instanciar el controlador de contactos
$contactoControlador = new ContactoControlador($db);

// Obtener la palabra clave de búsqueda
$palabraClave = isset($_GET['s']) ? $_GET['s'] : die();

// Buscar contactos
$resultado = $contactoControlador->buscar($palabraClave);

// Devolver el resultado
echo $resultado;
?>
