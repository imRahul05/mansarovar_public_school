import React from 'react';
import { Link } from 'react-router-dom';

const EventGrid = ({ events }) => {
  const isUpcoming = (date) => {
    return new Date(date) >= new Date();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <div 
          key={event._id}
          className={`bg-white rounded-lg shadow-md overflow-hidden ${
            isUpcoming(event.date) ? '' : 'opacity-70'
          }`}
        >
          <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
            {!isUpcoming(event.date) && (
              <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium transform rotate-12">
                  Event Completed
                </span>
              </div>
            )}
            {event.featured && (
              <div className="absolute top-0 right-0 mt-3 mr-3">
                <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Featured
                </span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 mb-3 ml-3">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full capitalize">
                {event.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-3">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{event.shortDescription || event.description.substring(0, 100) + '...'}</p>
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-500">{event.time}</span>
            </div>
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-500">{event.location}</span>
            </div>
            {event.registerBy && isUpcoming(event.date) && (
              <div className="mt-1 mb-4">
                <p className="text-sm text-gray-500">
                  Registration closes on {new Date(event.registerBy).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
            )}
            <Link 
              to={`/events/${event._id}`}
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
            >
              Event Details
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventGrid;