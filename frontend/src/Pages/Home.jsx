import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/pets');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect <span className="highlight">Companion</span></h1>
          <p>Give a loving home to pets in need. Browse our available cats and dogs ready for adoption.</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={handleExploreClick}>Explore Pets</button>
            <button className="secondary-btn" onClick={handleLoginClick}>Sign In</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/api/placeholder/600/400" alt="Happy dog and cat" />
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Browse</h3>
            <p>Search through our directory of pets looking for a new home.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Connect</h3>
            <p>Find the perfect match for your lifestyle and home.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏠</div>
            <h3>Adopt</h3>
            <p>Complete the adoption process and welcome your new friend home.</p>
          </div>
        </div>
      </div>

      {/* Adoption Options Section */}
      <div className="adoption-options">
        <h2>Adoption Options</h2>
        <div className="options-container">
          <div className="option-card">
            <img src="/api/placeholder/400/300" alt="Permanent adoption" />
            <div className="option-content">
              <h3>Permanent Adoption</h3>
              <p>Give a pet a forever home and create a lifelong bond.</p>
              <button className="option-btn" onClick={handleExploreClick}>Learn More</button>
            </div>
          </div>
          <div className="option-card">
            <img src="/api/placeholder/400/300" alt="Temporary adoption" />
            <div className="option-content">
              <h3>Temporary Adoption</h3>
              <p>Provide a short-term home for a pet in need of care.</p>
              <button className="option-btn" onClick={handleExploreClick}>Learn More</button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>Happy Adoptions</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="/api/placeholder/150/150" alt="Testimonial" />
            </div>
            <div className="testimonial-content">
              <p>"Adopting Luna was the best decision we ever made. She's brought so much joy to our family."</p>
              <h4>- The Johnson Family</h4>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-image">
              <img src="/api/placeholder/150/150" alt="Testimonial" />
            </div>
            <div className="testimonial-content">
              <p>"Oliver has been such a wonderful addition to our home. The adoption process was smooth and supportive."</p>
              <h4>- Sarah & Mike</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to Meet Your New Best Friend?</h2>
        <p>Browse our available pets and start your adoption journey today.</p>
        <button className="cta-btn" onClick={handleExploreClick}>Find Your Perfect Pet</button>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PetAdopt</h3>
            <p>Connecting pets with loving homes since 2023.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/pets">Available Pets</a></li>
              <li><a href="#">Adoption Process</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>123 Pet Street<br />Petville, CA 12345<br />info@petadopt.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PetAdopt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;