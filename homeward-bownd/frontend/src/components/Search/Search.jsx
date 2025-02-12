import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBreeds, searchDogs, fetchDogDetails, findMatch } from '../../services/api';
import DogCard from './DogCard/DogCard';
import BreedFilter from './Filters/BreedFilter';
import SortControls from './Filters/SortControls';
import './Search.css';

const Search = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [sortOrder, setSortOrder] = useState({ field: 'breed', direction: 'asc' });
  const [favorites, setFavorites] = useState(new Set());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadBreeds();
  }, []);

  const loadBreeds = async () => {
    try {
      const breedList = await fetchBreeds();
      setBreeds(breedList);
    } catch (error) {
      console.error('Failed to load breeds:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {
        breeds: selectedBreeds.length ? selectedBreeds.join(',') : undefined,
        sort: `${sortOrder.field}:${sortOrder.direction}`,
        page
      };
      
      const response = await searchDogs(params);
      setDogs(response.resultIds.map(id => ({
        id,
        img: '',
        name: '',
        age: null,
        zip_code: '',
        breed: ''
      })));
      setTotalResults(response.total);
      
      const batches = [];
      for (let i = 0; i < response.resultIds.length; i += 100) {
        batches.push(fetchDogDetails(
          response.resultIds.slice(i, i + 100)
        ));
      }
      
      const detailedDogs = await Promise.all(batches);
      setDogs(detailedDogs.flat());
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBreeds, sortOrder, page]);

  const toggleFavorite = (dogId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(dogId)) {
        newFavorites.delete(dogId);
      } else {
        newFavorites.add(dogId);
      }
      return newFavorites;
    });
  };

  const handleFindMatch = async () => {
    if (favorites.size === 0) {
      alert('Please select some favorite dogs first!');
      return;
    }

    try {
      const matchId = await findMatch(Array.from(favorites));
      navigate(`/dogs/${matchId}`);
    } catch (error) {
      console.error('Failed to find match:', error);
    }
  };

  return (
    <div className="search-container">
      <div className="filters-section">
        <BreedFilter 
          breeds={breeds} 
          selectedBreeds={selectedBreeds} 
          onSelect={setSelectedBreeds} 
        />
        <SortControls 
          sortOrder={sortOrder} 
          onChange={setSortOrder} 
        />
      </div>

      <div className="results-section">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="dogs-grid">
              {dogs.map(dog => (
                <DogCard 
                  key={dog.id} 
                  dog={dog} 
                  isFavorite={favorites.has(dog.id)}
                  onToggleFavorite={() => toggleFavorite(dog.id)}
                />
              ))}
            </div>
            
            <div className="pagination-controls">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                Previous
              </button>
              
              <span>Page {page} of {Math.ceil(totalResults / 25)}</span>
              
              <button 
                onClick={() => setPage(p => p + 1)}
                disabled={page >= Math.ceil(totalResults / 25)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <button 
        className="find-match-button"
        onClick={handleFindMatch}
        disabled={favorites.size === 0}
      >
        Find My Match!
      </button>
    </div>
  );
};

export default Search;