import React from 'react';
import { Link } from 'react-router-dom';
import principal from '../../assets/images/principal.png';
import school from '../../assets/images/school.png';
const HeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white">
      {/* Background Overlay Image */}
      <div 
        className="absolute inset-0 opacity-60 bg-cover bg-center"
        style={{ backgroundImage: `url(${school})` }}
      ></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
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
          <div className="md:w-1/3 flex justify-center">
            <img 
              src={principal} 
              alt="School Principal" 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-white transform transition-all duration-500 hover:scale-105 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;