import React from 'react';
import { requiredDocuments } from '../../data/admissionsData';

const RequiredDocuments = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Required Documents</h2>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">For All Students</h3>
                <ul className="space-y-3">
                  {requiredDocuments.allStudents.map((document, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {document}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">For Transfer Students</h3>
                <ul className="space-y-3">
                  {requiredDocuments.transferStudents.map((document, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {document}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <span className="font-bold">Note:</span> All original documents will be verified at the time of admission. Please ensure all photocopies are clear and legible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequiredDocuments;