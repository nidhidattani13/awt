import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Badge, InputGroup } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const PetList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [filters, setFilters] = useState({
    species: 'all',
    gender: 'all',
    age: 'all',
    size: 'all',
    country: '',
    city: '',
    goodWithKids: false,
    goodWithAnimals: false,
    houseTrained: false
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
          fetchFavorites(parsedUserData._id);
        } catch (err) {
          console.error('Error parsing user data', err);
        }
      }
    };
    
    checkAuthStatus();
    fetchPets();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    let result = [...pets];
    
    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(pet => 
        pet.name.toLowerCase().includes(searchLower) ||
        pet.breed.toLowerCase().includes(searchLower) ||
        pet.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by species
    if (filters.species !== 'all') {
      result = result.filter(pet => 
        pet.species.toLowerCase() === filters.species.toLowerCase()
      );
    }
    
    // Filter by gender
    if (filters.gender !== 'all') {
      result = result.filter(pet => 
        pet.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }
    
    // Filter by size
    if (filters.size !== 'all') {
      result = result.filter(pet => pet.size === filters.size);
    }
    
    // Filter by age category
    if (filters.age !== 'all') {
      result = result.filter(pet => {
        // Extract numeric age if possible
        const ageMatch = pet.age.match(/\d+/);
        const ageValue = ageMatch ? parseInt(ageMatch[0]) : null;
        
        if (ageValue === null) return true; // Keep if we can't determine age
        
        switch (filters.age) {
          case 'young':
            return ageValue <= 2;
          case 'adult':
            return ageValue > 2 && ageValue <= 8;
          case 'senior':
            return ageValue > 8;
          default:
            return true;
        }
      });
    }
    
    // Filter by country
    if (filters.country) {
      result = result.filter(pet => 
        pet.country && pet.country.toLowerCase() === filters.country.toLowerCase()
      );
    }
    
    // Filter by city
    if (filters.city) {
      result = result.filter(pet => 
        pet.city && pet.city.toLowerCase() === filters.city.toLowerCase()
      );
    }
    
    // Filter by characteristics
    if (filters.goodWithKids) {
      result = result.filter(pet => pet.goodWithKids);
    }
    
    if (filters.goodWithAnimals) {
      result = result.filter(pet => pet.goodWithAnimals);
    }
    
    if (filters.houseTrained) {
      result = result.filter(pet => pet.houseTrained);
    }
    
    setFilteredPets(result);
  }, [filters, pets, searchTerm]);

  // Extract unique countries and cities from pets data
  useEffect(() => {
    if (pets.length > 0) {
      const uniqueCountries = [...new Set(
        pets
          .filter(pet => pet.country)
          .map(pet => pet.country)
      )];
      
      setCountries(uniqueCountries);
      
      if (filters.country) {
        const uniqueCities = [...new Set(
          pets
            .filter(pet => pet.country && pet.country.toLowerCase() === filters.country.toLowerCase())
            .filter(pet => pet.city)
            .map(pet => pet.city)
        )];
        
        setCities(uniqueCities);
      } else {
        const allCities = [...new Set(
          pets
            .filter(pet => pet.city)
            .map(pet => pet.city)
        )];
        
        setCities(allCities);
      }
    }
  }, [pets, filters.country]);
  
  const fetchPets = async () => {
  setLoading(true);
  setError('');
  
  try {
    const response = await fetch('http://localhost:5000/api/pets');
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to fetch pets');

    setPets(data.pets);       // assuming backend sends `{ pets: [...] }`
    setFilteredPets(data.pets);
    setLoading(false);
  } catch (err) {
    console.error('Error fetching pets:', err);
    setError('Failed to load pets. Please try again later.');
    setLoading(false);
  }
};

  
  const fetchFavorites = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      // In a real app, this would be an API call
      // Mock data for now
      setFavorites(['1', '3']); // Example: user has favorited pets with ID 1 and 3
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  };
  
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Reset city when country changes
    if (name === 'country') {
      setFilters(prev => ({
        ...prev,
        city: ''
      }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const resetFilters = () => {
    setFilters({
      species: 'all',
      gender: 'all',
      age: 'all',
      size: 'all',
      country: '',
      city: '',
      goodWithKids: false,
      goodWithAnimals: false,
      houseTrained: false
    });
    setSearchTerm('');
  };
  
  const toggleFavorite = async (petId) => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const isFavorite = favorites.includes(petId);
      
      // In a real app, this would be an API call
      // Mock functionality for now
      if (isFavorite) {
        setFavorites(favorites.filter(id => id !== petId));
      } else {
        setFavorites([...favorites, petId]);
      }
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };

  return (
    <div className="pet-list-page">
      {/* Hero Banner */}
      <div className="pet-list-banner text-center py-5 bg-light">
        <Container>
          <h1 className="display-4 fw-bold">Find Your New <span className="highlight">Friend</span></h1>
          <p className="lead">Browse our available pets and find the perfect companion for your home.</p>
        </Container>
      </div>

      <Container className="py-5">
        {/* Search and Filters */}
        <div className="filter-section mb-5">
          <Row className="g-3">
            <Col lg={4}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search pets..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Col>
            
            <Col sm={6} md={4} lg={2}>
              <Form.Select 
                name="species" 
                value={filters.species}
                onChange={handleFilterChange}
              >
                <option value="all">All Species</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
              </Form.Select>
            </Col>
            
            <Col sm={6} md={4} lg={2}>
              <Form.Select 
                name="age" 
                value={filters.age}
                onChange={handleFilterChange}
              >
                <option value="all">All Ages</option>
                <option value="young">Young</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </Form.Select>
            </Col>
            
            <Col sm={6} md={4} lg={2}>
              <Form.Select 
                name="gender" 
                value={filters.gender}
                onChange={handleFilterChange}
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
            </Col>
            
            <Col sm={6} md={12} lg={2}>
              <Button 
                variant="outline-secondary" 
                className="w-100"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </div>
        
        {/* Results Count */}
        <div className="results-info mb-4">
          <p className="mb-0">
            Showing {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'}
            {Object.values(filters).some(value => value !== 'all' && value !== '' && value !== false) || searchTerm ? ' with current filters' : ''}
          </p>
        </div>
        
        {/* Pet Cards */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading pets...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : filteredPets.length > 0 ? (
          <Row className="g-4">
            {filteredPets.map((pet) => (
              <Col key={pet._id} sm={6} lg={4} xl={4}>
                <Card className="pet-card h-100 border-0 shadow-sm">
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={pet.image || "/default-pet.jpg"}  
                      alt={pet.name} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Badge 
                      bg={pet.species === 'Dog' ? 'primary' : pet.species === 'Cat' ? 'info' : 'secondary'}
                      className="position-absolute top-0 start-0 m-2"
                    >
                      {pet.species}
                    </Badge>
                    {user && (
                      <Button 
                        variant={favorites.includes(pet._id) ? "danger" : "light"}
                        size="sm"
                        className="position-absolute top-0 end-0 m-2 rounded-circle"
                        style={{ width: '32px', height: '32px' }}
                        onClick={() => toggleFavorite(pet._id)}
                      >
                        <i className={`bi ${favorites.includes(pet._id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                      </Button>
                    )}
                  </div>
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Title className="h4 mb-0 fw-bold">{pet.name}</Card.Title>
                      <span className="pet-age">{pet.age}</span>
                    </div>
                    <p className="text-muted mb-3">{pet.breed} · {pet.gender}</p>
                    <Card.Text className="mb-4">{pet.description}</Card.Text>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {pet.houseTrained && (
                        <Badge bg="light" text="dark" className="border">House Trained</Badge>
                      )}
                      {pet.goodWithKids && (
                        <Badge bg="light" text="dark" className="border">Kid-Friendly</Badge>
                      )}
                      {pet.goodWithAnimals && (
                        <Badge bg="light" text="dark" className="border">Pet-Friendly</Badge>
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="adoption-fee fw-bold">{pet.adoptionFee}</span>
                      <Button variant="primary" onClick={() => navigate(`/pet/${pet._id}`)}>View Details</Button>

                        
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="no-results text-center py-5">
            <div className="no-results-icon mb-3">😢</div>
            <h3>No pets found</h3>
            <p>Try adjusting your search or filters to find more pets.</p>
            <Button 
              variant="primary" 
              onClick={resetFilters}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </Container>
      
      {/* Call to Action Section */}
      <div className="cta-section bg-light py-5">
        <Container className="text-center">
          <h2 className="mb-4">Can't find what you're looking for?</h2>
          <p className="mb-4">Join our waiting list and we'll notify you when new pets that match your preferences are available.</p>
          <Button variant="primary" size="lg" as={Link} to="/waiting-list">
            Join Waiting List
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default PetList;