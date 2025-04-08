import React, { useState, useContext } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ContextoAutenticacion } from '../../contexto/ContextoAutenticacion';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { iniciarSesion, esAdmin } = useContext(ContextoAutenticacion);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    recordarme: false
  });
  
  const [error, setError] = useState('');
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
    
    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    
    setEnviando(true);
    setError('');
    
    // Llamada a la función de inicio de sesión del contexto
    try {
      iniciarSesion(formData, () => {
        // Callback que se ejecuta después del inicio de sesión exitoso
        // Redirigimos según el rol del usuario
        if (esAdmin()) {
          navigate('/admin');
        } else {
          navigate('/area-privada');
        }
      });
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
      setEnviando(false);
    }
  };

  return (
    <div className="pagina-login">
      <Container>
        <div className="contenedor-login">
          <div className="cabecera-login">
            <img src="/assets/imgs/Property 1=Default.png" alt="AlhambraCRM" className="logo-login" />
            <h1>Iniciar Sesión</h1>
            <p>Accede a tu cuenta de AlhambraCRM</p>
          </div>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
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
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                placeholder="Tu contraseña"
              />
            </Form.Group>
            
            <div className="opciones-login">
              <Form.Check 
                type="checkbox" 
                label="Recordarme" 
                name="recordarme" 
                checked={formData.recordarme} 
                onChange={handleChange} 
              />
              <Link to="/recuperar-password" className="enlace-recuperar">¿Olvidaste tu contraseña?</Link>
            </div>
            
            <Button 
              type="submit" 
              className="boton-login" 
              disabled={enviando}
            >
              {enviando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Form>
          
          <div className="pie-login">
            <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
