import React from 'react';
import AboutHeader from '../components/about/AboutHeader';
import SchoolOverview from '../components/about/SchoolOverview';
import VisionMission from '../components/about/VisionMission';
import PrincipalMessage from '../components/about/PrincipalMessage';
import SchoolHistory from '../components/about/SchoolHistory';
import StaffDirectory from '../components/about/StaffDirectory';
import CoreValues from '../components/about/CoreValues';
import CodeOfConduct from '../components/about/CodeOfConduct';
import AboutCallToAction from '../components/about/AboutCallToAction';

const About = () => {
  return (
    <div className="min-h-screen">
      <AboutHeader />
      <SchoolOverview />
      <VisionMission />
      <PrincipalMessage />
      <SchoolHistory />
      <StaffDirectory />
      <CoreValues />
      <CodeOfConduct />
      <AboutCallToAction />
    </div>
  );
};

export default About;