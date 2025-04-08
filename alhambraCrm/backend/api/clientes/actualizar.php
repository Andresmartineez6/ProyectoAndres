<?php
/**
 * API: Actualizar un cliente existente
 * Método: PUT
 */

// Encabezados
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Incluir archivos necesarios
require_once '../../controladores/ClienteControlador.php';
require_once '../../utils/respuesta.php';

// Obtener datos enviados
$datos = json_decode(file_get_contents("php://input"), true);

// Verificar si hay datos y un ID
if (!$datos || !isset($datos['id']) || empty($datos['id'])) {
    Respuesta::error('ID de cliente y datos requeridos', 400);
    exit;
}

// Obtener ID
$id = intval($datos['id']);

// Inicializar controlador
$controlador = new ClienteControlador();

// Procesar la solicitud
$controlador->actualizar($id, $datos);
?>
