import React, { useState } from 'react';
import '../Styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    // Show success message
    setFormSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Reset success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-container">
      {/* Contact Hero */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Get in <span className="highlight">Touch</span></h1>
          <p>Have questions about adoption? Want to volunteer or donate? We'd love to hear from you!</p>
        </div>
      </div>

      {/* Contact Info & Form Section */}
      <div className="contact-section">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-content">
              <h3>Address</h3>
              <p>123 Pet Street<br />Petville, CA 12345<br />United States</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-content">
              <h3>Phone</h3>
              <p>Main Office: (555) 123-4567<br />Adoption Hotline: (555) 987-6543</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div className="info-content">
              <h3>Email</h3>
              <p>General Inquiries: info@petadopt.com<br />Adoption Questions: adopt@petadopt.com<br />Volunteer Opportunities: volunteer@petadopt.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">🕒</div>
            <div className="info-content">
              <h3>Hours of Operation</h3>
              <p>Monday - Friday: 9am - 6pm<br />Saturday: 10am - 5pm<br />Sunday: 11am - 4pm</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {formSubmitted && (
            <div className="form-success">
              Your message has been sent successfully! We'll get back to you soon.
            </div>
          )}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <h2>Find Us</h2>
        <div className="map-container">
          <img src="/api/placeholder/1200/400" alt="Map location of PetAdopt" />
          <div className="map-overlay">
            <p>This is where our main facility is located. Come visit us!</p>
            <button className="directions-btn">Get Directions</button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>What is the adoption process like?</h3>
            <p>Our adoption process includes filling out an application, an interview with an adoption counselor, and sometimes a home visit. Once approved, you can select your new pet and complete the paperwork.</p>
          </div>
          <div className="faq-item">
            <h3>What are the adoption fees?</h3>
            <p>Adoption fees vary depending on the animal but typically range from $50 to $200. This fee helps cover vaccinations, spaying/neutering, and medical care the animal received while in our care.</p>
          </div>
          <div className="faq-item">
            <h3>Can I volunteer if I can't adopt?</h3>
            <p>Absolutely! We always need volunteers to help with animal care, administrative tasks, events, and fostering. Contact our volunteer coordinator at volunteer@petadopt.com to learn more.</p>
          </div>
          <div className="faq-item">
            <h3>Do you offer support after adoption?</h3>
            <p>Yes! We provide post-adoption support including training resources, behavioral advice, and regular check-ins to ensure both you and your pet are adjusting well.</p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for adoption events, success stories, and pet care tips.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your Email Address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
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

export default Contact;