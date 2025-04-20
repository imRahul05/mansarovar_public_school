import React from 'react';
import visionMissionData from '../../data/about/visionMissionData.json';

const VisionMission = () => {
  const { title, vision, mission } = visionMissionData;
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={vision.icon.path} />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 ml-4">{vision.title}</h3>
            </div>
            <p className="text-gray-600">
              {vision.description}
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mission.icon.path} />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 ml-4">{mission.title}</h3>
            </div>
            <p className="text-gray-600">
              {mission.description}
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
              {mission.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;