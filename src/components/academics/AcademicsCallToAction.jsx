import React from 'react';
import { Link } from 'react-router-dom';

const AcademicsCallToAction = ({ title, description, buttons }) => {
  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((button, index) => (
            <Link 
              key={index}
              to={button.link} 
              className={`px-6 py-3 font-bold rounded-md transition ${
                button.primary 
                  ? "bg-yellow-500 text-blue-900 hover:bg-yellow-400" 
                  : "bg-white text-blue-800 hover:bg-gray-100"
              }`}
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicsCallToAction;