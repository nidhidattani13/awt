import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import PetList from './Pages/PetList';
import PetDetails from './Pages/PetDetails';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import './App.css';

// Import styles
import './Styles/AdoptionForm.css';
import './Styles/Home.css';
import './Styles/Navbar.css';
import './Styles/LoginPage.css';
import './Styles/PetList.css';
import './Styles/PetDetails.css';
import './Styles/AboutUs.css';
import './Styles/Contact.css';

function App() {
  // Simple authentication state (in a real app, use context or Redux)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login function
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Mock logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="content-wrapper">
          <Routes>
            {/* Home Page - Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            
            {/* Contact Page - Public */}
            <Route path="/contact" element={<Contact />} />
            
            {/* Public route - Login Page */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            
            {/* Pet Listing Page - Protected */}
            <Route 
              path="/pets" 
              element={isAuthenticated ? <PetList /> : <Navigate to="/login" />} 
            />
            
            {/* Pet Details Page - Protected */}
            <Route 
              path="/pet/:id" 
              element={isAuthenticated ? <PetDetails /> : <Navigate to="/login" />} 
            />
              {/* About Us Page - Public */}
            
            
            {/* Redirect to home by default */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;