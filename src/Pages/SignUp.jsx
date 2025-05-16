import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';

const SignUp = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',  // Changed from phoneNumber to phone to match Profile component
    address: '',
    city: '',
    state: '',
    country: '',  // Added country field to match Profile component
    zipCode: '',
    bio: '',      // Added bio field to match Profile component
    agreeTerms: false
  });
  
  const [validation, setValidation] = useState({
    emailValid: null,
    passwordLength: null,
    passwordHasUppercase: null,
    passwordHasNumber: null,
    passwordHasSpecial: null,
    passwordsMatch: null
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    // Validate in real-time
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidation({
        ...validation,
        emailValid: emailRegex.test(value)
      });
    }
    
    if (name === 'password') {
      setValidation({
        ...validation,
        passwordLength: value.length >= 8,
        passwordHasUppercase: /[A-Z]/.test(value),
        passwordHasNumber: /[0-9]/.test(value),
        passwordHasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        passwordsMatch: value === formData.confirmPassword
      });
    }
    
    if (name === 'confirmPassword') {
      setValidation({
        ...validation,
        passwordsMatch: value === formData.password
      });
    }
  };
  
  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      // In a real app, this would connect to Google OAuth
      console.log('Sign up with Google clicked');
      
      // Simulate successful Google signup for demo purposes
      const mockUser = {
        firstName: 'Google',
        lastName: 'User',
        email: 'google.user@example.com',
        isGoogleUser: true,
        phone: '',
        city: '',
        country: '',
        bio: ''
      };
      
      // In a real app, we would make an API call to register the Google user
      // const response = await fetch('http://localhost:5000/api/auth/google-signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     email: mockUser.email, 
      //     firstName: mockUser.firstName, 
      //     lastName: mockUser.lastName 
      //   }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.error || 'Something went wrong');
      // mockUser.id = data.userId;
      
      localStorage.setItem('userData', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-google-token');
      
      setFormSubmitted(true);
      // Redirect to home page after successful signup
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setFormError(err.message || 'Google registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);
    
    const isPasswordValid = 
      formData.password.length >= 8 &&
      /[A-Z]/.test(formData.password) &&
      /[0-9]/.test(formData.password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    
    const doPasswordsMatch = formData.password === formData.confirmPassword;
    const areRequiredFieldsFilled = 
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '';
    
    return isEmailValid && isPasswordValid && doPasswordsMatch && areRequiredFieldsFilled && formData.agreeTerms;
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    setFormError('Please fix the errors in the form before submitting.');
    return;
  }

  setLoading(true);

  try {
    // ✅ Prepare user data to send to backend
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zipCode: formData.zipCode,
      bio: formData.bio,
    };

    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log('Signup response user:', data.user);

    if (!response.ok) throw new Error(data.error || 'Signup failed');

    // ✅ Store the full user and token returned from backend
    localStorage.setItem('userData', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    localStorage.setItem('isLoggedIn', 'true');

    if (onLogin) onLogin(data.user, data.token);

    setFormError('');
    setFormSubmitted(true);
    setTimeout(() => navigate('/'), 2000);
  } catch (err) {
    console.error(err);
    setFormError(err.message || 'Registration failed. Please try again.');
  } finally {
    setLoading(false);
  }
};


  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h1 className="h3 fw-bold">Create an Account</h1>
                <p className="text-muted">Join our community to help pets find their forever homes</p>
              </div>
              
              {formSubmitted && (
                <Alert variant="success" className="mb-4">
                  <Alert.Heading>Registration Successful!</Alert.Heading>
                  <p>Your account has been created. You will be redirected to the home page shortly.</p>
                </Alert>
              )}
              
              {formError && (
                <Alert variant="danger" className="mb-4">
                  {formError}
                </Alert>
              )}
              
              <Row className="mb-4">
                <Col>
                  <Button 
                    variant="outline-secondary" 
                    className="w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                  >
                    <FaGoogle />
                    <span>Sign up with Google</span>
                  </Button>
                </Col>
              </Row>
              
              <div className="text-center mb-4">
                <p className="text-muted mb-0">Or register with email</p>
                <hr className="mt-2" />
              </div>
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isValid={validation.emailValid}
                    isInvalid={validation.emailValid === false}
                    required
                  />
                  {validation.emailValid === false && (
                    <Form.Text className="text-danger">
                      Please enter a valid email address.
                    </Form.Text>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                  
                  <div className="mt-2 small">
                    <div className={`d-flex align-items-center mb-1 ${validation.passwordLength ? 'text-success' : 'text-muted'}`}>
                      {validation.passwordLength ? <FaCheck className="me-1" /> : <FaTimes className="me-1" />}
                      At least 8 characters
                    </div>
                    <div className={`d-flex align-items-center mb-1 ${validation.passwordHasUppercase ? 'text-success' : 'text-muted'}`}>
                      {validation.passwordHasUppercase ? <FaCheck className="me-1" /> : <FaTimes className="me-1" />}
                      At least one uppercase letter
                    </div>
                    <div className={`d-flex align-items-center mb-1 ${validation.passwordHasNumber ? 'text-success' : 'text-muted'}`}>
                      {validation.passwordHasNumber ? <FaCheck className="me-1" /> : <FaTimes className="me-1" />}
                      At least one number
                    </div>
                    <div className={`d-flex align-items-center ${validation.passwordHasSpecial ? 'text-success' : 'text-muted'}`}>
                      {validation.passwordHasSpecial ? <FaCheck className="me-1" /> : <FaTimes className="me-1" />}
                      At least one special character
                    </div>
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isValid={validation.passwordsMatch && formData.confirmPassword !== ''}
                      isInvalid={validation.passwordsMatch === false}
                      required
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                  {validation.passwordsMatch === false && (
                    <Form.Text className="text-danger">
                      Passwords do not match.
                    </Form.Text>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone" // Changed from phoneNumber to phone to match Profile component
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <div className="mb-3">
                  <Form.Label>Address (Optional)</Form.Label>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  
                  <Row>
                    <Col md={5}>
                      <Form.Group className="mb-2">
                        <Form.Control
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-2">
                        <Form.Control
                          type="text"
                          name="state"
                          placeholder="State/Province"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-2">
                        <Form.Control
                          type="text"
                          name="zipCode"
                          placeholder="Zip/Postal Code"
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row className="mt-2">
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="country"
                          placeholder="Country"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                
                <Form.Group className="mb-4">
                  <Form.Label>Bio (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Check 
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    label={
                      <span>
                        I agree to the{' '}
                        <Link to="/terms" className="text-decoration-none">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                      </span>
                    }
                    required
                  />
                </Form.Group>
                
                <div className="d-grid mb-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg" 
                    className="py-2"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none">Sign In</Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;