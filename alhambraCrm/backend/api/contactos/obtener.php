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

// Verificar si se solicitan contactos de un cliente específico
if(isset($_GET['id_cliente'])) {
    // Obtener contactos por cliente
    $resultado = $contactoControlador->obtenerPorCliente($_GET['id_cliente']);
} 
// Si no hay parámetros, obtener todos los contactos
else {
    // Obtener todos los contactos
    $resultado = $contactoControlador->obtenerTodos();
}

// Devolver el resultado
echo $resultado;
?>
