import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, isAdmin, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  // Check if user is logged in and get user data
  const isLoggedIn = isAuthenticated;
  const userData = isAuthenticated ? JSON.parse(localStorage.getItem('userData')) : null;
  const userName = userData ? (userData.firstName || userData.username || 'My Account') : 'Login';

  // Handle login redirect
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Handle signup redirect
  const handleSignupClick = () => {
    navigate('/signup');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('isGoogleUser');
    localStorage.removeItem('isLoggedIn');
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <div className="page-transition">
      <nav 
        className={`navbar navbar-expand-lg fixed-top site-navbar ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="container">
          <NavLink to="/" className="navbar-brand fw-bold">
            <span className="text-primary">Pet</span>Adopt
          </NavLink>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setExpanded(!expanded)}
            aria-controls="navbar-nav" 
            aria-expanded={expanded} 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`} id="navbar-nav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item mx-lg-2">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item mx-lg-2">
                <NavLink to="/pets" className="nav-link">Find Pets</NavLink>
              </li>
              <li className="nav-item mx-lg-2">
                <NavLink to="/about" className="nav-link">About Us</NavLink>
              </li>
              <li className="nav-item mx-lg-2">
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
              </li>
              {isAdmin && (
                <li className="nav-item mx-lg-2">
                  <NavLink to="/admin" className="nav-link">
                    <span className="text-danger">Admin Dashboard</span>
                  </NavLink>
                </li>
              )}
            </ul>
            
            <div className="ms-auto">
              {isLoggedIn ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-primary dropdown-toggle" 
                    type="button" 
                    id="user-dropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    {userName}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="user-dropdown">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/my-listings">My Listings</Link></li>
                    <li><Link className="dropdown-item" to="/my-applications">My Applications</Link></li>
                    {isAdmin && (
                      <li><Link className="dropdown-item" to="/admin">Admin Dashboard</Link></li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Sign Out</button></li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <button onClick={handleLoginClick} className="btn btn-outline-primary me-2">
                    Login
                  </button>
                  <button onClick={handleSignupClick} className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;