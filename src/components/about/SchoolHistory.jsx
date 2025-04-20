import React from 'react';
import schoolHistoryData from '../../data/about/schoolHistoryData.json';

const SchoolHistory = () => {
  const { title, timeline } = schoolHistoryData;
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
        <div className="h-1 w-24 bg-blue-600 mx-auto mb-12"></div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
          
          {/* Timeline Items */}
          <div className="space-y-16">
            {timeline.map((item, index) => (
              <div key={index} className={`flex flex-col ${item.layout === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                <div className={`md:w-1/2 ${item.layout === 'right' ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <h3 className="text-2xl font-bold text-blue-800">{item.year}</h3>
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">{item.title}</h4>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
                <div className={`md:w-1/2 ${item.layout === 'right' ? 'md:pl-8' : 'md:pr-8 md:text-right'} mt-4 md:mt-0`}>
                  <img 
                    src={item.image} 
                    alt={item.imageAlt} 
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolHistory;