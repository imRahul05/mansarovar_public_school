import React from 'react';
import coreValuesData from '../../data/about/coreValuesData.json';

const CoreValues = () => {
  const { title, description, values } = coreValuesData;
  
  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-blue-100">
          {description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-blue-700 p-6 rounded-lg">
              <div className="text-yellow-400 text-4xl mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon.path} />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{value.name}</h3>
              <p className="text-blue-100">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;