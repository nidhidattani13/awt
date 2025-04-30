import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/pets');
  };

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About <span className="highlight">PetAdopt</span></h1>
          <p>We're on a mission to find loving homes for every pet in need.</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="story-section">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>Founded in 2023, PetAdopt began with a simple yet powerful mission: to connect homeless pets with loving families. What started as a small local initiative quickly grew into a nationwide network of animal lovers, shelters, and volunteers working together to give every pet a second chance at happiness.</p>
          <p>Our founders, a group of passionate animal welfare advocates, noticed a gap in the adoption system. Many loving families wanted to adopt, but found the process confusing or inaccessible. Meanwhile, shelters were overflowing with wonderful pets waiting for homes. PetAdopt was created to bridge this gap and make pet adoption simple, accessible, and joyful for everyone involved.</p>
        </div>
        <div className="story-image">
          <img src="/api/placeholder/500/350" alt="PetAdopt founders with rescued pets" />
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="mission-section">
        <h2>Our Mission & Values</h2>
        <div className="values-container">
          <div className="value-card">
            <div className="value-icon">🏠</div>
            <h3>Every Pet Deserves a Home</h3>
            <p>We believe every animal deserves to be part of a loving family, regardless of age, breed, or background.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">❤️</div>
            <h3>Compassionate Care</h3>
            <p>All pets in our network receive the highest standards of care, respect, and affection while awaiting adoption.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Community Collaboration</h3>
            <p>We partner with shelters, veterinarians, and volunteers to create a strong support network for pets and adopters.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>Education & Awareness</h3>
            <p>We're committed to promoting responsible pet ownership and animal welfare through education and outreach.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/api/placeholder/200/200" alt="Emily Johnson" />
            <h3>Emily Johnson</h3>
            <p className="role">Founder & Director</p>
            <p>Emily has 15+ years of experience in animal welfare and previously managed one of the largest shelters on the West Coast.</p>
          </div>
          <div className="team-member">
            <img src="/api/placeholder/200/200" alt="Marcus Chen" />
            <h3>Marcus Chen</h3>
            <p className="role">Adoption Coordinator</p>
            <p>With a background in social work, Marcus ensures each adoption is a perfect match for both the pet and the family.</p>
          </div>
          <div className="team-member">
            <img src="/api/placeholder/200/200" alt="Dr. Sarah Rodriguez" />
            <h3>Dr. Sarah Rodriguez</h3>
            <p className="role">Veterinary Director</p>
            <p>Dr. Rodriguez oversees all medical aspects of our operation, ensuring every pet is healthy and ready for their new home.</p>
          </div>
          <div className="team-member">
            <img src="/api/placeholder/200/200" alt="James Wilson" />
            <h3>James Wilson</h3>
            <p className="role">Outreach Coordinator</p>
            <p>James builds partnerships with shelters nationwide and organizes community events to promote adoption.</p>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="partners-section">
        <h2>Our Partners</h2>
        <p>We're proud to work with these organizations to help pets find their forever homes.</p>
        <div className="partners-logo-grid">
          <div className="partner-logo">
            <img src="/api/placeholder/180/100" alt="City Animal Shelter" />
            <p>City Animal Shelter</p>
          </div>
          <div className="partner-logo">
            <img src="/api/placeholder/180/100" alt="PetCare Clinic" />
            <p>PetCare Clinic</p>
          </div>
          <div className="partner-logo">
            <img src="/api/placeholder/180/100" alt="Happy Paws Foundation" />
            <p>Happy Paws Foundation</p>
          </div>
          <div className="partner-logo">
            <img src="/api/placeholder/180/100" alt="Pet Nutrition Co." />
            <p>Pet Nutrition Co.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="about-cta-section">
        <h2>Join Our Mission</h2>
        <p>Whether you're looking to adopt, volunteer, donate, or partner with us, there are many ways to help pets in need.</p>
        <button className="cta-btn" onClick={handleExploreClick}>Find a Pet to Adopt</button>
      </div>

      {/* Footer */}
      <footer className="about-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PetAdopt</h3>
            <p>Connecting pets with loving homes since 2023.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/pets">Available Pets</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="#">Donate</a></li>
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

export default AboutUs;