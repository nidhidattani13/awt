import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import PetList from './Pages/PetList';
import PetDetails from './Pages/PetDetails';
import './App.css';

// Import styles for the AdoptionForm
import './Styles/AdoptionForm.css';

function App() {
  // Simple authentication state (in a real app, use context or Redux)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login function
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
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
          
          {/* Redirect to login by default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;