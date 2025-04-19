import React from 'react';

const SubjectsOffered = ({ title, description, subjectCategories }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjectCategories.map((category, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${category.borderColor}-600`}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
              <ul className="text-gray-600 space-y-1">
                {category.subjects.map((subject, idx) => (
                  <li key={idx}>• {subject}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectsOffered;