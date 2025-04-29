import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/PetList.css';

const PetList = () => {
  const navigate = useNavigate();
  
  // Sample pet data - this would typically come from an API
  const [pets] = useState([
    {
      id: 1,
      name: "Luna",
      species: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      name: "Oliver",
      species: "Cat",
      breed: "Scottish Fold",
      age: "3 years",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      name: "Daisy",
      species: "Dog",
      breed: "Beagle",
      age: "1 year",
      image: "/api/placeholder/400/300"
    },
    {
      id: 4,
      name: "Milo",
      species: "Cat",
      breed: "Maine Coon",
      age: "4 years",
      image: "/api/placeholder/400/300"
    },
    {
      id: 5,
      name: "Charlie",
      species: "Dog",
      breed: "French Bulldog",
      age: "2 years",
      image: "/api/placeholder/400/300"
    },
    {
      id: 6,
      name: "Lucy",
      species: "Cat",
      breed: "Siamese",
      age: "1 year",
      image: "/api/placeholder/400/300"
    }
  ]);

  // State for active filter
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter pets based on species
  const filteredPets = activeFilter === 'All' 
    ? pets 
    : pets.filter(pet => pet.species === activeFilter);
    
  // Handle view details button click
  const handleViewDetails = (petId) => {
    navigate(`/pet/${petId}`);
  };

  return (
    <div className="pet-list-container">
      <div className="pet-list-header">
        <h1>Find Your Perfect Companion</h1>
        <p className="subtitle">Browse our available pets looking for a loving home</p>
        
        <div className="filter-tabs">
          {['All', 'Dog', 'Cat'].map(filter => (
            <button 
              key={filter}
              className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="pets-grid">
        {filteredPets.map(pet => (
          <div className="pet-card" key={pet.id}>
            <div className="pet-image-container">
              <img src={pet.image} alt={pet.name} className="pet-image" />
            </div>
            <div className="pet-info">
              <h2>{pet.name}</h2>
              <p className="pet-breed">{pet.breed}</p>
              <p className="pet-age">{pet.age}</p>
              <button 
                className="view-details-btn"
                onClick={() => handleViewDetails(pet.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPets.length === 0 && (
        <div className="no-pets-message">
          <p>No pets found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PetList;