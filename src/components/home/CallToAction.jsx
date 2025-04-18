import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-yellow-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Ready to Join Our School?</h2>
        <p className="text-blue-900 text-lg mb-8 max-w-2xl mx-auto">
          Take the first step towards providing your child with an excellent education that nurtures both academic and personal growth.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/contact" 
            className="px-6 py-3 bg-white text-blue-800 font-bold rounded-md hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
          <Link 
            to="/admissions" 
            className="px-6 py-3 bg-blue-800 text-white font-bold rounded-md hover:bg-blue-900 transition"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;