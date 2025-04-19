import React from 'react';
import { Link } from 'react-router-dom';

const AcademicCalendar = ({ title, description, months, calendarDownloadUrl }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          {description}
        </p>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-3 px-4 font-bold text-gray-800">Month</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Academic Activities</th>
                  <th className="py-3 px-4 font-bold text-gray-800">Events & Celebrations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {months.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 font-medium text-gray-700">{item.month}</td>
                    <td className="py-3 px-4 text-gray-600">{item.academic}</td>
                    <td className="py-3 px-4 text-gray-600">{item.events}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              to={calendarDownloadUrl} 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Full Academic Calendar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicCalendar;