import React from 'react';
import { Link } from 'react-router-dom';
import { academicsPreview } from '../../data/homeData';

const AcademicsPreview = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Academic Excellence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {academicsPreview.map((academic) => (
            <div key={academic.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ backgroundImage: `url(${academic.image})` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{academic.title}</h3>
                <p className="text-gray-600 mb-4">{academic.description}</p>
                <Link 
                  to={academic.link} 
                  className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicsPreview;