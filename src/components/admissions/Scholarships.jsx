import React from 'react';
import { scholarshipData } from '../../data/admissionsData';

const Scholarships = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Scholarships & Financial Aid</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Merit Scholarships</h3>
              <ul className="space-y-4">
                {scholarshipData.meritScholarships.map((scholarship, index) => (
                  <li key={index} className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800">{scholarship.title}</h4>
                    <p className="text-gray-700 text-sm mt-1">{scholarship.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Financial Aid Programs</h3>
              <ul className="space-y-4">
                {scholarshipData.financialAidPrograms.map((program, index) => (
                  <li key={index} className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800">{program.title}</h4>
                    <p className="text-gray-700 text-sm mt-1">{program.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
            <p className="text-gray-800">
              For scholarship and financial aid applications, please contact the Admissions Office or download the application form from our website.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scholarships;