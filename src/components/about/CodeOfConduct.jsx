import React from 'react';
import codeOfConductData from '../../data/about/codeOfConductData.json';

const CodeOfConduct = () => {
  const { title, description, sections } = codeOfConductData;
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          {description}
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {section.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex}>{rule}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeOfConduct;