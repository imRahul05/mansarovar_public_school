import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Award, 
  LogOut, 
  GraduationCap,
  User
} from 'lucide-react';

const StudentSidebar = () => {
  const location = useLocation();
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/portal/student/home',
      icon: Home,
      current: location.pathname === '/portal/student' || location.pathname.includes('/home')
    },
    {
      name: 'Assignments',
      href: '/portal/student/assignments',
      icon: BookOpen,
      current: location.pathname.includes('/assignments')
    },
    {
      name: 'Schedule',
      href: '/portal/student/schedule',
      icon: Calendar,
      current: location.pathname.includes('/schedule')
    },
    {
      name: 'Grades',
      href: '/portal/student/grades',
      icon: Award,
      current: location.pathname.includes('/grades')
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl">
      {/* Logo */}
      <div className="flex items-center space-x-2 px-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <GraduationCap className="h-8 w-8 text-white" />
        </div>
        <div>
          <span className="text-xl font-bold">MNS Student</span>
          <p className="text-xs text-blue-200">Student Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 px-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                item.current
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              } group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User info and logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-blue-950 bg-opacity-50">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-blue-800 rounded-lg">
          <div className="bg-blue-600 rounded-full p-2">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{currentUser?.name || 'Student'}</p>
            <p className="text-xs text-blue-200">Class 10-A</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-blue-100 hover:text-white hover:bg-blue-700 w-full p-2 rounded-lg transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;
