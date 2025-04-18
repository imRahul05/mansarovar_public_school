import React, { useState } from 'react';
import FacilityTabs from './FacilityTabs';
import FacilityGrid from './FacilityGrid';
import { facilities, tabs } from '../../data/facilitiesData';

const FacilitiesOverview = () => {
  const [activeTab, setActiveTab] = useState('academic');

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">State-of-the-Art Facilities</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Mansarovar Public School, we provide excellent facilities to support academic, sports, and cultural activities. 
            Our infrastructure is designed to create a safe, stimulating, and nurturing environment for students.
          </p>
        </div>

        {/* Facilities Tabs */}
        <FacilityTabs 
          tabs={tabs} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Facilities Grid */}
        <FacilityGrid facilities={facilities[activeTab]} />
      </div>
    </section>
  );
};

export default FacilitiesOverview;