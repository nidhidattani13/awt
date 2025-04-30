import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setLoginError('Please enter both email and password');
      return;
    }
    
    // Call the mock login function (in a real app, this would make an API call)
    onLogin();
    navigate('/pets');
  };

  // Handle guest login
  const handleGuestLogin = () => {
    onLogin();
    navigate('/pets');
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    // In a real app, this would initiate OAuth flow
    onLogin();
    navigate('/pets');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-header">
            <div className="login-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="lock-icon">
                <path d="M12 14.5V16.5M7 10.5V8.5C7 5.73858 9.23858 3.5 12 3.5C14.7614 3.5 17 5.73858 17 8.5V10.5M7 10.5C5.89543 10.5 5 11.3954 5 12.5V18.5C5 19.6046 5.89543 20.5 7 20.5H17C18.1046 20.5 19 19.6046 19 18.5V12.5C19 11.3954 18.1046 10.5 17 10.5M7 10.5H17" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Sign in</h1>
            <p>Use your account to find your perfect pet</p>
          </div>

          {loginError && <div className="login-error">{loginError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="login-options">
              <div className="remember-me">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="login-button">Sign In</button>
          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button className="google-signin" onClick={handleGoogleLogin}>
            <img src="/assets/google-icon.svg" alt="Google" className="google-icon" />
            Continue with Google
          </button>

          <button className="guest-signin" onClick={handleGuestLogin}>
            Continue as Guest
          </button>

          <div className="login-footer">
            <p>
              By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>

        <div className="login-image-container">
          <div className="login-image-content">
            <h2>Find Your Perfect Companion</h2>
            <p>Join thousands of pet lovers who found their forever friends through PetAdopt</p>
            <div className="benefits">
              <div className="benefit-item">
                <div className="benefit-icon">🔍</div>
                <div className="benefit-text">Browse hundreds of pets</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💌</div>
                <div className="benefit-text">Contact shelters directly</div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">❤️</div>
                <div className="benefit-text">Save favorites for later</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;