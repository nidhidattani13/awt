import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const AddPet = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog',
    breed: '',
    age: '',
    gender: '',
    size: 'medium',
    color: '',
    description: '',
    healthStatus: '',
    houseTrained: false,
    goodWithKids: false,
    goodWithAnimals: false,
    specialNeeds: '',
    adoptionFee: '',
    country: '',
    city: '',
    state: '',
    zipcode: '',
    image: null
  });

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      
      if (!token || !userData) {
        navigate('/login', { state: { from: '/add-pet', message: 'Please log in to list a pet for adoption' } });
        return;
      }
      
      // Pre-fill location data from user profile if available
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.city || parsedUserData.country) {
          setFormData(prev => ({
            ...prev,
            city: parsedUserData.city || '',
            country: parsedUserData.country || ''
          }));
        }
      } catch (err) {
        console.error('Error parsing user data', err);
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Manual validation
const requiredFields = ['name', 'type', 'age', 'gender', 'description', 'country', 'city'];
for (const field of requiredFields) {
  if (!formData[field] || formData[field].trim() === '') {
    setMessage({ type: 'danger', text: `Please fill out the ${field} field.` });
    setSubmitting(false);
    return;
  }
}

if (!formData.image) {
  setMessage({ type: 'danger', text: 'Please upload an image of your pet.' });
  setSubmitting(false);
  return;
}

    setMessage({ type: '', text: '' });
    setSubmitting(true);
    
    try {
      // Create form data for file upload
      const petFormData = new FormData();
      for (const key in formData) {
        if (key === 'image' && formData[key]) {
          petFormData.append('image', formData[key]);
        } else {
          petFormData.append(key, formData[key]);
        }
      }

      const token = localStorage.getItem('token');
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 500);

      const response = await fetch('http://localhost:5000/api/pets', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: petFormData
});

      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      const data = await response.json();
      
      if (response.ok) {
  setShowSuccessModal(true); // ✅ Show modal
  setMessage({ type: '', text: '' }); // Clear alerts if needed

  setTimeout(() => {
    setShowSuccessModal(false);
    navigate(`/pets/${data.pet._id}`);
  }, 3000); // Delay redirect
}

      else {
        setMessage({ 
          type: 'danger', 
          text: data.message || 'An error occurred while listing your pet.' 
        });
      }
    }
    catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ 
        type: 'danger', 
        text: 'An error occurred while listing your pet. Please try again.' 
      });
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <h2 className="fw-bold text-center mb-4">List Your Pet for Adoption</h2>
              
              {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
                  {message.text}
                </Alert>
              )}

              {uploadProgress > 0 && (
                <div className="mb-4">
                  <p className="mb-2">Uploading your pet's information...</p>
                  <ProgressBar 
                    now={uploadProgress} 
                    label={`${Math.round(uploadProgress)}%`}
                    animated={uploadProgress < 100}
                  />
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <h4 className="mb-3">Basic Information</h4>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pet Name*</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pet Type*</Form.Label>
                      <Form.Select 
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="rabbit">Rabbit</option>
                        <option value="hamster">Hamster</option>
                        <option value="guinea pig">Guinea Pig</option>
                        <option value="fish">Fish</option>
                        <option value="turtle">Turtle</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Breed</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Age*</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="e.g., 2 years, 6 months"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender*</Form.Label>
                      <Form.Select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unknown">Unknown</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Size</Form.Label>
                      <Form.Select 
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="xlarge">Extra Large</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Color</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Adoption Fee</Form.Label>
                      <Form.Control 
                        type="number" 
                        name="adoptionFee"
                        value={formData.adoptionFee}
                        onChange={handleChange}
                        min="0"
                        placeholder="Enter 0 if free"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Upload Pet Image*</Form.Label>
                  <Form.Control 
                    type="file" 
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                  <Form.Text className="text-muted">
                    Please upload a clear image of your pet. Maximum file size: 5MB
                  </Form.Text>
                  {imagePreview && (
                    <div className="mt-3">
                      <img 
                        src={imagePreview} 
                        alt="Pet preview" 
                        className="img-thumbnail" 
                        style={{ maxHeight: '200px' }} 
                      />
                    </div>
                  )}
                </Form.Group>

                <hr className="my-4" />
                <h4 className="mb-3">Pet Details</h4>

                <Form.Group className="mb-3">
                  <Form.Label>Description*</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Share your pet's personality, habits, likes and dislikes..."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Health Status</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="healthStatus"
                    value={formData.healthStatus}
                    onChange={handleChange}
                    placeholder="Vaccinations, medical conditions, etc."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Special Needs</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleChange}
                    placeholder="Diet, medication, behavior, etc."
                  />
                </Form.Group>

                <div className="mb-4">
                  <Form.Check 
                    type="checkbox"
                    id="houseTrained"
                    label="House Trained"
                    name="houseTrained"
                    checked={formData.houseTrained}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check 
                    type="checkbox"
                    id="goodWithKids"
                    label="Good with Kids"
                    name="goodWithKids"
                    checked={formData.goodWithKids}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check 
                    type="checkbox"
                    id="goodWithAnimals"
                    label="Good with Other Animals"
                    name="goodWithAnimals"
                    checked={formData.goodWithAnimals}
                    onChange={handleChange}
                  />
                </div>

                <hr className="my-4" />
                <h4 className="mb-3">Location Information</h4>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Country*</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City*</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>State/Province</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Zip/Postal Code</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid gap-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'List Pet for Adoption'}
                  </Button>
                  <Button 
                    variant="outline-secondary"
                    onClick={() => navigate(-1)}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Pet Added</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    🎉 Your pet has been listed for adoption successfully!
  </Modal.Body>
</Modal>

        </Col>
      </Row>
    </Container>
  );
};

export default AddPet;