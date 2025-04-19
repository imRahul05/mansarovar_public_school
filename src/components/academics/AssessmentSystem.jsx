import React from 'react';

const AssessmentSystem = ({ title, description, types, reportCards }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {types.map((type, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{type.title}</h3>
              <p className="text-gray-600 mb-4">
                {type.description}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {type.methods.map((method, idx) => (
                  <li key={idx}>{method}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-bold text-gray-800 mb-3">{reportCards.title}</h4>
          {reportCards.description.map((paragraph, index) => (
            <p key={index} className="text-gray-600 mb-2">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssessmentSystem;