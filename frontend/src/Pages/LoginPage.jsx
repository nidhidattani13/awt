import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Google SSO implementation would go here
    console.log('Google Sign-In clicked');
    onLogin();
    navigate('/pets');
  };

  const handleGuestSignIn = () => {
    // Guest login implementation
    console.log('Guest Sign-In clicked');
    onLogin();
    navigate('/pets');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          {/* Apple-style logo placeholder */}
          <div className="apple-logo"></div>
        </div>
        
        <h1>Sign in</h1>
        <p className="login-subtitle">Use your Google Account</p>
        
        <div className="login-form">
          <button 
            className="google-signin-btn" 
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="google-icon" />
            <span>Continue with Google</span>
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <button 
            className="guest-signin-btn"
            onClick={handleGuestSignIn}
          >
            Continue as Guest
          </button>
        </div>
        
        <p className="terms-text">
          By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;