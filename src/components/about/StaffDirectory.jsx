import React, { useState, useEffect } from 'react';
import axios from 'axios';
import staffDirectoryData from '../../data/about/staffDirectoryData.json';

const StaffDirectory = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const { title, description, loadingMessage } = staffDirectoryData;

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/staff');
        setStaff(response.data.staff);
      } catch (error) {
        console.error('Error fetching staff:', error);
        // Use staff data from the JSON file as fallback
        setStaff(staffDirectoryData.staff);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          {description}
        </p>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 text-gray-700">{loadingMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff?.map((member) => (
              <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.position}</p>
                  <div className="text-sm text-gray-500 mb-3">
                    <p><span className="font-medium">Qualification:</span> {member.qualification}</p>
                    <p><span className="font-medium">Experience:</span> {member.experience}</p>
                  </div>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StaffDirectory;