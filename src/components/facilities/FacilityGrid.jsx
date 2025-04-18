import React from 'react';

const FacilityGrid = ({ facilities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {facilities.map((facility) => (
        <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-56 overflow-hidden">
            <img
              src={facility.image}
              alt={facility.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{facility.title}</h3>
            <p className="text-gray-600">{facility.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacilityGrid;