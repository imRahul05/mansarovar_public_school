import React from 'react';

const AcademicAchievements = ({ title, description, categories }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              {category.highlights ? (
                <div className="space-y-2">
                  {category.highlights.map((highlight, idx) => (
                    <p key={idx} className="text-gray-700">
                      <span className="font-semibold">{highlight.year}:</span> {highlight.achievement}
                    </p>
                  ))}
                </div>
              ) : (
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {category.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicAchievements;