import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import HomePage from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';
import PetList from './Pages/PetList';
import PetDetails from './Pages/PetDetails';
import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';
import Footer from './components/Footer';
import AddPet from './Pages/AddPet';
import AdminPage from './Pages/AdminPage';
import MyApplications from './Pages/MyApplications';
import MyListings from './Pages/MyListings';

import './App.css';
import './Styles/Custom.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
      const isGoogleUser = localStorage.getItem('isGoogleUser') === 'true';
      const adminStatus = localStorage.getItem('isAdmin') === 'true';

      setIsAuthenticated(loggedInStatus || isGoogleUser);
      setIsAdmin(adminStatus);
    };

    checkAuth();

    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', 'true');

    if (userData.role === 'admin' || userData.isAdmin === true) {
  localStorage.setItem('isAdmin', 'true');
  setIsAdmin(true);
} else {
  localStorage.setItem('isAdmin', 'false');
  setIsAdmin(false);
}


    setIsAuthenticated(true);
  };

  const handleAdminLogin = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', 'admin-jwt-token'); // replace with real token if needed
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', 'true');
    setIsAuthenticated(true);
    setIsAdmin(true);
  };

  const handleLogout = () => {
    console.log("App handleLogout called");
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isGoogleUser');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthProvider>
      <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} />
        <div className="content-wrapper flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route
  path="/login"
  element={
    isAuthenticated
      ? isAdmin
        ? <Navigate to="/admin" />
        : <Navigate to="/" />
      : <LoginPage onLogin={handleLogin} />
  }
/>


            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to="/" /> : <SignUp onLogin={handleLogin} />
              }
            />
            <Route path="/pets" element={<PetList />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route
              path="/add-pet"
              element={isAuthenticated ? <AddPet /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile onLogout={handleLogout} /> : <Navigate to="/login" />}
            />
            <Route
              path="/my-applications"
              element={isAuthenticated ? <MyApplications /> : <Navigate to="/login" />}
            />
            <Route
              path="/my-listings"
              element={isAuthenticated ? <MyListings /> : <Navigate to="/login" />}
            />
            <Route 
  path="/admin" 
  element={
    isAdmin 
      ? <AdminPage /> 
      : <Navigate to="/" />
  } 
/>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
