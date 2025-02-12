import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesList = ({ favorites }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteDogs, setFavoriteDogs] = useState([]);

  useEffect(() => {
    const loadFavoriteDogs = async () => {
      if (favorites.size === 0) {
        setFavoriteDogs([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const dogIds = Array.from(favorites);
        const batches = [];
        for (let i = 0; i < dogIds.length; i += 100) {
          batches.push(dogIds.slice(i, i + 100));
        }

        const promises = batches.map(batch => 
          axios.post('https://frontend-take-home-service.fetch.com/dogs', {
            body: batch
          })
        );

        const responses = await Promise.all(promises);
        const allDogs = responses.flatMap(response => response.data);
        
        setFavoriteDogs(allDogs);
      } catch (err) {
        setError('Failed to load favorite dogs');
        console.error('Error fetching favorite dogs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteDogs();
  }, [favorites]);

  if (loading) {
    return <div>Loading favorite dogs...</div>;
  }

  if (error) {
    return <div>Error loading favorite dogs: {error}</div>;
  }

  if (favorites.size === 0) {
    return <div>No favorite dogs yet!</div>;
  }

  return (
    <div className="favorites-list">
      <h2>My Favorite Dogs</h2>
      <div className="favorites-grid">
        {favoriteDogs.map(dog => (
          <div key={dog.id} className="favorite-item">
            <img src={dog.img || '/placeholder-dog.jpg'} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p><strong>Breed:</strong> {dog.breed}</p>
            <p><strong>Age:</strong> {dog.age} years</p>
            <p><strong>Location:</strong> {dog.zip_code}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;