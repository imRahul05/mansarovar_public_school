import React from 'react';
import principalMessageData from '../../data/about/principalMessageData.json';

const PrincipalMessage = () => {
  const { title, principal } = principalMessageData;
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <img 
              src={principal.image} 
              alt="School Principal" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
            <div className="mb-6 text-gray-500">
              <p className="font-semibold">{principal.name}, {principal.qualification}</p>
              <p>{principal.position}</p>
            </div>
            <div className="space-y-4 text-gray-600">
              {principal.message.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;