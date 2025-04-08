<?php
/**
 * API: Obtener un cliente específico
 * Método: GET
 */

// Encabezados
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET');

// Incluir archivos necesarios
require_once '../../controladores/ClienteControlador.php';

// Inicializar controlador
$controlador = new ClienteControlador();

// Verificar si se proporcionó un ID
if (isset($_GET['id']) && !empty($_GET['id'])) {
    // Obtener ID
    $id = intval($_GET['id']);
    
    // Procesar la solicitud
    $controlador->obtenerUno($id);
} else {
    // No se proporcionó ID
    require_once '../../utils/respuesta.php';
    Respuesta::error('ID de cliente requerido', 400);
}
?>
