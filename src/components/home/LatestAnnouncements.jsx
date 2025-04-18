import React from 'react';
import { Link } from 'react-router-dom';

const LatestAnnouncements = ({ announcements, loading }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Latest Announcements</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 text-gray-700">Loading announcements...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <div 
                  key={announcement._id} 
                  className={`bg-white p-6 rounded-lg shadow ${announcement.important ? 'border-l-4 border-red-500' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      {new Date(announcement.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    {announcement.important && (
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                        Important
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{announcement.title}</h3>
                  <p className="text-gray-600">{announcement.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                to="/noticeboard" 
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
              >
                View All Announcements
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestAnnouncements;