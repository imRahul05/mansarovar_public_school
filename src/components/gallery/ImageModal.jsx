import React from 'react';

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={onClose}>
      <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img 
            src={image.url} 
            alt={image.title} 
            className="w-full h-auto max-h-[70vh] object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/src/assets/images/no-image-available.jpg';
            }}
          />
          <button 
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{image.title}</h3>
          <p className="text-gray-600 mb-2">{image.description}</p>
          <p className="text-sm text-gray-500">
            {new Date(image.date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;