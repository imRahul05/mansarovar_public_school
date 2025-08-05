import React from 'react';

const ButtonLoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-600"></div>
    </div>
  );
};

export default ButtonLoadingSpinner;
