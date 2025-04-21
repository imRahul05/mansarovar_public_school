import { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/images/logo.jpeg';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, loading, logout } = useAuth();
  const location = useLocation();
  
  // Close sidebar on route change (for mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Get navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { name: 'Dashboard', path: '', icon: 'home' },
      { name: 'Profile', path: 'profile', icon: 'user' },
      { name: 'Notices', path: 'notices', icon: 'bell' },
    ];

    switch (currentUser.role) {
      case 'student':
        return [
          ...commonLinks,
          { name: 'Attendance', path: 'attendance', icon: 'calendar' },
          { name: 'Assignments', path: 'assignments', icon: 'document' },
          { name: 'Report Cards', path: 'report-cards', icon: 'chart' },
          { name: 'Timetable', path: 'timetable', icon: 'clock' },
          { name: 'Study Materials', path: 'study-materials', icon: 'book' },
          { name: 'Fees', path: 'fees', icon: 'cash' },
        ];
      case 'teacher':
        return [
          ...commonLinks,
          { name: 'My Classes', path: 'classes', icon: 'users' },
          { name: 'Upload Materials', path: 'materials', icon: 'upload' },
          { name: 'Attendance', path: 'manage-attendance', icon: 'clipboard-check' },
          { name: 'Assignments', path: 'manage-assignments', icon: 'document' },
          { name: 'Grades', path: 'grades', icon: 'star' },
        ];
      case 'admin':
        return [
          ...commonLinks,
          { name: 'Students', path: 'students', icon: 'academic-cap' },
          { name: 'Teachers', path: 'teachers', icon: 'user-group' },
          { name: 'Classes', path: 'classes', icon: 'view-grid' },
          { name: 'Manage Notices', path: 'manage-notices', icon: 'speakerphone' },
          { name: 'Events', path: 'events', icon: 'calendar' },
          { name: 'Gallery', path: 'gallery', icon: 'photograph' },
          { name: 'Admissions', path: 'admissions', icon: 'clipboard-list' },
          { name: 'Settings', path: 'settings', icon: 'cog' },
        ];
      default:
        return commonLinks;
    }
  };
  
  // Get base path for current user type
  const getBasePath = () => {
    return `/portal/${currentUser.role}`;
  };

  // Convert icon name to JSX
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'bell':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`bg-blue-800 text-white w-64 fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 z-30`}
      >
        {/* School Logo & Name */}
        <div className="p-4 bg-blue-900 flex items-center">
          <img src={logo} alt="School Logo" className="w-10 h-10 mr-3" />
          <div>
            <h2 className="text-lg font-bold">Mansarovar</h2>
            <p className="text-xs text-blue-200">Public School Portal</p>
          </div>
        </div>
        
        {/* User Info */}
        <div className="p-4 border-b border-blue-700 flex items-center space-x-3">
          <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            {currentUser.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="font-medium">{currentUser.name || 'User'}</p>
            <p className="text-xs text-blue-300 capitalize">{currentUser.role}</p>
          </div>
        </div>
        
        {/* Nav Links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {getNavLinks().map((link) => (
              <li key={link.path}>
                <Link
                  to={`${getBasePath()}/${link.path}`}
                  className={`flex items-center space-x-3 p-2.5 rounded hover:bg-blue-700 transition-colors ${
                    location.pathname === `${getBasePath()}/${link.path}` ? 'bg-blue-700' : ''
                  }`}
                >
                  {getIcon(link.icon)}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-4 border-t border-blue-700">
              <button
                onClick={logout}
                className="flex w-full items-center space-x-3 p-2.5 rounded hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-20 relative">
          <div className="flex items-center justify-between p-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Page title - dynamic based on path */}
            <h1 className="text-xl font-bold text-gray-800 hidden md:block">
              {location.pathname === getBasePath() ? 'Dashboard' : 
               location.pathname.split('/').pop()?.split('-')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' ')
              }
            </h1>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="text-gray-600 hover:text-gray-800 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Help */}
              <button className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              {/* Return to Main Site */}
              <Link to="/" className="hidden md:block text-blue-600 hover:text-blue-800 text-sm font-medium">
                Return to Main Site
              </Link>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;