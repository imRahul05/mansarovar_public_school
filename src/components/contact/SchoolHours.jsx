import React, { useEffect, useState } from 'react';
import schoolData from '../../data/schoolHoursData.json';

const SchoolHours = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating fetch if needed; using static import for now
    setData(schoolData);
  }, []);

  if (!data) return <div className="text-center py-10">Loading...</div>;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {data.title}
        </h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {data.sections.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between">
                      <span className="font-medium">{item.label}:</span>
                      <span>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolHours;
