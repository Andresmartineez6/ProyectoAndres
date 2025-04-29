<?php
/**
 * Controlador Usuario
 * AlhambraCRM - Sistema de gestión de clientes
 */

class UsuarioControlador {
    // Propiedades de la base de datos
    private $db;
    private $usuario;

    // Constructor
    public function __construct($db) {
        $this->db = $db;
        $this->usuario = new Usuario($db);
    }

    // Iniciar sesión
    public function login($datos) {
        // Verificar que no esté vacío
        if(empty($datos->email) || empty($datos->contrasena)) {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "El email y la contraseña son obligatorios."
            ));
        }

        // Establecer valores de propiedad del usuario
        $this->usuario->email = $datos->email;
        $this->usuario->contrasena = $datos->contrasena;

        // Intentar iniciar sesión
        if($this->usuario->login()) {
            // Generar token JWT
            $token = $this->generarToken();
            
            // Código de respuesta - 200 OK
            http_response_code(200);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => true,
                "mensaje" => "Inicio de sesión exitoso.",
                "token" => $token,
                "usuario" => array(
                    "id" => $this->usuario->id,
                    "nombre" => $this->usuario->nombre,
                    "apellidos" => $this->usuario->apellidos,
                    "email" => $this->usuario->email,
                    "tipo" => $this->usuario->tipo
                )
            ));
        } else {
            // Código de respuesta - 401 no autorizado
            http_response_code(401);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "Email o contraseña incorrectos."
            ));
        }
    }

    // Registrar un nuevo usuario
    public function registrar($datos) {
        // Verificar que no esté vacío
        if(
            empty($datos->nombre) || 
            empty($datos->email) || 
            empty($datos->contrasena) || 
            empty($datos->tipo)
        ) {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "No se puede crear el usuario. Los datos están incompletos."
            ));
        }

        // Verificar si el email ya existe
        $this->usuario->email = $datos->email;
        if($this->usuario->emailExiste()) {
            // Código de respuesta - 409 conflicto
            http_response_code(409);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "El email ya está registrado."
            ));
        }

        // Establecer valores de propiedad del usuario
        $this->usuario->nombre = $datos->nombre;
        $this->usuario->apellidos = $datos->apellidos ?? "";
        $this->usuario->email = $datos->email;
        $this->usuario->contrasena = $datos->contrasena;
        $this->usuario->tipo = $datos->tipo;
        $this->usuario->estado = "activo";

        // Crear el usuario
        if($this->usuario->crear()) {
            // Código de respuesta - 201 creado
            http_response_code(201);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => true,
                "mensaje" => "Usuario creado correctamente."
            ));
        } else {
            // Código de respuesta - 503 servicio no disponible
            http_response_code(503);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "No se pudo crear el usuario."
            ));
        }
    }

    // Obtener un usuario por ID
    public function obtenerPorId($id) {
        // Establecer el ID del usuario a leer
        $this->usuario->id = $id;

        // Obtener usuario
        if($this->usuario->obtenerPorId()) {
            // Crear array
            $usuario_arr = array(
                "id" => $this->usuario->id,
                "nombre" => $this->usuario->nombre,
                "apellidos" => $this->usuario->apellidos,
                "email" => $this->usuario->email,
                "tipo" => $this->usuario->tipo,
                "estado" => $this->usuario->estado,
                "fecha_creacion" => $this->usuario->fecha_creacion,
                "fecha_actualizacion" => $this->usuario->fecha_actualizacion
            );

            // Código de respuesta - 200 OK
            http_response_code(200);

            // Formato JSON
            return json_encode(array(
                "exito" => true,
                "usuario" => $usuario_arr
            ));
        } else {
            // No se encontró el usuario
            http_response_code(404);

            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "El usuario no existe."
            ));
        }
    }

    // Actualizar un usuario
    public function actualizar($id, $datos) {
        // Establecer el ID del usuario a actualizar
        $this->usuario->id = $id;

        // Verificar que no esté vacío
        if(
            empty($datos->nombre) || 
            empty($datos->email) || 
            empty($datos->tipo)
        ) {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "No se puede actualizar el usuario. Los datos están incompletos."
            ));
        }

        // Verificar si el usuario existe
        if(!$this->usuario->obtenerPorId()) {
            // Código de respuesta - 404 no encontrado
            http_response_code(404);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "El usuario no existe."
            ));
        }

        // Verificar si el email ya existe (si se cambió)
        if($this->usuario->email != $datos->email) {
            $this->usuario->email = $datos->email;
            if($this->usuario->emailExiste()) {
                // Código de respuesta - 409 conflicto
                http_response_code(409);
                
                // Informar al usuario
                return json_encode(array(
                    "exito" => false,
                    "mensaje" => "El email ya está registrado."
                ));
            }
        }

        // Establecer valores de propiedad del usuario
        $this->usuario->nombre = $datos->nombre;
        $this->usuario->apellidos = $datos->apellidos ?? "";
        $this->usuario->email = $datos->email;
        $this->usuario->tipo = $datos->tipo;
        $this->usuario->estado = $datos->estado ?? "activo";

        // Actualizar el usuario
        if($this->usuario->actualizar()) {
            // Código de respuesta - 200 OK
            http_response_code(200);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => true,
                "mensaje" => "Usuario actualizado correctamente."
            ));
        } else {
            // Código de respuesta - 503 servicio no disponible
            http_response_code(503);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "No se pudo actualizar el usuario."
            ));
        }
    }

    // Actualizar la contraseña de un usuario
    public function actualizarContrasena($id, $datos) {
        // Establecer el ID del usuario a actualizar
        $this->usuario->id = $id;

        // Verificar que no esté vacío
        if(empty($datos->contrasena)) {
            // Código de respuesta - 400 solicitud incorrecta
            http_response_code(400);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "La contraseña es obligatoria."
            ));
        }

        // Verificar si el usuario existe
        if(!$this->usuario->obtenerPorId()) {
            // Código de respuesta - 404 no encontrado
            http_response_code(404);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "El usuario no existe."
            ));
        }

        // Establecer valores de propiedad del usuario
        $this->usuario->contrasena = $datos->contrasena;

        // Actualizar la contraseña
        if($this->usuario->actualizarContrasena()) {
            // Código de respuesta - 200 OK
            http_response_code(200);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => true,
                "mensaje" => "Contraseña actualizada correctamente."
            ));
        } else {
            // Código de respuesta - 503 servicio no disponible
            http_response_code(503);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "No se pudo actualizar la contraseña."
            ));
        }
    }

    // Eliminar un usuario
    public function eliminar($id) {
        // Establecer el ID del usuario a eliminar
        $this->usuario->id = $id;

        // Verificar si el usuario existe
        if(!$this->usuario->obtenerPorId()) {
            // Código de respuesta - 404 no encontrado
            http_response_code(404);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "El usuario no existe."
            ));
        }

        // Eliminar el usuario
        if($this->usuario->eliminar()) {
            // Código de respuesta - 200 OK
            http_response_code(200);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => true,
                "mensaje" => "Usuario eliminado correctamente."
            ));
        } else {
            // Código de respuesta - 503 servicio no disponible
            http_response_code(503);
            
            // Informar al usuario
            return json_encode(array(
                "exito" => false,
                "mensaje" => "No se pudo eliminar el usuario."
            ));
        }
    }

    // Generar token JWT
    private function generarToken() {
        // En un entorno de producción, deberías usar una biblioteca JWT adecuada
        // Por simplicidad, aquí generamos un token simple
        $tiempo = time();
        $expiracion = $tiempo + 3600; // 1 hora
        
        $payload = array(
            "iat" => $tiempo,
            "exp" => $expiracion,
            "data" => array(
                "id" => $this->usuario->id,
                "email" => $this->usuario->email,
                "tipo" => $this->usuario->tipo
            )
        );
        
        // En un entorno real, usaríamos una clave secreta y un algoritmo de firma
        // Por ahora, simplemente codificamos en base64
        return base64_encode(json_encode($payload));
    }
}
?>
