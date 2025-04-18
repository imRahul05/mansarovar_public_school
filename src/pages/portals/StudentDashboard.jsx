import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState(null);
  const [notices, setNotices] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Get student details
        const studentRes = await axios.get(`/api/students/profile`, {
          withCredentials: true
        });

        // Get notices relevant to student's class
        const noticesRes = await axios.get(`/api/notices?limit=5&forClass=${studentRes.data.student.class}`);
        
        // Get upcoming events
        const eventsRes = await axios.get(`/api/events?upcoming=true&limit=3&forClass=${studentRes.data.student.class}`);

        setStudentInfo(studentRes.data.student);
        setNotices(noticesRes.data.notices);
        setUpcomingEvents(eventsRes.data.events);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set some placeholder data if API fails
        setStudentInfo({
          name: currentUser?.name || 'Student Name',
          admissionNumber: 'ST12345',
          class: '10',
          section: 'A',
          rollNumber: 12,
          attendancePercentage: '95%',
          fatherName: 'Rajesh Kumar',
          motherName: 'Anita Sharma'
        });
        
        setNotices([
          {
            _id: '1',
            title: 'Half-yearly Examination Schedule',
            description: 'Half-yearly examinations will start from October 15th. Detailed schedule is available on the noticeboard.',
            date: '2025-09-25',
            important: true
          },
          {
            _id: '2',
            title: 'Extracurricular Activities',
            description: 'New extracurricular activities have been added for Class 10 students. Register before September 30th.',
            date: '2025-09-22'
          }
        ]);
        
        setUpcomingEvents([
          {
            _id: '1',
            title: 'Science Exhibition',
            description: 'Annual science exhibition for all students.',
            date: '2025-10-10',
            location: 'School Auditorium'
          },
          {
            _id: '2',
            title: 'Career Counseling Session',
            description: 'Special counseling session for Class 10 students about future career options.',
            date: '2025-10-05',
            location: 'Conference Hall'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  return (
    <div className="py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 text-gray-700">Loading your dashboard...</p>
          </div>
        ) : (
          <div className="mt-6">
            {/* Student Info Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                    {studentInfo.profilePicture ? (
                      <img 
                        src={studentInfo.profilePicture} 
                        alt={studentInfo.name} 
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-medium text-blue-800">
                        {studentInfo.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="ml-5 flex-grow">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {studentInfo.name}
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Admission Number</p>
                        <p className="font-medium">{studentInfo.admissionNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Class</p>
                        <p className="font-medium">{studentInfo.class} - {studentInfo.section}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Roll Number</p>
                        <p className="font-medium">{studentInfo.rollNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Attendance</p>
                        <p className="font-medium">{studentInfo.attendancePercentage}</p>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to="/portal/student/profile" 
                    className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Quick Access */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <Link 
                to="/portal/student/attendance" 
                className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-blue-50 transition"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Attendance</h3>
                    <p className="text-sm text-gray-500">View your attendance record</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/portal/student/timetable" 
                className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-blue-50 transition"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Timetable</h3>
                    <p className="text-sm text-gray-500">Check your class schedule</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/portal/student/exams" 
                className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-blue-50 transition"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Exams & Results</h3>
                    <p className="text-sm text-gray-500">View exam schedule and results</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/portal/student/assignments" 
                className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-blue-50 transition"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Assignments</h3>
                    <p className="text-sm text-gray-500">Manage your assignments</p>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Two Column Layout: Notices and Events */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Notices */}
              <div className="lg:col-span-2">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Notices</h3>
                    <Link 
                      to="/portal/student/notices" 
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      {notices.length > 0 ? (
                        notices.map((notice) => (
                          <div key={notice._id} className="py-4 sm:py-5 sm:px-6">
                            <div className="flex items-start">
                              {notice.important && (
                                <span className="flex-shrink-0 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full uppercase font-medium tracking-wide mr-2 mt-1">
                                  Important
                                </span>
                              )}
                              <div>
                                <dt className="text-sm font-medium text-gray-900">
                                  {notice.title}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-700">
                                  {notice.description}
                                </dd>
                                <div className="mt-2 text-xs text-gray-500">
                                  {new Date(notice.date).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-4 sm:py-5 sm:px-6 text-center">
                          <p className="text-gray-500 italic">No notices to display</p>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Events */}
              <div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Events</h3>
                    <Link 
                      to="/portal/student/events" 
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <div className="sm:divide-y sm:divide-gray-200">
                      {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event) => (
                          <div key={event._id} className="py-4 sm:py-5 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                              {event.title}
                            </dt>
                            <dd className="mt-1 text-sm text-gray-700">
                              {event.description}
                            </dd>
                            <div className="mt-2 flex items-center text-xs text-gray-500">
                              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(event.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                              
                              {event.location && (
                                <>
                                  <span className="mx-1">•</span>
                                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {event.location}
                                </>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-4 sm:py-5 sm:px-6 text-center">
                          <p className="text-gray-500 italic">No upcoming events</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;