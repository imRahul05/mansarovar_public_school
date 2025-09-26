import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import {
  UserPlus,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Users,
  Activity,
  LineChart,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const { logout, currentUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error("Failed to logout",error.message||"error");
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation Items
  // const adminNavItems = [
  //   { title: 'Create User', href: '/portal/admin/create-user', icon: UserPlus },
  //   { title: 'Users', href: '/portal/admin/users', icon: Users },
  //   { title: 'Analytics', href: '/portal/admin/analytics', icon: BarChart3 },
  //   { title: 'Advanced Analytics', href: '/portal/admin/analytics-dashboard', icon: LineChart },
  //   { title: 'Settings', href: '/portal/admin/settings', icon: TrendingUp },
  // ];

  const adminNavItems = [
    {
      title: "Create User",
      href: "/portal/admin/create-user",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/portal/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/portal/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Advanced Analytics",
      href: "/portal/admin/analytics-dashboard",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/portal/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={`bg-gradient-to-b from-blue-900 to-blue-800 text-white ${
        isCollapsed ? "w-16" : "w-64"
      } space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition-all duration-300 ease-in-out shadow-xl`}
    >
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
      <div
        className={`flex items-center space-x-2 px-4 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <div className="bg-blue-600 p-2 rounded-lg">
          <ShieldCheck className="h-8 w-8 text-white" />
        </div>
        {!isCollapsed && (
          <div>
            <span className="text-xl font-bold">MNS Admin</span>
            <p className="text-xs text-blue-200">Administration Portal</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      {/* <nav className={`space-y-2 ${isCollapsed ? "px-1" : "px-3"}`}>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              to={item.href}
              className={`${
                item.current
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-blue-100 hover:bg-blue-700 hover:text-white"
              } group flex items-center ${
                isCollapsed ? "px-2 py-3 justify-center" : "px-3 py-3"
              } text-sm font-medium rounded-lg transition-all duration-200 ease-in-out relative`}
              title={isCollapsed ? item.name : ""}
            >
              <Icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
              {!isCollapsed && item.name}

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav> */}
<nav className={`space-y-2 ${isCollapsed ? "px-1" : "px-3"}`}>
  {adminNavItems.map((item) => {
    const isActive = location.pathname === item.href; // check active route
    return (
      <Link
        key={item.title}
        to={item.href}
        className={`${
          isActive
            ? "bg-blue-600 text-white shadow-lg"
            : "text-blue-100 hover:bg-blue-700 hover:text-white"
        } group flex items-center ${
          isCollapsed ? "px-2 py-3 justify-center" : "px-3 py-3"
        } text-sm font-medium rounded-lg transition-all duration-200 ease-in-out relative`}
        title={isCollapsed ? item.title : ""}
      >
        {item.icon}
        {!isCollapsed && item.title}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            {item.title}
          </div>
        )}
      </Link>
    );
  })}
</nav>

      {/* User info and logout */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-blue-950 bg-opacity-50 ${
          isCollapsed ? "px-2" : "px-4"
        }`}
      >
        {!isCollapsed ? (
          <>
            <div className="flex items-center space-x-3 mb-4 p-3 bg-blue-800 rounded-lg">
              <div className="bg-blue-600 rounded-full p-2">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {currentUser?.name || "Admin"}
                </p>
                <p className="text-xs text-blue-200">School Administrator</p>
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
                <GraduationCap className="h-5 w-5" />
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

export default AdminSidebar;
