import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Table, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Profile = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    bio: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [applications, setApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      console.log('Stored user in localStorage:', JSON.parse(userData));

      if (token && userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
          setFormData({
            firstName: parsedUserData.firstName || '',
            lastName: parsedUserData.lastName || '',
            email: parsedUserData.email || '',
            phone: parsedUserData.phone || '',
            address: parsedUserData.address || '',
            city: parsedUserData.city || '',
            state: parsedUserData.state || '',
            country: parsedUserData.country || '',
            zipCode: parsedUserData.zipCode || '',
            bio: parsedUserData.bio || ''
          });



          // Fetch applications
          setLoadingApplications(true);
          const appsResponse = await fetch('http://localhost:5000/api/profile/applications', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const appsData = await appsResponse.json();
          setApplications(appsData.applications || []);
          setLoadingApplications(false);

        } catch (err) {
          console.error('Error fetching profile data:', err);
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          navigate('/login', { state: { message: "Session expired. Please login again." } });
        }
      } else {
        navigate('/login', { state: { message: "Please login to view your profile." } });
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
    
    // Setup event listener for storage changes (in case user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile/update', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      let data;
      const text = await response.text();
      
      try {
        data = text ? JSON.parse(text) : {};
      } catch (jsonErr) {
        console.error('JSON parse error:', jsonErr);
        setMessage({ type: 'danger', text: 'Invalid server response' });
        return;
      }

      if (response.ok) {
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditMode(false);
        setMessage({ type: 'success', text: data.message || 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'danger', text: data.error || 'Failed to update profile' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'danger', text: 'An error occurred while updating profile' });
    }
  };

  // Handle going back to home page
  const handleBackToHome = () => {
    navigate('/');
  };

  // Handle logout - Use the onLogout prop passed from App.jsx
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
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
      <Button 
        variant="link" 
        className="mb-4 ps-0" 
        onClick={handleBackToHome}
      >
        <i className="bi bi-arrow-left me-2"></i> Back to Home
      </Button>
      
      <Row>
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="text-center p-4">
              <div className="mb-4">
                {/* <img 
                  src="/api/placeholder/150/150" 
                  alt="Profile" 
                  className="rounded-circle img-thumbnail" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                /> */}
              </div>
              <h3 className="h4 fw-bold mb-1">{`${user?.firstName || ''} ${user?.lastName || ''}`}</h3>
              <p className="text-muted mb-3">{user?.email || ''}</p>
              {!editMode && (
                <Button 
                  variant="outline-primary" 
                  className="w-100"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="h5 fw-bold mb-3">Quick Links</h4>
              <div className="d-grid gap-2">
                <Button 
                  variant="outline-secondary" 
                  className="text-start" 
                  onClick={() => navigate('/my-listings')}
                >
                  <i className="bi bi-folder-plus me-2"></i> My Listings
                </Button>
                <Button 
                  variant="outline-secondary" 
                  className="text-start" 
                  onClick={() => navigate('/my-applications')}
                >
                  <i className="bi bi-file-earmark-text me-2"></i> My Applications
                </Button>
                <Button 
                  variant="outline-secondary" 
                  className="text-start" 
                  onClick={() => navigate('/add-pet')}
                >
                  <i className="bi bi-plus-circle me-2"></i> List a Pet
                </Button>
                {/* Add Logout Button */}
                <Button 
                  variant="outline-danger" 
                  className="text-start" 
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Log Out
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {message.text && (
            <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
              {message.text}
            </Alert>
          )}

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h4 fw-bold mb-0">Profile Information</h3>
                {editMode && (
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => {
                      setEditMode(false);
                      // Reset form data to current user data
                      if (user) {
                        setFormData({
                          firstName: user.firstName || '',
                          lastName: user.lastName || '',
                          email: user.email || '',
                          phone: user.phone || '',
                          address: user.address || '',
                          city: user.city || '',
                          state: user.state || '',
                          country: user.country || '',
                          zipCode: user.zipCode || '',
                          bio: user.bio || ''
                        });
                      }
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>

              {editMode ? (
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
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
                        <Form.Label>Last Name</Form.Label>
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={user?.isGoogleUser}
                    />
                    {user?.isGoogleUser && (
                      <Form.Text className="text-muted">
                        Email cannot be changed for Google accounts
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
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
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Zip/Postal Code</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4}
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <Row className="mb-4">
                    <Col sm={4} className="text-muted">Full Name</Col>
                    <Col sm={8} className="fw-medium">{user ? `${user.firstName} ${user.lastName}` : ''}</Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={4} className="text-muted">Email</Col>
                    <Col sm={8} className="fw-medium">{user?.email || ''}</Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={4} className="text-muted">Phone</Col>
                    <Col sm={8} className="fw-medium">{user?.phone || '—'}</Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={4} className="text-muted">Address</Col>
                    <Col sm={8} className="fw-medium">{user?.address || '—'}</Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={4} className="text-muted">City</Col>
                    <Col sm={8} className="fw-medium">{user?.city || '—'}</Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={4} className="text-muted">State/Province</Col>
                    <Col sm={8} className="fw-medium">{user?.state || '—'}</Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={4} className="text-muted">Zip/Postal Code</Col>
                    <Col sm={8} className="fw-medium">{user?.zipCode || '—'}</Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={4} className="text-muted">Country</Col>
                    <Col sm={8} className="fw-medium">{user?.country || '—'}</Col>
                  </Row>
                  <Row className="mb-4">
                    <Col sm={4} className="text-muted">Bio</Col>
                    <Col sm={8}>
                      {user?.bio || 'No bio information added yet.'}
                    </Col>
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="p-4">
              <h3 className="h4 fw-bold mb-4">Account Settings</h3>
              <div className="d-grid gap-3">
                <Button variant="outline-primary" onClick={() => navigate('/change-password')}>
                  Change Password
                </Button>
                {user && !user.isGoogleUser && (
                  <Button variant="outline-danger" onClick={() => navigate('/delete-account')}>
                    Delete Account
                  </Button>
                )}
                {/* Add Logout Button in Account Settings too */}
                <Button 
                  variant="danger" 
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;