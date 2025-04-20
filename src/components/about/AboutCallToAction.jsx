import React from 'react';
import { Link } from 'react-router-dom';

const AboutCallToAction = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Community</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Become a part of Mansarovar Public School and give your child the gift of quality education in a nurturing environment.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/contact" 
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
          >
            Contact Us
          </Link>
          <Link 
            to="/admissions" 
            className="px-6 py-3 bg-yellow-500 text-blue-900 font-bold rounded-md hover:bg-yellow-400 transition"
          >
            Apply for Admission
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCallToAction;