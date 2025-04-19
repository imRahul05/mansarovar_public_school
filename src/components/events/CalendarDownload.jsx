import React from 'react';

const CalendarDownload = ({ year = "2025-26" }) => {
  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">School Calendar {year}</h2>
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
  );
};

export default CalendarDownload;