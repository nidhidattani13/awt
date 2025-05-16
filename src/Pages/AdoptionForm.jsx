import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { Toast, ToastContainer } from 'react-bootstrap';


const AdoptionForm = ({ pet, adoptionType, onClose, onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    adoptionType: adoptionType || 'permanent', // Default to the selected type or permanent
    duration: '1 week', // Default duration for temporary adoption
    comments: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);


  // Set adoption type when prop changes
  useEffect(() => {
    if (adoptionType) {
      setFormData(prev => ({ ...prev, adoptionType }));
    }
  }, [adoptionType]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    // Duration validation for temporary adoption
    if (formData.adoptionType === 'temporary' && !formData.duration) {
      newErrors.duration = 'Duration is required';
    }
    
    return newErrors;
  };

  // Form submission handler
 const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  setValidated(true);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:5000/api/adoptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        petId: pet._id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        adoptionType: formData.adoptionType,
        duration: formData.duration,
        comments: formData.comments
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit application');
    }

    // Success: show popup toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);

    onSubmit(formData); // Call parent callback if needed
    setIsSubmitting(false);
    onClose(); // Close modal or form if needed

  } catch (error) {
    setIsSubmitting(false);
    alert(`Error: ${error.message}`);
  }
};


 return (
  <>
    <Modal show={true} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Adoption Application
          <p className="text-muted mb-0 fs-6">
            for {pet.name} - {formData.adoptionType === 'temporary' ? 'Temporary' : 'Permanent'} Adoption
          </p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.name || 'Please provide your full name.'}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email || 'Please provide a valid email.'}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={errors.phone}
              placeholder="e.g., 1234567890"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone || 'Please provide a valid phone number.'}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Home Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              isInvalid={errors.address}
              rows="2"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.address || 'Please provide your address.'}
            </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Adoption Type</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                id="temporary"
                label="Temporary"
                name="adoptionType"
                value="temporary"
                checked={formData.adoptionType === 'temporary'}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                id="permanent"
                label="Permanent"
                name="adoptionType"
                value="permanent"
                checked={formData.adoptionType === 'permanent'}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          
          {formData.adoptionType === 'temporary' && (
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                isInvalid={errors.duration}
                required
              >
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.duration || 'Please select a duration.'}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Additional Comments</Form.Label>
            <Form.Control
              as="textarea"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="3"
              placeholder="Tell us why you'd like to adopt this pet and any relevant experience with pets..."
            />
          </Form.Group>
          
          <Alert variant="info">
            <strong>Adoption Fee: {pet.adoptionFee}</strong>
            <p className="mb-0 small">Fee will be collected upon approval of your application</p>
          </Alert>
        </Form>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </Modal.Footer>
    </Modal>

    {/* Toast Popup */}
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1055 }}>
      <Toast 
        bg="success" 
        onClose={() => setShowSuccessToast(false)} 
        show={showSuccessToast} 
        delay={4000} 
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          Application submitted successfully!
        </Toast.Body>
      </Toast>
    </ToastContainer>
  </>
);
};
export default AdoptionForm;