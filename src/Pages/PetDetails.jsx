import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import AdoptionForm from './AdoptionForm';
import '../Styles/PetDetails.css';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [adoptionType, setAdoptionType] = useState(null);
  const [adoptionStatus, setAdoptionStatus] = useState('pending');
  const [user, setUser] = useState(null);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      const isLoggedInWithGoogle = localStorage.getItem('isGoogleUser') === 'true';

      setIsGoogleUser(isLoggedInWithGoogle);

      if (token && userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
        } catch (err) {
          console.error('Error parsing user data', err);
        }
      }
    };

    checkAuthStatus();
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/pets/${id}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to fetch pet');

      setPet(data.pet);
    } catch (err) {
      console.error('Error fetching pet details:', err);
      setPet(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdoptTemporarily = () => {
    setAdoptionType('temporary');
    setShowAdoptionForm(true);
  };

  const handleAdoptPermanently = () => {
    setAdoptionType('permanent');
    setShowAdoptionForm(true);
  };

  const handleCloseForm = () => setShowAdoptionForm(false);

  const handleSubmitAdoption = (formData) => {
    console.log('Form submitted:', formData);
    setShowAdoptionForm(false);
    setAdoptionStatus('pending');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleStatusChange = (status) => {
    if (!isGoogleUser) {
      alert("You must be logged in with Google to change adoption status.");
      return;
    }
    setAdoptionStatus(status);
    console.log(`Adoption status changed to: ${status}`);
  };

  const handleGoBack = () => navigate('/pets');
  const handleSignUp = () => navigate('/signup');

  if (isLoading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3">Loading pet details...</p>
      </Container>
    );
  }

  if (!pet) {
    return (
      <Container className="my-5 py-3">
        <Alert variant="warning">
          <Alert.Heading>Pet Not Found</Alert.Heading>
          <p>Sorry, we couldn't find the pet you're looking for.</p>
          <Button variant="outline-primary" onClick={handleGoBack}>Back to Pet List</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4 pet-details-container">
      {formSubmitted && (
        <Alert variant="success" className="mb-4">
          <Alert.Heading>Application Submitted!</Alert.Heading>
          <p>Thank you for applying to adopt {pet.name}! We'll review your application and contact you soon.</p>
        </Alert>
      )}

      <Button variant="outline-secondary" className="mb-4 d-flex align-items-center" onClick={handleGoBack}>
        <span className="me-2">←</span> Back to All Pets
      </Button>

      <Row className="g-4">
        <Col lg={6}>
          <div className="pet-gallery">
            <div className="main-image-container mb-3">
              {pet.images && pet.images.length > 0 ? (
                <img
                  src={pet.images[activeImage]}
                  alt={`${pet.name} - image ${activeImage + 1}`}
                  className="img-fluid rounded shadow"
                />
              ) : (
                <div className="text-muted text-center p-5 border rounded bg-light">No image available</div>
              )}
            </div>
            <Row className="g-2">
              {Array.isArray(pet.images) &&
                pet.images.map((img, index) => (
                  <Col xs={4} key={index}>
                    <div
                      className={`thumbnail p-1 rounded cursor-pointer ${activeImage === index ? 'border border-primary' : 'border'}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img src={img} alt={`${pet.name} thumbnail ${index + 1}`} className="img-fluid rounded" />
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </Col>

        <Col lg={6}>
          <div className="pet-info-section">
            <h1 className="display-5 fw-bold">{pet.name}</h1>
            <div className="mb-3">
              <Badge bg="primary" className="me-2">{pet.species}</Badge>
              <Badge bg="secondary">{pet.breed}</Badge>
            </div>

            <Row className="bg-light rounded p-3 mb-4">
              <Col><small className="text-muted d-block">Age</small><strong>{pet.age}</strong></Col>
              <Col><small className="text-muted d-block">Gender</small><strong>{pet.gender}</strong></Col>
              <Col><small className="text-muted d-block">Weight</small><strong>{pet.weight}</strong></Col>
            </Row>

            <h5>Location</h5>
            <p className="text-secondary">{pet.city}, {pet.country}</p>

            <h5>Personality</h5>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {typeof pet.personality === 'string' && pet.personality.length > 0 ? (
                pet.personality.split(',').map((trait, index) => (
                  <Badge key={index} bg="light" text="dark" className="border px-3 py-2">{trait.trim()}</Badge>
                ))
              ) : <p className="text-muted">No personality traits listed.</p>}
            </div>

            <h5>Characteristics</h5>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {pet.houseTrained && <Badge bg="light" text="dark" className="border px-3 py-2">House Trained</Badge>}
              {pet.goodWithKids && <Badge bg="light" text="dark" className="border px-3 py-2">Good with Kids</Badge>}
              {pet.goodWithAnimals && <Badge bg="light" text="dark" className="border px-3 py-2">Good with Other Animals</Badge>}
            </div>

            <h5>About {pet.name}</h5>
            <p className="text-secondary">{pet.description}</p>

            <h5>Medical History</h5>
            <p className="text-secondary">{pet.medicalHistory}</p>

            <h5>Adoption Fee</h5>
            <p className="fs-4 fw-bold text-primary">{pet.adoptionFee}</p>

            <Row className="mb-4">
              <Col xs={6}>
                <Button variant="outline-primary" className="w-100" onClick={handleAdoptTemporarily}>
                  Adopt Temporarily
                </Button>
              </Col>
              <Col xs={6}>
                <Button variant="primary" className="w-100" onClick={handleAdoptPermanently}>
                  Adopt Permanently
                </Button>
              </Col>
            </Row>

            {isGoogleUser && (
              <div className="adoption-status-section bg-light p-3 rounded">
                <h5 className="mb-3">Adoption Status</h5>
                <div className="d-flex gap-2">
                  <Button variant={adoptionStatus === 'approved' ? 'success' : 'outline-success'} size="sm" onClick={() => handleStatusChange('approved')}>Approved</Button>
                  <Button variant={adoptionStatus === 'pending' ? 'warning' : 'outline-warning'} size="sm" onClick={() => handleStatusChange('pending')}>Pending</Button>
                  <Button variant={adoptionStatus === 'rejected' ? 'danger' : 'outline-danger'} size="sm" onClick={() => handleStatusChange('rejected')}>Rejected</Button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {showAdoptionForm && (
        <AdoptionForm
          pet={pet}
          adoptionType={adoptionType}
          onClose={handleCloseForm}
          onSubmit={handleSubmitAdoption}
        />
      )}
    </Container>
  );
};

export default PetDetails;
