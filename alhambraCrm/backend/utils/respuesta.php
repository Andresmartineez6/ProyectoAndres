<?php
/**
 * Clase para manejar respuestas API en formato JSON
 * Esta clase facilita el envío de respuestas estructuradas desde el backend al frontend
 */

class Respuesta {
    /**
     * Envía una respuesta de éxito con datos opcionales
     * @param string $mensaje Mensaje de éxito
     * @param array $datos Datos a enviar (opcional)
     * @return void
     */
    public static function exito($mensaje, $datos = []) {
        // Configurar cabeceras para JSON y CORS
        self::configurarCabeceras();
        
        // Crear estructura de respuesta
        $respuesta = [
            'estado' => 'exito',
            'mensaje' => $mensaje
        ];
        
        // Añadir datos si existen
        if (!empty($datos)) {
            $respuesta['datos'] = $datos;
        }
        
        // Enviar respuesta como JSON
        echo json_encode($respuesta);
        exit;
    }
    
    /**
     * Envía una respuesta de error
     * @param string $mensaje Mensaje de error
     * @param int $codigo Código de estado HTTP (por defecto 400)
     * @return void
     */
    public static function error($mensaje, $codigo = 400) {
        // Configurar cabeceras para JSON y CORS
        self::configurarCabeceras();
        
        // Establecer código de estado HTTP
        http_response_code($codigo);
        
        // Crear estructura de respuesta
        $respuesta = [
            'estado' => 'error',
            'mensaje' => $mensaje
        ];
        
        // Enviar respuesta como JSON
        echo json_encode($respuesta);
        exit;
    }
    
    /**
     * Configura las cabeceras para permitir CORS y especificar JSON
     * @return void
     */
    private static function configurarCabeceras() {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json; charset=UTF-8');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }
}
?>
