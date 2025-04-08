<?php
/**
 * Configuración de la base de datos para AlhambraCRM
 * Este archivo contiene las credenciales y configuración para la conexión a la base de datos
 */

class BaseDatos {
    // Credenciales de la base de datos
    private $host = 'localhost';
    private $db_nombre = 'alhambracrm';
    private $usuario = 'root';
    private $contrasena = '';
    private $conexion;

    /**
     * Método para conectar a la base de datos
     * @return PDO Objeto de conexión PDO
     */
    public function conectar() {
        $this->conexion = null;

        try {
            $this->conexion = new PDO(
                'mysql:host=' . $this->host . ';dbname=' . $this->db_nombre,
                $this->usuario,
                $this->contrasena,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
                )
            );
        } catch(PDOException $excepcion) {
            echo 'Error de conexión: ' . $excepcion->getMessage();
        }

        return $this->conexion;
    }
}
?>
