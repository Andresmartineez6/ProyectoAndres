<?php
/**
 * API: Buscar clientes
 * Método: GET
 */

// Encabezados
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET');

// Incluir archivos necesarios
require_once '../../controladores/ClienteControlador.php';
require_once '../../utils/respuesta.php';

// Verificar si se proporcionó un término de búsqueda
if (isset($_GET['termino']) && !empty($_GET['termino'])) {
    // Obtener término
    $termino = $_GET['termino'];
    
    // Inicializar controlador
    $controlador = new ClienteControlador();
    
    // Procesar la solicitud
    $controlador->buscar($termino);
} else {
    // No se proporcionó término de búsqueda
    Respuesta::error('Término de búsqueda requerido', 400);
}
?>
