import React from 'react';

const SortControls = ({ sortOrder, onChange }) => {
  const sortOptions = [
    { value: 'breed:asc', label: 'Breed (A-Z)' },
    { value: 'breed:desc', label: 'Breed (Z-A)' },
    { value: 'name:asc', label: 'Name (A-Z)' },
    { value: 'name:desc', label: 'Name (Z-A)' },
    { value: 'age:asc', label: 'Age (Youngest First)' },
    { value: 'age:desc', label: 'Age (Oldest First)' }
  ];

  return (
    <div className="sort-controls">
      <select 
        value={`${sortOrder.field}:${sortOrder.direction}`}
        onChange={(e) => {
          const [field, direction] = e.target.value.split(':');
          onChange({ field, direction });
        }}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortControls;