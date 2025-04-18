import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/notices');
        setNotices(response.data.notices);
      } catch (error) {
        console.error('Error fetching notices:', error);
        // Sample data in case API fails
        setNotices([
          {
            _id: '1',
            title: 'Admission Open for 2025-26',
            category: 'admission',
            description: 'Applications are now being accepted for the next academic year. Apply before May 31st for priority consideration. Forms are available online and at the school reception.',
            date: '2025-04-10',
            important: true,
            attachments: [
              { name: 'Admission Form', fileUrl: '/documents/admission-form.pdf' }
            ]
          },
          {
            _id: '2',
            title: 'Annual Sports Day',
            category: 'event',
            description: 'Annual Sports Day will be held on April 25th, 2025. All students must participate in at least one event. Parents are cordially invited to attend and encourage the participants.',
            date: '2025-04-12',
            important: false,
            attachments: []
          },
          {
            _id: '3',
            title: 'Parent-Teacher Meeting',
            category: 'academic',
            description: 'PTM for classes 6-10 scheduled for April 30th from 10 AM to 1 PM. Attendance is mandatory for at least one parent. Student report cards will be distributed during the meeting.',
            date: '2025-04-15',
            important: true,
            attachments: []
          },
          {
            _id: '4',
            title: 'Summer Vacation Notice',
            category: 'holiday',
            description: 'School will remain closed for summer vacation from May 20th to June 30th, 2025. Classes will resume on July 1st. Holiday homework will be assigned before the vacation begins.',
            date: '2025-04-16',
            important: false,
            attachments: []
          },
          {
            _id: '5',
            title: 'Fee Payment Reminder',
            category: 'fee',
            description: 'This is to remind all parents that the fees for the first quarter of the academic year 2025-26 are due by April 30th. Late payment will attract a fine as per school policy.',
            date: '2025-04-17',
            important: true,
            attachments: [
              { name: 'Fee Structure', fileUrl: '/documents/fee-structure.pdf' }
            ]
          },
          {
            _id: '6',
            title: 'New School Bus Routes',
            category: 'transport',
            description: 'New bus routes will be effective from May 1st, 2025. Please check the attached document for details or contact the transport in-charge for any clarification.',
            date: '2025-04-18',
            important: false,
            attachments: [
              { name: 'Bus Routes', fileUrl: '/documents/bus-routes.pdf' }
            ]
          },
          {
            _id: '7',
            title: 'Inter-School Debate Competition',
            category: 'competition',
            description: 'Students interested in participating in the Inter-School Debate Competition should register with their English teacher by April 22nd. The competition will be held on May 5th.',
            date: '2025-04-18',
            important: false,
            attachments: []
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const categories = [
    { id: 'all', name: 'All Notices' },
    { id: 'admission', name: 'Admission' },
    { id: 'academic', name: 'Academic' },
    { id: 'event', name: 'Events' },
    { id: 'holiday', name: 'Holidays' },
    { id: 'fee', name: 'Fees' },
    { id: 'transport', name: 'Transport' },
    { id: 'competition', name: 'Competitions' }
  ];

  const filteredNotices = filter === 'all' ? 
    notices : 
    notices.filter(notice => notice.category === filter);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-blue-800 py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Notice Board</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Stay updated with the latest announcements, events, and important information.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-100 py-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                } transition`}
                onClick={() => setFilter(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notices */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {filter === 'all' ? 'All Notices' : categories.find(c => c.id === filter)?.name + ' Notices'}
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-gray-700">Loading notices...</p>
            </div>
          ) : filteredNotices && filteredNotices.length > 0 ? (
            <div className="space-y-6">
              {filteredNotices.map(notice => (
                <div 
                  key={notice._id} 
                  className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                    notice.important ? 'border-red-500' : 'border-blue-500'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                          {notice.category}
                        </span>
                        {notice.important && (
                          <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Important
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(notice.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{notice.title}</h3>
                    <p className="text-gray-600 mb-4">{notice.description}</p>
                    
                    {Array.isArray(notice.attachments) && notice.attachments.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Attachments:</h4>
                        <div className="space-y-2">
                          {notice.attachments.map((attachment, index) => (
                            <a 
                              key={index} 
                              href={attachment.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer" 
                              className="flex items-center text-blue-600 hover:text-blue-800"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              {attachment.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-lg text-gray-600">No notices found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Stay Updated</h3>
            <p className="text-gray-600 text-center mb-6">
              Subscribe to receive notice board updates directly to your email.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition sm:whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticeBoard;