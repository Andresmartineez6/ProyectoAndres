<?php
/**
 * API: Crear un nuevo cliente
 * Método: POST
 */

// Encabezados
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Incluir archivos necesarios
require_once '../../controladores/ClienteControlador.php';
require_once '../../utils/respuesta.php';

// Obtener datos enviados
$datos = json_decode(file_get_contents("php://input"), true);

// Verificar si hay datos
if (!$datos) {
    Respuesta::error('No se recibieron datos', 400);
    exit;
}

// Inicializar controlador
$controlador = new ClienteControlador();

// Procesar la solicitud
$controlador->crear($datos);
?>
