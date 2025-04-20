import React from 'react';
import schoolOverviewData from '../../data/about/schoolOverviewData.json';

const SchoolOverview = () => {
  const { title, image, imageAlt, paragraphs } = schoolOverviewData;
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={`text-gray-600 ${index !== paragraphs.length - 1 ? 'mb-4' : ''}`}>
                {paragraph}
              </p>
            ))}
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

export default SchoolOverview;