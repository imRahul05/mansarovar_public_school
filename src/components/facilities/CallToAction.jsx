import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="bg-primary-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience Our Facilities In Person
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            We invite you to visit our campus to see our exceptional facilities firsthand. 
            Schedule a tour today and discover the Mansarovar difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/admissions" 
              className="px-8 py-3 bg-white text-primary-600 font-bold rounded-md hover:bg-gray-100 transition duration-300"
            >
              Apply Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-primary-600 transition duration-300"
            >
              Schedule a Tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;