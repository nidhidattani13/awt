import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
// Fix 1: Import images correctly
import heroImage from '../assets/images/p2.jpg';
// If you have more images, import them similarly

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (err) {
          console.error('Error parsing user data', err);
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const handleExploreClick = () => {
    navigate('/pets');
  };

  const handleLoginClick = () => {
    // Added console log for debugging
    console.log('Login button clicked, navigating to /login');
    navigate('/login');
  };

  const handleSignUpClick = () => {
    // Added console log for debugging
    console.log('Sign up button clicked, navigating to /signup');
    navigate('/signup');
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('isGoogleUser');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <div className="bg-light rounded-3 overflow-hidden mb-5">
        <Container className="py-5">
          <Row className="align-items-center g-5">
            <Col lg={6} className="pe-lg-5">
              <h1 className="display-4 fw-bold mb-3">
                {user ? `Welcome Back, ${user.firstName}!` : 'Find Your Perfect'} <span className="highlight">{!user && 'Companion'}</span>
              </h1>
              <p className="lead mb-4">
                {user 
                  ? 'Continue your journey of finding or helping pets in need of a loving home.' 
                  : 'Give a loving home to pets in need. Browse our available cats and dogs ready for adoption.'}
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="fw-bold" 
                  onClick={handleExploreClick}
                >
                  Explore Pets
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="rounded overflow-hidden shadow-sm">
                {/* Fix 3: Use the imported hero image or a placeholder */}
                <img 
                  src={heroImage} 
                  alt="Happy dog and cat" 
                  className="img-fluid" 
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Rest of the component remains the same */}
      {/* Features Section */}
      <Container className="py-5">
        <h2 className="fw-bold text-center mb-5">How It Works</h2>
        <Row className="g-4 text-center">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="display-3 mb-3 text-primary">🔍</div>
                <h3 className="h4 fw-bold mb-2">Browse</h3>
                <Card.Text>Search through our directory of pets looking for a new home.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="display-3 mb-3 text-primary">❤️</div>
                <h3 className="h4 fw-bold mb-2">Connect</h3>
                <Card.Text>Find the perfect match for your lifestyle and home.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="display-3 mb-3 text-primary">🏠</div>
                <h3 className="h4 fw-bold mb-2">Adopt</h3>
                <Card.Text>Complete the adoption process and welcome your new friend home.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Personalized Recommendations for logged in users */}
      {user && (
        <div className="bg-light py-5 my-5">
          <Container>
            <h2 className="fw-bold text-center mb-5">Recommended For You</h2>
            <Row className="g-4">
              {/* Fix 4: Use dynamic navigation with pet IDs */}
              <Col md={4}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Img variant="top" src="/api/placeholder/400/300" alt="Pet recommendation" />
                  <Card.Body className="p-4">
                    <h3 className="h5 fw-bold mb-2">Lucy</h3>
                    <p className="small text-muted mb-2">Golden Retriever • 2 years old</p>
                    <Card.Text className="mb-3">Friendly and energetic dog who loves to play outdoors.</Card.Text>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => navigate('/pets/1')}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Img variant="top" src="/api/placeholder/400/300" alt="Pet recommendation" />
                  <Card.Body className="p-4">
                    <h3 className="h5 fw-bold mb-2">Oliver</h3>
                    <p className="small text-muted mb-2">Tabby Cat • 1 year old</p>
                    <Card.Text className="mb-3">Playful and affectionate cat who gets along well with children.</Card.Text>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => navigate('/pets/2')}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Img variant="top" src="/api/placeholder/400/300" alt="Pet recommendation" />
                  <Card.Body className="p-4">
                    <h3 className="h5 fw-bold mb-2">Max</h3>
                    <p className="small text-muted mb-2">Border Collie • 3 years old</p>
                    <Card.Text className="mb-3">Intelligent and loyal dog who needs an active family.</Card.Text>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => navigate('/pets/3')}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="text-center mt-4">
              <Button variant="primary" onClick={handleExploreClick}>See More Pets</Button>
            </div>
          </Container>
        </div>
      )}

      {/* Adoption Options Section */}
      <div className="bg-light py-5 my-5">
        <Container>
          <h2 className="fw-bold text-center mb-5">Adoption Options</h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Img variant="top" src="/api/placeholder/600/400" alt="Permanent adoption" />
                <Card.Body className="p-4">
                  <h3 className="h4 fw-bold mb-2">Permanent Adoption</h3>
                  <Card.Text className="mb-4">Give a pet a forever home and create a lifelong bond.</Card.Text>
                  {/* Fix 5: Use the handleExploreClick function */}
                  <Button 
                    variant="outline-primary" 
                    onClick={() => navigate('/pets?type=permanent')}
                  >
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Img variant="top" src="/api/placeholder/600/400" alt="Temporary adoption" />
                <Card.Body className="p-4">
                  <h3 className="h4 fw-bold mb-2">Temporary Adoption</h3>
                  <Card.Text className="mb-4">Provide a short-term home for a pet in need of care.</Card.Text>
                  {/* Fix 6: Use the handleExploreClick function with filter */}
                  <Button 
                    variant="outline-primary" 
                    onClick={() => navigate('/pets?type=temporary')}
                  >
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Testimonials Section */}
      <Container className="py-5">
        <h2 className="fw-bold text-center mb-5">Happy Adoptions</h2>
        <Row className="g-4 justify-content-center">
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">We adopted Luna a month ago and she has brought so much joy to our family. The adoption process was smooth and the staff was incredibly helpful.</p>
                <div className="testimonial-author">
                  <img src="/api/placeholder/50/50" alt="Testimonial author" className="rounded-circle" />
                  <div>
                    <h4 className="h6 fw-bold mb-0">Sarah Johnson</h4>
                    <p className="small text-muted mb-0">Adopted Luna, Golden Retriever</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">Oliver was shy at first, but he quickly became an integral part of our home. The temporary adoption option gave us time to make sure it was a good fit.</p>
                <div className="testimonial-author">
                  <img src="/api/placeholder/50/50" alt="Testimonial author" className="rounded-circle" />
                  <div>
                    <h4 className="h6 fw-bold mb-0">Mark Thomas</h4>
                    <p className="small text-muted mb-0">Adopted Oliver, Scottish Fold</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">Daisy has been such a wonderful addition to our family. She's energetic, loving, and gets along great with our kids. Best decision we ever made!</p>
                <div className="testimonial-author">
                  <img src="/api/placeholder/50/50" alt="Testimonial author" className="rounded-circle" />
                  <div>
                    <h4 className="h6 fw-bold mb-0">Emily Rodriguez</h4>
                    <p className="small text-muted mb-0">Adopted Daisy, Beagle</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Newsletter Section */}
      <div className="bg-primary text-white py-5 my-5">
        <Container className="text-center">
          <h2 className="fw-bold mb-3">Stay Updated</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>Join our newsletter to receive updates on new pets, adoption events, and pet care tips.</p>
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your email address" aria-label="Email" />
                <Button variant="light" className="fw-bold">Subscribe</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Partners Section */}
      <Container className="py-5 mb-5">
        <h2 className="fw-bold text-center mb-5">Our Partners</h2>
        <Row className="g-4 align-items-center justify-content-center">
          <Col xs={6} md={3} className="text-center">
            <img src="/api/placeholder/150/80" alt="Partner logo" className="img-fluid partner-logo" />
          </Col>
          <Col xs={6} md={3} className="text-center">
            <img src="/api/placeholder/150/80" alt="Partner logo" className="img-fluid partner-logo" />
          </Col>
          <Col xs={6} md={3} className="text-center">
            <img src="/api/placeholder/150/80" alt="Partner logo" className="img-fluid partner-logo" />
          </Col>
          <Col xs={6} md={3} className="text-center">
            <img src="/api/placeholder/150/80" alt="Partner logo" className="img-fluid partner-logo" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;