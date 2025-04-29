import React, { useState, useEffect } from 'react';
import '../Styles/AdoptionForm.css';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission - in a real app, you would call an API
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(formData);
    }, 1000);
  };

  return (
    <div className="adoption-form-overlay">
      <div className="adoption-form-container">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="form-header">
          <h2>Adoption Application</h2>
          <p>for {pet.name} - {formData.adoptionType === 'temporary' ? 'Temporary' : 'Permanent'} Adoption</p>
        </div>
        
        <form onSubmit={handleSubmit} className="adoption-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
              placeholder="e.g., 1234567890"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Home Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
              rows="2"
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          
          <div className="form-group adoption-type-group">
            <label>Adoption Type</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="adoptionType"
                  value="temporary"
                  checked={formData.adoptionType === 'temporary'}
                  onChange={handleChange}
                />
                <span>Temporary</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="adoptionType"
                  value="permanent"
                  checked={formData.adoptionType === 'permanent'}
                  onChange={handleChange}
                />
                <span>Permanent</span>
              </label>
            </div>
          </div>
          
          {formData.adoptionType === 'temporary' && (
            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={errors.duration ? 'error' : ''}
              >
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
              </select>
              {errors.duration && <span className="error-message">{errors.duration}</span>}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="comments">Additional Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="3"
              placeholder="Tell us why you'd like to adopt this pet and any relevant experience with pets..."
            />
          </div>
          
          <div className="adoption-fee-notice">
            <p>Adoption Fee: {pet.adoptionFee}</p>
            <span>Fee will be collected upon approval of your application</span>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;