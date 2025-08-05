import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Shield,
  UserCheck
} from 'lucide-react';

const SuperadminSidebar = () => {
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
      name: 'User Management',
      href: '/portal/superadmin/users',
      icon: Users,
      current: location.pathname.includes('/users')
    },
    {
      name: 'Analytics',
      href: '/portal/superadmin/analytics',
      icon: BarChart3,
      current: location.pathname === '/portal/superadmin/analytics'
    },
    {
      name: 'Settings',
      href: '/portal/superadmin/settings',
      icon: Settings,
      current: location.pathname === '/portal/superadmin/settings'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl">
      {/* Logo */}
      <div className="flex items-center space-x-2 px-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <div>
          <span className="text-xl font-bold">MNS Super</span>
          <p className="text-xs text-blue-200">Super Admin Portal</p>
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
            <UserCheck className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{currentUser?.name || 'Superadmin'}</p>
            <p className="text-xs text-blue-200">System Administrator</p>
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

export default SuperadminSidebar;
