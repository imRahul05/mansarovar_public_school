import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {eventData,eventCategories} from '../data/eventsData'

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid'); // grid or calendar

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Sample data in case API fails
        setEvents(eventData);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = eventCategories;

  // Safe filtering with null checks
  const filteredEvents = Array.isArray(events) 
    ? (filter === 'all' 
        ? [...events].sort((a, b) => new Date(a.date) - new Date(b.date))
        : [...events]
            .filter(event => event.category === filter)
            .sort((a, b) => new Date(a.date) - new Date(b.date)))
    : [];

  const isUpcoming = (date) => {
    return new Date(date) >= new Date();
  };

  // Group events by month for calendar view
  const eventsByMonth = Array.isArray(filteredEvents) && filteredEvents.length > 0 
    ? filteredEvents.reduce((acc, event) => {
        const date = new Date(event.date);
        const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        
        acc[monthYear].push(event);
        return acc;
      }, {})
    : {};

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">School Events</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Stay updated with all the events and activities happening at Mansarovar Public School.
          </p>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-gray-100 py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap gap-2 mb-3 md:mb-0">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    filter === category.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  } transition`}
                  onClick={() => setFilter(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="flex bg-white rounded-lg overflow-hidden">
              <button
                className={`px-4 py-2 ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setView('grid')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                className={`px-4 py-2 ${view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setView('calendar')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Display */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-gray-700">Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
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
            ) : (
              <div className="space-y-8">
                {Object.entries(eventsByMonth).map(([monthYear, monthEvents]) => (
                  <div key={monthYear} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-blue-600 text-white py-3 px-6">
                      <h3 className="text-xl font-bold">{monthYear}</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {monthEvents.map(event => (
                          <div key={event._id} className="flex flex-col md:flex-row border-b pb-4 last:border-b-0 last:pb-0">
                            <div className="md:w-1/5 font-medium mb-2 md:mb-0">
                              <span className="block text-gray-900">
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  day: 'numeric',
                                  weekday: 'short'
                                })}
                              </span>
                              <span className="text-sm text-gray-600">{event.time}</span>
                            </div>
                            <div className="md:w-3/5">
                              <h4 className="text-lg font-bold text-gray-800 mb-1">
                                {event.title}
                                {event.featured && (
                                  <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                    Featured
                                  </span>
                                )}
                              </h4>
                              <p className="text-gray-600 mb-2">{event.shortDescription || event.description.substring(0, 100) + '...'}</p>
                              <div className="flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                              </div>
                            </div>
                            <div className="md:w-1/5 flex items-center justify-start md:justify-end pt-2 md:pt-0">
                              <Link 
                                to={`/events/${event._id}`}
                                className="text-blue-600 font-medium hover:text-blue-800"
                              >
                                Details
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-lg text-gray-600">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* School Calendar Download */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">School Calendar 2025-26</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Download the complete school calendar with all academic events, holidays, and activities for the entire academic year.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition flex items-center mx-auto">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Calendar (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Featured Events */}
      {filteredEvents.filter(e => e.featured && isUpcoming(e.date)).length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Upcoming Events</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {filteredEvents
                .filter(e => e.featured && isUpcoming(e.date))
                .slice(0, 1)
                .map(event => (
                  <div key={event._id} className="flex flex-col md:flex-row">
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
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Organize an Event?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Are you a student or a parent who wants to organize an event at our school? Submit your proposal and our team will get back to you.
          </p>
          <Link 
            to="/contact" 
            className="px-6 py-3 bg-yellow-500 text-blue-900 font-bold rounded-md hover:bg-yellow-400 transition"
          >
            Submit Event Proposal
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Events;