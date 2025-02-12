import React from 'react';
import './DogCard.css';

const DogCard = ({ dog, isFavorite, onToggleFavorite }) => {
  return (
    <div className={`dog-card ${isFavorite ? 'favorite' : ''}`}>
      <img src={dog.img || '/placeholder-dog.jpg'} alt={dog.name} />
      
      <div className="dog-info">
        <h3>{dog.name}</h3>
        <p><strong>Breed:</strong> {dog.breed}</p>
        <p><strong>Age:</strong> {dog.age} years</p>
        <p><strong>Location:</strong> {dog.zip_code}</p>
        
        <button 
          onClick={onToggleFavorite}
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '❤️ Favorited' : '🐾 Favorite'}
        </button>
      </div>
    </div>
  );
};

export default DogCard;