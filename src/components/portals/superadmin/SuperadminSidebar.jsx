import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Shield,
  UserCheck,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SuperadminSidebar = () => {
  const location = useLocation();
  const { logout, currentUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error('Failed to logout',error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/portal/superadmin',
      icon: Home,
      current: location.pathname === '/portal/superadmin'
    },
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
    <div className={`bg-gradient-to-b from-blue-900 to-blue-800 text-white ${
      isCollapsed ? 'w-16' : 'w-64'
    } space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition-all duration-300 ease-in-out shadow-xl`}>
      
      {/* Toggle Button */}
      <div className="absolute -right-3 top-8 z-10">
        <button
          onClick={toggleSidebar}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1.5 shadow-lg transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Logo */}
      <div className={`flex items-center space-x-2 px-4 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="bg-blue-600 p-2 rounded-lg">
          <Shield className="h-8 w-8 text-white" />
        </div>
        {!isCollapsed && (
          <div>
            <span className="text-xl font-bold">MNS Super</span>
            <p className="text-xs text-blue-200">Super Admin Portal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`space-y-2 ${isCollapsed ? 'px-1' : 'px-3'}`}>
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
              } group flex items-center ${
                isCollapsed ? 'px-2 py-3 justify-center' : 'px-3 py-3'
              } text-sm font-medium rounded-lg transition-all duration-200 ease-in-out relative`}
              title={isCollapsed ? item.name : ''}
            >
              <Icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && item.name}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User info and logout */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-blue-950 bg-opacity-50 ${
        isCollapsed ? 'px-2' : 'px-4'
      }`}>
        {!isCollapsed ? (
          <>
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
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-center p-2 bg-blue-800 rounded-lg">
              <div className="bg-blue-600 rounded-full p-2">
                <UserCheck className="h-5 w-5" />
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center text-blue-100 hover:text-white hover:bg-blue-700 w-full p-2 rounded-lg transition-all duration-200 relative group"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              
              {/* Tooltip for logout button */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                Logout
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperadminSidebar;



// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../../../contexts/AuthContext';
// import toast from 'react-hot-toast';
// import { 
//   Users, 
//   BarChart3, 
//   Settings, 
//   LogOut, 
//   Shield,
//   UserCheck,
//   Home,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// const SuperadminSidebar = () => {
//   const location = useLocation();
//   const { logout, currentUser } = useAuth();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       toast.error('Failed to logout');
//     }
//   };

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const navigation = [
//     {
//       name: 'Dashboard',
//       href: '/portal/superadmin',
//       icon: Home,
//       current: location.pathname === '/portal/superadmin'
//     },
//     {
//       name: 'User Management',
//       href: '/portal/superadmin/users',
//       icon: Users,
//       current: location.pathname.includes('/users')
//     },
//     {
//       name: 'Analytics',
//       href: '/portal/superadmin/analytics',
//       icon: BarChart3,
//       current: location.pathname === '/portal/superadmin/analytics'
//     },
//     {
//       name: 'Settings',
//       href: '/portal/superadmin/settings',
//       icon: Settings,
//       current: location.pathname === '/portal/superadmin/settings'
//     }
//   ];

//   return (
//     <div className={`bg-gradient-to-b from-blue-900 to-blue-800 text-white ${
//       isCollapsed ? 'w-16' : 'w-64'
//     } space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition-all duration-500 ease-in-out shadow-xl overflow-hidden`}>
      
//       {/* Toggle Button */}
//       <div className="absolute -right-3 top-8 ">
//         <button
//           onClick={toggleSidebar}
//           className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110"
//         >
//           <div className={`transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}>
//             <ChevronRight className="h-4 w-4" />
//           </div>
//         </button>
//       </div>

//       {/* Logo */}
//       <div className={`flex items-center px-4 transition-all duration-500 ${isCollapsed ? 'justify-center' : 'space-x-2'}`}>
//         <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0 transition-all duration-300">
//           <Shield className="h-8 w-8 text-white" />
//         </div>
//         <div className={`overflow-hidden transition-all duration-500 ${
//           isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
//         }`}>
//           <div className="whitespace-nowrap">
//             <span className="text-xl font-bold">MNS Super</span>
//             <p className="text-xs text-blue-200">Super Admin Portal</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className={`space-y-2 transition-all duration-300 ${isCollapsed ? 'px-1' : 'px-3'}`}>
//         {navigation.map((item) => {
//           const Icon = item.icon;
//           return (
//             <Link
//               key={item.name}
//               to={item.href}
//               className={`${
//                 item.current
//                   ? 'bg-blue-600 text-white shadow-lg'
//                   : 'text-blue-100 hover:bg-blue-700 hover:text-white'
//               } group flex items-center ${
//                 isCollapsed ? 'px-2 py-3 justify-center' : 'px-3 py-3'
//               } text-sm font-medium rounded-lg transition-all duration-300 ease-in-out relative hover:scale-105`}
//               title={isCollapsed ? item.name : ''}
//             >
//               <Icon className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${isCollapsed ? '' : 'mr-3'}`} />
              
//               <div className={`overflow-hidden transition-all duration-500 ${
//                 isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
//               }`}>
//                 <span className="whitespace-nowrap">{item.name}</span>
//               </div>
              
//               {/* Tooltip for collapsed state */}
//               {isCollapsed && (
//                 <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-lg">
//                   {item.name}
//                   <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* User info and logout */}
//       <div className={`absolute bottom-0 left-0 right-0 bg-blue-950 bg-opacity-50 transition-all duration-300 ${
//         isCollapsed ? 'p-2' : 'p-4'
//       }`}>
//         <div className={`transition-all duration-500 ${
//           isCollapsed ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-20 mb-4'
//         }`}>
//           <div className="flex items-center space-x-3 p-3 bg-blue-800 rounded-lg">
//             <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
//               <UserCheck className="h-5 w-5" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-white truncate">{currentUser?.name || 'Superadmin'}</p>
//               <p className="text-xs text-blue-200 truncate">System Administrator</p>
//             </div>
//           </div>
//         </div>

//         {!isCollapsed ? (
//           <button 
//             onClick={handleLogout}
//             className="flex items-center space-x-2 text-blue-100 hover:text-white hover:bg-blue-700 w-full p-2 rounded-lg transition-all duration-300 hover:scale-105"
//           >
//             <LogOut className="h-5 w-5" />
//             <span>Logout</span>
//           </button>
//         ) : (
//           <div className="space-y-2">
//             <div className="flex justify-center p-2 bg-blue-800 rounded-lg transition-all duration-300">
//               <div className="bg-blue-600 rounded-full p-2">
//                 <UserCheck className="h-5 w-5" />
//               </div>
//             </div>
//             <button 
//               onClick={handleLogout}
//               className="flex items-center justify-center text-blue-100 hover:text-white hover:bg-blue-700 w-full p-2 rounded-lg transition-all duration-300 relative group hover:scale-105"
//               title="Logout"
//             >
//               <LogOut className="h-5 w-5" />
              
//               {/* Tooltip for logout button */}
//               <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-lg">
//                 Logout
//                 <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
//               </div>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SuperadminSidebar;