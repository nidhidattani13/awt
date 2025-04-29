import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdoptionForm from './AdoptionForm';
import '../Styles/PetDetails.css';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [adoptionType, setAdoptionType] = useState(null);
  const [adoptionStatus, setAdoptionStatus] = useState('pending'); // 'approved', 'pending', 'rejected'
  const [isGoogleUser, setIsGoogleUser] = useState(false); // Track if user is logged in with Google

  // Check if user is logged in with Google
  useEffect(() => {
    // In a real app, you would check authentication status from your auth context or provider
    // For this demo, we'll simulate Google login status
    const checkGoogleLoginStatus = () => {
      // This is a placeholder - in a real app, you'd use your auth system
      // For example: return authContext.isAuthenticated && authContext.provider === 'google'
      const isLoggedInWithGoogle = localStorage.getItem('isGoogleUser') === 'true';
      setIsGoogleUser(isLoggedInWithGoogle);
    };
    
    checkGoogleLoginStatus();
  }, []);
  
  // Mock pet data - in a real app, you would fetch this from an API based on the id
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockPets = {
        '1': {
          id: 1,
          name: "Luna",
          species: "Dog",
          breed: "Golden Retriever",
          age: "2 years",
          gender: "Female",
          weight: "25 kg",
          description: "Luna is a friendly and energetic Golden Retriever who loves outdoor activities. She's great with children and other pets. Luna is fully house-trained and responds well to basic commands.",
          medicalHistory: "Luna has been spayed and is up to date on all vaccinations. She had a minor ear infection last year that was treated successfully. No known allergies or current medical issues.",
          personality: "Playful, Loyal, Intelligent",
          adoptionFee: "$200",
          images: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
          ]
        },
        '2': {
          id: 2,
          name: "Oliver",
          species: "Cat",
          breed: "Scottish Fold",
          age: "3 years",
          gender: "Male",
          weight: "4.5 kg",
          description: "Oliver is a calm and affectionate Scottish Fold who enjoys relaxing and observing his surroundings. He's independent but also enjoys being petted and will purr loudly when content.",
          medicalHistory: "Oliver has been neutered and is up to date on all vaccinations. He has a minor heart murmur that's being monitored but doesn't require treatment at this time.",
          personality: "Calm, Affectionate, Independent",
          adoptionFee: "$150",
          images: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
          ]
        },
        '3': {
          id: 3,
          name: "Daisy",
          species: "Dog",
          breed: "Beagle",
          age: "1 year",
          gender: "Female",
          weight: "8 kg",
          description: "Daisy is a curious and friendly Beagle puppy with boundless energy. She loves exploring and would be perfect for an active household. She's currently in training and learning basic commands.",
          medicalHistory: "Daisy has been spayed and is up to date on all vaccinations. No known health issues.",
          personality: "Curious, Energetic, Friendly",
          adoptionFee: "$180",
          images: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
          ]
        },
        '4': {
          id: 4,
          name: "Milo",
          species: "Cat",
          breed: "Maine Coon",
          age: "4 years",
          gender: "Male",
          weight: "7 kg",
          description: "Milo is a majestic Maine Coon with a gentle temperament. Despite his impressive size, he's incredibly gentle and patient. He enjoys lounging by windows and gentle play sessions.",
          medicalHistory: "Milo has been neutered and is up to date on all vaccinations. He had dental cleaning last year and maintains good oral health.",
          personality: "Gentle, Patient, Majestic",
          adoptionFee: "$220",
          images: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
          ]
        },
        '5': {
          id: 5,
          name: "Charlie",
          species: "Dog",
          breed: "French Bulldog",
          age: "2 years",
          gender: "Male",
          weight: "11 kg",
          description: "Charlie is a charming French Bulldog with lots of personality. He's playful and loves attention. Charlie is great with families and adapts well to apartment living.",
          medicalHistory: "Charlie has been neutered and is up to date on all vaccinations. He has slight breathing issues common to brachycephalic breeds, but no serious health concerns.",
          personality: "Charming, Playful, Adaptable",
          adoptionFee: "$250",
          images: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
          ]
        },
        '6': {
          id: 6,
          name: "Lucy",
          species: "Cat",
          breed: "Siamese",
          age: "1 year",
          gender: "Female",
          weight: "3.5 kg",
          description: "Lucy is a vocal and intelligent Siamese cat who forms strong bonds with her humans. She's quite talkative and will let you know what she thinks. Lucy enjoys interactive toys and learning tricks.",
          medicalHistory: "Lucy has been spayed and is up to date on all vaccinations. No known health issues.",
          personality: "Intelligent, Vocal, Loyal",
          adoptionFee: "$180",
          images: [
            "/api/placeholder/600/400",
            "/api/placeholder/600/400",
            "/api/placeholder/600/400"
          ]
        }
      };

      setPet(mockPets[id]);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleAdoptTemporarily = () => {
    setAdoptionType('temporary');
    setShowAdoptionForm(true);
  };

  const handleAdoptPermanently = () => {
    setAdoptionType('permanent');
    setShowAdoptionForm(true);
  };

  const handleCloseForm = () => {
    setShowAdoptionForm(false);
  };

  const handleSubmitAdoption = (formData) => {
    // In a real app, you would submit this data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    alert(`Thank you for applying to adopt ${pet.name}! We'll review your application and contact you soon.`);
    
    // Close the form
    setShowAdoptionForm(false);
    
    // Set status to pending after submission
    setAdoptionStatus('pending');
  };
  
  // Handlers for adoption status changes
  const handleStatusChange = (status) => {
    if (!isGoogleUser) {
      alert("You must be logged in with Google to change adoption status.");
      return;
    }
    
    setAdoptionStatus(status);
    // In a real app, you would update the status in your backend
    console.log(`Adoption status changed to: ${status}`);
  };

  const handleGoBack = () => {
    navigate('/pets');
  };

  if (isLoading) {
    return (
      <div className="pet-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading pet details...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="pet-not-found">
        <h2>Pet Not Found</h2>
        <p>Sorry, we couldn't find the pet you're looking for.</p>
        <button className="back-button" onClick={handleGoBack}>Back to Pet List</button>
      </div>
    );
  }

  return (
    <div className="pet-details-container">
      <button className="back-button" onClick={handleGoBack}>
        <span className="back-icon">←</span> Back to All Pets
      </button>
      
      <div className="pet-details-content">
        <div className="pet-gallery">
          <div className="main-image-container">
            <img 
              src={pet.images[activeImage]} 
              alt={`${pet.name} - image ${activeImage + 1}`} 
              className="main-image" 
            />
          </div>
          <div className="thumbnail-row">
            {pet.images.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt={`${pet.name} thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="pet-info-section">
          <div className="pet-header">
            <h1>{pet.name}</h1>
            <div className="pet-badges">
              <span className="species-badge">{pet.species}</span>
              <span className="breed-badge">{pet.breed}</span>
            </div>
          </div>
          
          <div className="pet-stats">
            <div className="stat">
              <span className="stat-label">Age</span>
              <span className="stat-value">{pet.age}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Gender</span>
              <span className="stat-value">{pet.gender}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Weight</span>
              <span className="stat-value">{pet.weight}</span>
            </div>
          </div>
          
          <div className="pet-personality">
            <h3>Personality</h3>
            <div className="personality-tags">
              {pet.personality.split(', ').map((trait, index) => (
                <span key={index} className="personality-tag">{trait}</span>
              ))}
            </div>
          </div>
          
          <div className="pet-description">
            <h3>About {pet.name}</h3>
            <p>{pet.description}</p>
          </div>
          
          <div className="pet-medical">
            <h3>Medical History</h3>
            <p>{pet.medicalHistory}</p>
          </div>
          
          <div className="adoption-info">
            <h3>Adoption Fee</h3>
            <p className="adoption-fee">{pet.adoptionFee}</p>
          </div>
          
          <div className="adoption-actions">
            <button className="adopt-temp-btn" onClick={handleAdoptTemporarily}>
              Adopt Temporarily
            </button>
            <button className="adopt-perm-btn" onClick={handleAdoptPermanently}>
              Adopt Permanently
            </button>
          </div>
          
          {/* Adoption Status Section */}
          <div className="adoption-status-section">
            <h3>Adoption Status</h3>
            <div className="status-buttons">
              <button 
                className={`status-btn ${adoptionStatus === 'approved' ? 'active' : ''} ${isGoogleUser ? 'approved' : 'disabled'}`}
                onClick={() => handleStatusChange('approved')}
                disabled={!isGoogleUser}
              >
                Approved
              </button>
              <button 
                className={`status-btn ${adoptionStatus === 'pending' ? 'active' : ''} ${isGoogleUser ? 'pending' : 'disabled'}`}
                onClick={() => handleStatusChange('pending')}
                disabled={!isGoogleUser}
              >
                Pending
              </button>
              <button 
                className={`status-btn ${adoptionStatus === 'rejected' ? 'active' : ''} ${isGoogleUser ? 'rejected' : 'disabled'}`}
                onClick={() => handleStatusChange('rejected')}
                disabled={!isGoogleUser}
              >
                Rejected
              </button>
            </div>
            {!isGoogleUser && (
              <p className="login-note">
                <small>You must be logged in with Google to manage adoption status</small>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Adoption Form Modal */}
      {showAdoptionForm && (
        <AdoptionForm 
          pet={pet}
          adoptionType={adoptionType}
          onClose={handleCloseForm}
          onSubmit={handleSubmitAdoption}
        />
      )}
    </div>
  );
};

export default PetDetails;