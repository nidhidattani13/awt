import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/pets');
  };

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <div className="bg-light py-5">
        <Container className="text-center py-4">
          <h1 className="display-4 fw-bold">About <span className="highlight">PetAdopt</span></h1>
          <p className="lead mb-0">We're on a mission to find loving homes for every pet in need.</p>
        </Container>
      </div>

      {/* Our Story Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h2 className="fw-bold mb-4">Our Story</h2>
            <p className="lead">Founded in 2023, PetAdopt began with a simple yet powerful mission: to connect homeless pets with loving families.</p>
            <p>What started as a small local initiative quickly grew into a nationwide network of animal lovers, shelters, and volunteers working together to give every pet a second chance at happiness.</p>
            <p>Our founders, a group of passionate animal welfare advocates, noticed a gap in the adoption system. Many loving families wanted to adopt, but found the process confusing or inaccessible. Meanwhile, shelters were overflowing with wonderful pets waiting for homes. PetAdopt was created to bridge this gap and make pet adoption simple, accessible, and joyful for everyone involved.</p>
          </Col>
          <Col lg={6}>
            <div className="rounded overflow-hidden shadow-sm">
              <img src="/api/placeholder/600/400" alt="PetAdopt founders with rescued pets" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Mission & Values Section */}
      <div className="bg-light py-5">
        <Container className="py-3">
          <h2 className="fw-bold text-center mb-5">Our Mission & Values</h2>
          <Row>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="display-4 mb-3">🏠</div>
                  <h3 className="h5 fw-bold">Every Pet Deserves a Home</h3>
                  <Card.Text>We believe every animal deserves to be part of a loving family, regardless of age, breed, or background.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="display-4 mb-3">❤️</div>
                  <h3 className="h5 fw-bold">Compassionate Care</h3>
                  <Card.Text>All pets in our network receive the highest standards of care, respect, and affection while awaiting adoption.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="display-4 mb-3">🤝</div>
                  <h3 className="h5 fw-bold">Community Collaboration</h3>
                  <Card.Text>We partner with shelters, veterinarians, and volunteers to create a strong support network for pets and adopters.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="display-4 mb-3">🌱</div>
                  <h3 className="h5 fw-bold">Education & Awareness</h3>
                  <Card.Text>We're committed to promoting responsible pet ownership and animal welfare through education and outreach.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <Container className="py-5">
        <h2 className="fw-bold text-center mb-5">Meet Our Team</h2>
        <Row>
          <Col md={6} lg={3} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Img variant="top" src="/api/placeholder/300/300" alt="Emily Johnson" />
              <Card.Body className="text-center">
                <h3 className="h5 fw-bold">Emily Johnson</h3>
                <p className="text-muted mb-2">Founder & Director</p>
                <Card.Text>Emily has 15+ years of experience in animal welfare and previously managed one of the largest shelters on the West Coast.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Img variant="top" src="/api/placeholder/300/300" alt="Marcus Chen" />
              <Card.Body className="text-center">
                <h3 className="h5 fw-bold">Marcus Chen</h3>
                <p className="text-muted mb-2">Adoption Coordinator</p>
                <Card.Text>With a background in social work, Marcus ensures each adoption is a perfect match for both the pet and the family.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Img variant="top" src="/api/placeholder/300/300" alt="Dr. Sarah Rodriguez" />
              <Card.Body className="text-center">
                <h3 className="h5 fw-bold">Dr. Sarah Rodriguez</h3>
                <p className="text-muted mb-2">Veterinary Director</p>
                <Card.Text>Dr. Rodriguez oversees all medical aspects of our operation, ensuring every pet is healthy and ready for their new home.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Img variant="top" src="/api/placeholder/300/300" alt="James Wilson" />
              <Card.Body className="text-center">
                <h3 className="h5 fw-bold">James Wilson</h3>
                <p className="text-muted mb-2">Outreach Coordinator</p>
                <Card.Text>James builds partnerships with shelters nationwide and organizes community events to promote adoption.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Partners Section */}
      <div className="bg-light py-5">
        <Container className="py-3">
          <h2 className="fw-bold text-center mb-3">Our Partners</h2>
          <p className="text-center mb-5">We're proud to work with these organizations to help pets find their forever homes.</p>
          
          <Row className="g-4 justify-content-center">
            <Col xs={6} md={3} className="text-center">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-3">
                  <img src="/api/placeholder/180/100" alt="City Animal Shelter" className="img-fluid mb-3" />
                  <p className="mb-0 fw-medium">City Animal Shelter</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-3">
                  <img src="/api/placeholder/180/100" alt="PetCare Clinic" className="img-fluid mb-3" />
                  <p className="mb-0 fw-medium">PetCare Clinic</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-3">
                  <img src="/api/placeholder/180/100" alt="Happy Paws Foundation" className="img-fluid mb-3" />
                  <p className="mb-0 fw-medium">Happy Paws Foundation</p>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-3">
                  <img src="/api/placeholder/180/100" alt="Pet Nutrition Co." className="img-fluid mb-3" />
                  <p className="mb-0 fw-medium">Pet Nutrition Co.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold mb-3">Join Our Mission</h2>
        <p className="lead mb-4">Whether you're looking to adopt, volunteer, donate, or partner with us, there are many ways to help pets in need.</p>
        <Button 
          variant="primary" 
          size="lg" 
          className="fw-bold px-4 py-2" 
          onClick={handleExploreClick}
        >
          Find a Pet to Adopt
        </Button>
      </Container>

      {/* Footer is now handled by the global Footer component */}
    </div>
  );
};

export default AboutUs;