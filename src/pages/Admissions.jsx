import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Admissions = () => {
  const [activeTab, setActiveTab] = useState('academic');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is the ideal age for admission to Nursery?",
      answer: "Children applying for Nursery should be at least 3 years old by March 31, 2025."
    },
    {
      question: "Is there an entrance test for all classes?",
      answer: "Entrance assessments are conducted for Classes 2 and above. Nursery to Class 1 admissions involve an informal interaction."
    },
    {
      question: "Are there any transportation facilities available?",
      answer: "Yes, the school provides transportation facilities covering major areas of the city. Transport fees vary based on distance."
    },
    {
      question: "What scholarships are available for meritorious students?",
      answer: "The school offers merit scholarships ranging from 10% to 50% tuition waiver based on academic excellence and extracurricular achievements."
    },
    {
      question: "Can I pay the fees in installments?",
      answer: "Yes, the annual fee can be paid in quarterly installments. However, the admission fee must be paid in full at the time of admission."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header with Breadcrumbs */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Admissions</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Join Mansarovar Public School for academic excellence and holistic development.
          </p>
          <div className="flex justify-center mt-6">
            <nav className="text-sm breadcrumbs">
              <ul className="flex space-x-2">
                <li><Link to="/" className="hover:underline">Home</Link> /</li>
                <li className="text-yellow-300">Admissions</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Admission Process Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Admission Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-600 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-800 font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Application</h3>
              <p className="text-sm text-gray-600">Submit the online application form</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-600 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-800 font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Campus Visit</h3>
              <p className="text-sm text-gray-600">Schedule a campus visit or virtual tour</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-600 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-800 font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Assessment</h3>
              <p className="text-sm text-gray-600">Attend assessment for applicable classes</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-600 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-800 font-bold text-xl">4</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">Submit required documents</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-600 text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-800 font-bold text-xl">5</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Confirmation</h3>
              <p className="text-sm text-gray-600">Receive acceptance and fee details</p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Eligibility Criteria</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Kindergarten</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Nursery: 3+ years by March 31, 2025</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">KG: 4+ years by March 31, 2025</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Class 1: 5+ years and passed KG from a recognized institution</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Higher Classes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Classes 2-5: Successful completion of previous grade with minimum 50% marks</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Classes 6-8: Successful completion of previous grade with minimum 50% marks and passing an entrance test</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Classes 9-10: Minimum 60% marks in previous grade and passing an entrance test</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Required Documents</h2>
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">For All Students</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Birth Certificate (original + photocopy)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Passport size photographs (4 copies)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Aadhar Card (photocopy)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Address proof (utility bill, etc.)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">For Transfer Students</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Transfer Certificate (original)
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Previous year's report card
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Character Certificate
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Migration Certificate (if applicable)
                    </li>
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

      {/* Fee Structure */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Fee Structure</h2>
          
          {/* Fee Tabs */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveTab('academic')}
                className={`px-6 py-2 text-sm font-medium ${
                  activeTab === 'academic'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } rounded-l-lg border border-gray-200`}
              >
                Academic Fees
              </button>
              <button
                onClick={() => setActiveTab('transport')}
                className={`px-6 py-2 text-sm font-medium ${
                  activeTab === 'transport'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-200`}
              >
                Transport Fees
              </button>
              <button
                onClick={() => setActiveTab('hostel')}
                className={`px-6 py-2 text-sm font-medium ${
                  activeTab === 'hostel'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } rounded-r-lg border border-gray-200`}
              >
                Hostel Fees
              </button>
            </div>
          </div>
          
          {/* Fee Tables */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'academic' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Class</th>
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Annual Fee</th>
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Admission Fee</th>
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Quarterly Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Nursery &#8211; KG</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹25,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹5,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹6,250</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Class 1-5</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹35,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹7,500</td>
                      <td className="py-3 px-4 border border-gray-200">₹8,750</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Class 6-8</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹40,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹10,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹10,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Class 9-10</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹45,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹12,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹11,250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'transport' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Distance Range</th>
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Annual Fee</th>
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Quarterly Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Up to 5 km</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹12,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹3,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">5-10 km</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹15,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹3,750</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Above 10 km</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹18,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹4,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'hostel' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Accommodation Type</th>
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Annual Fee</th>
                      <th className="py-3 px-4 font-bold text-gray-800 border border-gray-200">Security Deposit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Shared Room (4 students)</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹70,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹10,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Shared Room (2 students)</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹90,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹15,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">Single Room</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">₹120,000</td>
                      <td className="py-3 px-4 border border-gray-200">₹20,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 text-sm text-gray-600">
              <p className="mb-2">* All fees are subject to annual revision</p>
              <p className="mb-2">* Additional charges apply for optional activities and excursions</p>
              <p>* One-time registration fee of ₹1,000 is applicable for all new admissions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Scholarships & Financial Aid</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Merit Scholarships</h3>
                <ul className="space-y-4">
                  <li className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800">Academic Excellence</h4>
                    <p className="text-gray-700 text-sm mt-1">Up to 50% tuition fee waiver for students scoring above 95% in previous academic year</p>
                  </li>
                  <li className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800">Sports Achievement</h4>
                    <p className="text-gray-700 text-sm mt-1">Up to 40% fee waiver for students with national/state level sports achievements</p>
                  </li>
                  <li className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800">Performing Arts</h4>
                    <p className="text-gray-700 text-sm mt-1">Up to 30% fee waiver for exceptional talent in music, dance or other performing arts</p>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Financial Aid Programs</h3>
                <ul className="space-y-4">
                  <li className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800">Sibling Discount</h4>
                    <p className="text-gray-700 text-sm mt-1">10% tuition fee discount for the second child and 15% for third child</p>
                  </li>
                  <li className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800">Staff Ward Concession</h4>
                    <p className="text-gray-700 text-sm mt-1">Special fee concessions for children of school staff members</p>
                  </li>
                  <li className="bg-blue-50 p-4 rounded-md">
                    <h4 className="font-medium text-blue-800">Need-Based Financial Aid</h4>
                    <p className="text-gray-700 text-sm mt-1">Limited financial assistance available based on family income (requires separate application)</p>
                  </li>
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

      {/* Important Dates */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Important Dates</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute h-full w-1 bg-blue-200 left-7 top-0"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                <div className="relative flex items-center">
                  <div className="z-10 flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full text-white font-bold text-sm">APR</div>
                  <div className="flex-grow ml-6 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800">April 1, 2025</h3>
                    <p className="text-gray-600">Application Process Opens</p>
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <div className="z-10 flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full text-white font-bold text-sm">MAY</div>
                  <div className="flex-grow ml-6 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800">May 31, 2025</h3>
                    <p className="text-gray-600">Application Deadline</p>
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <div className="z-10 flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full text-white font-bold text-sm">JUN</div>
                  <div className="flex-grow ml-6 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800">June 5-10, 2025</h3>
                    <p className="text-gray-600">Assessment Dates</p>
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <div className="z-10 flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full text-white font-bold text-sm">JUN</div>
                  <div className="flex-grow ml-6 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800">June 15, 2025</h3>
                    <p className="text-gray-600">Admission Confirmation</p>
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <div className="z-10 flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full text-white font-bold text-sm">JUL</div>
                  <div className="flex-grow ml-6 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800">July 1, 2025</h3>
                    <p className="text-gray-600">Academic Session Begins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {faqData.map((faq, index) => (
              <div key={index} className="py-5">
                <button 
                  className="flex w-full justify-between items-start text-left" 
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="ml-6 flex-shrink-0">
                    <svg 
                      className={`w-6 h-6 ${expandedFaq === index ? 'transform rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="mt-2 pr-12">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Begin Your Journey with Us</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            Start the admission process by filling out our online application form or scheduling a campus visit to learn more about our programs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-yellow-500 text-blue-900 font-bold rounded-md hover:bg-yellow-400 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Apply Online
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-blue-800 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;