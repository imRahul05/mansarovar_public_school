import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-3 text-gray-700">{message}</p>
    </div>
  );
};

export default LoadingSpinner;