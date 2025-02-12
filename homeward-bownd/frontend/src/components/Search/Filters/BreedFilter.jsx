import React, { useState } from 'react';

const BreedFilter = ({ breeds, selectedBreeds, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBreedChange = (breed) => {
    onSelect(prev => {
      const newSelected = prev.includes(breed)
        ? prev.filter(b => b !== breed)
        : [...prev, breed];
      return newSelected;
    });
  };

  return (
    <div className="breed-filter">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="filter-toggle"
      >
        Breeds {selectedBreeds.length ? `(${selectedBreeds.length})` : ''}
      </button>

      {isOpen && (
        <div className="breed-options">
          {breeds.map(breed => (
            <label key={breed}>
              <input
                type="checkbox"
                checked={selectedBreeds.includes(breed)}
                onChange={() => handleBreedChange(breed)}
              />
              {breed}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreedFilter;