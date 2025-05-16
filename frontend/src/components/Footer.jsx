import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log('Subscribing email:', email);
    // Reset form
    setEmail('');
    // Could add a success notification here
  };

  return (
    <div className="page-transition">
      <footer className="bg-dark text-white py-5">
        <Container>
          {/* Newsletter Section */}
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h3 className="fw-bold mb-3">Stay Updated</h3>
              <p className="text-light opacity-75 mb-4">Join our newsletter to receive updates on new pets, adoption events, and pet care tips.</p>
              <div className="d-flex justify-content-center">
                <div className="subscription-form d-flex">
                  <Form onSubmit={handleSubscribe}>
                    <div className="d-flex">
                      <Form.Control
                        placeholder="Your email address"
                        aria-label="Email for newsletter"
                        className="rounded-start rounded-0 py-3 border-0"
                        style={{ minWidth: "280px" }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button 
                        variant="primary" 
                        className="rounded-end rounded-0 px-4 fw-semibold"
                        type="submit"
                      >
                        Subscribe
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>

          <hr className="border-secondary opacity-25 my-4" />

          {/* Main Footer Content */}
          <Row className="g-4 mb-5">
            <Col md={5} lg={4}>
              <div className="mb-4">
                <h2 className="mb-3 fw-bold">
                  <span className="text-primary">Pet</span>Adopt
                </h2>
                <p className="text-light opacity-75">Connecting pets with loving homes since 2023. Our mission is to help every animal find their forever family.</p>
              </div>
              <div className="social-icons d-flex gap-2 mb-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </Col>
            
            <Col sm={6} md={3} lg={2} className="footer-links">
              <h6 className="text-primary fw-bold mb-4">QUICK LINKS</h6>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link to="/" className="text-light opacity-75 text-decoration-none">Home</Link>
                </li>
                <li className="mb-3">
                  <Link to="/pets" className="text-light opacity-75 text-decoration-none">Find Pets</Link>
                </li>
                <li className="mb-3">
                  <Link to="/about" className="text-light opacity-75 text-decoration-none">About Us</Link>
                </li>
                <li className="mb-3">
                  <Link to="/contact" className="text-light opacity-75 text-decoration-none">Contact</Link>
                </li>
              </ul>
            </Col>
            
            <Col sm={6} md={4} lg={3} className="footer-links">
              <h6 className="text-primary fw-bold mb-4">ADOPTION</h6>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link to="/pets" className="text-light opacity-75 text-decoration-none">Available Pets</Link>
                </li>
                <li className="mb-3">
                  <Link to="/adoption-process" className="text-light opacity-75 text-decoration-none">Adoption Process</Link>
                </li>
                <li className="mb-3">
                  <Link to="/adoption-fees" className="text-light opacity-75 text-decoration-none">Adoption Fees</Link>
                </li>
                <li className="mb-3">
                  <Link to="/success-stories" className="text-light opacity-75 text-decoration-none">Success Stories</Link>
                </li>
              </ul>
            </Col>
            
            <Col md={12} lg={3}>
              <h6 className="text-primary fw-bold mb-4">CONTACT US</h6>
              <ul className="list-unstyled contact-info">
                <li className="mb-3 d-flex">
                  <i className="bi bi-geo-alt text-primary me-3 fs-5"></i>
                  <span className="text-light opacity-75">123 Pet Street, Petville, CA 12345</span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-telephone text-primary me-3 fs-5"></i>
                  <span className="text-light opacity-75">(555) 123-4567</span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-envelope text-primary me-3 fs-5"></i>
                  <span className="text-light opacity-75">info@petadopt.com</span>
                </li>
                <li className="d-flex">
                  <i className="bi bi-clock text-primary me-3 fs-5"></i>
                  <span className="text-light opacity-75">Mon-Fri: 9am-6pm<br />Sat-Sun: 10am-4pm</span>
                </li>
              </ul>
            </Col>
          </Row>
          
          <hr className="border-secondary opacity-25 my-4" />
          
          {/* Copyright Section */}
          <Row className="align-items-center py-3">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0 text-light opacity-75">© {currentYear} PetAdopt. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="d-flex justify-content-center justify-content-md-end gap-4">
                <Link to="/privacy-policy" className="text-light opacity-75 text-decoration-none">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-light opacity-75 text-decoration-none">Terms of Service</Link>
                <Link to="/sitemap" className="text-light opacity-75 text-decoration-none">Sitemap</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;