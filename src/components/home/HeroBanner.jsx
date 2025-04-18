import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white">
      {/* Background Overlay Image */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/images/school-building.jpg')" }}
      ></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to Mansarovar Public School
          </h1>
          <p className="text-xl mb-8">
            Nurturing minds, shaping futures. Providing quality education since 1995.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/admissions" 
              className="px-6 py-3 bg-yellow-500 text-blue-900 font-bold rounded-md hover:bg-yellow-400 transition"
            >
              Apply Now
            </Link>
            <Link 
              to="/about" 
              className="px-6 py-3 bg-white text-blue-800 font-bold rounded-md hover:bg-gray-100 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;