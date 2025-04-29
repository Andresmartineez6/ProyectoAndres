<?php
/**
 * Clase para manejar respuestas JSON
 * AlhambraCRM - Sistema de gestión de clientes
 */

class Respuesta {
    // Propiedades
    public $exito;
    public $codigo;
    public $mensaje;
    public $datos;

    // Constructor
    public function __construct($exito, $codigo, $mensaje, $datos = null) {
        $this->exito = $exito;
        $this->codigo = $codigo;
        $this->mensaje = $mensaje;
        $this->datos = $datos;
    }

    // Convertir a JSON
    public function toJSON() {
        // Establecer el código de respuesta HTTP
        http_response_code($this->codigo);
        
        // Crear array de respuesta
        $respuesta = array(
            "exito" => $this->exito,
            "mensaje" => $this->mensaje
        );
        
        // Añadir datos si existen
        if($this->datos !== null) {
            $respuesta["datos"] = $this->datos;
        }
        
        // Devolver como JSON
        return json_encode($respuesta);
    }
}
?>
