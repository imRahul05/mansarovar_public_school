import React from 'react';

const CategoryFilter = ({ categories, activeFilter, onFilterChange }) => {
  return (
    <div className="bg-gray-100 py-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeFilter === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              } transition`}
              onClick={() => onFilterChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;