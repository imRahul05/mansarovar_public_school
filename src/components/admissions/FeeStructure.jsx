import React, { useState } from 'react';
import { feesData } from '../../data/admissionsData';

const FeeStructure = () => {
  const [activeTab, setActiveTab] = useState('academic');
  
  return (
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
                  {feesData.academic.map((fee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">{fee.class}</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">{fee.annualFee}</td>
                      <td className="py-3 px-4 border border-gray-200">{fee.admissionFee}</td>
                      <td className="py-3 px-4 border border-gray-200">{fee.quarterlyPayment}</td>
                    </tr>
                  ))}
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
                  {feesData.transport.map((fee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">{fee.distance}</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">{fee.annualFee}</td>
                      <td className="py-3 px-4 border border-gray-200">{fee.quarterlyPayment}</td>
                    </tr>
                  ))}
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
                  {feesData.hostel.map((fee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200">{fee.type}</td>
                      <td className="py-3 px-4 border border-gray-200 font-medium">{fee.annualFee}</td>
                      <td className="py-3 px-4 border border-gray-200">{fee.securityDeposit}</td>
                    </tr>
                  ))}
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
  );
};

export default FeeStructure;