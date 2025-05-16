import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { Eye, EyeSlash, Google, ShieldLock } from 'react-bootstrap-icons';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Admin credentials
  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoginError('');
    setIsLoading(true);

    try {
      // Admin login
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminData = {
          id: 'admin-1',
          _id: 'admin-1',
          firstName: 'Admin',
          lastName: 'User',
          email: ADMIN_EMAIL,
          role: 'admin',
          isAdmin: true
        };

        const token = 'admin-jwt-token-' + Date.now();
        
        // Store admin data
        localStorage.setItem('userData', JSON.stringify(adminData));
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');

        // Call onLogin callback with admin data
        if (onLogin) {
          onLogin(adminData, token);
        }

        navigate('/admin', { replace: true });
        return;
      }

      // Regular user login
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Login failed');
      }

      const { token, user } = data;
      
      if (!token || !user) {
        throw new Error('Invalid login response');
      }

      // Store user data
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');

      // Call onLogin callback with user data
      if (onLogin) {
        onLogin(user, token);
      }

      navigate('/', { replace: true });
      
      // Test token by making a quick request
      try {
        const testResponse = await fetch('http://localhost:5000/api/adoptions/mine', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!testResponse.ok) {
          const errorData = await testResponse.json();
          console.error('Token test failed:', errorData);
          throw new Error('Token validation failed: ' + errorData.message);
        }
        
        console.log('Token validation successful');
      } catch (err) {
        console.error('Token validation error:', err);
        throw new Error('Failed to validate token: ' + err.message);
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle guest login
  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      // Add a slight delay to simulate server authentication
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const guestData = {
        id: 'guest-' + Date.now(),
        _id: 'guest-' + Date.now(),
        firstName: 'Guest',
        lastName: 'User',
        email: 'guest@example.com',
        role: 'user'
      };
      
      const token = 'guest-jwt-token-' + Date.now();
      
      localStorage.setItem('userData', JSON.stringify(guestData));
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', 'false');
      
      // Call onLogin callback with user data and token
      if (onLogin) {
        onLogin(guestData, token);
      }
      
      navigate('/');
    } catch (err) {
      console.error('Guest login error:', err);
      setLoginError('Failed to login as guest. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Add a slight delay to simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const googleUserData = {
        id: 'google-' + Date.now(),
        _id: 'google-' + Date.now(), // Add _id for consistent property naming
        firstName: 'Google',
        lastName: 'User',
        email: 'google.user@example.com',
        role: 'user'
      };
      
      localStorage.setItem('user', JSON.stringify(googleUserData));
      localStorage.setItem('token', 'google-jwt-token-' + Date.now());
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isGoogleUser', 'true');
      localStorage.setItem('isAdmin', 'false');
      
      if (typeof onLogin === 'function') {
        onLogin(googleUserData);
      }
      
      navigate('/');
    } catch (err) {
      console.error('Google login error:', err);
      setLoginError('Failed to login with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col md={10} lg={8}>
          <Card className="border-0 shadow overflow-hidden">
            <Row className="g-0">
              <Col md={6} className="bg-primary text-white d-none d-md-flex align-items-center">
                <div className="p-5">
                  <h2 className="fw-bold mb-4">Find Your Perfect Companion</h2>
                  <p className="mb-4">Join thousands of pet lovers who found their forever friends through PetAdopt</p>
                  
                  <div className="mb-3 d-flex align-items-center">
                    <div className="me-3 fs-4">🔍</div>
                    <div>Browse hundreds of pets</div>
                  </div>
                  
                  <div className="mb-3 d-flex align-items-center">
                    <div className="me-3 fs-4">💌</div>
                    <div>Contact shelters directly</div>
                  </div>
                  
                  <div className="mb-3 d-flex align-items-center">
                    <div className="me-3 fs-4">❤️</div>
                    <div>Save favorites for later</div>
                  </div>
                </div>
              </Col>
              
              <Col md={6}>
                <Card.Body className="p-5 position-relative">
                  {/* Loading overlay */}
                  {isLoading && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                         style={{ backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 100 }}>
                      <div className="text-center">
                        <Spinner animation="border" variant="primary" className="mb-2" />
                        <p className="text-primary mb-0">Logging in...</p>
                      </div>
                    </div>
                  )}
                
                  <div className="text-center mb-4">
                    <div className="mb-3 display-6 text-primary">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 14.5V16.5M7 10.5V8.5C7 5.73858 9.23858 3.5 12 3.5C14.7614 3.5 17 5.73858 17 8.5V10.5M7 10.5C5.89543 10.5 5 11.3954 5 12.5V18.5C5 19.6046 5.89543 20.5 7 20.5H17C18.1046 20.5 19 19.6046 19 18.5V12.5C19 11.3954 18.1046 10.5 17 10.5M7 10.5H17" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h1 className="h3 fw-bold">Sign in</h1>
                    <p className="text-muted">Use your account to find your perfect pet</p>
                  </div>

                  {loginError && (
                    <Alert variant="danger">{loginError}</Alert>
                  )}

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={isLoading}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Admin login: admin@gmail.com / admin123
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                          disabled={isLoading}
                        />
                        <Button 
                          variant="outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeSlash /> : <Eye />}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          Please provide your password.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check 
                        type="checkbox"
                        id="remember"
                        label="Remember me"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        disabled={isLoading}
                      />
                      <a href="#forgot" className="text-decoration-none">Forgot password?</a>
                    </div>

                    <div className="d-grid gap-2">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="py-2"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                            Signing In...
                          </>
                        ) : 'Sign In'}
                      </Button>
                      
                      <div className="text-center my-3">
                        <span className="bg-white px-2 text-muted">or</span>
                      </div>
                      
                      <Button 
                        variant="outline-dark" 
                        className="py-2 d-flex align-items-center justify-content-center"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                      >
                        <Google className="me-2" />
                        Continue with Google
                      </Button>
                      
                      <Button 
                        variant="outline-secondary" 
                        className="py-2"
                        onClick={handleGuestLogin}
                        disabled={isLoading}
                      >
                        Continue as Guest
                      </Button>
                    </div>
                  </Form>
                  
                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link>
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-top text-center text-muted">
                    <small>
                      By continuing, you agree to our <a href="#terms" className="text-decoration-none">Terms of Service</a> and <a href="#privacy" className="text-decoration-none">Privacy Policy</a>
                    </small>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;