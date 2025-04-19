import React from 'react';

const ContactFAQ = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">How can I schedule a campus tour?</h3>
              <p className="text-gray-600">
                You can schedule a campus tour by filling out the contact form above or by calling our admissions office at +91 1234567891. Campus tours are available on weekdays from 10:00 AM to 2:00 PM.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">How do I check my child's academic progress?</h3>
              <p className="text-gray-600">
                Parents can monitor their child's academic progress through our parent portal, regular report cards, and scheduled parent-teacher meetings. For immediate concerns, you can request an appointment with the respective class teacher.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">What is the school's policy for sick children?</h3>
              <p className="text-gray-600">
                Children who are unwell should stay home until they have fully recovered. Please inform the school office about your child's absence. A medical certificate may be required if the absence extends beyond three days.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-2">How can I get involved as a parent?</h3>
              <p className="text-gray-600">
                Parents can get involved through our Parent-Teacher Association (PTA), volunteering for school events, participating in parent workshops, and attending school functions. We value parent participation in our school community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;