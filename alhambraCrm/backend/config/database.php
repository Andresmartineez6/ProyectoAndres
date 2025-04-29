<?php
/**
 * Configuración de la base de datos
 * AlhambraCRM - Sistema de gestión de clientes
 */

class Database {
    // Parámetros de la base de datos
    private $host = "db"; // Nombre del servicio en docker-compose
    private $db_name = "alhambracrm";
    private $username = "usuario";
    private $password = "contraseña";
    public $conn;

    // Obtener la conexión a la base de datos
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
