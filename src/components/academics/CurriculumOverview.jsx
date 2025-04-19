import React from 'react';

const CurriculumOverview = ({ title, description, image, imageAlt }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
            {Array.isArray(description) ? (
              description.map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-gray-600 mb-4">{description}</p>
            )}
          </div>
          <div className="md:w-1/2">
            <img 
              src={image} 
              alt={imageAlt} 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumOverview;