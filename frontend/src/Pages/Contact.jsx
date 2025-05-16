import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setValidated(false);
    }, 5000);
  };

  return (
    <div className="bg-light">
      {/* Contact Hero */}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">Get in <span className="text-warning">Touch</span></h1>
              <p className="lead">Have questions about adoption? Want to volunteer or donate? We'd love to hear from you!</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Contact Info & Form Section */}
      <Container className="mb-5">
        <Row className="g-4">
          <Col lg={5}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h2 className="mb-4">Contact Information</h2>
                
                <div className="d-flex mb-4">
                  <div className="me-3 fs-4">📍</div>
                  <div>
                    <h5>Address</h5>
                    <p className="text-muted">
                      123 Pet Street<br />
                      Petville, CA 12345<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="me-3 fs-4">📞</div>
                  <div>
                    <h5>Phone</h5>
                    <p className="text-muted">
                      Main Office: (555) 123-4567<br />
                      Adoption Hotline: (555) 987-6543
                    </p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="me-3 fs-4">✉️</div>
                  <div>
                    <h5>Email</h5>
                    <p className="text-muted">
                      General Inquiries: info@petadopt.com<br />
                      Adoption Questions: adopt@petadopt.com<br />
                      Volunteer Opportunities: volunteer@petadopt.com
                    </p>
                  </div>
                </div>
                
                <div className="d-flex">
                  <div className="me-3 fs-4">🕒</div>
                  <div>
                    <h5>Hours of Operation</h5>
                    <p className="text-muted">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 5pm<br />
                      Sunday: 11am - 4pm
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="mb-4">Send Us a Message</h2>
                
                {formSubmitted && (
                  <Alert variant="success">
                    Your message has been sent successfully! We'll get back to you soon.
                  </Alert>
                )}
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a subject.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a message.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Map Section */}
      {/* <Container className="mb-5">
        <Card className="border-0 shadow-sm overflow-hidden">
          <Card.Header className="bg-white border-0">
            <h2 className="mt-2">Find Us</h2>
          </Card.Header>
          <Card.Body className="p-0 position-relative">
            <img 
              src="/api/placeholder/1200/400" 
              alt="Map location of PetAdopt"
              className="w-100"
            />
            <div className="position-absolute bottom-0 end-0 p-4">
              <Card className="shadow border-0">
                <Card.Body>
                  <p className="mb-3">This is where our main facility is located. Come visit us!</p>
                  <Button variant="primary">Get Directions</Button>
                </Card.Body>
              </Card>
            </div>
          </Card.Body>
        </Card>
      </Container> */}

      {/* FAQ Section */}
      <Container className="mb-5">
        <Row className="justify-content-center mb-4">
          <Col md={8} className="text-center">
            <h2 className="mb-3">Frequently Asked Questions</h2>
          </Col>
        </Row>
        
        <Row className="g-4">
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h5>What is the adoption process like?</h5>
                <p className="text-muted mb-0">
                  Our adoption process includes filling out an application, an interview with an adoption counselor, and sometimes a home visit. Once approved, you can select your new pet and complete the paperwork.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h5>What are the adoption fees?</h5>
                <p className="text-muted mb-0">
                  Adoption fees vary depending on the animal but typically range from $50 to $200. This fee helps cover vaccinations, spaying/neutering, and medical care the animal received while in our care.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h5>Can I volunteer if I can't adopt?</h5>
                <p className="text-muted mb-0">
                  Absolutely! We always need volunteers to help with animal care, administrative tasks, events, and fostering. Contact our volunteer coordinator at volunteer@petadopt.com to learn more.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h5>Do you offer support after adoption?</h5>
                <p className="text-muted mb-0">
                  Yes! We provide post-adoption support including training resources, behavioral advice, and regular check-ins to ensure both you and your pet are adjusting well.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Newsletter Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="mb-3">Stay Updated</h2>
              <p className="mb-4">
                Subscribe to our newsletter for adoption events, success stories, and pet care tips.
              </p>
              <Row className="justify-content-center">
                <Col md={8}>
                  <Form className="d-flex">
                    <Form.Control
                      type="email"
                      placeholder="Your Email Address"
                      className="me-2"
                      required
                    />
                    <Button variant="light">Subscribe</Button>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <Container>
          <Row>
            <Col lg={4} className="mb-4 mb-lg-0">
              <h4>PetAdopt</h4>
              <p>Connecting pets with loving homes since 2023.</p>
            </Col>
            
            <Col md={4} lg={2} className="mb-4 mb-lg-0">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/pets" className="text-white text-decoration-none">Available Pets</a></li>
                <li className="mb-2"><a href="/about" className="text-white text-decoration-none">About Us</a></li>
                <li className="mb-2"><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
                <li><a href="#" className="text-white text-decoration-none">Donate</a></li>
              </ul>
            </Col>
            
            <Col md={8} lg={6}>
              <h5>Contact Us</h5>
              <p>
                123 Pet Street<br />
                Petville, CA 12345<br />
                info@petadopt.com
              </p>
            </Col>
          </Row>
          
          <hr className="my-4" />
          
          <div className="text-center">
            <p className="mb-0">&copy; 2025 PetAdopt. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Contact;