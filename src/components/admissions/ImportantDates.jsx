import React from 'react';
import { importantDates } from '../../data/admissionsData';

const ImportantDates = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Important Dates</h2>
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute h-full w-1 bg-blue-200 left-7 top-0"></div>
            
            {/* Timeline Items */}
            <div className="space-y-8">
              {importantDates.map((date, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="z-10 flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full text-white font-bold text-sm">
                    {date.month}
                  </div>
                  <div className="flex-grow ml-6 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800">{date.date}</h3>
                    <p className="text-gray-600">{date.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;