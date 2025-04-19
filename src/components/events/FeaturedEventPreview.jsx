import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedEventPreview = ({ event }) => {
  if (!event) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Upcoming Events</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div 
              className="md:w-1/3 bg-cover bg-center h-64 md:h-auto" 
              style={{ backgroundImage: `url(${event.image})` }}
            ></div>
            <div className="md:w-2/3 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium mr-2">
                  Featured
                </span>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full capitalize">
                  {event.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
              <p className="text-gray-600 mb-6">{event.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{event.time}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{event.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link 
                  to={`/events/${event._id}`}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                >
                  Event Details
                </Link>
                {event.registerBy && (
                  <button 
                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition"
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventPreview;