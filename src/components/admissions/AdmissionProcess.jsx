import React from 'react';
import { admissionProcess } from '../../data/admissionsData';

const AdmissionProcess = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Admission Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {admissionProcess.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-600 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-800 font-bold text-xl">{step.step}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcess;