import React from 'react';
import FacilitiesHeader from '../components/facilities/FacilitiesHeader';
import FacilitiesOverview from '../components/facilities/FacilitiesOverview';
import VirtualTourSection from '../components/facilities/VirtualTourSection';
import TestimonialsSection from '../components/facilities/TestimonialsSection';
import CallToAction from '../components/facilities/CallToAction';
import { testimonialsData } from '../data/facilitiesData';

const Facilities = () => {
  return (
    <div className="facilities-page">
      {/* Header Section with title and description */}
      <FacilitiesHeader />
      
      {/* Main Facilities Section with tabs and facility grid */}
      <FacilitiesOverview />
      
      {/* Virtual Tour Section */}
      <VirtualTourSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonialsData} />
      
      {/* Call to Action Section */}
      <CallToAction />
    </div>
  );
};

export default Facilities;