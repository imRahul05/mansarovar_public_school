import React from 'react';
import { Link } from 'react-router-dom';

const AdmissionsHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-16 text-white text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Admissions</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Join Mansarovar Public School for academic excellence and holistic development.
        </p>
        <div className="flex justify-center mt-6">
          <nav className="text-sm breadcrumbs">
            <ul className="flex space-x-2">
              <li><Link to="/" className="hover:underline">Home</Link> /</li>
              <li className="text-yellow-300">Admissions</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsHeader;