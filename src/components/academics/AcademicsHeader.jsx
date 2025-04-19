import React from 'react';

const AcademicsHeader = ({ title, description }) => {
  return (
    <div className="bg-blue-800 py-16 text-white text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AcademicsHeader;