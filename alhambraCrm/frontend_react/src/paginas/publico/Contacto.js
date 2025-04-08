import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Datos del formulario:', formData);
    alert('Gracias por contactarnos. Te responderemos lo antes posible.');
    // Reiniciar el formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });
  };

  return (
    <div className="pagina-contacto">
      <div className="cabecera-pagina">
        <Container>
          <h1>Contacta con nosotros</h1>
          <p>Estamos aquí para ayudarte. Envíanos tus preguntas o solicitudes.</p>
        </Container>
      </div>

      <Container className="contenedor-contacto">
        <Row>
          <Col lg={6} className="info-contacto">
            <h2>¿Cómo podemos ayudarte?</h2>
            <p>
              Si tienes alguna pregunta sobre AlhambraCRM, necesitas asistencia técnica o quieres solicitar una demo personalizada, no dudes en contactarnos.
            </p>
            
            <div className="datos-contacto">
              <div className="dato">
                <div className="icono">
                  <img src="/assets/imgs/emailLogoHeader.svg" alt="Email" />
                </div>
                <div className="texto">
                  <h3>Email</h3>
                  <p>info@alhambracrm.com</p>
                </div>
              </div>
              
              <div className="dato">
                <div className="icono">
                  <img src="/assets/imgs/telefonoLogoHeader.svg" alt="Teléfono" />
                </div>
                <div className="texto">
                  <h3>Teléfono</h3>
                  <p>636 60 85 69</p>
                </div>
              </div>
              
              <div className="dato">
                <div className="icono">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="texto">
                  <h3>Dirección</h3>
                  <p>Calle Alhambra 123, Granada, España</p>
                </div>
              </div>
            </div>
            
            <div className="horario">
              <h3>Horario de atención</h3>
              <p>Lunes a Viernes: 9:00 - 18:00</p>
              <p>Sábados: 10:00 - 14:00</p>
            </div>
          </Col>
          
          <Col lg={6} className="formulario-contacto">
            <div className="tarjeta-formulario">
              <h2>Envíanos un mensaje</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control 
                    type="tel" 
                    name="telefono" 
                    value={formData.telefono} 
                    onChange={handleChange} 
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Asunto</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="asunto" 
                    value={formData.asunto} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    name="mensaje" 
                    value={formData.mensaje} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
                
                <Button type="submit" className="boton-verde w-100">
                  Enviar mensaje
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      
      <div className="mapa-contacto">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12775.330139964781!2d-3.5932562302246134!3d37.17598869999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fce62d32c27d%3A0x9258f79dd3600d72!2sAlhambra!5e0!3m2!1ses!2ses!4v1617308792555!5m2!1ses!2ses" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          title="Mapa de ubicación"
        ></iframe>
      </div>
    </div>
  );
};

export default Contacto;
