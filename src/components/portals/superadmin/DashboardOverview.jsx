import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp,
  Calendar,
  Shield
} from 'lucide-react';
import { superAdminAPI } from '../../../services/api';
import toast from 'react-hot-toast';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    unverifiedUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    roleStats: {
      student: 0,
      teacher: 0,
      admin: 0,
      superadmin: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await superAdminAPI.getUsers();
        
        if (response.success) {
          const users = response.users;
          
          // Calculate statistics
          const totalUsers = users.length;
          const verifiedUsers = users.filter(u => u.isVerified).length;
          const unverifiedUsers = users.filter(u => !u.isVerified).length;
          const activeUsers = users.filter(u => u.isActive).length;
          const inactiveUsers = users.filter(u => !u.isActive).length;
          
          const roleStats = {
            student: users.filter(u => u.role === 'student').length,
            teacher: users.filter(u => u.role === 'teacher').length,
            admin: users.filter(u => u.role === 'admin').length,
            superadmin: users.filter(u => u.role === 'superadmin').length
          };

          setStats({
            totalUsers,
            verifiedUsers,
            unverifiedUsers,
            activeUsers,
            inactiveUsers,
            roleStats
          });

          // Get 5 most recent users
          const recent = users
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
          setRecentUsers(recent);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error(error.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getRoleBadgeColor = (role) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      teacher: 'bg-green-100 text-green-800',
      admin: 'bg-purple-100 text-purple-800',
      superadmin: 'bg-red-100 text-red-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Users', 
            value: stats.totalUsers, 
            icon: Users, 
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50'
          },
          { 
            label: 'Verified Users', 
            value: stats.verifiedUsers, 
            icon: UserCheck, 
            color: 'bg-green-500',
            bgColor: 'bg-green-50'
          },
          { 
            label: 'Unverified Users', 
            value: stats.unverifiedUsers, 
            icon: UserX, 
            color: 'bg-red-500',
            bgColor: 'bg-red-50'
          },
          { 
            label: 'Active Users', 
            value: stats.activeUsers, 
            icon: TrendingUp, 
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50'
          }
        ].map((stat, index) => (
          <div key={index} className={`${stat.bgColor} p-6 rounded-lg border border-gray-200`}>
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Role Distribution</h3>
          <div className="space-y-3">
            {Object.entries(stats.roleStats).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900 capitalize">{role}</span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(role)} mr-2`}>
                    {count}
                  </span>
                  <span className="text-sm text-gray-500">
                    {stats.totalUsers > 0 ? Math.round((count / stats.totalUsers) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Users</h3>
          <div className="space-y-3">
            {recentUsers.length > 0 ? (
              recentUsers.map((user) => (
                <div key={user._id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent users</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/portal/superadmin/users"
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Users className="h-4 w-4 mr-2" />
            View All Users
          </Link>
          <Link 
            to="/portal/superadmin/users?filter=unverified"
            className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <UserX className="h-4 w-4 mr-2" />
            Unverified Users
          </Link>
          <Link 
            to="/portal/superadmin/analytics"
            className="flex items-center justify-center px-4 py-3 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
