<?php
/**
 * API: Obtener todos los clientes
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

// Procesar la solicitud
$controlador->obtenerTodos();
?>
