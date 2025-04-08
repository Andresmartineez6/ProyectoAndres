import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ContextoAutenticacion } from '../../contexto/ContextoAutenticacion';
import './Registro.css';

const Registro = () => {
  const navigate = useNavigate();
  const { registrarUsuario } = useContext(ContextoAutenticacion);
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    empresa: '',
    password: '',
    confirmarPassword: '',
    aceptarTerminos: false
  });
  
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación del formulario
    const form = e.currentTarget;
    if (!form.checkValidity() || formData.password !== formData.confirmarPassword) {
      e.stopPropagation();
      setValidated(true);
      
      if (formData.password !== formData.confirmarPassword) {
        setError('Las contraseñas no coinciden');
      }
      return;
    }
    
    setEnviando(true);
    setError('');
    
    // Datos para el registro
    const datosRegistro = {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono,
      empresa: formData.empresa,
      password: formData.password
    };
    
    // Llamada a la función de registro del contexto
    try {
      registrarUsuario(datosRegistro, () => {
        // Callback que se ejecuta después del registro exitoso
        navigate('/area-privada');
      });
    } catch (err) {
      setError('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
      setEnviando(false);
    }
  };

  return (
    <div className="pagina-registro">
      <Container>
        <div className="contenedor-registro">
          <div className="cabecera-registro">
            <img src="/assets/imgs/Property 1=Default.png" alt="AlhambraCRM" className="logo-registro" />
            <h1>Crear una cuenta</h1>
            <p>Únete a AlhambraCRM y comienza a gestionar tus clientes de forma eficiente</p>
          </div>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    required 
                    placeholder="Tu nombre"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, introduce tu nombre.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="apellidos" 
                    value={formData.apellidos} 
                    onChange={handleChange} 
                    required 
                    placeholder="Tus apellidos"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, introduce tus apellidos.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="Tu email"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce un email válido.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control 
                type="tel" 
                name="telefono" 
                value={formData.telefono} 
                onChange={handleChange} 
                placeholder="Tu teléfono"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Empresa</Form.Label>
              <Form.Control 
                type="text" 
                name="empresa" 
                value={formData.empresa} 
                onChange={handleChange} 
                placeholder="Nombre de tu empresa"
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                    placeholder="Tu contraseña"
                    minLength="8"
                  />
                  <Form.Control.Feedback type="invalid">
                    La contraseña debe tener al menos 8 caracteres.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="confirmarPassword" 
                    value={formData.confirmarPassword} 
                    onChange={handleChange} 
                    required 
                    placeholder="Confirma tu contraseña"
                    isInvalid={formData.password !== formData.confirmarPassword && formData.confirmarPassword !== ''}
                  />
                  <Form.Control.Feedback type="invalid">
                    Las contraseñas no coinciden.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-4">
              <Form.Check 
                type="checkbox" 
                label={<span>Acepto los <Link to="/terminos">términos y condiciones</Link> y la <Link to="/privacidad">política de privacidad</Link></span>} 
                name="aceptarTerminos" 
                checked={formData.aceptarTerminos} 
                onChange={handleChange} 
                required
                feedback="Debes aceptar los términos y condiciones para continuar."
                feedbackType="invalid"
              />
            </Form.Group>
            
            <Button 
              type="submit" 
              className="boton-registro" 
              disabled={enviando}
            >
              {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </Form>
          
          <div className="pie-registro">
            <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Registro;
