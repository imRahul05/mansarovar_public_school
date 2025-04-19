import React from 'react';
import AdmissionsHeader from '../components/admissions/AdmissionsHeader';
import AdmissionProcess from '../components/admissions/AdmissionProcess';
import EligibilityCriteria from '../components/admissions/EligibilityCriteria';
import RequiredDocuments from '../components/admissions/RequiredDocuments';
import FeeStructure from '../components/admissions/FeeStructure';
import Scholarships from '../components/admissions/Scholarships';
import ImportantDates from '../components/admissions/ImportantDates';
import FAQ from '../components/admissions/FAQ';
import AdmissionsCallToAction from '../components/admissions/AdmissionsCallToAction';

const Admissions = () => {
  return (
    <div className="min-h-screen">
      {/* Page Header with Breadcrumbs */}
      <AdmissionsHeader />

      {/* Admission Process Timeline */}
      <AdmissionProcess />

      {/* Eligibility Criteria */}
      <EligibilityCriteria />

      {/* Required Documents */}
      <RequiredDocuments />

      {/* Fee Structure */}
      <FeeStructure />

      {/* Scholarship Section */}
      <Scholarships />

      {/* Important Dates */}
      <ImportantDates />

      {/* FAQ Section */}
      <FAQ />

      {/* Call to Action */}
      <AdmissionsCallToAction />
    </div>
  );
};

export default Admissions;